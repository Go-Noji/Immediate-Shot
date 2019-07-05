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
/* harmony import */ var _class_Capuring__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class/Capuring */ "./src/class/Capuring.ts");
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
    const capturing = new _class_Capuring__WEBPACK_IMPORTED_MODULE_0__["Capturing"]();
    //ダウンロードページと対応する画像ファイル
    const images = {};
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
            chrome.tabs.sendMessage(id, { type: 'sizing', range: range, index: index }, response => {
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
        console.log([width, height]);
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
        //dataURL 化
        return capturing.compose(size.width, size.height);
    });
    //キャプチャ実行
    const action = () => {
        //現在表示しているタブの情報を入手する
        init()
            .then(data => {
            getDataURL(data.settings, data.information, data.tab)
                .then((url) => {
                chrome.tabs.create({ url: 'download.html?title=' + data.tab.title + '&url=' + data.tab.url }, (tab) => {
                    //イメージをセット
                    images[Number(tab.id)] = url;
                });
                chrome.tabs.sendMessage(Number(data.tab.id), { type: 'back' });
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
                    sendResponse({ src: images[Number(sender.tab.id)] });
                    delete images[Number(sender.tab.id)];
                }
                else {
                    sendResponse({ src: '' });
                }
                break;
        }
    });
}


/***/ }),

