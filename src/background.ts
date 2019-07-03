import {Information, Settings, Range} from "./interface";

interface InitData {
	tab: chrome.tabs.Tab,
	settings: Settings,
	information: Information
}

interface Capture {
	x: number,
	y: number,
	url: string
}

{
	//キャプチャされた画像配列
	let captures: Capture[] = [];

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

	//拡張機能の設定と現在参照中のタブ情報を返す
	const init = () => {
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

	//キャプチャに必要な値を割り出して返す
	const captureCalculation = (settings: Settings, information: Information) => {
		//キャプチャに必要な画像数
		const captureNumber = settings.range === 'perfect'
			? information.captureNumber
			: 1;

		//キャプチャ画像は横に何枚並べればいいか
		const widthCaptureNumber = settings.range === 'perfect'
			? information.widthCaptureNumber
			: 1;

		//合成後の画像の右端何 px を断ち落とすか
		let removeWidth = 0;
		switch (settings.range) {
			case 'perfect':
				removeWidth = information.documentWidth <= information.windowWidth
					? 0
					: Math.ceil(information.documentWidth % information.windowWidth);
				break;
			case 'full':
				removeWidth = Math.ceil(information.windowWidth * information.ratio);
				break;
		}

		//合成後の画像の下端何 px を断ち落とすか
		let removeHeight = 0;
		switch (settings.range) {
			case 'perfect':
				removeHeight = information.documentHeight <= information.windowHeight
					? 0
					: Math.ceil(information.documentHeight % information.windowHeight);
				break;
			case 'full':
				removeHeight = Math.ceil(information.windowHeight * information.ratio);
				break;
		}

		//返す
		return {captureNumber, widthCaptureNumber, removeWidth, removeHeight};
	}

	//サイズの変更・キャプチャ
	const pushCapture = (type: Range, index: number, tab: chrome.tabs.Tab, x: number, y: number): Promise<void> => {
		return new Promise(resolve => {
			setTimeout(() => {
				chrome.tabs.sendMessage(Number(tab.id), {type: 'sizing', range: type, index: index}, () => {
					chrome.tabs.captureVisibleTab((url) => {
						captures.push({x, y, url});
						resolve();
					});
				});
			}, 1000);
		});
	};

	//キャプチャを行う
	const getCaptures = async (settings: Settings, information: Information, tab: chrome.tabs.Tab) => {
		//何枚の画像をキャプチャするか
		const captureNumber = settings.range === 'perfect'
			? information.captureNumber
			: 1;

		//キャプチャ画像は横に何枚並べればいいか
		const widthCaptureNumber = settings.range === 'perfect'
			? information.widthCaptureNumber
			: 1;

		for (let i = 0; i < captureNumber; i = (i + 1) | 0) {
			await pushCapture(settings.range, i, tab, i % widthCaptureNumber * information.windowWidth, Math.floor(i / widthCaptureNumber) * information.windowHeight);
		}
	};

	//カンバスに画像を読み込み、描写する
	const drawCanvas = (ctx: CanvasRenderingContext2D, index: number) => {
		return new Promise<void>(resolve => {
			const image = new Image();
			image.onload = () => {
				ctx.drawImage(image, captures[index].x, captures[index].y);
				resolve();
			};
			image.src = captures[index].url;
		});
	};

	/**
	 * target が CanvasRenderingContext2D であるか判定する
	 * 具体的には drawImage メソッドが存在するか判定する
	 * @param target
	 */
	const isCanvasRenderingContext2D = (target: any): target is CanvasRenderingContext2D => {
		return target.drawImage !== undefined;
	}

	//カンバスを作成し、画像 URI を作成する
	const createDataURI = (settings:Settings, information: Information) => {
		//この関数が行う非同期処理
		let task: Promise<void>[] = [];

		//カンバスの作成
		const canvas = document.createElement('canvas');
		switch (settings.range) {
			case 'full':
				canvas.setAttribute('width', information.ratioType === 'width' ? String(information.documentWidth * information.ratio) : String(information.documentWidth));
				canvas.setAttribute('height', information.ratioType === 'height' ? String(information.documentHeight * information.ratio) : String(information.documentHeight));
				break;
			case 'display':
				canvas.setAttribute('width', String(information.windowWidth));
				canvas.setAttribute('height', String(information.windowHeight));
				break;
			case 'perfect':
				canvas.setAttribute('width', String(information.documentWidth));
				canvas.setAttribute('height', String(information.documentHeight));
				break;
		}
		document.body.appendChild(canvas);

		//カンバスのコンテキストを取得
		const ctx = canvas.getContext('2d');

		//画像配置処理登録
		if (isCanvasRenderingContext2D(ctx))
		{
			for (let i = 0, max = captures.length; i < max; i = (i + 1) | 0) {
				task.push(drawCanvas(ctx, i));
			}
		}

		//全て書き終えたら DataURL を生成して Promise を返す
		return new Promise(resolve => {
			Promise.all(task).then(() => {
				//画像書き出し
				const url = canvas.toDataURL();

				//canvas を消す
				canvas.remove();

				//返す
				resolve(url);
			});
		});
	};

	//キャプチャ実行
	const action = () => {
		//現在表示しているタブの情報を入手する
		init()
			.then(data => {
				//キャプチャ・画像生成
				getCaptures(data.settings, data.information, data.tab)
					.then(() => {
						return createDataURI(data.settings, data.information);
					})
					.then(url => {
						chrome.tabs.create({url: 'download.html?src='+url+'&title='+data.tab.title+'&url='+data.tab.url});
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
}
