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
                chrome.tabs.query({ active: true }, (tabs) => {
                    innerResolve(tabs[0]);
                });
            })
                .then(tab => {
                return new Promise(innerResolve => {
                    chrome.storage.sync.get({ range: _config__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_RANGE"], title: _config__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_TITLE"], counter: _config__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_COUNTER"] }, (items) => {
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
                }, index < 2 ? _config__WEBPACK_IMPORTED_MODULE_2__["CAPTURE_WAIT_MILLISECONDS"] : _config__WEBPACK_IMPORTED_MODULE_2__["FIRST_CAPTURE_WAIT_MILLISECONDS"]);
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
/*! exports provided: DEFAULT_RANGE, DEFAULT_TITLE, DEFAULT_COUNTER, CAPTURE_WAIT_MILLISECONDS, FIRST_CAPTURE_WAIT_MILLISECONDS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_RANGE", function() { return DEFAULT_RANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_TITLE", function() { return DEFAULT_TITLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_COUNTER", function() { return DEFAULT_COUNTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CAPTURE_WAIT_MILLISECONDS", function() { return CAPTURE_WAIT_MILLISECONDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FIRST_CAPTURE_WAIT_MILLISECONDS", function() { return FIRST_CAPTURE_WAIT_MILLISECONDS; });
//キャプチャ範囲初期値
const DEFAULT_RANGE = 'perfect';
//タイトル名初期値
const DEFAULT_TITLE = '{{title}}';
//カウント変数初期値
const DEFAULT_COUNTER = 1;
//複数枚キャプチャの際、次のキャプチャまで何ミリ秒間隔を置くか
const CAPTURE_WAIT_MILLISECONDS = 20;
//CAPTURE_WAIT_MILLISECONDS が使われる際、最初の一回だけはこの値が使用される
const FIRST_CAPTURE_WAIT_MILLISECONDS = 100;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzL0NhcHR1cmluZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MvRmlsZW5hbWUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakY0QztBQUNGO0FBQ3hCO0FBQ2lIO0FBUW5JO0lBQ0MsZUFBZTtJQUNmLE1BQU0sU0FBUyxHQUFHLElBQUksMERBQVMsRUFBRSxDQUFDO0lBRWxDOztPQUVHO0lBQ0gsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO1FBQ2pCOzs7V0FHRztRQUNILE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBYSxFQUFTLEVBQUU7WUFDMUMs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UUFDN0IscUJBQXFCO1FBQ3JCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDckUsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuRztRQUVELG1CQUFtQjtRQUNuQixPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0NBRUY7Ozs7Ozs7Ozs7Ozs7QUN6REQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFBWTtBQUNMLE1BQU0sYUFBYSxHQUFXLFNBQVMsQ0FBQztBQUUvQyxVQUFVO0FBQ0gsTUFBTSxhQUFhLEdBQVcsV0FBVyxDQUFDO0FBRWpELFdBQVc7QUFDSixNQUFNLGVBQWUsR0FBVyxDQUFDLENBQUM7QUFFekMsZ0NBQWdDO0FBQ3pCLE1BQU0seUJBQXlCLEdBQVcsRUFBRSxDQUFDO0FBRXBELG9EQUFvRDtBQUM3QyxNQUFNLCtCQUErQixHQUFXLEdBQUcsQ0FBQyIsImZpbGUiOiJiYWNrZ3JvdW5kLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2JhY2tncm91bmQudHNcIik7XG4iLCJpbXBvcnQge0luZm9ybWF0aW9uLCBTZXR0aW5ncywgUmFuZ2V9IGZyb20gXCJzcmMvY2xhc3MvaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7Q2FwdHVyaW5nfSBmcm9tIFwiLi9jbGFzcy9DYXB0dXJpbmdcIjtcclxuaW1wb3J0IHtGaWxlbmFtZX0gZnJvbSBcIi4vY2xhc3MvRmlsZW5hbWVcIjtcclxuaW1wb3J0ICcuL2NvbmZpZyc7XHJcbmltcG9ydCB7Q0FQVFVSRV9XQUlUX01JTExJU0VDT05EUywgREVGQVVMVF9DT1VOVEVSLCBERUZBVUxUX1JBTkdFLCBERUZBVUxUX1RJVExFLCBGSVJTVF9DQVBUVVJFX1dBSVRfTUlMTElTRUNPTkRTfSBmcm9tIFwiLi9jb25maWdcIjtcclxuXHJcbmludGVyZmFjZSBJbml0RGF0YSB7XHJcblx0dGFiOiBjaHJvbWUudGFicy5UYWIsXHJcblx0c2V0dGluZ3M6IFNldHRpbmdzLFxyXG5cdGluZm9ybWF0aW9uOiBJbmZvcm1hdGlvblxyXG59XHJcblxyXG57XHJcblx0Ly9DYXB0dXJpbmcg44Kv44Op44K5XHJcblx0Y29uc3QgY2FwdHVyaW5nID0gbmV3IENhcHR1cmluZygpO1xyXG5cclxuXHQvKipcclxuXHQgKiDmi6HlvLXmqZ/og73jga7oqK3lrprjgajnj77lnKjlj4LnhafkuK3jga7jgr/jg5bmg4XloLHjgpLov5TjgZlcclxuXHQgKi9cclxuXHRjb25zdCBpbml0ID0gKCkgPT4ge1xyXG5cdFx0LyoqXHJcblx0XHQgKiByYW5nZSDjgpIgUmFuZ2Ug5Z6L44Gr44Kt44Oj44K544OI44GZ44KLXHJcblx0XHQgKiBAcGFyYW0gcmFuZ2VcclxuXHRcdCAqL1xyXG5cdFx0Y29uc3QgY2FzdFJhbmdlID0gKHJhbmdlOiBzdHJpbmcpOiBSYW5nZSA9PiB7XHJcblx0XHRcdHN3aXRjaCAocmFuZ2UpIHtcclxuXHRcdFx0XHRjYXNlICdmdWxsJzpcclxuXHRcdFx0XHRjYXNlICdkaXNwbGF5JzpcclxuXHRcdFx0XHRjYXNlICdwZXJmZWN0JzpcclxuXHRcdFx0XHRcdHJldHVybiByYW5nZTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRyZXR1cm4gJ2Z1bGwnO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPEluaXREYXRhPihyZXNvbHZlID0+IHtcclxuXHRcdFx0Ly/mi6HlvLXmqZ/og73jga7oqK3lrprjgpLlhaXmiYtcclxuXHRcdFx0bmV3IFByb21pc2U8Y2hyb21lLnRhYnMuVGFiPihpbm5lclJlc29sdmUgPT4ge1xyXG5cdFx0XHRcdGNocm9tZS50YWJzLnF1ZXJ5KHthY3RpdmU6IHRydWV9LCAodGFiczogY2hyb21lLnRhYnMuVGFiW10pID0+IHtcclxuXHRcdFx0XHRcdGlubmVyUmVzb2x2ZSh0YWJzWzBdKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHRcdFx0XHQudGhlbih0YWIgPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlPHt0YWI6IGNocm9tZS50YWJzLlRhYiwgc2V0dGluZ3M6IFNldHRpbmdzfT4oaW5uZXJSZXNvbHZlID0+IHtcclxuXHRcdFx0XHRcdFx0Y2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoe3JhbmdlOiBERUZBVUxUX1JBTkdFLCB0aXRsZTogREVGQVVMVF9USVRMRSwgY291bnRlcjogREVGQVVMVF9DT1VOVEVSfSwgKGl0ZW1zOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdGlubmVyUmVzb2x2ZSh7dGFiLCBzZXR0aW5nczoge3JhbmdlOiBjYXN0UmFuZ2UoaXRlbXMucmFuZ2UpLCB0aXRsZTogU3RyaW5nKGl0ZW1zLnRpdGxlKSwgY291bnRlcjogTnVtYmVyKGl0ZW1zLmNvdW50ZXIpfX0pO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LnRoZW4oKGRhdGE6IHt0YWI6IGNocm9tZS50YWJzLlRhYiwgc2V0dGluZ3M6IFNldHRpbmdzfSkgPT4ge1xyXG5cdFx0XHRcdFx0Ly/nj77lkIjooajnpLrjgZfjgabjgYTjgovjgr/jg5bjga7mg4XloLHjgpLlhaXmiYtcclxuXHRcdFx0XHRcdGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKE51bWJlcihkYXRhLnRhYi5pZCksIHt0eXBlOiAnaW5mb3JtYXRpb24nfSwgKGluZm9ybWF0aW9uOiBJbmZvcm1hdGlvbikgPT4ge1xyXG5cdFx0XHRcdFx0XHRyZXNvbHZlKHt0YWI6IGRhdGEudGFiLCBzZXR0aW5nczogZGF0YS5zZXR0aW5ncywgaW5mb3JtYXRpb259KTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICog54++5Zyo6KGo56S644GX44Gm44GE44KL44K/44OW44Gu44Kt44Oj44OX44OB44Oj44KS5LiA5Zue6KGM44GGXHJcblx0ICogQHBhcmFtIGlkXHJcblx0ICogQHBhcmFtIHJhbmdlXHJcblx0ICovXHJcblx0Y29uc3QgY3JlYXRlQ2FwdHVyZSA9IChpZDogbnVtYmVyLCByYW5nZTogUmFuZ2UsIGluZGV4OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuXHRcdHJldHVybiAgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcblx0XHRcdC8vaW5kZXggPT09IDEgKOOCreODo+ODl+ODgeODo+OBjOS6jOWbnuebrinjga7loLTlkIjjga8gcG9zaXRpb246IGZpeGVkIOOBruimgee0oOOCkumdnuihqOekuuOBq+OBmeOCi1xyXG5cdFx0XHRpZiAoaW5kZXggPT09IDEpIHtcclxuXHRcdFx0XHRjaHJvbWUudGFicy5zZW5kTWVzc2FnZShpZCwge3R5cGU6ICdraWxsRml4ZWQnfSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8v44K544Kv44Ot44O844Or44O744Kt44Oj44OX44OB44OjXHJcblx0XHRcdGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGlkLCB7dHlwZTogJ3NpemluZycsIHJhbmdlOiByYW5nZSwgaW5kZXg6IGluZGV4fSwgcmVzcG9uc2UgPT4ge1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0Y2FwdHVyaW5nLmNhcHR1cmUocmVzcG9uc2UueCwgcmVzcG9uc2UueSlcclxuXHRcdFx0XHRcdFx0LnRoZW4oKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSwgaW5kZXggPCAyID8gQ0FQVFVSRV9XQUlUX01JTExJU0VDT05EUyA6IEZJUlNUX0NBUFRVUkVfV0FJVF9NSUxMSVNFQ09ORFMpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIHNldHRpbmdzIOOBqCBpbmZvcm1hdGlvbiDjgYvjgonmsYLjgoHjgonjgozjgabjgYTjgovnlLvlg4/jgrXjgqTjgrrjgpLlsI7jgY3lh7rjgZlcclxuXHQgKiBAcGFyYW0gc2V0dGluZ3NcclxuXHQgKiBAcGFyYW0gaW5mb3JtYXRpb25cclxuXHQgKi9cclxuXHRjb25zdCBnZXRJbWFnZVNpemUgPSAoc2V0dGluZ3M6IFNldHRpbmdzLCBpbmZvcm1hdGlvbjogSW5mb3JtYXRpb24pOiB7d2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9ID0+IHtcclxuXHRcdC8v5pyA57WC55qE44Gq55S75YOP44K144Kk44K644KS5rG65a6aKOOBk+OBruaZgueCueOBp+OBryByYW5nZSA9IGRpc3BsYXkg55SoKVxyXG5cdFx0bGV0IHdpZHRoID0gaW5mb3JtYXRpb24ud2luZG93V2lkdGg7XHJcblx0XHRsZXQgaGVpZ2h0ID0gaW5mb3JtYXRpb24ud2luZG93SGVpZ2h0O1xyXG5cclxuXHRcdC8vcmFuZ2Ug44Gr5ZCI44KP44Gb44Gf55S75YOP44K144Kk44K644KS55So5oSPXHJcblx0XHRzd2l0Y2ggKHNldHRpbmdzLnJhbmdlKSB7XHJcblx0XHRcdGNhc2UgJ2Z1bGwnOlxyXG5cdFx0XHRcdHdpZHRoID0gaW5mb3JtYXRpb24ucmF0aW9UeXBlID09PSAnd2lkdGgnXHJcblx0XHRcdFx0XHQ/IGluZm9ybWF0aW9uLndpbmRvd1dpZHRoXHJcblx0XHRcdFx0XHQ6IGluZm9ybWF0aW9uLndpbmRvd1dpZHRoICogaW5mb3JtYXRpb24ucmF0aW87XHJcblx0XHRcdFx0aGVpZ2h0ID0gaW5mb3JtYXRpb24ucmF0aW9UeXBlID09PSAnaGVpZ2h0J1xyXG5cdFx0XHRcdFx0PyBpbmZvcm1hdGlvbi53aW5kb3dIZWlnaHRcclxuXHRcdFx0XHRcdDogaW5mb3JtYXRpb24ud2luZG93SGVpZ2h0ICogaW5mb3JtYXRpb24ucmF0aW87XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3BlcmZlY3QnOlxyXG5cdFx0XHRcdHdpZHRoID0gaW5mb3JtYXRpb24uZG9jdW1lbnRXaWR0aDtcclxuXHRcdFx0XHRoZWlnaHQgPSBpbmZvcm1hdGlvbi5kb2N1bWVudEhlaWdodDtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHJcblx0XHQvL+i/lOOBmVxyXG5cdFx0cmV0dXJuICB7d2lkdGgsIGhlaWdodH07XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICog54++5Zyo6ZaL44GE44Gm44GE44KL44K/44OW44Gu44Kt44Oj44OX44OB44Oj44KS6KGM44GGXHJcblx0ICogQHBhcmFtIHNldHRpbmdzXHJcblx0ICogQHBhcmFtIGluZm9ybWF0aW9uXHJcblx0ICogQHBhcmFtIHRhYlxyXG5cdCAqL1xyXG5cdGNvbnN0IGdldERhdGFVUkwgPSBhc3luYyAoc2V0dGluZ3M6IFNldHRpbmdzLCBpbmZvcm1hdGlvbjogSW5mb3JtYXRpb24sIHRhYjogY2hyb21lLnRhYnMuVGFiKSA9PiB7XHJcblx0XHQvL+S9leaemuOBrueUu+WDj+OCkuOCreODo+ODl+ODgeODo+OBmeOCi+OBi1xyXG5cdFx0Y29uc3QgY2FwdHVyZU51bWJlciA9IHNldHRpbmdzLnJhbmdlID09PSAncGVyZmVjdCdcclxuXHRcdFx0PyBpbmZvcm1hdGlvbi5jYXB0dXJlTnVtYmVyXHJcblx0XHRcdDogMTtcclxuXHJcblx0XHQvL+OCteOCpOOCuuWPluW+l1xyXG5cdFx0Y29uc3Qgc2l6ZSA9IGdldEltYWdlU2l6ZShzZXR0aW5ncywgaW5mb3JtYXRpb24pO1xyXG5cclxuXHRcdC8v44Kt44Oj44OX44OB44Oj5Yem55CG44KS5b+F6KaB44Gq5Zue5pWw44Gg44GR6KGM44GGXHJcblx0XHRmb3IgKGxldCBpID0gMCwgbWF4ID0gY2FwdHVyZU51bWJlcjsgaSA8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XHJcblx0XHRcdGF3YWl0IGNyZWF0ZUNhcHR1cmUoTnVtYmVyKHRhYi5pZCksIHNldHRpbmdzLnJhbmdlLCBpKTtcclxuXHRcdH1cclxuXHJcblx0XHQvL+OCueOCv+OCpOODq+OCkuWFg+OBq+aIu+OBmVxyXG5cdFx0Y2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoTnVtYmVyKHRhYi5pZCksIHt0eXBlOiAncmVzZXRTaXppbmcnLCB4OiBpbmZvcm1hdGlvbi5zY3JvbGxYLCB5OiBpbmZvcm1hdGlvbi5zY3JvbGxZfSk7XHJcblxyXG5cdFx0Ly9kYXRhVVJMIOWMllxyXG5cdFx0cmV0dXJuIGNhcHR1cmluZy5jb21wb3NlKHNpemUud2lkdGgsIHNpemUuaGVpZ2h0KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiDjg5XjgqHjgqTjg6vlkI3jgpLmsbrlrprjgZfjgIHjg4Djgqbjg7Pjg63jg7zjg4njgpLooYzjgYZcclxuXHQgKiBAcGFyYW0gdXJsXHJcblx0ICogQHBhcmFtIHNldHRpbmdzXHJcblx0ICovXHJcblx0Y29uc3QgZG93bmxvYWQgPSAodXJsOiBzdHJpbmcsIHNldHRpbmdzOiBTZXR0aW5ncywgdGFiOiBjaHJvbWUudGFicy5UYWIpID0+IHtcclxuXHRcdC8v44OV44Kh44Kk44Or5ZCN5aSJ5o+b55So44Kv44Op44K5XHJcblx0XHRjb25zdCBmaWxlbmFtZSA9IG5ldyBGaWxlbmFtZSgpO1xyXG5cclxuXHRcdC8v44OV44Kh44Kk44Or5ZCN44OG44Oz44OX44Os44O844OI5aSJ5pWw5paH5a2X5YiX55m76YyyXHJcblx0XHRpZiAoc2V0dGluZ3MudGl0bGUuaW5kZXhPZigne3t0aXRsZX19JykgIT09IC0xKSB7XHJcblx0XHRcdGZpbGVuYW1lLnNldFRlbXBsYXRlKCd7e3RpdGxlfX0nLCBkZWNvZGVVUklDb21wb25lbnQoU3RyaW5nKHRhYi50aXRsZSkpKTtcclxuXHRcdH1cclxuXHRcdGlmIChzZXR0aW5ncy50aXRsZS5pbmRleE9mKCd7e3VybH19JykgIT09IC0xKSB7XHJcblx0XHRcdGZpbGVuYW1lLnNldFRlbXBsYXRlKCd7e3VybH19JywgU3RyaW5nKHRhYi51cmwpLnJlcGxhY2UoL2h0dHBzPzpcXC9cXC8vLCAnJykpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHNldHRpbmdzLnRpdGxlLmluZGV4T2YoJ3t7Y291bnRlcn19JykgIT09IC0xKSB7XHJcblx0XHRcdGZpbGVuYW1lLnNldFRlbXBsYXRlKCd7e2NvdW50ZXJ9fScsIFN0cmluZyhzZXR0aW5ncy5jb3VudGVyKSk7XHJcblx0XHRcdHNldHRpbmdzLmNvdW50ZXIgPSBzZXR0aW5ncy5jb3VudGVyICsgMTtcclxuXHRcdH1cclxuXHJcblx0XHQvL2NvdW50ZXIg6Kit5a6a44Gu5L+d5a2YXHJcblx0XHRjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7Y291bnRlcjogc2V0dGluZ3MuY291bnRlcn0pO1xyXG5cclxuXHRcdC8v44OA44Km44Oz44Ot44O844OJXHJcblx0XHRjaHJvbWUuZG93bmxvYWRzLmRvd25sb2FkKHt1cmw6IHVybCwgZmlsZW5hbWU6IGZpbGVuYW1lLmdldEZpbGVOYW1lKHNldHRpbmdzLnRpdGxlKSsnLnBuZyd9KTtcclxuXHR9O1xyXG5cclxuXHQvL+OCreODo+ODl+ODgeODo+Wun+ihjFxyXG5cdGNvbnN0IGFjdGlvbiA9ICgpID0+IHtcclxuXHRcdC8v44Kt44Oj44OX44OB44Oj44Gu5Yid5pyf5YyWXHJcblx0XHRjYXB0dXJpbmcuaW5pdCgpO1xyXG5cclxuXHRcdC8v54++5Zyo6KGo56S644GX44Gm44GE44KL44K/44OW44Gu5oOF5aCx44KS5YWl5omL44GZ44KLXHJcblx0XHRpbml0KClcclxuXHRcdFx0LnRoZW4oZGF0YSA9PiB7XHJcblx0XHRcdFx0Z2V0RGF0YVVSTChkYXRhLnNldHRpbmdzLCBkYXRhLmluZm9ybWF0aW9uLCBkYXRhLnRhYilcclxuXHRcdFx0XHRcdC50aGVuKCh1cmw6IHN0cmluZykgPT4ge1xyXG5cdFx0XHRcdFx0XHRkb3dubG9hZCh1cmwsIGRhdGEuc2V0dGluZ3MsIGRhdGEudGFiKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHQuY2F0Y2goKGRhdGEpID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHRhbGVydCgnU29ycnksIFRyeSBhZ2FpbiBhZnRlciByZWxvYWQuJyk7XHJcblx0XHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8v44Ki44Kk44Kz44Oz44Kv44Oq44OD44KvXHJcblx0Y2hyb21lLmJyb3dzZXJBY3Rpb24ub25DbGlja2VkLmFkZExpc3RlbmVyKGFjdGlvbik7XHJcblxyXG5cdC8v5Y+z44Kv44Oq44OD44Kv44Oh44OL44Ol44O8XHJcblx0Y2hyb21lLmNvbnRleHRNZW51cy5jcmVhdGUoe1xyXG5cdFx0aWQ6ICdydW4nLFxyXG5cdFx0dGl0bGU6ICdJbW1lZGlhdGUgU2hvdCcsXHJcblx0XHRjb250ZXh0czogWydhbGwnXSxcclxuXHRcdHR5cGU6ICdub3JtYWwnXHJcblx0fSk7XHJcblx0Y2hyb21lLmNvbnRleHRNZW51cy5vbkNsaWNrZWQuYWRkTGlzdGVuZXIoYWN0aW9uKTtcclxufVxyXG4iLCJpbnRlcmZhY2UgQ2FwdHVyZVVSTCB7XHJcbiAgdXJsOiBzdHJpbmcsXHJcbiAgeDogbnVtYmVyLFxyXG4gIHk6IG51bWJlclxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FwdHVyaW5nIHtcclxuXHJcbiAgLy/jgq3jg6Pjg5fjg4Hjg6PmuIjjgb8gRGF0YVVSTCDjga7pm4blkIhcclxuICBwcml2YXRlIGNhcHR1cmVVUkxzOiBDYXB0dXJlVVJMW10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogdGFyZ2V0IOOBjCBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQg44Gn44GC44KL44GL5Yik5a6a44GZ44KLXHJcbiAgICog5YW35L2T55qE44Gr44GvIGRyYXdJbWFnZSDjg6Hjgr3jg4Pjg4njgYzlrZjlnKjjgZnjgovjgYvliKTlrprjgZnjgotcclxuICAgKiBAcGFyYW0gdGFyZ2V0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfaXNDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSAodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0+IHtcclxuICAgIHJldHVybiB0YXJnZXQuZHJhd0ltYWdlICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDnj77lnKggY2FwdHVyZVVSTHMg44Gr6Kqt44G/6L6844G+44KM44Gm44GE44KL44OH44O844K/44KS44Kr44Oz44OQ44K544Gr6Kqt44G/6L6844G/44CB5ZCI5oiQ44CB44OI44Oq44Of44Oz44Kw44GZ44KLXHJcbiAgICog5pyA57WC55qE44Gr5ZCQ44GN5Ye644GV44KM44KL55S75YOP44Gu5aSn44GN44GV44GvIHdpZHRoICogaGVpZ2h0IOOBqOOBquOCi1xyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHVibGljIGNvbXBvc2UgPSBhc3luYyAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xyXG4gICAgLy/jgqvjg7Pjg5Djgrnjga7kvZzmiJBcclxuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG5cclxuICAgIC8v44Kr44Oz44OQ44K544Gu5aSn44GN44GV44KS6Kit5a6aXHJcbiAgICBjYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHdpZHRoKydweCcpO1xyXG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaGVpZ2h0KydweCcpO1xyXG5cclxuICAgIC8vMkQg44Kz44Oz44OG44Kt44K544OI44KS5Y+W5b6XXHJcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbiAgICAvL2N0eCDjga7jgr/jgqTjg5fjgqzjg7zjg4lcclxuICAgIGlmICggISB0aGlzLl9pc0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRChjdHgpKVxyXG4gICAge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLy/jgqvjg7Pjg5DjgrnjgavnlLvlg4/jgpLoqK3nva5cclxuICAgIGF3YWl0IHRoaXMuY2FwdHVyZVVSTHMucmVkdWNlKChwcmV2LCBjdXJyZW50KSA9PiBwcmV2LnRoZW4oKCkgPT4ge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCBjdXJyZW50LngsIGN1cnJlbnQueSk7XHJcbiAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpbWFnZS5zcmMgPSBjdXJyZW50LnVybDtcclxuICAgICAgfSk7XHJcbiAgICB9KSwgUHJvbWlzZS5yZXNvbHZlKCkpO1xyXG5cclxuICAgIC8vZGF0YVVSTCDjgpLnlJ/miJBcclxuICAgIGNvbnN0IGRhdGEgPSBjYW52YXMudG9EYXRhVVJMKCk7XHJcblxyXG4gICAgLy9jYW52YXMg44KS5raI44GZXHJcbiAgICBjYW52YXMucmVtb3ZlKCk7XHJcblxyXG4gICAgLy9kYXRhVVJMIOOCkui/lOOBmVxyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICog44Kt44Oj44OX44OB44Oj44KS5Y+W5b6X44GX44CBY2FwdHVyZVVSTHMg44GrIHB1c2gg44GZ44KLXHJcbiAgICogQHBhcmFtIHhcclxuICAgKiBAcGFyYW0geVxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHVibGljIGNhcHR1cmUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgY2hyb21lLnRhYnMuY2FwdHVyZVZpc2libGVUYWIoKHVybCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2FwdHVyZVVSTHMucHVzaCh7eCwgeSwgdXJsfSk7XHJcbiAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY2FwdHVyZVVSTHMg44KS56m644Gr44GZ44KLXHJcbiAgICovXHJcbiAgcHVibGljIGluaXQoKSB7XHJcbiAgICB0aGlzLmNhcHR1cmVVUkxzID0gW107XHJcbiAgfVxyXG5cclxufVxyXG4iLCIvKipcclxuICog44OV44Kh44Kk44Or44ON44O844Og5L2c5oiQ44Kv44Op44K5XHJcbiAqL1xyXG5pbXBvcnQge1RlbXBsYXRlc30gZnJvbSBcIi4vaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRmlsZW5hbWUge1xyXG5cclxuICAvKipcclxuICAgKiDnva7jgY3mj5vjgYjlrprnvqlcclxuICAgKi9cclxuICBwcml2YXRlIHRlbXBsYXRlczogVGVtcGxhdGVzO1xyXG5cclxuICAvKipcclxuICAgKiDjg5XjgqHjgqTjg6vlkI3jgavkvb/nlKjjgafjgY3jgarjgYTmloflrZfjgpLlhajjgaYgcmVwbGFjZW1lbnQg44Gr572u5o+b44GX44Gm6L+U44GZXHJcbiAgICogQHBhcmFtIHN0cmluZ1xyXG4gICAqIEBwYXJhbSByZXBsYWNlbWVudFxyXG4gICAqIEByZXR1cm4ge3N0cmluZ31cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3JlcGxhY2VCYWRDaGFyYWN0ZXIoc3RyaW5nOiBzdHJpbmcsIHJlcGxhY2VtZW50OiBzdHJpbmcgPSAnXycpIHtcclxuICAgIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKC9bXFxcXFxcLzpcXCpcXD9cIjw+XFwtXFx8XFxzXSsvZywgcmVwbGFjZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogdGhpcy50ZW1wbGF0ZXMg44Gu5a6a576pXHJcbiAgICovXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy50ZW1wbGF0ZXMgPSBuZXcgQXJyYXkoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOODhuODs+ODl+ODrOODvOODiOWkieaVsOaWh+Wtl+WIl+OBqOOBneOBruWApOOCkuioreWumuOBmeOCi1xyXG4gICAqIEBwYXJhbSB0ZW1wbGF0ZVxyXG4gICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXRUZW1wbGF0ZSh0ZW1wbGF0ZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnRlbXBsYXRlcy5wdXNoKHtcclxuICAgICAgdGVtcGxhdGU6IFN0cmluZyh0ZW1wbGF0ZSksXHJcbiAgICAgIHZhbHVlOiBTdHJpbmcodmFsdWUpXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHNldFRlbXBsYXRlKCksIF9yZXBsYWNlQmFkQ2hhcmFjdGVyKCkg44Gn5aSJ5o+b44GX44Gf44OV44Kh44Kk44Or5ZCN44KS5Ye65YqbXHJcbiAgICogQHBhcmFtIG5hbWVcclxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAgICovXHJcbiAgcHVibGljIGdldEZpbGVOYW1lKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAvL+ODhuODs+ODl+ODrOODvOODiOWkieaVsOaWh+Wtl+WIl+OCkuWApOOBq+e9ruOBjeaPm+OBiOOCi1xyXG4gICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IHRoaXMudGVtcGxhdGVzLmxlbmd0aDsgaSA8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XHJcbiAgICAgIG5hbWUgPSBTdHJpbmcobmFtZSkucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMudGVtcGxhdGVzW2ldLnRlbXBsYXRlLCAnZycpLCB0aGlzLnRlbXBsYXRlc1tpXS52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/kvb/nlKjkuI3lj6/jga7mloflrZfjgpLlhajjgabnva7jgY3mj5vjgYjjgabov5TljbRcclxuICAgIHJldHVybiB0aGlzLl9yZXBsYWNlQmFkQ2hhcmFjdGVyKG5hbWUpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiLy/jgq3jg6Pjg5fjg4Hjg6Pnr4Tlm7LliJ3mnJ/lgKRcclxuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkFOR0U6IHN0cmluZyA9ICdwZXJmZWN0JztcclxuXHJcbi8v44K/44Kk44OI44Or5ZCN5Yid5pyf5YCkXHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX1RJVExFOiBzdHJpbmcgPSAne3t0aXRsZX19JztcclxuXHJcbi8v44Kr44Km44Oz44OI5aSJ5pWw5Yid5pyf5YCkXHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPVU5URVI6IG51bWJlciA9IDE7XHJcblxyXG4vL+ikh+aVsOaemuOCreODo+ODl+ODgeODo+OBrumam+OAgeasoeOBruOCreODo+ODl+ODgeODo+OBvuOBp+S9leODn+ODquenkumWk+malOOCkue9ruOBj+OBi1xyXG5leHBvcnQgY29uc3QgQ0FQVFVSRV9XQUlUX01JTExJU0VDT05EUzogbnVtYmVyID0gMjA7XHJcblxyXG4vL0NBUFRVUkVfV0FJVF9NSUxMSVNFQ09ORFMg44GM5L2/44KP44KM44KL6Zqb44CB5pyA5Yid44Gu5LiA5Zue44Gg44GR44Gv44GT44Gu5YCk44GM5L2/55So44GV44KM44KLXHJcbmV4cG9ydCBjb25zdCBGSVJTVF9DQVBUVVJFX1dBSVRfTUlMTElTRUNPTkRTOiBudW1iZXIgPSAxMDA7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=