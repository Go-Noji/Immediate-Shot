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
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ "./src/config.ts");
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
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    innerResolve(tabs[0]);
                });
            })
                .then(tab => {
                return new Promise(innerResolve => {
                    chrome.storage.sync.get({ range: _config__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_RANGE"], title: _config__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_TITLE"], counter: _config__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_COUNTER"], max: _config__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_MAX"] }, (items) => {
                        innerResolve({ tab, settings: { range: castRange(items.range), title: String(items.title), counter: Number(items.counter), max: Boolean(items.max) } });
                    });
                });
            })
                .then((data) => {
                //現合表示しているタブの情報を入手
                chrome.tabs.sendMessage(Number(data.tab.id), { type: 'information', max: data.settings.max }, (information) => {
                    console.log(information);
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
    const createCapture = (id, range, index, max = false) => {
        return new Promise(resolve => {
            //index === 1 (キャプチャが二回目)の場合は position: fixed の要素を非表示にする
            if (index === 1) {
                chrome.tabs.sendMessage(id, { type: 'killFixed' });
            }
            //スクロール・キャプチャ
            chrome.tabs.sendMessage(id, { type: 'sizing', range: range, index: index, max: max }, response => {
                setTimeout(() => {
                    capturing.capture(response.x, response.y)
                        .then(() => {
                        resolve();
                    });
                }, index < 2 ? _config__WEBPACK_IMPORTED_MODULE_2__["FIRST_CAPTURE_WAIT_MILLISECONDS"] : _config__WEBPACK_IMPORTED_MODULE_2__["CAPTURE_WAIT_MILLISECONDS"]);
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
            yield createCapture(Number(tab.id), settings.range, i, settings.max);
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
            //カンバスに画像を設置
            yield this.captureURLs.reduce((prev, current) => prev.then(() => {
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


/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/*! exports provided: DEFAULT_RANGE, DEFAULT_TITLE, DEFAULT_MAX, DEFAULT_COUNTER, CAPTURE_WAIT_MILLISECONDS, FIRST_CAPTURE_WAIT_MILLISECONDS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_RANGE", function() { return DEFAULT_RANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_TITLE", function() { return DEFAULT_TITLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_MAX", function() { return DEFAULT_MAX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_COUNTER", function() { return DEFAULT_COUNTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CAPTURE_WAIT_MILLISECONDS", function() { return CAPTURE_WAIT_MILLISECONDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FIRST_CAPTURE_WAIT_MILLISECONDS", function() { return FIRST_CAPTURE_WAIT_MILLISECONDS; });
//キャプチャ範囲初期値
const DEFAULT_RANGE = 'perfect';
//タイトル名初期値
const DEFAULT_TITLE = '{{title}}';
//サイトのマックス値を画面幅だけで取るか、全要素から取得するか
const DEFAULT_MAX = false;
//カウント変数初期値
const DEFAULT_COUNTER = 1;
//複数枚キャプチャの際、次のキャプチャまで何ミリ秒間隔を置くか
const CAPTURE_WAIT_MILLISECONDS = 20;
//CAPTURE_WAIT_MILLISECONDS が使われる際、最初の一回だけはこの値が使用される
const FIRST_CAPTURE_WAIT_MILLISECONDS = 100;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzL0NhcHR1cmluZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MvRmlsZW5hbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakY0QztBQUNGO0FBQ3hCO0FBQzhIO0FBUWhKO0lBQ0MsZUFBZTtJQUNmLE1BQU0sU0FBUyxHQUFHLElBQUksMERBQVMsRUFBRSxDQUFDO0lBRWxDOztPQUVHO0lBQ0gsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO1FBQ2pCOzs7V0FHRztRQUNILE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBYSxFQUFTLEVBQUU7WUFDMUMs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QUFFcEQsb0RBQW9EO0FBQzdDLE1BQU0sK0JBQStCLEdBQVcsR0FBRyxDQUFDIiwiZmlsZSI6ImJhY2tncm91bmQuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYmFja2dyb3VuZC50c1wiKTtcbiIsImltcG9ydCB7SW5mb3JtYXRpb24sIFNldHRpbmdzLCBSYW5nZX0gZnJvbSBcInNyYy9jbGFzcy9pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHtDYXB0dXJpbmd9IGZyb20gXCIuL2NsYXNzL0NhcHR1cmluZ1wiO1xyXG5pbXBvcnQge0ZpbGVuYW1lfSBmcm9tIFwiLi9jbGFzcy9GaWxlbmFtZVwiO1xyXG5pbXBvcnQgJy4vY29uZmlnJztcclxuaW1wb3J0IHtDQVBUVVJFX1dBSVRfTUlMTElTRUNPTkRTLCBERUZBVUxUX0NPVU5URVIsIERFRkFVTFRfUkFOR0UsIERFRkFVTFRfTUFYLCBERUZBVUxUX1RJVExFLCBGSVJTVF9DQVBUVVJFX1dBSVRfTUlMTElTRUNPTkRTfSBmcm9tIFwiLi9jb25maWdcIjtcclxuXHJcbmludGVyZmFjZSBJbml0RGF0YSB7XHJcblx0dGFiOiBjaHJvbWUudGFicy5UYWIsXHJcblx0c2V0dGluZ3M6IFNldHRpbmdzLFxyXG5cdGluZm9ybWF0aW9uOiBJbmZvcm1hdGlvblxyXG59XHJcblxyXG57XHJcblx0Ly9DYXB0dXJpbmcg44Kv44Op44K5XHJcblx0Y29uc3QgY2FwdHVyaW5nID0gbmV3IENhcHR1cmluZygpO1xyXG5cclxuXHQvKipcclxuXHQgKiDmi6HlvLXmqZ/og73jga7oqK3lrprjgajnj77lnKjlj4LnhafkuK3jga7jgr/jg5bmg4XloLHjgpLov5TjgZlcclxuXHQgKi9cclxuXHRjb25zdCBpbml0ID0gKCkgPT4ge1xyXG5cdFx0LyoqXHJcblx0XHQgKiByYW5nZSDjgpIgUmFuZ2Ug5Z6L44Gr44Kt44Oj44K544OI44GZ44KLXHJcblx0XHQgKiBAcGFyYW0gcmFuZ2VcclxuXHRcdCAqL1xyXG5cdFx0Y29uc3QgY2FzdFJhbmdlID0gKHJhbmdlOiBzdHJpbmcpOiBSYW5nZSA9PiB7XHJcblx0XHRcdHN3aXRjaCAocmFuZ2UpIHtcclxuXHRcdFx0XHRjYXNlICdmdWxsJzpcclxuXHRcdFx0XHRjYXNlICdkaXNwbGF5JzpcclxuXHRcdFx0XHRjYXNlICdwZXJmZWN0JzpcclxuXHRcdFx0XHRcdHJldHVybiByYW5nZTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRyZXR1cm4gJ2Z1bGwnO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPEluaXREYXRhPihyZXNvbHZlID0+IHtcclxuXHRcdFx0Ly/mi6HlvLXmqZ/og73jga7oqK3lrprjgpLlhaXmiYtcclxuXHRcdFx0bmV3IFByb21pc2U8Y2hyb21lLnRhYnMuVGFiPihpbm5lclJlc29sdmUgPT4ge1xyXG5cdFx0XHRcdGNocm9tZS50YWJzLnF1ZXJ5KHthY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWV9LCAodGFiczogY2hyb21lLnRhYnMuVGFiW10pID0+IHtcclxuXHRcdFx0XHRcdGlubmVyUmVzb2x2ZSh0YWJzWzBdKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHRcdFx0XHQudGhlbih0YWIgPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlPHt0YWI6IGNocm9tZS50YWJzLlRhYiwgc2V0dGluZ3M6IFNldHRpbmdzfT4oaW5uZXJSZXNvbHZlID0+IHtcclxuXHRcdFx0XHRcdFx0Y2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoe3JhbmdlOiBERUZBVUxUX1JBTkdFLCB0aXRsZTogREVGQVVMVF9USVRMRSwgY291bnRlcjogREVGQVVMVF9DT1VOVEVSLCBtYXg6IERFRkFVTFRfTUFYfSwgKGl0ZW1zOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdGlubmVyUmVzb2x2ZSh7dGFiLCBzZXR0aW5nczoge3JhbmdlOiBjYXN0UmFuZ2UoaXRlbXMucmFuZ2UpLCB0aXRsZTogU3RyaW5nKGl0ZW1zLnRpdGxlKSwgY291bnRlcjogTnVtYmVyKGl0ZW1zLmNvdW50ZXIpLCBtYXg6IEJvb2xlYW4oaXRlbXMubWF4KX19KTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC50aGVuKChkYXRhOiB7dGFiOiBjaHJvbWUudGFicy5UYWIsIHNldHRpbmdzOiBTZXR0aW5nc30pID0+IHtcclxuXHRcdFx0XHRcdC8v54++5ZCI6KGo56S644GX44Gm44GE44KL44K/44OW44Gu5oOF5aCx44KS5YWl5omLXHJcblx0XHRcdFx0XHRjaHJvbWUudGFicy5zZW5kTWVzc2FnZShOdW1iZXIoZGF0YS50YWIuaWQpLCB7dHlwZTogJ2luZm9ybWF0aW9uJywgbWF4OiBkYXRhLnNldHRpbmdzLm1heH0sIChpbmZvcm1hdGlvbjogSW5mb3JtYXRpb24pID0+IHtcclxuXHRcdFx0XHRcdCAgY29uc29sZS5sb2coaW5mb3JtYXRpb24pO1xyXG5cdFx0XHRcdFx0XHRyZXNvbHZlKHt0YWI6IGRhdGEudGFiLCBzZXR0aW5nczogZGF0YS5zZXR0aW5ncywgaW5mb3JtYXRpb259KTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICog54++5Zyo6KGo56S644GX44Gm44GE44KL44K/44OW44Gu44Kt44Oj44OX44OB44Oj44KS5LiA5Zue6KGM44GGXHJcblx0ICogQHBhcmFtIGlkXHJcblx0ICogQHBhcmFtIHJhbmdlXHJcblx0ICovXHJcblx0Y29uc3QgY3JlYXRlQ2FwdHVyZSA9IChpZDogbnVtYmVyLCByYW5nZTogUmFuZ2UsIGluZGV4OiBudW1iZXIsIG1heDogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcblx0XHRyZXR1cm4gIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG5cdFx0XHQvL2luZGV4ID09PSAxICjjgq3jg6Pjg5fjg4Hjg6PjgYzkuozlm57nm64p44Gu5aC05ZCI44GvIHBvc2l0aW9uOiBmaXhlZCDjga7opoHntKDjgpLpnZ7ooajnpLrjgavjgZnjgotcclxuXHRcdFx0aWYgKGluZGV4ID09PSAxKSB7XHJcblx0XHRcdFx0Y2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoaWQsIHt0eXBlOiAna2lsbEZpeGVkJ30pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvL+OCueOCr+ODreODvOODq+ODu+OCreODo+ODl+ODgeODo1xyXG5cdFx0XHRjaHJvbWUudGFicy5zZW5kTWVzc2FnZShpZCwge3R5cGU6ICdzaXppbmcnLCByYW5nZTogcmFuZ2UsIGluZGV4OiBpbmRleCwgbWF4OiBtYXh9LCByZXNwb25zZSA9PiB7XHJcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XHJcblx0XHRcdFx0XHRjYXB0dXJpbmcuY2FwdHVyZShyZXNwb25zZS54LCByZXNwb25zZS55KVxyXG5cdFx0XHRcdFx0XHQudGhlbigoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LCBpbmRleCA8IDIgPyBGSVJTVF9DQVBUVVJFX1dBSVRfTUlMTElTRUNPTkRTIDogQ0FQVFVSRV9XQUlUX01JTExJU0VDT05EUyk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogc2V0dGluZ3Mg44GoIGluZm9ybWF0aW9uIOOBi+OCieaxguOCgeOCieOCjOOBpuOBhOOCi+eUu+WDj+OCteOCpOOCuuOCkuWwjuOBjeWHuuOBmVxyXG5cdCAqIEBwYXJhbSBzZXR0aW5nc1xyXG5cdCAqIEBwYXJhbSBpbmZvcm1hdGlvblxyXG5cdCAqL1xyXG5cdGNvbnN0IGdldEltYWdlU2l6ZSA9IChzZXR0aW5nczogU2V0dGluZ3MsIGluZm9ybWF0aW9uOiBJbmZvcm1hdGlvbik6IHt3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcn0gPT4ge1xyXG5cdFx0Ly/mnIDntYLnmoTjgarnlLvlg4/jgrXjgqTjgrrjgpLmsbrlrpoo44GT44Gu5pmC54K544Gn44GvIHJhbmdlID0gZGlzcGxheSDnlKgpXHJcblx0XHRsZXQgd2lkdGggPSBpbmZvcm1hdGlvbi53aW5kb3dXaWR0aDtcclxuXHRcdGxldCBoZWlnaHQgPSBpbmZvcm1hdGlvbi53aW5kb3dIZWlnaHQ7XHJcblxyXG5cdFx0Ly9yYW5nZSDjgavlkIjjgo/jgZvjgZ/nlLvlg4/jgrXjgqTjgrrjgpLnlKjmhI9cclxuXHRcdHN3aXRjaCAoc2V0dGluZ3MucmFuZ2UpIHtcclxuXHRcdFx0Y2FzZSAnZnVsbCc6XHJcblx0XHRcdFx0d2lkdGggPSBpbmZvcm1hdGlvbi5yYXRpb1R5cGUgPT09ICd3aWR0aCdcclxuXHRcdFx0XHRcdD8gaW5mb3JtYXRpb24ud2luZG93V2lkdGhcclxuXHRcdFx0XHRcdDogaW5mb3JtYXRpb24ud2luZG93V2lkdGggKiBpbmZvcm1hdGlvbi5yYXRpbztcclxuXHRcdFx0XHRoZWlnaHQgPSBpbmZvcm1hdGlvbi5yYXRpb1R5cGUgPT09ICdoZWlnaHQnXHJcblx0XHRcdFx0XHQ/IGluZm9ybWF0aW9uLndpbmRvd0hlaWdodFxyXG5cdFx0XHRcdFx0OiBpbmZvcm1hdGlvbi53aW5kb3dIZWlnaHQgKiBpbmZvcm1hdGlvbi5yYXRpbztcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAncGVyZmVjdCc6XHJcblx0XHRcdFx0d2lkdGggPSBpbmZvcm1hdGlvbi5kb2N1bWVudFdpZHRoO1xyXG5cdFx0XHRcdGhlaWdodCA9IGluZm9ybWF0aW9uLmRvY3VtZW50SGVpZ2h0O1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8v6L+U44GZXHJcblx0XHRyZXR1cm4gIHt3aWR0aCwgaGVpZ2h0fTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiDnj77lnKjplovjgYTjgabjgYTjgovjgr/jg5bjga7jgq3jg6Pjg5fjg4Hjg6PjgpLooYzjgYZcclxuXHQgKiBAcGFyYW0gc2V0dGluZ3NcclxuXHQgKiBAcGFyYW0gaW5mb3JtYXRpb25cclxuXHQgKiBAcGFyYW0gdGFiXHJcblx0ICovXHJcblx0Y29uc3QgZ2V0RGF0YVVSTCA9IGFzeW5jIChzZXR0aW5nczogU2V0dGluZ3MsIGluZm9ybWF0aW9uOiBJbmZvcm1hdGlvbiwgdGFiOiBjaHJvbWUudGFicy5UYWIpID0+IHtcclxuXHRcdC8v5L2V5p6a44Gu55S75YOP44KS44Kt44Oj44OX44OB44Oj44GZ44KL44GLXHJcblx0XHRjb25zdCBjYXB0dXJlTnVtYmVyID0gc2V0dGluZ3MucmFuZ2UgPT09ICdwZXJmZWN0J1xyXG5cdFx0XHQ/IGluZm9ybWF0aW9uLmNhcHR1cmVOdW1iZXJcclxuXHRcdFx0OiAxO1xyXG5cclxuXHRcdC8v44K144Kk44K65Y+W5b6XXHJcblx0XHRjb25zdCBzaXplID0gZ2V0SW1hZ2VTaXplKHNldHRpbmdzLCBpbmZvcm1hdGlvbik7XHJcblxyXG5cdFx0Ly/jgq3jg6Pjg5fjg4Hjg6Plh6bnkIbjgpLlv4XopoHjgarlm57mlbDjgaDjgZHooYzjgYZcclxuXHRcdGZvciAobGV0IGkgPSAwLCBtYXggPSBjYXB0dXJlTnVtYmVyOyBpIDwgbWF4OyBpID0gKGkgKyAxKSB8IDApIHtcclxuXHRcdFx0YXdhaXQgY3JlYXRlQ2FwdHVyZShOdW1iZXIodGFiLmlkKSwgc2V0dGluZ3MucmFuZ2UsIGksIHNldHRpbmdzLm1heCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly/jgrnjgr/jgqTjg6vjgpLlhYPjgavmiLvjgZlcclxuXHRcdGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKE51bWJlcih0YWIuaWQpLCB7dHlwZTogJ3Jlc2V0U2l6aW5nJywgeDogaW5mb3JtYXRpb24uc2Nyb2xsWCwgeTogaW5mb3JtYXRpb24uc2Nyb2xsWX0pO1xyXG5cclxuXHRcdC8vZGF0YVVSTCDljJZcclxuXHRcdHJldHVybiBjYXB0dXJpbmcuY29tcG9zZShzaXplLndpZHRoLCBzaXplLmhlaWdodCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICog44OV44Kh44Kk44Or5ZCN44KS5rG65a6a44GX44CB44OA44Km44Oz44Ot44O844OJ44KS6KGM44GGXHJcblx0ICogQHBhcmFtIHVybFxyXG5cdCAqIEBwYXJhbSBzZXR0aW5nc1xyXG5cdCAqL1xyXG5cdGNvbnN0IGRvd25sb2FkID0gKHVybDogc3RyaW5nLCBzZXR0aW5nczogU2V0dGluZ3MsIHRhYjogY2hyb21lLnRhYnMuVGFiKSA9PiB7XHJcblx0XHQvL+ODleOCoeOCpOODq+WQjeWkieaPm+eUqOOCr+ODqeOCuVxyXG5cdFx0Y29uc3QgZmlsZW5hbWUgPSBuZXcgRmlsZW5hbWUoKTtcclxuXHJcblx0XHQvL+ODleOCoeOCpOODq+WQjeODhuODs+ODl+ODrOODvOODiOWkieaVsOaWh+Wtl+WIl+eZu+mMslxyXG5cdFx0aWYgKHNldHRpbmdzLnRpdGxlLmluZGV4T2YoJ3t7dGl0bGV9fScpICE9PSAtMSkge1xyXG5cdFx0XHRmaWxlbmFtZS5zZXRUZW1wbGF0ZSgne3t0aXRsZX19JywgZGVjb2RlVVJJQ29tcG9uZW50KFN0cmluZyh0YWIudGl0bGUpKSk7XHJcblx0XHR9XHJcblx0XHRpZiAoc2V0dGluZ3MudGl0bGUuaW5kZXhPZigne3t1cmx9fScpICE9PSAtMSkge1xyXG5cdFx0XHRmaWxlbmFtZS5zZXRUZW1wbGF0ZSgne3t1cmx9fScsIFN0cmluZyh0YWIudXJsKS5yZXBsYWNlKC9odHRwcz86XFwvXFwvLywgJycpKTtcclxuXHRcdH1cclxuXHRcdGlmIChzZXR0aW5ncy50aXRsZS5pbmRleE9mKCd7e2NvdW50ZXJ9fScpICE9PSAtMSkge1xyXG5cdFx0XHRmaWxlbmFtZS5zZXRUZW1wbGF0ZSgne3tjb3VudGVyfX0nLCBTdHJpbmcoc2V0dGluZ3MuY291bnRlcikpO1xyXG5cdFx0XHRzZXR0aW5ncy5jb3VudGVyID0gc2V0dGluZ3MuY291bnRlciArIDE7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly9jb3VudGVyIOioreWumuOBruS/neWtmFxyXG5cdFx0Y2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe2NvdW50ZXI6IHNldHRpbmdzLmNvdW50ZXJ9KTtcclxuXHJcblx0XHQvL+ODgOOCpuODs+ODreODvOODiVxyXG5cdFx0Y2hyb21lLmRvd25sb2Fkcy5kb3dubG9hZCh7dXJsOiB1cmwsIGZpbGVuYW1lOiBmaWxlbmFtZS5nZXRGaWxlTmFtZShzZXR0aW5ncy50aXRsZSkrJy5wbmcnfSk7XHJcblx0fTtcclxuXHJcblx0Ly/jgq3jg6Pjg5fjg4Hjg6Plrp/ooYxcclxuXHRjb25zdCBhY3Rpb24gPSAoKSA9PiB7XHJcblx0XHQvL+OCreODo+ODl+ODgeODo+OBruWIneacn+WMllxyXG5cdFx0Y2FwdHVyaW5nLmluaXQoKTtcclxuXHJcblx0XHQvL+ePvuWcqOihqOekuuOBl+OBpuOBhOOCi+OCv+ODluOBruaDheWgseOCkuWFpeaJi+OBmeOCi1xyXG5cdFx0aW5pdCgpXHJcblx0XHRcdC50aGVuKGRhdGEgPT4ge1xyXG5cdFx0XHRcdGdldERhdGFVUkwoZGF0YS5zZXR0aW5ncywgZGF0YS5pbmZvcm1hdGlvbiwgZGF0YS50YWIpXHJcblx0XHRcdFx0XHQudGhlbigodXJsOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0XHRcdFx0ZG93bmxvYWQodXJsLCBkYXRhLnNldHRpbmdzLCBkYXRhLnRhYik7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHRcdFx0LmNhdGNoKChkYXRhKSA9PiB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0YWxlcnQoJ1NvcnJ5LCBUcnkgYWdhaW4gYWZ0ZXIgcmVsb2FkLicpO1xyXG5cdFx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvL+OCouOCpOOCs+ODs+OCr+ODquODg+OCr1xyXG5cdGNocm9tZS5icm93c2VyQWN0aW9uLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcihhY3Rpb24pO1xyXG5cclxuXHQvL+WPs+OCr+ODquODg+OCr+ODoeODi+ODpeODvFxyXG5cdGNocm9tZS5jb250ZXh0TWVudXMuY3JlYXRlKHtcclxuXHRcdGlkOiAncnVuJyxcclxuXHRcdHRpdGxlOiAnSW1tZWRpYXRlIFNob3QnLFxyXG5cdFx0Y29udGV4dHM6IFsnYWxsJ10sXHJcblx0XHR0eXBlOiAnbm9ybWFsJ1xyXG5cdH0pO1xyXG5cdGNocm9tZS5jb250ZXh0TWVudXMub25DbGlja2VkLmFkZExpc3RlbmVyKGFjdGlvbik7XHJcbn1cclxuIiwiaW50ZXJmYWNlIENhcHR1cmVVUkwge1xyXG4gIHVybDogc3RyaW5nLFxyXG4gIHg6IG51bWJlcixcclxuICB5OiBudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENhcHR1cmluZyB7XHJcblxyXG4gIC8v44Kt44Oj44OX44OB44Oj5riI44G/IERhdGFVUkwg44Gu6ZuG5ZCIXHJcbiAgcHJpdmF0ZSBjYXB0dXJlVVJMczogQ2FwdHVyZVVSTFtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIHRhcmdldCDjgYwgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIOOBp+OBguOCi+OBi+WIpOWumuOBmeOCi1xyXG4gICAqIOWFt+S9k+eahOOBq+OBryBkcmF3SW1hZ2Ug44Oh44K944OD44OJ44GM5a2Y5Zyo44GZ44KL44GL5Yik5a6a44GZ44KLXHJcbiAgICogQHBhcmFtIHRhcmdldFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2lzQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9PiB7XHJcbiAgICByZXR1cm4gdGFyZ2V0LmRyYXdJbWFnZSAhPT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog54++5ZyoIGNhcHR1cmVVUkxzIOOBq+iqreOBv+i+vOOBvuOCjOOBpuOBhOOCi+ODh+ODvOOCv+OCkuOCq+ODs+ODkOOCueOBq+iqreOBv+i+vOOBv+OAgeWQiOaIkOOAgeODiOODquODn+ODs+OCsOOBmeOCi1xyXG4gICAqIOacgOe1gueahOOBq+WQkOOBjeWHuuOBleOCjOOCi+eUu+WDj+OBruWkp+OBjeOBleOBryB3aWR0aCAqIGhlaWdodCDjgajjgarjgotcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb21wb3NlID0gYXN5bmMgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcclxuICAgIC8v44Kr44Oz44OQ44K544Gu5L2c5oiQXHJcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuXHJcbiAgICAvL+OCq+ODs+ODkOOCueOBruWkp+OBjeOBleOCkuioreWumlxyXG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3aWR0aCsncHgnKTtcclxuICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGhlaWdodCsncHgnKTtcclxuXHJcbiAgICAvLzJEIOOCs+ODs+ODhuOCreOCueODiOOCkuWPluW+l1xyXG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG4gICAgLy9jdHgg44Gu44K/44Kk44OX44Ks44O844OJXHJcbiAgICBpZiAoICEgdGhpcy5faXNDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQoY3R4KSlcclxuICAgIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIC8v44Kr44Oz44OQ44K544Gr55S75YOP44KS6Kit572uXHJcbiAgICBhd2FpdCB0aGlzLmNhcHR1cmVVUkxzLnJlZHVjZSgocHJldiwgY3VycmVudCkgPT4gcHJldi50aGVuKCgpID0+IHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgY3VycmVudC54LCBjdXJyZW50LnkpO1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaW1hZ2Uuc3JjID0gY3VycmVudC51cmw7XHJcbiAgICAgIH0pO1xyXG4gICAgfSksIFByb21pc2UucmVzb2x2ZSgpKTtcclxuXHJcbiAgICAvL2RhdGFVUkwg44KS55Sf5oiQXHJcbiAgICBjb25zdCBkYXRhID0gY2FudmFzLnRvRGF0YVVSTCgpO1xyXG5cclxuICAgIC8vY2FudmFzIOOCkua2iOOBmVxyXG4gICAgY2FudmFzLnJlbW92ZSgpO1xyXG5cclxuICAgIC8vZGF0YVVSTCDjgpLov5TjgZlcclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCreODo+ODl+ODgeODo+OCkuWPluW+l+OBl+OAgWNhcHR1cmVVUkxzIOOBqyBwdXNoIOOBmeOCi1xyXG4gICAqIEBwYXJhbSB4XHJcbiAgICogQHBhcmFtIHlcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjYXB0dXJlKHg6IG51bWJlciwgeTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGNocm9tZS50YWJzLmNhcHR1cmVWaXNpYmxlVGFiKCh1cmwpID0+IHtcclxuICAgICAgICB0aGlzLmNhcHR1cmVVUkxzLnB1c2goe3gsIHksIHVybH0pO1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNhcHR1cmVVUkxzIOOCkuepuuOBq+OBmeOCi1xyXG4gICAqL1xyXG4gIHB1YmxpYyBpbml0KCkge1xyXG4gICAgdGhpcy5jYXB0dXJlVVJMcyA9IFtdO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiLyoqXHJcbiAqIOODleOCoeOCpOODq+ODjeODvOODoOS9nOaIkOOCr+ODqeOCuVxyXG4gKi9cclxuaW1wb3J0IHtUZW1wbGF0ZXN9IGZyb20gXCIuL2ludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpbGVuYW1lIHtcclxuXHJcbiAgLyoqXHJcbiAgICog572u44GN5o+b44GI5a6a576pXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB0ZW1wbGF0ZXM6IFRlbXBsYXRlcztcclxuXHJcbiAgLyoqXHJcbiAgICog44OV44Kh44Kk44Or5ZCN44Gr5L2/55So44Gn44GN44Gq44GE5paH5a2X44KS5YWo44GmIHJlcGxhY2VtZW50IOOBq+e9ruaPm+OBl+OBpui/lOOBmVxyXG4gICAqIEBwYXJhbSBzdHJpbmdcclxuICAgKiBAcGFyYW0gcmVwbGFjZW1lbnRcclxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9yZXBsYWNlQmFkQ2hhcmFjdGVyKHN0cmluZzogc3RyaW5nLCByZXBsYWNlbWVudDogc3RyaW5nID0gJ18nKSB7XHJcbiAgICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZSgvW1xcXFxcXC86XFwqXFw/XCI8PlxcLVxcfFxcc10rL2csIHJlcGxhY2VtZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHRoaXMudGVtcGxhdGVzIOOBruWumue+qVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMudGVtcGxhdGVzID0gbmV3IEFycmF5KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjg4bjg7Pjg5fjg6zjg7zjg4jlpInmlbDmloflrZfliJfjgajjgZ3jga7lgKTjgpLoqK3lrprjgZnjgotcclxuICAgKiBAcGFyYW0gdGVtcGxhdGVcclxuICAgKiBAcGFyYW0gdmFsdWVcclxuICAgKi9cclxuICBwdWJsaWMgc2V0VGVtcGxhdGUodGVtcGxhdGU6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy50ZW1wbGF0ZXMucHVzaCh7XHJcbiAgICAgIHRlbXBsYXRlOiBTdHJpbmcodGVtcGxhdGUpLFxyXG4gICAgICB2YWx1ZTogU3RyaW5nKHZhbHVlKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzZXRUZW1wbGF0ZSgpLCBfcmVwbGFjZUJhZENoYXJhY3RlcigpIOOBp+WkieaPm+OBl+OBn+ODleOCoeOCpOODq+WQjeOCkuWHuuWKm1xyXG4gICAqIEBwYXJhbSBuYW1lXHJcbiAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRGaWxlTmFtZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgLy/jg4bjg7Pjg5fjg6zjg7zjg4jlpInmlbDmloflrZfliJfjgpLlgKTjgavnva7jgY3mj5vjgYjjgotcclxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSB0aGlzLnRlbXBsYXRlcy5sZW5ndGg7IGkgPCBtYXg7IGkgPSAoaSArIDEpIHwgMCkge1xyXG4gICAgICBuYW1lID0gU3RyaW5nKG5hbWUpLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLnRlbXBsYXRlc1tpXS50ZW1wbGF0ZSwgJ2cnKSwgdGhpcy50ZW1wbGF0ZXNbaV0udmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5L2/55So5LiN5Y+v44Gu5paH5a2X44KS5YWo44Gm572u44GN5o+b44GI44Gm6L+U5Y20XHJcbiAgICByZXR1cm4gdGhpcy5fcmVwbGFjZUJhZENoYXJhY3RlcihuYW1lKTtcclxuICB9XHJcblxyXG59XHJcbiIsIi8v44Kt44Oj44OX44OB44Oj56+E5Zuy5Yid5pyf5YCkXHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX1JBTkdFOiBzdHJpbmcgPSAncGVyZmVjdCc7XHJcblxyXG4vL+OCv+OCpOODiOODq+WQjeWIneacn+WApFxyXG5leHBvcnQgY29uc3QgREVGQVVMVF9USVRMRTogc3RyaW5nID0gJ3t7dGl0bGV9fSc7XHJcblxyXG4vL+OCteOCpOODiOOBruODnuODg+OCr+OCueWApOOCkueUu+mdouW5heOBoOOBkeOBp+WPluOCi+OBi+OAgeWFqOimgee0oOOBi+OCieWPluW+l+OBmeOCi+OBi1xyXG5leHBvcnQgY29uc3QgREVGQVVMVF9NQVg6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbi8v44Kr44Km44Oz44OI5aSJ5pWw5Yid5pyf5YCkXHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPVU5URVI6IG51bWJlciA9IDE7XHJcblxyXG4vL+ikh+aVsOaemuOCreODo+ODl+ODgeODo+OBrumam+OAgeasoeOBruOCreODo+ODl+ODgeODo+OBvuOBp+S9leODn+ODquenkumWk+malOOCkue9ruOBj+OBi1xyXG5leHBvcnQgY29uc3QgQ0FQVFVSRV9XQUlUX01JTExJU0VDT05EUzogbnVtYmVyID0gMjA7XHJcblxyXG4vL0NBUFRVUkVfV0FJVF9NSUxMSVNFQ09ORFMg44GM5L2/44KP44KM44KL6Zqb44CB5pyA5Yid44Gu5LiA5Zue44Gg44GR44Gv44GT44Gu5YCk44GM5L2/55So44GV44KM44KLXHJcbmV4cG9ydCBjb25zdCBGSVJTVF9DQVBUVVJFX1dBSVRfTUlMTElTRUNPTkRTOiBudW1iZXIgPSAxMDA7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=