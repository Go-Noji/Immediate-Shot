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
     * 各サイズ情報を取得・計算・保持する
     * 加えて必用な定数も保管する
     */
    constructor() {
        //constructor() 時点の window width
        this.windowWidth = 0;
        //constructor() 時点の window height
        this.windowHeight = 0;
        //constructor() 時点の document width
        this.documentWidth = 0;
        //constructor() 時点の document height
        this.documentHeight = 0;
        //画面縮小比率
        this.ratio = 0;
        //画面を幅と高さのどちらで縮小したか
        this.ratioType = 'height';
        //documentWidth を現在の windowWidth の大きさでキャプチャするには横に何枚キャプチャが必要か
        this.widthCaptureNumber = 0;
        //documentHeight を現在の windowHeight の大きさでキャプチャするには縦に何枚キャプチャが必要か
        this.heightCaptureNumber = 0;
        //上記二つの乗算値
        this.captureNumber = 0;
        //constructor() 時点のスクロール位置(横)
        this.scrollX = 0;
        //constructor() 時点のスクロール位置(縦)
        this.scrollY = 0;
        //style タグに使用する id
        this.STYLE_ID = 'sizing_' + Math.random().toString(36).slice(-8);
        //各種情報をセットする
        this._updateInformation();
    }
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
     * 各種情報をアップデートする
     * @private
     */
    _updateInformation() {
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
    }
    /**
     * 情報を返す
     * @return {{documentWidth: number | *, documentHeight: number | *, windowHeight: number | *, ratioType: string, windowWidth: number | *, ratio: (*|number)}}
     */
    getInformation() {
        //情報の更新
        this._updateInformation();
        //計算結果を返す
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
        //index 指定が無かったら style タグを適用の後、(0, 0)を返す
        if (index === null) {
            //style タグを生成
            this._appendStyle('body{overflow:hidden}');
            //(0, 0)返す
            return {
                x: 0,
                y: 0
            };
        }
        //もし index が 0 だったらスクロール位置を 0, 0 にする
        if (index === 0) {
            document.getElementsByTagName('html')[0].scrollTo(0, 0);
        }
        //移動先座標の定義
        const coordinates = this._getScrollCoordinates(index);
        //overflow スタイルの適用 & transform: translate による疑似的なスクロールの実行
        this._appendStyle('body{overflow:hidden;transform:translate(' + (coordinates.x * -1) + 'px,' + (coordinates.y * -1) + 'px)}');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzL0ZpbmRTdHlsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MvU2l6aW5nLnRzIiwid2VicGFjazovLy8uL3NyYy9wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFPLE1BQU0sU0FBUztJQWNwQjs7Ozs7T0FLRztJQUNLLGNBQWMsQ0FBQyxNQUFXO1FBQ2hDLE9BQVEsTUFBTSxLQUFLLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGFBQWEsQ0FBQyxNQUFtQjtRQUN2QyxTQUFTO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFM0IsUUFBUTtRQUNSLE1BQU0sUUFBUSxHQUFHLE1B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QUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELE1BQU07WUFDUixLQUFLLFdBQVc7Z0JBQ2QsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN2QixZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pCLE1BQU07WUFDUixLQUFLLGFBQWE7Z0JBQ2hCLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDakIsV0FBVyxDQUFDLEVBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO2dCQUMxQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pCLE1BQU07WUFDUjtnQkFDRSxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pCLE1BQU07U0FDVDtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsOEJBQThCO0lBQzlCLFFBQVEsRUFBRSxDQUFDO0FBRWIsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoicGFnZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9wYWdlLnRzXCIpO1xuIiwiZXhwb3J0IGNsYXNzIEZpbmRTdHlsZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIGNvbnN0cnVjdG9yIOOBp+aMv+WFpeOBmeOCiyBIVE1MRWxlbWVudFxyXG4gICAqIOOBk+OBruimgee0oOOBq+OBtuOCieS4i+OBjOOBo+OBpuOBhOOCiyBET00g44OE44Oq44O844GM5a++6LGhXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgcm9vdDogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIHJvb3Qg5LiL44Gu5YWoIEhUTUxFbGVtZW50XHJcbiAgICog6ZqO5bGk5qWu44Gv54Sh44GP44CB5LiA5qyh5YWD6YWN5YiX44Go44GX44Gm5o2V5o2JXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBlbGVtZW50czogSFRNTEVsZW1lbnRbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogdGFyZ2V0IOOBjCBudWxsIOOBp+OBquOBhOOBk+OBqOOCkuS/neiovOOBmeOCiyBUeXBlIGd1YXJkXHJcbiAgICogSFRNTEVsZW1lbnQuY2hpbGRyZW4g44GL44KJ5Y+W44Gj44Gm44GN44Gf44Kq44OW44K444Kn44Kv44OI44Gr5a++44GX44Gm55So44GE44KLXHJcbiAgICogQHBhcmFtIHRhcmdldFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfaXNIVE1MRWxlbWVudCh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBIVE1MRWxlbWVudCB7XHJcbiAgICByZXR1cm4gIHRhcmdldCAhPT0gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHBhcmVudCDkuIvjgavjgbbjgonkuIvjgYzjgosgRE9NIOODhOODquODvOOCkuWGjeW4sOeahOOBq+WPluW+l+OBl+OAgXRoaXMuZWxlbWVudHMg44Gr6L+95Yqg44GZ44KLXHJcbiAgICogQHBhcmFtIHBhcmVudFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZmluZENoaWxkcmVuKHBhcmVudDogSFRNTEVsZW1lbnQpIHtcclxuICAgIC8v6Ieq6Lqr44KScHVzaFxyXG4gICAgdGhpcy5lbGVtZW50cy5wdXNoKHBhcmVudCk7XHJcblxyXG4gICAgLy/lrZDopoHntKDjga7lj5blvpdcclxuICAgIGNvbnN0IGNoaWxkcmVuID0gcGFyZW50LmNoaWxkcmVuO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBtYXg7IGkgPSAoaSArIDEpIHwgMCkge1xyXG4gICAgICAvL+OCv+OCpOODl+OCrOODvOODieOCkumAmuOBmeOBn+OCgeOAgeS4gOaXpuWkieaVsOOBuOagvOe0jVxyXG4gICAgICBjb25zdCB0YXJnZXQgPSBjaGlsZHJlbi5pdGVtKGkpO1xyXG5cclxuICAgICAgLy90YXJnZXQg44GMIG51bGwg44Gn44Gq44GE44GT44Go44KS5L+d6Ki8XHJcbiAgICAgIGlmICggISB0aGlzLl9pc0hUTUxFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy/lho3luLDnmoTjgavjgZPjga7plqLmlbDjgpLlkbzjgbZcclxuICAgICAgdGhpcy5fZmluZENoaWxkcmVuKHRhcmdldCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjg4njgq3jg6Xjg6Hjg7Pjg4jjg6vjg7zjg4jjgpLnorrkv53jgZfjgIHmpJzntKLlr77osaHjga7opoHntKDjgpLmjZXmjYnjgZnjgotcclxuICAgKiBAcGFyYW0gcm9vdFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHJvb3Q6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAvL+aknOe0ouWvvuixoeODhOODquODvOOBruimquimgee0oOOCkueZu+mMslxyXG4gICAgdGhpcy5yb290ID0gcm9vdDtcclxuXHJcbiAgICAvL+aknOe0oue1kOaenOmFjeWIl+OCkuWIneacn+WMllxyXG4gICAgdGhpcy5lbGVtZW50cyA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgIC8v5qSc57Si6ZaL5aeLXHJcbiAgICB0aGlzLl9maW5kQ2hpbGRyZW4ocm9vdCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjc3Mg44Go44GX44GmIHByb3BlcnR5OiB2YWx1ZSDjgYzpgannlKjjgZXjgozjgabjgYTjgovopoHntKDjgpIgdGhpcy5lbGVtZW50cyDjgYvjgonlj5blvpfjgZnjgotcclxuICAgKiBAcGFyYW0gcHJvcGVydHlcclxuICAgKiBAcGFyYW0gdmFsdWVcclxuICAgKi9cclxuICBwdWJsaWMgZmluZChwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogSFRNTEVsZW1lbnRbXSB7XHJcbiAgICAvL+OBk+OBruODoeOCveODg+ODieOBjOi/lOOBmemFjeWIl+OBrueUqOaEj1xyXG4gICAgbGV0IHJlc3VsdCA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgIC8v5o2V5o2J5riI44G/44Gu6KaB57Sg44KS6YCQ5LiA5qSc57SiXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gdGhpcy5lbGVtZW50cy5sZW5ndGg7IGkgPCBtYXg7IGkgPSAoaSArIDEpIHwgMCkge1xyXG4gICAgICAvL+ioiOeul+a4iOOBvyBjc3Mg44GM5ZCI6Ie044GX44Gm44GE44Gq44GL44Gj44Gf44KJ44K544Or44O8XHJcbiAgICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRzW2ldKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KSAhPT0gdmFsdWUpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy/oqbLlvZPopoHntKDjgajjgZfjgabmpJzntKLntZDmnpzphY3liJfjgavov73liqBcclxuICAgICAgcmVzdWx0LnB1c2godGhpcy5lbGVtZW50c1tpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/oqbLlvZPopoHntKDjgpLov5TjgZlcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge0Nvb3JkaW5hdGVzLCBJbmZvcm1hdGlvbn0gZnJvbSBcInNyYy9jbGFzcy9pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTaXppbmcge1xyXG5cclxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544GuIHdpbmRvdyB3aWR0aFxyXG4gIHByaXZhdGUgd2luZG93V2lkdGg6IG51bWJlciA9IDA7XHJcblxyXG4gIC8vY29uc3RydWN0b3IoKSDmmYLngrnjga4gd2luZG93IGhlaWdodFxyXG4gIHByaXZhdGUgd2luZG93SGVpZ2h0OiBudW1iZXIgPSAwO1xyXG5cclxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544GuIGRvY3VtZW50IHdpZHRoXHJcbiAgcHJpdmF0ZSBkb2N1bWVudFdpZHRoOiBudW1iZXIgPSAwO1xyXG5cclxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544GuIGRvY3VtZW50IGhlaWdodFxyXG4gIHByaXZhdGUgZG9jdW1lbnRIZWlnaHQ6IG51bWJlciA9IDA7XHJcblxyXG4gIC8v55S76Z2i57iu5bCP5q+U546HXHJcbiAgcHJpdmF0ZSByYXRpbzogbnVtYmVyID0gMDtcclxuXHJcbiAgLy/nlLvpnaLjgpLluYXjgajpq5jjgZXjga7jganjgaHjgonjgafnuK7lsI/jgZfjgZ/jgYtcclxuICBwcml2YXRlIHJhdGlvVHlwZTogJ3dpZHRoJyB8ICdoZWlnaHQnID0gJ2hlaWdodCc7XHJcblxyXG4gIC8vZG9jdW1lbnRXaWR0aCDjgpLnj77lnKjjga4gd2luZG93V2lkdGgg44Gu5aSn44GN44GV44Gn44Kt44Oj44OX44OB44Oj44GZ44KL44Gr44Gv5qiq44Gr5L2V5p6a44Kt44Oj44OX44OB44Oj44GM5b+F6KaB44GLXHJcbiAgcHJpdmF0ZSB3aWR0aENhcHR1cmVOdW1iZXI6IG51bWJlciA9IDA7XHJcblxyXG4gIC8vZG9jdW1lbnRIZWlnaHQg44KS54++5Zyo44GuIHdpbmRvd0hlaWdodCDjga7lpKfjgY3jgZXjgafjgq3jg6Pjg5fjg4Hjg6PjgZnjgovjgavjga/nuKbjgavkvZXmnprjgq3jg6Pjg5fjg4Hjg6PjgYzlv4XopoHjgYtcclxuICBwcml2YXRlIGhlaWdodENhcHR1cmVOdW1iZXI6IG51bWJlciA9IDA7XHJcblxyXG4gIC8v5LiK6KiY5LqM44Gk44Gu5LmX566X5YCkXHJcbiAgcHJpdmF0ZSBjYXB0dXJlTnVtYmVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544Gu44K544Kv44Ot44O844Or5L2N572uKOaoqilcclxuICBwcml2YXRlIHNjcm9sbFg6IG51bWJlciA9IDA7XHJcblxyXG4gIC8vY29uc3RydWN0b3IoKSDmmYLngrnjga7jgrnjgq/jg63jg7zjg6vkvY3nva4o57imKVxyXG4gIHByaXZhdGUgc2Nyb2xsWTogbnVtYmVyID0gMDtcclxuXHJcbiAgLy/jgZPjga7jgq/jg6njgrnjgYzmibHjgYYgPHN0eWxlPiDjgr/jgrDjga4gaWQg5bGe5oCn5YCkXHJcbiAgcmVhZG9ubHkgU1RZTEVfSUQ6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICog44GT44Gu44Kv44Op44K544GM5LuV6L6844KT44GgIHN0eWxlIOOCv+OCsOOCkuWJiumZpOOBmeOCi1xyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcmVtb3ZlU3R5bGUoKSB7XHJcbiAgICAvL+WJiumZpOWvvuixoeOBruWPluW+l1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5TVFlMRV9JRCk7XHJcblxyXG4gICAgLy90YXJnZXQg44GM5a2Y5Zyo44GX44Gq44GL44Gj44Gf44KJ5L2V44KC44GX44Gq44GEXHJcbiAgICBpZiAodGFyZ2V0ID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvL+WvvuixoeOCkuWJiumZpOOBmeOCi1xyXG4gICAgdGFyZ2V0LnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogc3R5bGUg44K/44Kw44KS5oy/5YWl44GZ44KLXHJcbiAgICog5pei44Gr44GT44Gu44Kv44Op44K544GM5omx44Gj44Gm44GE44KLIHN0eWxlIOOBjOWtmOWcqOOBl+OBn+WgtOWQiOOBr+ODquOCu+ODg+ODiOOBmeOCi1xyXG4gICAqIEBwYXJhbSBzdHlsZVxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfYXBwZW5kU3R5bGUoc3R5bGU6IHN0cmluZykge1xyXG4gICAgLy/jg6rjgrvjg4Pjg4hcclxuICAgIHRoaXMuX3JlbW92ZVN0eWxlKCk7XHJcblxyXG4gICAgLy9zdHlsZSDjgr/jgrDjgpLnlKjmhI9cclxuICAgIGNvbnN0IHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcbiAgICB0YWcuc2V0QXR0cmlidXRlKCdpZCcsIHRoaXMuU1RZTEVfSUQpO1xyXG4gICAgdGFnLmlubmVyVGV4dCA9IHN0eWxlO1xyXG5cclxuICAgIC8vdGFnIOOCv+OCsOaMv+WFpVxyXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0YWcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5oyH5a6a44GV44KM44GfIGluZGV4IOOBi+OCieOCueOCr+ODreODvOODq+OBmeOBueOBjeW6p+aomeOCkui/lOOBmVxyXG4gICAqIEBwYXJhbSBpbmRleFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZ2V0U2Nyb2xsQ29vcmRpbmF0ZXMoaW5kZXg6IG51bWJlcik6IENvb3JkaW5hdGVzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHg6IE1hdGguZmxvb3IoaW5kZXggJSB0aGlzLndpZHRoQ2FwdHVyZU51bWJlcikgJSB0aGlzLmNhcHR1cmVOdW1iZXIgKiB0aGlzLndpbmRvd1dpZHRoLFxyXG4gICAgICB5OiBNYXRoLmZsb29yKGluZGV4IC8gdGhpcy53aWR0aENhcHR1cmVOdW1iZXIpICUgdGhpcy5jYXB0dXJlTnVtYmVyICogdGhpcy53aW5kb3dIZWlnaHRcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlkITnqK7mg4XloLHjgpLjgqLjg4Pjg5fjg4fjg7zjg4jjgZnjgotcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3VwZGF0ZUluZm9ybWF0aW9uKCkge1xyXG4gICAgLy/jgqbjgqPjg7Pjg4njgqbjgrXjgqTjgrpcclxuICAgIHRoaXMud2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgIHRoaXMud2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuICAgIC8v44OJ44Kt44Ol44Oh44Oz44OI44K144Kk44K6XHJcbiAgICB0aGlzLmRvY3VtZW50V2lkdGggPSBNYXRoLm1heCguLi5bZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCwgZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFdpZHRoLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGhdKTtcclxuICAgIHRoaXMuZG9jdW1lbnRIZWlnaHQgPSBNYXRoLm1heCguLi5bZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQsIGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XSk7XHJcblxyXG4gICAgLy/luYXjgajpq5jjgZXjgZ3jgozjgZ7jgozjga7libLlkIhcclxuICAgIGNvbnN0IHdpZHRoUmF0aW8gPSB0aGlzLndpbmRvd1dpZHRoIC8gdGhpcy5kb2N1bWVudFdpZHRoO1xyXG4gICAgY29uc3QgaGVpZ2h0UmF0aW8gPSB0aGlzLndpbmRvd0hlaWdodCAvIHRoaXMuZG9jdW1lbnRIZWlnaHQ7XHJcblxyXG4gICAgLy9yYXRpbyDjgaggcmF0aW9UeXBlIOOBruOCu+ODg+ODiFxyXG4gICAgdGhpcy5yYXRpbyA9IHdpZHRoUmF0aW8gPiBoZWlnaHRSYXRpbyA/IGhlaWdodFJhdGlvIDogd2lkdGhSYXRpbztcclxuICAgIHRoaXMucmF0aW9UeXBlID0gd2lkdGhSYXRpbyA+IGhlaWdodFJhdGlvID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xyXG5cclxuICAgIC8vcmF0aW8g44GMIDEg5Lul5LiK44Gg44Gj44Gf44KJIDEg44Go44GZ44KLXHJcbiAgICB0aGlzLnJhdGlvID0gdGhpcy5yYXRpbyA+IDEgPyAxIDogdGhpcy5yYXRpbztcclxuXHJcbiAgICAvL+e4puOBqOaoquOBq+OBiuOBhOOBpuOBneOCjOOBnuOCjOePvuWcqOOBruOCpuOCo+ODs+ODieOCpuOCteOCpOOCuuS9leaemuWIhuOBp+WFqOeUu+mdouOCkuaNleaNieOBp+OBjeOCi+OBi+OBruaVsOWApOOCkueul+WHulxyXG4gICAgdGhpcy53aWR0aENhcHR1cmVOdW1iZXIgPSBNYXRoLmNlaWwodGhpcy5kb2N1bWVudFdpZHRoIC8gdGhpcy53aW5kb3dXaWR0aCk7XHJcbiAgICB0aGlzLmhlaWdodENhcHR1cmVOdW1iZXIgPSBNYXRoLmNlaWwodGhpcy5kb2N1bWVudEhlaWdodCAvIHRoaXMud2luZG93SGVpZ2h0KTtcclxuXHJcbiAgICAvL+S4iuiomOS6jOOBpOOBruS5l+eul+WApFxyXG4gICAgdGhpcy5jYXB0dXJlTnVtYmVyID0gdGhpcy53aWR0aENhcHR1cmVOdW1iZXIgKiB0aGlzLmhlaWdodENhcHR1cmVOdW1iZXI7XHJcblxyXG4gICAgLy/nj77lnKjjga7jgrnjgq/jg63jg7zjg6vluqfmqJnjgpLoqJjpjLJcclxuICAgIHRoaXMuc2Nyb2xsWCA9IHdpbmRvdy5zY3JvbGxYO1xyXG4gICAgdGhpcy5zY3JvbGxZID0gd2luZG93LnNjcm9sbFk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlkITjgrXjgqTjgrrmg4XloLHjgpLlj5blvpfjg7voqIjnrpfjg7vkv53mjIHjgZnjgotcclxuICAgKiDliqDjgYjjgablv4XnlKjjgarlrprmlbDjgoLkv53nrqHjgZnjgotcclxuICAgKi9cclxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvL3N0eWxlIOOCv+OCsOOBq+S9v+eUqOOBmeOCiyBpZFxyXG4gICAgdGhpcy5TVFlMRV9JRCA9ICdzaXppbmdfJytNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgtOCk7XHJcblxyXG4gICAgLy/lkITnqK7mg4XloLHjgpLjgrvjg4Pjg4jjgZnjgotcclxuICAgIHRoaXMuX3VwZGF0ZUluZm9ybWF0aW9uKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmg4XloLHjgpLov5TjgZlcclxuICAgKiBAcmV0dXJuIHt7ZG9jdW1lbnRXaWR0aDogbnVtYmVyIHwgKiwgZG9jdW1lbnRIZWlnaHQ6IG51bWJlciB8ICosIHdpbmRvd0hlaWdodDogbnVtYmVyIHwgKiwgcmF0aW9UeXBlOiBzdHJpbmcsIHdpbmRvd1dpZHRoOiBudW1iZXIgfCAqLCByYXRpbzogKCp8bnVtYmVyKX19XHJcbiAgICovXHJcbiAgcHVibGljIGdldEluZm9ybWF0aW9uKCk6IEluZm9ybWF0aW9uIHtcclxuICAgIC8v5oOF5aCx44Gu5pu05pawXHJcbiAgICB0aGlzLl91cGRhdGVJbmZvcm1hdGlvbigpO1xyXG5cclxuICAgIC8v6KiI566X57WQ5p6c44KS6L+U44GZXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB3aW5kb3dXaWR0aDogdGhpcy53aW5kb3dXaWR0aCxcclxuICAgICAgd2luZG93SGVpZ2h0OiB0aGlzLndpbmRvd0hlaWdodCxcclxuICAgICAgZG9jdW1lbnRXaWR0aDogdGhpcy5kb2N1bWVudFdpZHRoLFxyXG4gICAgICBkb2N1bWVudEhlaWdodDogdGhpcy5kb2N1bWVudEhlaWdodCxcclxuICAgICAgd2lkdGhDYXB0dXJlTnVtYmVyOiB0aGlzLndpZHRoQ2FwdHVyZU51bWJlcixcclxuICAgICAgaGVpZ2h0Q2FwdHVyZU51bWJlcjogdGhpcy5oZWlnaHRDYXB0dXJlTnVtYmVyLFxyXG4gICAgICBjYXB0dXJlTnVtYmVyOiB0aGlzLmNhcHR1cmVOdW1iZXIsXHJcbiAgICAgIHJhdGlvOiB0aGlzLnJhdGlvLFxyXG4gICAgICByYXRpb1R5cGU6IHRoaXMucmF0aW9UeXBlLFxyXG4gICAgICBzY3JvbGxYOiB0aGlzLnNjcm9sbFgsXHJcbiAgICAgIHNjcm9sbFk6IHRoaXMuc2Nyb2xsWVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44OV44Or44K144Kk44K655So44Gu44K144Kk44K444Oz44Kw5Yem55CG44KS6KGM44GGXHJcbiAgICovXHJcbiAgcHVibGljIGZ1bGxTaXppbmcoKTogQ29vcmRpbmF0ZXMge1xyXG4gICAgLy9zdHlsZSDjgr/jgrDjgpLnlJ/miJBcclxuICAgIHRoaXMuX2FwcGVuZFN0eWxlKCdib2R5e292ZXJmbG93OmhpZGRlbjt0cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0IHRvcDt0cmFuc2Zvcm06IHNjYWxlKCcrdGhpcy5yYXRpbysnKX0nKTtcclxuXHJcbiAgICAvL+OCueOCr+ODreODvOODq+S9jee9ruOCkiAwIOOBq+OBmeOCi1xyXG4gICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xyXG5cclxuICAgIC8vMCwgMCDjgpLov5TjgZlcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHg6IDAsXHJcbiAgICAgIHk6IDBcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjgq/jg63jg7zjg6vjg5Djg7zjgpLmtojjgZnjgaDjgZHjga7jgrXjgqTjgrjjg7PjgrDlh6bnkIbjgpLooYzjgYZcclxuICAgKiDjgrnjgq/jg63jg7zjg6vkvY3nva7jga8gaW5kZXgg55Wq5Y+344Gn5oyH5a6a44GZ44KLXHJcbiAgICogaW5kZXgg44GMIG51bGwg44Gg44Gj44Gf5aC05ZCI44Gv44K544Kv44Ot44O844Or44KS5aSJ5pu044GX44Gq44GEXHJcbiAgICog44GT44GuIGluZGV4IOeVquWPt+OBryBnZXRJbmZvcm1hdGlvbigpIOOBp+WPluW+l+OBp+OBjeOCiyBjYXB0dXJlTnVtYmVyIOOBruevhOWbsuOBp+aMh+WumuOBl+OAgVxyXG4gICAqIOS+i+OBiOOBsFxyXG4gICAqIHdpZHRoQ2FwdHVyZU51bWJlciA9IDRcclxuICAgKiBoZWlnaHRDYXB0dXJlTnVtYmVyID0gM1xyXG4gICAqIGNhcHR1cmVOdW1iZXIgPSAxMlxyXG4gICAqIOOBoOOBo+OBn+WgtOWQiOOBr1xyXG4gICAqICstLS0tKy0tLS0rLS0tLSstLS0tK1xyXG4gICAqIHwgIDAgIHwgIDEgIHwgIDIgIHwgIDMgIHxcclxuICAgKiArLS0tLSstLS0tKy0tLS0rLS0tLStcclxuICAgKiB8ICA0ICB8ICA1ICB8ICA2ICB8ICA3ICB8XHJcbiAgICogKy0tLS0rLS0tLSstLS0tKy0tLS0rXHJcbiAgICogfCAgOCAgfCAgOSAgfCAxMCB8IDExIHxcclxuICAgKiArLS0tLSstLS0tKy0tLS0rLS0tLStcclxuICAgKiDjgajjgYTjgaPjgZ/lkITjg57jgrnjga7lt6bkuIrluqfmqJnjgbjjgrnjgq/jg63jg7zjg6vjgZnjgovjgZPjgajjgavjgarjgotcclxuICAgKiDlkITjg57jgrnjga4gd2lkdGgsIGhlaWdodCA9IHdpbmRvd1dpZHRoLCB3aW5kb3dIZWlnaHRcclxuICAgKiDlpKfmnqDjga4gd2lkdGgsIGhlaWdodCA9IGRvY3VtZW50V2lkdGgsIGRvY3VtZW50SGVpZ2h0XHJcbiAgICovXHJcbiAgcHVibGljIGRpc3BsYXlTaXppbmcoaW5kZXg6IG51bWJlcnxudWxsID0gbnVsbCk6IENvb3JkaW5hdGVzIHtcclxuICAgIC8vaW5kZXgg5oyH5a6a44GM54Sh44GL44Gj44Gf44KJIHN0eWxlIOOCv+OCsOOCkumBqeeUqOOBruW+jOOAgSgwLCAwKeOCkui/lOOBmVxyXG4gICAgaWYgKGluZGV4ID09PSBudWxsKSB7XHJcbiAgICAgIC8vc3R5bGUg44K/44Kw44KS55Sf5oiQXHJcbiAgICAgIHRoaXMuX2FwcGVuZFN0eWxlKCdib2R5e292ZXJmbG93OmhpZGRlbn0nKTtcclxuXHJcbiAgICAgIC8vKDAsIDAp6L+U44GZXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgeDogMCxcclxuICAgICAgICB5OiAwXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy/jgoLjgZcgaW5kZXgg44GMIDAg44Gg44Gj44Gf44KJ44K544Kv44Ot44O844Or5L2N572u44KSIDAsIDAg44Gr44GZ44KLXHJcbiAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXS5zY3JvbGxUbygwLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+enu+WLleWFiOW6p+aomeOBruWumue+qVxyXG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSB0aGlzLl9nZXRTY3JvbGxDb29yZGluYXRlcyhpbmRleCk7XHJcblxyXG4gICAgLy9vdmVyZmxvdyDjgrnjgr/jgqTjg6vjga7pgannlKggJiB0cmFuc2Zvcm06IHRyYW5zbGF0ZSDjgavjgojjgovnlpHkvLznmoTjgarjgrnjgq/jg63jg7zjg6vjga7lrp/ooYxcclxuICAgIHRoaXMuX2FwcGVuZFN0eWxlKCdib2R5e292ZXJmbG93OmhpZGRlbjt0cmFuc2Zvcm06dHJhbnNsYXRlKCcrKGNvb3JkaW5hdGVzLnggKiAtMSkrJ3B4LCcrKGNvb3JkaW5hdGVzLnkgKiAtMSkrJ3B4KX0nKTtcclxuXHJcbiAgICAvL+OCueOCr+ODreODvOODq+aDheWgseOCkui/lOOBmVxyXG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K144Kk44K444Oz44Kw44Gu44Oq44K744OD44OIXHJcbiAgICog44K544Kv44Ot44O844Or5L2N572u44KC44Oq44K744OD44OI44GZ44KLXHJcbiAgICovXHJcbiAgcHVibGljIHJlc2V0U2l6aW5nKGNvb3JkaW5hdGVzOiBDb29yZGluYXRlcyk6IENvb3JkaW5hdGVzIHtcclxuICAgIC8vc3R5bGUg44Gu44Oq44K744OD44OIXHJcbiAgICB0aGlzLl9yZW1vdmVTdHlsZSgpO1xyXG5cclxuICAgIC8v54++5Zyo44Gu44K544Kv44Ot44O844Or5L2N572u44KS5Y+W5b6XXHJcbiAgICBjb25zdCBiZWZvcmVDb29yZGluYXRlczogQ29vcmRpbmF0ZXMgPSB7XHJcbiAgICAgIHg6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0uc2Nyb2xsVG9wLFxyXG4gICAgICB5OiBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaHRtbCcpWzBdLnNjcm9sbExlZnRcclxuICAgIH07XHJcblxyXG4gICAgLy/jgrnjgq/jg63jg7zjg6vkvY3nva7jgpIgY29vcmRpbmF0ZXMg44G444Oq44K744OD44OIXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaHRtbCcpWzBdLnNjcm9sbFRvKGNvb3JkaW5hdGVzLngsIGNvb3JkaW5hdGVzLnkpO1xyXG5cclxuICAgIC8v5L+u5q2j5YmN44Gu44K544Kv44Ot44O844Or5L2N572u44KS6L+U44GZXHJcbiAgICByZXR1cm4gYmVmb3JlQ29vcmRpbmF0ZXM7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge1JhbmdlLCBDb29yZGluYXRlc30gZnJvbSBcIi4vY2xhc3MvaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7U2l6aW5nfSBmcm9tIFwiLi9jbGFzcy9TaXppbmdcIjtcclxuaW1wb3J0IHtGaW5kU3R5bGV9IGZyb20gXCIuL2NsYXNzL0ZpbmRTdHlsZVwiO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuXHJcbiAgLy/jgrXjgqTjgrrjgpLlj5blvpfjgZnjgovjgZ/jgoHjga7jgq/jg6njgrlcclxuICBjb25zdCBzaXppbmcgPSBuZXcgU2l6aW5nKCk7XHJcblxyXG4gIC8vcG9zaXRpb246IGZpeGVkIOOCkuaOoeeUqOOBl+OBpuOBhOOCi+imgee0oFxyXG4gIGxldCBmaXhlZEVsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XHJcblxyXG4gIC8vcG9zaXRpb246IGZpeGVkIOOCkuaOoeeUqOOBl+OBpuOBhOOCi+imgee0oOOCkueiuuS/neOBmeOCi1xyXG4gIGNvbnN0IGdldEZpeGVkID0gKCkgPT4ge1xyXG4gICAgY29uc3QgZmluZFN0eWxlID0gbmV3IEZpbmRTdHlsZShkb2N1bWVudC5ib2R5KTtcclxuICAgIGZpeGVkRWxlbWVudHMgPSBmaW5kU3R5bGUuZmluZCgncG9zaXRpb24nLCAnZml4ZWQnKTtcclxuICB9XHJcblxyXG4gIC8vcG9zaXRpb246IGZpeGVkIOOCkuaOoeeUqOOBl+OBpuOBhOOCi+imgee0oOOCkumdnuihqOekuuOBq+OBmeOCiyBvciDlhYPjgavmiLvjgZlcclxuICBjb25zdCBjb250cm9sRml4ZWQgPSAocHJvcGVydHk6ICdoaWRkZW4nIHwgJycpID0+IHtcclxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBmaXhlZEVsZW1lbnRzLmxlbmd0aDsgaSA8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XHJcbiAgICAgIGZpeGVkRWxlbWVudHNbaV0uc3R5bGUudmlzaWJpbGl0eSA9IHByb3BlcnR5O1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8v6KGo56S644GV44KM44Gm44GE44KL44K/44OW44Gu5oOF5aCx44KS6L+U44GZXHJcbiAgY29uc3QgaW5mb3JtYXRpb24gPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gc2l6aW5nLmdldEluZm9ybWF0aW9uKCk7XHJcbiAgfTtcclxuXHJcbiAgLy/jg5bjg6njgqbjgrbjga7lpKfjgY3jgZXjgpLpganliIfjgarjgoLjga7jgavlpInjgYjjgotcclxuICBjb25zdCBzdHlsaW5nID0gKHJhbmdlOiBSYW5nZSwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgLy/lh6bnkIbntYLkuoblvozjga7luqfmqJnmg4XloLFcclxuICAgIGxldCBjb29yZGluYXRlOiBDb29yZGluYXRlcyA9IHtcclxuICAgICAgeDogMCxcclxuICAgICAgeTogMFxyXG4gICAgfTtcclxuXHJcbiAgICAvL3JhbmdlIOOBq+OCiOOBo+OBpuWHpueQhuOCkuWIhuOBkeOCi1xyXG4gICAgc3dpdGNoIChyYW5nZSkge1xyXG4gICAgICBjYXNlICdmdWxsJzpcclxuICAgICAgICBjb29yZGluYXRlID0gc2l6aW5nLmZ1bGxTaXppbmcoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAncGVyZmVjdCc6XHJcbiAgICAgICAgY29vcmRpbmF0ZSA9IHNpemluZy5kaXNwbGF5U2l6aW5nKGluZGV4KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb29yZGluYXRlID0gc2l6aW5nLmRpc3BsYXlTaXppbmcobnVsbCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgLy/luqfmqJnmg4XloLHjgpLov5TjgZlcclxuICAgIHJldHVybiBjb29yZGluYXRlO1xyXG4gIH07XHJcblxyXG4gIC8v44OW44Op44Km44K244Gu5aSn44GN44GV44KS5YWD44Gr5oi744GZXHJcbiAgY29uc3QgcmVzZXRTaXppbmcgPSAoY29vcmRpbmF0ZXM6IENvb3JkaW5hdGVzKSA9PiB7XHJcbiAgICBzaXppbmcucmVzZXRTaXppbmcoY29vcmRpbmF0ZXMpO1xyXG4gIH07XHJcblxyXG4gIC8v44Oh44OD44K744O844K444OR44OD44K344Oz44KwXHJcbiAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xyXG4gICAgLy8g5Y+X44GR5Y+W44Gj44Gf5YCk44Gn5YiG5bKQXHJcbiAgICBzd2l0Y2ggKHJlcXVlc3QudHlwZSkge1xyXG4gICAgICBjYXNlICdpbmZvcm1hdGlvbic6XHJcbiAgICAgICAgc2VuZFJlc3BvbnNlKGluZm9ybWF0aW9uKCkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzaXppbmcnOlxyXG4gICAgICAgIHNlbmRSZXNwb25zZShzdHlsaW5nKHJlcXVlc3QucmFuZ2UsIHJlcXVlc3QuaW5kZXgpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAna2lsbEZpeGVkJzpcclxuICAgICAgICBjb250cm9sRml4ZWQoJ2hpZGRlbicpO1xyXG4gICAgICAgIHNlbmRSZXNwb25zZSh7fSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3Jlc2V0U2l6aW5nJzpcclxuICAgICAgICBjb250cm9sRml4ZWQoJycpO1xyXG4gICAgICAgIHJlc2V0U2l6aW5nKHt4OiByZXF1ZXN0LngsIHk6IHJlcXVlc3QueX0pO1xyXG4gICAgICAgIHNlbmRSZXNwb25zZSh7fSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgc2VuZFJlc3BvbnNlKHt9KTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy9wb3NpdGlvbjogZml4ZWQg44KS5o6h55So44GX44Gm44GE44KL6KaB57Sg44Gu56K65L+dXHJcbiAgZ2V0Rml4ZWQoKTtcclxuXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9