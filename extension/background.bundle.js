/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/background.ts":
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _class_Capturing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class/Capturing */ "./src/class/Capturing.ts");
/* harmony import */ var _class_Filename__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./class/Filename */ "./src/class/Filename.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


{
    //Capturing クラス
    const capturing = new _class_Capturing__WEBPACK_IMPORTED_MODULE_0__["Capturing"]();
    /**
     * 拡張機能の設定と現在参照中のタブ情報を返す
     */
    const init = () => {
        /**
         * range を Range 型にキャストする
         * @param range
         */
        const castRange = (range) => {
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
        return new Promise(resolve => {
            //拡張機能の設定を入手
            new Promise(innerResolve => {
                chrome.tabs.query({ active: true }, (tabs) => {
                    innerResolve(tabs[0]);
                });
            })
                .then(tab => {
                return new Promise(innerResolve => {
                    chrome.storage.sync.get({ range: 'full', title: '{{title}}', counter: 0 }, (items) => {
                        innerResolve({ tab, settings: { range: castRange(items.range), title: String(items.title), counter: Number(items.counter) } });
                    });
                });
            })
                .then((data) => {
                //現合表示しているタブの情報を入手
                chrome.tabs.sendMessage(Number(data.tab.id), { type: 'information' }, (information) => {
                    resolve({ tab: data.tab, settings: data.settings, information });
                });
            });
        });
    };
    /**
     * 現在表示しているタブのキャプチャを一回行う
     * @param id
     * @param range
     */
    const createCapture = (id, range, index) => {
        return new Promise(resolve => {
            //index === 1 (キャプチャが二回目)の場合は position: fixed の要素を非表示にする
            if (index === 1) {
                chrome.tabs.sendMessage(id, { type: 'killFixed' });
            }
            //スクロール・キャプチャ
            chrome.tabs.sendMessage(id, { type: 'sizing', range: range, index: index }, response => {
                setTimeout(() => {
                    capturing.capture(response.x, response.y)
                        .then(() => {
                        resolve();
                    });
                }, index < 2 ? 200 : 30);
            });
        });
    };
    /**
     * settings と information から求められている画像サイズを導き出す
     * @param settings
     * @param information
     */
    const getImageSize = (settings, information) => {
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
        return { width, height };
    };
    /**
     * 現在開いているタブのキャプチャを行う
     * @param settings
     * @param information
     * @param tab
     */
    const getDataURL = (settings, information, tab) => __awaiter(undefined, void 0, void 0, function* () {
        //何枚の画像をキャプチャするか
        const captureNumber = settings.range === 'perfect'
            ? information.captureNumber
            : 1;
        //サイズ取得
        const size = getImageSize(settings, information);
        //キャプチャ処理を必要な回数だけ行う
        for (let i = 0, max = captureNumber; i < max; i = (i + 1) | 0) {
            yield createCapture(Number(tab.id), settings.range, i);
        }
        //スタイルを元に戻す
        chrome.tabs.sendMessage(Number(tab.id), { type: 'resetSizing', x: information.scrollX, y: information.scrollY });
        //dataURL 化
        return capturing.compose(size.width, size.height);
    });
    /**
     * ファイル名を決定し、ダウンロードを行う
     * @param url
     * @param settings
     */
    const download = (url, settings, tab) => {
        //ファイル名変換用クラス
        const filename = new _class_Filename__WEBPACK_IMPORTED_MODULE_1__["Filename"]();
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
        chrome.storage.sync.set({ counter: settings.counter });
        //ダウンロード
        chrome.downloads.download({ url: url, filename: filename.getFileName(settings.title) + '.png' });
    };
    //キャプチャ実行
    const action = () => {
        //キャプチャの初期化
        capturing.init();
        //現在表示しているタブの情報を入手する
        init()
            .then(data => {
            getDataURL(data.settings, data.information, data.tab)
                .then((url) => {
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


/***/ }),

/***/ "./src/class/Capturing.ts":
/*!********************************!*\
  !*** ./src/class/Capturing.ts ***!
  \********************************/
/*! exports provided: Capturing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Capturing", function() { return Capturing; });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Capturing {
    constructor() {
        //キャプチャ済み DataURL の集合
        this.captureURLs = [];
        /**
         * target が CanvasRenderingContext2D であるか判定する
         * 具体的には drawImage メソッドが存在するか判定する
         * @param target
         */
        this._isCanvasRenderingContext2D = (target) => {
            return target.drawImage !== undefined;
        };
        /**
         * キャプチャが複数枚ある場合、一番右 or 一番下に位置する画像は座標をズラす必用があるのでその変更前・後の値を算出
         * captureURLs の各配列値の x か y の中かから最大値を探し、その値と変更すべき値を返す
         * documentSize は target = 'x' だったら documentWidth, target = 'y' だったら documentHeight
         * @param target
         * @param documentSize
         * @private
         */
        this._getNeedToChangeCoordinate = (target, documentSize) => {
            //captureURLs 内のの target 最大値
            let max = 0;
            //target = 'x' なら画像一枚あたりの幅, target = 'y' なら画像一枚あたりの高さ
            let size = 0;
            //最大値検索
            for (let i = 0, length = this.captureURLs.length; i < length; i = (i + 1) | 0) {
                if (this.captureURLs[i][target] <= max) {
                    continue;
                }
                //画像一枚あたりの大きさを算出
                size = this.captureURLs[i][target] - max;
                //最大値の更新
                max = this.captureURLs[i][target];
            }
            //最大値 / documentSize の余りを引く
            return {
                original: max,
                changed: size === 0 || max === 0 ? max : max - (size - documentSize % size)
            };
        };
        /**
         * captureURLs の一番右 or 一番下に位置する画像座標を整形して返す
         * @param width
         * @param height
         * @private
         */
        this._getCaptureURLsShapedCoordinates = (width, height) => {
            //この関数が返す値
            let results = [];
            //x 座標と y 座標それぞれの変更すべき座標を算出
            const changeX = this._getNeedToChangeCoordinate('x', width);
            const changeY = this._getNeedToChangeCoordinate('y', height);
            //captureURLs を整形しつつ results へコピー
            for (let i = 0, max = this.captureURLs.length; i < max; i = (i + 1) | 0) {
                //コピー
                results[i] = this.captureURLs[i];
                //x 座標の整形
                if (results[i].x === changeX.original) {
                    results[i].x = changeX.changed;
                }
                //y 座標の整形
                if (results[i].y === changeY.original) {
                    results[i].y = changeY.changed;
                }
            }
            //返す
            return results;
        };
        /**
         * 現在 captureURLs に読み込まれているデータをカンバスに読み込み、合成、トリミングする
         * 最終的に吐き出される画像の大きさは width * height となる
         * @private
         */
        this.compose = (width, height) => __awaiter(this, void 0, void 0, function* () {
            //カンバスの作成
            const canvas = document.createElement('canvas');
            //カンバスの大きさを設定
            canvas.setAttribute('width', width + 'px');
            canvas.setAttribute('height', height + 'px');
            //2D コンテキストを取得
            const ctx = canvas.getContext('2d');
            //ctx のタイプガード
            if (!this._isCanvasRenderingContext2D(ctx)) {
                return '';
            }
            //座標整形後の captureURL
            const changedCaptureURLs = this._getCaptureURLsShapedCoordinates(width, height);
            //カンバスに画像を設置
            yield changedCaptureURLs.reduce((prev, current) => prev.then(() => {
                return new Promise(resolve => {
                    const image = new Image();
                    image.onload = () => {
                        ctx.drawImage(image, current.x, current.y);
                        resolve();
                    };
                    image.src = current.url;
                });
            }), Promise.resolve());
            //dataURL を生成
            const data = canvas.toDataURL();
            //canvas を消す
            canvas.remove();
            //dataURL を返す
            return data;
        });
    }
    /**
     * キャプチャを取得し、captureURLs に push する
     * @param x
     * @param y
     * @private
     */
    capture(x, y) {
        return new Promise(resolve => {
            chrome.tabs.captureVisibleTab((url) => {
                this.captureURLs.push({ x, y, url });
                resolve();
            });
        });
    }
    /**
     * captureURLs を空にする
     */
    init() {
        this.captureURLs = [];
    }
}


/***/ }),

/***/ "./src/class/Filename.ts":
/*!*******************************!*\
  !*** ./src/class/Filename.ts ***!
  \*******************************/
/*! exports provided: Filename */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filename", function() { return Filename; });
class Filename {
    /**
     * ファイル名に使用できない文字を全て replacement に置換して返す
     * @param string
     * @param replacement
     * @return {string}
     * @private
     */
    _replaceBadCharacter(string, replacement = '_') {
        return String(string).replace(/[\\\/:\*\?"<>\-\|\s]+/g, replacement);
    }
    /**
     * this.templates の定義
     */
    constructor() {
        this.templates = new Array();
    }
    /**
     * テンプレート変数文字列とその値を設定する
     * @param template
     * @param value
     */
    setTemplate(template, value) {
        this.templates.push({
            template: String(template),
            value: String(value)
        });
    }
    /**
     * setTemplate(), _replaceBadCharacter() で変換したファイル名を出力
     * @param name
     * @return {string}
     */
    getFileName(name) {
        //テンプレート変数文字列を値に置き換える
        for (let i = 0, max = this.templates.length; i < max; i = (i + 1) | 0) {
            name = String(name).replace(new RegExp(this.templates[i].template, 'g'), this.templates[i].value);
        }
        //使用不可の文字を全て置き換えて返却
        return this._replaceBadCharacter(name);
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzL0NhcHR1cmluZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MvRmlsZW5hbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakY0QztBQUNGO0FBUTFDO0lBQ0MsZUFBZTtJQUNmLE1BQU0sU0FBUyxHQUFHLElBQUksMERBQVMsRUFBRSxDQUFDO0lBRWxDOztPQUVHO0lBQ0gsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO1FBQ2pCOzs7V0FHRztRQUNILE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBYSxFQUFTLEVBQUU7WUFDMUMsUUFBUSxLQUFLLEVBQUU7Z0JBQ2QsS0FBSyxNQUFNLENBQUM7Z0JBQ1os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QUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkc7UUFFRCxtQkFBbUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztDQUVGIiwiZmlsZSI6ImJhY2tncm91bmQuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYmFja2dyb3VuZC50c1wiKTtcbiIsImltcG9ydCB7SW5mb3JtYXRpb24sIFNldHRpbmdzLCBSYW5nZX0gZnJvbSBcInNyYy9jbGFzcy9pbnRlcmZhY2VcIjtcbmltcG9ydCB7Q2FwdHVyaW5nfSBmcm9tIFwiLi9jbGFzcy9DYXB0dXJpbmdcIjtcbmltcG9ydCB7RmlsZW5hbWV9IGZyb20gXCIuL2NsYXNzL0ZpbGVuYW1lXCI7XG5cbmludGVyZmFjZSBJbml0RGF0YSB7XG5cdHRhYjogY2hyb21lLnRhYnMuVGFiLFxuXHRzZXR0aW5nczogU2V0dGluZ3MsXG5cdGluZm9ybWF0aW9uOiBJbmZvcm1hdGlvblxufVxuXG57XG5cdC8vQ2FwdHVyaW5nIOOCr+ODqeOCuVxuXHRjb25zdCBjYXB0dXJpbmcgPSBuZXcgQ2FwdHVyaW5nKCk7XG5cblx0LyoqXG5cdCAqIOaLoeW8teapn+iDveOBruioreWumuOBqOePvuWcqOWPgueFp+S4reOBruOCv+ODluaDheWgseOCkui/lOOBmVxuXHQgKi9cblx0Y29uc3QgaW5pdCA9ICgpID0+IHtcblx0XHQvKipcblx0XHQgKiByYW5nZSDjgpIgUmFuZ2Ug5Z6L44Gr44Kt44Oj44K544OI44GZ44KLXG5cdFx0ICogQHBhcmFtIHJhbmdlXG5cdFx0ICovXG5cdFx0Y29uc3QgY2FzdFJhbmdlID0gKHJhbmdlOiBzdHJpbmcpOiBSYW5nZSA9PiB7XG5cdFx0XHRzd2l0Y2ggKHJhbmdlKSB7XG5cdFx0XHRcdGNhc2UgJ2Z1bGwnOlxuXHRcdFx0XHRjYXNlICdkaXNwbGF5Jzpcblx0XHRcdFx0Y2FzZSAncGVyZmVjdCc6XG5cdFx0XHRcdFx0cmV0dXJuIHJhbmdlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHJldHVybiAnZnVsbCc7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxJbml0RGF0YT4ocmVzb2x2ZSA9PiB7XG5cdFx0XHQvL+aLoeW8teapn+iDveOBruioreWumuOCkuWFpeaJi1xuXHRcdFx0bmV3IFByb21pc2U8Y2hyb21lLnRhYnMuVGFiPihpbm5lclJlc29sdmUgPT4ge1xuXHRcdFx0XHRjaHJvbWUudGFicy5xdWVyeSh7YWN0aXZlOiB0cnVlfSwgKHRhYnM6IGNocm9tZS50YWJzLlRhYltdKSA9PiB7XG5cdFx0XHRcdFx0aW5uZXJSZXNvbHZlKHRhYnNbMF0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKHRhYiA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlPHt0YWI6IGNocm9tZS50YWJzLlRhYiwgc2V0dGluZ3M6IFNldHRpbmdzfT4oaW5uZXJSZXNvbHZlID0+IHtcblx0XHRcdFx0XHRcdGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KHtyYW5nZTogJ2Z1bGwnLCB0aXRsZTogJ3t7dGl0bGV9fScsIGNvdW50ZXI6IDB9LCAoaXRlbXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9KSA9PiB7XG5cdFx0XHRcdFx0XHRcdGlubmVyUmVzb2x2ZSh7dGFiLCBzZXR0aW5nczoge3JhbmdlOiBjYXN0UmFuZ2UoaXRlbXMucmFuZ2UpLCB0aXRsZTogU3RyaW5nKGl0ZW1zLnRpdGxlKSwgY291bnRlcjogTnVtYmVyKGl0ZW1zLmNvdW50ZXIpfX0pO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKChkYXRhOiB7dGFiOiBjaHJvbWUudGFicy5UYWIsIHNldHRpbmdzOiBTZXR0aW5nc30pID0+IHtcblx0XHRcdFx0XHQvL+ePvuWQiOihqOekuuOBl+OBpuOBhOOCi+OCv+ODluOBruaDheWgseOCkuWFpeaJi1xuXHRcdFx0XHRcdGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKE51bWJlcihkYXRhLnRhYi5pZCksIHt0eXBlOiAnaW5mb3JtYXRpb24nfSwgKGluZm9ybWF0aW9uOiBJbmZvcm1hdGlvbikgPT4ge1xuXHRcdFx0XHRcdFx0cmVzb2x2ZSh7dGFiOiBkYXRhLnRhYiwgc2V0dGluZ3M6IGRhdGEuc2V0dGluZ3MsIGluZm9ybWF0aW9ufSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiDnj77lnKjooajnpLrjgZfjgabjgYTjgovjgr/jg5bjga7jgq3jg6Pjg5fjg4Hjg6PjgpLkuIDlm57ooYzjgYZcblx0ICogQHBhcmFtIGlkXG5cdCAqIEBwYXJhbSByYW5nZVxuXHQgKi9cblx0Y29uc3QgY3JlYXRlQ2FwdHVyZSA9IChpZDogbnVtYmVyLCByYW5nZTogUmFuZ2UsIGluZGV4OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+ID0+IHtcblx0XHRyZXR1cm4gIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuXHRcdFx0Ly9pbmRleCA9PT0gMSAo44Kt44Oj44OX44OB44Oj44GM5LqM5Zue55uuKeOBruWgtOWQiOOBryBwb3NpdGlvbjogZml4ZWQg44Gu6KaB57Sg44KS6Z2e6KGo56S644Gr44GZ44KLXG5cdFx0XHRpZiAoaW5kZXggPT09IDEpIHtcblx0XHRcdFx0Y2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoaWQsIHt0eXBlOiAna2lsbEZpeGVkJ30pO1xuXHRcdFx0fVxuXG5cdFx0XHQvL+OCueOCr+ODreODvOODq+ODu+OCreODo+ODl+ODgeODo1xuXHRcdFx0Y2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoaWQsIHt0eXBlOiAnc2l6aW5nJywgcmFuZ2U6IHJhbmdlLCBpbmRleDogaW5kZXh9LCByZXNwb25zZSA9PiB7XG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHRcdGNhcHR1cmluZy5jYXB0dXJlKHJlc3BvbnNlLngsIHJlc3BvbnNlLnkpXG5cdFx0XHRcdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LCBpbmRleCA8IDIgPyAyMDAgOiAzMCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fTtcblxuXHQvKipcblx0ICogc2V0dGluZ3Mg44GoIGluZm9ybWF0aW9uIOOBi+OCieaxguOCgeOCieOCjOOBpuOBhOOCi+eUu+WDj+OCteOCpOOCuuOCkuWwjuOBjeWHuuOBmVxuXHQgKiBAcGFyYW0gc2V0dGluZ3Ncblx0ICogQHBhcmFtIGluZm9ybWF0aW9uXG5cdCAqL1xuXHRjb25zdCBnZXRJbWFnZVNpemUgPSAoc2V0dGluZ3M6IFNldHRpbmdzLCBpbmZvcm1hdGlvbjogSW5mb3JtYXRpb24pOiB7d2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9ID0+IHtcblx0XHQvL+acgOe1gueahOOBqueUu+WDj+OCteOCpOOCuuOCkuaxuuWumijjgZPjga7mmYLngrnjgafjga8gcmFuZ2UgPSBkaXNwbGF5IOeUqClcblx0XHRsZXQgd2lkdGggPSBpbmZvcm1hdGlvbi53aW5kb3dXaWR0aDtcblx0XHRsZXQgaGVpZ2h0ID0gaW5mb3JtYXRpb24ud2luZG93SGVpZ2h0O1xuXG5cdFx0Ly9yYW5nZSDjgavlkIjjgo/jgZvjgZ/nlLvlg4/jgrXjgqTjgrrjgpLnlKjmhI9cblx0XHRzd2l0Y2ggKHNldHRpbmdzLnJhbmdlKSB7XG5cdFx0XHRjYXNlICdmdWxsJzpcblx0XHRcdFx0d2lkdGggPSBpbmZvcm1hdGlvbi5yYXRpb1R5cGUgPT09ICd3aWR0aCdcblx0XHRcdFx0XHQ/IGluZm9ybWF0aW9uLndpbmRvd1dpZHRoXG5cdFx0XHRcdFx0OiBpbmZvcm1hdGlvbi53aW5kb3dXaWR0aCAqIGluZm9ybWF0aW9uLnJhdGlvO1xuXHRcdFx0XHRoZWlnaHQgPSBpbmZvcm1hdGlvbi5yYXRpb1R5cGUgPT09ICdoZWlnaHQnXG5cdFx0XHRcdFx0PyBpbmZvcm1hdGlvbi53aW5kb3dIZWlnaHRcblx0XHRcdFx0XHQ6IGluZm9ybWF0aW9uLndpbmRvd0hlaWdodCAqIGluZm9ybWF0aW9uLnJhdGlvO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ3BlcmZlY3QnOlxuXHRcdFx0XHR3aWR0aCA9IGluZm9ybWF0aW9uLmRvY3VtZW50V2lkdGg7XG5cdFx0XHRcdGhlaWdodCA9IGluZm9ybWF0aW9uLmRvY3VtZW50SGVpZ2h0O1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cblx0XHQvL+i/lOOBmVxuXHRcdHJldHVybiAge3dpZHRoLCBoZWlnaHR9O1xuXHR9O1xuXG5cdC8qKlxuXHQgKiDnj77lnKjplovjgYTjgabjgYTjgovjgr/jg5bjga7jgq3jg6Pjg5fjg4Hjg6PjgpLooYzjgYZcblx0ICogQHBhcmFtIHNldHRpbmdzXG5cdCAqIEBwYXJhbSBpbmZvcm1hdGlvblxuXHQgKiBAcGFyYW0gdGFiXG5cdCAqL1xuXHRjb25zdCBnZXREYXRhVVJMID0gYXN5bmMgKHNldHRpbmdzOiBTZXR0aW5ncywgaW5mb3JtYXRpb246IEluZm9ybWF0aW9uLCB0YWI6IGNocm9tZS50YWJzLlRhYikgPT4ge1xuXHRcdC8v5L2V5p6a44Gu55S75YOP44KS44Kt44Oj44OX44OB44Oj44GZ44KL44GLXG5cdFx0Y29uc3QgY2FwdHVyZU51bWJlciA9IHNldHRpbmdzLnJhbmdlID09PSAncGVyZmVjdCdcblx0XHRcdD8gaW5mb3JtYXRpb24uY2FwdHVyZU51bWJlclxuXHRcdFx0OiAxO1xuXG5cdFx0Ly/jgrXjgqTjgrrlj5blvpdcblx0XHRjb25zdCBzaXplID0gZ2V0SW1hZ2VTaXplKHNldHRpbmdzLCBpbmZvcm1hdGlvbik7XG5cblx0XHQvL+OCreODo+ODl+ODgeODo+WHpueQhuOCkuW/heimgeOBquWbnuaVsOOBoOOBkeihjOOBhlxuXHRcdGZvciAobGV0IGkgPSAwLCBtYXggPSBjYXB0dXJlTnVtYmVyOyBpIDwgbWF4OyBpID0gKGkgKyAxKSB8IDApIHtcblx0XHRcdGF3YWl0IGNyZWF0ZUNhcHR1cmUoTnVtYmVyKHRhYi5pZCksIHNldHRpbmdzLnJhbmdlLCBpKTtcblx0XHR9XG5cblx0XHQvL+OCueOCv+OCpOODq+OCkuWFg+OBq+aIu+OBmVxuXHRcdGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKE51bWJlcih0YWIuaWQpLCB7dHlwZTogJ3Jlc2V0U2l6aW5nJywgeDogaW5mb3JtYXRpb24uc2Nyb2xsWCwgeTogaW5mb3JtYXRpb24uc2Nyb2xsWX0pO1xuXG5cdFx0Ly9kYXRhVVJMIOWMllxuXHRcdHJldHVybiBjYXB0dXJpbmcuY29tcG9zZShzaXplLndpZHRoLCBzaXplLmhlaWdodCk7XG5cdH07XG5cblx0LyoqXG5cdCAqIOODleOCoeOCpOODq+WQjeOCkuaxuuWumuOBl+OAgeODgOOCpuODs+ODreODvOODieOCkuihjOOBhlxuXHQgKiBAcGFyYW0gdXJsXG5cdCAqIEBwYXJhbSBzZXR0aW5nc1xuXHQgKi9cblx0Y29uc3QgZG93bmxvYWQgPSAodXJsOiBzdHJpbmcsIHNldHRpbmdzOiBTZXR0aW5ncywgdGFiOiBjaHJvbWUudGFicy5UYWIpID0+IHtcblx0XHQvL+ODleOCoeOCpOODq+WQjeWkieaPm+eUqOOCr+ODqeOCuVxuXHRcdGNvbnN0IGZpbGVuYW1lID0gbmV3IEZpbGVuYW1lKCk7XG5cblx0XHQvL+ODleOCoeOCpOODq+WQjeODhuODs+ODl+ODrOODvOODiOWkieaVsOaWh+Wtl+WIl+eZu+mMslxuXHRcdGlmIChzZXR0aW5ncy50aXRsZS5pbmRleE9mKCd7e3RpdGxlfX0nKSAhPT0gLTEpIHtcblx0XHRcdGZpbGVuYW1lLnNldFRlbXBsYXRlKCd7e3RpdGxlfX0nLCBkZWNvZGVVUklDb21wb25lbnQoU3RyaW5nKHRhYi50aXRsZSkpKTtcblx0XHR9XG5cdFx0aWYgKHNldHRpbmdzLnRpdGxlLmluZGV4T2YoJ3t7dXJsfX0nKSAhPT0gLTEpIHtcblx0XHRcdGZpbGVuYW1lLnNldFRlbXBsYXRlKCd7e3VybH19JywgU3RyaW5nKHRhYi51cmwpLnJlcGxhY2UoL2h0dHBzPzpcXC9cXC8vLCAnJykpO1xuXHRcdH1cblx0XHRpZiAoc2V0dGluZ3MudGl0bGUuaW5kZXhPZigne3tjb3VudGVyfX0nKSAhPT0gLTEpIHtcblx0XHRcdGZpbGVuYW1lLnNldFRlbXBsYXRlKCd7e2NvdW50ZXJ9fScsIFN0cmluZyhzZXR0aW5ncy5jb3VudGVyKSk7XG5cdFx0XHRzZXR0aW5ncy5jb3VudGVyID0gc2V0dGluZ3MuY291bnRlciArIDE7XG5cdFx0fVxuXG5cdFx0Ly9jb3VudGVyIOioreWumuOBruS/neWtmFxuXHRcdGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtjb3VudGVyOiBzZXR0aW5ncy5jb3VudGVyfSk7XG5cblx0XHQvL+ODgOOCpuODs+ODreODvOODiVxuXHRcdGNocm9tZS5kb3dubG9hZHMuZG93bmxvYWQoe3VybDogdXJsLCBmaWxlbmFtZTogZmlsZW5hbWUuZ2V0RmlsZU5hbWUoc2V0dGluZ3MudGl0bGUpKycucG5nJ30pO1xuXHR9O1xuXG5cdC8v44Kt44Oj44OX44OB44Oj5a6f6KGMXG5cdGNvbnN0IGFjdGlvbiA9ICgpID0+IHtcblx0XHQvL+OCreODo+ODl+ODgeODo+OBruWIneacn+WMllxuXHRcdGNhcHR1cmluZy5pbml0KCk7XG5cblx0XHQvL+ePvuWcqOihqOekuuOBl+OBpuOBhOOCi+OCv+ODluOBruaDheWgseOCkuWFpeaJi+OBmeOCi1xuXHRcdGluaXQoKVxuXHRcdFx0LnRoZW4oZGF0YSA9PiB7XG5cdFx0XHRcdGdldERhdGFVUkwoZGF0YS5zZXR0aW5ncywgZGF0YS5pbmZvcm1hdGlvbiwgZGF0YS50YWIpXG5cdFx0XHRcdFx0LnRoZW4oKHVybDogc3RyaW5nKSA9PiB7XG5cdFx0XHRcdFx0XHRkb3dubG9hZCh1cmwsIGRhdGEuc2V0dGluZ3MsIGRhdGEudGFiKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goKGRhdGEpID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XG5cdFx0XHRcdGFsZXJ0KCdTb3JyeSwgVHJ5IGFnYWluIGFmdGVyIHJlbG9hZC4nKTtcblx0XHRcdH0pO1xuXHR9O1xuXG5cdC8v44Ki44Kk44Kz44Oz44Kv44Oq44OD44KvXG5cdGNocm9tZS5icm93c2VyQWN0aW9uLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcihhY3Rpb24pO1xuXG5cdC8v5Y+z44Kv44Oq44OD44Kv44Oh44OL44Ol44O8XG5cdGNocm9tZS5jb250ZXh0TWVudXMuY3JlYXRlKHtcblx0XHRpZDogJ3J1bicsXG5cdFx0dGl0bGU6ICdJbW1lZGlhdGUgU2hvdCcsXG5cdFx0Y29udGV4dHM6IFsnYWxsJ10sXG5cdFx0dHlwZTogJ25vcm1hbCdcblx0fSk7XG5cdGNocm9tZS5jb250ZXh0TWVudXMub25DbGlja2VkLmFkZExpc3RlbmVyKGFjdGlvbik7XG59XG4iLCJpbnRlcmZhY2UgQ2FwdHVyZVVSTCB7XG4gIHVybDogc3RyaW5nLFxuICB4OiBudW1iZXIsXG4gIHk6IG51bWJlclxufVxuXG5leHBvcnQgY2xhc3MgQ2FwdHVyaW5nIHtcblxuICAvL+OCreODo+ODl+ODgeODo+a4iOOBvyBEYXRhVVJMIOOBrumbhuWQiFxuICBwcml2YXRlIGNhcHR1cmVVUkxzOiBDYXB0dXJlVVJMW10gPSBbXTtcblxuICAvKipcbiAgICogdGFyZ2V0IOOBjCBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQg44Gn44GC44KL44GL5Yik5a6a44GZ44KLXG4gICAqIOWFt+S9k+eahOOBq+OBryBkcmF3SW1hZ2Ug44Oh44K944OD44OJ44GM5a2Y5Zyo44GZ44KL44GL5Yik5a6a44GZ44KLXG4gICAqIEBwYXJhbSB0YXJnZXRcbiAgICovXG4gIHByaXZhdGUgX2lzQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9PiB7XG4gICAgcmV0dXJuIHRhcmdldC5kcmF3SW1hZ2UgIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgq3jg6Pjg5fjg4Hjg6PjgYzopIfmlbDmnprjgYLjgovloLTlkIjjgIHkuIDnlarlj7Mgb3Ig5LiA55Wq5LiL44Gr5L2N572u44GZ44KL55S75YOP44Gv5bqn5qiZ44KS44K644Op44GZ5b+F55So44GM44GC44KL44Gu44Gn44Gd44Gu5aSJ5pu05YmN44O75b6M44Gu5YCk44KS566X5Ye6XG4gICAqIGNhcHR1cmVVUkxzIOOBruWQhOmFjeWIl+WApOOBriB4IOOBiyB5IOOBruS4reOBi+OBi+OCieacgOWkp+WApOOCkuaOouOBl+OAgeOBneOBruWApOOBqOWkieabtOOBmeOBueOBjeWApOOCkui/lOOBmVxuICAgKiBkb2N1bWVudFNpemUg44GvIHRhcmdldCA9ICd4JyDjgaDjgaPjgZ/jgokgZG9jdW1lbnRXaWR0aCwgdGFyZ2V0ID0gJ3knIOOBoOOBo+OBn+OCiSBkb2N1bWVudEhlaWdodFxuICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAqIEBwYXJhbSBkb2N1bWVudFNpemVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX2dldE5lZWRUb0NoYW5nZUNvb3JkaW5hdGUgPSAodGFyZ2V0OiAneCcgfCAneScsIGRvY3VtZW50U2l6ZTogbnVtYmVyKToge29yaWdpbmFsOiBudW1iZXIsIGNoYW5nZWQ6IG51bWJlcn0gPT4ge1xuICAgIC8vY2FwdHVyZVVSTHMg5YaF44Gu44GuIHRhcmdldCDmnIDlpKflgKRcbiAgICBsZXQgbWF4ID0gMDtcblxuICAgIC8vdGFyZ2V0ID0gJ3gnIOOBquOCieeUu+WDj+S4gOaemuOBguOBn+OCiuOBruW5hSwgdGFyZ2V0ID0gJ3knIOOBquOCieeUu+WDj+S4gOaemuOBguOBn+OCiuOBrumrmOOBlVxuICAgIGxldCBzaXplID0gMDtcblxuICAgIC8v5pyA5aSn5YCk5qSc57SiXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbmd0aCA9IHRoaXMuY2FwdHVyZVVSTHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpID0gKGkgKyAxKSB8IDApIHtcbiAgICAgIGlmICh0aGlzLmNhcHR1cmVVUkxzW2ldW3RhcmdldF0gPD0gbWF4KSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvL+eUu+WDj+S4gOaemuOBguOBn+OCiuOBruWkp+OBjeOBleOCkueul+WHulxuICAgICAgc2l6ZSA9IHRoaXMuY2FwdHVyZVVSTHNbaV1bdGFyZ2V0XSAtIG1heDtcblxuICAgICAgLy/mnIDlpKflgKTjga7mm7TmlrBcbiAgICAgIG1heCA9IHRoaXMuY2FwdHVyZVVSTHNbaV1bdGFyZ2V0XTtcbiAgICB9XG5cbiAgICAvL+acgOWkp+WApCAvIGRvY3VtZW50U2l6ZSDjga7kvZnjgorjgpLlvJXjgY9cbiAgICByZXR1cm4ge1xuICAgICAgb3JpZ2luYWw6IG1heCxcbiAgICAgIGNoYW5nZWQ6IHNpemUgPT09IDAgfHwgbWF4ID09PSAwID8gbWF4IDogbWF4IC0gKHNpemUgLSBkb2N1bWVudFNpemUgJSBzaXplKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjYXB0dXJlVVJMcyDjga7kuIDnlarlj7Mgb3Ig5LiA55Wq5LiL44Gr5L2N572u44GZ44KL55S75YOP5bqn5qiZ44KS5pW05b2i44GX44Gm6L+U44GZXG4gICAqIEBwYXJhbSB3aWR0aFxuICAgKiBAcGFyYW0gaGVpZ2h0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIF9nZXRDYXB0dXJlVVJMc1NoYXBlZENvb3JkaW5hdGVzID0gKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogQ2FwdHVyZVVSTFtdID0+IHtcbiAgICAvL+OBk+OBrumWouaVsOOBjOi/lOOBmeWApFxuICAgIGxldCByZXN1bHRzOiBDYXB0dXJlVVJMW10gPSBbXTtcblxuICAgIC8veCDluqfmqJnjgaggeSDluqfmqJnjgZ3jgozjgZ7jgozjga7lpInmm7TjgZnjgbnjgY3luqfmqJnjgpLnrpflh7pcbiAgICBjb25zdCBjaGFuZ2VYID0gdGhpcy5fZ2V0TmVlZFRvQ2hhbmdlQ29vcmRpbmF0ZSgneCcsIHdpZHRoKTtcbiAgICBjb25zdCBjaGFuZ2VZID0gdGhpcy5fZ2V0TmVlZFRvQ2hhbmdlQ29vcmRpbmF0ZSgneScsIGhlaWdodCk7XG5cbiAgICAvL2NhcHR1cmVVUkxzIOOCkuaVtOW9ouOBl+OBpOOBpCByZXN1bHRzIOOBuOOCs+ODlOODvFxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSB0aGlzLmNhcHR1cmVVUkxzLmxlbmd0aDsgaSA8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XG4gICAgICAvL+OCs+ODlOODvFxuICAgICAgcmVzdWx0c1tpXSA9IHRoaXMuY2FwdHVyZVVSTHNbaV07XG5cbiAgICAgIC8veCDluqfmqJnjga7mlbTlvaJcbiAgICAgIGlmIChyZXN1bHRzW2ldLnggPT09IGNoYW5nZVgub3JpZ2luYWwpIHtcbiAgICAgICAgcmVzdWx0c1tpXS54ID0gY2hhbmdlWC5jaGFuZ2VkO1xuICAgICAgfVxuXG4gICAgICAvL3kg5bqn5qiZ44Gu5pW05b2iXG4gICAgICBpZiAocmVzdWx0c1tpXS55ID09PSBjaGFuZ2VZLm9yaWdpbmFsKSB7XG4gICAgICAgIHJlc3VsdHNbaV0ueSA9IGNoYW5nZVkuY2hhbmdlZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL+i/lOOBmVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgLyoqXG4gICAqIOePvuWcqCBjYXB0dXJlVVJMcyDjgavoqq3jgb/ovrzjgb7jgozjgabjgYTjgovjg4fjg7zjgr/jgpLjgqvjg7Pjg5Djgrnjgavoqq3jgb/ovrzjgb/jgIHlkIjmiJDjgIHjg4jjg6rjg5/jg7PjgrDjgZnjgotcbiAgICog5pyA57WC55qE44Gr5ZCQ44GN5Ye644GV44KM44KL55S75YOP44Gu5aSn44GN44GV44GvIHdpZHRoICogaGVpZ2h0IOOBqOOBquOCi1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHVibGljIGNvbXBvc2UgPSBhc3luYyAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgIC8v44Kr44Oz44OQ44K544Gu5L2c5oiQXG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cbiAgICAvL+OCq+ODs+ODkOOCueOBruWkp+OBjeOBleOCkuioreWumlxuICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgd2lkdGgrJ3B4Jyk7XG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaGVpZ2h0KydweCcpO1xuXG4gICAgLy8yRCDjgrPjg7Pjg4bjgq3jgrnjg4jjgpLlj5blvpdcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIC8vY3R4IOOBruOCv+OCpOODl+OCrOODvOODiVxuICAgIGlmICggISB0aGlzLl9pc0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRChjdHgpKVxuICAgIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICAvL+W6p+aomeaVtOW9ouW+jOOBriBjYXB0dXJlVVJMXG4gICAgY29uc3QgY2hhbmdlZENhcHR1cmVVUkxzID0gdGhpcy5fZ2V0Q2FwdHVyZVVSTHNTaGFwZWRDb29yZGluYXRlcyh3aWR0aCwgaGVpZ2h0KTtcblxuICAgIC8v44Kr44Oz44OQ44K544Gr55S75YOP44KS6Kit572uXG4gICAgYXdhaXQgY2hhbmdlZENhcHR1cmVVUkxzLnJlZHVjZSgocHJldiwgY3VycmVudCkgPT4gcHJldi50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIGN1cnJlbnQueCwgY3VycmVudC55KTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH07XG4gICAgICAgIGltYWdlLnNyYyA9IGN1cnJlbnQudXJsO1xuICAgICAgfSk7XG4gICAgfSksIFByb21pc2UucmVzb2x2ZSgpKTtcblxuICAgIC8vZGF0YVVSTCDjgpLnlJ/miJBcbiAgICBjb25zdCBkYXRhID0gY2FudmFzLnRvRGF0YVVSTCgpO1xuXG4gICAgLy9jYW52YXMg44KS5raI44GZXG4gICAgY2FudmFzLnJlbW92ZSgpO1xuXG4gICAgLy9kYXRhVVJMIOOCkui/lOOBmVxuICAgIHJldHVybiBkYXRhO1xuICB9O1xuXG4gIC8qKlxuICAgKiDjgq3jg6Pjg5fjg4Hjg6PjgpLlj5blvpfjgZfjgIFjYXB0dXJlVVJMcyDjgasgcHVzaCDjgZnjgotcbiAgICogQHBhcmFtIHhcbiAgICogQHBhcmFtIHlcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHB1YmxpYyBjYXB0dXJlKHg6IG51bWJlciwgeTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgY2hyb21lLnRhYnMuY2FwdHVyZVZpc2libGVUYWIoKHVybCkgPT4ge1xuICAgICAgICB0aGlzLmNhcHR1cmVVUkxzLnB1c2goe3gsIHksIHVybH0pO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjYXB0dXJlVVJMcyDjgpLnqbrjgavjgZnjgotcbiAgICovXG4gIHB1YmxpYyBpbml0KCkge1xuICAgIHRoaXMuY2FwdHVyZVVSTHMgPSBbXTtcbiAgfVxuXG59XG4iLCIvKipcbiAqIOODleOCoeOCpOODq+ODjeODvOODoOS9nOaIkOOCr+ODqeOCuVxuICovXG5pbXBvcnQge1RlbXBsYXRlc30gZnJvbSBcIi4vaW50ZXJmYWNlXCI7XG5cbmV4cG9ydCBjbGFzcyBGaWxlbmFtZSB7XG5cbiAgLyoqXG4gICAqIOe9ruOBjeaPm+OBiOWumue+qVxuICAgKi9cbiAgcHJpdmF0ZSB0ZW1wbGF0ZXM6IFRlbXBsYXRlcztcblxuICAvKipcbiAgICog44OV44Kh44Kk44Or5ZCN44Gr5L2/55So44Gn44GN44Gq44GE5paH5a2X44KS5YWo44GmIHJlcGxhY2VtZW50IOOBq+e9ruaPm+OBl+OBpui/lOOBmVxuICAgKiBAcGFyYW0gc3RyaW5nXG4gICAqIEBwYXJhbSByZXBsYWNlbWVudFxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIF9yZXBsYWNlQmFkQ2hhcmFjdGVyKHN0cmluZzogc3RyaW5nLCByZXBsYWNlbWVudDogc3RyaW5nID0gJ18nKSB7XG4gICAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UoL1tcXFxcXFwvOlxcKlxcP1wiPD5cXC1cXHxcXHNdKy9nLCByZXBsYWNlbWVudCk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcy50ZW1wbGF0ZXMg44Gu5a6a576pXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50ZW1wbGF0ZXMgPSBuZXcgQXJyYXkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg4bjg7Pjg5fjg6zjg7zjg4jlpInmlbDmloflrZfliJfjgajjgZ3jga7lgKTjgpLoqK3lrprjgZnjgotcbiAgICogQHBhcmFtIHRlbXBsYXRlXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgcHVibGljIHNldFRlbXBsYXRlKHRlbXBsYXRlOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnRlbXBsYXRlcy5wdXNoKHtcbiAgICAgIHRlbXBsYXRlOiBTdHJpbmcodGVtcGxhdGUpLFxuICAgICAgdmFsdWU6IFN0cmluZyh2YWx1ZSlcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXRUZW1wbGF0ZSgpLCBfcmVwbGFjZUJhZENoYXJhY3RlcigpIOOBp+WkieaPm+OBl+OBn+ODleOCoeOCpOODq+WQjeOCkuWHuuWKm1xuICAgKiBAcGFyYW0gbmFtZVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBwdWJsaWMgZ2V0RmlsZU5hbWUobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAvL+ODhuODs+ODl+ODrOODvOODiOWkieaVsOaWh+Wtl+WIl+OCkuWApOOBq+e9ruOBjeaPm+OBiOOCi1xuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSB0aGlzLnRlbXBsYXRlcy5sZW5ndGg7IGkgPCBtYXg7IGkgPSAoaSArIDEpIHwgMCkge1xuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKS5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy50ZW1wbGF0ZXNbaV0udGVtcGxhdGUsICdnJyksIHRoaXMudGVtcGxhdGVzW2ldLnZhbHVlKTtcbiAgICB9XG5cbiAgICAvL+S9v+eUqOS4jeWPr+OBruaWh+Wtl+OCkuWFqOOBpue9ruOBjeaPm+OBiOOBpui/lOWNtFxuICAgIHJldHVybiB0aGlzLl9yZXBsYWNlQmFkQ2hhcmFjdGVyKG5hbWUpO1xuICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=