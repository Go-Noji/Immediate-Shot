import {Information, Settings, Range} from "src/class/interface";
import {Capturing} from "./class/Capuring";

interface InitData {
	tab: chrome.tabs.Tab,
	settings: Settings,
	information: Information
}

{
	//Capturing クラス
	const capturing = new Capturing();

	//ダウンロードページと対応する画像ファイル
	const images: {[key: number]: string} =  {};

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
				chrome.tabs.query({active: true}, (tabs: chrome.tabs.Tab[]) => {
					innerResolve(tabs[0]);
				});
			})
				.then(tab => {
					return new Promise<{tab: chrome.tabs.Tab, settings: Settings}>(innerResolve => {
						chrome.storage.sync.get({range: 'full', title: '{{title}}', counter: 0}, (items: {[key: string]: string}) => {
							innerResolve({tab, settings: {range: castRange(items.range), title: String(items.title), counter: Number(items.counter)}});
						});
					});
				})
				.then((data: {tab: chrome.tabs.Tab, settings: Settings}) => {
					//現合表示しているタブの情報を入手
					chrome.tabs.sendMessage(Number(data.tab.id), {type: 'information'}, (information: Information) => {
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
	const createCapture = (id: number, range: Range, index: number): Promise<void> => {
		return  new Promise(resolve => {
			chrome.tabs.sendMessage(id, {type: 'sizing', range: range, index: index}, response => {
				setTimeout(() => {
					capturing.capture(response.x, response.y)
						.then(() => {
							resolve();
						});
				}, index === 0 ? 100 : 20);
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
		console.log([width, height]);

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
			await createCapture(Number(tab.id), settings.range, i);
		}

		//dataURL 化
		return capturing.compose(size.width, size.height);
	};

	//キャプチャ実行
	const action = () => {
		//現在表示しているタブの情報を入手する
		init()
			.then(data => {
				getDataURL(data.settings, data.information, data.tab)
					.then((url: string) => {
						chrome.tabs.create({url: 'download.html?title='+data.tab.title+'&url='+data.tab.url}, (tab: chrome.tabs.Tab) => {
							//イメージをセット
							images[Number(tab.id)] = url;
						});
						chrome.tabs.sendMessage(Number(data.tab.id), {type: 'back'});
					});
			})
			.catch((data) => {
				console.log(data);
				alert('Sorry, Try again after reload.');
			});
	};

	//アイコンクリック
	chrome.browserAction.onClicked.addListener(action);

	//メッセージ受信
	chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		switch (request.type) {
			case 'open':
				if (sender.tab !== undefined && images[Number(sender.tab.id)] !== undefined) {
					sendResponse({src: images[Number(sender.tab.id)]});
					delete images[Number(sender.tab.id)];
				}
				else {
					sendResponse({src: ''});
				}
				break;
		}
	});
}
