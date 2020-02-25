import {Information, Settings, Range} from "src/class/interface";
import {Capturing} from "./class/Capturing";
import {Filename} from "./class/Filename";
import './config';
import {CAPTURE_WAIT_MILLISECONDS, DEFAULT_COUNTER, DEFAULT_RANGE, DEFAULT_MAX, DEFAULT_TITLE, FIRST_CAPTURE_WAIT_MILLISECONDS} from "./config";

interface InitData {
	tab: chrome.tabs.Tab,
	settings: Settings,
	information: Information
}

{
	//Capturing クラス
	const capturing = new Capturing();

	/**
	 * 拡張機能の設定と現在参照中のタブ情報を返す
	 */
	const init = () => {
		/**
		 * range を Range 型にキャストする
		 * @param range
		 */
		const castRange = (range: string): Range => {
			switch (range) {
				case 'full':
				case 'display':
				case 'perfect':
					return range;
					break;
				default:
					return 'full';
					break;
			}
		};

		return new Promise<InitData>(resolve => {
			//拡張機能の設定を入手
			new Promise<chrome.tabs.Tab>(innerResolve => {
				chrome.tabs.query({active: true, currentWindow: true}, (tabs: chrome.tabs.Tab[]) => {
					innerResolve(tabs[0]);
				});
			})
				.then(tab => {
					return new Promise<{tab: chrome.tabs.Tab, settings: Settings}>(innerResolve => {
						chrome.storage.sync.get({range: DEFAULT_RANGE, title: DEFAULT_TITLE, counter: DEFAULT_COUNTER, max: DEFAULT_MAX}, (items: {[key: string]: string}) => {
							innerResolve({tab, settings: {range: castRange(items.range), title: String(items.title), counter: Number(items.counter), max: Boolean(items.max)}});
						});
					});
				})
				.then((data: {tab: chrome.tabs.Tab, settings: Settings}) => {
					//現合表示しているタブの情報を入手
					chrome.tabs.sendMessage(Number(data.tab.id), {type: 'information', max: data.settings.max}, (information: Information) => {
					  console.log(information);
						resolve({tab: data.tab, settings: data.settings, information});
					});
				});
		});
	};

	/**
	 * 現在表示しているタブのキャプチャを一回行う
	 * @param id
	 * @param range
	 */
	const createCapture = (id: number, range: Range, index: number, max: boolean = false): Promise<void> => {
		return  new Promise(resolve => {
			//index === 1 (キャプチャが二回目)の場合は position: fixed の要素を非表示にする
			if (index === 1) {
				chrome.tabs.sendMessage(id, {type: 'killFixed'});
			}

			//スクロール・キャプチャ
			chrome.tabs.sendMessage(id, {type: 'sizing', range: range, index: index, max: max}, response => {
				setTimeout(() => {
					capturing.capture(response.x, response.y)
						.then(() => {
							resolve();
						});
				}, index < 2 ? FIRST_CAPTURE_WAIT_MILLISECONDS : CAPTURE_WAIT_MILLISECONDS);
			});
		});
	};

	/**
	 * settings と information から求められている画像サイズを導き出す
	 * @param settings
	 * @param information
	 */
	const getImageSize = (settings: Settings, information: Information): {width: number, height: number} => {
		//最終的な画像サイズを決定(この時点では range = display 用)
		let width = information.windowWidth;
		let height = information.windowHeight;

		//range に合わせた画像サイズを用意
		switch (settings.range) {
			case 'full':
				width = information.ratioType === 'width'
					? information.windowWidth
					: information.windowWidth * information.ratio;
				height = information.ratioType === 'height'
					? information.windowHeight
					: information.windowHeight * information.ratio;
				break;
			case 'perfect':
				width = information.documentWidth;
				height = information.documentHeight;
				break;
		}

		//返す
		return  {width, height};
	};

	/**
	 * 現在開いているタブのキャプチャを行う
	 * @param settings
	 * @param information
	 * @param tab
	 */
	const getDataURL = async (settings: Settings, information: Information, tab: chrome.tabs.Tab) => {
		//何枚の画像をキャプチャするか
		const captureNumber = settings.range === 'perfect'
			? information.captureNumber
			: 1;

		//サイズ取得
		const size = getImageSize(settings, information);

		//キャプチャ処理を必要な回数だけ行う
		for (let i = 0, max = captureNumber; i < max; i = (i + 1) | 0) {
			await createCapture(Number(tab.id), settings.range, i, settings.max);
		}

		//スタイルを元に戻す
		chrome.tabs.sendMessage(Number(tab.id), {type: 'resetSizing', x: information.scrollX, y: information.scrollY});

		//dataURL 化
		return capturing.compose(size.width, size.height);
	};

	/**
	 * ファイル名を決定し、ダウンロードを行う
	 * @param url
	 * @param settings
	 */
	const download = (url: string, settings: Settings, tab: chrome.tabs.Tab) => {
		//ファイル名変換用クラス
		const filename = new Filename();

		//ファイル名テンプレート変数文字列登録
		if (settings.title.indexOf('{{title}}') !== -1) {
			filename.setTemplate('{{title}}', decodeURIComponent(String(tab.title)));
		}
		if (settings.title.indexOf('{{url}}') !== -1) {
			filename.setTemplate('{{url}}', String(tab.url).replace(/https?:\/\//, ''));
		}
		if (settings.title.indexOf('{{counter}}') !== -1) {
			filename.setTemplate('{{counter}}', String(settings.counter));
			settings.counter = settings.counter + 1;
		}

		//counter 設定の保存
		chrome.storage.sync.set({counter: settings.counter});

		//ダウンロード
		chrome.downloads.download({url: url, filename: filename.getFileName(settings.title)+'.png'});
	};

	//キャプチャ実行
	const action = () => {
		//キャプチャの初期化
		capturing.init();

		//現在表示しているタブの情報を入手する
		init()
			.then(data => {
				getDataURL(data.settings, data.information, data.tab)
					.then((url: string) => {
						download(url, data.settings, data.tab);
					});
			})
			.catch((data) => {
				console.log(data);
				alert('Sorry, Try again after reload.');
			});
	};

	//アイコンクリック
	chrome.browserAction.onClicked.addListener(action);

	//右クリックメニュー
	chrome.contextMenus.create({
		id: 'run',
		title: 'Immediate Shot',
		contexts: ['all'],
		type: 'normal'
	});
	chrome.contextMenus.onClicked.addListener(action);
}
