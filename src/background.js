{
	//キャプチャされた画像配列
	let captures = [];

	//拡張機能の設定と現在参照中のタブ情報を返す
	const init = () => {
		return new Promise(resolve => {
			//拡張機能の設定を入手
			new Promise(innerResolve => {
				chrome.tabs.getSelected(null, tab => {
					innerResolve(tab);
				});
			})
				.then(tab => {
					return new Promise(innerResolve => {
						chrome.storage.sync.get({range: 'full', title: '{{title}}', counter: 0}, settings => {
							innerResolve({tab, settings});
						});
					});
				})
				.then(data => {
					//現合表示しているタブの情報を入手
					chrome.tabs.sendMessage(data.tab.id, {type: 'information'}, information => {
						resolve(Object.assign(data, {information}));
					});
				});
		});
	};

	//キャプチャに必要な値を割り出して返す
	const captureCalculation = (settings, information) => {
		//キャプチャに必要な画像数
		const captureNumber = settings.range === 'perfect'
			? information.captureNumber
			: 1;

		//キャプチャ画像は横に何枚並べればいいか
		const columnNumber = settings.range === 'perfect'
			? information.columnNumber
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
		return {captureNumber, columnNumber, removeWidth, removeHeight};
	}

	//サイズの変更・キャプチャ
	const pushCapture = (type, index, tab, x, y) => {
		return new Promise(resolve => {
			setTimeout(() => {
				chrome.tabs.sendMessage(tab.id, {type: 'sizing', range: type, index: index}, () => {
					chrome.tabs.captureVisibleTab((url) => {
						captures.push({x, y, url});
						resolve();
					});
				});
			}, 1000);
		});
	};

	//キャプチャを行う
	const getCaptures = (settings, information, tab) => {
		//この関数が行う非同期タスク
		let task = [];

		//何枚の画像をキャプチャするか
		const captureNumber = settings.range === 'perfect'
			? information.captureNumber
			: 1;

		//キャプチャ画像は横に何枚並べればいいか
		const columnNumber = settings.range === 'perfect'
			? information.columnNumber
			: 1;

		//キャプチャを定義順にこなす
		for (let i = 0; i < captureNumber; i = (i + 1) | 0) {
			task.push(pushCapture(settings.range, i, tab, i % columnNumber * information.windowWidth, Math.floor(i / columnNumber) * information.windowHeight));
		}

		//全てのキャプチャが終わったら Promise を返す
		return Promise.all(task);
	};

	//カンバスに画像を読み込み、描写する
	const drawCanvas = (ctx, index) => {
		return new Promise(resolve => {
			const image = new Image();
			image.onload = () => {
				ctx.drawImage(image, captures[index].x, captures[index].y);
				resolve();
			};
			image.src = captures[index].url;
		});
	};

	//カンバスを作成し、画像 URI を作成する
	const createDataURI = (settings, information) => {
		//この関数が行う非同期処理
		let task = [];

		//カンバスの作成
		const canvas = document.createElement('canvas');
		switch (settings.range) {
			case 'full':
				canvas.setAttribute('width', information.ratioType === 'width' ? information.documentWidth * information.ratio : information.documentWidth);
				canvas.setAttribute('height', information.ratioType === 'height' ? information.documentHeight * information.ratio : information.documentHeight);
				break;
			case 'display':
				canvas.setAttribute('width', information.windowWidth);
				canvas.setAttribute('height', information.windowHeight);
				break;
			case 'perfect':
				canvas.setAttribute('width', information.documentWidth);
				canvas.setAttribute('height', information.documentHeight);
				break;
		}
		document.body.appendChild(canvas);

		//カンバスのコンテキストを取得
		const ctx = canvas.getContext('2d');

		//画像配置処理登録
		for (let i = 0, max = captures.length; i < max; i = (i + 1) | 0) {
			task.push(drawCanvas(ctx, i));
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
						chrome.tabs.sendMessage(data.tab.id, {type: 'back'});
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
