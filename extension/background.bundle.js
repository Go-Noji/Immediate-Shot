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
                //スクロールを一瞬末尾まで移動
                chrome.tabs.sendMessage(Number(tab.id), { type: 'scrollEnd' });
                //設定を chrome から呼び出す
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2dvL09uZURyaXZlL+ODh+OCueOCr+ODiOODg+ODly9fZ2l0aHViL2ltbWVkaWF0ZV9zaG90L3NyYy9iYWNrZ3JvdW5kLnRzIiwid2VicGFjazovLy9jOi9Vc2Vycy9nby9PbmVEcml2ZS/jg4fjgrnjgq/jg4jjg4Pjg5cvX2dpdGh1Yi9pbW1lZGlhdGVfc2hvdC9zcmMvY2xhc3MvQ2FwdHVyaW5nLnRzIiwid2VicGFjazovLy9jOi9Vc2Vycy9nby9PbmVEcml2ZS/jg4fjgrnjgq/jg4jjg4Pjg5cvX2dpdGh1Yi9pbW1lZGlhdGVfc2hvdC9zcmMvY2xhc3MvRmlsZW5hbWUudHMiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2dvL09uZURyaXZlL+ODh+OCueOCr+ODiOODg+ODly9fZ2l0aHViL2ltbWVkaWF0ZV9zaG90L3NyYy9jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Es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QUcsQ0FBQyxFQUFFO1lBQ3JFLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkc7UUFFRCxtQkFBbUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztDQUVGOzs7Ozs7Ozs7Ozs7O0FDekREO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBQVk7QUFDTCxNQUFNLGFBQWEsR0FBVyxTQUFTLENBQUM7QUFFL0MsVUFBVTtBQUNILE1BQU0sYUFBYSxHQUFXLFdBQVcsQ0FBQztBQUVqRCxnQ0FBZ0M7QUFDekIsTUFBTSxXQUFXLEdBQVksS0FBSyxDQUFDO0FBRTFDLFdBQVc7QUFDSixNQUFNLGVBQWUsR0FBVyxDQUFDLENBQUM7QUFFekMsV0FBVztBQUNKLE1BQU0sZ0JBQWdCLEdBQVcsR0FBRyxDQUFDIiwiZmlsZSI6ImJhY2tncm91bmQuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi4vLi4vLi4vT25lRHJpdmUv44OH44K544Kv44OI44OD44OXL19naXRodWIvaW1tZWRpYXRlX3Nob3Qvc3JjL2JhY2tncm91bmQudHNcIik7XG4iLCJpbXBvcnQge0luZm9ybWF0aW9uLCBTZXR0aW5ncywgUmFuZ2V9IGZyb20gXCJzcmMvY2xhc3MvaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7Q2FwdHVyaW5nfSBmcm9tIFwiLi9jbGFzcy9DYXB0dXJpbmdcIjtcclxuaW1wb3J0IHtGaWxlbmFtZX0gZnJvbSBcIi4vY2xhc3MvRmlsZW5hbWVcIjtcclxuaW1wb3J0ICcuL2NvbmZpZyc7XHJcbmltcG9ydCB7REVGQVVMVF9DT1VOVEVSLCBERUZBVUxUX1JBTkdFLCBERUZBVUxUX01BWCwgREVGQVVMVF9USVRMRSwgREVGQVVMVF9JTlRFUlZBTH0gZnJvbSBcIi4vY29uZmlnXCI7XHJcblxyXG5pbnRlcmZhY2UgSW5pdERhdGEge1xyXG5cdHRhYjogY2hyb21lLnRhYnMuVGFiLFxyXG5cdHNldHRpbmdzOiBTZXR0aW5ncyxcclxuXHRpbmZvcm1hdGlvbjogSW5mb3JtYXRpb25cclxufVxyXG5cclxue1xyXG5cdC8vQ2FwdHVyaW5nIOOCr+ODqeOCuVxyXG5cdGNvbnN0IGNhcHR1cmluZyA9IG5ldyBDYXB0dXJpbmcoKTtcclxuXHJcblx0LyoqXHJcblx0ICog5ouh5by15qmf6IO944Gu6Kit5a6a44Go54++5Zyo5Y+C54Wn5Lit44Gu44K/44OW5oOF5aCx44KS6L+U44GZXHJcblx0ICovXHJcblx0Y29uc3QgaW5pdCA9ICgpID0+IHtcclxuXHRcdC8qKlxyXG5cdFx0ICogcmFuZ2Ug44KSIFJhbmdlIOWei+OBq+OCreODo+OCueODiOOBmeOCi1xyXG5cdFx0ICogQHBhcmFtIHJhbmdlXHJcblx0XHQgKi9cclxuXHRcdGNvbnN0IGNhc3RSYW5nZSA9IChyYW5nZTogc3RyaW5nKTogUmFuZ2UgPT4ge1xyXG5cdFx0XHRzd2l0Y2ggKHJhbmdlKSB7XHJcblx0XHRcdFx0Y2FzZSAnZnVsbCc6XHJcblx0XHRcdFx0Y2FzZSAnZGlzcGxheSc6XHJcblx0XHRcdFx0Y2FzZSAncGVyZmVjdCc6XHJcblx0XHRcdFx0XHRyZXR1cm4gcmFuZ2U7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0cmV0dXJuICdmdWxsJztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxJbml0RGF0YT4ocmVzb2x2ZSA9PiB7XHJcblx0XHRcdC8v5ouh5by15qmf6IO944Gu6Kit5a6a44KS5YWl5omLXHJcblx0XHRcdG5ldyBQcm9taXNlPGNocm9tZS50YWJzLlRhYj4oaW5uZXJSZXNvbHZlID0+IHtcclxuXHRcdFx0XHRjaHJvbWUudGFicy5xdWVyeSh7YWN0aXZlOiB0cnVlLCBjdXJyZW50V2luZG93OiB0cnVlfSwgKHRhYnM6IGNocm9tZS50YWJzLlRhYltdKSA9PiB7XHJcblx0XHRcdFx0XHRpbm5lclJlc29sdmUodGFic1swXSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pXHJcblx0XHRcdFx0LnRoZW4odGFiID0+IHtcclxuXHRcdFx0XHRcdC8v44K544Kv44Ot44O844Or44KS5LiA556s5pyr5bC+44G+44Gn56e75YuVXHJcblx0XHRcdFx0XHRjaHJvbWUudGFicy5zZW5kTWVzc2FnZShOdW1iZXIodGFiLmlkKSwge3R5cGU6ICdzY3JvbGxFbmQnfSk7XHJcblxyXG5cdFx0XHRcdFx0Ly/oqK3lrprjgpIgY2hyb21lIOOBi+OCieWRvOOBs+WHuuOBmVxyXG5cdFx0XHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlPHt0YWI6IGNocm9tZS50YWJzLlRhYiwgc2V0dGluZ3M6IFNldHRpbmdzfT4oaW5uZXJSZXNvbHZlID0+IHtcclxuXHRcdFx0XHRcdFx0Y2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoe1xyXG5cdFx0XHRcdFx0XHRcdFx0cmFuZ2U6IERFRkFVTFRfUkFOR0UsXHJcblx0XHRcdFx0XHRcdFx0XHR0aXRsZTogREVGQVVMVF9USVRMRSxcclxuXHRcdFx0XHRcdFx0XHRcdGNvdW50ZXI6IERFRkFVTFRfQ09VTlRFUixcclxuXHRcdFx0XHRcdFx0XHRcdGludGVydmFsOiBERUZBVUxUX0lOVEVSVkFMLFxyXG5cdFx0XHRcdFx0XHRcdFx0bWF4OiBERUZBVUxUX01BWFxyXG5cdFx0XHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcdFx0KGl0ZW1zOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0aW5uZXJSZXNvbHZlKHt0YWIsIHNldHRpbmdzOiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmFuZ2U6IGNhc3RSYW5nZShpdGVtcy5yYW5nZSksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGl0bGU6IFN0cmluZyhpdGVtcy50aXRsZSksXHJcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y291bnRlcjogTnVtYmVyKGl0ZW1zLmNvdW50ZXIpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGludGVydmFsOiBOdW1iZXIoaXRlbXMuaW50ZXJ2YWwpLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG1heDogQm9vbGVhbihpdGVtcy5tYXgpXHJcblx0XHRcdFx0XHRcdFx0XHRcdH19KTtcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LnRoZW4oKGRhdGE6IHt0YWI6IGNocm9tZS50YWJzLlRhYiwgc2V0dGluZ3M6IFNldHRpbmdzfSkgPT4ge1xyXG5cdFx0XHRcdFx0Ly/nj77lkIjooajnpLrjgZfjgabjgYTjgovjgr/jg5bjga7mg4XloLHjgpLlhaXmiYtcclxuXHRcdFx0XHRcdGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKE51bWJlcihkYXRhLnRhYi5pZCksIHt0eXBlOiAnaW5mb3JtYXRpb24nLCBtYXg6IGRhdGEuc2V0dGluZ3MubWF4fSwgKGluZm9ybWF0aW9uOiBJbmZvcm1hdGlvbikgPT4ge1xyXG5cdFx0XHRcdFx0XHRyZXNvbHZlKHt0YWI6IGRhdGEudGFiLCBzZXR0aW5nczogZGF0YS5zZXR0aW5ncywgaW5mb3JtYXRpb259KTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICog54++5Zyo6KGo56S644GX44Gm44GE44KL44K/44OW44Gu44Kt44Oj44OX44OB44Oj44KS5LiA5Zue6KGM44GGXHJcblx0ICogQHBhcmFtIGlkXHJcblx0ICogQHBhcmFtIHJhbmdlXHJcblx0ICovXHJcblx0Y29uc3QgY3JlYXRlQ2FwdHVyZSA9IChpZDogbnVtYmVyLCByYW5nZTogUmFuZ2UsIGluZGV4OiBudW1iZXIsIGludGVydmFsOiBudW1iZXIsIG1heDogYm9vbGVhbiA9IGZhbHNlKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcblx0XHRyZXR1cm4gIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG5cdFx0XHQvL2luZGV4ID09PSAxICjjgq3jg6Pjg5fjg4Hjg6PjgYzkuozlm57nm64p44Gu5aC05ZCI44GvIHBvc2l0aW9uOiBmaXhlZCDjga7opoHntKDjgpLpnZ7ooajnpLrjgavjgZnjgotcclxuXHRcdFx0aWYgKGluZGV4ID09PSAxKSB7XHJcblx0XHRcdFx0Y2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoaWQsIHt0eXBlOiAna2lsbEZpeGVkJ30pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvL+OCueOCr+ODreODvOODq+ODu+OCreODo+ODl+ODgeODo1xyXG5cdFx0XHRjaHJvbWUudGFicy5zZW5kTWVzc2FnZShpZCwge3R5cGU6ICdzaXppbmcnLCByYW5nZTogcmFuZ2UsIGluZGV4OiBpbmRleCwgbWF4OiBtYXh9LCByZXNwb25zZSA9PiB7XHJcblx0XHRcdFx0Y29uc3QgY2FsbGJhY2sgPSAoKSA9PiB7XHJcblx0XHRcdFx0XHRjYXB0dXJpbmcuY2FwdHVyZShyZXNwb25zZS54LCByZXNwb25zZS55KVxyXG5cdFx0XHRcdFx0XHQudGhlbigoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRpZiAoaW5kZXggPCAyKSB7XHJcblx0XHRcdFx0XHRzZXRUaW1lb3V0KGNhbGxiYWNrLCA1MDApO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0XHRzZXRUaW1lb3V0KGNhbGxiYWNrLCBpbnRlcnZhbCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIHNldHRpbmdzIOOBqCBpbmZvcm1hdGlvbiDjgYvjgonmsYLjgoHjgonjgozjgabjgYTjgovnlLvlg4/jgrXjgqTjgrrjgpLlsI7jgY3lh7rjgZlcclxuXHQgKiBAcGFyYW0gc2V0dGluZ3NcclxuXHQgKiBAcGFyYW0gaW5mb3JtYXRpb25cclxuXHQgKi9cclxuXHRjb25zdCBnZXRJbWFnZVNpemUgPSAoc2V0dGluZ3M6IFNldHRpbmdzLCBpbmZvcm1hdGlvbjogSW5mb3JtYXRpb24pOiB7d2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9ID0+IHtcclxuXHRcdC8v5pyA57WC55qE44Gq55S75YOP44K144Kk44K644KS5rG65a6aKOOBk+OBruaZgueCueOBp+OBryByYW5nZSA9IGRpc3BsYXkg55SoKVxyXG5cdFx0bGV0IHdpZHRoID0gaW5mb3JtYXRpb24ud2luZG93V2lkdGg7XHJcblx0XHRsZXQgaGVpZ2h0ID0gaW5mb3JtYXRpb24ud2luZG93SGVpZ2h0O1xyXG5cclxuXHRcdC8vcmFuZ2Ug44Gr5ZCI44KP44Gb44Gf55S75YOP44K144Kk44K644KS55So5oSPXHJcblx0XHRzd2l0Y2ggKHNldHRpbmdzLnJhbmdlKSB7XHJcblx0XHRcdGNhc2UgJ2Z1bGwnOlxyXG5cdFx0XHRcdHdpZHRoID0gaW5mb3JtYXRpb24ucmF0aW9UeXBlID09PSAnd2lkdGgnXHJcblx0XHRcdFx0XHQ/IGluZm9ybWF0aW9uLndpbmRvd1dpZHRoXHJcblx0XHRcdFx0XHQ6IGluZm9ybWF0aW9uLndpbmRvd1dpZHRoICogaW5mb3JtYXRpb24ucmF0aW87XHJcblx0XHRcdFx0aGVpZ2h0ID0gaW5mb3JtYXRpb24ucmF0aW9UeXBlID09PSAnaGVpZ2h0J1xyXG5cdFx0XHRcdFx0PyBpbmZvcm1hdGlvbi53aW5kb3dIZWlnaHRcclxuXHRcdFx0XHRcdDogaW5mb3JtYXRpb24ud2luZG93SGVpZ2h0ICogaW5mb3JtYXRpb24ucmF0aW87XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3BlcmZlY3QnOlxyXG5cdFx0XHRcdHdpZHRoID0gaW5mb3JtYXRpb24uZG9jdW1lbnRXaWR0aDtcclxuXHRcdFx0XHRoZWlnaHQgPSBpbmZvcm1hdGlvbi5kb2N1bWVudEhlaWdodDtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHJcblx0XHQvL+i/lOOBmVxyXG5cdFx0cmV0dXJuICB7d2lkdGgsIGhlaWdodH07XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICog54++5Zyo6ZaL44GE44Gm44GE44KL44K/44OW44Gu44Kt44Oj44OX44OB44Oj44KS6KGM44GGXHJcblx0ICogQHBhcmFtIHNldHRpbmdzXHJcblx0ICogQHBhcmFtIGluZm9ybWF0aW9uXHJcblx0ICogQHBhcmFtIHRhYlxyXG5cdCAqL1xyXG5cdGNvbnN0IGdldERhdGFVUkwgPSBhc3luYyAoc2V0dGluZ3M6IFNldHRpbmdzLCBpbmZvcm1hdGlvbjogSW5mb3JtYXRpb24sIHRhYjogY2hyb21lLnRhYnMuVGFiKSA9PiB7XHJcblx0XHQvL+S9leaemuOBrueUu+WDj+OCkuOCreODo+ODl+ODgeODo+OBmeOCi+OBi1xyXG5cdFx0Y29uc3QgY2FwdHVyZU51bWJlciA9IHNldHRpbmdzLnJhbmdlID09PSAncGVyZmVjdCdcclxuXHRcdFx0PyBpbmZvcm1hdGlvbi5jYXB0dXJlTnVtYmVyXHJcblx0XHRcdDogMTtcclxuXHJcblx0XHQvL+OCteOCpOOCuuWPluW+l1xyXG5cdFx0Y29uc3Qgc2l6ZSA9IGdldEltYWdlU2l6ZShzZXR0aW5ncywgaW5mb3JtYXRpb24pO1xyXG5cclxuXHRcdC8v44Kt44Oj44OX44OB44Oj5Yem55CG44KS5b+F6KaB44Gq5Zue5pWw44Gg44GR6KGM44GGXHJcblx0XHRmb3IgKGxldCBpID0gMCwgbWF4ID0gY2FwdHVyZU51bWJlcjsgaSA8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XHJcblx0XHRcdGF3YWl0IGNyZWF0ZUNhcHR1cmUoTnVtYmVyKHRhYi5pZCksIHNldHRpbmdzLnJhbmdlLCBpLCBzZXR0aW5ncy5pbnRlcnZhbCwgc2V0dGluZ3MubWF4KTtcclxuXHRcdH1cclxuXHJcblx0XHQvL+OCueOCv+OCpOODq+OCkuWFg+OBq+aIu+OBmVxyXG5cdFx0Y2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoTnVtYmVyKHRhYi5pZCksIHt0eXBlOiAncmVzZXRTaXppbmcnLCB4OiBpbmZvcm1hdGlvbi5zY3JvbGxYLCB5OiBpbmZvcm1hdGlvbi5zY3JvbGxZfSk7XHJcblxyXG5cdFx0Ly9kYXRhVVJMIOWMllxyXG5cdFx0cmV0dXJuIGNhcHR1cmluZy5jb21wb3NlKHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiDjg5XjgqHjgqTjg6vlkI3jgpLmsbrlrprjgZfjgIHjg4Djgqbjg7Pjg63jg7zjg4njgpLooYzjgYZcclxuXHQgKiBAcGFyYW0gdXJsXHJcblx0ICogQHBhcmFtIHNldHRpbmdzXHJcblx0ICovXHJcblx0Y29uc3QgZG93bmxvYWQgPSAodXJsOiBzdHJpbmcsIHNldHRpbmdzOiBTZXR0aW5ncywgdGFiOiBjaHJvbWUudGFicy5UYWIpID0+IHtcclxuXHRcdC8v44OV44Kh44Kk44Or5ZCN5aSJ5o+b55So44Kv44Op44K5XHJcblx0XHRjb25zdCBmaWxlbmFtZSA9IG5ldyBGaWxlbmFtZSgpO1xyXG5cclxuXHRcdC8v44OV44Kh44Kk44Or5ZCN44OG44Oz44OX44Os44O844OI5aSJ5pWw5paH5a2X5YiX55m76YyyXHJcblx0XHRpZiAoc2V0dGluZ3MudGl0bGUuaW5kZXhPZigne3t0aXRsZX19JykgIT09IC0xKSB7XHJcblx0XHRcdGZpbGVuYW1lLnNldFRlbXBsYXRlKCd7e3RpdGxlfX0nLCBkZWNvZGVVUklDb21wb25lbnQoU3RyaW5nKHRhYi50aXRsZSkpKTtcclxuXHRcdH1cclxuXHRcdGlmIChzZXR0aW5ncy50aXRsZS5pbmRleE9mKCd7e3VybH19JykgIT09IC0xKSB7XHJcblx0XHRcdGZpbGVuYW1lLnNldFRlbXBsYXRlKCd7e3VybH19JywgU3RyaW5nKHRhYi51cmwpLnJlcGxhY2UoL2h0dHBzPzpcXC9cXC8vLCAnJykpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHNldHRpbmdzLnRpdGxlLmluZGV4T2YoJ3t7Y291bnRlcn19JykgIT09IC0xKSB7XHJcblx0XHRcdGZpbGVuYW1lLnNldFRlbXBsYXRlKCd7e2NvdW50ZXJ9fScsIFN0cmluZyhzZXR0aW5ncy5jb3VudGVyKSk7XHJcblx0XHRcdHNldHRpbmdzLmNvdW50ZXIgPSBzZXR0aW5ncy5jb3VudGVyICsgMTtcclxuXHRcdH1cclxuXHJcblx0XHQvL2NvdW50ZXIg6Kit5a6a44Gu5L+d5a2YXHJcblx0XHRjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7Y291bnRlcjogc2V0dGluZ3MuY291bnRlcn0pO1xyXG5cclxuXHRcdC8v44OA44Km44Oz44Ot44O844OJXHJcblx0XHRjaHJvbWUuZG93bmxvYWRzLmRvd25sb2FkKHt1cmw6IHVybCwgZmlsZW5hbWU6IGZpbGVuYW1lLmdldEZpbGVOYW1lKHNldHRpbmdzLnRpdGxlKSsnLnBuZyd9KTtcclxuXHR9O1xyXG5cclxuXHQvL+OCreODo+ODl+ODgeODo+Wun+ihjFxyXG5cdGNvbnN0IGFjdGlvbiA9ICgpID0+IHtcclxuXHRcdC8v44Kt44Oj44OX44OB44Oj44Gu5Yid5pyf5YyWXHJcblx0XHRjYXB0dXJpbmcuaW5pdCgpO1xyXG5cclxuXHRcdC8v54++5Zyo6KGo56S644GX44Gm44GE44KL44K/44OW44Gu5oOF5aCx44KS5YWl5omL44GZ44KLXHJcblx0XHRpbml0KClcclxuXHRcdFx0LnRoZW4oZGF0YSA9PiB7XHJcblx0XHRcdFx0Z2V0RGF0YVVSTChkYXRhLnNldHRpbmdzLCBkYXRhLmluZm9ybWF0aW9uLCBkYXRhLnRhYilcclxuXHRcdFx0XHRcdC50aGVuKCh1cmw6IHN0cmluZykgPT4ge1xyXG5cdFx0XHRcdFx0XHRkb3dubG9hZCh1cmwsIGRhdGEuc2V0dGluZ3MsIGRhdGEudGFiKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQuY2F0Y2goKGRhdGEpID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRhbGVydCgnU29ycnksIFRyeSBhZ2FpbiBhZnRlciByZWxvYWQuJyk7XHJcblx0XHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8v44Ki44Kk44Kz44Oz44Kv44Oq44OD44KvXHJcblx0Y2hyb21lLmJyb3dzZXJBY3Rpb24ub25DbGlja2VkLmFkZExpc3RlbmVyKGFjdGlvbik7XHJcblxyXG5cdC8v5Y+z44Kv44Oq44OD44Kv44Oh44OL44Ol44O8XHJcblx0Y2hyb21lLmNvbnRleHRNZW51cy5jcmVhdGUoe1xyXG5cdFx0aWQ6ICdydW4nLFxyXG5cdFx0dGl0bGU6ICdJbW1lZGlhdGUgU2hvdCcsXHJcblx0XHRjb250ZXh0czogWydhbGwnXSxcclxuXHRcdHR5cGU6ICdub3JtYWwnXHJcblx0fSk7XHJcblx0Y2hyb21lLmNvbnRleHRNZW51cy5vbkNsaWNrZWQuYWRkTGlzdGVuZXIoYWN0aW9uKTtcclxufVxyXG4iLCJpbnRlcmZhY2UgQ2FwdHVyZVVSTCB7XHJcbiAgdXJsOiBzdHJpbmcsXHJcbiAgeDogbnVtYmVyLFxyXG4gIHk6IG51bWJlclxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FwdHVyaW5nIHtcclxuXHJcbiAgLy/jgq3jg6Pjg5fjg4Hjg6PmuIjjgb8gRGF0YVVSTCDjga7pm4blkIhcclxuICBwcml2YXRlIGNhcHR1cmVVUkxzOiBDYXB0dXJlVVJMW10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogdGFyZ2V0IOOBjCBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQg44Gn44GC44KL44GL5Yik5a6a44GZ44KLXHJcbiAgICog5YW35L2T55qE44Gr44GvIGRyYXdJbWFnZSDjg6Hjgr3jg4Pjg4njgYzlrZjlnKjjgZnjgovjgYvliKTlrprjgZnjgotcclxuICAgKiBAcGFyYW0gdGFyZ2V0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfaXNDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSAodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0+IHtcclxuICAgIHJldHVybiB0YXJnZXQuZHJhd0ltYWdlICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDnj77lnKggY2FwdHVyZVVSTHMg44Gr6Kqt44G/6L6844G+44KM44Gm44GE44KL44OH44O844K/44KS44Kr44Oz44OQ44K544Gr6Kqt44G/6L6844G/44CB5ZCI5oiQ44CB44OI44Oq44Of44Oz44Kw44GZ44KLXHJcbiAgICog5pyA57WC55qE44Gr5ZCQ44GN5Ye644GV44KM44KL55S75YOP44Gu5aSn44GN44GV44GvIHdpZHRoICogaGVpZ2h0IOOBqOOBquOCi1xyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHVibGljIGNvbXBvc2UgPSBhc3luYyAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xyXG4gICAgLy/jgqvjg7Pjg5Djgrnjga7kvZzmiJBcclxuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG5cclxuICAgIC8v44Kr44Oz44OQ44K544Gu5aSn44GN44GV44KS6Kit5a6aXHJcbiAgICBjYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHdpZHRoKydweCcpO1xyXG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaGVpZ2h0KydweCcpO1xyXG5cclxuICAgIC8vMkQg44Kz44Oz44OG44Kt44K544OI44KS5Y+W5b6XXHJcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbiAgICAvL2N0eCDjga7jgr/jgqTjg5fjgqzjg7zjg4lcclxuICAgIGlmICggISB0aGlzLl9pc0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRChjdHgpKVxyXG4gICAge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLy/jgqvjg7Pjg5DjgrnjgavnlLvlg4/jgpLoqK3nva5cclxuICAgIGF3YWl0IHRoaXMuY2FwdHVyZVVSTHMucmVkdWNlKChwcmV2LCBjdXJyZW50KSA9PiBwcmV2LnRoZW4oKCkgPT4ge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCBjdXJyZW50LngsIGN1cnJlbnQueSk7XHJcbiAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpbWFnZS5zcmMgPSBjdXJyZW50LnVybDtcclxuICAgICAgfSk7XHJcbiAgICB9KSwgUHJvbWlzZS5yZXNvbHZlKCkpO1xyXG5cclxuICAgIC8vZGF0YVVSTCDjgpLnlJ/miJBcclxuICAgIGNvbnN0IGRhdGEgPSBjYW52YXMudG9EYXRhVVJMKCk7XHJcblxyXG4gICAgLy9jYW52YXMg44KS5raI44GZXHJcbiAgICBjYW52YXMucmVtb3ZlKCk7XHJcblxyXG4gICAgLy9kYXRhVVJMIOOCkui/lOOBmVxyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICog44Kt44Oj44OX44OB44Oj44KS5Y+W5b6X44GX44CBY2FwdHVyZVVSTHMg44GrIHB1c2gg44GZ44KLXHJcbiAgICogQHBhcmFtIHhcclxuICAgKiBAcGFyYW0geVxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHVibGljIGNhcHR1cmUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgY2hyb21lLnRhYnMuY2FwdHVyZVZpc2libGVUYWIoKHVybCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2FwdHVyZVVSTHMucHVzaCh7eCwgeSwgdXJsfSk7XHJcbiAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY2FwdHVyZVVSTHMg44KS56m644Gr44GZ44KLXHJcbiAgICovXHJcbiAgcHVibGljIGluaXQoKSB7XHJcbiAgICB0aGlzLmNhcHR1cmVVUkxzID0gW107XHJcbiAgfVxyXG5cclxufVxyXG4iLCIvKipcclxuICog44OV44Kh44Kk44Or44ON44O844Og5L2c5oiQ44Kv44Op44K5XHJcbiAqL1xyXG5pbXBvcnQge1RlbXBsYXRlc30gZnJvbSBcIi4vaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRmlsZW5hbWUge1xyXG5cclxuICAvKipcclxuICAgKiDnva7jgY3mj5vjgYjlrprnvqlcclxuICAgKi9cclxuICBwcml2YXRlIHRlbXBsYXRlczogVGVtcGxhdGVzO1xyXG5cclxuICAvKipcclxuICAgKiDjg5XjgqHjgqTjg6vlkI3jgavkvb/nlKjjgafjgY3jgarjgYTmloflrZfjgpLlhajjgaYgcmVwbGFjZW1lbnQg44Gr572u5o+b44GX44Gm6L+U44GZXHJcbiAgICogQHBhcmFtIHN0cmluZ1xyXG4gICAqIEBwYXJhbSByZXBsYWNlbWVudFxyXG4gICAqIEByZXR1cm4ge3N0cmluZ31cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3JlcGxhY2VCYWRDaGFyYWN0ZXIoc3RyaW5nOiBzdHJpbmcsIHJlcGxhY2VtZW50OiBzdHJpbmcgPSAnXycpIHtcclxuICAgIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKC9bXFxcXFxcLzpcXCpcXD9cIjw+XFwtXFx8XFxzXSsvZywgcmVwbGFjZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogdGhpcy50ZW1wbGF0ZXMg44Gu5a6a576pXHJcbiAgICovXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy50ZW1wbGF0ZXMgPSBuZXcgQXJyYXkoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOODhuODs+ODl+ODrOODvOODiOWkieaVsOaWh+Wtl+WIl+OBqOOBneOBruWApOOCkuioreWumuOBmeOCi1xyXG4gICAqIEBwYXJhbSB0ZW1wbGF0ZVxyXG4gICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXRUZW1wbGF0ZSh0ZW1wbGF0ZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnRlbXBsYXRlcy5wdXNoKHtcclxuICAgICAgdGVtcGxhdGU6IFN0cmluZyh0ZW1wbGF0ZSksXHJcbiAgICAgIHZhbHVlOiBTdHJpbmcodmFsdWUpXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHNldFRlbXBsYXRlKCksIF9yZXBsYWNlQmFkQ2hhcmFjdGVyKCkg44Gn5aSJ5o+b44GX44Gf44OV44Kh44Kk44Or5ZCN44KS5Ye65YqbXHJcbiAgICogQHBhcmFtIG5hbWVcclxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAgICovXHJcbiAgcHVibGljIGdldEZpbGVOYW1lKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAvL+ODhuODs+ODl+ODrOODvOODiOWkieaVsOaWh+Wtl+WIl+OCkuWApOOBq+e9ruOBjeaPm+OBiOOCi1xyXG4gICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IHRoaXMudGVtcGxhdGVzLmxlbmd0aDsgaSA8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XHJcbiAgICAgIG5hbWUgPSBTdHJpbmcobmFtZSkucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMudGVtcGxhdGVzW2ldLnRlbXBsYXRlLCAnZycpLCB0aGlzLnRlbXBsYXRlc1tpXS52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/kvb/nlKjkuI3lj6/jga7mloflrZfjgpLlhajjgabnva7jgY3mj5vjgYjjgabov5TljbRcclxuICAgIHJldHVybiB0aGlzLl9yZXBsYWNlQmFkQ2hhcmFjdGVyKG5hbWUpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiLy/jgq3jg6Pjg5fjg4Hjg6Pnr4Tlm7LliJ3mnJ/lgKRcclxuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkFOR0U6IHN0cmluZyA9ICdwZXJmZWN0JztcclxuXHJcbi8v44K/44Kk44OI44Or5ZCN5Yid5pyf5YCkXHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX1RJVExFOiBzdHJpbmcgPSAne3t0aXRsZX19JztcclxuXHJcbi8v44K144Kk44OI44Gu44Oe44OD44Kv44K55YCk44KS55S76Z2i5bmF44Gg44GR44Gn5Y+W44KL44GL44CB5YWo6KaB57Sg44GL44KJ5Y+W5b6X44GZ44KL44GLXHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX01BWDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuLy/jgqvjgqbjg7Pjg4jlpInmlbDliJ3mnJ/lgKRcclxuZXhwb3J0IGNvbnN0IERFRkFVTFRfQ09VTlRFUjogbnVtYmVyID0gMTtcclxuXHJcbi8v44Kk44Oz44K/44O844OQ44Or5Yid5pyf5YCkXHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX0lOVEVSVkFMOiBudW1iZXIgPSA1MDA7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=