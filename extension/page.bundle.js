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
    /**
     * target が null でないことを保証する Type guard
     * HTMLElement.children から取ってきたオブジェクトに対して用いる
     * @param target
     * @private
     */
    _isHTMLElement(target) {
        return target !== null;
    }
    /**
     * parent 下にぶら下がる DOM ツリーを再帰的に取得し、this.elements に追加する
     * @param parent
     * @private
     */
    _findChildren(parent) {
        //自身をpush
        this.elements.push(parent);
        //子要素の取得
        const children = parent.children;
        for (let i = 0, max = children.length; i < max; i = (i + 1) | 0) {
            //タイプガードを通すため、一旦変数へ格納
            const target = children.item(i);
            //target が null でないことを保証
            if (!this._isHTMLElement(target)) {
                continue;
            }
            //再帰的にこの関数を呼ぶ
            this._findChildren(target);
        }
    }
    /**
     * ドキュメントルートを確保し、検索対象の要素を捕捉する
     * @param root
     */
    constructor(root) {
        //検索対象ツリーの親要素を登録
        this.root = root;
        //検索結果配列を初期化
        this.elements = new Array();
        //検索開始
        this._findChildren(root);
    }
    /**
     * css として property: value が適用されている要素を this.elements から取得する
     * @param property
     * @param value
     */
    find(property, value) {
        //このメソッドが返す配列の用意
        let result = new Array();
        //捕捉済みの要素を逐一検索
        for (let i = 0, max = this.elements.length; i < max; i = (i + 1) | 0) {
            //計算済み css が合致していなかったらスルー
            if (window.getComputedStyle(this.elements[i]).getPropertyValue(property) !== value) {
                continue;
            }
            //該当要素として検索結果配列に追加
            result.push(this.elements[i]);
        }
        //該当要素を返す
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
            ratioType: this.ratioType,
            scrollX: this.scrollX,
            scrollY: this.scrollY
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
     * index が null だった場合はスクロールを変更しない
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
        //index 指定が無かったら現在のスクロール位置を返す
        if (index === null) {
            return {
                x: document.getElementsByTagName('html')[0].scrollTop,
                y: document.getElementsByTagName('html')[0].scrollLeft
            };
        }
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
    resetSizing(coordinates) {
        //style のリセット
        this._removeStyle();
        //現在のスクロール位置を取得
        const beforeCoordinates = {
            x: document.getElementsByTagName('html')[0].scrollTop,
            y: document.getElementsByTagName('html')[0].scrollLeft
        };
        //スクロール位置を coordinates へリセット
        document.getElementsByTagName('html')[0].scrollTo(coordinates.x, coordinates.y);
        //修正前のスクロール位置を返す
        return beforeCoordinates;
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
    const resetSizing = (coordinates) => {
        sizing.resetSizing(coordinates);
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
            case 'resetSizing':
                controlFixed('');
                resetSizing({ x: request.x, y: request.y });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzL0ZpbmRTdHlsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MvU2l6aW5nLnRzIiwid2VicGFjazovLy8uL3NyYy9wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFPLE1BQU0sU0FBUztJQWNwQjs7Ozs7T0FLRztJQUNLLGNBQWMsQ0FBQyxNQUFXO1FBQ2hDLE9BQVEsTUFBTSxLQUFLLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGFBQWEsQ0FBQyxNQUFtQjtRQUN2QyxTQUFTO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFM0IsUUFBUTtRQUNSLE1BQU0sUUFBUSxHQUFHLE1B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aGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3BhZ2UudHNcIik7XG4iLCJleHBvcnQgY2xhc3MgRmluZFN0eWxlIHtcclxuXHJcbiAgLyoqXHJcbiAgICogY29uc3RydWN0b3Ig44Gn5oy/5YWl44GZ44KLIEhUTUxFbGVtZW50XHJcbiAgICog44GT44Gu6KaB57Sg44Gr44G244KJ5LiL44GM44Gj44Gm44GE44KLIERPTSDjg4Tjg6rjg7zjgYzlr77osaFcclxuICAgKi9cclxuICByZWFkb25seSByb290OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgLyoqXHJcbiAgICogcm9vdCDkuIvjga7lhaggSFRNTEVsZW1lbnRcclxuICAgKiDpmo7lsaTmpa7jga/nhKHjgY/jgIHkuIDmrKHlhYPphY3liJfjgajjgZfjgabmjZXmjYlcclxuICAgKi9cclxuICBwcml2YXRlIGVsZW1lbnRzOiBIVE1MRWxlbWVudFtdO1xyXG5cclxuICAvKipcclxuICAgKiB0YXJnZXQg44GMIG51bGwg44Gn44Gq44GE44GT44Go44KS5L+d6Ki844GZ44KLIFR5cGUgZ3VhcmRcclxuICAgKiBIVE1MRWxlbWVudC5jaGlsZHJlbiDjgYvjgonlj5bjgaPjgabjgY3jgZ/jgqrjg5bjgrjjgqfjgq/jg4jjgavlr77jgZfjgabnlKjjgYTjgotcclxuICAgKiBAcGFyYW0gdGFyZ2V0XHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9pc0hUTUxFbGVtZW50KHRhcmdldDogYW55KTogdGFyZ2V0IGlzIEhUTUxFbGVtZW50IHtcclxuICAgIHJldHVybiAgdGFyZ2V0ICE9PSBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcGFyZW50IOS4i+OBq+OBtuOCieS4i+OBjOOCiyBET00g44OE44Oq44O844KS5YaN5biw55qE44Gr5Y+W5b6X44GX44CBdGhpcy5lbGVtZW50cyDjgavov73liqDjgZnjgotcclxuICAgKiBAcGFyYW0gcGFyZW50XHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9maW5kQ2hpbGRyZW4ocGFyZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgLy/oh6rouqvjgpJwdXNoXHJcbiAgICB0aGlzLmVsZW1lbnRzLnB1c2gocGFyZW50KTtcclxuXHJcbiAgICAvL+WtkOimgee0oOOBruWPluW+l1xyXG4gICAgY29uc3QgY2hpbGRyZW4gPSBwYXJlbnQuY2hpbGRyZW47XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XHJcbiAgICAgIC8v44K/44Kk44OX44Ks44O844OJ44KS6YCa44GZ44Gf44KB44CB5LiA5pem5aSJ5pWw44G45qC857SNXHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGNoaWxkcmVuLml0ZW0oaSk7XHJcblxyXG4gICAgICAvL3RhcmdldCDjgYwgbnVsbCDjgafjgarjgYTjgZPjgajjgpLkv53oqLxcclxuICAgICAgaWYgKCAhIHRoaXMuX2lzSFRNTEVsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvL+WGjeW4sOeahOOBq+OBk+OBrumWouaVsOOCkuWRvOOBtlxyXG4gICAgICB0aGlzLl9maW5kQ2hpbGRyZW4odGFyZ2V0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOODieOCreODpeODoeODs+ODiOODq+ODvOODiOOCkueiuuS/neOBl+OAgeaknOe0ouWvvuixoeOBruimgee0oOOCkuaNleaNieOBmeOCi1xyXG4gICAqIEBwYXJhbSByb290XHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iocm9vdDogSFRNTEVsZW1lbnQpIHtcclxuICAgIC8v5qSc57Si5a++6LGh44OE44Oq44O844Gu6Kaq6KaB57Sg44KS55m76YyyXHJcbiAgICB0aGlzLnJvb3QgPSByb290O1xyXG5cclxuICAgIC8v5qSc57Si57WQ5p6c6YWN5YiX44KS5Yid5pyf5YyWXHJcbiAgICB0aGlzLmVsZW1lbnRzID0gbmV3IEFycmF5KCk7XHJcblxyXG4gICAgLy/mpJzntKLplovlp4tcclxuICAgIHRoaXMuX2ZpbmRDaGlsZHJlbihyb290KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNzcyDjgajjgZfjgaYgcHJvcGVydHk6IHZhbHVlIOOBjOmBqeeUqOOBleOCjOOBpuOBhOOCi+imgee0oOOCkiB0aGlzLmVsZW1lbnRzIOOBi+OCieWPluW+l+OBmeOCi1xyXG4gICAqIEBwYXJhbSBwcm9wZXJ0eVxyXG4gICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBmaW5kKHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBIVE1MRWxlbWVudFtdIHtcclxuICAgIC8v44GT44Gu44Oh44K944OD44OJ44GM6L+U44GZ6YWN5YiX44Gu55So5oSPXHJcbiAgICBsZXQgcmVzdWx0ID0gbmV3IEFycmF5KCk7XHJcblxyXG4gICAgLy/mjZXmjYnmuIjjgb/jga7opoHntKDjgpLpgJDkuIDmpJzntKJcclxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSB0aGlzLmVsZW1lbnRzLmxlbmd0aDsgaSA8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XHJcbiAgICAgIC8v6KiI566X5riI44G/IGNzcyDjgYzlkIjoh7TjgZfjgabjgYTjgarjgYvjgaPjgZ/jgonjgrnjg6vjg7xcclxuICAgICAgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudHNbaV0pLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpICE9PSB2YWx1ZSkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvL+ipsuW9k+imgee0oOOBqOOBl+OBpuaknOe0oue1kOaenOmFjeWIl+OBq+i/veWKoFxyXG4gICAgICByZXN1bHQucHVzaCh0aGlzLmVsZW1lbnRzW2ldKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+ipsuW9k+imgee0oOOCkui/lOOBmVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7Q29vcmRpbmF0ZXMsIEluZm9ybWF0aW9ufSBmcm9tIFwic3JjL2NsYXNzL2ludGVyZmFjZVwiO1xuXG5leHBvcnQgY2xhc3MgU2l6aW5nIHtcblxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544GuIHdpbmRvdyB3aWR0aFxuICByZWFkb25seSB3aW5kb3dXaWR0aDogbnVtYmVyO1xuXG4gIC8vY29uc3RydWN0b3IoKSDmmYLngrnjga4gd2luZG93IGhlaWdodFxuICByZWFkb25seSB3aW5kb3dIZWlnaHQ6IG51bWJlcjtcblxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544GuIGRvY3VtZW50IHdpZHRoXG4gIHJlYWRvbmx5IGRvY3VtZW50V2lkdGg6IG51bWJlcjtcblxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544GuIGRvY3VtZW50IGhlaWdodFxuICByZWFkb25seSBkb2N1bWVudEhlaWdodDogbnVtYmVyO1xuXG4gIC8v55S76Z2i57iu5bCP5q+U546HXG4gIHJlYWRvbmx5IHJhdGlvOiBudW1iZXI7XG5cbiAgLy/nlLvpnaLjgpLluYXjgajpq5jjgZXjga7jganjgaHjgonjgafnuK7lsI/jgZfjgZ/jgYtcbiAgcmVhZG9ubHkgcmF0aW9UeXBlOiAnd2lkdGgnIHwgJ2hlaWdodCc7XG5cbiAgLy9kb2N1bWVudFdpZHRoIOOCkuePvuWcqOOBriB3aW5kb3dXaWR0aCDjga7lpKfjgY3jgZXjgafjgq3jg6Pjg5fjg4Hjg6PjgZnjgovjgavjga/mqKrjgavkvZXmnprjgq3jg6Pjg5fjg4Hjg6PjgYzlv4XopoHjgYtcbiAgcmVhZG9ubHkgd2lkdGhDYXB0dXJlTnVtYmVyOiBudW1iZXI7XG5cbiAgLy9kb2N1bWVudEhlaWdodCDjgpLnj77lnKjjga4gd2luZG93SGVpZ2h0IOOBruWkp+OBjeOBleOBp+OCreODo+ODl+ODgeODo+OBmeOCi+OBq+OBr+e4puOBq+S9leaemuOCreODo+ODl+ODgeODo+OBjOW/heimgeOBi1xuICByZWFkb25seSBoZWlnaHRDYXB0dXJlTnVtYmVyOiBudW1iZXI7XG5cbiAgLy/kuIroqJjkuozjgaTjga7kuZfnrpflgKRcbiAgcmVhZG9ubHkgY2FwdHVyZU51bWJlcjogbnVtYmVyO1xuXG4gIC8vY29uc3RydWN0b3IoKSDmmYLngrnjga7jgrnjgq/jg63jg7zjg6vkvY3nva4o5qiqKVxuICByZWFkb25seSBzY3JvbGxYOiBudW1iZXI7XG5cbiAgLy9jb25zdHJ1Y3RvcigpIOaZgueCueOBruOCueOCr+ODreODvOODq+S9jee9rijnuKYpXG4gIHJlYWRvbmx5IHNjcm9sbFk6IG51bWJlcjtcblxuICAvL+OBk+OBruOCr+ODqeOCueOBjOaJseOBhiA8c3R5bGU+IOOCv+OCsOOBriBpZCDlsZ7mgKflgKRcbiAgcmVhZG9ubHkgU1RZTEVfSUQ6IHN0cmluZztcblxuICAvKipcbiAgICog44GT44Gu44Kv44Op44K544GM5LuV6L6844KT44GgIHN0eWxlIOOCv+OCsOOCkuWJiumZpOOBmeOCi1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmVtb3ZlU3R5bGUoKSB7XG4gICAgLy/liYrpmaTlr77osaHjga7lj5blvpdcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLlNUWUxFX0lEKTtcblxuICAgIC8vdGFyZ2V0IOOBjOWtmOWcqOOBl+OBquOBi+OBo+OBn+OCieS9leOCguOBl+OBquOBhFxuICAgIGlmICh0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvL+WvvuixoeOCkuWJiumZpOOBmeOCi1xuICAgIHRhcmdldC5yZW1vdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdHlsZSDjgr/jgrDjgpLmjL/lhaXjgZnjgotcbiAgICog5pei44Gr44GT44Gu44Kv44Op44K544GM5omx44Gj44Gm44GE44KLIHN0eWxlIOOBjOWtmOWcqOOBl+OBn+WgtOWQiOOBr+ODquOCu+ODg+ODiOOBmeOCi1xuICAgKiBAcGFyYW0gc3R5bGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX2FwcGVuZFN0eWxlKHN0eWxlOiBzdHJpbmcpIHtcbiAgICAvL+ODquOCu+ODg+ODiFxuICAgIHRoaXMuX3JlbW92ZVN0eWxlKCk7XG5cbiAgICAvL3N0eWxlIOOCv+OCsOOCkueUqOaEj1xuICAgIGNvbnN0IHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgdGFnLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLlNUWUxFX0lEKTtcbiAgICB0YWcuaW5uZXJUZXh0ID0gc3R5bGU7XG5cbiAgICAvL3RhZyDjgr/jgrDmjL/lhaVcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHRhZyk7XG4gIH1cblxuICAvKipcbiAgICog5oyH5a6a44GV44KM44GfIGluZGV4IOOBi+OCieOCueOCr+ODreODvOODq+OBmeOBueOBjeW6p+aomeOCkui/lOOBmVxuICAgKiBAcGFyYW0gaW5kZXhcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX2dldFNjcm9sbENvb3JkaW5hdGVzKGluZGV4OiBudW1iZXIpOiBDb29yZGluYXRlcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IE1hdGguZmxvb3IoaW5kZXggJSB0aGlzLndpZHRoQ2FwdHVyZU51bWJlcikgJSB0aGlzLmNhcHR1cmVOdW1iZXIgKiB0aGlzLndpbmRvd1dpZHRoLFxuICAgICAgeTogTWF0aC5mbG9vcihpbmRleCAvIHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyKSAlIHRoaXMuY2FwdHVyZU51bWJlciAqIHRoaXMud2luZG93SGVpZ2h0XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiDlkITjgrXjgqTjgrrmg4XloLHjgpLlj5blvpfjg7voqIjnrpfjg7vkv53mjIHjgZnjgotcbiAgICog5Yqg44GI44Gm5b+F55So44Gq5a6a5pWw44KC5L+d566h44GZ44KLXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgLy/jgqbjgqPjg7Pjg4njgqbjgrXjgqTjgrpcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgdGhpcy53aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAvL+ODieOCreODpeODoeODs+ODiOOCteOCpOOCulxuICAgIHRoaXMuZG9jdW1lbnRXaWR0aCA9IE1hdGgubWF4KC4uLltkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoLCBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGgsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aF0pO1xuICAgIHRoaXMuZG9jdW1lbnRIZWlnaHQgPSBNYXRoLm1heCguLi5bZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQsIGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XSk7XG5cbiAgICAvL+W5heOBqOmrmOOBleOBneOCjOOBnuOCjOOBruWJsuWQiFxuICAgIGNvbnN0IHdpZHRoUmF0aW8gPSB0aGlzLndpbmRvd1dpZHRoIC8gdGhpcy5kb2N1bWVudFdpZHRoO1xuICAgIGNvbnN0IGhlaWdodFJhdGlvID0gdGhpcy53aW5kb3dIZWlnaHQgLyB0aGlzLmRvY3VtZW50SGVpZ2h0O1xuXG4gICAgLy9yYXRpbyDjgaggcmF0aW9UeXBlIOOBruOCu+ODg+ODiFxuICAgIHRoaXMucmF0aW8gPSB3aWR0aFJhdGlvID4gaGVpZ2h0UmF0aW8gPyBoZWlnaHRSYXRpbyA6IHdpZHRoUmF0aW87XG4gICAgdGhpcy5yYXRpb1R5cGUgPSB3aWR0aFJhdGlvID4gaGVpZ2h0UmF0aW8gPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG5cbiAgICAvL3JhdGlvIOOBjCAxIOS7peS4iuOBoOOBo+OBn+OCiSAxIOOBqOOBmeOCi1xuICAgIHRoaXMucmF0aW8gPSB0aGlzLnJhdGlvID4gMSA/IDEgOiB0aGlzLnJhdGlvO1xuXG4gICAgLy/nuKbjgajmqKrjgavjgYrjgYTjgabjgZ3jgozjgZ7jgoznj77lnKjjga7jgqbjgqPjg7Pjg4njgqbjgrXjgqTjgrrkvZXmnprliIbjgaflhajnlLvpnaLjgpLmjZXmjYnjgafjgY3jgovjgYvjga7mlbDlgKTjgpLnrpflh7pcbiAgICB0aGlzLndpZHRoQ2FwdHVyZU51bWJlciA9IE1hdGguY2VpbCh0aGlzLmRvY3VtZW50V2lkdGggLyB0aGlzLndpbmRvd1dpZHRoKTtcbiAgICB0aGlzLmhlaWdodENhcHR1cmVOdW1iZXIgPSBNYXRoLmNlaWwodGhpcy5kb2N1bWVudEhlaWdodCAvIHRoaXMud2luZG93SGVpZ2h0KTtcblxuICAgIC8v5LiK6KiY5LqM44Gk44Gu5LmX566X5YCkXG4gICAgdGhpcy5jYXB0dXJlTnVtYmVyID0gdGhpcy53aWR0aENhcHR1cmVOdW1iZXIgKiB0aGlzLmhlaWdodENhcHR1cmVOdW1iZXI7XG5cbiAgICAvL+ePvuWcqOOBruOCueOCr+ODreODvOODq+W6p+aomeOCkuiomOmMslxuICAgIHRoaXMuc2Nyb2xsWCA9IHdpbmRvdy5zY3JvbGxYO1xuICAgIHRoaXMuc2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZO1xuXG4gICAgLy9zdHlsZSDjgr/jgrDjgavkvb/nlKjjgZnjgosgaWRcbiAgICB0aGlzLlNUWUxFX0lEID0gJ3NpemluZ18nK01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKC04KTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmg4XloLHjgpLov5TjgZlcbiAgICogQHJldHVybiB7e2RvY3VtZW50V2lkdGg6IG51bWJlciB8ICosIGRvY3VtZW50SGVpZ2h0OiBudW1iZXIgfCAqLCB3aW5kb3dIZWlnaHQ6IG51bWJlciB8ICosIHJhdGlvVHlwZTogc3RyaW5nLCB3aW5kb3dXaWR0aDogbnVtYmVyIHwgKiwgcmF0aW86ICgqfG51bWJlcil9fVxuICAgKi9cbiAgcHVibGljIGdldEluZm9ybWF0aW9uKCk6IEluZm9ybWF0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgd2luZG93V2lkdGg6IHRoaXMud2luZG93V2lkdGgsXG4gICAgICB3aW5kb3dIZWlnaHQ6IHRoaXMud2luZG93SGVpZ2h0LFxuICAgICAgZG9jdW1lbnRXaWR0aDogdGhpcy5kb2N1bWVudFdpZHRoLFxuICAgICAgZG9jdW1lbnRIZWlnaHQ6IHRoaXMuZG9jdW1lbnRIZWlnaHQsXG4gICAgICB3aWR0aENhcHR1cmVOdW1iZXI6IHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyLFxuICAgICAgaGVpZ2h0Q2FwdHVyZU51bWJlcjogdGhpcy5oZWlnaHRDYXB0dXJlTnVtYmVyLFxuICAgICAgY2FwdHVyZU51bWJlcjogdGhpcy5jYXB0dXJlTnVtYmVyLFxuICAgICAgcmF0aW86IHRoaXMucmF0aW8sXG4gICAgICByYXRpb1R5cGU6IHRoaXMucmF0aW9UeXBlLFxuICAgICAgc2Nyb2xsWDogdGhpcy5zY3JvbGxYLFxuICAgICAgc2Nyb2xsWTogdGhpcy5zY3JvbGxZXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOODleODq+OCteOCpOOCuueUqOOBruOCteOCpOOCuOODs+OCsOWHpueQhuOCkuihjOOBhlxuICAgKi9cbiAgcHVibGljIGZ1bGxTaXppbmcoKTogQ29vcmRpbmF0ZXMge1xuICAgIC8vc3R5bGUg44K/44Kw44KS55Sf5oiQXG4gICAgdGhpcy5fYXBwZW5kU3R5bGUoJ2JvZHl7b3ZlcmZsb3c6aGlkZGVuO3RyYW5zZm9ybS1vcmlnaW46IGxlZnQgdG9wO3RyYW5zZm9ybTogc2NhbGUoJyt0aGlzLnJhdGlvKycpfScpO1xuXG4gICAgLy/jgrnjgq/jg63jg7zjg6vkvY3nva7jgpIgMCDjgavjgZnjgotcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG5cbiAgICAvLzAsIDAg44KS6L+U44GZXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgrnjgq/jg63jg7zjg6vjg5Djg7zjgpLmtojjgZnjgaDjgZHjga7jgrXjgqTjgrjjg7PjgrDlh6bnkIbjgpLooYzjgYZcbiAgICog44K544Kv44Ot44O844Or5L2N572u44GvIGluZGV4IOeVquWPt+OBp+aMh+WumuOBmeOCi1xuICAgKiBpbmRleCDjgYwgbnVsbCDjgaDjgaPjgZ/loLTlkIjjga/jgrnjgq/jg63jg7zjg6vjgpLlpInmm7TjgZfjgarjgYRcbiAgICog44GT44GuIGluZGV4IOeVquWPt+OBryBnZXRJbmZvcm1hdGlvbigpIOOBp+WPluW+l+OBp+OBjeOCiyBjYXB0dXJlTnVtYmVyIOOBruevhOWbsuOBp+aMh+WumuOBl+OAgVxuICAgKiDkvovjgYjjgbBcbiAgICogd2lkdGhDYXB0dXJlTnVtYmVyID0gNFxuICAgKiBoZWlnaHRDYXB0dXJlTnVtYmVyID0gM1xuICAgKiBjYXB0dXJlTnVtYmVyID0gMTJcbiAgICog44Gg44Gj44Gf5aC05ZCI44GvXG4gICAqICstLS0tKy0tLS0rLS0tLSstLS0tK1xuICAgKiB8ICAwICB8ICAxICB8ICAyICB8ICAzICB8XG4gICAqICstLS0tKy0tLS0rLS0tLSstLS0tK1xuICAgKiB8ICA0ICB8ICA1ICB8ICA2ICB8ICA3ICB8XG4gICAqICstLS0tKy0tLS0rLS0tLSstLS0tK1xuICAgKiB8ICA4ICB8ICA5ICB8IDEwIHwgMTEgfFxuICAgKiArLS0tLSstLS0tKy0tLS0rLS0tLStcbiAgICog44Go44GE44Gj44Gf5ZCE44Oe44K544Gu5bem5LiK5bqn5qiZ44G444K544Kv44Ot44O844Or44GZ44KL44GT44Go44Gr44Gq44KLXG4gICAqIOWQhOODnuOCueOBriB3aWR0aCwgaGVpZ2h0ID0gd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodFxuICAgKiDlpKfmnqDjga4gd2lkdGgsIGhlaWdodCA9IGRvY3VtZW50V2lkdGgsIGRvY3VtZW50SGVpZ2h0XG4gICAqL1xuICBwdWJsaWMgZGlzcGxheVNpemluZyhpbmRleDogbnVtYmVyfG51bGwgPSBudWxsKTogQ29vcmRpbmF0ZXMge1xuICAgIC8vc3R5bGUg44K/44Kw44KS55Sf5oiQXG4gICAgdGhpcy5fYXBwZW5kU3R5bGUoJ2h0bWx7b3ZlcmZsb3c6aGlkZGVufScpO1xuXG4gICAgLy9pbmRleCDmjIflrprjgYznhKHjgYvjgaPjgZ/jgonnj77lnKjjga7jgrnjgq/jg63jg7zjg6vkvY3nva7jgpLov5TjgZlcbiAgICBpZiAoaW5kZXggPT09IG51bGwpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0uc2Nyb2xsVG9wLFxuICAgICAgICB5OiBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaHRtbCcpWzBdLnNjcm9sbExlZnRcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy/np7vli5XlhYjluqfmqJnjga7lrprnvqlcbiAgICBsZXQgY29vcmRpbmF0ZXM6IENvb3JkaW5hdGVzID0ge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9O1xuXG4gICAgLy/jgrnjgq/jg63jg7zjg6vmjIflrprjgYzjgYLjgozjgbDjgZ3jga7luqfmqJnjgacgY29vcmRpbmF0ZXMg44KS5LiK5pu444GNXG4gICAgaWYgKGluZGV4ICE9PSBudWxsKSB7XG4gICAgICBjb29yZGluYXRlcyA9IHRoaXMuX2dldFNjcm9sbENvb3JkaW5hdGVzKGluZGV4KTtcbiAgICB9XG5cbiAgICAvL+OCueOCr+ODreODvOODq+OBruWun+ihjFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0uc2Nyb2xsVG8oY29vcmRpbmF0ZXMueCwgY29vcmRpbmF0ZXMueSk7XG5cbiAgICAvL+OCueOCr+ODreODvOODq+aDheWgseOCkui/lOOBmVxuICAgIHJldHVybiBjb29yZGluYXRlcztcbiAgfVxuXG4gIC8qKlxuICAgKiDjgrXjgqTjgrjjg7PjgrDjga7jg6rjgrvjg4Pjg4hcbiAgICog44K544Kv44Ot44O844Or5L2N572u44KC44Oq44K744OD44OI44GZ44KLXG4gICAqL1xuICBwdWJsaWMgcmVzZXRTaXppbmcoY29vcmRpbmF0ZXM6IENvb3JkaW5hdGVzKTogQ29vcmRpbmF0ZXMge1xuICAgIC8vc3R5bGUg44Gu44Oq44K744OD44OIXG4gICAgdGhpcy5fcmVtb3ZlU3R5bGUoKTtcblxuICAgIC8v54++5Zyo44Gu44K544Kv44Ot44O844Or5L2N572u44KS5Y+W5b6XXG4gICAgY29uc3QgYmVmb3JlQ29vcmRpbmF0ZXM6IENvb3JkaW5hdGVzID0ge1xuICAgICAgeDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXS5zY3JvbGxUb3AsXG4gICAgICB5OiBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaHRtbCcpWzBdLnNjcm9sbExlZnRcbiAgICB9O1xuXG4gICAgLy/jgrnjgq/jg63jg7zjg6vkvY3nva7jgpIgY29vcmRpbmF0ZXMg44G444Oq44K744OD44OIXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXS5zY3JvbGxUbyhjb29yZGluYXRlcy54LCBjb29yZGluYXRlcy55KTtcblxuICAgIC8v5L+u5q2j5YmN44Gu44K544Kv44Ot44O844Or5L2N572u44KS6L+U44GZXG4gICAgcmV0dXJuIGJlZm9yZUNvb3JkaW5hdGVzO1xuICB9XG5cbn1cbiIsImltcG9ydCB7UmFuZ2UsIENvb3JkaW5hdGVzfSBmcm9tIFwiLi9jbGFzcy9pbnRlcmZhY2VcIjtcbmltcG9ydCB7U2l6aW5nfSBmcm9tIFwiLi9jbGFzcy9TaXppbmdcIjtcbmltcG9ydCB7RmluZFN0eWxlfSBmcm9tIFwiLi9jbGFzcy9GaW5kU3R5bGVcIjtcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuXG4gIC8v44K144Kk44K644KS5Y+W5b6X44GZ44KL44Gf44KB44Gu44Kv44Op44K5XG4gIGNvbnN0IHNpemluZyA9IG5ldyBTaXppbmcoKTtcblxuICAvL3Bvc2l0aW9uOiBmaXhlZCDjgpLmjqHnlKjjgZfjgabjgYTjgovopoHntKBcbiAgbGV0IGZpeGVkRWxlbWVudHM6IEhUTUxFbGVtZW50W10gPSBbXTtcblxuICAvL3Bvc2l0aW9uOiBmaXhlZCDjgpLmjqHnlKjjgZfjgabjgYTjgovopoHntKDjgpLnorrkv53jgZnjgotcbiAgY29uc3QgZ2V0Rml4ZWQgPSAoKSA9PiB7XG4gICAgY29uc3QgZmluZFN0eWxlID0gbmV3IEZpbmRTdHlsZShkb2N1bWVudC5ib2R5KTtcbiAgICBmaXhlZEVsZW1lbnRzID0gZmluZFN0eWxlLmZpbmQoJ3Bvc2l0aW9uJywgJ2ZpeGVkJyk7XG4gIH1cblxuICAvL3Bvc2l0aW9uOiBmaXhlZCDjgpLmjqHnlKjjgZfjgabjgYTjgovopoHntKDjgpLpnZ7ooajnpLrjgavjgZnjgosgb3Ig5YWD44Gr5oi744GZXG4gIGNvbnN0IGNvbnRyb2xGaXhlZCA9IChwcm9wZXJ0eTogJ2hpZGRlbicgfCAnJykgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBmaXhlZEVsZW1lbnRzLmxlbmd0aDsgaSA8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XG4gICAgICBmaXhlZEVsZW1lbnRzW2ldLnN0eWxlLnZpc2liaWxpdHkgPSBwcm9wZXJ0eTtcbiAgICB9XG4gIH07XG5cbiAgLy/ooajnpLrjgZXjgozjgabjgYTjgovjgr/jg5bjga7mg4XloLHjgpLov5TjgZlcbiAgY29uc3QgaW5mb3JtYXRpb24gPSAoKSA9PiB7XG4gICAgcmV0dXJuIHNpemluZy5nZXRJbmZvcm1hdGlvbigpO1xuICB9O1xuXG4gIC8v44OW44Op44Km44K244Gu5aSn44GN44GV44KS6YGp5YiH44Gq44KC44Gu44Gr5aSJ44GI44KLXG4gIGNvbnN0IHN0eWxpbmcgPSAocmFuZ2U6IFJhbmdlLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgLy/lh6bnkIbntYLkuoblvozjga7luqfmqJnmg4XloLFcbiAgICBsZXQgY29vcmRpbmF0ZTogQ29vcmRpbmF0ZXMgPSB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH07XG5cbiAgICAvL3JhbmdlIOOBq+OCiOOBo+OBpuWHpueQhuOCkuWIhuOBkeOCi1xuICAgIHN3aXRjaCAocmFuZ2UpIHtcbiAgICAgIGNhc2UgJ2Z1bGwnOlxuICAgICAgICBjb29yZGluYXRlID0gc2l6aW5nLmZ1bGxTaXppbmcoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdwZXJmZWN0JzpcbiAgICAgICAgY29vcmRpbmF0ZSA9IHNpemluZy5kaXNwbGF5U2l6aW5nKGluZGV4KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb29yZGluYXRlID0gc2l6aW5nLmRpc3BsYXlTaXppbmcobnVsbCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8v5bqn5qiZ5oOF5aCx44KS6L+U44GZXG4gICAgcmV0dXJuIGNvb3JkaW5hdGU7XG4gIH07XG5cbiAgLy/jg5bjg6njgqbjgrbjga7lpKfjgY3jgZXjgpLlhYPjgavmiLvjgZlcbiAgY29uc3QgcmVzZXRTaXppbmcgPSAoY29vcmRpbmF0ZXM6IENvb3JkaW5hdGVzKSA9PiB7XG4gICAgc2l6aW5nLnJlc2V0U2l6aW5nKGNvb3JkaW5hdGVzKTtcbiAgfTtcblxuICAvL+ODoeODg+OCu+ODvOOCuOODkeODg+OCt+ODs+OCsFxuICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XG4gICAgLy8g5Y+X44GR5Y+W44Gj44Gf5YCk44Gn5YiG5bKQXG4gICAgc3dpdGNoIChyZXF1ZXN0LnR5cGUpIHtcbiAgICAgIGNhc2UgJ2luZm9ybWF0aW9uJzpcbiAgICAgICAgc2VuZFJlc3BvbnNlKGluZm9ybWF0aW9uKCkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3NpemluZyc6XG4gICAgICAgIHNlbmRSZXNwb25zZShzdHlsaW5nKHJlcXVlc3QucmFuZ2UsIHJlcXVlc3QuaW5kZXgpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdraWxsRml4ZWQnOlxuICAgICAgICBjb250cm9sRml4ZWQoJ2hpZGRlbicpO1xuICAgICAgICBzZW5kUmVzcG9uc2Uoe30pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3Jlc2V0U2l6aW5nJzpcbiAgICAgICAgY29udHJvbEZpeGVkKCcnKTtcbiAgICAgICAgcmVzZXRTaXppbmcoe3g6IHJlcXVlc3QueCwgeTogcmVxdWVzdC55fSk7XG4gICAgICAgIHNlbmRSZXNwb25zZSh7fSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgc2VuZFJlc3BvbnNlKHt9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9KTtcblxuICAvL3Bvc2l0aW9uOiBmaXhlZCDjgpLmjqHnlKjjgZfjgabjgYTjgovopoHntKDjga7norrkv51cbiAgZ2V0Rml4ZWQoKTtcblxufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9