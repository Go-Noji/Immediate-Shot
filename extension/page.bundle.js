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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/page.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/class/Sizing.ts":
/*!*****************************!*\
  !*** ./src/class/Sizing.ts ***!
  \*****************************/
/*! exports provided: Sizing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sizing", function() { return Sizing; });
class Sizing {
    /**
     * このクラスが仕込んだ style タグを削除する
     * @private
     */
    _removeStyle() {
        //削除対象の取得
        const target = document.getElementById(this.STYLE_ID);
        //target が存在しなかったら何もしない
        if (target === null) {
            return;
        }
        //対象を削除する
        target.remove();
    }
    /**
     * style タグを挿入する
     * 既にこのクラスが扱っている style が存在した場合はリセットする
     * @param style
     * @private
     */
    _appendStyle(style) {
        //リセット
        this._removeStyle();
        //style タグを用意
        const tag = document.createElement('style');
        tag.setAttribute('id', this.STYLE_ID);
        tag.innerText = style;
        //tag タグ挿入
        document.head.appendChild(tag);
    }
    /**
     * 指定された index からスクロールすべき座標を返す
     * @param index
     * @private
     */
    _getScrollCoordinates(index) {
        return {
            x: Math.floor(index % this.widthCaptureNumber) % this.captureNumber * this.windowWidth,
            y: Math.floor(index / this.widthCaptureNumber) % this.captureNumber * this.windowHeight
        };
    }
    /**
     * 各サイズ情報を取得・計算・保持する
     * 加えて必用な定数も保管する
     */
    constructor() {
        //ウィンドウサイズ
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        //ドキュメントサイズ
        this.documentWidth = document.body.getBoundingClientRect().width;
        this.documentHeight = document.body.getBoundingClientRect().height;
        //幅と高さそれぞれの割合
        const widthRatio = this.windowWidth / this.documentWidth;
        const heightRatio = this.windowHeight / this.documentHeight;
        //ratio と ratioType のセット
        this.ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
        this.ratioType = widthRatio > heightRatio ? 'height' : 'width';
        //ratio が 1 以上だったら 1 とする
        this.ratio = this.ratio > 1 ? 1 : this.ratio;
        //縦と横においてそれぞれ現在のウィンドウサイズ何枚分で全画面を捕捉できるかの数値を算出
        this.widthCaptureNumber = Math.ceil(this.documentWidth / this.windowWidth);
        this.heightCaptureNumber = Math.ceil(this.documentHeight / this.windowHeight);
        //上記二つの乗算値
        this.captureNumber = this.widthCaptureNumber * this.heightCaptureNumber;
        //現在のスクロール座標を記録
        this.scrollX = window.scrollX;
        this.scrollY = window.scrollY;
        //style タグに使用する id
        this.STYLE_ID = 'sizing_' + Math.random().toString(36).slice(-8);
    }
    /**
     * 情報を返す
     * @return {{documentWidth: number | *, documentHeight: number | *, windowHeight: number | *, ratioType: string, windowWidth: number | *, ratio: (*|number)}}
     */
    getInformation() {
        return {
            windowWidth: this.windowWidth,
            windowHeight: this.windowHeight,
            documentWidth: this.documentWidth,
            documentHeight: this.documentHeight,
            widthCaptureNumber: this.widthCaptureNumber,
            heightCaptureNumber: this.heightCaptureNumber,
            captureNumber: this.captureNumber,
            ratio: this.ratio,
            ratioType: this.ratioType
        };
    }
    /**
     * フルサイズ用のサイジング処理を行う
     */
    fullSizing() {
        //style タグを生成
        this._appendStyle('body{overflow:hidden;transform-origin: left top;transform: scale(' + this.ratio + ')}');
        //スクロール位置を 0 にする
        window.scrollTo(0, 0);
        //0, 0 を返す
        return {
            x: 0,
            y: 0
        };
    }
    /**
     * スクロールバーを消すだけのサイジング処理を行う
     * スクロール位置は index 番号で指定する
     * この index 番号は getInformation() で取得できる captureNumber の範囲で指定し、
     * 例えば
     * widthCaptureNumber = 4
     * heightCaptureNumber = 3
     * captureNumber = 12
     * だった場合は
     * +----+----+----+----+
     * |  0  |  1  |  2  |  3  |
     * +----+----+----+----+
     * |  4  |  5  |  6  |  7  |
     * +----+----+----+----+
     * |  8  |  9  | 10 | 11 |
     * +----+----+----+----+
     * といった各マスの左上座標へスクロールすることになる
     * 各マスの width, height = windowWidth, windowHeight
     * 大枠の width, height = documentWidth, documentHeight
     */
    displaySizing(index = null) {
        //style タグを生成
        this._appendStyle('body,html{overflow:hidden}');
        //移動先座標の定義
        let coordinates = {
            x: 0,
            y: 0
        };
        //スクロール指定があればその座標で coordinates を上書き
        if (index !== null) {
            coordinates = this._getScrollCoordinates(index);
        }
        //スクロールの実行
        window.scrollTo(coordinates.x, coordinates.y);
        //スクロール情報を返す
        return coordinates;
    }
    /**
     * サイジングのリセット
     * スクロール位置もリセットする
     */
    resetSizing() {
        //style のリセット
        this._removeStyle();
        //スクロール位置のリセット
        window.scrollTo(this.scrollX, this.scrollY);
        //スクロール位置を返す
        return {
            x: this.scrollX,
            y: this.scrollY
        };
    }
}