/***/ "./src/class/Capuring.ts":
/*!*******************************!*\
  !*** ./src/class/Capuring.ts ***!
  \*******************************/
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
            //dataURL 化して返す
            return canvas.toDataURL();
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
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzL0NhcHVyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakYyQztBQVEzQztJQUNDLGVBQWU7SUFDZixNQUFNLFNBQVMsR0FBRyxJQUFJLHlEQUFTLEVBQUUsQ0FBQztJQUVsQyxzQkFBc0I7SUFDdEIsTUFBTSxNQUFNLEdBQTZCLEVBQUUsQ0FBQztJQUU1Qzs7T0FFRztJQUNILE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtRQUNqQjs7O1dBR0c7UUFDSCxNQUFNLFNBQVMsR0FBRyxDQUFDLEtBQWEsRUFBUyxFQUFFO1lBQzFDLFFBQVEsS0FBSyxFQUFFO2dCQUNkLEtBQUssTUFBTSxDQUFDO2dCQUNa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QUFDLENBQUM7b0JBQ0YsS0FBSyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUMxQixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBRXZCLGVBQWU7WUFDZixPQUFPLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM1QixDQUFDLEVBQUM7SUFpQkosQ0FBQztJQWZDOzs7OztPQUtHO0lBQ0ksT0FBTyxDQUFDLENBQVMsRUFBRSxDQUFTO1FBQ2pDLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUVGIiwiZmlsZSI6ImJhY2tncm91bmQuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYmFja2dyb3VuZC50c1wiKTtcbiIsImltcG9ydCB7SW5mb3JtYXRpb24sIFNldHRpbmdzLCBSYW5nZX0gZnJvbSBcInNyYy9jbGFzcy9pbnRlcmZhY2VcIjtcbmltcG9ydCB7Q2FwdHVyaW5nfSBmcm9tIFwiLi9jbGFzcy9DYXB1cmluZ1wiO1xuXG5pbnRlcmZhY2UgSW5pdERhdGEge1xuXHR0YWI6IGNocm9tZS50YWJzLlRhYixcblx0c2V0dGluZ3M6IFNldHRpbmdzLFxuXHRpbmZvcm1hdGlvbjogSW5mb3JtYXRpb25cbn1cblxue1xuXHQvL0NhcHR1cmluZyDjgq/jg6njgrlcblx0Y29uc3QgY2FwdHVyaW5nID0gbmV3IENhcHR1cmluZygpO1xuXG5cdC8v44OA44Km44Oz44Ot44O844OJ44Oa44O844K444Go5a++5b+c44GZ44KL55S75YOP44OV44Kh44Kk44OrXG5cdGNvbnN0IGltYWdlczoge1trZXk6IG51bWJlcl06IHN0cmluZ30gPSAge307XG5cblx0LyoqXG5cdCAqIOaLoeW8teapn+iDveOBruioreWumuOBqOePvuWcqOWPgueFp+S4reOBruOCv+ODluaDheWgseOCkui/lOOBmVxuXHQgKi9cblx0Y29uc3QgaW5pdCA9ICgpID0+IHtcblx0XHQvKipcblx0XHQgKiByYW5nZSDjgpIgUmFuZ2Ug5Z6L44Gr44Kt44Oj44K544OI44GZ44KLXG5cdFx0ICogQHBhcmFtIHJhbmdlXG5cdFx0ICovXG5cdFx0Y29uc3QgY2FzdFJhbmdlID0gKHJhbmdlOiBzdHJpbmcpOiBSYW5nZSA9PiB7XG5cdFx0XHRzd2l0Y2ggKHJhbmdlKSB7XG5cdFx0XHRcdGNhc2UgJ2Z1bGwnOlxuXHRcdFx0XHRjYXNlICdkaXNwbGF5Jzpcblx0XHRcdFx0Y2FzZSAncGVyZmVjdCc6XG5cdFx0XHRcdFx0cmV0dXJuIHJhbmdlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHJldHVybiAnZnVsbCc7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxJbml0RGF0YT4ocmVzb2x2ZSA9PiB7XG5cdFx0XHQvL+aLoeW8teapn+iDveOBruioreWumuOCkuWFpeaJi1xuXHRcdFx0bmV3IFByb21pc2U8Y2hyb21lLnRhYnMuVGFiPihpbm5lclJlc29sdmUgPT4ge1xuXHRcdFx0XHRjaHJvbWUudGFicy5xdWVyeSh7YWN0aXZlOiB0cnVlfSwgKHRhYnM6IGNocm9tZS50YWJzLlRhYltdKSA9PiB7XG5cdFx0XHRcdFx0aW5uZXJSZXNvbHZlKHRhYnNbMF0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKHRhYiA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlPHt0YWI6IGNocm9tZS50YWJzLlRhYiwgc2V0dGluZ3M6IFNldHRpbmdzfT4oaW5uZXJSZXNvbHZlID0+IHtcblx0XHRcdFx0XHRcdGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KHtyYW5nZTogJ2Z1bGwnLCB0aXRsZTogJ3t7dGl0bGV9fScsIGNvdW50ZXI6IDB9LCAoaXRlbXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9KSA9PiB7XG5cdFx0XHRcdFx0XHRcdGlubmVyUmVzb2x2ZSh7dGFiLCBzZXR0aW5nczoge3JhbmdlOiBjYXN0UmFuZ2UoaXRlbXMucmFuZ2UpLCB0aXRsZTogU3RyaW5nKGl0ZW1zLnRpdGxlKSwgY291bnRlcjogTnVtYmVyKGl0ZW1zLmNvdW50ZXIpfX0pO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKChkYXRhOiB7dGFiOiBjaHJvbWUudGFicy5UYWIsIHNldHRpbmdzOiBTZXR0aW5nc30pID0+IHtcblx0XHRcdFx0XHQvL+ePvuWQiOihqOekuuOBl+OBpuOBhOOCi+OCv+ODluOBruaDheWgseOCkuWFpeaJi1xuXHRcdFx0XHRcdGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKE51bWJlcihkYXRhLnRhYi5pZCksIHt0eXBlOiAnaW5mb3JtYXRpb24nfSwgKGluZm9ybWF0aW9uOiBJbmZvcm1hdGlvbikgPT4ge1xuXHRcdFx0XHRcdFx0cmVzb2x2ZSh7dGFiOiBkYXRhLnRhYiwgc2V0dGluZ3M6IGRhdGEuc2V0dGluZ3MsIGluZm9ybWF0aW9ufSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiDnj77lnKjooajnpLrjgZfjgabjgYTjgovjgr/jg5bjga7jgq3jg6Pjg5fjg4Hjg6PjgpLkuIDlm57ooYzjgYZcblx0ICogQHBhcmFtIGlkXG5cdCAqIEBwYXJhbSByYW5nZVxuXHQgKi9cblx0Y29uc3QgY3JlYXRlQ2FwdHVyZSA9IChpZDogbnVtYmVyLCByYW5nZTogUmFuZ2UsIGluZGV4OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+ID0+IHtcblx0XHRyZXR1cm4gIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuXHRcdFx0Y2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoaWQsIHt0eXBlOiAnc2l6aW5nJywgcmFuZ2U6IHJhbmdlLCBpbmRleDogaW5kZXh9LCByZXNwb25zZSA9PiB7XG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHRcdGNhcHR1cmluZy5jYXB0dXJlKHJlc3BvbnNlLngsIHJlc3BvbnNlLnkpXG5cdFx0XHRcdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9LCBpbmRleCA9PT0gMCA/IDEwMCA6IDIwKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBzZXR0aW5ncyDjgaggaW5mb3JtYXRpb24g44GL44KJ5rGC44KB44KJ44KM44Gm44GE44KL55S75YOP44K144Kk44K644KS5bCO44GN5Ye644GZXG5cdCAqIEBwYXJhbSBzZXR0aW5nc1xuXHQgKiBAcGFyYW0gaW5mb3JtYXRpb25cblx0ICovXG5cdGNvbnN0IGdldEltYWdlU2l6ZSA9IChzZXR0aW5nczogU2V0dGluZ3MsIGluZm9ybWF0aW9uOiBJbmZvcm1hdGlvbik6IHt3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcn0gPT4ge1xuXHRcdC8v5pyA57WC55qE44Gq55S75YOP44K144Kk44K644KS5rG65a6aKOOBk+OBruaZgueCueOBp+OBryByYW5nZSA9IGRpc3BsYXkg55SoKVxuXHRcdGxldCB3aWR0aCA9IGluZm9ybWF0aW9uLndpbmRvd1dpZHRoO1xuXHRcdGxldCBoZWlnaHQgPSBpbmZvcm1hdGlvbi53aW5kb3dIZWlnaHQ7XG5cblx0XHQvL3JhbmdlIOOBq+WQiOOCj+OBm+OBn+eUu+WDj+OCteOCpOOCuuOCkueUqOaEj1xuXHRcdHN3aXRjaCAoc2V0dGluZ3MucmFuZ2UpIHtcblx0XHRcdGNhc2UgJ2Z1bGwnOlxuXHRcdFx0XHR3aWR0aCA9IGluZm9ybWF0aW9uLnJhdGlvVHlwZSA9PT0gJ3dpZHRoJ1xuXHRcdFx0XHRcdD8gaW5mb3JtYXRpb24ud2luZG93V2lkdGhcblx0XHRcdFx0XHQ6IGluZm9ybWF0aW9uLndpbmRvd1dpZHRoICogaW5mb3JtYXRpb24ucmF0aW87XG5cdFx0XHRcdGhlaWdodCA9IGluZm9ybWF0aW9uLnJhdGlvVHlwZSA9PT0gJ2hlaWdodCdcblx0XHRcdFx0XHQ/IGluZm9ybWF0aW9uLndpbmRvd0hlaWdodFxuXHRcdFx0XHRcdDogaW5mb3JtYXRpb24ud2luZG93SGVpZ2h0ICogaW5mb3JtYXRpb24ucmF0aW87XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAncGVyZmVjdCc6XG5cdFx0XHRcdHdpZHRoID0gaW5mb3JtYXRpb24uZG9jdW1lbnRXaWR0aDtcblx0XHRcdFx0aGVpZ2h0ID0gaW5mb3JtYXRpb24uZG9jdW1lbnRIZWlnaHQ7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRjb25zb2xlLmxvZyhbd2lkdGgsIGhlaWdodF0pO1xuXG5cdFx0Ly/ov5TjgZlcblx0XHRyZXR1cm4gIHt3aWR0aCwgaGVpZ2h0fTtcblx0fTtcblxuXHQvKipcblx0ICog54++5Zyo6ZaL44GE44Gm44GE44KL44K/44OW44Gu44Kt44Oj44OX44OB44Oj44KS6KGM44GGXG5cdCAqIEBwYXJhbSBzZXR0aW5nc1xuXHQgKiBAcGFyYW0gaW5mb3JtYXRpb25cblx0ICogQHBhcmFtIHRhYlxuXHQgKi9cblx0Y29uc3QgZ2V0RGF0YVVSTCA9IGFzeW5jIChzZXR0aW5nczogU2V0dGluZ3MsIGluZm9ybWF0aW9uOiBJbmZvcm1hdGlvbiwgdGFiOiBjaHJvbWUudGFicy5UYWIpID0+IHtcblx0XHQvL+S9leaemuOBrueUu+WDj+OCkuOCreODo+ODl+ODgeODo+OBmeOCi+OBi1xuXHRcdGNvbnN0IGNhcHR1cmVOdW1iZXIgPSBzZXR0aW5ncy5yYW5nZSA9PT0gJ3BlcmZlY3QnXG5cdFx0XHQ/IGluZm9ybWF0aW9uLmNhcHR1cmVOdW1iZXJcblx0XHRcdDogMTtcblxuXHRcdC8v44K144Kk44K65Y+W5b6XXG5cdFx0Y29uc3Qgc2l6ZSA9IGdldEltYWdlU2l6ZShzZXR0aW5ncywgaW5mb3JtYXRpb24pO1xuXG5cdFx0Ly/jgq3jg6Pjg5fjg4Hjg6Plh6bnkIbjgpLlv4XopoHjgarlm57mlbDjgaDjgZHooYzjgYZcblx0XHRmb3IgKGxldCBpID0gMCwgbWF4ID0gY2FwdHVyZU51bWJlcjsgaSA8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XG5cdFx0XHRhd2FpdCBjcmVhdGVDYXB0dXJlKE51bWJlcih0YWIuaWQpLCBzZXR0aW5ncy5yYW5nZSwgaSk7XG5cdFx0fVxuXG5cdFx0Ly9kYXRhVVJMIOWMllxuXHRcdHJldHVybiBjYXB0dXJpbmcuY29tcG9zZShzaXplLndpZHRoLCBzaXplLmhlaWdodCk7XG5cdH07XG5cblx0Ly/jgq3jg6Pjg5fjg4Hjg6Plrp/ooYxcblx0Y29uc3QgYWN0aW9uID0gKCkgPT4ge1xuXHRcdC8v54++5Zyo6KGo56S644GX44Gm44GE44KL44K/44OW44Gu5oOF5aCx44KS5YWl5omL44GZ44KLXG5cdFx0aW5pdCgpXG5cdFx0XHQudGhlbihkYXRhID0+IHtcblx0XHRcdFx0Z2V0RGF0YVVSTChkYXRhLnNldHRpbmdzLCBkYXRhLmluZm9ybWF0aW9uLCBkYXRhLnRhYilcblx0XHRcdFx0XHQudGhlbigodXJsOiBzdHJpbmcpID0+IHtcblx0XHRcdFx0XHRcdGNocm9tZS50YWJzLmNyZWF0ZSh7dXJsOiAnZG93bmxvYWQuaHRtbD90aXRsZT0nK2RhdGEudGFiLnRpdGxlKycmdXJsPScrZGF0YS50YWIudXJsfSwgKHRhYjogY2hyb21lLnRhYnMuVGFiKSA9PiB7XG5cdFx0XHRcdFx0XHRcdC8v44Kk44Oh44O844K444KS44K744OD44OIXG5cdFx0XHRcdFx0XHRcdGltYWdlc1tOdW1iZXIodGFiLmlkKV0gPSB1cmw7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKE51bWJlcihkYXRhLnRhYi5pZCksIHt0eXBlOiAnYmFjayd9KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goKGRhdGEpID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XG5cdFx0XHRcdGFsZXJ0KCdTb3JyeSwgVHJ5IGFnYWluIGFmdGVyIHJlbG9hZC4nKTtcblx0XHRcdH0pO1xuXHR9O1xuXG5cdC8v44Ki44Kk44Kz44Oz44Kv44Oq44OD44KvXG5cdGNocm9tZS5icm93c2VyQWN0aW9uLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcihhY3Rpb24pO1xuXG5cdC8v44Oh44OD44K744O844K45Y+X5L+hXG5cdGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcblx0XHRzd2l0Y2ggKHJlcXVlc3QudHlwZSkge1xuXHRcdFx0Y2FzZSAnb3Blbic6XG5cdFx0XHRcdGlmIChzZW5kZXIudGFiICE9PSB1bmRlZmluZWQgJiYgaW1hZ2VzW051bWJlcihzZW5kZXIudGFiLmlkKV0gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHNlbmRSZXNwb25zZSh7c3JjOiBpbWFnZXNbTnVtYmVyKHNlbmRlci50YWIuaWQpXX0pO1xuXHRcdFx0XHRcdGRlbGV0ZSBpbWFnZXNbTnVtYmVyKHNlbmRlci50YWIuaWQpXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRzZW5kUmVzcG9uc2Uoe3NyYzogJyd9KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH0pO1xufVxuIiwiXG5leHBvcnQgY2xhc3MgQ2FwdHVyaW5nIHtcblxuICAvL+OCreODo+ODl+ODgeODo+a4iOOBvyBEYXRhVVJMIOOBrumbhuWQiFxuICBwcml2YXRlIGNhcHR1cmVVUkxzOiB7dXJsOiBzdHJpbmcsIHg6IG51bWJlciwgeTogbnVtYmVyfVtdID0gW107XG5cbiAgLyoqXG4gICAqIHRhcmdldCDjgYwgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIOOBp+OBguOCi+OBi+WIpOWumuOBmeOCi1xuICAgKiDlhbfkvZPnmoTjgavjga8gZHJhd0ltYWdlIOODoeOCveODg+ODieOBjOWtmOWcqOOBmeOCi+OBi+WIpOWumuOBmeOCi1xuICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAqL1xuICBwcml2YXRlIF9pc0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9ICh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPT4ge1xuICAgIHJldHVybiB0YXJnZXQuZHJhd0ltYWdlICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICog54++5ZyoIGNhcHR1cmVVUkxzIOOBq+iqreOBv+i+vOOBvuOCjOOBpuOBhOOCi+ODh+ODvOOCv+OCkuOCq+ODs+ODkOOCueOBq+iqreOBv+i+vOOBv+OAgeWQiOaIkOOAgeODiOODquODn+ODs+OCsOOBmeOCi1xuICAgKiDmnIDntYLnmoTjgavlkJDjgY3lh7rjgZXjgozjgovnlLvlg4/jga7lpKfjgY3jgZXjga8gd2lkdGggKiBoZWlnaHQg44Go44Gq44KLXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwdWJsaWMgY29tcG9zZSA9IGFzeW5jICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgLy/jgqvjg7Pjg5Djgrnjga7kvZzmiJBcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuICAgIC8v44Kr44Oz44OQ44K544Gu5aSn44GN44GV44KS6Kit5a6aXG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3aWR0aCsncHgnKTtcbiAgICBjYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBoZWlnaHQrJ3B4Jyk7XG5cbiAgICAvLzJEIOOCs+ODs+ODhuOCreOCueODiOOCkuWPluW+l1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgLy9jdHgg44Gu44K/44Kk44OX44Ks44O844OJXG4gICAgaWYgKCAhIHRoaXMuX2lzQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKGN0eCkpXG4gICAge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIC8v44Kr44Oz44OQ44K544Gr55S75YOP44KS6Kit572uXG4gICAgYXdhaXQgdGhpcy5jYXB0dXJlVVJMcy5yZWR1Y2UoKHByZXYsIGN1cnJlbnQpID0+IHByZXYudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCBjdXJyZW50LngsIGN1cnJlbnQueSk7XG4gICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9O1xuICAgICAgICBpbWFnZS5zcmMgPSBjdXJyZW50LnVybDtcbiAgICAgIH0pO1xuICAgIH0pLCBQcm9taXNlLnJlc29sdmUoKSk7XG5cbiAgICAvL2RhdGFVUkwg5YyW44GX44Gm6L+U44GZXG4gICAgcmV0dXJuIGNhbnZhcy50b0RhdGFVUkwoKTtcbiAgfTtcblxuICAvKipcbiAgICog44Kt44Oj44OX44OB44Oj44KS5Y+W5b6X44GX44CBY2FwdHVyZVVSTHMg44GrIHB1c2gg44GZ44KLXG4gICAqIEBwYXJhbSB4XG4gICAqIEBwYXJhbSB5XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwdWJsaWMgY2FwdHVyZSh4OiBudW1iZXIsIHk6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNocm9tZS50YWJzLmNhcHR1cmVWaXNpYmxlVGFiKCh1cmwpID0+IHtcbiAgICAgICAgdGhpcy5jYXB0dXJlVVJMcy5wdXNoKHt4LCB5LCB1cmx9KTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==