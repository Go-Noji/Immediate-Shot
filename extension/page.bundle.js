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
    /**
     * 全要素中で最大の width, もしくは height を返す
     * @param target
     */
    highSize(target = 'height') {
        //このメソッドが返す数値
        let result = 0;
        //捕捉済みの要素を逐一検索
        for (let i = 0, max = this.elements.length; i < max; i = (i + 1) | 0) {
            //サイズの計測対象(width or height)
            const size = target === 'height'
                ? this.elements[i].getBoundingClientRect().height
                : this.elements[i].getBoundingClientRect().width;
            //result 以下だったらスルー
            if (result >= size) {
                continue;
            }
            //最高値を書き換える
            result = size;
        }
        //結果を返す
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
/* harmony import */ var _FindStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FindStyle */ "./src/class/FindStyle.ts");

class Sizing {
    /**
     * 各サイズ情報を取得・計算・保持する
     * 加えて必用な定数も保管する
     */
    constructor(max = false) {
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
        this._updateInformation(max);
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
    _updateInformation(max) {
        //全要素サイズ取得用インスタンス
        let findStyle = new _FindStyle__WEBPACK_IMPORTED_MODULE_0__["FindStyle"](document.getElementsByTagName('html')[0]);
        //ウィンドウサイズ
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        //ドキュメントサイズの最大値を取得するリスト
        let widthSources = [document.body.clientWidth, document.body.scrollWidth, document.documentElement.scrollWidth, document.documentElement.clientWidth];
        let heightSources = [document.body.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight];
        //もし max === true だったら取得リストに全要素の最大値を加える
        if (max) {
            widthSources.push(findStyle.highSize('width'));
            heightSources.push(findStyle.highSize('height'));
        }
        //ドキュメントサイズ
        this.documentWidth = Math.max(...widthSources);
        this.documentHeight = Math.max(...heightSources);
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
    getInformation(max = false) {
        //情報の更新
        this._updateInformation(max);
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
    displaySizing(index = null, max = false) {
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
        this._appendStyle(max
            ? 'body{overflow:hidden;transform:translate(' + (coordinates.x * -1) + 'px,' + (coordinates.y * -1) + 'px);width: ' + this.documentWidth + 'px;height: ' + this.documentHeight + 'px;}'
            : 'body{overflow:hidden;transform:translate(' + (coordinates.x * -1) + 'px,' + (coordinates.y * -1) + 'px)}');
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
    const information = (max) => {
        return sizing.getInformation(max);
    };
    //ブラウザの大きさを適切なものに変える
    const styling = (range, index, max) => {
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
                coordinate = sizing.displaySizing(index, max);
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
                sendResponse(information(request.max));
                break;
            case 'sizing':
                sendResponse(styling(request.range, request.index, request.max));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzL0ZpbmRTdHlsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MvU2l6aW5nLnRzIiwid2VicGFjazovLy8uL3NyYy9wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFPLE1BQU0sU0FBUztJQWNwQjs7Ozs7T0FLRztJQUNLLGNBQWMsQ0FBQyxNQUFXO1FBQ2hDLE9BQVEsTUFBTSxLQUFLLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGFBQWEsQ0FBQyxNQUFtQjtRQUN2QyxTQUFTO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFM0IsUUFBUTtRQUNSLE1BQU0sUUFBUSxHQUFHLE1B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ZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9wYWdlLnRzXCIpO1xuIiwiZXhwb3J0IGNsYXNzIEZpbmRTdHlsZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIGNvbnN0cnVjdG9yIOOBp+aMv+WFpeOBmeOCiyBIVE1MRWxlbWVudFxyXG4gICAqIOOBk+OBruimgee0oOOBq+OBtuOCieS4i+OBjOOBo+OBpuOBhOOCiyBET00g44OE44Oq44O844GM5a++6LGhXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgcm9vdDogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIHJvb3Qg5LiL44Gu5YWoIEhUTUxFbGVtZW50XHJcbiAgICog6ZqO5bGk5qWu44Gv54Sh44GP44CB5LiA5qyh5YWD6YWN5YiX44Go44GX44Gm5o2V5o2JXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBlbGVtZW50czogSFRNTEVsZW1lbnRbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogdGFyZ2V0IOOBjCBudWxsIOOBp+OBquOBhOOBk+OBqOOCkuS/neiovOOBmeOCiyBUeXBlIGd1YXJkXHJcbiAgICogSFRNTEVsZW1lbnQuY2hpbGRyZW4g44GL44KJ5Y+W44Gj44Gm44GN44Gf44Kq44OW44K444Kn44Kv44OI44Gr5a++44GX44Gm55So44GE44KLXHJcbiAgICogQHBhcmFtIHRhcmdldFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfaXNIVE1MRWxlbWVudCh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBIVE1MRWxlbWVudCB7XHJcbiAgICByZXR1cm4gIHRhcmdldCAhPT0gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHBhcmVudCDkuIvjgavjgbbjgonkuIvjgYzjgosgRE9NIOODhOODquODvOOCkuWGjeW4sOeahOOBq+WPluW+l+OBl+OAgXRoaXMuZWxlbWVudHMg44Gr6L+95Yqg44GZ44KLXHJcbiAgICogQHBhcmFtIHBhcmVudFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZmluZENoaWxkcmVuKHBhcmVudDogSFRNTEVsZW1lbnQpIHtcclxuICAgIC8v6Ieq6Lqr44KScHVzaFxyXG4gICAgdGhpcy5lbGVtZW50cy5wdXNoKHBhcmVudCk7XHJcblxyXG4gICAgLy/lrZDopoHntKDjga7lj5blvpdcclxuICAgIGNvbnN0IGNoaWxkcmVuID0gcGFyZW50LmNoaWxkcmVuO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBtYXg7IGkgPSAoaSArIDEpIHwgMCkge1xyXG4gICAgICAvL+OCv+OCpOODl+OCrOODvOODieOCkumAmuOBmeOBn+OCgeOAgeS4gOaXpuWkieaVsOOBuOagvOe0jVxyXG4gICAgICBjb25zdCB0YXJnZXQgPSBjaGlsZHJlbi5pdGVtKGkpO1xyXG5cclxuICAgICAgLy90YXJnZXQg44GMIG51bGwg44Gn44Gq44GE44GT44Go44KS5L+d6Ki8XHJcbiAgICAgIGlmICggISB0aGlzLl9pc0hUTUxFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy/lho3luLDnmoTjgavjgZPjga7plqLmlbDjgpLlkbzjgbZcclxuICAgICAgdGhpcy5fZmluZENoaWxkcmVuKHRhcmdldCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjg4njgq3jg6Xjg6Hjg7Pjg4jjg6vjg7zjg4jjgpLnorrkv53jgZfjgIHmpJzntKLlr77osaHjga7opoHntKDjgpLmjZXmjYnjgZnjgotcclxuICAgKiBAcGFyYW0gcm9vdFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHJvb3Q6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAvL+aknOe0ouWvvuixoeODhOODquODvOOBruimquimgee0oOOCkueZu+mMslxyXG4gICAgdGhpcy5yb290ID0gcm9vdDtcclxuXHJcbiAgICAvL+aknOe0oue1kOaenOmFjeWIl+OCkuWIneacn+WMllxyXG4gICAgdGhpcy5lbGVtZW50cyA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgIC8v5qSc57Si6ZaL5aeLXHJcbiAgICB0aGlzLl9maW5kQ2hpbGRyZW4ocm9vdCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjc3Mg44Go44GX44GmIHByb3BlcnR5OiB2YWx1ZSDjgYzpgannlKjjgZXjgozjgabjgYTjgovopoHntKDjgpIgdGhpcy5lbGVtZW50cyDjgYvjgonlj5blvpfjgZnjgotcclxuICAgKiBAcGFyYW0gcHJvcGVydHlcclxuICAgKiBAcGFyYW0gdmFsdWVcclxuICAgKi9cclxuICBwdWJsaWMgZmluZChwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogSFRNTEVsZW1lbnRbXSB7XHJcbiAgICAvL+OBk+OBruODoeOCveODg+ODieOBjOi/lOOBmemFjeWIl+OBrueUqOaEj1xyXG4gICAgbGV0IHJlc3VsdCA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgIC8v5o2V5o2J5riI44G/44Gu6KaB57Sg44KS6YCQ5LiA5qSc57SiXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gdGhpcy5lbGVtZW50cy5sZW5ndGg7IGkgPCBtYXg7IGkgPSAoaSArIDEpIHwgMCkge1xyXG4gICAgICAvL+ioiOeul+a4iOOBvyBjc3Mg44GM5ZCI6Ie044GX44Gm44GE44Gq44GL44Gj44Gf44KJ44K544Or44O8XHJcbiAgICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRzW2ldKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KSAhPT0gdmFsdWUpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy/oqbLlvZPopoHntKDjgajjgZfjgabmpJzntKLntZDmnpzphY3liJfjgavov73liqBcclxuICAgICAgcmVzdWx0LnB1c2godGhpcy5lbGVtZW50c1tpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/oqbLlvZPopoHntKDjgpLov5TjgZlcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlhajopoHntKDkuK3jgafmnIDlpKfjga4gd2lkdGgsIOOCguOBl+OBj+OBryBoZWlnaHQg44KS6L+U44GZXHJcbiAgICogQHBhcmFtIHRhcmdldFxyXG4gICAqL1xyXG4gIHB1YmxpYyBoaWdoU2l6ZSh0YXJnZXQ6ICd3aWR0aCcgfCAnaGVpZ2h0JyA9ICdoZWlnaHQnKTogbnVtYmVye1xyXG4gICAgLy/jgZPjga7jg6Hjgr3jg4Pjg4njgYzov5TjgZnmlbDlgKRcclxuICAgIGxldCByZXN1bHQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLy/mjZXmjYnmuIjjgb/jga7opoHntKDjgpLpgJDkuIDmpJzntKJcclxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSB0aGlzLmVsZW1lbnRzLmxlbmd0aDsgaSA8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XHJcbiAgICAgIC8v44K144Kk44K644Gu6KiI5ris5a++6LGhKHdpZHRoIG9yIGhlaWdodClcclxuICAgICAgY29uc3Qgc2l6ZSA9IHRhcmdldCA9PT0gJ2hlaWdodCdcclxuICAgICAgICA/IHRoaXMuZWxlbWVudHNbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XHJcbiAgICAgICAgOiB0aGlzLmVsZW1lbnRzW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xyXG5cclxuICAgICAgLy9yZXN1bHQg5Lul5LiL44Gg44Gj44Gf44KJ44K544Or44O8XHJcbiAgICAgIGlmIChyZXN1bHQgPj0gc2l6ZSkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvL+acgOmrmOWApOOCkuabuOOBjeaPm+OBiOOCi1xyXG4gICAgICByZXN1bHQgPSBzaXplO1xyXG4gICAgfVxyXG5cclxuICAgIC8v57WQ5p6c44KS6L+U44GZXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtDb29yZGluYXRlcywgSW5mb3JtYXRpb259IGZyb20gXCJzcmMvY2xhc3MvaW50ZXJmYWNlXCI7XG5pbXBvcnQge0ZpbmRTdHlsZX0gZnJvbSBcIi4vRmluZFN0eWxlXCI7XG5cbmV4cG9ydCBjbGFzcyBTaXppbmcge1xuXG4gIC8vY29uc3RydWN0b3IoKSDmmYLngrnjga4gd2luZG93IHdpZHRoXG4gIHByaXZhdGUgd2luZG93V2lkdGg6IG51bWJlciA9IDA7XG5cbiAgLy9jb25zdHJ1Y3RvcigpIOaZgueCueOBriB3aW5kb3cgaGVpZ2h0XG4gIHByaXZhdGUgd2luZG93SGVpZ2h0OiBudW1iZXIgPSAwO1xuXG4gIC8vY29uc3RydWN0b3IoKSDmmYLngrnjga4gZG9jdW1lbnQgd2lkdGhcbiAgcHJpdmF0ZSBkb2N1bWVudFdpZHRoOiBudW1iZXIgPSAwO1xuXG4gIC8vY29uc3RydWN0b3IoKSDmmYLngrnjga4gZG9jdW1lbnQgaGVpZ2h0XG4gIHByaXZhdGUgZG9jdW1lbnRIZWlnaHQ6IG51bWJlciA9IDA7XG5cbiAgLy/nlLvpnaLnuK7lsI/mr5TnjodcbiAgcHJpdmF0ZSByYXRpbzogbnVtYmVyID0gMDtcblxuICAvL+eUu+mdouOCkuW5heOBqOmrmOOBleOBruOBqeOBoeOCieOBp+e4ruWwj+OBl+OBn+OBi1xuICBwcml2YXRlIHJhdGlvVHlwZTogJ3dpZHRoJyB8ICdoZWlnaHQnID0gJ2hlaWdodCc7XG5cbiAgLy9kb2N1bWVudFdpZHRoIOOCkuePvuWcqOOBriB3aW5kb3dXaWR0aCDjga7lpKfjgY3jgZXjgafjgq3jg6Pjg5fjg4Hjg6PjgZnjgovjgavjga/mqKrjgavkvZXmnprjgq3jg6Pjg5fjg4Hjg6PjgYzlv4XopoHjgYtcbiAgcHJpdmF0ZSB3aWR0aENhcHR1cmVOdW1iZXI6IG51bWJlciA9IDA7XG5cbiAgLy9kb2N1bWVudEhlaWdodCDjgpLnj77lnKjjga4gd2luZG93SGVpZ2h0IOOBruWkp+OBjeOBleOBp+OCreODo+ODl+ODgeODo+OBmeOCi+OBq+OBr+e4puOBq+S9leaemuOCreODo+ODl+ODgeODo+OBjOW/heimgeOBi1xuICBwcml2YXRlIGhlaWdodENhcHR1cmVOdW1iZXI6IG51bWJlciA9IDA7XG5cbiAgLy/kuIroqJjkuozjgaTjga7kuZfnrpflgKRcbiAgcHJpdmF0ZSBjYXB0dXJlTnVtYmVyOiBudW1iZXIgPSAwO1xuXG4gIC8vY29uc3RydWN0b3IoKSDmmYLngrnjga7jgrnjgq/jg63jg7zjg6vkvY3nva4o5qiqKVxuICBwcml2YXRlIHNjcm9sbFg6IG51bWJlciA9IDA7XG5cbiAgLy9jb25zdHJ1Y3RvcigpIOaZgueCueOBruOCueOCr+ODreODvOODq+S9jee9rijnuKYpXG4gIHByaXZhdGUgc2Nyb2xsWTogbnVtYmVyID0gMDtcblxuICAvL+OBk+OBruOCr+ODqeOCueOBjOaJseOBhiA8c3R5bGU+IOOCv+OCsOOBriBpZCDlsZ7mgKflgKRcbiAgcmVhZG9ubHkgU1RZTEVfSUQ6IHN0cmluZztcblxuICAvKipcbiAgICog44GT44Gu44Kv44Op44K544GM5LuV6L6844KT44GgIHN0eWxlIOOCv+OCsOOCkuWJiumZpOOBmeOCi1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmVtb3ZlU3R5bGUoKSB7XG4gICAgLy/liYrpmaTlr77osaHjga7lj5blvpdcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLlNUWUxFX0lEKTtcblxuICAgIC8vdGFyZ2V0IOOBjOWtmOWcqOOBl+OBquOBi+OBo+OBn+OCieS9leOCguOBl+OBquOBhFxuICAgIGlmICh0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvL+WvvuixoeOCkuWJiumZpOOBmeOCi1xuICAgIHRhcmdldC5yZW1vdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdHlsZSDjgr/jgrDjgpLmjL/lhaXjgZnjgotcbiAgICog5pei44Gr44GT44Gu44Kv44Op44K544GM5omx44Gj44Gm44GE44KLIHN0eWxlIOOBjOWtmOWcqOOBl+OBn+WgtOWQiOOBr+ODquOCu+ODg+ODiOOBmeOCi1xuICAgKiBAcGFyYW0gc3R5bGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX2FwcGVuZFN0eWxlKHN0eWxlOiBzdHJpbmcpIHtcbiAgICAvL+ODquOCu+ODg+ODiFxuICAgIHRoaXMuX3JlbW92ZVN0eWxlKCk7XG5cbiAgICAvL3N0eWxlIOOCv+OCsOOCkueUqOaEj1xuICAgIGNvbnN0IHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgdGFnLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLlNUWUxFX0lEKTtcbiAgICB0YWcuaW5uZXJUZXh0ID0gc3R5bGU7XG5cbiAgICAvL3RhZyDjgr/jgrDmjL/lhaVcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHRhZyk7XG4gIH1cblxuICAvKipcbiAgICog5oyH5a6a44GV44KM44GfIGluZGV4IOOBi+OCieOCueOCr+ODreODvOODq+OBmeOBueOBjeW6p+aomeOCkui/lOOBmVxuICAgKiBAcGFyYW0gaW5kZXhcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX2dldFNjcm9sbENvb3JkaW5hdGVzKGluZGV4OiBudW1iZXIpOiBDb29yZGluYXRlcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IE1hdGguZmxvb3IoaW5kZXggJSB0aGlzLndpZHRoQ2FwdHVyZU51bWJlcikgJSB0aGlzLmNhcHR1cmVOdW1iZXIgKiB0aGlzLndpbmRvd1dpZHRoLFxuICAgICAgeTogTWF0aC5mbG9vcihpbmRleCAvIHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyKSAlIHRoaXMuY2FwdHVyZU51bWJlciAqIHRoaXMud2luZG93SGVpZ2h0XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiDlkITnqK7mg4XloLHjgpLjgqLjg4Pjg5fjg4fjg7zjg4jjgZnjgotcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX3VwZGF0ZUluZm9ybWF0aW9uKG1heDogYm9vbGVhbikge1xuICAgIC8v5YWo6KaB57Sg44K144Kk44K65Y+W5b6X55So44Kk44Oz44K544K/44Oz44K5XG4gICAgbGV0IGZpbmRTdHlsZSA9IG5ldyBGaW5kU3R5bGUoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXSk7XG5cbiAgICAvL+OCpuOCo+ODs+ODieOCpuOCteOCpOOCulxuICAgIHRoaXMud2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICB0aGlzLndpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgIC8v44OJ44Kt44Ol44Oh44Oz44OI44K144Kk44K644Gu5pyA5aSn5YCk44KS5Y+W5b6X44GZ44KL44Oq44K544OIXG4gICAgbGV0IHdpZHRoU291cmNlcyA9IFtkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoLCBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGgsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aF07XG4gICAgbGV0IGhlaWdodFNvdXJjZXMgPSBbZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQsIGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XTtcblxuICAgIC8v44KC44GXIG1heCA9PT0gdHJ1ZSDjgaDjgaPjgZ/jgonlj5blvpfjg6rjgrnjg4jjgavlhajopoHntKDjga7mnIDlpKflgKTjgpLliqDjgYjjgotcbiAgICBpZiAobWF4KSB7XG4gICAgICB3aWR0aFNvdXJjZXMucHVzaChmaW5kU3R5bGUuaGlnaFNpemUoJ3dpZHRoJykpO1xuICAgICAgaGVpZ2h0U291cmNlcy5wdXNoKGZpbmRTdHlsZS5oaWdoU2l6ZSgnaGVpZ2h0JykpO1xuICAgIH1cblxuICAgIC8v44OJ44Kt44Ol44Oh44Oz44OI44K144Kk44K6XG4gICAgdGhpcy5kb2N1bWVudFdpZHRoID0gTWF0aC5tYXgoLi4ud2lkdGhTb3VyY2VzKTtcbiAgICB0aGlzLmRvY3VtZW50SGVpZ2h0ID0gTWF0aC5tYXgoLi4uaGVpZ2h0U291cmNlcyk7XG5cbiAgICAvL+W5heOBqOmrmOOBleOBneOCjOOBnuOCjOOBruWJsuWQiFxuICAgIGNvbnN0IHdpZHRoUmF0aW8gPSB0aGlzLndpbmRvd1dpZHRoIC8gdGhpcy5kb2N1bWVudFdpZHRoO1xuICAgIGNvbnN0IGhlaWdodFJhdGlvID0gdGhpcy53aW5kb3dIZWlnaHQgLyB0aGlzLmRvY3VtZW50SGVpZ2h0O1xuXG4gICAgLy9yYXRpbyDjgaggcmF0aW9UeXBlIOOBruOCu+ODg+ODiFxuICAgIHRoaXMucmF0aW8gPSB3aWR0aFJhdGlvID4gaGVpZ2h0UmF0aW8gPyBoZWlnaHRSYXRpbyA6IHdpZHRoUmF0aW87XG4gICAgdGhpcy5yYXRpb1R5cGUgPSB3aWR0aFJhdGlvID4gaGVpZ2h0UmF0aW8gPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG5cbiAgICAvL3JhdGlvIOOBjCAxIOS7peS4iuOBoOOBo+OBn+OCiSAxIOOBqOOBmeOCi1xuICAgIHRoaXMucmF0aW8gPSB0aGlzLnJhdGlvID4gMSA/IDEgOiB0aGlzLnJhdGlvO1xuXG4gICAgLy/nuKbjgajmqKrjgavjgYrjgYTjgabjgZ3jgozjgZ7jgoznj77lnKjjga7jgqbjgqPjg7Pjg4njgqbjgrXjgqTjgrrkvZXmnprliIbjgaflhajnlLvpnaLjgpLmjZXmjYnjgafjgY3jgovjgYvjga7mlbDlgKTjgpLnrpflh7pcbiAgICB0aGlzLndpZHRoQ2FwdHVyZU51bWJlciA9IE1hdGguY2VpbCh0aGlzLmRvY3VtZW50V2lkdGggLyB0aGlzLndpbmRvd1dpZHRoKTtcbiAgICB0aGlzLmhlaWdodENhcHR1cmVOdW1iZXIgPSBNYXRoLmNlaWwodGhpcy5kb2N1bWVudEhlaWdodCAvIHRoaXMud2luZG93SGVpZ2h0KTtcblxuICAgIC8v5LiK6KiY5LqM44Gk44Gu5LmX566X5YCkXG4gICAgdGhpcy5jYXB0dXJlTnVtYmVyID0gdGhpcy53aWR0aENhcHR1cmVOdW1iZXIgKiB0aGlzLmhlaWdodENhcHR1cmVOdW1iZXI7XG5cbiAgICAvL+ePvuWcqOOBruOCueOCr+ODreODvOODq+W6p+aomeOCkuiomOmMslxuICAgIHRoaXMuc2Nyb2xsWCA9IHdpbmRvdy5zY3JvbGxYO1xuICAgIHRoaXMuc2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZO1xuICB9XG5cbiAgLyoqXG4gICAqIOWQhOOCteOCpOOCuuaDheWgseOCkuWPluW+l+ODu+ioiOeul+ODu+S/neaMgeOBmeOCi1xuICAgKiDliqDjgYjjgablv4XnlKjjgarlrprmlbDjgoLkv53nrqHjgZnjgotcbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihtYXg6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIC8vc3R5bGUg44K/44Kw44Gr5L2/55So44GZ44KLIGlkXG4gICAgdGhpcy5TVFlMRV9JRCA9ICdzaXppbmdfJytNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgtOCk7XG5cbiAgICAvL+WQhOeoruaDheWgseOCkuOCu+ODg+ODiOOBmeOCi1xuICAgIHRoaXMuX3VwZGF0ZUluZm9ybWF0aW9uKG1heCk7XG4gIH1cblxuICAvKipcbiAgICog5oOF5aCx44KS6L+U44GZXG4gICAqIEByZXR1cm4ge3tkb2N1bWVudFdpZHRoOiBudW1iZXIgfCAqLCBkb2N1bWVudEhlaWdodDogbnVtYmVyIHwgKiwgd2luZG93SGVpZ2h0OiBudW1iZXIgfCAqLCByYXRpb1R5cGU6IHN0cmluZywgd2luZG93V2lkdGg6IG51bWJlciB8ICosIHJhdGlvOiAoKnxudW1iZXIpfX1cbiAgICovXG4gIHB1YmxpYyBnZXRJbmZvcm1hdGlvbihtYXg6IGJvb2xlYW4gPSBmYWxzZSk6IEluZm9ybWF0aW9uIHtcbiAgICAvL+aDheWgseOBruabtOaWsFxuICAgIHRoaXMuX3VwZGF0ZUluZm9ybWF0aW9uKG1heCk7XG5cbiAgICAvL+ioiOeul+e1kOaenOOCkui/lOOBmVxuICAgIHJldHVybiB7XG4gICAgICB3aW5kb3dXaWR0aDogdGhpcy53aW5kb3dXaWR0aCxcbiAgICAgIHdpbmRvd0hlaWdodDogdGhpcy53aW5kb3dIZWlnaHQsXG4gICAgICBkb2N1bWVudFdpZHRoOiB0aGlzLmRvY3VtZW50V2lkdGgsXG4gICAgICBkb2N1bWVudEhlaWdodDogdGhpcy5kb2N1bWVudEhlaWdodCxcbiAgICAgIHdpZHRoQ2FwdHVyZU51bWJlcjogdGhpcy53aWR0aENhcHR1cmVOdW1iZXIsXG4gICAgICBoZWlnaHRDYXB0dXJlTnVtYmVyOiB0aGlzLmhlaWdodENhcHR1cmVOdW1iZXIsXG4gICAgICBjYXB0dXJlTnVtYmVyOiB0aGlzLmNhcHR1cmVOdW1iZXIsXG4gICAgICByYXRpbzogdGhpcy5yYXRpbyxcbiAgICAgIHJhdGlvVHlwZTogdGhpcy5yYXRpb1R5cGUsXG4gICAgICBzY3JvbGxYOiB0aGlzLnNjcm9sbFgsXG4gICAgICBzY3JvbGxZOiB0aGlzLnNjcm9sbFlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog44OV44Or44K144Kk44K655So44Gu44K144Kk44K444Oz44Kw5Yem55CG44KS6KGM44GGXG4gICAqL1xuICBwdWJsaWMgZnVsbFNpemluZygpOiBDb29yZGluYXRlcyB7XG4gICAgLy9zdHlsZSDjgr/jgrDjgpLnlJ/miJBcbiAgICB0aGlzLl9hcHBlbmRTdHlsZSgnYm9keXtvdmVyZmxvdzpoaWRkZW47dHJhbnNmb3JtLW9yaWdpbjogbGVmdCB0b3A7dHJhbnNmb3JtOiBzY2FsZSgnK3RoaXMucmF0aW8rJyl9Jyk7XG5cbiAgICAvL+OCueOCr+ODreODvOODq+S9jee9ruOCkiAwIOOBq+OBmeOCi1xuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcblxuICAgIC8vMCwgMCDjgpLov5TjgZlcbiAgICByZXR1cm4ge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIOOCueOCr+ODreODvOODq+ODkOODvOOCkua2iOOBmeOBoOOBkeOBruOCteOCpOOCuOODs+OCsOWHpueQhuOCkuihjOOBhlxuICAgKiDjgrnjgq/jg63jg7zjg6vkvY3nva7jga8gaW5kZXgg55Wq5Y+344Gn5oyH5a6a44GZ44KLXG4gICAqIGluZGV4IOOBjCBudWxsIOOBoOOBo+OBn+WgtOWQiOOBr+OCueOCr+ODreODvOODq+OCkuWkieabtOOBl+OBquOBhFxuICAgKiDjgZPjga4gaW5kZXgg55Wq5Y+344GvIGdldEluZm9ybWF0aW9uKCkg44Gn5Y+W5b6X44Gn44GN44KLIGNhcHR1cmVOdW1iZXIg44Gu56+E5Zuy44Gn5oyH5a6a44GX44CBXG4gICAqIOS+i+OBiOOBsFxuICAgKiB3aWR0aENhcHR1cmVOdW1iZXIgPSA0XG4gICAqIGhlaWdodENhcHR1cmVOdW1iZXIgPSAzXG4gICAqIGNhcHR1cmVOdW1iZXIgPSAxMlxuICAgKiDjgaDjgaPjgZ/loLTlkIjjga9cbiAgICogKy0tLS0rLS0tLSstLS0tKy0tLS0rXG4gICAqIHwgIDAgIHwgIDEgIHwgIDIgIHwgIDMgIHxcbiAgICogKy0tLS0rLS0tLSstLS0tKy0tLS0rXG4gICAqIHwgIDQgIHwgIDUgIHwgIDYgIHwgIDcgIHxcbiAgICogKy0tLS0rLS0tLSstLS0tKy0tLS0rXG4gICAqIHwgIDggIHwgIDkgIHwgMTAgfCAxMSB8XG4gICAqICstLS0tKy0tLS0rLS0tLSstLS0tK1xuICAgKiDjgajjgYTjgaPjgZ/lkITjg57jgrnjga7lt6bkuIrluqfmqJnjgbjjgrnjgq/jg63jg7zjg6vjgZnjgovjgZPjgajjgavjgarjgotcbiAgICog5ZCE44Oe44K544GuIHdpZHRoLCBoZWlnaHQgPSB3aW5kb3dXaWR0aCwgd2luZG93SGVpZ2h0XG4gICAqIOWkp+aeoOOBriB3aWR0aCwgaGVpZ2h0ID0gZG9jdW1lbnRXaWR0aCwgZG9jdW1lbnRIZWlnaHRcbiAgICovXG4gIHB1YmxpYyBkaXNwbGF5U2l6aW5nKGluZGV4OiBudW1iZXJ8bnVsbCA9IG51bGwsIG1heDogYm9vbGVhbiA9IGZhbHNlKTogQ29vcmRpbmF0ZXMge1xuICAgIC8vaW5kZXgg5oyH5a6a44GM54Sh44GL44Gj44Gf44KJIHN0eWxlIOOCv+OCsOOCkumBqeeUqOOBruW+jOOAgSgwLCAwKeOCkui/lOOBmVxuICAgIGlmIChpbmRleCA9PT0gbnVsbCkge1xuICAgICAgLy9zdHlsZSDjgr/jgrDjgpLnlJ/miJBcbiAgICAgIHRoaXMuX2FwcGVuZFN0eWxlKCdib2R5e292ZXJmbG93OmhpZGRlbn0nKTtcblxuICAgICAgLy8oMCwgMCnov5TjgZlcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDBcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy/jgoLjgZcgaW5kZXgg44GMIDAg44Gg44Gj44Gf44KJ44K544Kv44Ot44O844Or5L2N572u44KSIDAsIDAg44Gr44GZ44KLXG4gICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaHRtbCcpWzBdLnNjcm9sbFRvKDAsIDApO1xuICAgIH1cblxuICAgIC8v56e75YuV5YWI5bqn5qiZ44Gu5a6a576pXG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSB0aGlzLl9nZXRTY3JvbGxDb29yZGluYXRlcyhpbmRleCk7XG5cbiAgICAvL292ZXJmbG93IOOCueOCv+OCpOODq+OBrumBqeeUqCAmIHRyYW5zZm9ybTogdHJhbnNsYXRlIOOBq+OCiOOCi+eWkeS8vOeahOOBquOCueOCr+ODreODvOODq+OBruWun+ihjFxuICAgIHRoaXMuX2FwcGVuZFN0eWxlKG1heFxuICAgICAgPyAnYm9keXtvdmVyZmxvdzpoaWRkZW47dHJhbnNmb3JtOnRyYW5zbGF0ZSgnKyhjb29yZGluYXRlcy54ICogLTEpKydweCwnKyhjb29yZGluYXRlcy55ICogLTEpKydweCk7d2lkdGg6ICcrdGhpcy5kb2N1bWVudFdpZHRoKydweDtoZWlnaHQ6ICcrdGhpcy5kb2N1bWVudEhlaWdodCsncHg7fSdcbiAgICAgIDogJ2JvZHl7b3ZlcmZsb3c6aGlkZGVuO3RyYW5zZm9ybTp0cmFuc2xhdGUoJysoY29vcmRpbmF0ZXMueCAqIC0xKSsncHgsJysoY29vcmRpbmF0ZXMueSAqIC0xKSsncHgpfSdcbiAgICApO1xuXG4gICAgLy/jgrnjgq/jg63jg7zjg6vmg4XloLHjgpLov5TjgZlcbiAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gIH1cblxuICAvKipcbiAgICog44K144Kk44K444Oz44Kw44Gu44Oq44K744OD44OIXG4gICAqIOOCueOCr+ODreODvOODq+S9jee9ruOCguODquOCu+ODg+ODiOOBmeOCi1xuICAgKi9cbiAgcHVibGljIHJlc2V0U2l6aW5nKGNvb3JkaW5hdGVzOiBDb29yZGluYXRlcyk6IENvb3JkaW5hdGVzIHtcbiAgICAvL3N0eWxlIOOBruODquOCu+ODg+ODiFxuICAgIHRoaXMuX3JlbW92ZVN0eWxlKCk7XG5cbiAgICAvL+ePvuWcqOOBruOCueOCr+ODreODvOODq+S9jee9ruOCkuWPluW+l1xuICAgIGNvbnN0IGJlZm9yZUNvb3JkaW5hdGVzOiBDb29yZGluYXRlcyA9IHtcbiAgICAgIHg6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0uc2Nyb2xsVG9wLFxuICAgICAgeTogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXS5zY3JvbGxMZWZ0XG4gICAgfTtcblxuICAgIC8v44K544Kv44Ot44O844Or5L2N572u44KSIGNvb3JkaW5hdGVzIOOBuOODquOCu+ODg+ODiFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0uc2Nyb2xsVG8oY29vcmRpbmF0ZXMueCwgY29vcmRpbmF0ZXMueSk7XG5cbiAgICAvL+S/ruato+WJjeOBruOCueOCr+ODreODvOODq+S9jee9ruOCkui/lOOBmVxuICAgIHJldHVybiBiZWZvcmVDb29yZGluYXRlcztcbiAgfVxuXG59XG4iLCJpbXBvcnQge1JhbmdlLCBDb29yZGluYXRlc30gZnJvbSBcIi4vY2xhc3MvaW50ZXJmYWNlXCI7XG5pbXBvcnQge1NpemluZ30gZnJvbSBcIi4vY2xhc3MvU2l6aW5nXCI7XG5pbXBvcnQge0ZpbmRTdHlsZX0gZnJvbSBcIi4vY2xhc3MvRmluZFN0eWxlXCI7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcblxuICAvL+OCteOCpOOCuuOCkuWPluW+l+OBmeOCi+OBn+OCgeOBruOCr+ODqeOCuVxuICBjb25zdCBzaXppbmcgPSBuZXcgU2l6aW5nKCk7XG5cbiAgLy9wb3NpdGlvbjogZml4ZWQg44KS5o6h55So44GX44Gm44GE44KL6KaB57SgXG4gIGxldCBmaXhlZEVsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG5cbiAgLy9wb3NpdGlvbjogZml4ZWQg44KS5o6h55So44GX44Gm44GE44KL6KaB57Sg44KS56K65L+d44GZ44KLXG4gIGNvbnN0IGdldEZpeGVkID0gKCkgPT4ge1xuICAgIGNvbnN0IGZpbmRTdHlsZSA9IG5ldyBGaW5kU3R5bGUoZG9jdW1lbnQuYm9keSk7XG4gICAgZml4ZWRFbGVtZW50cyA9IGZpbmRTdHlsZS5maW5kKCdwb3NpdGlvbicsICdmaXhlZCcpO1xuICB9XG5cbiAgLy9wb3NpdGlvbjogZml4ZWQg44KS5o6h55So44GX44Gm44GE44KL6KaB57Sg44KS6Z2e6KGo56S644Gr44GZ44KLIG9yIOWFg+OBq+aIu+OBmVxuICBjb25zdCBjb250cm9sRml4ZWQgPSAocHJvcGVydHk6ICdoaWRkZW4nIHwgJycpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gZml4ZWRFbGVtZW50cy5sZW5ndGg7IGkgPCBtYXg7IGkgPSAoaSArIDEpIHwgMCkge1xuICAgICAgZml4ZWRFbGVtZW50c1tpXS5zdHlsZS52aXNpYmlsaXR5ID0gcHJvcGVydHk7XG4gICAgfVxuICB9O1xuXG4gIC8v6KGo56S644GV44KM44Gm44GE44KL44K/44OW44Gu5oOF5aCx44KS6L+U44GZXG4gIGNvbnN0IGluZm9ybWF0aW9uID0gKG1heDogYm9vbGVhbikgPT4ge1xuICAgIHJldHVybiBzaXppbmcuZ2V0SW5mb3JtYXRpb24obWF4KTtcbiAgfTtcblxuICAvL+ODluODqeOCpuOCtuOBruWkp+OBjeOBleOCkumBqeWIh+OBquOCguOBruOBq+WkieOBiOOCi1xuICBjb25zdCBzdHlsaW5nID0gKHJhbmdlOiBSYW5nZSwgaW5kZXg6IG51bWJlciwgbWF4OiBib29sZWFuKSA9PiB7XG4gICAgLy/lh6bnkIbntYLkuoblvozjga7luqfmqJnmg4XloLFcbiAgICBsZXQgY29vcmRpbmF0ZTogQ29vcmRpbmF0ZXMgPSB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH07XG5cbiAgICAvL3JhbmdlIOOBq+OCiOOBo+OBpuWHpueQhuOCkuWIhuOBkeOCi1xuICAgIHN3aXRjaCAocmFuZ2UpIHtcbiAgICAgIGNhc2UgJ2Z1bGwnOlxuICAgICAgICBjb29yZGluYXRlID0gc2l6aW5nLmZ1bGxTaXppbmcoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdwZXJmZWN0JzpcbiAgICAgICAgY29vcmRpbmF0ZSA9IHNpemluZy5kaXNwbGF5U2l6aW5nKGluZGV4LCBtYXgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvb3JkaW5hdGUgPSBzaXppbmcuZGlzcGxheVNpemluZyhudWxsKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgLy/luqfmqJnmg4XloLHjgpLov5TjgZlcbiAgICByZXR1cm4gY29vcmRpbmF0ZTtcbiAgfTtcblxuICAvL+ODluODqeOCpuOCtuOBruWkp+OBjeOBleOCkuWFg+OBq+aIu+OBmVxuICBjb25zdCByZXNldFNpemluZyA9IChjb29yZGluYXRlczogQ29vcmRpbmF0ZXMpID0+IHtcbiAgICBzaXppbmcucmVzZXRTaXppbmcoY29vcmRpbmF0ZXMpO1xuICB9O1xuXG4gIC8v44Oh44OD44K744O844K444OR44OD44K344Oz44KwXG4gIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgICAvLyDlj5fjgZHlj5bjgaPjgZ/lgKTjgafliIblspBcbiAgICBzd2l0Y2ggKHJlcXVlc3QudHlwZSkge1xuICAgICAgY2FzZSAnaW5mb3JtYXRpb24nOlxuICAgICAgICBzZW5kUmVzcG9uc2UoaW5mb3JtYXRpb24ocmVxdWVzdC5tYXgpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzaXppbmcnOlxuICAgICAgICBzZW5kUmVzcG9uc2Uoc3R5bGluZyhyZXF1ZXN0LnJhbmdlLCByZXF1ZXN0LmluZGV4LCByZXF1ZXN0Lm1heCkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2tpbGxGaXhlZCc6XG4gICAgICAgIGNvbnRyb2xGaXhlZCgnaGlkZGVuJyk7XG4gICAgICAgIHNlbmRSZXNwb25zZSh7fSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmVzZXRTaXppbmcnOlxuICAgICAgICBjb250cm9sRml4ZWQoJycpO1xuICAgICAgICByZXNldFNpemluZyh7eDogcmVxdWVzdC54LCB5OiByZXF1ZXN0Lnl9KTtcbiAgICAgICAgc2VuZFJlc3BvbnNlKHt9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBzZW5kUmVzcG9uc2Uoe30pO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0pO1xuXG4gIC8vcG9zaXRpb246IGZpeGVkIOOCkuaOoeeUqOOBl+OBpuOBhOOCi+imgee0oOOBrueiuuS/nVxuICBnZXRGaXhlZCgpO1xuXG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=