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

/***/ "./src/Sizing.ts":
/*!***********************!*\
  !*** ./src/Sizing.ts ***!
  \***********************/
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
    }
    /**
     * スクロールバーを消すだけのサイジング処理を行う
     */
    standardSizing(scrollIndex = null) {
        //style タグを生成
        this._appendStyle('body,html{overflow:hidden}');
        //スクロール指定があればその位置までスクロール
        if (scrollIndex !== null) {
            window.scrollTo(Math.floor(scrollIndex % this.widthCaptureNumber) % this.captureNumber * this.windowWidth, Math.floor(scrollIndex / this.widthCaptureNumber) % this.captureNumber * this.windowHeight);
        }
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
/* harmony import */ var _Sizing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sizing */ "./src/Sizing.ts");

window.addEventListener('load', () => {
    console.log('Immediate Shot Start');
    //サイズを取得するためのクラス
    const sizing = new _Sizing__WEBPACK_IMPORTED_MODULE_0__["Sizing"]();
    //表示されているタブの情報を返す
    const information = () => {
        return sizing.getInformation();
    };
    //ブラウザの大きさを適切なものに変える
    const styling = (range, index) => {
        switch (range) {
            case 'full':
                sizing.fullSizing();
                break;
            case 'display':
                sizing.standardSizing(null);
                break;
            case 'perfect':
                sizing.standardSizing(index);
                break;
        }
        //情報を返す
        return sizing.getInformation();
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
                styling(request.range, request.index);
                sendResponse({});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NpemluZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEZBO0FBQUE7QUFBTyxNQUFNLE1BQU07SUFzQ2pCOzs7T0FHRztJQUNLLFlBQVk7UUFDbEIsU0FBUztRQUNULE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXRELHVCQUF1QjtRQUN2QixJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDbkIsT0FBTztTQUNSO1FBRUQsU0FBUztRQUNULE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyxZQUFZLENBQUMsS0FBYTtRQUNo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RUFBRSxDQUFDO2dCQUNQLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDakIsTUFBTTtZQUNSO2dCQUNFLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDakIsTUFBTTtTQUNUO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJwYWdlLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3BhZ2UudHNcIik7XG4iLCJpbXBvcnQge0luZm9ybWF0aW9ufSBmcm9tIFwiLi9pbnRlcmZhY2VcIjtcblxuZXhwb3J0IGNsYXNzIFNpemluZyB7XG5cbiAgLy9jb25zdHJ1Y3RvcigpIOaZgueCueOBriB3aW5kb3cgd2lkdGhcbiAgcmVhZG9ubHkgd2luZG93V2lkdGg6IG51bWJlcjtcblxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544GuIHdpbmRvdyBoZWlnaHRcbiAgcmVhZG9ubHkgd2luZG93SGVpZ2h0OiBudW1iZXI7XG5cbiAgLy9jb25zdHJ1Y3RvcigpIOaZgueCueOBriBkb2N1bWVudCB3aWR0aFxuICByZWFkb25seSBkb2N1bWVudFdpZHRoOiBudW1iZXI7XG5cbiAgLy9jb25zdHJ1Y3RvcigpIOaZgueCueOBriBkb2N1bWVudCBoZWlnaHRcbiAgcmVhZG9ubHkgZG9jdW1lbnRIZWlnaHQ6IG51bWJlcjtcblxuICAvL+eUu+mdoue4ruWwj+avlOeOh1xuICByZWFkb25seSByYXRpbzogbnVtYmVyO1xuXG4gIC8v55S76Z2i44KS5bmF44Go6auY44GV44Gu44Gp44Gh44KJ44Gn57iu5bCP44GX44Gf44GLXG4gIHJlYWRvbmx5IHJhdGlvVHlwZTogJ3dpZHRoJyB8ICdoZWlnaHQnO1xuXG4gIC8vZG9jdW1lbnRXaWR0aCDjgpLnj77lnKjjga4gd2luZG93V2lkdGgg44Gu5aSn44GN44GV44Gn44Kt44Oj44OX44OB44Oj44GZ44KL44Gr44Gv5qiq44Gr5L2V5p6a44Kt44Oj44OX44OB44Oj44GM5b+F6KaB44GLXG4gIHJlYWRvbmx5IHdpZHRoQ2FwdHVyZU51bWJlcjogbnVtYmVyO1xuXG4gIC8vZG9jdW1lbnRIZWlnaHQg44KS54++5Zyo44GuIHdpbmRvd0hlaWdodCDjga7lpKfjgY3jgZXjgafjgq3jg6Pjg5fjg4Hjg6PjgZnjgovjgavjga/nuKbjgavkvZXmnprjgq3jg6Pjg5fjg4Hjg6PjgYzlv4XopoHjgYtcbiAgcmVhZG9ubHkgaGVpZ2h0Q2FwdHVyZU51bWJlcjogbnVtYmVyO1xuXG4gIC8v5LiK6KiY5LqM44Gk44Gu5LmX566X5YCkXG4gIHJlYWRvbmx5IGNhcHR1cmVOdW1iZXI6IG51bWJlcjtcblxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544Gu44K544Kv44Ot44O844Or5L2N572uKOaoqilcbiAgcmVhZG9ubHkgc2Nyb2xsWDogbnVtYmVyO1xuXG4gIC8vY29uc3RydWN0b3IoKSDmmYLngrnjga7jgrnjgq/jg63jg7zjg6vkvY3nva4o57imKVxuICByZWFkb25seSBzY3JvbGxZOiBudW1iZXI7XG5cbiAgLy/jgZPjga7jgq/jg6njgrnjgYzmibHjgYYgPHN0eWxlPiDjgr/jgrDjga4gaWQg5bGe5oCn5YCkXG4gIHJlYWRvbmx5IFNUWUxFX0lEOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIOOBk+OBruOCr+ODqeOCueOBjOS7lei+vOOCk+OBoCBzdHlsZSDjgr/jgrDjgpLliYrpmaTjgZnjgotcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX3JlbW92ZVN0eWxlKCkge1xuICAgIC8v5YmK6Zmk5a++6LGh44Gu5Y+W5b6XXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5TVFlMRV9JRCk7XG5cbiAgICAvL3RhcmdldCDjgYzlrZjlnKjjgZfjgarjgYvjgaPjgZ/jgonkvZXjgoLjgZfjgarjgYRcbiAgICBpZiAodGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy/lr77osaHjgpLliYrpmaTjgZnjgotcbiAgICB0YXJnZXQucmVtb3ZlKCk7XG4gIH1cblxuICAvKipcbiAgICogc3R5bGUg44K/44Kw44KS5oy/5YWl44GZ44KLXG4gICAqIOaXouOBq+OBk+OBruOCr+ODqeOCueOBjOaJseOBo+OBpuOBhOOCiyBzdHlsZSDjgYzlrZjlnKjjgZfjgZ/loLTlkIjjga/jg6rjgrvjg4Pjg4jjgZnjgotcbiAgICogQHBhcmFtIHN0eWxlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIF9hcHBlbmRTdHlsZShzdHlsZTogc3RyaW5nKSB7XG4gICAgLy/jg6rjgrvjg4Pjg4hcbiAgICB0aGlzLl9yZW1vdmVTdHlsZSgpO1xuXG4gICAgLy9zdHlsZSDjgr/jgrDjgpLnlKjmhI9cbiAgICBjb25zdCB0YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHRhZy5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5TVFlMRV9JRCk7XG4gICAgdGFnLmlubmVyVGV4dCA9IHN0eWxlO1xuXG4gICAgLy90YWcg44K/44Kw5oy/5YWlXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0YWcpO1xuICB9XG5cbiAgLyoqXG4gICAqIOWQhOOCteOCpOOCuuaDheWgseOCkuWPluW+l+ODu+ioiOeul+ODu+S/neaMgeOBmeOCi1xuICAgKiDliqDjgYjjgablv4XnlKjjgarlrprmlbDjgoLkv53nrqHjgZnjgotcbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAvL+OCpuOCo+ODs+ODieOCpuOCteOCpOOCulxuICAgIHRoaXMud2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICB0aGlzLndpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgIC8v44OJ44Kt44Ol44Oh44Oz44OI44K144Kk44K6XG4gICAgdGhpcy5kb2N1bWVudFdpZHRoID0gZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICB0aGlzLmRvY3VtZW50SGVpZ2h0ID0gZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XG5cbiAgICAvL+W5heOBqOmrmOOBleOBneOCjOOBnuOCjOOBruWJsuWQiFxuICAgIGNvbnN0IHdpZHRoUmF0aW8gPSB0aGlzLndpbmRvd1dpZHRoIC8gdGhpcy5kb2N1bWVudFdpZHRoO1xuICAgIGNvbnN0IGhlaWdodFJhdGlvID0gdGhpcy53aW5kb3dIZWlnaHQgLyB0aGlzLmRvY3VtZW50SGVpZ2h0O1xuXG4gICAgLy9yYXRpbyDjgaggcmF0aW9UeXBlIOOBruOCu+ODg+ODiFxuICAgIHRoaXMucmF0aW8gPSB3aWR0aFJhdGlvID4gaGVpZ2h0UmF0aW8gPyBoZWlnaHRSYXRpbyA6IHdpZHRoUmF0aW87XG4gICAgdGhpcy5yYXRpb1R5cGUgPSB3aWR0aFJhdGlvID4gaGVpZ2h0UmF0aW8gPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG5cbiAgICAvL3JhdGlvIOOBjCAxIOS7peS4iuOBoOOBo+OBn+OCiSAxIOOBqOOBmeOCi1xuICAgIHRoaXMucmF0aW8gPSB0aGlzLnJhdGlvID4gMSA/IDEgOiB0aGlzLnJhdGlvO1xuXG4gICAgLy/nuKbjgajmqKrjgavjgYrjgYTjgabjgZ3jgozjgZ7jgoznj77lnKjjga7jgqbjgqPjg7Pjg4njgqbjgrXjgqTjgrrkvZXmnprliIbjgaflhajnlLvpnaLjgpLmjZXmjYnjgafjgY3jgovjgYvjga7mlbDlgKTjgpLnrpflh7pcbiAgICB0aGlzLndpZHRoQ2FwdHVyZU51bWJlciA9IE1hdGguY2VpbCh0aGlzLmRvY3VtZW50V2lkdGggLyB0aGlzLndpbmRvd1dpZHRoKTtcbiAgICB0aGlzLmhlaWdodENhcHR1cmVOdW1iZXIgPSBNYXRoLmNlaWwodGhpcy5kb2N1bWVudEhlaWdodCAvIHRoaXMud2luZG93SGVpZ2h0KTtcblxuICAgIC8v5LiK6KiY5LqM44Gk44Gu5LmX566X5YCkXG4gICAgdGhpcy5jYXB0dXJlTnVtYmVyID0gdGhpcy53aWR0aENhcHR1cmVOdW1iZXIgKiB0aGlzLmhlaWdodENhcHR1cmVOdW1iZXI7XG5cbiAgICAvL+ePvuWcqOOBruOCueOCr+ODreODvOODq+W6p+aomeOCkuiomOmMslxuICAgIHRoaXMuc2Nyb2xsWCA9IHdpbmRvdy5zY3JvbGxYO1xuICAgIHRoaXMuc2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZO1xuXG4gICAgLy9zdHlsZSDjgr/jgrDjgavkvb/nlKjjgZnjgosgaWRcbiAgICB0aGlzLlNUWUxFX0lEID0gJ3NpemluZ18nK01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKC04KTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmg4XloLHjgpLov5TjgZlcbiAgICogQHJldHVybiB7e2RvY3VtZW50V2lkdGg6IG51bWJlciB8ICosIGRvY3VtZW50SGVpZ2h0OiBudW1iZXIgfCAqLCB3aW5kb3dIZWlnaHQ6IG51bWJlciB8ICosIHJhdGlvVHlwZTogc3RyaW5nLCB3aW5kb3dXaWR0aDogbnVtYmVyIHwgKiwgcmF0aW86ICgqfG51bWJlcil9fVxuICAgKi9cbiAgcHVibGljIGdldEluZm9ybWF0aW9uKCk6IEluZm9ybWF0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgd2luZG93V2lkdGg6IHRoaXMud2luZG93V2lkdGgsXG4gICAgICB3aW5kb3dIZWlnaHQ6IHRoaXMud2luZG93SGVpZ2h0LFxuICAgICAgZG9jdW1lbnRXaWR0aDogdGhpcy5kb2N1bWVudFdpZHRoLFxuICAgICAgZG9jdW1lbnRIZWlnaHQ6IHRoaXMuZG9jdW1lbnRIZWlnaHQsXG4gICAgICB3aWR0aENhcHR1cmVOdW1iZXI6IHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyLFxuICAgICAgaGVpZ2h0Q2FwdHVyZU51bWJlcjogdGhpcy5oZWlnaHRDYXB0dXJlTnVtYmVyLFxuICAgICAgY2FwdHVyZU51bWJlcjogdGhpcy5jYXB0dXJlTnVtYmVyLFxuICAgICAgcmF0aW86IHRoaXMucmF0aW8sXG4gICAgICByYXRpb1R5cGU6IHRoaXMucmF0aW9UeXBlXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOODleODq+OCteOCpOOCuueUqOOBruOCteOCpOOCuOODs+OCsOWHpueQhuOCkuihjOOBhlxuICAgKi9cbiAgcHVibGljIGZ1bGxTaXppbmcoKSB7XG4gICAgLy9zdHlsZSDjgr/jgrDjgpLnlJ/miJBcbiAgICB0aGlzLl9hcHBlbmRTdHlsZSgnYm9keXtvdmVyZmxvdzpoaWRkZW47dHJhbnNmb3JtLW9yaWdpbjogbGVmdCB0b3A7dHJhbnNmb3JtOiBzY2FsZSgnK3RoaXMucmF0aW8rJyl9Jyk7XG5cbiAgICAvL+OCueOCr+ODreODvOODq+S9jee9ruOCkiAwIOOBq+OBmeOCi1xuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgrnjgq/jg63jg7zjg6vjg5Djg7zjgpLmtojjgZnjgaDjgZHjga7jgrXjgqTjgrjjg7PjgrDlh6bnkIbjgpLooYzjgYZcbiAgICovXG4gIHB1YmxpYyBzdGFuZGFyZFNpemluZyhzY3JvbGxJbmRleDogbnVtYmVyfG51bGwgPSBudWxsKSB7XG4gICAgLy9zdHlsZSDjgr/jgrDjgpLnlJ/miJBcbiAgICB0aGlzLl9hcHBlbmRTdHlsZSgnYm9keSxodG1se292ZXJmbG93OmhpZGRlbn0nKTtcblxuICAgIC8v44K544Kv44Ot44O844Or5oyH5a6a44GM44GC44KM44Gw44Gd44Gu5L2N572u44G+44Gn44K544Kv44Ot44O844OrXG4gICAgaWYgKHNjcm9sbEluZGV4ICE9PSBudWxsKSB7XG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oTWF0aC5mbG9vcihzY3JvbGxJbmRleCAlIHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyKSAlIHRoaXMuY2FwdHVyZU51bWJlciAqIHRoaXMud2luZG93V2lkdGgsIE1hdGguZmxvb3Ioc2Nyb2xsSW5kZXggLyB0aGlzLndpZHRoQ2FwdHVyZU51bWJlcikgJSB0aGlzLmNhcHR1cmVOdW1iZXIgKiB0aGlzLndpbmRvd0hlaWdodCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOOCteOCpOOCuOODs+OCsOOBruODquOCu+ODg+ODiFxuICAgKiDjgrnjgq/jg63jg7zjg6vkvY3nva7jgoLjg6rjgrvjg4Pjg4jjgZnjgotcbiAgICovXG4gIHB1YmxpYyByZXNldFNpemluZygpIHtcbiAgICAvL3N0eWxlIOOBruODquOCu+ODg+ODiFxuICAgIHRoaXMuX3JlbW92ZVN0eWxlKCk7XG5cbiAgICAvL+OCueOCr+ODreODvOODq+S9jee9ruOBruODquOCu+ODg+ODiFxuICAgIHdpbmRvdy5zY3JvbGxUbyh0aGlzLnNjcm9sbFgsIHRoaXMuc2Nyb2xsWSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtSYW5nZX0gZnJvbSBcIi4vaW50ZXJmYWNlXCI7XG5pbXBvcnQge1NpemluZ30gZnJvbSBcIi4vU2l6aW5nXCI7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuXG4gIGNvbnNvbGUubG9nKCdJbW1lZGlhdGUgU2hvdCBTdGFydCcpO1xuXG4gIC8v44K144Kk44K644KS5Y+W5b6X44GZ44KL44Gf44KB44Gu44Kv44Op44K5XG4gIGNvbnN0IHNpemluZyA9IG5ldyBTaXppbmcoKTtcblxuICAvL+ihqOekuuOBleOCjOOBpuOBhOOCi+OCv+ODluOBruaDheWgseOCkui/lOOBmVxuICBjb25zdCBpbmZvcm1hdGlvbiA9ICgpID0+IHtcbiAgICByZXR1cm4gc2l6aW5nLmdldEluZm9ybWF0aW9uKCk7XG4gIH07XG5cbiAgLy/jg5bjg6njgqbjgrbjga7lpKfjgY3jgZXjgpLpganliIfjgarjgoLjga7jgavlpInjgYjjgotcbiAgY29uc3Qgc3R5bGluZyA9IChyYW5nZTogUmFuZ2UsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICBzd2l0Y2ggKHJhbmdlKSB7XG4gICAgICBjYXNlICdmdWxsJzpcbiAgICAgICAgc2l6aW5nLmZ1bGxTaXppbmcoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkaXNwbGF5JzpcbiAgICAgICAgc2l6aW5nLnN0YW5kYXJkU2l6aW5nKG51bGwpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3BlcmZlY3QnOlxuICAgICAgICBzaXppbmcuc3RhbmRhcmRTaXppbmcoaW5kZXgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvL+aDheWgseOCkui/lOOBmVxuICAgIHJldHVybiBzaXppbmcuZ2V0SW5mb3JtYXRpb24oKTtcbiAgfTtcblxuICAvL+ODluODqeOCpuOCtuOBruWkp+OBjeOBleOCkuWFg+OBq+aIu+OBmVxuICBjb25zdCBiYWNrID0gKCkgPT4ge1xuICAgIHNpemluZy5yZXNldFNpemluZygpO1xuICB9O1xuXG4gIC8v44Oh44OD44K744O844K444OR44OD44K344Oz44KwXG4gIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgICAvLyDlj5fjgZHlj5bjgaPjgZ/lgKTjgafliIblspBcbiAgICBzd2l0Y2ggKHJlcXVlc3QudHlwZSkge1xuICAgICAgY2FzZSAnaW5mb3JtYXRpb24nOlxuICAgICAgICBzZW5kUmVzcG9uc2UoaW5mb3JtYXRpb24oKSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc2l6aW5nJzpcbiAgICAgICAgc3R5bGluZyhyZXF1ZXN0LnJhbmdlLCByZXF1ZXN0LmluZGV4KTtcbiAgICAgICAgc2VuZFJlc3BvbnNlKHt9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdiYWNrJzpcbiAgICAgICAgYmFjaygpO1xuICAgICAgICBzZW5kUmVzcG9uc2Uoe30pO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHNlbmRSZXNwb25zZSh7fSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==