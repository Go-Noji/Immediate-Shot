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
/******/ 	return __webpack_require__(__webpack_require__.s = "../../../OneDrive/デスクトップ/_github/immediate_shot/src/page.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../OneDrive/デスクトップ/_github/immediate_shot/src/class/FindStyle.ts":
/*!*********************************************************************************!*\
  !*** c:/Users/go/OneDrive/デスクトップ/_github/immediate_shot/src/class/FindStyle.ts ***!
  \*********************************************************************************/
/*! exports provided: FindStyle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FindStyle", function() { return FindStyle; });
class FindStyle {
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

/***/ "../../../OneDrive/デスクトップ/_github/immediate_shot/src/class/Sizing.ts":
/*!******************************************************************************!*\
  !*** c:/Users/go/OneDrive/デスクトップ/_github/immediate_shot/src/class/Sizing.ts ***!
  \******************************************************************************/
/*! exports provided: Sizing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sizing", function() { return Sizing; });
/* harmony import */ var _FindStyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FindStyle */ "../../../OneDrive/デスクトップ/_github/immediate_shot/src/class/FindStyle.ts");

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

/***/ "../../../OneDrive/デスクトップ/_github/immediate_shot/src/page.ts":
/*!**********************************************************************!*\
  !*** c:/Users/go/OneDrive/デスクトップ/_github/immediate_shot/src/page.ts ***!
  \**********************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _class_Sizing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class/Sizing */ "../../../OneDrive/デスクトップ/_github/immediate_shot/src/class/Sizing.ts");
