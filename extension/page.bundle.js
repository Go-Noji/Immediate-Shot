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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzL0ZpbmRTdHlsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MvU2l6aW5nLnRzIiwid2VicGFjazovLy8uL3NyYy9wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFPLE1BQU0sU0FBUztJQWNwQjs7Ozs7T0FLRztJQUNLLGNBQWMsQ0FBQyxNQUFXO1FBQ2hDLE9BQVEsTUFBTSxLQUFLLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGFBQWEsQ0FBQyxNQUFtQjtRQUN2QyxTQUFTO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFM0IsUUFBUTtRQUNSLE1BQU0sUUFBUSxHQUFHLE1B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ZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9wYWdlLnRzXCIpO1xuIiwiZXhwb3J0IGNsYXNzIEZpbmRTdHlsZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIGNvbnN0cnVjdG9yIOOBp+aMv+WFpeOBmeOCiyBIVE1MRWxlbWVudFxyXG4gICAqIOOBk+OBruimgee0oOOBq+OBtuOCieS4i+OBjOOBo+OBpuOBhOOCiyBET00g44OE44Oq44O844GM5a++6LGhXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgcm9vdDogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIHJvb3Qg5LiL44Gu5YWoIEhUTUxFbGVtZW50XHJcbiAgICog6ZqO5bGk5qWu44Gv54Sh44GP44CB5LiA5qyh5YWD6YWN5YiX44Go44GX44Gm5o2V5o2JXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBlbGVtZW50czogSFRNTEVsZW1lbnRbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogdGFyZ2V0IOOBjCBudWxsIOOBp+OBquOBhOOBk+OBqOOCkuS/neiovOOBmeOCiyBUeXBlIGd1YXJkXHJcbiAgICogSFRNTEVsZW1lbnQuY2hpbGRyZW4g44GL44KJ5Y+W44Gj44Gm44GN44Gf44Kq44OW44K444Kn44Kv44OI44Gr5a++44GX44Gm55So44GE44KLXHJcbiAgICogQHBhcmFtIHRhcmdldFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfaXNIVE1MRWxlbWVudCh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBIVE1MRWxlbWVudCB7XHJcbiAgICByZXR1cm4gIHRhcmdldCAhPT0gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHBhcmVudCDkuIvjgavjgbbjgonkuIvjgYzjgosgRE9NIOODhOODquODvOOCkuWGjeW4sOeahOOBq+WPluW+l+OBl+OAgXRoaXMuZWxlbWVudHMg44Gr6L+95Yqg44GZ44KLXHJcbiAgICogQHBhcmFtIHBhcmVudFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZmluZENoaWxkcmVuKHBhcmVudDogSFRNTEVsZW1lbnQpIHtcclxuICAgIC8v6Ieq6Lqr44KScHVzaFxyXG4gICAgdGhpcy5lbGVtZW50cy5wdXNoKHBhcmVudCk7XHJcblxyXG4gICAgLy/lrZDopoHntKDjga7lj5blvpdcclxuICAgIGNvbnN0IGNoaWxkcmVuID0gcGFyZW50LmNoaWxkcmVuO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBtYXg7IGkgPSAoaSArIDEpIHwgMCkge1xyXG4gICAgICAvL+OCv+OCpOODl+OCrOODvOODieOCkumAmuOBmeOBn+OCgeOAgeS4gOaXpuWkieaVsOOBuOagvOe0jVxyXG4gICAgICBjb25zdCB0YXJnZXQgPSBjaGlsZHJlbi5pdGVtKGkpO1xyXG5cclxuICAgICAgLy90YXJnZXQg44GMIG51bGwg44Gn44Gq44GE44GT44Go44KS5L+d6Ki8XHJcbiAgICAgIGlmICggISB0aGlzLl9pc0hUTUxFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy/lho3luLDnmoTjgavjgZPjga7plqLmlbDjgpLlkbzjgbZcclxuICAgICAgdGhpcy5fZmluZENoaWxkcmVuKHRhcmdldCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjg4njgq3jg6Xjg6Hjg7Pjg4jjg6vjg7zjg4jjgpLnorrkv53jgZfjgIHmpJzntKLlr77osaHjga7opoHntKDjgpLmjZXmjYnjgZnjgotcclxuICAgKiBAcGFyYW0gcm9vdFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHJvb3Q6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAvL+aknOe0ouWvvuixoeODhOODquODvOOBruimquimgee0oOOCkueZu+mMslxyXG4gICAgdGhpcy5yb290ID0gcm9vdDtcclxuXHJcbiAgICAvL+aknOe0oue1kOaenOmFjeWIl+OCkuWIneacn+WMllxyXG4gICAgdGhpcy5lbGVtZW50cyA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgIC8v5qSc57Si6ZaL5aeLXHJcbiAgICB0aGlzLl9maW5kQ2hpbGRyZW4ocm9vdCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjc3Mg44Go44GX44GmIHByb3BlcnR5OiB2YWx1ZSDjgYzpgannlKjjgZXjgozjgabjgYTjgovopoHntKDjgpIgdGhpcy5lbGVtZW50cyDjgYvjgonlj5blvpfjgZnjgotcclxuICAgKiBAcGFyYW0gcHJvcGVydHlcclxuICAgKiBAcGFyYW0gdmFsdWVcclxuICAgKi9cclxuICBwdWJsaWMgZmluZChwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogSFRNTEVsZW1lbnRbXSB7XHJcbiAgICAvL+OBk+OBruODoeOCveODg+ODieOBjOi/lOOBmemFjeWIl+OBrueUqOaEj1xyXG4gICAgbGV0IHJlc3VsdCA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgIC8v5o2V5o2J5riI44G/44Gu6KaB57Sg44KS6YCQ5LiA5qSc57SiXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gdGhpcy5lbGVtZW50cy5sZW5ndGg7IGkgPCBtYXg7IGkgPSAoaSArIDEpIHwgMCkge1xyXG4gICAgICAvL+ioiOeul+a4iOOBvyBjc3Mg44GM5ZCI6Ie044GX44Gm44GE44Gq44GL44Gj44Gf44KJ44K544Or44O8XHJcbiAgICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRzW2ldKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KSAhPT0gdmFsdWUpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy/oqbLlvZPopoHntKDjgajjgZfjgabmpJzntKLntZDmnpzphY3liJfjgavov73liqBcclxuICAgICAgcmVzdWx0LnB1c2godGhpcy5lbGVtZW50c1tpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/oqbLlvZPopoHntKDjgpLov5TjgZlcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlhajopoHntKDkuK3jgafmnIDlpKfjga4gd2lkdGgsIOOCguOBl+OBj+OBryBoZWlnaHQg44KS6L+U44GZXHJcbiAgICogQHBhcmFtIHRhcmdldFxyXG4gICAqL1xyXG4gIHB1YmxpYyBoaWdoU2l6ZSh0YXJnZXQ6ICd3aWR0aCcgfCAnaGVpZ2h0JyA9ICdoZWlnaHQnKTogbnVtYmVye1xyXG4gICAgLy/jgZPjga7jg6Hjgr3jg4Pjg4njgYzov5TjgZnmlbDlgKRcclxuICAgIGxldCByZXN1bHQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLy/mjZXmjYnmuIjjgb/jga7opoHntKDjgpLpgJDkuIDmpJzntKJcclxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSB0aGlzLmVsZW1lbnRzLmxlbmd0aDsgaSA8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XHJcbiAgICAgIC8v44K144Kk44K644Gu6KiI5ris5a++6LGhKHdpZHRoIG9yIGhlaWdodClcclxuICAgICAgY29uc3Qgc2l6ZSA9IHRhcmdldCA9PT0gJ2hlaWdodCdcclxuICAgICAgICA/IHRoaXMuZWxlbWVudHNbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XHJcbiAgICAgICAgOiB0aGlzLmVsZW1lbnRzW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xyXG5cclxuICAgICAgLy9yZXN1bHQg5Lul5LiL44Gg44Gj44Gf44KJ44K544Or44O8XHJcbiAgICAgIGlmIChyZXN1bHQgPj0gc2l6ZSkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvL+acgOmrmOWApOOCkuabuOOBjeaPm+OBiOOCi1xyXG4gICAgICByZXN1bHQgPSBzaXplO1xyXG4gICAgfVxyXG5cclxuICAgIC8v57WQ5p6c44KS6L+U44GZXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtDb29yZGluYXRlcywgSW5mb3JtYXRpb259IGZyb20gXCJzcmMvY2xhc3MvaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7RmluZFN0eWxlfSBmcm9tIFwiLi9GaW5kU3R5bGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTaXppbmcge1xyXG5cclxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544GuIHdpbmRvdyB3aWR0aFxyXG4gIHByaXZhdGUgd2luZG93V2lkdGg6IG51bWJlciA9IDA7XHJcblxyXG4gIC8vY29uc3RydWN0b3IoKSDmmYLngrnjga4gd2luZG93IGhlaWdodFxyXG4gIHByaXZhdGUgd2luZG93SGVpZ2h0OiBudW1iZXIgPSAwO1xyXG5cclxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544GuIGRvY3VtZW50IHdpZHRoXHJcbiAgcHJpdmF0ZSBkb2N1bWVudFdpZHRoOiBudW1iZXIgPSAwO1xyXG5cclxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544GuIGRvY3VtZW50IGhlaWdodFxyXG4gIHByaXZhdGUgZG9jdW1lbnRIZWlnaHQ6IG51bWJlciA9IDA7XHJcblxyXG4gIC8v55S76Z2i57iu5bCP5q+U546HXHJcbiAgcHJpdmF0ZSByYXRpbzogbnVtYmVyID0gMDtcclxuXHJcbiAgLy/nlLvpnaLjgpLluYXjgajpq5jjgZXjga7jganjgaHjgonjgafnuK7lsI/jgZfjgZ/jgYtcclxuICBwcml2YXRlIHJhdGlvVHlwZTogJ3dpZHRoJyB8ICdoZWlnaHQnID0gJ2hlaWdodCc7XHJcblxyXG4gIC8vZG9jdW1lbnRXaWR0aCDjgpLnj77lnKjjga4gd2luZG93V2lkdGgg44Gu5aSn44GN44GV44Gn44Kt44Oj44OX44OB44Oj44GZ44KL44Gr44Gv5qiq44Gr5L2V5p6a44Kt44Oj44OX44OB44Oj44GM5b+F6KaB44GLXHJcbiAgcHJpdmF0ZSB3aWR0aENhcHR1cmVOdW1iZXI6IG51bWJlciA9IDA7XHJcblxyXG4gIC8vZG9jdW1lbnRIZWlnaHQg44KS54++5Zyo44GuIHdpbmRvd0hlaWdodCDjga7lpKfjgY3jgZXjgafjgq3jg6Pjg5fjg4Hjg6PjgZnjgovjgavjga/nuKbjgavkvZXmnprjgq3jg6Pjg5fjg4Hjg6PjgYzlv4XopoHjgYtcclxuICBwcml2YXRlIGhlaWdodENhcHR1cmVOdW1iZXI6IG51bWJlciA9IDA7XHJcblxyXG4gIC8v5LiK6KiY5LqM44Gk44Gu5LmX566X5YCkXHJcbiAgcHJpdmF0ZSBjYXB0dXJlTnVtYmVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544Gu44K544Kv44Ot44O844Or5L2N572uKOaoqilcclxuICBwcml2YXRlIHNjcm9sbFg6IG51bWJlciA9IDA7XHJcblxyXG4gIC8vY29uc3RydWN0b3IoKSDmmYLngrnjga7jgrnjgq/jg63jg7zjg6vkvY3nva4o57imKVxyXG4gIHByaXZhdGUgc2Nyb2xsWTogbnVtYmVyID0gMDtcclxuXHJcbiAgLy/jgZPjga7jgq/jg6njgrnjgYzmibHjgYYgPHN0eWxlPiDjgr/jgrDjga4gaWQg5bGe5oCn5YCkXHJcbiAgcmVhZG9ubHkgU1RZTEVfSUQ6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICog44GT44Gu44Kv44Op44K544GM5LuV6L6844KT44GgIHN0eWxlIOOCv+OCsOOCkuWJiumZpOOBmeOCi1xyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcmVtb3ZlU3R5bGUoKSB7XHJcbiAgICAvL+WJiumZpOWvvuixoeOBruWPluW+l1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5TVFlMRV9JRCk7XHJcblxyXG4gICAgLy90YXJnZXQg44GM5a2Y5Zyo44GX44Gq44GL44Gj44Gf44KJ5L2V44KC44GX44Gq44GEXHJcbiAgICBpZiAodGFyZ2V0ID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvL+WvvuixoeOCkuWJiumZpOOBmeOCi1xyXG4gICAgdGFyZ2V0LnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogc3R5bGUg44K/44Kw44KS5oy/5YWl44GZ44KLXHJcbiAgICog5pei44Gr44GT44Gu44Kv44Op44K544GM5omx44Gj44Gm44GE44KLIHN0eWxlIOOBjOWtmOWcqOOBl+OBn+WgtOWQiOOBr+ODquOCu+ODg+ODiOOBmeOCi1xyXG4gICAqIEBwYXJhbSBzdHlsZVxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfYXBwZW5kU3R5bGUoc3R5bGU6IHN0cmluZykge1xyXG4gICAgLy/jg6rjgrvjg4Pjg4hcclxuICAgIHRoaXMuX3JlbW92ZVN0eWxlKCk7XHJcblxyXG4gICAgLy9zdHlsZSDjgr/jgrDjgpLnlKjmhI9cclxuICAgIGNvbnN0IHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcbiAgICB0YWcuc2V0QXR0cmlidXRlKCdpZCcsIHRoaXMuU1RZTEVfSUQpO1xyXG4gICAgdGFnLmlubmVyVGV4dCA9IHN0eWxlO1xyXG5cclxuICAgIC8vdGFnIOOCv+OCsOaMv+WFpVxyXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0YWcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5oyH5a6a44GV44KM44GfIGluZGV4IOOBi+OCieOCueOCr+ODreODvOODq+OBmeOBueOBjeW6p+aomeOCkui/lOOBmVxyXG4gICAqIEBwYXJhbSBpbmRleFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZ2V0U2Nyb2xsQ29vcmRpbmF0ZXMoaW5kZXg6IG51bWJlcik6IENvb3JkaW5hdGVzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHg6IE1hdGguZmxvb3IoaW5kZXggJSB0aGlzLndpZHRoQ2FwdHVyZU51bWJlcikgJSB0aGlzLmNhcHR1cmVOdW1iZXIgKiB0aGlzLndpbmRvd1dpZHRoLFxyXG4gICAgICB5OiBNYXRoLmZsb29yKGluZGV4IC8gdGhpcy53aWR0aENhcHR1cmVOdW1iZXIpICUgdGhpcy5jYXB0dXJlTnVtYmVyICogdGhpcy53aW5kb3dIZWlnaHRcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlkITnqK7mg4XloLHjgpLjgqLjg4Pjg5fjg4fjg7zjg4jjgZnjgotcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3VwZGF0ZUluZm9ybWF0aW9uKG1heDogYm9vbGVhbikge1xyXG4gICAgLy/lhajopoHntKDjgrXjgqTjgrrlj5blvpfnlKjjgqTjg7Pjgrnjgr/jg7PjgrlcclxuICAgIGxldCBmaW5kU3R5bGUgPSBuZXcgRmluZFN0eWxlKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0pO1xyXG5cclxuICAgIC8v44Km44Kj44Oz44OJ44Km44K144Kk44K6XHJcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICB0aGlzLndpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICAvL+ODieOCreODpeODoeODs+ODiOOCteOCpOOCuuOBruacgOWkp+WApOOCkuWPluW+l+OBmeOCi+ODquOCueODiFxyXG4gICAgbGV0IHdpZHRoU291cmNlcyA9IFtkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoLCBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGgsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aF07XHJcbiAgICBsZXQgaGVpZ2h0U291cmNlcyA9IFtkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCwgZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRdO1xyXG5cclxuICAgIC8v44KC44GXIG1heCA9PT0gdHJ1ZSDjgaDjgaPjgZ/jgonlj5blvpfjg6rjgrnjg4jjgavlhajopoHntKDjga7mnIDlpKflgKTjgpLliqDjgYjjgotcclxuICAgIGlmIChtYXgpIHtcclxuICAgICAgd2lkdGhTb3VyY2VzLnB1c2goZmluZFN0eWxlLmhpZ2hTaXplKCd3aWR0aCcpKTtcclxuICAgICAgaGVpZ2h0U291cmNlcy5wdXNoKGZpbmRTdHlsZS5oaWdoU2l6ZSgnaGVpZ2h0JykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v44OJ44Kt44Ol44Oh44Oz44OI44K144Kk44K6XHJcbiAgICB0aGlzLmRvY3VtZW50V2lkdGggPSBNYXRoLm1heCguLi53aWR0aFNvdXJjZXMpO1xyXG4gICAgdGhpcy5kb2N1bWVudEhlaWdodCA9IE1hdGgubWF4KC4uLmhlaWdodFNvdXJjZXMpO1xyXG5cclxuICAgIC8v5bmF44Go6auY44GV44Gd44KM44Ge44KM44Gu5Ymy5ZCIXHJcbiAgICBjb25zdCB3aWR0aFJhdGlvID0gdGhpcy53aW5kb3dXaWR0aCAvIHRoaXMuZG9jdW1lbnRXaWR0aDtcclxuICAgIGNvbnN0IGhlaWdodFJhdGlvID0gdGhpcy53aW5kb3dIZWlnaHQgLyB0aGlzLmRvY3VtZW50SGVpZ2h0O1xyXG5cclxuICAgIC8vcmF0aW8g44GoIHJhdGlvVHlwZSDjga7jgrvjg4Pjg4hcclxuICAgIHRoaXMucmF0aW8gPSB3aWR0aFJhdGlvID4gaGVpZ2h0UmF0aW8gPyBoZWlnaHRSYXRpbyA6IHdpZHRoUmF0aW87XHJcbiAgICB0aGlzLnJhdGlvVHlwZSA9IHdpZHRoUmF0aW8gPiBoZWlnaHRSYXRpbyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcclxuXHJcbiAgICAvL3JhdGlvIOOBjCAxIOS7peS4iuOBoOOBo+OBn+OCiSAxIOOBqOOBmeOCi1xyXG4gICAgdGhpcy5yYXRpbyA9IHRoaXMucmF0aW8gPiAxID8gMSA6IHRoaXMucmF0aW87XHJcblxyXG4gICAgLy/nuKbjgajmqKrjgavjgYrjgYTjgabjgZ3jgozjgZ7jgoznj77lnKjjga7jgqbjgqPjg7Pjg4njgqbjgrXjgqTjgrrkvZXmnprliIbjgaflhajnlLvpnaLjgpLmjZXmjYnjgafjgY3jgovjgYvjga7mlbDlgKTjgpLnrpflh7pcclxuICAgIHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyID0gTWF0aC5jZWlsKHRoaXMuZG9jdW1lbnRXaWR0aCAvIHRoaXMud2luZG93V2lkdGgpO1xyXG4gICAgdGhpcy5oZWlnaHRDYXB0dXJlTnVtYmVyID0gTWF0aC5jZWlsKHRoaXMuZG9jdW1lbnRIZWlnaHQgLyB0aGlzLndpbmRvd0hlaWdodCk7XHJcblxyXG4gICAgLy/kuIroqJjkuozjgaTjga7kuZfnrpflgKRcclxuICAgIHRoaXMuY2FwdHVyZU51bWJlciA9IHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyICogdGhpcy5oZWlnaHRDYXB0dXJlTnVtYmVyO1xyXG5cclxuICAgIC8v54++5Zyo44Gu44K544Kv44Ot44O844Or5bqn5qiZ44KS6KiY6YyyXHJcbiAgICB0aGlzLnNjcm9sbFggPSB3aW5kb3cuc2Nyb2xsWDtcclxuICAgIHRoaXMuc2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5ZCE44K144Kk44K65oOF5aCx44KS5Y+W5b6X44O76KiI566X44O75L+d5oyB44GZ44KLXHJcbiAgICog5Yqg44GI44Gm5b+F55So44Gq5a6a5pWw44KC5L+d566h44GZ44KLXHJcbiAgICovXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKG1heDogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAvL3N0eWxlIOOCv+OCsOOBq+S9v+eUqOOBmeOCiyBpZFxyXG4gICAgdGhpcy5TVFlMRV9JRCA9ICdzaXppbmdfJytNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgtOCk7XHJcblxyXG4gICAgLy/lkITnqK7mg4XloLHjgpLjgrvjg4Pjg4jjgZnjgotcclxuICAgIHRoaXMuX3VwZGF0ZUluZm9ybWF0aW9uKG1heCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmg4XloLHjgpLov5TjgZlcclxuICAgKiBAcmV0dXJuIHt7ZG9jdW1lbnRXaWR0aDogbnVtYmVyIHwgKiwgZG9jdW1lbnRIZWlnaHQ6IG51bWJlciB8ICosIHdpbmRvd0hlaWdodDogbnVtYmVyIHwgKiwgcmF0aW9UeXBlOiBzdHJpbmcsIHdpbmRvd1dpZHRoOiBudW1iZXIgfCAqLCByYXRpbzogKCp8bnVtYmVyKX19XHJcbiAgICovXHJcbiAgcHVibGljIGdldEluZm9ybWF0aW9uKG1heDogYm9vbGVhbiA9IGZhbHNlKTogSW5mb3JtYXRpb24ge1xyXG4gICAgLy/mg4XloLHjga7mm7TmlrBcclxuICAgIHRoaXMuX3VwZGF0ZUluZm9ybWF0aW9uKG1heCk7XHJcblxyXG4gICAgLy/oqIjnrpfntZDmnpzjgpLov5TjgZlcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHdpbmRvd1dpZHRoOiB0aGlzLndpbmRvd1dpZHRoLFxyXG4gICAgICB3aW5kb3dIZWlnaHQ6IHRoaXMud2luZG93SGVpZ2h0LFxyXG4gICAgICBkb2N1bWVudFdpZHRoOiB0aGlzLmRvY3VtZW50V2lkdGgsXHJcbiAgICAgIGRvY3VtZW50SGVpZ2h0OiB0aGlzLmRvY3VtZW50SGVpZ2h0LFxyXG4gICAgICB3aWR0aENhcHR1cmVOdW1iZXI6IHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyLFxyXG4gICAgICBoZWlnaHRDYXB0dXJlTnVtYmVyOiB0aGlzLmhlaWdodENhcHR1cmVOdW1iZXIsXHJcbiAgICAgIGNhcHR1cmVOdW1iZXI6IHRoaXMuY2FwdHVyZU51bWJlcixcclxuICAgICAgcmF0aW86IHRoaXMucmF0aW8sXHJcbiAgICAgIHJhdGlvVHlwZTogdGhpcy5yYXRpb1R5cGUsXHJcbiAgICAgIHNjcm9sbFg6IHRoaXMuc2Nyb2xsWCxcclxuICAgICAgc2Nyb2xsWTogdGhpcy5zY3JvbGxZXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjg5Xjg6vjgrXjgqTjgrrnlKjjga7jgrXjgqTjgrjjg7PjgrDlh6bnkIbjgpLooYzjgYZcclxuICAgKi9cclxuICBwdWJsaWMgZnVsbFNpemluZygpOiBDb29yZGluYXRlcyB7XHJcbiAgICAvL3N0eWxlIOOCv+OCsOOCkueUn+aIkFxyXG4gICAgdGhpcy5fYXBwZW5kU3R5bGUoJ2JvZHl7b3ZlcmZsb3c6aGlkZGVuO3RyYW5zZm9ybS1vcmlnaW46IGxlZnQgdG9wO3RyYW5zZm9ybTogc2NhbGUoJyt0aGlzLnJhdGlvKycpfScpO1xyXG5cclxuICAgIC8v44K544Kv44Ot44O844Or5L2N572u44KSIDAg44Gr44GZ44KLXHJcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XHJcblxyXG4gICAgLy8wLCAwIOOCkui/lOOBmVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDogMCxcclxuICAgICAgeTogMFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCueOCr+ODreODvOODq+ODkOODvOOCkua2iOOBmeOBoOOBkeOBruOCteOCpOOCuOODs+OCsOWHpueQhuOCkuihjOOBhlxyXG4gICAqIOOCueOCr+ODreODvOODq+S9jee9ruOBryBpbmRleCDnlarlj7fjgafmjIflrprjgZnjgotcclxuICAgKiBpbmRleCDjgYwgbnVsbCDjgaDjgaPjgZ/loLTlkIjjga/jgrnjgq/jg63jg7zjg6vjgpLlpInmm7TjgZfjgarjgYRcclxuICAgKiDjgZPjga4gaW5kZXgg55Wq5Y+344GvIGdldEluZm9ybWF0aW9uKCkg44Gn5Y+W5b6X44Gn44GN44KLIGNhcHR1cmVOdW1iZXIg44Gu56+E5Zuy44Gn5oyH5a6a44GX44CBXHJcbiAgICog5L6L44GI44GwXHJcbiAgICogd2lkdGhDYXB0dXJlTnVtYmVyID0gNFxyXG4gICAqIGhlaWdodENhcHR1cmVOdW1iZXIgPSAzXHJcbiAgICogY2FwdHVyZU51bWJlciA9IDEyXHJcbiAgICog44Gg44Gj44Gf5aC05ZCI44GvXHJcbiAgICogKy0tLS0rLS0tLSstLS0tKy0tLS0rXHJcbiAgICogfCAgMCAgfCAgMSAgfCAgMiAgfCAgMyAgfFxyXG4gICAqICstLS0tKy0tLS0rLS0tLSstLS0tK1xyXG4gICAqIHwgIDQgIHwgIDUgIHwgIDYgIHwgIDcgIHxcclxuICAgKiArLS0tLSstLS0tKy0tLS0rLS0tLStcclxuICAgKiB8ICA4ICB8ICA5ICB8IDEwIHwgMTEgfFxyXG4gICAqICstLS0tKy0tLS0rLS0tLSstLS0tK1xyXG4gICAqIOOBqOOBhOOBo+OBn+WQhOODnuOCueOBruW3puS4iuW6p+aomeOBuOOCueOCr+ODreODvOODq+OBmeOCi+OBk+OBqOOBq+OBquOCi1xyXG4gICAqIOWQhOODnuOCueOBriB3aWR0aCwgaGVpZ2h0ID0gd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodFxyXG4gICAqIOWkp+aeoOOBriB3aWR0aCwgaGVpZ2h0ID0gZG9jdW1lbnRXaWR0aCwgZG9jdW1lbnRIZWlnaHRcclxuICAgKi9cclxuICBwdWJsaWMgZGlzcGxheVNpemluZyhpbmRleDogbnVtYmVyfG51bGwgPSBudWxsLCBtYXg6IGJvb2xlYW4gPSBmYWxzZSk6IENvb3JkaW5hdGVzIHtcclxuICAgIC8vaW5kZXgg5oyH5a6a44GM54Sh44GL44Gj44Gf44KJIHN0eWxlIOOCv+OCsOOCkumBqeeUqOOBruW+jOOAgSgwLCAwKeOCkui/lOOBmVxyXG4gICAgaWYgKGluZGV4ID09PSBudWxsKSB7XHJcbiAgICAgIC8vc3R5bGUg44K/44Kw44KS55Sf5oiQXHJcbiAgICAgIHRoaXMuX2FwcGVuZFN0eWxlKCdib2R5e292ZXJmbG93OmhpZGRlbn0nKTtcclxuXHJcbiAgICAgIC8vKDAsIDAp6L+U44GZXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgeDogMCxcclxuICAgICAgICB5OiAwXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy/jgoLjgZcgaW5kZXgg44GMIDAg44Gg44Gj44Gf44KJ44K544Kv44Ot44O844Or5L2N572u44KSIDAsIDAg44Gr44GZ44KLXHJcbiAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXS5zY3JvbGxUbygwLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+enu+WLleWFiOW6p+aomeOBruWumue+qVxyXG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSB0aGlzLl9nZXRTY3JvbGxDb29yZGluYXRlcyhpbmRleCk7XHJcblxyXG4gICAgLy9vdmVyZmxvdyDjgrnjgr/jgqTjg6vjga7pgannlKggJiB0cmFuc2Zvcm06IHRyYW5zbGF0ZSDjgavjgojjgovnlpHkvLznmoTjgarjgrnjgq/jg63jg7zjg6vjga7lrp/ooYxcclxuICAgIHRoaXMuX2FwcGVuZFN0eWxlKG1heFxyXG4gICAgICA/ICdib2R5e292ZXJmbG93OmhpZGRlbjt0cmFuc2Zvcm06dHJhbnNsYXRlKCcrKGNvb3JkaW5hdGVzLnggKiAtMSkrJ3B4LCcrKGNvb3JkaW5hdGVzLnkgKiAtMSkrJ3B4KTt3aWR0aDogJyt0aGlzLmRvY3VtZW50V2lkdGgrJ3B4O2hlaWdodDogJyt0aGlzLmRvY3VtZW50SGVpZ2h0KydweDt9J1xyXG4gICAgICA6ICdib2R5e292ZXJmbG93OmhpZGRlbjt0cmFuc2Zvcm06dHJhbnNsYXRlKCcrKGNvb3JkaW5hdGVzLnggKiAtMSkrJ3B4LCcrKGNvb3JkaW5hdGVzLnkgKiAtMSkrJ3B4KX0nXHJcbiAgICApO1xyXG5cclxuICAgIC8v44K544Kv44Ot44O844Or5oOF5aCx44KS6L+U44GZXHJcbiAgICByZXR1cm4gY29vcmRpbmF0ZXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrXjgqTjgrjjg7PjgrDjga7jg6rjgrvjg4Pjg4hcclxuICAgKiDjgrnjgq/jg63jg7zjg6vkvY3nva7jgoLjg6rjgrvjg4Pjg4jjgZnjgotcclxuICAgKi9cclxuICBwdWJsaWMgcmVzZXRTaXppbmcoY29vcmRpbmF0ZXM6IENvb3JkaW5hdGVzKTogQ29vcmRpbmF0ZXMge1xyXG4gICAgLy9zdHlsZSDjga7jg6rjgrvjg4Pjg4hcclxuICAgIHRoaXMuX3JlbW92ZVN0eWxlKCk7XHJcblxyXG4gICAgLy/nj77lnKjjga7jgrnjgq/jg63jg7zjg6vkvY3nva7jgpLlj5blvpdcclxuICAgIGNvbnN0IGJlZm9yZUNvb3JkaW5hdGVzOiBDb29yZGluYXRlcyA9IHtcclxuICAgICAgeDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXS5zY3JvbGxUb3AsXHJcbiAgICAgIHk6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0uc2Nyb2xsTGVmdFxyXG4gICAgfTtcclxuXHJcbiAgICAvL+OCueOCr+ODreODvOODq+S9jee9ruOCkiBjb29yZGluYXRlcyDjgbjjg6rjgrvjg4Pjg4hcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0uc2Nyb2xsVG8oY29vcmRpbmF0ZXMueCwgY29vcmRpbmF0ZXMueSk7XHJcblxyXG4gICAgLy/kv67mraPliY3jga7jgrnjgq/jg63jg7zjg6vkvY3nva7jgpLov5TjgZlcclxuICAgIHJldHVybiBiZWZvcmVDb29yZGluYXRlcztcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7UmFuZ2UsIENvb3JkaW5hdGVzfSBmcm9tIFwiLi9jbGFzcy9pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHtTaXppbmd9IGZyb20gXCIuL2NsYXNzL1NpemluZ1wiO1xyXG5pbXBvcnQge0ZpbmRTdHlsZX0gZnJvbSBcIi4vY2xhc3MvRmluZFN0eWxlXCI7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xyXG5cclxuICAvL+OCteOCpOOCuuOCkuWPluW+l+OBmeOCi+OBn+OCgeOBruOCr+ODqeOCuVxyXG4gIGNvbnN0IHNpemluZyA9IG5ldyBTaXppbmcoKTtcclxuXHJcbiAgLy9wb3NpdGlvbjogZml4ZWQg44KS5o6h55So44GX44Gm44GE44KL6KaB57SgXHJcbiAgbGV0IGZpeGVkRWxlbWVudHM6IEhUTUxFbGVtZW50W10gPSBbXTtcclxuXHJcbiAgLy9wb3NpdGlvbjogZml4ZWQg44KS5o6h55So44GX44Gm44GE44KL6KaB57Sg44KS56K65L+d44GZ44KLXHJcbiAgY29uc3QgZ2V0Rml4ZWQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBmaW5kU3R5bGUgPSBuZXcgRmluZFN0eWxlKGRvY3VtZW50LmJvZHkpO1xyXG4gICAgZml4ZWRFbGVtZW50cyA9IGZpbmRTdHlsZS5maW5kKCdwb3NpdGlvbicsICdmaXhlZCcpO1xyXG4gIH1cclxuXHJcbiAgLy9wb3NpdGlvbjogZml4ZWQg44KS5o6h55So44GX44Gm44GE44KL6KaB57Sg44KS6Z2e6KGo56S644Gr44GZ44KLIG9yIOWFg+OBq+aIu+OBmVxyXG4gIGNvbnN0IGNvbnRyb2xGaXhlZCA9IChwcm9wZXJ0eTogJ2hpZGRlbicgfCAnJykgPT4ge1xyXG4gICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IGZpeGVkRWxlbWVudHMubGVuZ3RoOyBpIDwgbWF4OyBpID0gKGkgKyAxKSB8IDApIHtcclxuICAgICAgZml4ZWRFbGVtZW50c1tpXS5zdHlsZS52aXNpYmlsaXR5ID0gcHJvcGVydHk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy/ooajnpLrjgZXjgozjgabjgYTjgovjgr/jg5bjga7mg4XloLHjgpLov5TjgZlcclxuICBjb25zdCBpbmZvcm1hdGlvbiA9IChtYXg6IGJvb2xlYW4pID0+IHtcclxuICAgIHJldHVybiBzaXppbmcuZ2V0SW5mb3JtYXRpb24obWF4KTtcclxuICB9O1xyXG5cclxuICAvL+ODluODqeOCpuOCtuOBruWkp+OBjeOBleOCkumBqeWIh+OBquOCguOBruOBq+WkieOBiOOCi1xyXG4gIGNvbnN0IHN0eWxpbmcgPSAocmFuZ2U6IFJhbmdlLCBpbmRleDogbnVtYmVyLCBtYXg6IGJvb2xlYW4pID0+IHtcclxuICAgIC8v5Yem55CG57WC5LqG5b6M44Gu5bqn5qiZ5oOF5aCxXHJcbiAgICBsZXQgY29vcmRpbmF0ZTogQ29vcmRpbmF0ZXMgPSB7XHJcbiAgICAgIHg6IDAsXHJcbiAgICAgIHk6IDBcclxuICAgIH07XHJcblxyXG4gICAgLy9yYW5nZSDjgavjgojjgaPjgablh6bnkIbjgpLliIbjgZHjgotcclxuICAgIHN3aXRjaCAocmFuZ2UpIHtcclxuICAgICAgY2FzZSAnZnVsbCc6XHJcbiAgICAgICAgY29vcmRpbmF0ZSA9IHNpemluZy5mdWxsU2l6aW5nKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3BlcmZlY3QnOlxyXG4gICAgICAgIGNvb3JkaW5hdGUgPSBzaXppbmcuZGlzcGxheVNpemluZyhpbmRleCwgbWF4KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBjb29yZGluYXRlID0gc2l6aW5nLmRpc3BsYXlTaXppbmcobnVsbCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgLy/luqfmqJnmg4XloLHjgpLov5TjgZlcclxuICAgIHJldHVybiBjb29yZGluYXRlO1xyXG4gIH07XHJcblxyXG4gIC8v44OW44Op44Km44K244Gu5aSn44GN44GV44KS5YWD44Gr5oi744GZXHJcbiAgY29uc3QgcmVzZXRTaXppbmcgPSAoY29vcmRpbmF0ZXM6IENvb3JkaW5hdGVzKSA9PiB7XHJcbiAgICBzaXppbmcucmVzZXRTaXppbmcoY29vcmRpbmF0ZXMpO1xyXG4gIH07XHJcblxyXG4gIC8v44Oh44OD44K744O844K444OR44OD44K344Oz44KwXHJcbiAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xyXG4gICAgLy8g5Y+X44GR5Y+W44Gj44Gf5YCk44Gn5YiG5bKQXHJcbiAgICBzd2l0Y2ggKHJlcXVlc3QudHlwZSkge1xyXG4gICAgICBjYXNlICdpbmZvcm1hdGlvbic6XHJcbiAgICAgICAgc2VuZFJlc3BvbnNlKGluZm9ybWF0aW9uKHJlcXVlc3QubWF4KSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3NpemluZyc6XHJcbiAgICAgICAgc2VuZFJlc3BvbnNlKHN0eWxpbmcocmVxdWVzdC5yYW5nZSwgcmVxdWVzdC5pbmRleCwgcmVxdWVzdC5tYXgpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAna2lsbEZpeGVkJzpcclxuICAgICAgICBjb250cm9sRml4ZWQoJ2hpZGRlbicpO1xyXG4gICAgICAgIHNlbmRSZXNwb25zZSh7fSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3Jlc2V0U2l6aW5nJzpcclxuICAgICAgICBjb250cm9sRml4ZWQoJycpO1xyXG4gICAgICAgIHJlc2V0U2l6aW5nKHt4OiByZXF1ZXN0LngsIHk6IHJlcXVlc3QueX0pO1xyXG4gICAgICAgIHNlbmRSZXNwb25zZSh7fSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgc2VuZFJlc3BvbnNlKHt9KTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy9wb3NpdGlvbjogZml4ZWQg44KS5o6h55So44GX44Gm44GE44KL6KaB57Sg44Gu56K65L+dXHJcbiAgZ2V0Rml4ZWQoKTtcclxuXHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9