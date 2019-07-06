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
        this.documentWidth = Math.max(...[document.body.clientWidth, document.body.scrollWidth, document.documentElement.scrollWidth, document.documentElement.clientWidth]);
        this.documentHeight = Math.max(...[document.body.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight]);
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
        this._appendStyle('html{overflow:hidden}');
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
        document.getElementsByTagName('html')[0].scrollTo(coordinates.x, coordinates.y);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzL1NpemluZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEZBO0FBQUE7QUFBTyxNQUFNLE1BQU07SUFzQ2pCOzs7T0FHRztJQUNLLFlBQVk7UUFDbEIsU0FBUztRQUNULE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXRELHVCQUF1QjtRQUN2QixJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDbkIsT0FBTztTQUNSO1FBRUQsU0FBUztRQUNULE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyxZQUFZLENBQUMsS0FB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Q1Q7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InBhZ2UuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvcGFnZS50c1wiKTtcbiIsImltcG9ydCB7Q29vcmRpbmF0ZXMsIEluZm9ybWF0aW9ufSBmcm9tIFwic3JjL2NsYXNzL2ludGVyZmFjZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNpemluZyB7XHJcblxyXG4gIC8vY29uc3RydWN0b3IoKSDmmYLngrnjga4gd2luZG93IHdpZHRoXHJcbiAgcmVhZG9ubHkgd2luZG93V2lkdGg6IG51bWJlcjtcclxuXHJcbiAgLy9jb25zdHJ1Y3RvcigpIOaZgueCueOBriB3aW5kb3cgaGVpZ2h0XHJcbiAgcmVhZG9ubHkgd2luZG93SGVpZ2h0OiBudW1iZXI7XHJcblxyXG4gIC8vY29uc3RydWN0b3IoKSDmmYLngrnjga4gZG9jdW1lbnQgd2lkdGhcclxuICByZWFkb25seSBkb2N1bWVudFdpZHRoOiBudW1iZXI7XHJcblxyXG4gIC8vY29uc3RydWN0b3IoKSDmmYLngrnjga4gZG9jdW1lbnQgaGVpZ2h0XHJcbiAgcmVhZG9ubHkgZG9jdW1lbnRIZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgLy/nlLvpnaLnuK7lsI/mr5TnjodcclxuICByZWFkb25seSByYXRpbzogbnVtYmVyO1xyXG5cclxuICAvL+eUu+mdouOCkuW5heOBqOmrmOOBleOBruOBqeOBoeOCieOBp+e4ruWwj+OBl+OBn+OBi1xyXG4gIHJlYWRvbmx5IHJhdGlvVHlwZTogJ3dpZHRoJyB8ICdoZWlnaHQnO1xyXG5cclxuICAvL2RvY3VtZW50V2lkdGgg44KS54++5Zyo44GuIHdpbmRvd1dpZHRoIOOBruWkp+OBjeOBleOBp+OCreODo+ODl+ODgeODo+OBmeOCi+OBq+OBr+aoquOBq+S9leaemuOCreODo+ODl+ODgeODo+OBjOW/heimgeOBi1xyXG4gIHJlYWRvbmx5IHdpZHRoQ2FwdHVyZU51bWJlcjogbnVtYmVyO1xyXG5cclxuICAvL2RvY3VtZW50SGVpZ2h0IOOCkuePvuWcqOOBriB3aW5kb3dIZWlnaHQg44Gu5aSn44GN44GV44Gn44Kt44Oj44OX44OB44Oj44GZ44KL44Gr44Gv57im44Gr5L2V5p6a44Kt44Oj44OX44OB44Oj44GM5b+F6KaB44GLXHJcbiAgcmVhZG9ubHkgaGVpZ2h0Q2FwdHVyZU51bWJlcjogbnVtYmVyO1xyXG5cclxuICAvL+S4iuiomOS6jOOBpOOBruS5l+eul+WApFxyXG4gIHJlYWRvbmx5IGNhcHR1cmVOdW1iZXI6IG51bWJlcjtcclxuXHJcbiAgLy9jb25zdHJ1Y3RvcigpIOaZgueCueOBruOCueOCr+ODreODvOODq+S9jee9rijmqKopXHJcbiAgcmVhZG9ubHkgc2Nyb2xsWDogbnVtYmVyO1xyXG5cclxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544Gu44K544Kv44Ot44O844Or5L2N572uKOe4pilcclxuICByZWFkb25seSBzY3JvbGxZOiBudW1iZXI7XHJcblxyXG4gIC8v44GT44Gu44Kv44Op44K544GM5omx44GGIDxzdHlsZT4g44K/44Kw44GuIGlkIOWxnuaAp+WApFxyXG4gIHJlYWRvbmx5IFNUWUxFX0lEOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIOOBk+OBruOCr+ODqeOCueOBjOS7lei+vOOCk+OBoCBzdHlsZSDjgr/jgrDjgpLliYrpmaTjgZnjgotcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3JlbW92ZVN0eWxlKCkge1xyXG4gICAgLy/liYrpmaTlr77osaHjga7lj5blvpdcclxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuU1RZTEVfSUQpO1xyXG5cclxuICAgIC8vdGFyZ2V0IOOBjOWtmOWcqOOBl+OBquOBi+OBo+OBn+OCieS9leOCguOBl+OBquOBhFxyXG4gICAgaWYgKHRhcmdldCA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy/lr77osaHjgpLliYrpmaTjgZnjgotcclxuICAgIHRhcmdldC5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHN0eWxlIOOCv+OCsOOCkuaMv+WFpeOBmeOCi1xyXG4gICAqIOaXouOBq+OBk+OBruOCr+ODqeOCueOBjOaJseOBo+OBpuOBhOOCiyBzdHlsZSDjgYzlrZjlnKjjgZfjgZ/loLTlkIjjga/jg6rjgrvjg4Pjg4jjgZnjgotcclxuICAgKiBAcGFyYW0gc3R5bGVcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2FwcGVuZFN0eWxlKHN0eWxlOiBzdHJpbmcpIHtcclxuICAgIC8v44Oq44K744OD44OIXHJcbiAgICB0aGlzLl9yZW1vdmVTdHlsZSgpO1xyXG5cclxuICAgIC8vc3R5bGUg44K/44Kw44KS55So5oSPXHJcbiAgICBjb25zdCB0YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG4gICAgdGFnLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLlNUWUxFX0lEKTtcclxuICAgIHRhZy5pbm5lclRleHQgPSBzdHlsZTtcclxuXHJcbiAgICAvL3RhZyDjgr/jgrDmjL/lhaVcclxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodGFnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaMh+WumuOBleOCjOOBnyBpbmRleCDjgYvjgonjgrnjgq/jg63jg7zjg6vjgZnjgbnjgY3luqfmqJnjgpLov5TjgZlcclxuICAgKiBAcGFyYW0gaW5kZXhcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2dldFNjcm9sbENvb3JkaW5hdGVzKGluZGV4OiBudW1iZXIpOiBDb29yZGluYXRlcyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4OiBNYXRoLmZsb29yKGluZGV4ICUgdGhpcy53aWR0aENhcHR1cmVOdW1iZXIpICUgdGhpcy5jYXB0dXJlTnVtYmVyICogdGhpcy53aW5kb3dXaWR0aCxcclxuICAgICAgeTogTWF0aC5mbG9vcihpbmRleCAvIHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyKSAlIHRoaXMuY2FwdHVyZU51bWJlciAqIHRoaXMud2luZG93SGVpZ2h0XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5ZCE44K144Kk44K65oOF5aCx44KS5Y+W5b6X44O76KiI566X44O75L+d5oyB44GZ44KLXHJcbiAgICog5Yqg44GI44Gm5b+F55So44Gq5a6a5pWw44KC5L+d566h44GZ44KLXHJcbiAgICovXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy/jgqbjgqPjg7Pjg4njgqbjgrXjgqTjgrpcclxuICAgIHRoaXMud2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgIHRoaXMud2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuICAgIC8v44OJ44Kt44Ol44Oh44Oz44OI44K144Kk44K6XHJcbiAgICB0aGlzLmRvY3VtZW50V2lkdGggPSBNYXRoLm1heCguLi5bZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCwgZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFdpZHRoLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGhdKTtcclxuICAgIHRoaXMuZG9jdW1lbnRIZWlnaHQgPSBNYXRoLm1heCguLi5bZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQsIGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XSk7XHJcblxyXG4gICAgLy/luYXjgajpq5jjgZXjgZ3jgozjgZ7jgozjga7libLlkIhcclxuICAgIGNvbnN0IHdpZHRoUmF0aW8gPSB0aGlzLndpbmRvd1dpZHRoIC8gdGhpcy5kb2N1bWVudFdpZHRoO1xyXG4gICAgY29uc3QgaGVpZ2h0UmF0aW8gPSB0aGlzLndpbmRvd0hlaWdodCAvIHRoaXMuZG9jdW1lbnRIZWlnaHQ7XHJcblxyXG4gICAgLy9yYXRpbyDjgaggcmF0aW9UeXBlIOOBruOCu+ODg+ODiFxyXG4gICAgdGhpcy5yYXRpbyA9IHdpZHRoUmF0aW8gPiBoZWlnaHRSYXRpbyA/IGhlaWdodFJhdGlvIDogd2lkdGhSYXRpbztcclxuICAgIHRoaXMucmF0aW9UeXBlID0gd2lkdGhSYXRpbyA+IGhlaWdodFJhdGlvID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xyXG5cclxuICAgIC8vcmF0aW8g44GMIDEg5Lul5LiK44Gg44Gj44Gf44KJIDEg44Go44GZ44KLXHJcbiAgICB0aGlzLnJhdGlvID0gdGhpcy5yYXRpbyA+IDEgPyAxIDogdGhpcy5yYXRpbztcclxuXHJcbiAgICAvL+e4puOBqOaoquOBq+OBiuOBhOOBpuOBneOCjOOBnuOCjOePvuWcqOOBruOCpuOCo+ODs+ODieOCpuOCteOCpOOCuuS9leaemuWIhuOBp+WFqOeUu+mdouOCkuaNleaNieOBp+OBjeOCi+OBi+OBruaVsOWApOOCkueul+WHulxyXG4gICAgdGhpcy53aWR0aENhcHR1cmVOdW1iZXIgPSBNYXRoLmNlaWwodGhpcy5kb2N1bWVudFdpZHRoIC8gdGhpcy53aW5kb3dXaWR0aCk7XHJcbiAgICB0aGlzLmhlaWdodENhcHR1cmVOdW1iZXIgPSBNYXRoLmNlaWwodGhpcy5kb2N1bWVudEhlaWdodCAvIHRoaXMud2luZG93SGVpZ2h0KTtcclxuXHJcbiAgICAvL+S4iuiomOS6jOOBpOOBruS5l+eul+WApFxyXG4gICAgdGhpcy5jYXB0dXJlTnVtYmVyID0gdGhpcy53aWR0aENhcHR1cmVOdW1iZXIgKiB0aGlzLmhlaWdodENhcHR1cmVOdW1iZXI7XHJcblxyXG4gICAgLy/nj77lnKjjga7jgrnjgq/jg63jg7zjg6vluqfmqJnjgpLoqJjpjLJcclxuICAgIHRoaXMuc2Nyb2xsWCA9IHdpbmRvdy5zY3JvbGxYO1xyXG4gICAgdGhpcy5zY3JvbGxZID0gd2luZG93LnNjcm9sbFk7XHJcblxyXG4gICAgLy9zdHlsZSDjgr/jgrDjgavkvb/nlKjjgZnjgosgaWRcclxuICAgIHRoaXMuU1RZTEVfSUQgPSAnc2l6aW5nXycrTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoLTgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5oOF5aCx44KS6L+U44GZXHJcbiAgICogQHJldHVybiB7e2RvY3VtZW50V2lkdGg6IG51bWJlciB8ICosIGRvY3VtZW50SGVpZ2h0OiBudW1iZXIgfCAqLCB3aW5kb3dIZWlnaHQ6IG51bWJlciB8ICosIHJhdGlvVHlwZTogc3RyaW5nLCB3aW5kb3dXaWR0aDogbnVtYmVyIHwgKiwgcmF0aW86ICgqfG51bWJlcil9fVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRJbmZvcm1hdGlvbigpOiBJbmZvcm1hdGlvbiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB3aW5kb3dXaWR0aDogdGhpcy53aW5kb3dXaWR0aCxcclxuICAgICAgd2luZG93SGVpZ2h0OiB0aGlzLndpbmRvd0hlaWdodCxcclxuICAgICAgZG9jdW1lbnRXaWR0aDogdGhpcy5kb2N1bWVudFdpZHRoLFxyXG4gICAgICBkb2N1bWVudEhlaWdodDogdGhpcy5kb2N1bWVudEhlaWdodCxcclxuICAgICAgd2lkdGhDYXB0dXJlTnVtYmVyOiB0aGlzLndpZHRoQ2FwdHVyZU51bWJlcixcclxuICAgICAgaGVpZ2h0Q2FwdHVyZU51bWJlcjogdGhpcy5oZWlnaHRDYXB0dXJlTnVtYmVyLFxyXG4gICAgICBjYXB0dXJlTnVtYmVyOiB0aGlzLmNhcHR1cmVOdW1iZXIsXHJcbiAgICAgIHJhdGlvOiB0aGlzLnJhdGlvLFxyXG4gICAgICByYXRpb1R5cGU6IHRoaXMucmF0aW9UeXBlXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjg5Xjg6vjgrXjgqTjgrrnlKjjga7jgrXjgqTjgrjjg7PjgrDlh6bnkIbjgpLooYzjgYZcclxuICAgKi9cclxuICBwdWJsaWMgZnVsbFNpemluZygpOiBDb29yZGluYXRlcyB7XHJcbiAgICAvL3N0eWxlIOOCv+OCsOOCkueUn+aIkFxyXG4gICAgdGhpcy5fYXBwZW5kU3R5bGUoJ2JvZHl7b3ZlcmZsb3c6aGlkZGVuO3RyYW5zZm9ybS1vcmlnaW46IGxlZnQgdG9wO3RyYW5zZm9ybTogc2NhbGUoJyt0aGlzLnJhdGlvKycpfScpO1xyXG5cclxuICAgIC8v44K544Kv44Ot44O844Or5L2N572u44KSIDAg44Gr44GZ44KLXHJcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XHJcblxyXG4gICAgLy8wLCAwIOOCkui/lOOBmVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDogMCxcclxuICAgICAgeTogMFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCueOCr+ODreODvOODq+ODkOODvOOCkua2iOOBmeOBoOOBkeOBruOCteOCpOOCuOODs+OCsOWHpueQhuOCkuihjOOBhlxyXG4gICAqIOOCueOCr+ODreODvOODq+S9jee9ruOBryBpbmRleCDnlarlj7fjgafmjIflrprjgZnjgotcclxuICAgKiDjgZPjga4gaW5kZXgg55Wq5Y+344GvIGdldEluZm9ybWF0aW9uKCkg44Gn5Y+W5b6X44Gn44GN44KLIGNhcHR1cmVOdW1iZXIg44Gu56+E5Zuy44Gn5oyH5a6a44GX44CBXHJcbiAgICog5L6L44GI44GwXHJcbiAgICogd2lkdGhDYXB0dXJlTnVtYmVyID0gNFxyXG4gICAqIGhlaWdodENhcHR1cmVOdW1iZXIgPSAzXHJcbiAgICogY2FwdHVyZU51bWJlciA9IDEyXHJcbiAgICog44Gg44Gj44Gf5aC05ZCI44GvXHJcbiAgICogKy0tLS0rLS0tLSstLS0tKy0tLS0rXHJcbiAgICogfCAgMCAgfCAgMSAgfCAgMiAgfCAgMyAgfFxyXG4gICAqICstLS0tKy0tLS0rLS0tLSstLS0tK1xyXG4gICAqIHwgIDQgIHwgIDUgIHwgIDYgIHwgIDcgIHxcclxuICAgKiArLS0tLSstLS0tKy0tLS0rLS0tLStcclxuICAgKiB8ICA4ICB8ICA5ICB8IDEwIHwgMTEgfFxyXG4gICAqICstLS0tKy0tLS0rLS0tLSstLS0tK1xyXG4gICAqIOOBqOOBhOOBo+OBn+WQhOODnuOCueOBruW3puS4iuW6p+aomeOBuOOCueOCr+ODreODvOODq+OBmeOCi+OBk+OBqOOBq+OBquOCi1xyXG4gICAqIOWQhOODnuOCueOBriB3aWR0aCwgaGVpZ2h0ID0gd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodFxyXG4gICAqIOWkp+aeoOOBriB3aWR0aCwgaGVpZ2h0ID0gZG9jdW1lbnRXaWR0aCwgZG9jdW1lbnRIZWlnaHRcclxuICAgKi9cclxuICBwdWJsaWMgZGlzcGxheVNpemluZyhpbmRleDogbnVtYmVyfG51bGwgPSBudWxsKTogQ29vcmRpbmF0ZXMge1xyXG4gICAgLy9zdHlsZSDjgr/jgrDjgpLnlJ/miJBcclxuICAgIHRoaXMuX2FwcGVuZFN0eWxlKCdodG1se292ZXJmbG93OmhpZGRlbn0nKTtcclxuXHJcbiAgICAvL+enu+WLleWFiOW6p+aomeOBruWumue+qVxyXG4gICAgbGV0IGNvb3JkaW5hdGVzOiBDb29yZGluYXRlcyA9IHtcclxuICAgICAgeDogMCxcclxuICAgICAgeTogMFxyXG4gICAgfTtcclxuXHJcbiAgICAvL+OCueOCr+ODreODvOODq+aMh+WumuOBjOOBguOCjOOBsOOBneOBruW6p+aomeOBpyBjb29yZGluYXRlcyDjgpLkuIrmm7jjgY1cclxuICAgIGlmIChpbmRleCAhPT0gbnVsbCkge1xyXG4gICAgICBjb29yZGluYXRlcyA9IHRoaXMuX2dldFNjcm9sbENvb3JkaW5hdGVzKGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICAvL+OCueOCr+ODreODvOODq+OBruWun+ihjFxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXS5zY3JvbGxUbyhjb29yZGluYXRlcy54LCBjb29yZGluYXRlcy55KTtcclxuXHJcbiAgICAvL+OCueOCr+ODreODvOODq+aDheWgseOCkui/lOOBmVxyXG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K144Kk44K444Oz44Kw44Gu44Oq44K744OD44OIXHJcbiAgICog44K544Kv44Ot44O844Or5L2N572u44KC44Oq44K744OD44OI44GZ44KLXHJcbiAgICovXHJcbiAgcHVibGljIHJlc2V0U2l6aW5nKCk6IENvb3JkaW5hdGVzIHtcclxuICAgIC8vc3R5bGUg44Gu44Oq44K744OD44OIXHJcbiAgICB0aGlzLl9yZW1vdmVTdHlsZSgpO1xyXG5cclxuICAgIC8v44K544Kv44Ot44O844Or5L2N572u44Gu44Oq44K744OD44OIXHJcbiAgICB3aW5kb3cuc2Nyb2xsVG8odGhpcy5zY3JvbGxYLCB0aGlzLnNjcm9sbFkpO1xyXG5cclxuICAgIC8v44K544Kv44Ot44O844Or5L2N572u44KS6L+U44GZXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4OiB0aGlzLnNjcm9sbFgsXHJcbiAgICAgIHk6IHRoaXMuc2Nyb2xsWVxyXG4gICAgfTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7UmFuZ2UsIENvb3JkaW5hdGVzfSBmcm9tIFwiLi9jbGFzcy9pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHtTaXppbmd9IGZyb20gXCIuL2NsYXNzL1NpemluZ1wiO1xyXG5pbXBvcnQgdGFiSWQgPSBjaHJvbWUuZGV2dG9vbHMuaW5zcGVjdGVkV2luZG93LnRhYklkO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcblxyXG4gIC8v44K144Kk44K644KS5Y+W5b6X44GZ44KL44Gf44KB44Gu44Kv44Op44K5XHJcbiAgY29uc3Qgc2l6aW5nID0gbmV3IFNpemluZygpO1xyXG5cclxuICAvL+ihqOekuuOBleOCjOOBpuOBhOOCi+OCv+ODluOBruaDheWgseOCkui/lOOBmVxyXG4gIGNvbnN0IGluZm9ybWF0aW9uID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIHNpemluZy5nZXRJbmZvcm1hdGlvbigpO1xyXG4gIH07XHJcblxyXG4gIC8v44OW44Op44Km44K244Gu5aSn44GN44GV44KS6YGp5YiH44Gq44KC44Gu44Gr5aSJ44GI44KLXHJcbiAgY29uc3Qgc3R5bGluZyA9IChyYW5nZTogUmFuZ2UsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgIC8v5Yem55CG57WC5LqG5b6M44Gu5bqn5qiZ5oOF5aCxXHJcbiAgICBsZXQgY29vcmRpbmF0ZTogQ29vcmRpbmF0ZXMgPSB7XHJcbiAgICAgIHg6IDAsXHJcbiAgICAgIHk6IDBcclxuICAgIH07XHJcblxyXG4gICAgLy9yYW5nZSDjgavjgojjgaPjgablh6bnkIbjgpLliIbjgZHjgotcclxuICAgIHN3aXRjaCAocmFuZ2UpIHtcclxuICAgICAgY2FzZSAnZnVsbCc6XHJcbiAgICAgICAgY29vcmRpbmF0ZSA9IHNpemluZy5mdWxsU2l6aW5nKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3BlcmZlY3QnOlxyXG4gICAgICAgIGNvb3JkaW5hdGUgPSBzaXppbmcuZGlzcGxheVNpemluZyhpbmRleCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29vcmRpbmF0ZSA9IHNpemluZy5kaXNwbGF5U2l6aW5nKG51bGwpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5bqn5qiZ5oOF5aCx44KS6L+U44GZXHJcbiAgICByZXR1cm4gY29vcmRpbmF0ZTtcclxuICB9O1xyXG5cclxuICAvL+ODluODqeOCpuOCtuOBruWkp+OBjeOBleOCkuWFg+OBq+aIu+OBmVxyXG4gIGNvbnN0IGJhY2sgPSAoKSA9PiB7XHJcbiAgICBzaXppbmcucmVzZXRTaXppbmcoKTtcclxuICB9O1xyXG5cclxuICAvL+ODoeODg+OCu+ODvOOCuOODkeODg+OCt+ODs+OCsFxyXG4gIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcclxuICAgIC8vIOWPl+OBkeWPluOBo+OBn+WApOOBp+WIhuWykFxyXG4gICAgc3dpdGNoIChyZXF1ZXN0LnR5cGUpIHtcclxuICAgICAgY2FzZSAnaW5mb3JtYXRpb24nOlxyXG4gICAgICAgIHNlbmRSZXNwb25zZShpbmZvcm1hdGlvbigpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnc2l6aW5nJzpcclxuICAgICAgICBzZW5kUmVzcG9uc2Uoc3R5bGluZyhyZXF1ZXN0LnJhbmdlLCByZXF1ZXN0LmluZGV4KSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2JhY2snOlxyXG4gICAgICAgIGJhY2soKTtcclxuICAgICAgICBzZW5kUmVzcG9uc2Uoe30pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHNlbmRSZXNwb25zZSh7fSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==