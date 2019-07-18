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
                }, index < 2 ? 100 : 20);
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzL0NhcHR1cmluZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MvRmlsZW5hbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakY0QztBQUNGO0FBUTFDO0lBQ0MsZUFBZTtJQUNmLE1BQU0sU0FBUyxHQUFHLElBQUksMERBQVMsRUFBRSxDQUFDO0lBRWxDOztPQUVHO0lBQ0gsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO1FBQ2pCOzs7V0FHRztRQUNILE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBYSxFQUFTLEVBQUU7WUFDMUMsUUFBUSxLQUFLLEVBQUU7Z0JBQ2QsS0FBSyxNQUFNLENBQUM7Z0JBQ1os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R0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNyRSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25HO1FBRUQsbUJBQW1CO1FBQ25CLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Q0FFRiIsImZpbGUiOiJiYWNrZ3JvdW5kLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2JhY2tncm91bmQudHNcIik7XG4iLCJpbXBvcnQge0luZm9ybWF0aW9uLCBTZXR0aW5ncywgUmFuZ2V9IGZyb20gXCJzcmMvY2xhc3MvaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7Q2FwdHVyaW5nfSBmcm9tIFwiLi9jbGFzcy9DYXB0dXJpbmdcIjtcclxuaW1wb3J0IHtGaWxlbmFtZX0gZnJvbSBcIi4vY2xhc3MvRmlsZW5hbWVcIjtcclxuXHJcbmludGVyZmFjZSBJbml0RGF0YSB7XHJcblx0dGFiOiBjaHJvbWUudGFicy5UYWIsXHJcblx0c2V0dGluZ3M6IFNldHRpbmdzLFxyXG5cdGluZm9ybWF0aW9uOiBJbmZvcm1hdGlvblxyXG59XHJcblxyXG57XHJcblx0Ly9DYXB0dXJpbmcg44Kv44Op44K5XHJcblx0Y29uc3QgY2FwdHVyaW5nID0gbmV3IENhcHR1cmluZygpO1xyXG5cclxuXHQvKipcclxuXHQgKiDmi6HlvLXmqZ/og73jga7oqK3lrprjgajnj77lnKjlj4LnhafkuK3jga7jgr/jg5bmg4XloLHjgpLov5TjgZlcclxuXHQgKi9cclxuXHRjb25zdCBpbml0ID0gKCkgPT4ge1xyXG5cdFx0LyoqXHJcblx0XHQgKiByYW5nZSDjgpIgUmFuZ2Ug5Z6L44Gr44Kt44Oj44K544OI44GZ44KLXHJcblx0XHQgKiBAcGFyYW0gcmFuZ2VcclxuXHRcdCAqL1xyXG5cdFx0Y29uc3QgY2FzdFJhbmdlID0gKHJhbmdlOiBzdHJpbmcpOiBSYW5nZSA9PiB7XHJcblx0XHRcdHN3aXRjaCAocmFuZ2UpIHtcclxuXHRcdFx0XHRjYXNlICdmdWxsJzpcclxuXHRcdFx0XHRjYXNlICdkaXNwbGF5JzpcclxuXHRcdFx0XHRjYXNlICdwZXJmZWN0JzpcclxuXHRcdFx0XHRcdHJldHVybiByYW5nZTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRyZXR1cm4gJ2Z1bGwnO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPEluaXREYXRhPihyZXNvbHZlID0+IHtcclxuXHRcdFx0Ly/mi6HlvLXmqZ/og73jga7oqK3lrprjgpLlhaXmiYtcclxuXHRcdFx0bmV3IFByb21pc2U8Y2hyb21lLnRhYnMuVGFiPihpbm5lclJlc29sdmUgPT4ge1xyXG5cdFx0XHRcdGNocm9tZS50YWJzLnF1ZXJ5KHthY3RpdmU6IHRydWV9LCAodGFiczogY2hyb21lLnRhYnMuVGFiW10pID0+IHtcclxuXHRcdFx0XHRcdGlubmVyUmVzb2x2ZSh0YWJzWzBdKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHRcdFx0XHQudGhlbih0YWIgPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlPHt0YWI6IGNocm9tZS50YWJzLlRhYiwgc2V0dGluZ3M6IFNldHRpbmdzfT4oaW5uZXJSZXNvbHZlID0+IHtcclxuXHRcdFx0XHRcdFx0Y2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoe3JhbmdlOiAnZnVsbCcsIHRpdGxlOiAne3t0aXRsZX19JywgY291bnRlcjogMH0sIChpdGVtczoge1trZXk6IHN0cmluZ106IHN0cmluZ30pID0+IHtcclxuXHRcdFx0XHRcdFx0XHRpbm5lclJlc29sdmUoe3RhYiwgc2V0dGluZ3M6IHtyYW5nZTogY2FzdFJhbmdlKGl0ZW1zLnJhbmdlKSwgdGl0bGU6IFN0cmluZyhpdGVtcy50aXRsZSksIGNvdW50ZXI6IE51bWJlcihpdGVtcy5jb3VudGVyKX19KTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC50aGVuKChkYXRhOiB7dGFiOiBjaHJvbWUudGFicy5UYWIsIHNldHRpbmdzOiBTZXR0aW5nc30pID0+IHtcclxuXHRcdFx0XHRcdC8v54++5ZCI6KGo56S644GX44Gm44GE44KL44K/44OW44Gu5oOF5aCx44KS5YWl5omLXHJcblx0XHRcdFx0XHRjaHJvbWUudGFicy5zZW5kTWVzc2FnZShOdW1iZXIoZGF0YS50YWIuaWQpLCB7dHlwZTogJ2luZm9ybWF0aW9uJ30sIChpbmZvcm1hdGlvbjogSW5mb3JtYXRpb24pID0+IHtcclxuXHRcdFx0XHRcdFx0cmVzb2x2ZSh7dGFiOiBkYXRhLnRhYiwgc2V0dGluZ3M6IGRhdGEuc2V0dGluZ3MsIGluZm9ybWF0aW9ufSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIOePvuWcqOihqOekuuOBl+OBpuOBhOOCi+OCv+ODluOBruOCreODo+ODl+ODgeODo+OCkuS4gOWbnuihjOOBhlxyXG5cdCAqIEBwYXJhbSBpZFxyXG5cdCAqIEBwYXJhbSByYW5nZVxyXG5cdCAqL1xyXG5cdGNvbnN0IGNyZWF0ZUNhcHR1cmUgPSAoaWQ6IG51bWJlciwgcmFuZ2U6IFJhbmdlLCBpbmRleDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcblx0XHRyZXR1cm4gIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG5cdFx0XHQvL2luZGV4ID09PSAxICjjgq3jg6Pjg5fjg4Hjg6PjgYzkuozlm57nm64p44Gu5aC05ZCI44GvIHBvc2l0aW9uOiBmaXhlZCDjga7opoHntKDjgpLpnZ7ooajnpLrjgavjgZnjgotcclxuXHRcdFx0aWYgKGluZGV4ID09PSAxKSB7XHJcblx0XHRcdFx0Y2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoaWQsIHt0eXBlOiAna2lsbEZpeGVkJ30pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvL+OCueOCr+ODreODvOODq+ODu+OCreODo+ODl+ODgeODo1xyXG5cdFx0XHRjaHJvbWUudGFicy5zZW5kTWVzc2FnZShpZCwge3R5cGU6ICdzaXppbmcnLCByYW5nZTogcmFuZ2UsIGluZGV4OiBpbmRleH0sIHJlc3BvbnNlID0+IHtcclxuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRcdGNhcHR1cmluZy5jYXB0dXJlKHJlc3BvbnNlLngsIHJlc3BvbnNlLnkpXHJcblx0XHRcdFx0XHRcdC50aGVuKCgpID0+IHtcclxuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sIGluZGV4IDwgMiA/IDEwMCA6IDIwKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiBzZXR0aW5ncyDjgaggaW5mb3JtYXRpb24g44GL44KJ5rGC44KB44KJ44KM44Gm44GE44KL55S75YOP44K144Kk44K644KS5bCO44GN5Ye644GZXHJcblx0ICogQHBhcmFtIHNldHRpbmdzXHJcblx0ICogQHBhcmFtIGluZm9ybWF0aW9uXHJcblx0ICovXHJcblx0Y29uc3QgZ2V0SW1hZ2VTaXplID0gKHNldHRpbmdzOiBTZXR0aW5ncywgaW5mb3JtYXRpb246IEluZm9ybWF0aW9uKToge3dpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyfSA9PiB7XHJcblx0XHQvL+acgOe1gueahOOBqueUu+WDj+OCteOCpOOCuuOCkuaxuuWumijjgZPjga7mmYLngrnjgafjga8gcmFuZ2UgPSBkaXNwbGF5IOeUqClcclxuXHRcdGxldCB3aWR0aCA9IGluZm9ybWF0aW9uLndpbmRvd1dpZHRoO1xyXG5cdFx0bGV0IGhlaWdodCA9IGluZm9ybWF0aW9uLndpbmRvd0hlaWdodDtcclxuXHJcblx0XHQvL3JhbmdlIOOBq+WQiOOCj+OBm+OBn+eUu+WDj+OCteOCpOOCuuOCkueUqOaEj1xyXG5cdFx0c3dpdGNoIChzZXR0aW5ncy5yYW5nZSkge1xyXG5cdFx0XHRjYXNlICdmdWxsJzpcclxuXHRcdFx0XHR3aWR0aCA9IGluZm9ybWF0aW9uLnJhdGlvVHlwZSA9PT0gJ3dpZHRoJ1xyXG5cdFx0XHRcdFx0PyBpbmZvcm1hdGlvbi53aW5kb3dXaWR0aFxyXG5cdFx0XHRcdFx0OiBpbmZvcm1hdGlvbi53aW5kb3dXaWR0aCAqIGluZm9ybWF0aW9uLnJhdGlvO1xyXG5cdFx0XHRcdGhlaWdodCA9IGluZm9ybWF0aW9uLnJhdGlvVHlwZSA9PT0gJ2hlaWdodCdcclxuXHRcdFx0XHRcdD8gaW5mb3JtYXRpb24ud2luZG93SGVpZ2h0XHJcblx0XHRcdFx0XHQ6IGluZm9ybWF0aW9uLndpbmRvd0hlaWdodCAqIGluZm9ybWF0aW9uLnJhdGlvO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdwZXJmZWN0JzpcclxuXHRcdFx0XHR3aWR0aCA9IGluZm9ybWF0aW9uLmRvY3VtZW50V2lkdGg7XHJcblx0XHRcdFx0aGVpZ2h0ID0gaW5mb3JtYXRpb24uZG9jdW1lbnRIZWlnaHQ7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly/ov5TjgZlcclxuXHRcdHJldHVybiAge3dpZHRoLCBoZWlnaHR9O1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIOePvuWcqOmWi+OBhOOBpuOBhOOCi+OCv+ODluOBruOCreODo+ODl+ODgeODo+OCkuihjOOBhlxyXG5cdCAqIEBwYXJhbSBzZXR0aW5nc1xyXG5cdCAqIEBwYXJhbSBpbmZvcm1hdGlvblxyXG5cdCAqIEBwYXJhbSB0YWJcclxuXHQgKi9cclxuXHRjb25zdCBnZXREYXRhVVJMID0gYXN5bmMgKHNldHRpbmdzOiBTZXR0aW5ncywgaW5mb3JtYXRpb246IEluZm9ybWF0aW9uLCB0YWI6IGNocm9tZS50YWJzLlRhYikgPT4ge1xyXG5cdFx0Ly/kvZXmnprjga7nlLvlg4/jgpLjgq3jg6Pjg5fjg4Hjg6PjgZnjgovjgYtcclxuXHRcdGNvbnN0IGNhcHR1cmVOdW1iZXIgPSBzZXR0aW5ncy5yYW5nZSA9PT0gJ3BlcmZlY3QnXHJcblx0XHRcdD8gaW5mb3JtYXRpb24uY2FwdHVyZU51bWJlclxyXG5cdFx0XHQ6IDE7XHJcblxyXG5cdFx0Ly/jgrXjgqTjgrrlj5blvpdcclxuXHRcdGNvbnN0IHNpemUgPSBnZXRJbWFnZVNpemUoc2V0dGluZ3MsIGluZm9ybWF0aW9uKTtcclxuXHJcblx0XHQvL+OCreODo+ODl+ODgeODo+WHpueQhuOCkuW/heimgeOBquWbnuaVsOOBoOOBkeihjOOBhlxyXG5cdFx0Zm9yIChsZXQgaSA9IDAsIG1heCA9IGNhcHR1cmVOdW1iZXI7IGkgPCBtYXg7IGkgPSAoaSArIDEpIHwgMCkge1xyXG5cdFx0XHRhd2FpdCBjcmVhdGVDYXB0dXJlKE51bWJlcih0YWIuaWQpLCBzZXR0aW5ncy5yYW5nZSwgaSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly/jgrnjgr/jgqTjg6vjgpLlhYPjgavmiLvjgZlcclxuXHRcdGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKE51bWJlcih0YWIuaWQpLCB7dHlwZTogJ3Jlc2V0U2l6aW5nJywgeDogaW5mb3JtYXRpb24uc2Nyb2xsWCwgeTogaW5mb3JtYXRpb24uc2Nyb2xsWX0pO1xyXG5cclxuXHRcdC8vZGF0YVVSTCDljJZcclxuXHRcdHJldHVybiBjYXB0dXJpbmcuY29tcG9zZShzaXplLndpZHRoLCBzaXplLmhlaWdodCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICog44OV44Kh44Kk44Or5ZCN44KS5rG65a6a44GX44CB44OA44Km44Oz44Ot44O844OJ44KS6KGM44GGXHJcblx0ICogQHBhcmFtIHVybFxyXG5cdCAqIEBwYXJhbSBzZXR0aW5nc1xyXG5cdCAqL1xyXG5cdGNvbnN0IGRvd25sb2FkID0gKHVybDogc3RyaW5nLCBzZXR0aW5nczogU2V0dGluZ3MsIHRhYjogY2hyb21lLnRhYnMuVGFiKSA9PiB7XHJcblx0XHQvL+ODleOCoeOCpOODq+WQjeWkieaPm+eUqOOCr+ODqeOCuVxyXG5cdFx0Y29uc3QgZmlsZW5hbWUgPSBuZXcgRmlsZW5hbWUoKTtcclxuXHJcblx0XHQvL+ODleOCoeOCpOODq+WQjeODhuODs+ODl+ODrOODvOODiOWkieaVsOaWh+Wtl+WIl+eZu+mMslxyXG5cdFx0aWYgKHNldHRpbmdzLnRpdGxlLmluZGV4T2YoJ3t7dGl0bGV9fScpICE9PSAtMSkge1xyXG5cdFx0XHRmaWxlbmFtZS5zZXRUZW1wbGF0ZSgne3t0aXRsZX19JywgZGVjb2RlVVJJQ29tcG9uZW50KFN0cmluZyh0YWIudGl0bGUpKSk7XHJcblx0XHR9XHJcblx0XHRpZiAoc2V0dGluZ3MudGl0bGUuaW5kZXhPZigne3t1cmx9fScpICE9PSAtMSkge1xyXG5cdFx0XHRmaWxlbmFtZS5zZXRUZW1wbGF0ZSgne3t1cmx9fScsIFN0cmluZyh0YWIudXJsKS5yZXBsYWNlKC9odHRwcz86XFwvXFwvLywgJycpKTtcclxuXHRcdH1cclxuXHRcdGlmIChzZXR0aW5ncy50aXRsZS5pbmRleE9mKCd7e2NvdW50ZXJ9fScpICE9PSAtMSkge1xyXG5cdFx0XHRmaWxlbmFtZS5zZXRUZW1wbGF0ZSgne3tjb3VudGVyfX0nLCBTdHJpbmcoc2V0dGluZ3MuY291bnRlcikpO1xyXG5cdFx0XHRzZXR0aW5ncy5jb3VudGVyID0gc2V0dGluZ3MuY291bnRlciArIDE7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly9jb3VudGVyIOioreWumuOBruS/neWtmFxyXG5cdFx0Y2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe2NvdW50ZXI6IHNldHRpbmdzLmNvdW50ZXJ9KTtcclxuXHJcblx0XHQvL+ODgOOCpuODs+ODreODvOODiVxyXG5cdFx0Y2hyb21lLmRvd25sb2Fkcy5kb3dubG9hZCh7dXJsOiB1cmwsIGZpbGVuYW1lOiBmaWxlbmFtZS5nZXRGaWxlTmFtZShzZXR0aW5ncy50aXRsZSkrJy5wbmcnfSk7XHJcblx0fTtcclxuXHJcblx0Ly/jgq3jg6Pjg5fjg4Hjg6Plrp/ooYxcclxuXHRjb25zdCBhY3Rpb24gPSAoKSA9PiB7XHJcblx0XHQvL+OCreODo+ODl+ODgeODo+OBruWIneacn+WMllxyXG5cdFx0Y2FwdHVyaW5nLmluaXQoKTtcclxuXHJcblx0XHQvL+ePvuWcqOihqOekuuOBl+OBpuOBhOOCi+OCv+ODluOBruaDheWgseOCkuWFpeaJi+OBmeOCi1xyXG5cdFx0aW5pdCgpXHJcblx0XHRcdC50aGVuKGRhdGEgPT4ge1xyXG5cdFx0XHRcdGdldERhdGFVUkwoZGF0YS5zZXR0aW5ncywgZGF0YS5pbmZvcm1hdGlvbiwgZGF0YS50YWIpXHJcblx0XHRcdFx0XHQudGhlbigodXJsOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0XHRcdFx0ZG93bmxvYWQodXJsLCBkYXRhLnNldHRpbmdzLCBkYXRhLnRhYik7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHRcdFx0LmNhdGNoKChkYXRhKSA9PiB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0YWxlcnQoJ1NvcnJ5LCBUcnkgYWdhaW4gYWZ0ZXIgcmVsb2FkLicpO1xyXG5cdFx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvL+OCouOCpOOCs+ODs+OCr+ODquODg+OCr1xyXG5cdGNocm9tZS5icm93c2VyQWN0aW9uLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcihhY3Rpb24pO1xyXG5cclxuXHQvL+WPs+OCr+ODquODg+OCr+ODoeODi+ODpeODvFxyXG5cdGNocm9tZS5jb250ZXh0TWVudXMuY3JlYXRlKHtcclxuXHRcdGlkOiAncnVuJyxcclxuXHRcdHRpdGxlOiAnSW1tZWRpYXRlIFNob3QnLFxyXG5cdFx0Y29udGV4dHM6IFsnYWxsJ10sXHJcblx0XHR0eXBlOiAnbm9ybWFsJ1xyXG5cdH0pO1xyXG5cdGNocm9tZS5jb250ZXh0TWVudXMub25DbGlja2VkLmFkZExpc3RlbmVyKGFjdGlvbik7XHJcbn1cclxuIiwiaW50ZXJmYWNlIENhcHR1cmVVUkwge1xyXG4gIHVybDogc3RyaW5nLFxyXG4gIHg6IG51bWJlcixcclxuICB5OiBudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENhcHR1cmluZyB7XHJcblxyXG4gIC8v44Kt44Oj44OX44OB44Oj5riI44G/IERhdGFVUkwg44Gu6ZuG5ZCIXHJcbiAgcHJpdmF0ZSBjYXB0dXJlVVJMczogQ2FwdHVyZVVSTFtdID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIHRhcmdldCDjgYwgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIOOBp+OBguOCi+OBi+WIpOWumuOBmeOCi1xyXG4gICAqIOWFt+S9k+eahOOBq+OBryBkcmF3SW1hZ2Ug44Oh44K944OD44OJ44GM5a2Y5Zyo44GZ44KL44GL5Yik5a6a44GZ44KLXHJcbiAgICogQHBhcmFtIHRhcmdldFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2lzQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9PiB7XHJcbiAgICByZXR1cm4gdGFyZ2V0LmRyYXdJbWFnZSAhPT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog54++5ZyoIGNhcHR1cmVVUkxzIOOBq+iqreOBv+i+vOOBvuOCjOOBpuOBhOOCi+ODh+ODvOOCv+OCkuOCq+ODs+ODkOOCueOBq+iqreOBv+i+vOOBv+OAgeWQiOaIkOOAgeODiOODquODn+ODs+OCsOOBmeOCi1xyXG4gICAqIOacgOe1gueahOOBq+WQkOOBjeWHuuOBleOCjOOCi+eUu+WDj+OBruWkp+OBjeOBleOBryB3aWR0aCAqIGhlaWdodCDjgajjgarjgotcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb21wb3NlID0gYXN5bmMgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcclxuICAgIC8v44Kr44Oz44OQ44K544Gu5L2c5oiQXHJcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuXHJcbiAgICAvL+OCq+ODs+ODkOOCueOBruWkp+OBjeOBleOCkuioreWumlxyXG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3aWR0aCsncHgnKTtcclxuICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGhlaWdodCsncHgnKTtcclxuXHJcbiAgICAvLzJEIOOCs+ODs+ODhuOCreOCueODiOOCkuWPluW+l1xyXG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG4gICAgLy9jdHgg44Gu44K/44Kk44OX44Ks44O844OJXHJcbiAgICBpZiAoICEgdGhpcy5faXNDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQoY3R4KSlcclxuICAgIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIC8v44Kr44Oz44OQ44K544Gr55S75YOP44KS6Kit572uXHJcbiAgICBhd2FpdCB0aGlzLmNhcHR1cmVVUkxzLnJlZHVjZSgocHJldiwgY3VycmVudCkgPT4gcHJldi50aGVuKCgpID0+IHtcclxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgY3VycmVudC54LCBjdXJyZW50LnkpO1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgaW1hZ2Uuc3JjID0gY3VycmVudC51cmw7XHJcbiAgICAgIH0pO1xyXG4gICAgfSksIFByb21pc2UucmVzb2x2ZSgpKTtcclxuXHJcbiAgICAvL2RhdGFVUkwg44KS55Sf5oiQXHJcbiAgICBjb25zdCBkYXRhID0gY2FudmFzLnRvRGF0YVVSTCgpO1xyXG5cclxuICAgIC8vY2FudmFzIOOCkua2iOOBmVxyXG4gICAgY2FudmFzLnJlbW92ZSgpO1xyXG5cclxuICAgIC8vZGF0YVVSTCDjgpLov5TjgZlcclxuICAgIHJldHVybiBkYXRhO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCreODo+ODl+ODgeODo+OCkuWPluW+l+OBl+OAgWNhcHR1cmVVUkxzIOOBqyBwdXNoIOOBmeOCi1xyXG4gICAqIEBwYXJhbSB4XHJcbiAgICogQHBhcmFtIHlcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjYXB0dXJlKHg6IG51bWJlciwgeTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgIGNocm9tZS50YWJzLmNhcHR1cmVWaXNpYmxlVGFiKCh1cmwpID0+IHtcclxuICAgICAgICB0aGlzLmNhcHR1cmVVUkxzLnB1c2goe3gsIHksIHVybH0pO1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNhcHR1cmVVUkxzIOOCkuepuuOBq+OBmeOCi1xyXG4gICAqL1xyXG4gIHB1YmxpYyBpbml0KCkge1xyXG4gICAgdGhpcy5jYXB0dXJlVVJMcyA9IFtdO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiLyoqXHJcbiAqIOODleOCoeOCpOODq+ODjeODvOODoOS9nOaIkOOCr+ODqeOCuVxyXG4gKi9cclxuaW1wb3J0IHtUZW1wbGF0ZXN9IGZyb20gXCIuL2ludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZpbGVuYW1lIHtcclxuXHJcbiAgLyoqXHJcbiAgICog572u44GN5o+b44GI5a6a576pXHJcbiAgICovXHJcbiAgcHJpdmF0ZSB0ZW1wbGF0ZXM6IFRlbXBsYXRlcztcclxuXHJcbiAgLyoqXHJcbiAgICog44OV44Kh44Kk44Or5ZCN44Gr5L2/55So44Gn44GN44Gq44GE5paH5a2X44KS5YWo44GmIHJlcGxhY2VtZW50IOOBq+e9ruaPm+OBl+OBpui/lOOBmVxyXG4gICAqIEBwYXJhbSBzdHJpbmdcclxuICAgKiBAcGFyYW0gcmVwbGFjZW1lbnRcclxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9yZXBsYWNlQmFkQ2hhcmFjdGVyKHN0cmluZzogc3RyaW5nLCByZXBsYWNlbWVudDogc3RyaW5nID0gJ18nKSB7XHJcbiAgICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZSgvW1xcXFxcXC86XFwqXFw/XCI8PlxcLVxcfFxcc10rL2csIHJlcGxhY2VtZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHRoaXMudGVtcGxhdGVzIOOBruWumue+qVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMudGVtcGxhdGVzID0gbmV3IEFycmF5KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjg4bjg7Pjg5fjg6zjg7zjg4jlpInmlbDmloflrZfliJfjgajjgZ3jga7lgKTjgpLoqK3lrprjgZnjgotcclxuICAgKiBAcGFyYW0gdGVtcGxhdGVcclxuICAgKiBAcGFyYW0gdmFsdWVcclxuICAgKi9cclxuICBwdWJsaWMgc2V0VGVtcGxhdGUodGVtcGxhdGU6IHN0cmluZywgdmFsdWU6IHN0cmluZykge1xyXG4gICAgdGhpcy50ZW1wbGF0ZXMucHVzaCh7XHJcbiAgICAgIHRlbXBsYXRlOiBTdHJpbmcodGVtcGxhdGUpLFxyXG4gICAgICB2YWx1ZTogU3RyaW5nKHZhbHVlKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzZXRUZW1wbGF0ZSgpLCBfcmVwbGFjZUJhZENoYXJhY3RlcigpIOOBp+WkieaPm+OBl+OBn+ODleOCoeOCpOODq+WQjeOCkuWHuuWKm1xyXG4gICAqIEBwYXJhbSBuYW1lXHJcbiAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRGaWxlTmFtZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgLy/jg4bjg7Pjg5fjg6zjg7zjg4jlpInmlbDmloflrZfliJfjgpLlgKTjgavnva7jgY3mj5vjgYjjgotcclxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSB0aGlzLnRlbXBsYXRlcy5sZW5ndGg7IGkgPCBtYXg7IGkgPSAoaSArIDEpIHwgMCkge1xyXG4gICAgICBuYW1lID0gU3RyaW5nKG5hbWUpLnJlcGxhY2UobmV3IFJlZ0V4cCh0aGlzLnRlbXBsYXRlc1tpXS50ZW1wbGF0ZSwgJ2cnKSwgdGhpcy50ZW1wbGF0ZXNbaV0udmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5L2/55So5LiN5Y+v44Gu5paH5a2X44KS5YWo44Gm572u44GN5o+b44GI44Gm6L+U5Y20XHJcbiAgICByZXR1cm4gdGhpcy5fcmVwbGFjZUJhZENoYXJhY3RlcihuYW1lKTtcclxuICB9XHJcblxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=