/* harmony import */ var _class_FindStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./class/FindStyle */ "../../../OneDrive/デスクトップ/_github/immediate_shot/src/class/FindStyle.ts");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2dvL09uZURyaXZlL+ODh+OCueOCr+ODiOODg+ODly9fZ2l0aHViL2ltbWVkaWF0ZV9zaG90L3NyYy9jbGFzcy9GaW5kU3R5bGUudHMiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2dvL09uZURyaXZlL+ODh+OCueOCr+ODiOODg+ODly9fZ2l0aHViL2ltbWVkaWF0ZV9zaG90L3NyYy9jbGFzcy9TaXppbmcudHMiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2dvL09uZURyaXZlL+ODh+OCueOCr+ODiOODg+ODly9fZ2l0aHViL2ltbWVkaWF0ZV9zaG90L3NyYy9wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFPLE1BQU0sU0FBUztJQWtEcEI7OztPQUdHO0lBQ0gsWUFBWSxJQUFpQjtRQUMzQixnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFakIsWUFBWTtRQUNaLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUU1QixNQUFNO1FBQ04sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBakREOzs7OztPQUtHO0lBQ0ssY0FBYyxDQUFDLE1BQVc7UUFDaEMsT0FBUSxNQUFNLEtBQUssSUFBSSxDQUFDO0lBQzFCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssYUFBYSxDQUFDLE1BQW1CO1FBQ3ZDLFNBQVM7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUzQixRQUFRO1FBQ1IsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUVqQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDL0QscUJBQXFCO1lBQ3JCLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFaEMsd0JBQXdCO1lBQ3hCLElBQUssQ0FBRSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNsQyxTQUFTO2FBQ1Y7WUFFRCxhQUFhO1lBQ2IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM1QjtJQUNILENBQUM7SUFpQkQ7Ozs7T0FJRztJQUNJLElBQUksQ0FBQyxRQUFnQixFQUFFLEtBQWE7UUFDekMsZ0JBQWdCO1FBQ2hCLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7UUFFekIsY0FBYztRQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDcEUseUJBQXlCO1lBQ3pCLElBQUksTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsS0FBSyxLQUFLLEVBQUU7Z0JBQ2xGLFNBQVM7YUFDVjtZQUVELGtCQUFrQjtZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvQjtRQUVELFNBQVM7UUFDVCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksUUFBUSxDQUFDLFNBQTZCLFFBQVE7UUFDbkQsYUFBYTtRQUNiLElBQUksTUFBTSxHQUFXLENBQUMsQ0FBQztRQUV2QixjQUFjO1FBQ2QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNwRSwyQkFBMkI7WUFDM0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxLQUFLLFFBQVE7Z0JBQzlCLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTTtnQkFDakQsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFFbkQsa0JBQWtCO1lBQ2xCLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtnQkFDbEIsU0FBUzthQUNWO1lBRUQsV0FBVztZQUNYLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDZjtRQUVELE9BQU87UUFDUCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBRUY7Ozs7Ozs7Ozs7Ozs7QUNwSEQ7QUFBQTtBQUFBO0FBQXNDO0FBRS9CLE1BQU0sTUFBTTtJQXVJakI7OztPQUdHO0lBQ0gsWUFBbUIsTUFBZSxLQUFLO1FBekl2QyxnQ0FBZ0M7UUFDeEIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFFaEMsaUNBQWlDO1FBQ3pCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBRWpDLGtDQUFrQztRQUMxQixrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUVsQyxtQ0FBbUM7UUFDM0IsbUJBQWMsR0FBVyxDQUFDLENBQUM7UUFFbkMsUUFBUTtRQUNBLFVBQUssR0FBVyxDQUFDLENBQUM7UUFFMUIsbUJBQW1CO1FBQ1gsY0FBUyxHQUF1QixRQUFRLENBQUM7UUFFakQsNERBQTREO1FBQ3BELHVCQUFrQixHQUFXLENBQUMsQ0FBQztRQUV2Qyw4REFBOEQ7UUFDdEQsd0JBQW1CLEdBQVcsQ0FBQyxDQUFDO1FBRXhDLFVBQVU7UUFDRixrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUVsQyw2QkFBNkI7UUFDckIsWUFBTyxHQUFXLENBQUMsQ0FBQztRQUU1Qiw2QkFBNkI7UUFDckIsWUFBTyxHQUFXLENBQUMsQ0FBQztRQTJHMUIsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxHQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFL0QsWUFBWTtRQUNaLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBM0dEOzs7T0FHRztJQUNLLFlBQVk7UUFDbEIsU0FBUztRQUNULE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXRELHVCQUF1QjtRQUN2QixJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7WUFDbkIsT0FBTztTQUNSO1FBRUQsU0FBUztRQUNULE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyxZQUFZLENBQUMsS0FBYTtRQUNoQyxNQUFNO1FBQ04sSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBCLGFBQWE7UUFDYixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUV0QixVQUFVO1FBQ1YsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSyxxQkFBcUIsQ0FBQyxLQUFhO1FBQ3pDLE9BQU87WUFDTCxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVztZQUN0RixDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsWUFBWTtTQUN4RixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7T0FHRztJQUNLLGtCQUFrQixDQUFDLEdBQVk7UUFDckMsaUJBQWlCO1FBQ2pCLElBQUksU0FBUyxHQUFHLElBQUksb0RBQVMsQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV4RSxVQUFVO1FBQ1YsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUV2Qyx1QkFBdUI7UUFDdkIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3RKLElBQUksYUFBYSxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUUzSix1Q0FBdUM7UUFDdkMsSUFBSSxHQUFHLEVBQUU7WUFDUCxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMvQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUNsRDtRQUVELFdBQVc7UUFDWCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQztRQUVqRCxhQUFhO1FBQ2IsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3pELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUU1RCx3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztRQUNqRSxJQUFJLENBQUMsU0FBUyxHQUFHLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBRS9ELHdCQUF3QjtRQUN4QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFN0MsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRTlFLFVBQVU7UUFDVixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUM7UUFFeEUsZUFBZTtRQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDaEMsQ0FBQztJQWNEOzs7T0FHRztJQUNJLGNBQWMsQ0FBQyxNQUFlLEtBQUs7UUFDeEMsT0FBTztRQUNQLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU3QixTQUFTO1FBQ1QsT0FBTztZQUNMLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVztZQUM3QixZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDL0IsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQ2pDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztZQUNuQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCO1lBQzNDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUI7WUFDN0MsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQ2pDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztTQUN0QjtJQUNILENBQUM7SUFFRDs7T0FFRztJQUNJLFVBQVU7UUFDZixhQUFhO1FBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxtRUFBbUUsR0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZHLGdCQUFnQjtRQUNoQixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV0QixVQUFVO1FBQ1YsT0FBTztZQUNMLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7U0FDTCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW9CRztJQUNJLGFBQWEsQ0FBQyxRQUFxQixJQUFJLEVBQUUsTUFBZSxLQUFLO1FBQ2xFLHdDQUF3QztRQUN4QyxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7WUFDbEIsYUFBYTtZQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUUzQyxVQUFVO1lBQ1YsT0FBTztnQkFDTCxDQUFDLEVBQUUsQ0FBQztnQkFDSixDQUFDLEVBQUUsQ0FBQzthQUNMLENBQUM7U0FDSDtRQUVELG9DQUFvQztRQUNwQyxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7WUFDZixRQUFRLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN6RDtRQUVELFVBQVU7UUFDVixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdEQseURBQXlEO1FBQ3pELElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRztZQUNuQixDQUFDLENBQUMsMkNBQTJDLEdBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUMsS0FBSyxHQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFDLGFBQWEsR0FBQyxJQUFJLENBQUMsYUFBYSxHQUFDLGFBQWEsR0FBQyxJQUFJLENBQUMsY0FBYyxHQUFDLE1BQU07WUFDdkssQ0FBQyxDQUFDLDJDQUEyQyxHQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFDLEtBQUssR0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBQyxNQUFNLENBQ3JHLENBQUM7UUFFRixZQUFZO1FBQ1osT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFdBQVcsQ0FBQyxXQUF3QjtRQUN6QyxhQUFhO1FBQ2IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBCLGVBQWU7UUFDZixNQUFNLGlCQUFpQixHQUFnQjtZQUNyQyxDQUFDLEVBQUUsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7WUFDckQsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVO1NBQ3ZELENBQUM7UUFFRiw0QkFBNEI7UUFDNUIsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVoRixnQkFBZ0I7UUFDaEIsT0FBTyxpQkFBaUIsQ0FBQztJQUMzQixDQUFDO0NBRUY7Ozs7Ozs7Ozs7Ozs7QUN2UUQ7QUFBQTtBQUFBO0FBQXNDO0FBQ007QUFDNUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7SUFFbkMsZ0JBQWdCO0lBQ2hCLE1BQU0sTUFBTSxHQUFHLElBQUksb0RBQU0sRUFBRSxDQUFDO0lBRTVCLDJCQUEyQjtJQUMzQixJQUFJLGFBQWEsR0FBa0IsRUFBRSxDQUFDO0lBRXRDLGdDQUFnQztJQUNoQyxNQUFNLFFBQVEsR0FBRyxHQUFHLEVBQUU7UUFDcEIsTUFBTSxTQUFTLEdBQUcsSUFBSSwwREFBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxhQUFhLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELDBDQUEwQztJQUMxQyxNQUFNLFlBQVksR0FBRyxDQUFDLFFBQXVCLEVBQUUsRUFBRTtRQUMvQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDcEUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1NBQzlDO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCO0lBQ2pCLE1BQU0sV0FBVyxHQUFHLENBQUMsR0FBWSxFQUFFLEVBQUU7UUFDbkMsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLENBQUMsQ0FBQztJQUVGLG9CQUFvQjtJQUNwQixNQUFNLE9BQU8sR0FBRyxDQUFDLEtBQVksRUFBRSxLQUFhLEVBQUUsR0FBWSxFQUFFLEVBQUU7UUFDNUQsWUFBWTtRQUNaLElBQUksVUFBVSxHQUFnQjtZQUM1QixDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1NBQ0wsQ0FBQztRQUVGLGtCQUFrQjtRQUNsQixRQUFRLEtBQUssRUFBRTtZQUNiLEtBQUssTUFBTTtnQkFDVCxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNqQyxNQUFNO1lBQ1IsS0FBSyxTQUFTO2dCQUNaLFVBQVUsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDOUMsTUFBTTtZQUNSO2dCQUNFLFVBQVUsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN4QyxNQUFNO1NBQ1Q7UUFFRCxTQUFTO1FBQ1QsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQyxDQUFDO0lBRUYsZUFBZTtJQUNmLE1BQU0sV0FBVyxHQUFHLENBQUMsV0FBd0IsRUFBRSxFQUFFO1FBQy9DLE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0lBRUYsWUFBWTtJQUNaLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUU7UUFDckUsWUFBWTtRQUNaLFFBQVEsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNwQixLQUFLLGFBQWE7Z0JBQ2hCLFlBQVksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pFLE1BQU07WUFDUixLQUFLLFdBQVc7Z0JBQ2QsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN2QixZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pCLE1BQU07WUFDUixLQUFLLGFBQWE7Z0JBQ2hCLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDakIsV0FBVyxDQUFDLEVBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO2dCQUMxQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pCLE1BQU07WUFDUjtnQkFDRSxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pCLE1BQU07U0FDVDtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsOEJBQThCO0lBQzlCLFFBQVEsRUFBRSxDQUFDO0FBRWIsQ0FBQyxDQUFDLENBQUMiLCJmaWxlIjoicGFnZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuLi8uLi8uLi9PbmVEcml2ZS/jg4fjgrnjgq/jg4jjg4Pjg5cvX2dpdGh1Yi9pbW1lZGlhdGVfc2hvdC9zcmMvcGFnZS50c1wiKTtcbiIsImV4cG9ydCBjbGFzcyBGaW5kU3R5bGUge1xyXG5cclxuICAvKipcclxuICAgKiBjb25zdHJ1Y3RvciDjgafmjL/lhaXjgZnjgosgSFRNTEVsZW1lbnRcclxuICAgKiDjgZPjga7opoHntKDjgavjgbbjgonkuIvjgYzjgaPjgabjgYTjgosgRE9NIOODhOODquODvOOBjOWvvuixoVxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IHJvb3Q6IEhUTUxFbGVtZW50O1xyXG5cclxuICAvKipcclxuICAgKiByb290IOS4i+OBruWFqCBIVE1MRWxlbWVudFxyXG4gICAqIOmajuWxpOalruOBr+eEoeOBj+OAgeS4gOasoeWFg+mFjeWIl+OBqOOBl+OBpuaNleaNiVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZWxlbWVudHM6IEhUTUxFbGVtZW50W107XHJcblxyXG4gIC8qKlxyXG4gICAqIHRhcmdldCDjgYwgbnVsbCDjgafjgarjgYTjgZPjgajjgpLkv53oqLzjgZnjgosgVHlwZSBndWFyZFxyXG4gICAqIEhUTUxFbGVtZW50LmNoaWxkcmVuIOOBi+OCieWPluOBo+OBpuOBjeOBn+OCquODluOCuOOCp+OCr+ODiOOBq+WvvuOBl+OBpueUqOOBhOOCi1xyXG4gICAqIEBwYXJhbSB0YXJnZXRcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2lzSFRNTEVsZW1lbnQodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgSFRNTEVsZW1lbnQge1xyXG4gICAgcmV0dXJuICB0YXJnZXQgIT09IG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBwYXJlbnQg5LiL44Gr44G244KJ5LiL44GM44KLIERPTSDjg4Tjg6rjg7zjgpLlho3luLDnmoTjgavlj5blvpfjgZfjgIF0aGlzLmVsZW1lbnRzIOOBq+i/veWKoOOBmeOCi1xyXG4gICAqIEBwYXJhbSBwYXJlbnRcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2ZpbmRDaGlsZHJlbihwYXJlbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAvL+iHqui6q+OCknB1c2hcclxuICAgIHRoaXMuZWxlbWVudHMucHVzaChwYXJlbnQpO1xyXG5cclxuICAgIC8v5a2Q6KaB57Sg44Gu5Y+W5b6XXHJcbiAgICBjb25zdCBjaGlsZHJlbiA9IHBhcmVudC5jaGlsZHJlbjtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbWF4OyBpID0gKGkgKyAxKSB8IDApIHtcclxuICAgICAgLy/jgr/jgqTjg5fjgqzjg7zjg4njgpLpgJrjgZnjgZ/jgoHjgIHkuIDml6blpInmlbDjgbjmoLzntI1cclxuICAgICAgY29uc3QgdGFyZ2V0ID0gY2hpbGRyZW4uaXRlbShpKTtcclxuXHJcbiAgICAgIC8vdGFyZ2V0IOOBjCBudWxsIOOBp+OBquOBhOOBk+OBqOOCkuS/neiovFxyXG4gICAgICBpZiAoICEgdGhpcy5faXNIVE1MRWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8v5YaN5biw55qE44Gr44GT44Gu6Zai5pWw44KS5ZG844G2XHJcbiAgICAgIHRoaXMuX2ZpbmRDaGlsZHJlbih0YXJnZXQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44OJ44Kt44Ol44Oh44Oz44OI44Or44O844OI44KS56K65L+d44GX44CB5qSc57Si5a++6LGh44Gu6KaB57Sg44KS5o2V5o2J44GZ44KLXHJcbiAgICogQHBhcmFtIHJvb3RcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihyb290OiBIVE1MRWxlbWVudCkge1xyXG4gICAgLy/mpJzntKLlr77osaHjg4Tjg6rjg7zjga7opqropoHntKDjgpLnmbvpjLJcclxuICAgIHRoaXMucm9vdCA9IHJvb3Q7XHJcblxyXG4gICAgLy/mpJzntKLntZDmnpzphY3liJfjgpLliJ3mnJ/ljJZcclxuICAgIHRoaXMuZWxlbWVudHMgPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAvL+aknOe0oumWi+Wni1xyXG4gICAgdGhpcy5fZmluZENoaWxkcmVuKHJvb3QpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY3NzIOOBqOOBl+OBpiBwcm9wZXJ0eTogdmFsdWUg44GM6YGp55So44GV44KM44Gm44GE44KL6KaB57Sg44KSIHRoaXMuZWxlbWVudHMg44GL44KJ5Y+W5b6X44GZ44KLXHJcbiAgICogQHBhcmFtIHByb3BlcnR5XHJcbiAgICogQHBhcmFtIHZhbHVlXHJcbiAgICovXHJcbiAgcHVibGljIGZpbmQocHJvcGVydHk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IEhUTUxFbGVtZW50W10ge1xyXG4gICAgLy/jgZPjga7jg6Hjgr3jg4Pjg4njgYzov5TjgZnphY3liJfjga7nlKjmhI9cclxuICAgIGxldCByZXN1bHQgPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAvL+aNleaNiea4iOOBv+OBruimgee0oOOCkumAkOS4gOaknOe0olxyXG4gICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IHRoaXMuZWxlbWVudHMubGVuZ3RoOyBpIDwgbWF4OyBpID0gKGkgKyAxKSB8IDApIHtcclxuICAgICAgLy/oqIjnrpfmuIjjgb8gY3NzIOOBjOWQiOiHtOOBl+OBpuOBhOOBquOBi+OBo+OBn+OCieOCueODq+ODvFxyXG4gICAgICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50c1tpXSkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSkgIT09IHZhbHVlKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8v6Kmy5b2T6KaB57Sg44Go44GX44Gm5qSc57Si57WQ5p6c6YWN5YiX44Gr6L+95YqgXHJcbiAgICAgIHJlc3VsdC5wdXNoKHRoaXMuZWxlbWVudHNbaV0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6Kmy5b2T6KaB57Sg44KS6L+U44GZXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5YWo6KaB57Sg5Lit44Gn5pyA5aSn44GuIHdpZHRoLCDjgoLjgZfjgY/jga8gaGVpZ2h0IOOCkui/lOOBmVxyXG4gICAqIEBwYXJhbSB0YXJnZXRcclxuICAgKi9cclxuICBwdWJsaWMgaGlnaFNpemUodGFyZ2V0OiAnd2lkdGgnIHwgJ2hlaWdodCcgPSAnaGVpZ2h0Jyk6IG51bWJlcntcclxuICAgIC8v44GT44Gu44Oh44K944OD44OJ44GM6L+U44GZ5pWw5YCkXHJcbiAgICBsZXQgcmVzdWx0OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8v5o2V5o2J5riI44G/44Gu6KaB57Sg44KS6YCQ5LiA5qSc57SiXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gdGhpcy5lbGVtZW50cy5sZW5ndGg7IGkgPCBtYXg7IGkgPSAoaSArIDEpIHwgMCkge1xyXG4gICAgICAvL+OCteOCpOOCuuOBruioiOa4rOWvvuixoSh3aWR0aCBvciBoZWlnaHQpXHJcbiAgICAgIGNvbnN0IHNpemUgPSB0YXJnZXQgPT09ICdoZWlnaHQnXHJcbiAgICAgICAgPyB0aGlzLmVsZW1lbnRzW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodFxyXG4gICAgICAgIDogdGhpcy5lbGVtZW50c1tpXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcclxuXHJcbiAgICAgIC8vcmVzdWx0IOS7peS4i+OBoOOBo+OBn+OCieOCueODq+ODvFxyXG4gICAgICBpZiAocmVzdWx0ID49IHNpemUpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy/mnIDpq5jlgKTjgpLmm7jjgY3mj5vjgYjjgotcclxuICAgICAgcmVzdWx0ID0gc2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+e1kOaenOOCkui/lOOBmVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7Q29vcmRpbmF0ZXMsIEluZm9ybWF0aW9ufSBmcm9tIFwic3JjL2NsYXNzL2ludGVyZmFjZVwiO1xyXG5pbXBvcnQge0ZpbmRTdHlsZX0gZnJvbSBcIi4vRmluZFN0eWxlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2l6aW5nIHtcclxuXHJcbiAgLy9jb25zdHJ1Y3RvcigpIOaZgueCueOBriB3aW5kb3cgd2lkdGhcclxuICBwcml2YXRlIHdpbmRvd1dpZHRoOiBudW1iZXIgPSAwO1xyXG5cclxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544GuIHdpbmRvdyBoZWlnaHRcclxuICBwcml2YXRlIHdpbmRvd0hlaWdodDogbnVtYmVyID0gMDtcclxuXHJcbiAgLy9jb25zdHJ1Y3RvcigpIOaZgueCueOBriBkb2N1bWVudCB3aWR0aFxyXG4gIHByaXZhdGUgZG9jdW1lbnRXaWR0aDogbnVtYmVyID0gMDtcclxuXHJcbiAgLy9jb25zdHJ1Y3RvcigpIOaZgueCueOBriBkb2N1bWVudCBoZWlnaHRcclxuICBwcml2YXRlIGRvY3VtZW50SGVpZ2h0OiBudW1iZXIgPSAwO1xyXG5cclxuICAvL+eUu+mdoue4ruWwj+avlOeOh1xyXG4gIHByaXZhdGUgcmF0aW86IG51bWJlciA9IDA7XHJcblxyXG4gIC8v55S76Z2i44KS5bmF44Go6auY44GV44Gu44Gp44Gh44KJ44Gn57iu5bCP44GX44Gf44GLXHJcbiAgcHJpdmF0ZSByYXRpb1R5cGU6ICd3aWR0aCcgfCAnaGVpZ2h0JyA9ICdoZWlnaHQnO1xyXG5cclxuICAvL2RvY3VtZW50V2lkdGgg44KS54++5Zyo44GuIHdpbmRvd1dpZHRoIOOBruWkp+OBjeOBleOBp+OCreODo+ODl+ODgeODo+OBmeOCi+OBq+OBr+aoquOBq+S9leaemuOCreODo+ODl+ODgeODo+OBjOW/heimgeOBi1xyXG4gIHByaXZhdGUgd2lkdGhDYXB0dXJlTnVtYmVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAvL2RvY3VtZW50SGVpZ2h0IOOCkuePvuWcqOOBriB3aW5kb3dIZWlnaHQg44Gu5aSn44GN44GV44Gn44Kt44Oj44OX44OB44Oj44GZ44KL44Gr44Gv57im44Gr5L2V5p6a44Kt44Oj44OX44OB44Oj44GM5b+F6KaB44GLXHJcbiAgcHJpdmF0ZSBoZWlnaHRDYXB0dXJlTnVtYmVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAvL+S4iuiomOS6jOOBpOOBruS5l+eul+WApFxyXG4gIHByaXZhdGUgY2FwdHVyZU51bWJlcjogbnVtYmVyID0gMDtcclxuXHJcbiAgLy9jb25zdHJ1Y3RvcigpIOaZgueCueOBruOCueOCr+ODreODvOODq+S9jee9rijmqKopXHJcbiAgcHJpdmF0ZSBzY3JvbGxYOiBudW1iZXIgPSAwO1xyXG5cclxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544Gu44K544Kv44Ot44O844Or5L2N572uKOe4pilcclxuICBwcml2YXRlIHNjcm9sbFk6IG51bWJlciA9IDA7XHJcblxyXG4gIC8v44GT44Gu44Kv44Op44K544GM5omx44GGIDxzdHlsZT4g44K/44Kw44GuIGlkIOWxnuaAp+WApFxyXG4gIHJlYWRvbmx5IFNUWUxFX0lEOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIOOBk+OBruOCr+ODqeOCueOBjOS7lei+vOOCk+OBoCBzdHlsZSDjgr/jgrDjgpLliYrpmaTjgZnjgotcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3JlbW92ZVN0eWxlKCkge1xyXG4gICAgLy/liYrpmaTlr77osaHjga7lj5blvpdcclxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuU1RZTEVfSUQpO1xyXG5cclxuICAgIC8vdGFyZ2V0IOOBjOWtmOWcqOOBl+OBquOBi+OBo+OBn+OCieS9leOCguOBl+OBquOBhFxyXG4gICAgaWYgKHRhcmdldCA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy/lr77osaHjgpLliYrpmaTjgZnjgotcclxuICAgIHRhcmdldC5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHN0eWxlIOOCv+OCsOOCkuaMv+WFpeOBmeOCi1xyXG4gICAqIOaXouOBq+OBk+OBruOCr+ODqeOCueOBjOaJseOBo+OBpuOBhOOCiyBzdHlsZSDjgYzlrZjlnKjjgZfjgZ/loLTlkIjjga/jg6rjgrvjg4Pjg4jjgZnjgotcclxuICAgKiBAcGFyYW0gc3R5bGVcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2FwcGVuZFN0eWxlKHN0eWxlOiBzdHJpbmcpIHtcclxuICAgIC8v44Oq44K744OD44OIXHJcbiAgICB0aGlzLl9yZW1vdmVTdHlsZSgpO1xyXG5cclxuICAgIC8vc3R5bGUg44K/44Kw44KS55So5oSPXHJcbiAgICBjb25zdCB0YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG4gICAgdGFnLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLlNUWUxFX0lEKTtcclxuICAgIHRhZy5pbm5lclRleHQgPSBzdHlsZTtcclxuXHJcbiAgICAvL3RhZyDjgr/jgrDmjL/lhaVcclxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodGFnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaMh+WumuOBleOCjOOBnyBpbmRleCDjgYvjgonjgrnjgq/jg63jg7zjg6vjgZnjgbnjgY3luqfmqJnjgpLov5TjgZlcclxuICAgKiBAcGFyYW0gaW5kZXhcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2dldFNjcm9sbENvb3JkaW5hdGVzKGluZGV4OiBudW1iZXIpOiBDb29yZGluYXRlcyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4OiBNYXRoLmZsb29yKGluZGV4ICUgdGhpcy53aWR0aENhcHR1cmVOdW1iZXIpICUgdGhpcy5jYXB0dXJlTnVtYmVyICogdGhpcy53aW5kb3dXaWR0aCxcclxuICAgICAgeTogTWF0aC5mbG9vcihpbmRleCAvIHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyKSAlIHRoaXMuY2FwdHVyZU51bWJlciAqIHRoaXMud2luZG93SGVpZ2h0XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5ZCE56iu5oOF5aCx44KS44Ki44OD44OX44OH44O844OI44GZ44KLXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF91cGRhdGVJbmZvcm1hdGlvbihtYXg6IGJvb2xlYW4pIHtcclxuICAgIC8v5YWo6KaB57Sg44K144Kk44K65Y+W5b6X55So44Kk44Oz44K544K/44Oz44K5XHJcbiAgICBsZXQgZmluZFN0eWxlID0gbmV3IEZpbmRTdHlsZShkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaHRtbCcpWzBdKTtcclxuXHJcbiAgICAvL+OCpuOCo+ODs+ODieOCpuOCteOCpOOCulxyXG4gICAgdGhpcy53aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgdGhpcy53aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgLy/jg4njgq3jg6Xjg6Hjg7Pjg4jjgrXjgqTjgrrjga7mnIDlpKflgKTjgpLlj5blvpfjgZnjgovjg6rjgrnjg4hcclxuICAgIGxldCB3aWR0aFNvdXJjZXMgPSBbZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCwgZG9jdW1lbnQuYm9keS5zY3JvbGxXaWR0aCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFdpZHRoLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGhdO1xyXG4gICAgbGV0IGhlaWdodFNvdXJjZXMgPSBbZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQsIGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XTtcclxuXHJcbiAgICAvL+OCguOBlyBtYXggPT09IHRydWUg44Gg44Gj44Gf44KJ5Y+W5b6X44Oq44K544OI44Gr5YWo6KaB57Sg44Gu5pyA5aSn5YCk44KS5Yqg44GI44KLXHJcbiAgICBpZiAobWF4KSB7XHJcbiAgICAgIHdpZHRoU291cmNlcy5wdXNoKGZpbmRTdHlsZS5oaWdoU2l6ZSgnd2lkdGgnKSk7XHJcbiAgICAgIGhlaWdodFNvdXJjZXMucHVzaChmaW5kU3R5bGUuaGlnaFNpemUoJ2hlaWdodCcpKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+ODieOCreODpeODoeODs+ODiOOCteOCpOOCulxyXG4gICAgdGhpcy5kb2N1bWVudFdpZHRoID0gTWF0aC5tYXgoLi4ud2lkdGhTb3VyY2VzKTtcclxuICAgIHRoaXMuZG9jdW1lbnRIZWlnaHQgPSBNYXRoLm1heCguLi5oZWlnaHRTb3VyY2VzKTtcclxuXHJcbiAgICAvL+W5heOBqOmrmOOBleOBneOCjOOBnuOCjOOBruWJsuWQiFxyXG4gICAgY29uc3Qgd2lkdGhSYXRpbyA9IHRoaXMud2luZG93V2lkdGggLyB0aGlzLmRvY3VtZW50V2lkdGg7XHJcbiAgICBjb25zdCBoZWlnaHRSYXRpbyA9IHRoaXMud2luZG93SGVpZ2h0IC8gdGhpcy5kb2N1bWVudEhlaWdodDtcclxuXHJcbiAgICAvL3JhdGlvIOOBqCByYXRpb1R5cGUg44Gu44K744OD44OIXHJcbiAgICB0aGlzLnJhdGlvID0gd2lkdGhSYXRpbyA+IGhlaWdodFJhdGlvID8gaGVpZ2h0UmF0aW8gOiB3aWR0aFJhdGlvO1xyXG4gICAgdGhpcy5yYXRpb1R5cGUgPSB3aWR0aFJhdGlvID4gaGVpZ2h0UmF0aW8gPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XHJcblxyXG4gICAgLy9yYXRpbyDjgYwgMSDku6XkuIrjgaDjgaPjgZ/jgokgMSDjgajjgZnjgotcclxuICAgIHRoaXMucmF0aW8gPSB0aGlzLnJhdGlvID4gMSA/IDEgOiB0aGlzLnJhdGlvO1xyXG5cclxuICAgIC8v57im44Go5qiq44Gr44GK44GE44Gm44Gd44KM44Ge44KM54++5Zyo44Gu44Km44Kj44Oz44OJ44Km44K144Kk44K65L2V5p6a5YiG44Gn5YWo55S76Z2i44KS5o2V5o2J44Gn44GN44KL44GL44Gu5pWw5YCk44KS566X5Ye6XHJcbiAgICB0aGlzLndpZHRoQ2FwdHVyZU51bWJlciA9IE1hdGguY2VpbCh0aGlzLmRvY3VtZW50V2lkdGggLyB0aGlzLndpbmRvd1dpZHRoKTtcclxuICAgIHRoaXMuaGVpZ2h0Q2FwdHVyZU51bWJlciA9IE1hdGguY2VpbCh0aGlzLmRvY3VtZW50SGVpZ2h0IC8gdGhpcy53aW5kb3dIZWlnaHQpO1xyXG5cclxuICAgIC8v5LiK6KiY5LqM44Gk44Gu5LmX566X5YCkXHJcbiAgICB0aGlzLmNhcHR1cmVOdW1iZXIgPSB0aGlzLndpZHRoQ2FwdHVyZU51bWJlciAqIHRoaXMuaGVpZ2h0Q2FwdHVyZU51bWJlcjtcclxuXHJcbiAgICAvL+ePvuWcqOOBruOCueOCr+ODreODvOODq+W6p+aomeOCkuiomOmMslxyXG4gICAgdGhpcy5zY3JvbGxYID0gd2luZG93LnNjcm9sbFg7XHJcbiAgICB0aGlzLnNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWQhOOCteOCpOOCuuaDheWgseOCkuWPluW+l+ODu+ioiOeul+ODu+S/neaMgeOBmeOCi1xyXG4gICAqIOWKoOOBiOOBpuW/heeUqOOBquWumuaVsOOCguS/neeuoeOBmeOCi1xyXG4gICAqL1xyXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihtYXg6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgLy9zdHlsZSDjgr/jgrDjgavkvb/nlKjjgZnjgosgaWRcclxuICAgIHRoaXMuU1RZTEVfSUQgPSAnc2l6aW5nXycrTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoLTgpO1xyXG5cclxuICAgIC8v5ZCE56iu5oOF5aCx44KS44K744OD44OI44GZ44KLXHJcbiAgICB0aGlzLl91cGRhdGVJbmZvcm1hdGlvbihtYXgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5oOF5aCx44KS6L+U44GZXHJcbiAgICogQHJldHVybiB7e2RvY3VtZW50V2lkdGg6IG51bWJlciB8ICosIGRvY3VtZW50SGVpZ2h0OiBudW1iZXIgfCAqLCB3aW5kb3dIZWlnaHQ6IG51bWJlciB8ICosIHJhdGlvVHlwZTogc3RyaW5nLCB3aW5kb3dXaWR0aDogbnVtYmVyIHwgKiwgcmF0aW86ICgqfG51bWJlcil9fVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRJbmZvcm1hdGlvbihtYXg6IGJvb2xlYW4gPSBmYWxzZSk6IEluZm9ybWF0aW9uIHtcclxuICAgIC8v5oOF5aCx44Gu5pu05pawXHJcbiAgICB0aGlzLl91cGRhdGVJbmZvcm1hdGlvbihtYXgpO1xyXG5cclxuICAgIC8v6KiI566X57WQ5p6c44KS6L+U44GZXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB3aW5kb3dXaWR0aDogdGhpcy53aW5kb3dXaWR0aCxcclxuICAgICAgd2luZG93SGVpZ2h0OiB0aGlzLndpbmRvd0hlaWdodCxcclxuICAgICAgZG9jdW1lbnRXaWR0aDogdGhpcy5kb2N1bWVudFdpZHRoLFxyXG4gICAgICBkb2N1bWVudEhlaWdodDogdGhpcy5kb2N1bWVudEhlaWdodCxcclxuICAgICAgd2lkdGhDYXB0dXJlTnVtYmVyOiB0aGlzLndpZHRoQ2FwdHVyZU51bWJlcixcclxuICAgICAgaGVpZ2h0Q2FwdHVyZU51bWJlcjogdGhpcy5oZWlnaHRDYXB0dXJlTnVtYmVyLFxyXG4gICAgICBjYXB0dXJlTnVtYmVyOiB0aGlzLmNhcHR1cmVOdW1iZXIsXHJcbiAgICAgIHJhdGlvOiB0aGlzLnJhdGlvLFxyXG4gICAgICByYXRpb1R5cGU6IHRoaXMucmF0aW9UeXBlLFxyXG4gICAgICBzY3JvbGxYOiB0aGlzLnNjcm9sbFgsXHJcbiAgICAgIHNjcm9sbFk6IHRoaXMuc2Nyb2xsWVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44OV44Or44K144Kk44K655So44Gu44K144Kk44K444Oz44Kw5Yem55CG44KS6KGM44GGXHJcbiAgICovXHJcbiAgcHVibGljIGZ1bGxTaXppbmcoKTogQ29vcmRpbmF0ZXMge1xyXG4gICAgLy9zdHlsZSDjgr/jgrDjgpLnlJ/miJBcclxuICAgIHRoaXMuX2FwcGVuZFN0eWxlKCdib2R5e292ZXJmbG93OmhpZGRlbjt0cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0IHRvcDt0cmFuc2Zvcm06IHNjYWxlKCcrdGhpcy5yYXRpbysnKX0nKTtcclxuXHJcbiAgICAvL+OCueOCr+ODreODvOODq+S9jee9ruOCkiAwIOOBq+OBmeOCi1xyXG4gICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xyXG5cclxuICAgIC8vMCwgMCDjgpLov5TjgZlcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHg6IDAsXHJcbiAgICAgIHk6IDBcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrnjgq/jg63jg7zjg6vjg5Djg7zjgpLmtojjgZnjgaDjgZHjga7jgrXjgqTjgrjjg7PjgrDlh6bnkIbjgpLooYzjgYZcclxuICAgKiDjgrnjgq/jg63jg7zjg6vkvY3nva7jga8gaW5kZXgg55Wq5Y+344Gn5oyH5a6a44GZ44KLXHJcbiAgICogaW5kZXgg44GMIG51bGwg44Gg44Gj44Gf5aC05ZCI44Gv44K544Kv44Ot44O844Or44KS5aSJ5pu044GX44Gq44GEXHJcbiAgICog44GT44GuIGluZGV4IOeVquWPt+OBryBnZXRJbmZvcm1hdGlvbigpIOOBp+WPluW+l+OBp+OBjeOCiyBjYXB0dXJlTnVtYmVyIOOBruevhOWbsuOBp+aMh+WumuOBl+OAgVxyXG4gICAqIOS+i+OBiOOBsFxyXG4gICAqIHdpZHRoQ2FwdHVyZU51bWJlciA9IDRcclxuICAgKiBoZWlnaHRDYXB0dXJlTnVtYmVyID0gM1xyXG4gICAqIGNhcHR1cmVOdW1iZXIgPSAxMlxyXG4gICAqIOOBoOOBo+OBn+WgtOWQiOOBr1xyXG4gICAqICstLS0tKy0tLS0rLS0tLSstLS0tK1xyXG4gICAqIHwgIDAgIHwgIDEgIHwgIDIgIHwgIDMgIHxcclxuICAgKiArLS0tLSstLS0tKy0tLS0rLS0tLStcclxuICAgKiB8ICA0ICB8ICA1ICB8ICA2ICB8ICA3ICB8XHJcbiAgICogKy0tLS0rLS0tLSstLS0tKy0tLS0rXHJcbiAgICogfCAgOCAgfCAgOSAgfCAxMCB8IDExIHxcclxuICAgKiArLS0tLSstLS0tKy0tLS0rLS0tLStcclxuICAgKiDjgajjgYTjgaPjgZ/lkITjg57jgrnjga7lt6bkuIrluqfmqJnjgbjjgrnjgq/jg63jg7zjg6vjgZnjgovjgZPjgajjgavjgarjgotcclxuICAgKiDlkITjg57jgrnjga4gd2lkdGgsIGhlaWdodCA9IHdpbmRvd1dpZHRoLCB3aW5kb3dIZWlnaHRcclxuICAgKiDlpKfmnqDjga4gd2lkdGgsIGhlaWdodCA9IGRvY3VtZW50V2lkdGgsIGRvY3VtZW50SGVpZ2h0XHJcbiAgICovXHJcbiAgcHVibGljIGRpc3BsYXlTaXppbmcoaW5kZXg6IG51bWJlcnxudWxsID0gbnVsbCwgbWF4OiBib29sZWFuID0gZmFsc2UpOiBDb29yZGluYXRlcyB7XHJcbiAgICAvL2luZGV4IOaMh+WumuOBjOeEoeOBi+OBo+OBn+OCiSBzdHlsZSDjgr/jgrDjgpLpgannlKjjga7lvozjgIEoMCwgMCnjgpLov5TjgZlcclxuICAgIGlmIChpbmRleCA9PT0gbnVsbCkge1xyXG4gICAgICAvL3N0eWxlIOOCv+OCsOOCkueUn+aIkFxyXG4gICAgICB0aGlzLl9hcHBlbmRTdHlsZSgnYm9keXtvdmVyZmxvdzpoaWRkZW59Jyk7XHJcblxyXG4gICAgICAvLygwLCAwKei/lOOBmVxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHg6IDAsXHJcbiAgICAgICAgeTogMFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8v44KC44GXIGluZGV4IOOBjCAwIOOBoOOBo+OBn+OCieOCueOCr+ODreODvOODq+S9jee9ruOCkiAwLCAwIOOBq+OBmeOCi1xyXG4gICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0uc2Nyb2xsVG8oMCwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/np7vli5XlhYjluqfmqJnjga7lrprnvqlcclxuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gdGhpcy5fZ2V0U2Nyb2xsQ29vcmRpbmF0ZXMoaW5kZXgpO1xyXG5cclxuICAgIC8vb3ZlcmZsb3cg44K544K/44Kk44Or44Gu6YGp55SoICYgdHJhbnNmb3JtOiB0cmFuc2xhdGUg44Gr44KI44KL55aR5Ly855qE44Gq44K544Kv44Ot44O844Or44Gu5a6f6KGMXHJcbiAgICB0aGlzLl9hcHBlbmRTdHlsZShtYXhcclxuICAgICAgPyAnYm9keXtvdmVyZmxvdzpoaWRkZW47dHJhbnNmb3JtOnRyYW5zbGF0ZSgnKyhjb29yZGluYXRlcy54ICogLTEpKydweCwnKyhjb29yZGluYXRlcy55ICogLTEpKydweCk7d2lkdGg6ICcrdGhpcy5kb2N1bWVudFdpZHRoKydweDtoZWlnaHQ6ICcrdGhpcy5kb2N1bWVudEhlaWdodCsncHg7fSdcclxuICAgICAgOiAnYm9keXtvdmVyZmxvdzpoaWRkZW47dHJhbnNmb3JtOnRyYW5zbGF0ZSgnKyhjb29yZGluYXRlcy54ICogLTEpKydweCwnKyhjb29yZGluYXRlcy55ICogLTEpKydweCl9J1xyXG4gICAgKTtcclxuXHJcbiAgICAvL+OCueOCr+ODreODvOODq+aDheWgseOCkui/lOOBmVxyXG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K144Kk44K444Oz44Kw44Gu44Oq44K744OD44OIXHJcbiAgICog44K544Kv44Ot44O844Or5L2N572u44KC44Oq44K744OD44OI44GZ44KLXHJcbiAgICovXHJcbiAgcHVibGljIHJlc2V0U2l6aW5nKGNvb3JkaW5hdGVzOiBDb29yZGluYXRlcyk6IENvb3JkaW5hdGVzIHtcclxuICAgIC8vc3R5bGUg44Gu44Oq44K744OD44OIXHJcbiAgICB0aGlzLl9yZW1vdmVTdHlsZSgpO1xyXG5cclxuICAgIC8v54++5Zyo44Gu44K544Kv44Ot44O844Or5L2N572u44KS5Y+W5b6XXHJcbiAgICBjb25zdCBiZWZvcmVDb29yZGluYXRlczogQ29vcmRpbmF0ZXMgPSB7XHJcbiAgICAgIHg6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0uc2Nyb2xsVG9wLFxyXG4gICAgICB5OiBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaHRtbCcpWzBdLnNjcm9sbExlZnRcclxuICAgIH07XHJcblxyXG4gICAgLy/jgrnjgq/jg63jg7zjg6vkvY3nva7jgpIgY29vcmRpbmF0ZXMg44G444Oq44K744OD44OIXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaHRtbCcpWzBdLnNjcm9sbFRvKGNvb3JkaW5hdGVzLngsIGNvb3JkaW5hdGVzLnkpO1xyXG5cclxuICAgIC8v5L+u5q2j5YmN44Gu44K544Kv44Ot44O844Or5L2N572u44KS6L+U44GZXHJcbiAgICByZXR1cm4gYmVmb3JlQ29vcmRpbmF0ZXM7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge1JhbmdlLCBDb29yZGluYXRlc30gZnJvbSBcIi4vY2xhc3MvaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7U2l6aW5nfSBmcm9tIFwiLi9jbGFzcy9TaXppbmdcIjtcclxuaW1wb3J0IHtGaW5kU3R5bGV9IGZyb20gXCIuL2NsYXNzL0ZpbmRTdHlsZVwiO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuXHJcbiAgLy/jgrXjgqTjgrrjgpLlj5blvpfjgZnjgovjgZ/jgoHjga7jgq/jg6njgrlcclxuICBjb25zdCBzaXppbmcgPSBuZXcgU2l6aW5nKCk7XHJcblxyXG4gIC8vcG9zaXRpb246IGZpeGVkIOOCkuaOoeeUqOOBl+OBpuOBhOOCi+imgee0oFxyXG4gIGxldCBmaXhlZEVsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XHJcblxyXG4gIC8vcG9zaXRpb246IGZpeGVkIOOCkuaOoeeUqOOBl+OBpuOBhOOCi+imgee0oOOCkueiuuS/neOBmeOCi1xyXG4gIGNvbnN0IGdldEZpeGVkID0gKCkgPT4ge1xyXG4gICAgY29uc3QgZmluZFN0eWxlID0gbmV3IEZpbmRTdHlsZShkb2N1bWVudC5ib2R5KTtcclxuICAgIGZpeGVkRWxlbWVudHMgPSBmaW5kU3R5bGUuZmluZCgncG9zaXRpb24nLCAnZml4ZWQnKTtcclxuICB9XHJcblxyXG4gIC8vcG9zaXRpb246IGZpeGVkIOOCkuaOoeeUqOOBl+OBpuOBhOOCi+imgee0oOOCkumdnuihqOekuuOBq+OBmeOCiyBvciDlhYPjgavmiLvjgZlcclxuICBjb25zdCBjb250cm9sRml4ZWQgPSAocHJvcGVydHk6ICdoaWRkZW4nIHwgJycpID0+IHtcclxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBmaXhlZEVsZW1lbnRzLmxlbmd0aDsgaSA8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XHJcbiAgICAgIGZpeGVkRWxlbWVudHNbaV0uc3R5bGUudmlzaWJpbGl0eSA9IHByb3BlcnR5O1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8v6KGo56S644GV44KM44Gm44GE44KL44K/44OW44Gu5oOF5aCx44KS6L+U44GZXHJcbiAgY29uc3QgaW5mb3JtYXRpb24gPSAobWF4OiBib29sZWFuKSA9PiB7XHJcbiAgICByZXR1cm4gc2l6aW5nLmdldEluZm9ybWF0aW9uKG1heCk7XHJcbiAgfTtcclxuXHJcbiAgLy/jg5bjg6njgqbjgrbjga7lpKfjgY3jgZXjgpLpganliIfjgarjgoLjga7jgavlpInjgYjjgotcclxuICBjb25zdCBzdHlsaW5nID0gKHJhbmdlOiBSYW5nZSwgaW5kZXg6IG51bWJlciwgbWF4OiBib29sZWFuKSA9PiB7XHJcbiAgICAvL+WHpueQhue1guS6huW+jOOBruW6p+aomeaDheWgsVxyXG4gICAgbGV0IGNvb3JkaW5hdGU6IENvb3JkaW5hdGVzID0ge1xyXG4gICAgICB4OiAwLFxyXG4gICAgICB5OiAwXHJcbiAgICB9O1xyXG5cclxuICAgIC8vcmFuZ2Ug44Gr44KI44Gj44Gm5Yem55CG44KS5YiG44GR44KLXHJcbiAgICBzd2l0Y2ggKHJhbmdlKSB7XHJcbiAgICAgIGNhc2UgJ2Z1bGwnOlxyXG4gICAgICAgIGNvb3JkaW5hdGUgPSBzaXppbmcuZnVsbFNpemluZygpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdwZXJmZWN0JzpcclxuICAgICAgICBjb29yZGluYXRlID0gc2l6aW5nLmRpc3BsYXlTaXppbmcoaW5kZXgsIG1heCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29vcmRpbmF0ZSA9IHNpemluZy5kaXNwbGF5U2l6aW5nKG51bGwpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5bqn5qiZ5oOF5aCx44KS6L+U44GZXHJcbiAgICByZXR1cm4gY29vcmRpbmF0ZTtcclxuICB9O1xyXG5cclxuICAvL+ODluODqeOCpuOCtuOBruWkp+OBjeOBleOCkuWFg+OBq+aIu+OBmVxyXG4gIGNvbnN0IHJlc2V0U2l6aW5nID0gKGNvb3JkaW5hdGVzOiBDb29yZGluYXRlcykgPT4ge1xyXG4gICAgc2l6aW5nLnJlc2V0U2l6aW5nKGNvb3JkaW5hdGVzKTtcclxuICB9O1xyXG5cclxuICAvL+ODoeODg+OCu+ODvOOCuOODkeODg+OCt+ODs+OCsFxyXG4gIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcclxuICAgIC8vIOWPl+OBkeWPluOBo+OBn+WApOOBp+WIhuWykFxyXG4gICAgc3dpdGNoIChyZXF1ZXN0LnR5cGUpIHtcclxuICAgICAgY2FzZSAnaW5mb3JtYXRpb24nOlxyXG4gICAgICAgIHNlbmRSZXNwb25zZShpbmZvcm1hdGlvbihyZXF1ZXN0Lm1heCkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzaXppbmcnOlxyXG4gICAgICAgIHNlbmRSZXNwb25zZShzdHlsaW5nKHJlcXVlc3QucmFuZ2UsIHJlcXVlc3QuaW5kZXgsIHJlcXVlc3QubWF4KSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2tpbGxGaXhlZCc6XHJcbiAgICAgICAgY29udHJvbEZpeGVkKCdoaWRkZW4nKTtcclxuICAgICAgICBzZW5kUmVzcG9uc2Uoe30pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdyZXNldFNpemluZyc6XHJcbiAgICAgICAgY29udHJvbEZpeGVkKCcnKTtcclxuICAgICAgICByZXNldFNpemluZyh7eDogcmVxdWVzdC54LCB5OiByZXF1ZXN0Lnl9KTtcclxuICAgICAgICBzZW5kUmVzcG9uc2Uoe30pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHNlbmRSZXNwb25zZSh7fSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vcG9zaXRpb246IGZpeGVkIOOCkuaOoeeUqOOBl+OBpuOBhOOCi+imgee0oOOBrueiuuS/nVxyXG4gIGdldEZpeGVkKCk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==