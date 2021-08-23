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
/******/ 	return __webpack_require__(__webpack_require__.s = "../../../OneDrive/デスクトップ/_github/immediate_shot/src/background.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../OneDrive/デスクトップ/_github/immediate_shot/src/background.ts":
/*!****************************************************************************!*\
  !*** c:/Users/go/OneDrive/デスクトップ/_github/immediate_shot/src/background.ts ***!
  \****************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _class_Capturing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class/Capturing */ "../../../OneDrive/デスクトップ/_github/immediate_shot/src/class/Capturing.ts");
/* harmony import */ var _class_Filename__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./class/Filename */ "../../../OneDrive/デスクトップ/_github/immediate_shot/src/class/Filename.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config */ "../../../OneDrive/デスクトップ/_github/immediate_shot/src/config.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
                    chrome.storage.sync.get({
                        range: _config__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_RANGE"],
                        title: _config__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_TITLE"],
                        counter: _config__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_COUNTER"],
                        interval: _config__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_INTERVAL"],
                        max: _config__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_MAX"]
                    }, (items) => {
                        innerResolve({ tab, settings: {
                                range: castRange(items.range),
                                title: String(items.title),
                                counter: Number(items.counter),
                                interval: Number(items.interval),
                                max: Boolean(items.max)
                            } });
                    });
                });
            })
                .then((data) => {
                //現合表示しているタブの情報を入手
                chrome.tabs.sendMessage(Number(data.tab.id), { type: 'information', max: data.settings.max }, (information) => {
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
    const createCapture = (id, range, index, interval, max = false) => {
        return new Promise(resolve => {
            //index === 1 (キャプチャが二回目)の場合は position: fixed の要素を非表示にする
            if (index === 1) {
                chrome.tabs.sendMessage(id, { type: 'killFixed' });
            }
            //スクロール・キャプチャ
            chrome.tabs.sendMessage(id, { type: 'sizing', range: range, index: index, max: max }, response => {
                const callback = () => {
                    capturing.capture(response.x, response.y)
                        .then(() => {
                        resolve();
                    });
                };
                if (index < 2) {
                    setTimeout(callback, 500);
                }
                else {
                    setTimeout(callback, interval);
                }
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
    const getDataURL = (settings, information, tab) => __awaiter(void 0, void 0, void 0, function* () {
        //何枚の画像をキャプチャするか
        const captureNumber = settings.range === 'perfect'
            ? information.captureNumber
            : 1;
        //サイズ取得
        const size = getImageSize(settings, information);
        //キャプチャ処理を必要な回数だけ行う
        for (let i = 0, max = captureNumber; i < max; i = (i + 1) | 0) {
            yield createCapture(Number(tab.id), settings.range, i, settings.interval, settings.max);
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

/***/ "../../../OneDrive/デスクトップ/_github/immediate_shot/src/class/Capturing.ts":
/*!*********************************************************************************!*\
  !*** c:/Users/go/OneDrive/デスクトップ/_github/immediate_shot/src/class/Capturing.ts ***!
  \*********************************************************************************/
/*! exports provided: Capturing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Capturing", function() { return Capturing; });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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

/***/ "../../../OneDrive/デスクトップ/_github/immediate_shot/src/class/Filename.ts":
/*!********************************************************************************!*\
  !*** c:/Users/go/OneDrive/デスクトップ/_github/immediate_shot/src/class/Filename.ts ***!
  \********************************************************************************/
/*! exports provided: Filename */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filename", function() { return Filename; });
class Filename {
    /**
     * this.templates の定義
     */
    constructor() {
        this.templates = new Array();
    }
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

/***/ "../../../OneDrive/デスクトップ/_github/immediate_shot/src/config.ts":
/*!************************************************************************!*\
  !*** c:/Users/go/OneDrive/デスクトップ/_github/immediate_shot/src/config.ts ***!
  \************************************************************************/
/*! exports provided: DEFAULT_RANGE, DEFAULT_TITLE, DEFAULT_MAX, DEFAULT_COUNTER, DEFAULT_INTERVAL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_RANGE", function() { return DEFAULT_RANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_TITLE", function() { return DEFAULT_TITLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_MAX", function() { return DEFAULT_MAX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_COUNTER", function() { return DEFAULT_COUNTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_INTERVAL", function() { return DEFAULT_INTERVAL; });
//キャプチャ範囲初期値
const DEFAULT_RANGE = 'perfect';
//タイトル名初期値
const DEFAULT_TITLE = '{{title}}';
//サイトのマックス値を画面幅だけで取るか、全要素から取得するか
const DEFAULT_MAX = false;
//カウント変数初期値
const DEFAULT_COUNTER = 1;
//インターバル初期値
const DEFAULT_INTERVAL = 500;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2dvL09uZURyaXZlL+ODh+OCueOCr+ODiOODg+ODly9fZ2l0aHViL2ltbWVkaWF0ZV9zaG90L3NyYy9iYWNrZ3JvdW5kLnRzIiwid2VicGFjazovLy9jOi9Vc2Vycy9nby9PbmVEcml2ZS/jg4fjgrnjgq/jg4jjg4Pjg5cvX2dpdGh1Yi9pbW1lZGlhdGVfc2hvdC9zcmMvY2xhc3MvQ2FwdHVyaW5nLnRzIiwid2VicGFjazovLy9jOi9Vc2Vycy9nby9PbmVEcml2ZS/jg4fjgrnjgq/jg4jjg4Pjg5cvX2dpdGh1Yi9pbW1lZGlhdGVfc2hvdC9zcmMvY2xhc3MvRmlsZW5hbWUudHMiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2dvL09uZURyaXZlL+ODh+OCueOCr+ODiOODg+ODly9fZ2l0aHViL2ltbWVkaWF0ZV9zaG90L3NyYy9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Es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QUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkc7UUFFRCxtQkFBbUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztDQUVGOzs7Ozs7Ozs7Ozs7O0FDekREO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBQVk7QUFDTCxNQUFNLGFBQWEsR0FBVyxTQUFTLENBQUM7QUFFL0MsVUFBVTtBQUNILE1BQU0sYUFBYSxHQUFXLFdBQVcsQ0FBQztBQUVqRCxnQ0FBZ0M7QUFDekIsTUFBTSxXQUFXLEdBQVksS0FBSyxDQUFDO0FBRTFDLFdBQVc7QUFDSixNQUFNLGVBQWUsR0FBVyxDQUFDLENBQUM7QUFFekMsV0FBVztBQUNKLE1BQU0sZ0JBQWdCLEdBQVcsR0FBRyxDQUFDIiwiZmlsZSI6ImJhY2tncm91bmQuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi4vLi4vLi4vT25lRHJpdmUv44OH44K544Kv44OI44OD44OXL19naXRodWIvaW1tZWRpYXRlX3Nob3Qvc3JjL2JhY2tncm91bmQudHNcIik7XG4iLCJpbXBvcnQge0luZm9ybWF0aW9uLCBTZXR0aW5ncywgUmFuZ2V9IGZyb20gXCJzcmMvY2xhc3MvaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7Q2FwdHVyaW5nfSBmcm9tIFwiLi9jbGFzcy9DYXB0dXJpbmdcIjtcclxuaW1wb3J0IHtGaWxlbmFtZX0gZnJvbSBcIi4vY2xhc3MvRmlsZW5hbWVcIjtcclxuaW1wb3J0ICcuL2NvbmZpZyc7XHJcbmltcG9ydCB7REVGQVVMVF9DT1VOVEVSLCBERUZBVUxUX1JBTkdFLCBERUZBVUxUX01BWCwgREVGQVVMVF9USVRMRSwgREVGQVVMVF9JTlRFUlZBTH0gZnJvbSBcIi4vY29uZmlnXCI7XHJcblxyXG5pbnRlcmZhY2UgSW5pdERhdGEge1xyXG5cdHRhYjogY2hyb21lLnRhYnMuVGFiLFxyXG5cdHNldHRpbmdzOiBTZXR0aW5ncyxcclxuXHRpbmZvcm1hdGlvbjogSW5mb3JtYXRpb25cclxufVxyXG5cclxue1xyXG5cdC8vQ2FwdHVyaW5nIOOCr+ODqeOCuVxyXG5cdGNvbnN0IGNhcHR1cmluZyA9IG5ldyBDYXB0dXJpbmcoKTtcclxuXHJcblx0LyoqXHJcblx0ICog5ouh5by15qmf6IO944Gu6Kit5a6a44Go54++5Zyo5Y+C54Wn5Lit44Gu44K/44OW5oOF5aCx44KS6L+U44GZXHJcblx0ICovXHJcblx0Y29uc3QgaW5pdCA9ICgpID0+IHtcclxuXHRcdC8qKlxyXG5cdFx0ICogcmFuZ2Ug44KSIFJhbmdlIOWei+OBq+OCreODo+OCueODiOOBmeOCi1xyXG5cdFx0ICogQHBhcmFtIHJhbmdlXHJcblx0XHQgKi9cclxuXHRcdGNvbnN0IGNhc3RSYW5nZSA9IChyYW5nZTogc3RyaW5nKTogUmFuZ2UgPT4ge1xyXG5cdFx0XHRzd2l0Y2ggKHJhbmdlKSB7XHJcblx0XHRcdFx0Y2FzZSAnZnVsbCc6XHJcblx0XHRcdFx0Y2FzZSAnZGlzcGxheSc6XHJcblx0XHRcdFx0Y2FzZSAncGVyZmVjdCc6XHJcblx0XHRcdFx0XHRyZXR1cm4gcmFuZ2U7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0cmV0dXJuICdmdWxsJztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxJbml0RGF0YT4ocmVzb2x2ZSA9PiB7XHJcblx0XHRcdC8v5ouh5by15qmf6IO944Gu6Kit5a6a44KS5YWl5omLXHJcblx0XHRcdG5ldyBQcm9taXNlPGNocm9tZS50YWJzLlRhYj4oaW5uZXJSZXNvbHZlID0+IHtcclxuXHRcdFx0XHRjaHJvbWUudGFicy5xdWVyeSh7YWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlfSwgKHRhYnM6IGNocm9tZS50YWJzLlRhYltdKSA9PiB7XHJcblx0XHRcdFx0XHRpbm5lclJlc29sdmUodGFic1swXSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pXHJcblx0XHRcdFx0LnRoZW4odGFiID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiBuZXcgUHJvbWlzZTx7dGFiOiBjaHJvbWUudGFicy5UYWIsIHNldHRpbmdzOiBTZXR0aW5nc30+KGlubmVyUmVzb2x2ZSA9PiB7XHJcblx0XHRcdFx0XHRcdGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KHtcclxuXHRcdFx0XHRcdFx0XHRcdHJhbmdlOiBERUZBVUxUX1JBTkdFLFxyXG5cdFx0XHRcdFx0XHRcdFx0dGl0bGU6IERFRkFVTFRfVElUTEUsXHJcblx0XHRcdFx0XHRcdFx0XHRjb3VudGVyOiBERUZBVUxUX0NPVU5URVIsXHJcblx0XHRcdFx0XHRcdFx0XHRpbnRlcnZhbDogREVGQVVMVF9JTlRFUlZBTCxcclxuXHRcdFx0XHRcdFx0XHRcdG1heDogREVGQVVMVF9NQVhcclxuXHRcdFx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0XHRcdChpdGVtczoge1trZXk6IHN0cmluZ106IHN0cmluZ30pID0+IHtcclxuXHRcdFx0XHRcdFx0XHRcdGlubmVyUmVzb2x2ZSh7dGFiLCBzZXR0aW5nczoge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJhbmdlOiBjYXN0UmFuZ2UoaXRlbXMucmFuZ2UpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRpdGxlOiBTdHJpbmcoaXRlbXMudGl0bGUpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGNvdW50ZXI6IE51bWJlcihpdGVtcy5jb3VudGVyKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpbnRlcnZhbDogTnVtYmVyKGl0ZW1zLmludGVydmFsKSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRtYXg6IEJvb2xlYW4oaXRlbXMubWF4KVxyXG5cdFx0XHRcdFx0XHRcdFx0XHR9fSk7XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC50aGVuKChkYXRhOiB7dGFiOiBjaHJvbWUudGFicy5UYWIsIHNldHRpbmdzOiBTZXR0aW5nc30pID0+IHtcclxuXHRcdFx0XHRcdC8v54++5ZCI6KGo56S644GX44Gm44GE44KL44K/44OW44Gu5oOF5aCx44KS5YWl5omLXHJcblx0XHRcdFx0XHRjaHJvbWUudGFicy5zZW5kTWVzc2FnZShOdW1iZXIoZGF0YS50YWIuaWQpLCB7dHlwZTogJ2luZm9ybWF0aW9uJywgbWF4OiBkYXRhLnNldHRpbmdzLm1heH0sIChpbmZvcm1hdGlvbjogSW5mb3JtYXRpb24pID0+IHtcclxuXHRcdFx0XHRcdFx0cmVzb2x2ZSh7dGFiOiBkYXRhLnRhYiwgc2V0dGluZ3M6IGRhdGEuc2V0dGluZ3MsIGluZm9ybWF0aW9ufSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIOePvuWcqOihqOekuuOBl+OBpuOBhOOCi+OCv+ODluOBruOCreODo+ODl+ODgeODo+OCkuS4gOWbnuihjOOBhlxyXG5cdCAqIEBwYXJhbSBpZFxyXG5cdCAqIEBwYXJhbSByYW5nZVxyXG5cdCAqL1xyXG5cdGNvbnN0IGNyZWF0ZUNhcHR1cmUgPSAoaWQ6IG51bWJlciwgcmFuZ2U6IFJhbmdlLCBpbmRleDogbnVtYmVyLCBpbnRlcnZhbDogbnVtYmVyLCBtYXg6IGJvb2xlYW4gPSBmYWxzZSk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG5cdFx0cmV0dXJuICBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuXHRcdFx0Ly9pbmRleCA9PT0gMSAo44Kt44Oj44OX44OB44Oj44GM5LqM5Zue55uuKeOBruWgtOWQiOOBryBwb3NpdGlvbjogZml4ZWQg44Gu6KaB57Sg44KS6Z2e6KGo56S644Gr44GZ44KLXHJcblx0XHRcdGlmIChpbmRleCA9PT0gMSkge1xyXG5cdFx0XHRcdGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGlkLCB7dHlwZTogJ2tpbGxGaXhlZCd9KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly/jgrnjgq/jg63jg7zjg6vjg7vjgq3jg6Pjg5fjg4Hjg6NcclxuXHRcdFx0Y2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoaWQsIHt0eXBlOiAnc2l6aW5nJywgcmFuZ2U6IHJhbmdlLCBpbmRleDogaW5kZXgsIG1heDogbWF4fSwgcmVzcG9uc2UgPT4ge1xyXG5cdFx0XHRcdGNvbnN0IGNhbGxiYWNrID0gKCkgPT4ge1xyXG5cdFx0XHRcdFx0Y2FwdHVyaW5nLmNhcHR1cmUocmVzcG9uc2UueCwgcmVzcG9uc2UueSlcclxuXHRcdFx0XHRcdFx0LnRoZW4oKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0aWYgKGluZGV4IDwgMikge1xyXG5cdFx0XHRcdFx0c2V0VGltZW91dChjYWxsYmFjaywgNTAwKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdFx0c2V0VGltZW91dChjYWxsYmFjaywgaW50ZXJ2YWwpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBzZXR0aW5ncyDjgaggaW5mb3JtYXRpb24g44GL44KJ5rGC44KB44KJ44KM44Gm44GE44KL55S75YOP44K144Kk44K644KS5bCO44GN5Ye644GZXHJcblx0ICogQHBhcmFtIHNldHRpbmdzXHJcblx0ICogQHBhcmFtIGluZm9ybWF0aW9uXHJcblx0ICovXHJcblx0Y29uc3QgZ2V0SW1hZ2VTaXplID0gKHNldHRpbmdzOiBTZXR0aW5ncywgaW5mb3JtYXRpb246IEluZm9ybWF0aW9uKToge3dpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyfSA9PiB7XHJcblx0XHQvL+acgOe1gueahOOBqueUu+WDj+OCteOCpOOCuuOCkuaxuuWumijjgZPjga7mmYLngrnjgafjga8gcmFuZ2UgPSBkaXNwbGF5IOeUqClcclxuXHRcdGxldCB3aWR0aCA9IGluZm9ybWF0aW9uLndpbmRvd1dpZHRoO1xyXG5cdFx0bGV0IGhlaWdodCA9IGluZm9ybWF0aW9uLndpbmRvd0hlaWdodDtcclxuXHJcblx0XHQvL3JhbmdlIOOBq+WQiOOCj+OBm+OBn+eUu+WDj+OCteOCpOOCuuOCkueUqOaEj1xyXG5cdFx0c3dpdGNoIChzZXR0aW5ncy5yYW5nZSkge1xyXG5cdFx0XHRjYXNlICdmdWxsJzpcclxuXHRcdFx0XHR3aWR0aCA9IGluZm9ybWF0aW9uLnJhdGlvVHlwZSA9PT0gJ3dpZHRoJ1xyXG5cdFx0XHRcdFx0PyBpbmZvcm1hdGlvbi53aW5kb3dXaWR0aFxyXG5cdFx0XHRcdFx0OiBpbmZvcm1hdGlvbi53aW5kb3dXaWR0aCAqIGluZm9ybWF0aW9uLnJhdGlvO1xyXG5cdFx0XHRcdGhlaWdodCA9IGluZm9ybWF0aW9uLnJhdGlvVHlwZSA9PT0gJ2hlaWdodCdcclxuXHRcdFx0XHRcdD8gaW5mb3JtYXRpb24ud2luZG93SGVpZ2h0XHJcblx0XHRcdFx0XHQ6IGluZm9ybWF0aW9uLndpbmRvd0hlaWdodCAqIGluZm9ybWF0aW9uLnJhdGlvO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdwZXJmZWN0JzpcclxuXHRcdFx0XHR3aWR0aCA9IGluZm9ybWF0aW9uLmRvY3VtZW50V2lkdGg7XHJcblx0XHRcdFx0aGVpZ2h0ID0gaW5mb3JtYXRpb24uZG9jdW1lbnRIZWlnaHQ7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly/ov5TjgZlcclxuXHRcdHJldHVybiAge3dpZHRoLCBoZWlnaHR9O1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIOePvuWcqOmWi+OBhOOBpuOBhOOCi+OCv+ODluOBruOCreODo+ODl+ODgeODo+OCkuihjOOBhlxyXG5cdCAqIEBwYXJhbSBzZXR0aW5nc1xyXG5cdCAqIEBwYXJhbSBpbmZvcm1hdGlvblxyXG5cdCAqIEBwYXJhbSB0YWJcclxuXHQgKi9cclxuXHRjb25zdCBnZXREYXRhVVJMID0gYXN5bmMgKHNldHRpbmdzOiBTZXR0aW5ncywgaW5mb3JtYXRpb246IEluZm9ybWF0aW9uLCB0YWI6IGNocm9tZS50YWJzLlRhYikgPT4ge1xyXG5cdFx0Ly/kvZXmnprjga7nlLvlg4/jgpLjgq3jg6Pjg5fjg4Hjg6PjgZnjgovjgYtcclxuXHRcdGNvbnN0IGNhcHR1cmVOdW1iZXIgPSBzZXR0aW5ncy5yYW5nZSA9PT0gJ3BlcmZlY3QnXHJcblx0XHRcdD8gaW5mb3JtYXRpb24uY2FwdHVyZU51bWJlclxyXG5cdFx0XHQ6IDE7XHJcblxyXG5cdFx0Ly/jgrXjgqTjgrrlj5blvpdcclxuXHRcdGNvbnN0IHNpemUgPSBnZXRJbWFnZVNpemUoc2V0dGluZ3MsIGluZm9ybWF0aW9uKTtcclxuXHJcblx0XHQvL+OCreODo+ODl+ODgeODo+WHpueQhuOCkuW/heimgeOBquWbnuaVsOOBoOOBkeihjOOBhlxyXG5cdFx0Zm9yIChsZXQgaSA9IDAsIG1heCA9IGNhcHR1cmVOdW1iZXI7IGkgPCBtYXg7IGkgPSAoaSArIDEpIHwgMCkge1xyXG5cdFx0XHRhd2FpdCBjcmVhdGVDYXB0dXJlKE51bWJlcih0YWIuaWQpLCBzZXR0aW5ncy5yYW5nZSwgaSwgc2V0dGluZ3MuaW50ZXJ2YWwsIHNldHRpbmdzLm1heCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly/jgrnjgr/jgqTjg6vjgpLlhYPjgavmiLvjgZlcclxuXHRcdGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKE51bWJlcih0YWIuaWQpLCB7dHlwZTogJ3Jlc2V0U2l6aW5nJywgeDogaW5mb3JtYXRpb24uc2Nyb2xsWCwgeTogaW5mb3JtYXRpb24uc2Nyb2xsWX0pO1xyXG5cclxuXHRcdC8vZGF0YVVSTCDljJZcclxuXHRcdHJldHVybiBjYXB0dXJpbmcuY29tcG9zZShzaXplLndpZHRoLCBzaXplLmhlaWdodCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICog44OV44Kh44Kk44Or5ZCN44KS5rG65a6a44GX44CB44OA44Km44Oz44Ot44O844OJ44KS6KGM44GGXHJcblx0ICogQHBhcmFtIHVybFxyXG5cdCAqIEBwYXJhbSBzZXR0aW5nc1xyXG5cdCAqL1xyXG5cdGNvbnN0IGRvd25sb2FkID0gKHVybDogc3RyaW5nLCBzZXR0aW5nczogU2V0dGluZ3MsIHRhYjogY2hyb21lLnRhYnMuVGFiKSA9PiB7XHJcblx0XHQvL+ODleOCoeOCpOODq+WQjeWkieaPm+eUqOOCr+ODqeOCuVxyXG5cdFx0Y29uc3QgZmlsZW5hbWUgPSBuZXcgRmlsZW5hbWUoKTtcclxuXHJcblx0XHQvL+ODleOCoeOCpOODq+WQjeODhuODs+ODl+ODrOODvOODiOWkieaVsOaWh+Wtl+WIl+eZu+mMslxyXG5cdFx0aWYgKHNldHRpbmdzLnRpdGxlLmluZGV4T2YoJ3t7dGl0bGV9fScpICE9PSAtMSkge1xyXG5cdFx0XHRmaWxlbmFtZS5zZXRUZW1wbGF0ZSgne3t0aXRsZX19JywgZGVjb2RlVVJJQ29tcG9uZW50KFN0cmluZyh0YWIudGl0bGUpKSk7XHJcblx0XHR9XHJcblx0XHRpZiAoc2V0dGluZ3MudGl0bGUuaW5kZXhPZigne3t1cmx9fScpICE9PSAtMSkge1xyXG5cdFx0XHRmaWxlbmFtZS5zZXRUZW1wbGF0ZSgne3t1cmx9fScsIFN0cmluZyh0YWIudXJsKS5yZXBsYWNlKC9odHRwcz86XFwvXFwvLywgJycpKTtcclxuXHRcdH1cclxuXHRcdGlmIChzZXR0aW5ncy50aXRsZS5pbmRleE9mKCd7e2NvdW50ZXJ9fScpICE9PSAtMSkge1xyXG5cdFx0XHRmaWxlbmFtZS5zZXRUZW1wbGF0ZSgne3tjb3VudGVyfX0nLCBTdHJpbmcoc2V0dGluZ3MuY291bnRlcikpO1xyXG5cdFx0XHRzZXR0aW5ncy5jb3VudGVyID0gc2V0dGluZ3MuY291bnRlciArIDE7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly9jb3VudGVyIOioreWumuOBruS/neWtmFxyXG5cdFx0Y2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe2NvdW50ZXI6IHNldHRpbmdzLmNvdW50ZXJ9KTtcclxuXHJcblx0XHQvL+ODgOOCpuODs+ODreODvOODiVxyXG5cdFx0Y2hyb21lLmRvd25sb2Fkcy5kb3dubG9hZCh7dXJsOiB1cmwsIGZpbGVuYW1lOiBmaWxlbmFtZS5nZXRGaWxlTmFtZShzZXR0aW5ncy50aXRsZSkrJy5wbmcnfSk7XHJcblx0fTtcclxuXHJcblx0Ly/jgq3jg6Pjg5fjg4Hjg6Plrp/ooYxcclxuXHRjb25zdCBhY3Rpb24gPSAoKSA9PiB7XHJcblx0XHQvL+OCreODo+ODl+ODgeODo+OBruWIneacn+WMllxyXG5cdFx0Y2FwdHVyaW5nLmluaXQoKTtcclxuXHJcblx0XHQvL+ePvuWcqOihqOekuuOBl+OBpuOBhOOCi+OCv+ODluOBruaDheWgseOCkuWFpeaJi+OBmeOCi1xyXG5cdFx0aW5pdCgpXHJcblx0XHRcdC50aGVuKGRhdGEgPT4ge1xyXG5cdFx0XHRcdGdldERhdGFVUkwoZGF0YS5zZXR0aW5ncywgZGF0YS5pbmZvcm1hdGlvbiwgZGF0YS50YWIpXHJcblx0XHRcdFx0XHQudGhlbigodXJsOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0XHRcdFx0ZG93bmxvYWQodXJsLCBkYXRhLnNldHRpbmdzLCBkYXRhLnRhYik7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHRcdFx0LmNhdGNoKChkYXRhKSA9PiB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0YWxlcnQoJ1NvcnJ5LCBUcnkgYWdhaW4gYWZ0ZXIgcmVsb2FkLicpO1xyXG5cdFx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvL+OCouOCpOOCs+ODs+OCr+ODquODg+OCr1xyXG5cdGNocm9tZS5icm93c2VyQWN0aW9uLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcihhY3Rpb24pO1xyXG5cclxuXHQvL+WPs+OCr+ODquODg+OCr+ODoeODi+ODpeODvFxyXG5cdGNocm9tZS5jb250ZXh0TWVudXMuY3JlYXRlKHtcclxuXHRcdGlkOiAncnVuJyxcclxuXHRcdHRpdGxlOiAnSW1tZWRpYXRlIFNob3QnLFxyXG5cdFx0Y29udGV4dHM6IFsnYWxsJ10sXHJcblx0XHR0eXBlOiAnbm9ybWFsJ1xyXG5cdH0pO1xyXG5cdGNocm9tZS5jb250ZXh0TWVudXMub25DbGlja2VkLmFkZExpc3RlbmVyKGFjdGlvbik7XHJcbn1cclxuIiwiaW50ZXJmYWNlIENhcHR1cmVVUkwge1xyXG4gIHVybDogc3RyaW5nLFxyXG4gIHg6IG51bWJlcixcclxuICB5OiBudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENhcHR1cmluZyB7XHJcblxyXG4gIC8v44Kt44Oj44OX44OB44Oj5riI44G/IERhdGFVUkwg44Gu6ZuG5ZCIXHJcbiAgcHJpdmF0ZSBjYXB0dXJlVVJMczogQ2FwdHVyZVVSTFtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIHRhcmdldCDjgYwgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIOOBp+OBguOCi+OBi+WIpOWumuOBmeOCi1xyXG4gICAqIOWFt+S9k+eahOOBq+OBryBkcmF3SW1hZ2Ug44Oh44K944OD44OJ44GM5a2Y5Zyo44GZ44KL44GL5Yik5a6a44GZ44KLXHJcbiAgICogQHBhcmFtIHRhcmdldFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2lzQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9PiB7XHJcbiAgICByZXR1cm4gdGFyZ2V0LmRyYXdJbWFnZSAhPT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog54++5ZyoIGNhcHR1cmVVUkxzIOOBq+iqreOBv+i+vOOBvuOCjOOBpuOBhOOCi+ODh+ODvOOCv+OCkuOCq+ODs+ODkOOCueOBq+iqreOBv+i+vOOBv+OAgeWQiOaIkOOAgeODiOODquODn+ODs+OCsOOBmeOCi1xyXG4gICAqIOacgOe1gueahOOBq+WQkOOBjeWHuuOBleOCjOOCi+eUu+WDj+OBruWkp+OBjeOBleOBryB3aWR0aCAqIGhlaWdodCDjgajjgarjgotcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb21wb3NlID0gYXN5bmMgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcclxuICAgIC8v44Kr44Oz44OQ44K544Gu5L2c5oiQXHJcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuXHJcbiAgICAvL+OCq+ODs+ODkOOCueOBruWkp+OBjeOBleOCkuioreWumlxyXG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3aWR0aCsncHgnKTtcclxuICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGhlaWdodCsncHgnKTtcclxuXHJcbiAgICAvLzJEIOOCs+ODs+ODhuOCreOCueODiOOCkuWPluW+l1xyXG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG4gICAgLy9jdHgg44Gu44K/44Kk44OX44Ks44O844OJXHJcbiAgICBpZiAoICEgdGhpcy5faXNDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQoY3R4KSlcclxuICAgIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIC8v44Kr44Oz44OQ44K544Gr55S75YOP44KS6Kit572uXHJcbiAgICBhd2FpdCB0aGlzLmNhcHR1cmVVUkxzLnJlZHVjZSgocHJldiwgY3VycmVudCkgPT4gcHJldi50aGVuKCgpID0+IHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgY3VycmVudC54LCBjdXJyZW50LnkpO1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaW1hZ2Uuc3JjID0gY3VycmVudC51cmw7XHJcbiAgICAgIH0pO1xyXG4gICAgfSksIFByb21pc2UucmVzb2x2ZSgpKTtcclxuXHJcbiAgICAvL2RhdGFVUkwg44KS55Sf5oiQXHJcbiAgICBjb25zdCBkYXRhID0gY2FudmFzLnRvRGF0YVVSTCgpO1xyXG5cclxuICAgIC8vY2FudmFzIOOCkua2iOOBmVxyXG4gICAgY2FudmFzLnJlbW92ZSgpO1xyXG5cclxuICAgIC8vZGF0YVVSTCDjgpLov5TjgZlcclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCreODo+ODl+ODgeODo+OCkuWPluW+l+OBl+OAgWNhcHR1cmVVUkxzIOOBqyBwdXNoIOOBmeOCi1xyXG4gICAqIEBwYXJhbSB4XHJcbiAgICogQHBhcmFtIHlcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjYXB0dXJlKHg6IG51bWJlciwgeTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGNocm9tZS50YWJzLmNhcHR1cmVWaXNpYmxlVGFiKCh1cmwpID0+IHtcclxuICAgICAgICB0aGlzLmNhcHR1cmVVUkxzLnB1c2goe3gsIHksIHVybH0pO1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNhcHR1cmVVUkxzIOOCkuepuuOBq+OBmeOCi1xyXG4gICAqL1xyXG4gIHB1YmxpYyBpbml0KCkge1xyXG4gICAgdGhpcy5jYXB0dXJlVVJMcyA9IFtdO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiLyoqXHJcbiAqIOODleOCoeOCpOODq+ODjeODvOODoOS9nOaIkOOCr+ODqeOCuVxyXG4gKi9cclxuaW1wb3J0IHtUZW1wbGF0ZXN9IGZyb20gXCIuL2ludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpbGVuYW1lIHtcclxuXHJcbiAgLyoqXHJcbiAgICog572u44GN5o+b44GI5a6a576pXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB0ZW1wbGF0ZXM6IFRlbXBsYXRlcztcclxuXHJcbiAgLyoqXHJcbiAgICog44OV44Kh44Kk44Or5ZCN44Gr5L2/55So44Gn44GN44Gq44GE5paH5a2X44KS5YWo44GmIHJlcGxhY2VtZW50IOOBq+e9ruaPm+OBl+OBpui/lOOBmVxyXG4gICAqIEBwYXJhbSBzdHJpbmdcclxuICAgKiBAcGFyYW0gcmVwbGFjZW1lbnRcclxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9yZXBsYWNlQmFkQ2hhcmFjdGVyKHN0cmluZzogc3RyaW5nLCByZXBsYWNlbWVudDogc3RyaW5nID0gJ18nKSB7XHJcbiAgICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZSgvW1xcXFxcXC86XFwqXFw/XCI8PlxcLVxcfFxcc10rL2csIHJlcGxhY2VtZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHRoaXMudGVtcGxhdGVzIOOBruWumue+qVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMudGVtcGxhdGVzID0gbmV3IEFycmF5KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjg4bjg7Pjg5fjg6zjg7zjg4jlpInmlbDmloflrZfliJfjgajjgZ3jga7lgKTjgpLoqK3lrprjgZnjgotcclxuICAgKiBAcGFyYW0gdGVtcGxhdGVcclxuICAgKiBAcGFyYW0gdmFsdWVcclxuICAgKi9cclxuICBwdWJsaWMgc2V0VGVtcGxhdGUodGVtcGxhdGU6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy50ZW1wbGF0ZXMucHVzaCh7XHJcbiAgICAgIHRlbXBsYXRlOiBTdHJpbmcodGVtcGxhdGUpLFxyXG4gICAgICB2YWx1ZTogU3RyaW5nKHZhbHVlKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzZXRUZW1wbGF0ZSgpLCBfcmVwbGFjZUJhZENoYXJhY3RlcigpIOOBp+WkieaPm+OBl+OBn+ODleOCoeOCpOODq+WQjeOCkuWHuuWKm1xyXG4gICAqIEBwYXJhbSBuYW1lXHJcbiAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRGaWxlTmFtZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgLy/jg4bjg7Pjg5fjg6zjg7zjg4jlpInmlbDmloflrZfliJfjgpLlgKTjgavnva7jgY3mj5vjgYjjgotcclxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSB0aGlzLnRlbXBsYXRlcy5sZW5ndGg7IGkgPCBtYXg7IGkgPSAoaSArIDEpIHwgMCkge1xyXG4gICAgICBuYW1lID0gU3RyaW5nKG5hbWUpLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLnRlbXBsYXRlc1tpXS50ZW1wbGF0ZSwgJ2cnKSwgdGhpcy50ZW1wbGF0ZXNbaV0udmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5L2/55So5LiN5Y+v44Gu5paH5a2X44KS5YWo44Gm572u44GN5o+b44GI44Gm6L+U5Y20XHJcbiAgICByZXR1cm4gdGhpcy5fcmVwbGFjZUJhZENoYXJhY3RlcihuYW1lKTtcclxuICB9XHJcblxyXG59XHJcbiIsIi8v44Kt44Oj44OX44OB44Oj56+E5Zuy5Yid5pyf5YCkXHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX1JBTkdFOiBzdHJpbmcgPSAncGVyZmVjdCc7XHJcblxyXG4vL+OCv+OCpOODiOODq+WQjeWIneacn+WApFxyXG5leHBvcnQgY29uc3QgREVGQVVMVF9USVRMRTogc3RyaW5nID0gJ3t7dGl0bGV9fSc7XHJcblxyXG4vL+OCteOCpOODiOOBruODnuODg+OCr+OCueWApOOCkueUu+mdouW5heOBoOOBkeOBp+WPluOCi+OBi+OAgeWFqOimgee0oOOBi+OCieWPluW+l+OBmeOCi+OBi1xyXG5leHBvcnQgY29uc3QgREVGQVVMVF9NQVg6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbi8v44Kr44Km44Oz44OI5aSJ5pWw5Yid5pyf5YCkXHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPVU5URVI6IG51bWJlciA9IDE7XHJcblxyXG4vL+OCpOODs+OCv+ODvOODkOODq+WIneacn+WApFxyXG5leHBvcnQgY29uc3QgREVGQVVMVF9JTlRFUlZBTDogbnVtYmVyID0gNTAwO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9