/***/ }),

/***/ "./src/page.ts":
/*!*********************!*\
  !*** ./src/page.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _class_Sizing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class/Sizing */ "./src/class/Sizing.ts");

window.addEventListener('load', () => {
    console.log('Immediate Shot Start');
    //サイズを取得するためのクラス
    const sizing = new _class_Sizing__WEBPACK_IMPORTED_MODULE_0__["Sizing"]();
    //表示されているタブの情報を返す
    const information = () => {
        return sizing.getInformation();
    };
    //ブラウザの大きさを適切なものに変える
    const styling = (range, index) => {
        //処理終了後の座標情報
        let coordinate = {
            x: 0,
            y: 0
        };
        //range によって処理を分ける
        switch (range) {
            case 'full':
                coordinate = sizing.fullSizing();
                break;
            case 'perfect':
                coordinate = sizing.displaySizing(index);
                break;
            default:
                coordinate = sizing.displaySizing(null);
                break;
        }
        //座標情報を返す
        return coordinate;
    };
    //ブラウザの大きさを元に戻す
    const back = () => {
        sizing.resetSizing();
    };
    //メッセージパッシング
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        // 受け取った値で分岐
        switch (request.type) {
            case 'information':
                sendResponse(information());
                break;
            case 'sizing':
                sendResponse(styling(request.range, request.index));
                break;
            case 'back':
                back();
                sendResponse({});
                break;
            default:
                sendResponse({});
                break;
        }
    });
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzL1NpemluZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEZBO0FBQUE7QUFBTyxNQUFNLE1BQU07SUFzQ2pCOzs7T0FHRztJQUNLLFlBQVk7UUFDbEIsU0FBUztRQUNULE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXRELHVCQUF1QjtRQUN2QixJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDbkIsT0FBTztTQUNSO1FBRUQsU0FBUztRQUNULE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyxZQUFZLENBQUMsS0FB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QUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU07WUFDUjtnQkFDRSxVQUFVLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDeEMsTUFBTTtTQUNUO1FBRUQsU0FBUztRQUNULE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUMsQ0FBQztJQUVGLGVBQWU7SUFDZixNQUFNLElBQUksR0FBRyxHQUFHLEVBQUU7UUFDaEIsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQztJQUVGLFlBQVk7SUFDWixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFO1FBQ3JFLFlBQVk7UUFDWixRQUFRLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDcEIsS0FBSyxhQUFhO2dCQUNoQixZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztnQkFDNUIsTUFBTTtZQUNSLEtBQUssUUFBUTtnQkFDWCxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELE1BQU07WUFDUixLQUFLLE1BQU07Z0JBQ1QsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQixNQUFNO1lBQ1I7Z0JBQ0UsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQixNQUFNO1NBQ1Q7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InBhZ2UuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvcGFnZS50c1wiKTtcbiIsImltcG9ydCB7Q29vcmRpbmF0ZXMsIEluZm9ybWF0aW9ufSBmcm9tIFwic3JjL2NsYXNzL2ludGVyZmFjZVwiO1xuXG5leHBvcnQgY2xhc3MgU2l6aW5nIHtcblxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544GuIHdpbmRvdyB3aWR0aFxuICByZWFkb25seSB3aW5kb3dXaWR0aDogbnVtYmVyO1xuXG4gIC8vY29uc3RydWN0b3IoKSDmmYLngrnjga4gd2luZG93IGhlaWdodFxuICByZWFkb25seSB3aW5kb3dIZWlnaHQ6IG51bWJlcjtcblxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544GuIGRvY3VtZW50IHdpZHRoXG4gIHJlYWRvbmx5IGRvY3VtZW50V2lkdGg6IG51bWJlcjtcblxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544GuIGRvY3VtZW50IGhlaWdodFxuICByZWFkb25seSBkb2N1bWVudEhlaWdodDogbnVtYmVyO1xuXG4gIC8v55S76Z2i57iu5bCP5q+U546HXG4gIHJlYWRvbmx5IHJhdGlvOiBudW1iZXI7XG5cbiAgLy/nlLvpnaLjgpLluYXjgajpq5jjgZXjga7jganjgaHjgonjgafnuK7lsI/jgZfjgZ/jgYtcbiAgcmVhZG9ubHkgcmF0aW9UeXBlOiAnd2lkdGgnIHwgJ2hlaWdodCc7XG5cbiAgLy9kb2N1bWVudFdpZHRoIOOCkuePvuWcqOOBriB3aW5kb3dXaWR0aCDjga7lpKfjgY3jgZXjgafjgq3jg6Pjg5fjg4Hjg6PjgZnjgovjgavjga/mqKrjgavkvZXmnprjgq3jg6Pjg5fjg4Hjg6PjgYzlv4XopoHjgYtcbiAgcmVhZG9ubHkgd2lkdGhDYXB0dXJlTnVtYmVyOiBudW1iZXI7XG5cbiAgLy9kb2N1bWVudEhlaWdodCDjgpLnj77lnKjjga4gd2luZG93SGVpZ2h0IOOBruWkp+OBjeOBleOBp+OCreODo+ODl+ODgeODo+OBmeOCi+OBq+OBr+e4puOBq+S9leaemuOCreODo+ODl+ODgeODo+OBjOW/heimgeOBi1xuICByZWFkb25seSBoZWlnaHRDYXB0dXJlTnVtYmVyOiBudW1iZXI7XG5cbiAgLy/kuIroqJjkuozjgaTjga7kuZfnrpflgKRcbiAgcmVhZG9ubHkgY2FwdHVyZU51bWJlcjogbnVtYmVyO1xuXG4gIC8vY29uc3RydWN0b3IoKSDmmYLngrnjga7jgrnjgq/jg63jg7zjg6vkvY3nva4o5qiqKVxuICByZWFkb25seSBzY3JvbGxYOiBudW1iZXI7XG5cbiAgLy9jb25zdHJ1Y3RvcigpIOaZgueCueOBruOCueOCr+ODreODvOODq+S9jee9rijnuKYpXG4gIHJlYWRvbmx5IHNjcm9sbFk6IG51bWJlcjtcblxuICAvL+OBk+OBruOCr+ODqeOCueOBjOaJseOBhiA8c3R5bGU+IOOCv+OCsOOBriBpZCDlsZ7mgKflgKRcbiAgcmVhZG9ubHkgU1RZTEVfSUQ6IHN0cmluZztcblxuICAvKipcbiAgICog44GT44Gu44Kv44Op44K544GM5LuV6L6844KT44GgIHN0eWxlIOOCv+OCsOOCkuWJiumZpOOBmeOCi1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmVtb3ZlU3R5bGUoKSB7XG4gICAgLy/liYrpmaTlr77osaHjga7lj5blvpdcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLlNUWUxFX0lEKTtcblxuICAgIC8vdGFyZ2V0IOOBjOWtmOWcqOOBl+OBquOBi+OBo+OBn+OCieS9leOCguOBl+OBquOBhFxuICAgIGlmICh0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvL+WvvuixoeOCkuWJiumZpOOBmeOCi1xuICAgIHRhcmdldC5yZW1vdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdHlsZSDjgr/jgrDjgpLmjL/lhaXjgZnjgotcbiAgICog5pei44Gr44GT44Gu44Kv44Op44K544GM5omx44Gj44Gm44GE44KLIHN0eWxlIOOBjOWtmOWcqOOBl+OBn+WgtOWQiOOBr+ODquOCu+ODg+ODiOOBmeOCi1xuICAgKiBAcGFyYW0gc3R5bGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX2FwcGVuZFN0eWxlKHN0eWxlOiBzdHJpbmcpIHtcbiAgICAvL+ODquOCu+ODg+ODiFxuICAgIHRoaXMuX3JlbW92ZVN0eWxlKCk7XG5cbiAgICAvL3N0eWxlIOOCv+OCsOOCkueUqOaEj1xuICAgIGNvbnN0IHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgdGFnLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLlNUWUxFX0lEKTtcbiAgICB0YWcuaW5uZXJUZXh0ID0gc3R5bGU7XG5cbiAgICAvL3RhZyDjgr/jgrDmjL/lhaVcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHRhZyk7XG4gIH1cblxuICAvKipcbiAgICog5oyH5a6a44GV44KM44GfIGluZGV4IOOBi+OCieOCueOCr+ODreODvOODq+OBmeOBueOBjeW6p+aomeOCkui/lOOBmVxuICAgKiBAcGFyYW0gaW5kZXhcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX2dldFNjcm9sbENvb3JkaW5hdGVzKGluZGV4OiBudW1iZXIpOiBDb29yZGluYXRlcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IE1hdGguZmxvb3IoaW5kZXggJSB0aGlzLndpZHRoQ2FwdHVyZU51bWJlcikgJSB0aGlzLmNhcHR1cmVOdW1iZXIgKiB0aGlzLndpbmRvd1dpZHRoLFxuICAgICAgeTogTWF0aC5mbG9vcihpbmRleCAvIHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyKSAlIHRoaXMuY2FwdHVyZU51bWJlciAqIHRoaXMud2luZG93SGVpZ2h0XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiDlkITjgrXjgqTjgrrmg4XloLHjgpLlj5blvpfjg7voqIjnrpfjg7vkv53mjIHjgZnjgotcbiAgICog5Yqg44GI44Gm5b+F55So44Gq5a6a5pWw44KC5L+d566h44GZ44KLXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgLy/jgqbjgqPjg7Pjg4njgqbjgrXjgqTjgrpcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgdGhpcy53aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAvL+ODieOCreODpeODoeODs+ODiOOCteOCpOOCulxuICAgIHRoaXMuZG9jdW1lbnRXaWR0aCA9IGRvY3VtZW50LmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgdGhpcy5kb2N1bWVudEhlaWdodCA9IGRvY3VtZW50LmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuXG4gICAgLy/luYXjgajpq5jjgZXjgZ3jgozjgZ7jgozjga7libLlkIhcbiAgICBjb25zdCB3aWR0aFJhdGlvID0gdGhpcy53aW5kb3dXaWR0aCAvIHRoaXMuZG9jdW1lbnRXaWR0aDtcbiAgICBjb25zdCBoZWlnaHRSYXRpbyA9IHRoaXMud2luZG93SGVpZ2h0IC8gdGhpcy5kb2N1bWVudEhlaWdodDtcblxuICAgIC8vcmF0aW8g44GoIHJhdGlvVHlwZSDjga7jgrvjg4Pjg4hcbiAgICB0aGlzLnJhdGlvID0gd2lkdGhSYXRpbyA+IGhlaWdodFJhdGlvID8gaGVpZ2h0UmF0aW8gOiB3aWR0aFJhdGlvO1xuICAgIHRoaXMucmF0aW9UeXBlID0gd2lkdGhSYXRpbyA+IGhlaWdodFJhdGlvID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuXG4gICAgLy9yYXRpbyDjgYwgMSDku6XkuIrjgaDjgaPjgZ/jgokgMSDjgajjgZnjgotcbiAgICB0aGlzLnJhdGlvID0gdGhpcy5yYXRpbyA+IDEgPyAxIDogdGhpcy5yYXRpbztcblxuICAgIC8v57im44Go5qiq44Gr44GK44GE44Gm44Gd44KM44Ge44KM54++5Zyo44Gu44Km44Kj44Oz44OJ44Km44K144Kk44K65L2V5p6a5YiG44Gn5YWo55S76Z2i44KS5o2V5o2J44Gn44GN44KL44GL44Gu5pWw5YCk44KS566X5Ye6XG4gICAgdGhpcy53aWR0aENhcHR1cmVOdW1iZXIgPSBNYXRoLmNlaWwodGhpcy5kb2N1bWVudFdpZHRoIC8gdGhpcy53aW5kb3dXaWR0aCk7XG4gICAgdGhpcy5oZWlnaHRDYXB0dXJlTnVtYmVyID0gTWF0aC5jZWlsKHRoaXMuZG9jdW1lbnRIZWlnaHQgLyB0aGlzLndpbmRvd0hlaWdodCk7XG5cbiAgICAvL+S4iuiomOS6jOOBpOOBruS5l+eul+WApFxuICAgIHRoaXMuY2FwdHVyZU51bWJlciA9IHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyICogdGhpcy5oZWlnaHRDYXB0dXJlTnVtYmVyO1xuXG4gICAgLy/nj77lnKjjga7jgrnjgq/jg63jg7zjg6vluqfmqJnjgpLoqJjpjLJcbiAgICB0aGlzLnNjcm9sbFggPSB3aW5kb3cuc2Nyb2xsWDtcbiAgICB0aGlzLnNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWTtcblxuICAgIC8vc3R5bGUg44K/44Kw44Gr5L2/55So44GZ44KLIGlkXG4gICAgdGhpcy5TVFlMRV9JRCA9ICdzaXppbmdfJytNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgtOCk7XG4gIH1cblxuICAvKipcbiAgICog5oOF5aCx44KS6L+U44GZXG4gICAqIEByZXR1cm4ge3tkb2N1bWVudFdpZHRoOiBudW1iZXIgfCAqLCBkb2N1bWVudEhlaWdodDogbnVtYmVyIHwgKiwgd2luZG93SGVpZ2h0OiBudW1iZXIgfCAqLCByYXRpb1R5cGU6IHN0cmluZywgd2luZG93V2lkdGg6IG51bWJlciB8ICosIHJhdGlvOiAoKnxudW1iZXIpfX1cbiAgICovXG4gIHB1YmxpYyBnZXRJbmZvcm1hdGlvbigpOiBJbmZvcm1hdGlvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpbmRvd1dpZHRoOiB0aGlzLndpbmRvd1dpZHRoLFxuICAgICAgd2luZG93SGVpZ2h0OiB0aGlzLndpbmRvd0hlaWdodCxcbiAgICAgIGRvY3VtZW50V2lkdGg6IHRoaXMuZG9jdW1lbnRXaWR0aCxcbiAgICAgIGRvY3VtZW50SGVpZ2h0OiB0aGlzLmRvY3VtZW50SGVpZ2h0LFxuICAgICAgd2lkdGhDYXB0dXJlTnVtYmVyOiB0aGlzLndpZHRoQ2FwdHVyZU51bWJlcixcbiAgICAgIGhlaWdodENhcHR1cmVOdW1iZXI6IHRoaXMuaGVpZ2h0Q2FwdHVyZU51bWJlcixcbiAgICAgIGNhcHR1cmVOdW1iZXI6IHRoaXMuY2FwdHVyZU51bWJlcixcbiAgICAgIHJhdGlvOiB0aGlzLnJhdGlvLFxuICAgICAgcmF0aW9UeXBlOiB0aGlzLnJhdGlvVHlwZVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiDjg5Xjg6vjgrXjgqTjgrrnlKjjga7jgrXjgqTjgrjjg7PjgrDlh6bnkIbjgpLooYzjgYZcbiAgICovXG4gIHB1YmxpYyBmdWxsU2l6aW5nKCk6IENvb3JkaW5hdGVzIHtcbiAgICAvL3N0eWxlIOOCv+OCsOOCkueUn+aIkFxuICAgIHRoaXMuX2FwcGVuZFN0eWxlKCdib2R5e292ZXJmbG93OmhpZGRlbjt0cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0IHRvcDt0cmFuc2Zvcm06IHNjYWxlKCcrdGhpcy5yYXRpbysnKX0nKTtcblxuICAgIC8v44K544Kv44Ot44O844Or5L2N572u44KSIDAg44Gr44GZ44KLXG4gICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuXG4gICAgLy8wLCAwIOOCkui/lOOBmVxuICAgIHJldHVybiB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICog44K544Kv44Ot44O844Or44OQ44O844KS5raI44GZ44Gg44GR44Gu44K144Kk44K444Oz44Kw5Yem55CG44KS6KGM44GGXG4gICAqIOOCueOCr+ODreODvOODq+S9jee9ruOBryBpbmRleCDnlarlj7fjgafmjIflrprjgZnjgotcbiAgICog44GT44GuIGluZGV4IOeVquWPt+OBryBnZXRJbmZvcm1hdGlvbigpIOOBp+WPluW+l+OBp+OBjeOCiyBjYXB0dXJlTnVtYmVyIOOBruevhOWbsuOBp+aMh+WumuOBl+OAgVxuICAgKiDkvovjgYjjgbBcbiAgICogd2lkdGhDYXB0dXJlTnVtYmVyID0gNFxuICAgKiBoZWlnaHRDYXB0dXJlTnVtYmVyID0gM1xuICAgKiBjYXB0dXJlTnVtYmVyID0gMTJcbiAgICog44Gg44Gj44Gf5aC05ZCI44GvXG4gICAqICstLS0tKy0tLS0rLS0tLSstLS0tK1xuICAgKiB8ICAwICB8ICAxICB8ICAyICB8ICAzICB8XG4gICAqICstLS0tKy0tLS0rLS0tLSstLS0tK1xuICAgKiB8ICA0ICB8ICA1ICB8ICA2ICB8ICA3ICB8XG4gICAqICstLS0tKy0tLS0rLS0tLSstLS0tK1xuICAgKiB8ICA4ICB8ICA5ICB8IDEwIHwgMTEgfFxuICAgKiArLS0tLSstLS0tKy0tLS0rLS0tLStcbiAgICog44Go44GE44Gj44Gf5ZCE44Oe44K544Gu5bem5LiK5bqn5qiZ44G444K544Kv44Ot44O844Or44GZ44KL44GT44Go44Gr44Gq44KLXG4gICAqIOWQhOODnuOCueOBriB3aWR0aCwgaGVpZ2h0ID0gd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodFxuICAgKiDlpKfmnqDjga4gd2lkdGgsIGhlaWdodCA9IGRvY3VtZW50V2lkdGgsIGRvY3VtZW50SGVpZ2h0XG4gICAqL1xuICBwdWJsaWMgZGlzcGxheVNpemluZyhpbmRleDogbnVtYmVyfG51bGwgPSBudWxsKTogQ29vcmRpbmF0ZXMge1xuICAgIC8vc3R5bGUg44K/44Kw44KS55Sf5oiQXG4gICAgdGhpcy5fYXBwZW5kU3R5bGUoJ2JvZHksaHRtbHtvdmVyZmxvdzpoaWRkZW59Jyk7XG5cbiAgICAvL+enu+WLleWFiOW6p+aomeOBruWumue+qVxuICAgIGxldCBjb29yZGluYXRlczogQ29vcmRpbmF0ZXMgPSB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH07XG5cbiAgICAvL+OCueOCr+ODreODvOODq+aMh+WumuOBjOOBguOCjOOBsOOBneOBruW6p+aomeOBpyBjb29yZGluYXRlcyDjgpLkuIrmm7jjgY1cbiAgICBpZiAoaW5kZXggIT09IG51bGwpIHtcbiAgICAgIGNvb3JkaW5hdGVzID0gdGhpcy5fZ2V0U2Nyb2xsQ29vcmRpbmF0ZXMoaW5kZXgpO1xuICAgIH1cblxuICAgIC8v44K544Kv44Ot44O844Or44Gu5a6f6KGMXG4gICAgd2luZG93LnNjcm9sbFRvKGNvb3JkaW5hdGVzLngsIGNvb3JkaW5hdGVzLnkpO1xuXG4gICAgLy/jgrnjgq/jg63jg7zjg6vmg4XloLHjgpLov5TjgZlcbiAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gIH1cblxuICAvKipcbiAgICog44K144Kk44K444Oz44Kw44Gu44Oq44K744OD44OIXG4gICAqIOOCueOCr+ODreODvOODq+S9jee9ruOCguODquOCu+ODg+ODiOOBmeOCi1xuICAgKi9cbiAgcHVibGljIHJlc2V0U2l6aW5nKCk6IENvb3JkaW5hdGVzIHtcbiAgICAvL3N0eWxlIOOBruODquOCu+ODg+ODiFxuICAgIHRoaXMuX3JlbW92ZVN0eWxlKCk7XG5cbiAgICAvL+OCueOCr+ODreODvOODq+S9jee9ruOBruODquOCu+ODg+ODiFxuICAgIHdpbmRvdy5zY3JvbGxUbyh0aGlzLnNjcm9sbFgsIHRoaXMuc2Nyb2xsWSk7XG5cbiAgICAvL+OCueOCr+ODreODvOODq+S9jee9ruOCkui/lOOBmVxuICAgIHJldHVybiB7XG4gICAgICB4OiB0aGlzLnNjcm9sbFgsXG4gICAgICB5OiB0aGlzLnNjcm9sbFlcbiAgICB9O1xuICB9XG5cbn1cbiIsImltcG9ydCB7UmFuZ2UsIENvb3JkaW5hdGVzfSBmcm9tIFwiLi9jbGFzcy9pbnRlcmZhY2VcIjtcbmltcG9ydCB7U2l6aW5nfSBmcm9tIFwiLi9jbGFzcy9TaXppbmdcIjtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG5cbiAgY29uc29sZS5sb2coJ0ltbWVkaWF0ZSBTaG90IFN0YXJ0Jyk7XG5cbiAgLy/jgrXjgqTjgrrjgpLlj5blvpfjgZnjgovjgZ/jgoHjga7jgq/jg6njgrlcbiAgY29uc3Qgc2l6aW5nID0gbmV3IFNpemluZygpO1xuXG4gIC8v6KGo56S644GV44KM44Gm44GE44KL44K/44OW44Gu5oOF5aCx44KS6L+U44GZXG4gIGNvbnN0IGluZm9ybWF0aW9uID0gKCkgPT4ge1xuICAgIHJldHVybiBzaXppbmcuZ2V0SW5mb3JtYXRpb24oKTtcbiAgfTtcblxuICAvL+ODluODqeOCpuOCtuOBruWkp+OBjeOBleOCkumBqeWIh+OBquOCguOBruOBq+WkieOBiOOCi1xuICBjb25zdCBzdHlsaW5nID0gKHJhbmdlOiBSYW5nZSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgIC8v5Yem55CG57WC5LqG5b6M44Gu5bqn5qiZ5oOF5aCxXG4gICAgbGV0IGNvb3JkaW5hdGU6IENvb3JkaW5hdGVzID0ge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9O1xuXG4gICAgLy9yYW5nZSDjgavjgojjgaPjgablh6bnkIbjgpLliIbjgZHjgotcbiAgICBzd2l0Y2ggKHJhbmdlKSB7XG4gICAgICBjYXNlICdmdWxsJzpcbiAgICAgICAgY29vcmRpbmF0ZSA9IHNpemluZy5mdWxsU2l6aW5nKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncGVyZmVjdCc6XG4gICAgICAgIGNvb3JkaW5hdGUgPSBzaXppbmcuZGlzcGxheVNpemluZyhpbmRleCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29vcmRpbmF0ZSA9IHNpemluZy5kaXNwbGF5U2l6aW5nKG51bGwpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvL+W6p+aomeaDheWgseOCkui/lOOBmVxuICAgIHJldHVybiBjb29yZGluYXRlO1xuICB9O1xuXG4gIC8v44OW44Op44Km44K244Gu5aSn44GN44GV44KS5YWD44Gr5oi744GZXG4gIGNvbnN0IGJhY2sgPSAoKSA9PiB7XG4gICAgc2l6aW5nLnJlc2V0U2l6aW5nKCk7XG4gIH07XG5cbiAgLy/jg6Hjg4Pjgrvjg7zjgrjjg5Hjg4Pjgrfjg7PjgrBcbiAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xuICAgIC8vIOWPl+OBkeWPluOBo+OBn+WApOOBp+WIhuWykFxuICAgIHN3aXRjaCAocmVxdWVzdC50eXBlKSB7XG4gICAgICBjYXNlICdpbmZvcm1hdGlvbic6XG4gICAgICAgIHNlbmRSZXNwb25zZShpbmZvcm1hdGlvbigpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzaXppbmcnOlxuICAgICAgICBzZW5kUmVzcG9uc2Uoc3R5bGluZyhyZXF1ZXN0LnJhbmdlLCByZXF1ZXN0LmluZGV4KSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYmFjayc6XG4gICAgICAgIGJhY2soKTtcbiAgICAgICAgc2VuZFJlc3BvbnNlKHt9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzZW5kUmVzcG9uc2Uoe30pO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0pO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=