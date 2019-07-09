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

/***/ "./src/class/FindStyle.ts":
/*!********************************!*\
  !*** ./src/class/FindStyle.ts ***!
  \********************************/
/*! exports provided: FindStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FindStyle", function() { return FindStyle; });
class FindStyle {
    _isHTMLElement(target) {
        return target !== null;
    }
    _findChildren(parent) {
        this.elements.push(parent);
        const children = parent.children;
        for (let i = 0, max = children.length; i < max; i = (i + 1) | 0) {
            const target = children.item(i);
            if (!this._isHTMLElement(target)) {
                continue;
            }
            this._findChildren(target);
        }
    }
    constructor(root) {
        this.root = root;
        this.elements = new Array();
        this._findChildren(root);
    }
    find(property, value) {
        let result = new Array();
        for (let i = 0, max = this.elements.length; i < max; i = (i + 1) | 0) {
            if (window.getComputedStyle(this.elements[i]).getPropertyValue(property) !== value) {
                continue;
            }
            result.push(this.elements[i]);
        }
        return result;
    }
}


/***/ }),

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
/* harmony import */ var _class_FindStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./class/FindStyle */ "./src/class/FindStyle.ts");


window.addEventListener('load', () => {
    //サイズを取得するためのクラス
    const sizing = new _class_Sizing__WEBPACK_IMPORTED_MODULE_0__["Sizing"]();
    //position: fixed を採用している要素
    let fixedElements = [];
    //position: fixed を採用している要素を確保する
    const getFixed = () => {
        const findStyle = new _class_FindStyle__WEBPACK_IMPORTED_MODULE_1__["FindStyle"](document.body);
        fixedElements = findStyle.find('position', 'fixed');
    };
    //position: fixed を採用している要素を非表示にする or 元に戻す
    const controlFixed = (property) => {
        for (let i = 0, max = fixedElements.length; i < max; i = (i + 1) | 0) {
            fixedElements[i].style.visibility = property;
        }
    };
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
            case 'killFixed':
                controlFixed('hidden');
                sendResponse({});
                break;
            case 'back':
                controlFixed('');
                back();
                sendResponse({});
                break;
            default:
                sendResponse({});
                break;
        }
    });
    //position: fixed を採用している要素の確保
    getFixed();
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzL0ZpbmRTdHlsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MvU2l6aW5nLnRzIiwid2VicGFjazovLy8uL3NyYy9wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFPLE1BQU0sU0FBUztJQU1aLGNBQWMsQ0FBQyxNQUFXO1FBQ2hDLE9BQVEsTUFBTSxLQUFLLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRU8sYUFBYSxDQUFDLE1BQW1CO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTNCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFFakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFD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Q0gsQ0FBQyxDQUFDLENBQUM7SUFFSCw4QkFBOEI7SUFDOUIsUUFBUSxFQUFFLENBQUM7QUFFYixDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJwYWdlLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3BhZ2UudHNcIik7XG4iLCJleHBvcnQgY2xhc3MgRmluZFN0eWxlIHtcclxuXHJcbiAgcmVhZG9ubHkgcm9vdDogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIHByaXZhdGUgZWxlbWVudHM6IEhUTUxFbGVtZW50W107XHJcblxyXG4gIHByaXZhdGUgX2lzSFRNTEVsZW1lbnQodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgSFRNTEVsZW1lbnQge1xyXG4gICAgcmV0dXJuICB0YXJnZXQgIT09IG51bGw7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9maW5kQ2hpbGRyZW4ocGFyZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgdGhpcy5lbGVtZW50cy5wdXNoKHBhcmVudCk7XHJcblxyXG4gICAgY29uc3QgY2hpbGRyZW4gPSBwYXJlbnQuY2hpbGRyZW47XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGNoaWxkcmVuLml0ZW0oaSk7XHJcblxyXG4gICAgICBpZiAoICEgdGhpcy5faXNIVE1MRWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuX2ZpbmRDaGlsZHJlbih0YXJnZXQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3Iocm9vdDogSFRNTEVsZW1lbnQpIHtcclxuICAgIHRoaXMucm9vdCA9IHJvb3Q7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50cyA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgIHRoaXMuX2ZpbmRDaGlsZHJlbihyb290KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBmaW5kKHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBIVE1MRWxlbWVudFtdIHtcclxuICAgIGxldCByZXN1bHQgPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gdGhpcy5lbGVtZW50cy5sZW5ndGg7IGkgPCBtYXg7IGkgPSAoaSArIDEpIHwgMCkge1xyXG4gICAgICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50c1tpXSkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSkgIT09IHZhbHVlKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJlc3VsdC5wdXNoKHRoaXMuZWxlbWVudHNbaV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge0Nvb3JkaW5hdGVzLCBJbmZvcm1hdGlvbn0gZnJvbSBcInNyYy9jbGFzcy9pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTaXppbmcge1xyXG5cclxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544GuIHdpbmRvdyB3aWR0aFxyXG4gIHJlYWRvbmx5IHdpbmRvd1dpZHRoOiBudW1iZXI7XHJcblxyXG4gIC8vY29uc3RydWN0b3IoKSDmmYLngrnjga4gd2luZG93IGhlaWdodFxyXG4gIHJlYWRvbmx5IHdpbmRvd0hlaWdodDogbnVtYmVyO1xyXG5cclxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544GuIGRvY3VtZW50IHdpZHRoXHJcbiAgcmVhZG9ubHkgZG9jdW1lbnRXaWR0aDogbnVtYmVyO1xyXG5cclxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544GuIGRvY3VtZW50IGhlaWdodFxyXG4gIHJlYWRvbmx5IGRvY3VtZW50SGVpZ2h0OiBudW1iZXI7XHJcblxyXG4gIC8v55S76Z2i57iu5bCP5q+U546HXHJcbiAgcmVhZG9ubHkgcmF0aW86IG51bWJlcjtcclxuXHJcbiAgLy/nlLvpnaLjgpLluYXjgajpq5jjgZXjga7jganjgaHjgonjgafnuK7lsI/jgZfjgZ/jgYtcclxuICByZWFkb25seSByYXRpb1R5cGU6ICd3aWR0aCcgfCAnaGVpZ2h0JztcclxuXHJcbiAgLy9kb2N1bWVudFdpZHRoIOOCkuePvuWcqOOBriB3aW5kb3dXaWR0aCDjga7lpKfjgY3jgZXjgafjgq3jg6Pjg5fjg4Hjg6PjgZnjgovjgavjga/mqKrjgavkvZXmnprjgq3jg6Pjg5fjg4Hjg6PjgYzlv4XopoHjgYtcclxuICByZWFkb25seSB3aWR0aENhcHR1cmVOdW1iZXI6IG51bWJlcjtcclxuXHJcbiAgLy9kb2N1bWVudEhlaWdodCDjgpLnj77lnKjjga4gd2luZG93SGVpZ2h0IOOBruWkp+OBjeOBleOBp+OCreODo+ODl+ODgeODo+OBmeOCi+OBq+OBr+e4puOBq+S9leaemuOCreODo+ODl+ODgeODo+OBjOW/heimgeOBi1xyXG4gIHJlYWRvbmx5IGhlaWdodENhcHR1cmVOdW1iZXI6IG51bWJlcjtcclxuXHJcbiAgLy/kuIroqJjkuozjgaTjga7kuZfnrpflgKRcclxuICByZWFkb25seSBjYXB0dXJlTnVtYmVyOiBudW1iZXI7XHJcblxyXG4gIC8vY29uc3RydWN0b3IoKSDmmYLngrnjga7jgrnjgq/jg63jg7zjg6vkvY3nva4o5qiqKVxyXG4gIHJlYWRvbmx5IHNjcm9sbFg6IG51bWJlcjtcclxuXHJcbiAgLy9jb25zdHJ1Y3RvcigpIOaZgueCueOBruOCueOCr+ODreODvOODq+S9jee9rijnuKYpXHJcbiAgcmVhZG9ubHkgc2Nyb2xsWTogbnVtYmVyO1xyXG5cclxuICAvL+OBk+OBruOCr+ODqeOCueOBjOaJseOBhiA8c3R5bGU+IOOCv+OCsOOBriBpZCDlsZ7mgKflgKRcclxuICByZWFkb25seSBTVFlMRV9JRDogc3RyaW5nO1xyXG5cclxuICAvKipcclxuICAgKiDjgZPjga7jgq/jg6njgrnjgYzku5XovrzjgpPjgaAgc3R5bGUg44K/44Kw44KS5YmK6Zmk44GZ44KLXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9yZW1vdmVTdHlsZSgpIHtcclxuICAgIC8v5YmK6Zmk5a++6LGh44Gu5Y+W5b6XXHJcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLlNUWUxFX0lEKTtcclxuXHJcbiAgICAvL3RhcmdldCDjgYzlrZjlnKjjgZfjgarjgYvjgaPjgZ/jgonkvZXjgoLjgZfjgarjgYRcclxuICAgIGlmICh0YXJnZXQgPT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5a++6LGh44KS5YmK6Zmk44GZ44KLXHJcbiAgICB0YXJnZXQucmVtb3ZlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzdHlsZSDjgr/jgrDjgpLmjL/lhaXjgZnjgotcclxuICAgKiDml6LjgavjgZPjga7jgq/jg6njgrnjgYzmibHjgaPjgabjgYTjgosgc3R5bGUg44GM5a2Y5Zyo44GX44Gf5aC05ZCI44Gv44Oq44K744OD44OI44GZ44KLXHJcbiAgICogQHBhcmFtIHN0eWxlXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9hcHBlbmRTdHlsZShzdHlsZTogc3RyaW5nKSB7XHJcbiAgICAvL+ODquOCu+ODg+ODiFxyXG4gICAgdGhpcy5fcmVtb3ZlU3R5bGUoKTtcclxuXHJcbiAgICAvL3N0eWxlIOOCv+OCsOOCkueUqOaEj1xyXG4gICAgY29uc3QgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICAgIHRhZy5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5TVFlMRV9JRCk7XHJcbiAgICB0YWcuaW5uZXJUZXh0ID0gc3R5bGU7XHJcblxyXG4gICAgLy90YWcg44K/44Kw5oy/5YWlXHJcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHRhZyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmjIflrprjgZXjgozjgZ8gaW5kZXgg44GL44KJ44K544Kv44Ot44O844Or44GZ44G544GN5bqn5qiZ44KS6L+U44GZXHJcbiAgICogQHBhcmFtIGluZGV4XHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9nZXRTY3JvbGxDb29yZGluYXRlcyhpbmRleDogbnVtYmVyKTogQ29vcmRpbmF0ZXMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDogTWF0aC5mbG9vcihpbmRleCAlIHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyKSAlIHRoaXMuY2FwdHVyZU51bWJlciAqIHRoaXMud2luZG93V2lkdGgsXHJcbiAgICAgIHk6IE1hdGguZmxvb3IoaW5kZXggLyB0aGlzLndpZHRoQ2FwdHVyZU51bWJlcikgJSB0aGlzLmNhcHR1cmVOdW1iZXIgKiB0aGlzLndpbmRvd0hlaWdodFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWQhOOCteOCpOOCuuaDheWgseOCkuWPluW+l+ODu+ioiOeul+ODu+S/neaMgeOBmeOCi1xyXG4gICAqIOWKoOOBiOOBpuW/heeUqOOBquWumuaVsOOCguS/neeuoeOBmeOCi1xyXG4gICAqL1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8v44Km44Kj44Oz44OJ44Km44K144Kk44K6XHJcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICB0aGlzLndpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICAvL+ODieOCreODpeODoeODs+ODiOOCteOCpOOCulxyXG4gICAgdGhpcy5kb2N1bWVudFdpZHRoID0gTWF0aC5tYXgoLi4uW2RvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgsIGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGgsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxXaWR0aCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXSk7XHJcbiAgICB0aGlzLmRvY3VtZW50SGVpZ2h0ID0gTWF0aC5tYXgoLi4uW2RvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0LCBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodF0pO1xyXG5cclxuICAgIC8v5bmF44Go6auY44GV44Gd44KM44Ge44KM44Gu5Ymy5ZCIXHJcbiAgICBjb25zdCB3aWR0aFJhdGlvID0gdGhpcy53aW5kb3dXaWR0aCAvIHRoaXMuZG9jdW1lbnRXaWR0aDtcclxuICAgIGNvbnN0IGhlaWdodFJhdGlvID0gdGhpcy53aW5kb3dIZWlnaHQgLyB0aGlzLmRvY3VtZW50SGVpZ2h0O1xyXG5cclxuICAgIC8vcmF0aW8g44GoIHJhdGlvVHlwZSDjga7jgrvjg4Pjg4hcclxuICAgIHRoaXMucmF0aW8gPSB3aWR0aFJhdGlvID4gaGVpZ2h0UmF0aW8gPyBoZWlnaHRSYXRpbyA6IHdpZHRoUmF0aW87XHJcbiAgICB0aGlzLnJhdGlvVHlwZSA9IHdpZHRoUmF0aW8gPiBoZWlnaHRSYXRpbyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcclxuXHJcbiAgICAvL3JhdGlvIOOBjCAxIOS7peS4iuOBoOOBo+OBn+OCiSAxIOOBqOOBmeOCi1xyXG4gICAgdGhpcy5yYXRpbyA9IHRoaXMucmF0aW8gPiAxID8gMSA6IHRoaXMucmF0aW87XHJcblxyXG4gICAgLy/nuKbjgajmqKrjgavjgYrjgYTjgabjgZ3jgozjgZ7jgoznj77lnKjjga7jgqbjgqPjg7Pjg4njgqbjgrXjgqTjgrrkvZXmnprliIbjgaflhajnlLvpnaLjgpLmjZXmjYnjgafjgY3jgovjgYvjga7mlbDlgKTjgpLnrpflh7pcclxuICAgIHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyID0gTWF0aC5jZWlsKHRoaXMuZG9jdW1lbnRXaWR0aCAvIHRoaXMud2luZG93V2lkdGgpO1xyXG4gICAgdGhpcy5oZWlnaHRDYXB0dXJlTnVtYmVyID0gTWF0aC5jZWlsKHRoaXMuZG9jdW1lbnRIZWlnaHQgLyB0aGlzLndpbmRvd0hlaWdodCk7XHJcblxyXG4gICAgLy/kuIroqJjkuozjgaTjga7kuZfnrpflgKRcclxuICAgIHRoaXMuY2FwdHVyZU51bWJlciA9IHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyICogdGhpcy5oZWlnaHRDYXB0dXJlTnVtYmVyO1xyXG5cclxuICAgIC8v54++5Zyo44Gu44K544Kv44Ot44O844Or5bqn5qiZ44KS6KiY6YyyXHJcbiAgICB0aGlzLnNjcm9sbFggPSB3aW5kb3cuc2Nyb2xsWDtcclxuICAgIHRoaXMuc2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZO1xyXG5cclxuICAgIC8vc3R5bGUg44K/44Kw44Gr5L2/55So44GZ44KLIGlkXHJcbiAgICB0aGlzLlNUWUxFX0lEID0gJ3NpemluZ18nK01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKC04KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaDheWgseOCkui/lOOBmVxyXG4gICAqIEByZXR1cm4ge3tkb2N1bWVudFdpZHRoOiBudW1iZXIgfCAqLCBkb2N1bWVudEhlaWdodDogbnVtYmVyIHwgKiwgd2luZG93SGVpZ2h0OiBudW1iZXIgfCAqLCByYXRpb1R5cGU6IHN0cmluZywgd2luZG93V2lkdGg6IG51bWJlciB8ICosIHJhdGlvOiAoKnxudW1iZXIpfX1cclxuICAgKi9cclxuICBwdWJsaWMgZ2V0SW5mb3JtYXRpb24oKTogSW5mb3JtYXRpb24ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgd2luZG93V2lkdGg6IHRoaXMud2luZG93V2lkdGgsXHJcbiAgICAgIHdpbmRvd0hlaWdodDogdGhpcy53aW5kb3dIZWlnaHQsXHJcbiAgICAgIGRvY3VtZW50V2lkdGg6IHRoaXMuZG9jdW1lbnRXaWR0aCxcclxuICAgICAgZG9jdW1lbnRIZWlnaHQ6IHRoaXMuZG9jdW1lbnRIZWlnaHQsXHJcbiAgICAgIHdpZHRoQ2FwdHVyZU51bWJlcjogdGhpcy53aWR0aENhcHR1cmVOdW1iZXIsXHJcbiAgICAgIGhlaWdodENhcHR1cmVOdW1iZXI6IHRoaXMuaGVpZ2h0Q2FwdHVyZU51bWJlcixcclxuICAgICAgY2FwdHVyZU51bWJlcjogdGhpcy5jYXB0dXJlTnVtYmVyLFxyXG4gICAgICByYXRpbzogdGhpcy5yYXRpbyxcclxuICAgICAgcmF0aW9UeXBlOiB0aGlzLnJhdGlvVHlwZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44OV44Or44K144Kk44K655So44Gu44K144Kk44K444Oz44Kw5Yem55CG44KS6KGM44GGXHJcbiAgICovXHJcbiAgcHVibGljIGZ1bGxTaXppbmcoKTogQ29vcmRpbmF0ZXMge1xyXG4gICAgLy9zdHlsZSDjgr/jgrDjgpLnlJ/miJBcclxuICAgIHRoaXMuX2FwcGVuZFN0eWxlKCdib2R5e292ZXJmbG93OmhpZGRlbjt0cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0IHRvcDt0cmFuc2Zvcm06IHNjYWxlKCcrdGhpcy5yYXRpbysnKX0nKTtcclxuXHJcbiAgICAvL+OCueOCr+ODreODvOODq+S9jee9ruOCkiAwIOOBq+OBmeOCi1xyXG4gICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xyXG5cclxuICAgIC8vMCwgMCDjgpLov5TjgZlcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHg6IDAsXHJcbiAgICAgIHk6IDBcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjgq/jg63jg7zjg6vjg5Djg7zjgpLmtojjgZnjgaDjgZHjga7jgrXjgqTjgrjjg7PjgrDlh6bnkIbjgpLooYzjgYZcclxuICAgKiDjgrnjgq/jg63jg7zjg6vkvY3nva7jga8gaW5kZXgg55Wq5Y+344Gn5oyH5a6a44GZ44KLXHJcbiAgICog44GT44GuIGluZGV4IOeVquWPt+OBryBnZXRJbmZvcm1hdGlvbigpIOOBp+WPluW+l+OBp+OBjeOCiyBjYXB0dXJlTnVtYmVyIOOBruevhOWbsuOBp+aMh+WumuOBl+OAgVxyXG4gICAqIOS+i+OBiOOBsFxyXG4gICAqIHdpZHRoQ2FwdHVyZU51bWJlciA9IDRcclxuICAgKiBoZWlnaHRDYXB0dXJlTnVtYmVyID0gM1xyXG4gICAqIGNhcHR1cmVOdW1iZXIgPSAxMlxyXG4gICAqIOOBoOOBo+OBn+WgtOWQiOOBr1xyXG4gICAqICstLS0tKy0tLS0rLS0tLSstLS0tK1xyXG4gICAqIHwgIDAgIHwgIDEgIHwgIDIgIHwgIDMgIHxcclxuICAgKiArLS0tLSstLS0tKy0tLS0rLS0tLStcclxuICAgKiB8ICA0ICB8ICA1ICB8ICA2ICB8ICA3ICB8XHJcbiAgICogKy0tLS0rLS0tLSstLS0tKy0tLS0rXHJcbiAgICogfCAgOCAgfCAgOSAgfCAxMCB8IDExIHxcclxuICAgKiArLS0tLSstLS0tKy0tLS0rLS0tLStcclxuICAgKiDjgajjgYTjgaPjgZ/lkITjg57jgrnjga7lt6bkuIrluqfmqJnjgbjjgrnjgq/jg63jg7zjg6vjgZnjgovjgZPjgajjgavjgarjgotcclxuICAgKiDlkITjg57jgrnjga4gd2lkdGgsIGhlaWdodCA9IHdpbmRvd1dpZHRoLCB3aW5kb3dIZWlnaHRcclxuICAgKiDlpKfmnqDjga4gd2lkdGgsIGhlaWdodCA9IGRvY3VtZW50V2lkdGgsIGRvY3VtZW50SGVpZ2h0XHJcbiAgICovXHJcbiAgcHVibGljIGRpc3BsYXlTaXppbmcoaW5kZXg6IG51bWJlcnxudWxsID0gbnVsbCk6IENvb3JkaW5hdGVzIHtcclxuICAgIC8vc3R5bGUg44K/44Kw44KS55Sf5oiQXHJcbiAgICB0aGlzLl9hcHBlbmRTdHlsZSgnaHRtbHtvdmVyZmxvdzpoaWRkZW59Jyk7XHJcblxyXG4gICAgLy/np7vli5XlhYjluqfmqJnjga7lrprnvqlcclxuICAgIGxldCBjb29yZGluYXRlczogQ29vcmRpbmF0ZXMgPSB7XHJcbiAgICAgIHg6IDAsXHJcbiAgICAgIHk6IDBcclxuICAgIH07XHJcblxyXG4gICAgLy/jgrnjgq/jg63jg7zjg6vmjIflrprjgYzjgYLjgozjgbDjgZ3jga7luqfmqJnjgacgY29vcmRpbmF0ZXMg44KS5LiK5pu444GNXHJcbiAgICBpZiAoaW5kZXggIT09IG51bGwpIHtcclxuICAgICAgY29vcmRpbmF0ZXMgPSB0aGlzLl9nZXRTY3JvbGxDb29yZGluYXRlcyhpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/jgrnjgq/jg63jg7zjg6vjga7lrp/ooYxcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0uc2Nyb2xsVG8oY29vcmRpbmF0ZXMueCwgY29vcmRpbmF0ZXMueSk7XHJcblxyXG4gICAgLy/jgrnjgq/jg63jg7zjg6vmg4XloLHjgpLov5TjgZlcclxuICAgIHJldHVybiBjb29yZGluYXRlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCteOCpOOCuOODs+OCsOOBruODquOCu+ODg+ODiFxyXG4gICAqIOOCueOCr+ODreODvOODq+S9jee9ruOCguODquOCu+ODg+ODiOOBmeOCi1xyXG4gICAqL1xyXG4gIHB1YmxpYyByZXNldFNpemluZygpOiBDb29yZGluYXRlcyB7XHJcbiAgICAvL3N0eWxlIOOBruODquOCu+ODg+ODiFxyXG4gICAgdGhpcy5fcmVtb3ZlU3R5bGUoKTtcclxuXHJcbiAgICAvL+OCueOCr+ODreODvOODq+S9jee9ruOBruODquOCu+ODg+ODiFxyXG4gICAgd2luZG93LnNjcm9sbFRvKHRoaXMuc2Nyb2xsWCwgdGhpcy5zY3JvbGxZKTtcclxuXHJcbiAgICAvL+OCueOCr+ODreODvOODq+S9jee9ruOCkui/lOOBmVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDogdGhpcy5zY3JvbGxYLFxyXG4gICAgICB5OiB0aGlzLnNjcm9sbFlcclxuICAgIH07XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge1JhbmdlLCBDb29yZGluYXRlc30gZnJvbSBcIi4vY2xhc3MvaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7U2l6aW5nfSBmcm9tIFwiLi9jbGFzcy9TaXppbmdcIjtcclxuaW1wb3J0IHtGaW5kU3R5bGV9IGZyb20gXCIuL2NsYXNzL0ZpbmRTdHlsZVwiO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuXHJcbiAgLy/jgrXjgqTjgrrjgpLlj5blvpfjgZnjgovjgZ/jgoHjga7jgq/jg6njgrlcclxuICBjb25zdCBzaXppbmcgPSBuZXcgU2l6aW5nKCk7XHJcblxyXG4gIC8vcG9zaXRpb246IGZpeGVkIOOCkuaOoeeUqOOBl+OBpuOBhOOCi+imgee0oFxyXG4gIGxldCBmaXhlZEVsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XHJcblxyXG4gIC8vcG9zaXRpb246IGZpeGVkIOOCkuaOoeeUqOOBl+OBpuOBhOOCi+imgee0oOOCkueiuuS/neOBmeOCi1xyXG4gIGNvbnN0IGdldEZpeGVkID0gKCkgPT4ge1xyXG4gICAgY29uc3QgZmluZFN0eWxlID0gbmV3IEZpbmRTdHlsZShkb2N1bWVudC5ib2R5KTtcclxuICAgIGZpeGVkRWxlbWVudHMgPSBmaW5kU3R5bGUuZmluZCgncG9zaXRpb24nLCAnZml4ZWQnKTtcclxuICB9XHJcblxyXG4gIC8vcG9zaXRpb246IGZpeGVkIOOCkuaOoeeUqOOBl+OBpuOBhOOCi+imgee0oOOCkumdnuihqOekuuOBq+OBmeOCiyBvciDlhYPjgavmiLvjgZlcclxuICBjb25zdCBjb250cm9sRml4ZWQgPSAocHJvcGVydHk6ICdoaWRkZW4nIHwgJycpID0+IHtcclxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBmaXhlZEVsZW1lbnRzLmxlbmd0aDsgaSA8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XHJcbiAgICAgIGZpeGVkRWxlbWVudHNbaV0uc3R5bGUudmlzaWJpbGl0eSA9IHByb3BlcnR5O1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8v6KGo56S644GV44KM44Gm44GE44KL44K/44OW44Gu5oOF5aCx44KS6L+U44GZXHJcbiAgY29uc3QgaW5mb3JtYXRpb24gPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gc2l6aW5nLmdldEluZm9ybWF0aW9uKCk7XHJcbiAgfTtcclxuXHJcbiAgLy/jg5bjg6njgqbjgrbjga7lpKfjgY3jgZXjgpLpganliIfjgarjgoLjga7jgavlpInjgYjjgotcclxuICBjb25zdCBzdHlsaW5nID0gKHJhbmdlOiBSYW5nZSwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgLy/lh6bnkIbntYLkuoblvozjga7luqfmqJnmg4XloLFcclxuICAgIGxldCBjb29yZGluYXRlOiBDb29yZGluYXRlcyA9IHtcclxuICAgICAgeDogMCxcclxuICAgICAgeTogMFxyXG4gICAgfTtcclxuXHJcbiAgICAvL3JhbmdlIOOBq+OCiOOBo+OBpuWHpueQhuOCkuWIhuOBkeOCi1xyXG4gICAgc3dpdGNoIChyYW5nZSkge1xyXG4gICAgICBjYXNlICdmdWxsJzpcclxuICAgICAgICBjb29yZGluYXRlID0gc2l6aW5nLmZ1bGxTaXppbmcoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAncGVyZmVjdCc6XHJcbiAgICAgICAgY29vcmRpbmF0ZSA9IHNpemluZy5kaXNwbGF5U2l6aW5nKGluZGV4KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb29yZGluYXRlID0gc2l6aW5nLmRpc3BsYXlTaXppbmcobnVsbCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgLy/luqfmqJnmg4XloLHjgpLov5TjgZlcclxuICAgIHJldHVybiBjb29yZGluYXRlO1xyXG4gIH07XHJcblxyXG4gIC8v44OW44Op44Km44K244Gu5aSn44GN44GV44KS5YWD44Gr5oi744GZXHJcbiAgY29uc3QgYmFjayA9ICgpID0+IHtcclxuICAgIHNpemluZy5yZXNldFNpemluZygpO1xyXG4gIH07XHJcblxyXG4gIC8v44Oh44OD44K744O844K444OR44OD44K344Oz44KwXHJcbiAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xyXG4gICAgLy8g5Y+X44GR5Y+W44Gj44Gf5YCk44Gn5YiG5bKQXHJcbiAgICBzd2l0Y2ggKHJlcXVlc3QudHlwZSkge1xyXG4gICAgICBjYXNlICdpbmZvcm1hdGlvbic6XHJcbiAgICAgICAgc2VuZFJlc3BvbnNlKGluZm9ybWF0aW9uKCkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzaXppbmcnOlxyXG4gICAgICAgIHNlbmRSZXNwb25zZShzdHlsaW5nKHJlcXVlc3QucmFuZ2UsIHJlcXVlc3QuaW5kZXgpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAna2lsbEZpeGVkJzpcclxuICAgICAgICBjb250cm9sRml4ZWQoJ2hpZGRlbicpO1xyXG4gICAgICAgIHNlbmRSZXNwb25zZSh7fSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2JhY2snOlxyXG4gICAgICAgIGNvbnRyb2xGaXhlZCgnJyk7XHJcbiAgICAgICAgYmFjaygpO1xyXG4gICAgICAgIHNlbmRSZXNwb25zZSh7fSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgc2VuZFJlc3BvbnNlKHt9KTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy9wb3NpdGlvbjogZml4ZWQg44KS5o6h55So44GX44Gm44GE44KL6KaB57Sg44Gu56K65L+dXHJcbiAgZ2V0Rml4ZWQoKTtcclxuXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9