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
    /**
     * 一瞬画面の右下端にスクロールして直ぐに戻る
     * スクロールしないと出現しない要素対策
     */
    const scrollEnd = () => {
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        window.scroll(document.documentElement.scrollWidth - document.documentElement.clientWidth, document.documentElement.scrollHeight - document.documentElement.clientHeight);
        setTimeout(() => {
            window.scroll(scrollX, scrollY);
        }, 100);
    };
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
            case 'scrollEnd':
                scrollEnd();
                sendResponse({});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2dvL09uZURyaXZlL+ODh+OCueOCr+ODiOODg+ODly9fZ2l0aHViL2ltbWVkaWF0ZV9zaG90L3NyYy9jbGFzcy9GaW5kU3R5bGUudHMiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2dvL09uZURyaXZlL+ODh+OCueOCr+ODiOODg+ODly9fZ2l0aHViL2ltbWVkaWF0ZV9zaG90L3NyYy9jbGFzcy9TaXppbmcudHMiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2dvL09uZURyaXZlL+ODh+OCueOCr+ODiOODg+ODly9fZ2l0aHViL2ltbWVkaWF0ZV9zaG90L3NyYy9wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFPLE1BQU0sU0FBUztJQWtEcEI7OztPQUdHO0lBQ0gsWUFB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VyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxNQUFNO1lBQ1IsS0FBSyxRQUFRO2dCQUNYLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNqRSxNQUFNO1lBQ1IsS0FBSyxXQUFXO2dCQUNkLFNBQVMsRUFBRSxDQUFDO2dCQUNaLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDakIsTUFBTTtZQUNSLEtBQUssV0FBVztnQkFDZCxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3ZCLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDakIsTUFBTTtZQUNSLEtBQUssYUFBYTtnQkFDaEIsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQixXQUFXLENBQUMsRUFBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7Z0JBQzFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDakIsTUFBTTtZQUNSO2dCQUNFLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDakIsTUFBTTtTQUNUO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCw4QkFBOEI7SUFDOUIsUUFBUSxFQUFFLENBQUM7QUFFYixDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJwYWdlLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4uLy4uLy4uL09uZURyaXZlL+ODh+OCueOCr+ODiOODg+ODly9fZ2l0aHViL2ltbWVkaWF0ZV9zaG90L3NyYy9wYWdlLnRzXCIpO1xuIiwiZXhwb3J0IGNsYXNzIEZpbmRTdHlsZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIGNvbnN0cnVjdG9yIOOBp+aMv+WFpeOBmeOCiyBIVE1MRWxlbWVudFxyXG4gICAqIOOBk+OBruimgee0oOOBq+OBtuOCieS4i+OBjOOBo+OBpuOBhOOCiyBET00g44OE44Oq44O844GM5a++6LGhXHJcbiAgICovXHJcbiAgcmVhZG9ubHkgcm9vdDogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIHJvb3Qg5LiL44Gu5YWoIEhUTUxFbGVtZW50XHJcbiAgICog6ZqO5bGk5qWu44Gv54Sh44GP44CB5LiA5qyh5YWD6YWN5YiX44Go44GX44Gm5o2V5o2JXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBlbGVtZW50czogSFRNTEVsZW1lbnRbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogdGFyZ2V0IOOBjCBudWxsIOOBp+OBquOBhOOBk+OBqOOCkuS/neiovOOBmeOCiyBUeXBlIGd1YXJkXHJcbiAgICogSFRNTEVsZW1lbnQuY2hpbGRyZW4g44GL44KJ5Y+W44Gj44Gm44GN44Gf44Kq44OW44K444Kn44Kv44OI44Gr5a++44GX44Gm55So44GE44KLXHJcbiAgICogQHBhcmFtIHRhcmdldFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfaXNIVE1MRWxlbWVudCh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBIVE1MRWxlbWVudCB7XHJcbiAgICByZXR1cm4gIHRhcmdldCAhPT0gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHBhcmVudCDkuIvjgavjgbbjgonkuIvjgYzjgosgRE9NIOODhOODquODvOOCkuWGjeW4sOeahOOBq+WPluW+l+OBl+OAgXRoaXMuZWxlbWVudHMg44Gr6L+95Yqg44GZ44KLXHJcbiAgICogQHBhcmFtIHBhcmVudFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZmluZENoaWxkcmVuKHBhcmVudDogSFRNTEVsZW1lbnQpIHtcclxuICAgIC8v6Ieq6Lqr44KScHVzaFxyXG4gICAgdGhpcy5lbGVtZW50cy5wdXNoKHBhcmVudCk7XHJcblxyXG4gICAgLy/lrZDopoHntKDjga7lj5blvpdcclxuICAgIGNvbnN0IGNoaWxkcmVuID0gcGFyZW50LmNoaWxkcmVuO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBjaGlsZHJlbi5sZW5ndGg7IGkgPCBtYXg7IGkgPSAoaSArIDEpIHwgMCkge1xyXG4gICAgICAvL+OCv+OCpOODl+OCrOODvOODieOCkumAmuOBmeOBn+OCgeOAgeS4gOaXpuWkieaVsOOBuOagvOe0jVxyXG4gICAgICBjb25zdCB0YXJnZXQgPSBjaGlsZHJlbi5pdGVtKGkpO1xyXG5cclxuICAgICAgLy90YXJnZXQg44GMIG51bGwg44Gn44Gq44GE44GT44Go44KS5L+d6Ki8XHJcbiAgICAgIGlmICggISB0aGlzLl9pc0hUTUxFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy/lho3luLDnmoTjgavjgZPjga7plqLmlbDjgpLlkbzjgbZcclxuICAgICAgdGhpcy5fZmluZENoaWxkcmVuKHRhcmdldCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjg4njgq3jg6Xjg6Hjg7Pjg4jjg6vjg7zjg4jjgpLnorrkv53jgZfjgIHmpJzntKLlr77osaHjga7opoHntKDjgpLmjZXmjYnjgZnjgotcclxuICAgKiBAcGFyYW0gcm9vdFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHJvb3Q6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAvL+aknOe0ouWvvuixoeODhOODquODvOOBruimquimgee0oOOCkueZu+mMslxyXG4gICAgdGhpcy5yb290ID0gcm9vdDtcclxuXHJcbiAgICAvL+aknOe0oue1kOaenOmFjeWIl+OCkuWIneacn+WMllxyXG4gICAgdGhpcy5lbGVtZW50cyA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgIC8v5qSc57Si6ZaL5aeLXHJcbiAgICB0aGlzLl9maW5kQ2hpbGRyZW4ocm9vdCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjc3Mg44Go44GX44GmIHByb3BlcnR5OiB2YWx1ZSDjgYzpgannlKjjgZXjgozjgabjgYTjgovopoHntKDjgpIgdGhpcy5lbGVtZW50cyDjgYvjgonlj5blvpfjgZnjgotcclxuICAgKiBAcGFyYW0gcHJvcGVydHlcclxuICAgKiBAcGFyYW0gdmFsdWVcclxuICAgKi9cclxuICBwdWJsaWMgZmluZChwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogSFRNTEVsZW1lbnRbXSB7XHJcbiAgICAvL+OBk+OBruODoeOCveODg+ODieOBjOi/lOOBmemFjeWIl+OBrueUqOaEj1xyXG4gICAgbGV0IHJlc3VsdCA9IG5ldyBBcnJheSgpO1xyXG5cclxuICAgIC8v5o2V5o2J5riI44G/44Gu6KaB57Sg44KS6YCQ5LiA5qSc57SiXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gdGhpcy5lbGVtZW50cy5sZW5ndGg7IGkgPCBtYXg7IGkgPSAoaSArIDEpIHwgMCkge1xyXG4gICAgICAvL+ioiOeul+a4iOOBvyBjc3Mg44GM5ZCI6Ie044GX44Gm44GE44Gq44GL44Gj44Gf44KJ44K544Or44O8XHJcbiAgICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRzW2ldKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KSAhPT0gdmFsdWUpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy/oqbLlvZPopoHntKDjgajjgZfjgabmpJzntKLntZDmnpzphY3liJfjgavov73liqBcclxuICAgICAgcmVzdWx0LnB1c2godGhpcy5lbGVtZW50c1tpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/oqbLlvZPopoHntKDjgpLov5TjgZlcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlhajopoHntKDkuK3jgafmnIDlpKfjga4gd2lkdGgsIOOCguOBl+OBj+OBryBoZWlnaHQg44KS6L+U44GZXHJcbiAgICogQHBhcmFtIHRhcmdldFxyXG4gICAqL1xyXG4gIHB1YmxpYyBoaWdoU2l6ZSh0YXJnZXQ6ICd3aWR0aCcgfCAnaGVpZ2h0JyA9ICdoZWlnaHQnKTogbnVtYmVye1xyXG4gICAgLy/jgZPjga7jg6Hjgr3jg4Pjg4njgYzov5TjgZnmlbDlgKRcclxuICAgIGxldCByZXN1bHQ6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLy/mjZXmjYnmuIjjgb/jga7opoHntKDjgpLpgJDkuIDmpJzntKJcclxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSB0aGlzLmVsZW1lbnRzLmxlbmd0aDsgaSA8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XHJcbiAgICAgIC8v44K144Kk44K644Gu6KiI5ris5a++6LGhKHdpZHRoIG9yIGhlaWdodClcclxuICAgICAgY29uc3Qgc2l6ZSA9IHRhcmdldCA9PT0gJ2hlaWdodCdcclxuICAgICAgICA/IHRoaXMuZWxlbWVudHNbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XHJcbiAgICAgICAgOiB0aGlzLmVsZW1lbnRzW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xyXG5cclxuICAgICAgLy9yZXN1bHQg5Lul5LiL44Gg44Gj44Gf44KJ44K544Or44O8XHJcbiAgICAgIGlmIChyZXN1bHQgPj0gc2l6ZSkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvL+acgOmrmOWApOOCkuabuOOBjeaPm+OBiOOCi1xyXG4gICAgICByZXN1bHQgPSBzaXplO1xyXG4gICAgfVxyXG5cclxuICAgIC8v57WQ5p6c44KS6L+U44GZXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtDb29yZGluYXRlcywgSW5mb3JtYXRpb259IGZyb20gXCJzcmMvY2xhc3MvaW50ZXJmYWNlXCI7XHJcbmltcG9ydCB7RmluZFN0eWxlfSBmcm9tIFwiLi9GaW5kU3R5bGVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTaXppbmcge1xyXG5cclxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544GuIHdpbmRvdyB3aWR0aFxyXG4gIHByaXZhdGUgd2luZG93V2lkdGg6IG51bWJlciA9IDA7XHJcblxyXG4gIC8vY29uc3RydWN0b3IoKSDmmYLngrnjga4gd2luZG93IGhlaWdodFxyXG4gIHByaXZhdGUgd2luZG93SGVpZ2h0OiBudW1iZXIgPSAwO1xyXG5cclxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544GuIGRvY3VtZW50IHdpZHRoXHJcbiAgcHJpdmF0ZSBkb2N1bWVudFdpZHRoOiBudW1iZXIgPSAwO1xyXG5cclxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544GuIGRvY3VtZW50IGhlaWdodFxyXG4gIHByaXZhdGUgZG9jdW1lbnRIZWlnaHQ6IG51bWJlciA9IDA7XHJcblxyXG4gIC8v55S76Z2i57iu5bCP5q+U546HXHJcbiAgcHJpdmF0ZSByYXRpbzogbnVtYmVyID0gMDtcclxuXHJcbiAgLy/nlLvpnaLjgpLluYXjgajpq5jjgZXjga7jganjgaHjgonjgafnuK7lsI/jgZfjgZ/jgYtcclxuICBwcml2YXRlIHJhdGlvVHlwZTogJ3dpZHRoJyB8ICdoZWlnaHQnID0gJ2hlaWdodCc7XHJcblxyXG4gIC8vZG9jdW1lbnRXaWR0aCDjgpLnj77lnKjjga4gd2luZG93V2lkdGgg44Gu5aSn44GN44GV44Gn44Kt44Oj44OX44OB44Oj44GZ44KL44Gr44Gv5qiq44Gr5L2V5p6a44Kt44Oj44OX44OB44Oj44GM5b+F6KaB44GLXHJcbiAgcHJpdmF0ZSB3aWR0aENhcHR1cmVOdW1iZXI6IG51bWJlciA9IDA7XHJcblxyXG4gIC8vZG9jdW1lbnRIZWlnaHQg44KS54++5Zyo44GuIHdpbmRvd0hlaWdodCDjga7lpKfjgY3jgZXjgafjgq3jg6Pjg5fjg4Hjg6PjgZnjgovjgavjga/nuKbjgavkvZXmnprjgq3jg6Pjg5fjg4Hjg6PjgYzlv4XopoHjgYtcclxuICBwcml2YXRlIGhlaWdodENhcHR1cmVOdW1iZXI6IG51bWJlciA9IDA7XHJcblxyXG4gIC8v5LiK6KiY5LqM44Gk44Gu5LmX566X5YCkXHJcbiAgcHJpdmF0ZSBjYXB0dXJlTnVtYmVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544Gu44K544Kv44Ot44O844Or5L2N572uKOaoqilcclxuICBwcml2YXRlIHNjcm9sbFg6IG51bWJlciA9IDA7XHJcblxyXG4gIC8vY29uc3RydWN0b3IoKSDmmYLngrnjga7jgrnjgq/jg63jg7zjg6vkvY3nva4o57imKVxyXG4gIHByaXZhdGUgc2Nyb2xsWTogbnVtYmVyID0gMDtcclxuXHJcbiAgLy/jgZPjga7jgq/jg6njgrnjgYzmibHjgYYgPHN0eWxlPiDjgr/jgrDjga4gaWQg5bGe5oCn5YCkXHJcbiAgcmVhZG9ubHkgU1RZTEVfSUQ6IHN0cmluZztcclxuXHJcbiAgLyoqXHJcbiAgICog44GT44Gu44Kv44Op44K544GM5LuV6L6844KT44GgIHN0eWxlIOOCv+OCsOOCkuWJiumZpOOBmeOCi1xyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcmVtb3ZlU3R5bGUoKSB7XHJcbiAgICAvL+WJiumZpOWvvuixoeOBruWPluW+l1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5TVFlMRV9JRCk7XHJcblxyXG4gICAgLy90YXJnZXQg44GM5a2Y5Zyo44GX44Gq44GL44Gj44Gf44KJ5L2V44KC44GX44Gq44GEXHJcbiAgICBpZiAodGFyZ2V0ID09PSBudWxsKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvL+WvvuixoeOCkuWJiumZpOOBmeOCi1xyXG4gICAgdGFyZ2V0LnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogc3R5bGUg44K/44Kw44KS5oy/5YWl44GZ44KLXHJcbiAgICog5pei44Gr44GT44Gu44Kv44Op44K544GM5omx44Gj44Gm44GE44KLIHN0eWxlIOOBjOWtmOWcqOOBl+OBn+WgtOWQiOOBr+ODquOCu+ODg+ODiOOBmeOCi1xyXG4gICAqIEBwYXJhbSBzdHlsZVxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfYXBwZW5kU3R5bGUoc3R5bGU6IHN0cmluZykge1xyXG4gICAgLy/jg6rjgrvjg4Pjg4hcclxuICAgIHRoaXMuX3JlbW92ZVN0eWxlKCk7XHJcblxyXG4gICAgLy9zdHlsZSDjgr/jgrDjgpLnlKjmhI9cclxuICAgIGNvbnN0IHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcbiAgICB0YWcuc2V0QXR0cmlidXRlKCdpZCcsIHRoaXMuU1RZTEVfSUQpO1xyXG4gICAgdGFnLmlubmVyVGV4dCA9IHN0eWxlO1xyXG5cclxuICAgIC8vdGFnIOOCv+OCsOaMv+WFpVxyXG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0YWcpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5oyH5a6a44GV44KM44GfIGluZGV4IOOBi+OCieOCueOCr+ODreODvOODq+OBmeOBueOBjeW6p+aomeOCkui/lOOBmVxyXG4gICAqIEBwYXJhbSBpbmRleFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZ2V0U2Nyb2xsQ29vcmRpbmF0ZXMoaW5kZXg6IG51bWJlcik6IENvb3JkaW5hdGVzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHg6IE1hdGguZmxvb3IoaW5kZXggJSB0aGlzLndpZHRoQ2FwdHVyZU51bWJlcikgJSB0aGlzLmNhcHR1cmVOdW1iZXIgKiB0aGlzLndpbmRvd1dpZHRoLFxyXG4gICAgICB5OiBNYXRoLmZsb29yKGluZGV4IC8gdGhpcy53aWR0aENhcHR1cmVOdW1iZXIpICUgdGhpcy5jYXB0dXJlTnVtYmVyICogdGhpcy53aW5kb3dIZWlnaHRcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlkITnqK7mg4XloLHjgpLjgqLjg4Pjg5fjg4fjg7zjg4jjgZnjgotcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3VwZGF0ZUluZm9ybWF0aW9uKG1heDogYm9vbGVhbikge1xyXG4gICAgLy/lhajopoHntKDjgrXjgqTjgrrlj5blvpfnlKjjgqTjg7Pjgrnjgr/jg7PjgrlcclxuICAgIGxldCBmaW5kU3R5bGUgPSBuZXcgRmluZFN0eWxlKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0pO1xyXG5cclxuICAgIC8v44Km44Kj44Oz44OJ44Km44K144Kk44K6XHJcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICB0aGlzLndpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICAvL+ODieOCreODpeODoeODs+ODiOOCteOCpOOCuuOBruacgOWkp+WApOOCkuWPluW+l+OBmeOCi+ODquOCueODiFxyXG4gICAgbGV0IHdpZHRoU291cmNlcyA9IFtkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoLCBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGgsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aF07XHJcbiAgICBsZXQgaGVpZ2h0U291cmNlcyA9IFtkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCwgZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRdO1xyXG5cclxuICAgIC8v44KC44GXIG1heCA9PT0gdHJ1ZSDjgaDjgaPjgZ/jgonlj5blvpfjg6rjgrnjg4jjgavlhajopoHntKDjga7mnIDlpKflgKTjgpLliqDjgYjjgotcclxuICAgIGlmIChtYXgpIHtcclxuICAgICAgd2lkdGhTb3VyY2VzLnB1c2goZmluZFN0eWxlLmhpZ2hTaXplKCd3aWR0aCcpKTtcclxuICAgICAgaGVpZ2h0U291cmNlcy5wdXNoKGZpbmRTdHlsZS5oaWdoU2l6ZSgnaGVpZ2h0JykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8v44OJ44Kt44Ol44Oh44Oz44OI44K144Kk44K6XHJcbiAgICB0aGlzLmRvY3VtZW50V2lkdGggPSBNYXRoLm1heCguLi53aWR0aFNvdXJjZXMpO1xyXG4gICAgdGhpcy5kb2N1bWVudEhlaWdodCA9IE1hdGgubWF4KC4uLmhlaWdodFNvdXJjZXMpO1xyXG5cclxuICAgIC8v5bmF44Go6auY44GV44Gd44KM44Ge44KM44Gu5Ymy5ZCIXHJcbiAgICBjb25zdCB3aWR0aFJhdGlvID0gdGhpcy53aW5kb3dXaWR0aCAvIHRoaXMuZG9jdW1lbnRXaWR0aDtcclxuICAgIGNvbnN0IGhlaWdodFJhdGlvID0gdGhpcy53aW5kb3dIZWlnaHQgLyB0aGlzLmRvY3VtZW50SGVpZ2h0O1xyXG5cclxuICAgIC8vcmF0aW8g44GoIHJhdGlvVHlwZSDjga7jgrvjg4Pjg4hcclxuICAgIHRoaXMucmF0aW8gPSB3aWR0aFJhdGlvID4gaGVpZ2h0UmF0aW8gPyBoZWlnaHRSYXRpbyA6IHdpZHRoUmF0aW87XHJcbiAgICB0aGlzLnJhdGlvVHlwZSA9IHdpZHRoUmF0aW8gPiBoZWlnaHRSYXRpbyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcclxuXHJcbiAgICAvL3JhdGlvIOOBjCAxIOS7peS4iuOBoOOBo+OBn+OCiSAxIOOBqOOBmeOCi1xyXG4gICAgdGhpcy5yYXRpbyA9IHRoaXMucmF0aW8gPiAxID8gMSA6IHRoaXMucmF0aW87XHJcblxyXG4gICAgLy/nuKbjgajmqKrjgavjgYrjgYTjgabjgZ3jgozjgZ7jgoznj77lnKjjga7jgqbjgqPjg7Pjg4njgqbjgrXjgqTjgrrkvZXmnprliIbjgaflhajnlLvpnaLjgpLmjZXmjYnjgafjgY3jgovjgYvjga7mlbDlgKTjgpLnrpflh7pcclxuICAgIHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyID0gTWF0aC5jZWlsKHRoaXMuZG9jdW1lbnRXaWR0aCAvIHRoaXMud2luZG93V2lkdGgpO1xyXG4gICAgdGhpcy5oZWlnaHRDYXB0dXJlTnVtYmVyID0gTWF0aC5jZWlsKHRoaXMuZG9jdW1lbnRIZWlnaHQgLyB0aGlzLndpbmRvd0hlaWdodCk7XHJcblxyXG4gICAgLy/kuIroqJjkuozjgaTjga7kuZfnrpflgKRcclxuICAgIHRoaXMuY2FwdHVyZU51bWJlciA9IHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyICogdGhpcy5oZWlnaHRDYXB0dXJlTnVtYmVyO1xyXG5cclxuICAgIC8v54++5Zyo44Gu44K544Kv44Ot44O844Or5bqn5qiZ44KS6KiY6YyyXHJcbiAgICB0aGlzLnNjcm9sbFggPSB3aW5kb3cuc2Nyb2xsWDtcclxuICAgIHRoaXMuc2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5ZCE44K144Kk44K65oOF5aCx44KS5Y+W5b6X44O76KiI566X44O75L+d5oyB44GZ44KLXHJcbiAgICog5Yqg44GI44Gm5b+F55So44Gq5a6a5pWw44KC5L+d566h44GZ44KLXHJcbiAgICovXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKG1heDogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAvL3N0eWxlIOOCv+OCsOOBq+S9v+eUqOOBmeOCiyBpZFxyXG4gICAgdGhpcy5TVFlMRV9JRCA9ICdzaXppbmdfJytNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgtOCk7XHJcblxyXG4gICAgLy/lkITnqK7mg4XloLHjgpLjgrvjg4Pjg4jjgZnjgotcclxuICAgIHRoaXMuX3VwZGF0ZUluZm9ybWF0aW9uKG1heCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmg4XloLHjgpLov5TjgZlcclxuICAgKiBAcmV0dXJuIHt7ZG9jdW1lbnRXaWR0aDogbnVtYmVyIHwgKiwgZG9jdW1lbnRIZWlnaHQ6IG51bWJlciB8ICosIHdpbmRvd0hlaWdodDogbnVtYmVyIHwgKiwgcmF0aW9UeXBlOiBzdHJpbmcsIHdpbmRvd1dpZHRoOiBudW1iZXIgfCAqLCByYXRpbzogKCp8bnVtYmVyKX19XHJcbiAgICovXHJcbiAgcHVibGljIGdldEluZm9ybWF0aW9uKG1heDogYm9vbGVhbiA9IGZhbHNlKTogSW5mb3JtYXRpb24ge1xyXG4gICAgLy/mg4XloLHjga7mm7TmlrBcclxuICAgIHRoaXMuX3VwZGF0ZUluZm9ybWF0aW9uKG1heCk7XHJcblxyXG4gICAgLy/oqIjnrpfntZDmnpzjgpLov5TjgZlcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHdpbmRvd1dpZHRoOiB0aGlzLndpbmRvd1dpZHRoLFxyXG4gICAgICB3aW5kb3dIZWlnaHQ6IHRoaXMud2luZG93SGVpZ2h0LFxyXG4gICAgICBkb2N1bWVudFdpZHRoOiB0aGlzLmRvY3VtZW50V2lkdGgsXHJcbiAgICAgIGRvY3VtZW50SGVpZ2h0OiB0aGlzLmRvY3VtZW50SGVpZ2h0LFxyXG4gICAgICB3aWR0aENhcHR1cmVOdW1iZXI6IHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyLFxyXG4gICAgICBoZWlnaHRDYXB0dXJlTnVtYmVyOiB0aGlzLmhlaWdodENhcHR1cmVOdW1iZXIsXHJcbiAgICAgIGNhcHR1cmVOdW1iZXI6IHRoaXMuY2FwdHVyZU51bWJlcixcclxuICAgICAgcmF0aW86IHRoaXMucmF0aW8sXHJcbiAgICAgIHJhdGlvVHlwZTogdGhpcy5yYXRpb1R5cGUsXHJcbiAgICAgIHNjcm9sbFg6IHRoaXMuc2Nyb2xsWCxcclxuICAgICAgc2Nyb2xsWTogdGhpcy5zY3JvbGxZXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjg5Xjg6vjgrXjgqTjgrrnlKjjga7jgrXjgqTjgrjjg7PjgrDlh6bnkIbjgpLooYzjgYZcclxuICAgKi9cclxuICBwdWJsaWMgZnVsbFNpemluZygpOiBDb29yZGluYXRlcyB7XHJcbiAgICAvL3N0eWxlIOOCv+OCsOOCkueUn+aIkFxyXG4gICAgdGhpcy5fYXBwZW5kU3R5bGUoJ2JvZHl7b3ZlcmZsb3c6aGlkZGVuO3RyYW5zZm9ybS1vcmlnaW46IGxlZnQgdG9wO3RyYW5zZm9ybTogc2NhbGUoJyt0aGlzLnJhdGlvKycpfScpO1xyXG5cclxuICAgIC8v44K544Kv44Ot44O844Or5L2N572u44KSIDAg44Gr44GZ44KLXHJcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XHJcblxyXG4gICAgLy8wLCAwIOOCkui/lOOBmVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgeDogMCxcclxuICAgICAgeTogMFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCueOCr+ODreODvOODq+ODkOODvOOCkua2iOOBmeOBoOOBkeOBruOCteOCpOOCuOODs+OCsOWHpueQhuOCkuihjOOBhlxyXG4gICAqIOOCueOCr+ODreODvOODq+S9jee9ruOBryBpbmRleCDnlarlj7fjgafmjIflrprjgZnjgotcclxuICAgKiBpbmRleCDjgYwgbnVsbCDjgaDjgaPjgZ/loLTlkIjjga/jgrnjgq/jg63jg7zjg6vjgpLlpInmm7TjgZfjgarjgYRcclxuICAgKiDjgZPjga4gaW5kZXgg55Wq5Y+344GvIGdldEluZm9ybWF0aW9uKCkg44Gn5Y+W5b6X44Gn44GN44KLIGNhcHR1cmVOdW1iZXIg44Gu56+E5Zuy44Gn5oyH5a6a44GX44CBXHJcbiAgICog5L6L44GI44GwXHJcbiAgICogd2lkdGhDYXB0dXJlTnVtYmVyID0gNFxyXG4gICAqIGhlaWdodENhcHR1cmVOdW1iZXIgPSAzXHJcbiAgICogY2FwdHVyZU51bWJlciA9IDEyXHJcbiAgICog44Gg44Gj44Gf5aC05ZCI44GvXHJcbiAgICogKy0tLS0rLS0tLSstLS0tKy0tLS0rXHJcbiAgICogfCAgMCAgfCAgMSAgfCAgMiAgfCAgMyAgfFxyXG4gICAqICstLS0tKy0tLS0rLS0tLSstLS0tK1xyXG4gICAqIHwgIDQgIHwgIDUgIHwgIDYgIHwgIDcgIHxcclxuICAgKiArLS0tLSstLS0tKy0tLS0rLS0tLStcclxuICAgKiB8ICA4ICB8ICA5ICB8IDEwIHwgMTEgfFxyXG4gICAqICstLS0tKy0tLS0rLS0tLSstLS0tK1xyXG4gICAqIOOBqOOBhOOBo+OBn+WQhOODnuOCueOBruW3puS4iuW6p+aomeOBuOOCueOCr+ODreODvOODq+OBmeOCi+OBk+OBqOOBq+OBquOCi1xyXG4gICAqIOWQhOODnuOCueOBriB3aWR0aCwgaGVpZ2h0ID0gd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodFxyXG4gICAqIOWkp+aeoOOBriB3aWR0aCwgaGVpZ2h0ID0gZG9jdW1lbnRXaWR0aCwgZG9jdW1lbnRIZWlnaHRcclxuICAgKi9cclxuICBwdWJsaWMgZGlzcGxheVNpemluZyhpbmRleDogbnVtYmVyfG51bGwgPSBudWxsLCBtYXg6IGJvb2xlYW4gPSBmYWxzZSk6IENvb3JkaW5hdGVzIHtcclxuICAgIC8vaW5kZXgg5oyH5a6a44GM54Sh44GL44Gj44Gf44KJIHN0eWxlIOOCv+OCsOOCkumBqeeUqOOBruW+jOOAgSgwLCAwKeOCkui/lOOBmVxyXG4gICAgaWYgKGluZGV4ID09PSBudWxsKSB7XHJcbiAgICAgIC8vc3R5bGUg44K/44Kw44KS55Sf5oiQXHJcbiAgICAgIHRoaXMuX2FwcGVuZFN0eWxlKCdib2R5e292ZXJmbG93OmhpZGRlbn0nKTtcclxuXHJcbiAgICAgIC8vKDAsIDAp6L+U44GZXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgeDogMCxcclxuICAgICAgICB5OiAwXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy/jgoLjgZcgaW5kZXgg44GMIDAg44Gg44Gj44Gf44KJ44K544Kv44Ot44O844Or5L2N572u44KSIDAsIDAg44Gr44GZ44KLXHJcbiAgICBpZiAoaW5kZXggPT09IDApIHtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXS5zY3JvbGxUbygwLCAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+enu+WLleWFiOW6p+aomeOBruWumue+qVxyXG4gICAgY29uc3QgY29vcmRpbmF0ZXMgPSB0aGlzLl9nZXRTY3JvbGxDb29yZGluYXRlcyhpbmRleCk7XHJcblxyXG4gICAgLy9vdmVyZmxvdyDjgrnjgr/jgqTjg6vjga7pgannlKggJiB0cmFuc2Zvcm06IHRyYW5zbGF0ZSDjgavjgojjgovnlpHkvLznmoTjgarjgrnjgq/jg63jg7zjg6vjga7lrp/ooYxcclxuICAgIHRoaXMuX2FwcGVuZFN0eWxlKG1heFxyXG4gICAgICA/ICdib2R5e292ZXJmbG93OmhpZGRlbjt0cmFuc2Zvcm06dHJhbnNsYXRlKCcrKGNvb3JkaW5hdGVzLnggKiAtMSkrJ3B4LCcrKGNvb3JkaW5hdGVzLnkgKiAtMSkrJ3B4KTt3aWR0aDogJyt0aGlzLmRvY3VtZW50V2lkdGgrJ3B4O2hlaWdodDogJyt0aGlzLmRvY3VtZW50SGVpZ2h0KydweDt9J1xyXG4gICAgICA6ICdib2R5e292ZXJmbG93OmhpZGRlbjt0cmFuc2Zvcm06dHJhbnNsYXRlKCcrKGNvb3JkaW5hdGVzLnggKiAtMSkrJ3B4LCcrKGNvb3JkaW5hdGVzLnkgKiAtMSkrJ3B4KX0nXHJcbiAgICApO1xyXG5cclxuICAgIC8v44K544Kv44Ot44O844Or5oOF5aCx44KS6L+U44GZXHJcbiAgICByZXR1cm4gY29vcmRpbmF0ZXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrXjgqTjgrjjg7PjgrDjga7jg6rjgrvjg4Pjg4hcclxuICAgKiDjgrnjgq/jg63jg7zjg6vkvY3nva7jgoLjg6rjgrvjg4Pjg4jjgZnjgotcclxuICAgKi9cclxuICBwdWJsaWMgcmVzZXRTaXppbmcoY29vcmRpbmF0ZXM6IENvb3JkaW5hdGVzKTogQ29vcmRpbmF0ZXMge1xyXG4gICAgLy9zdHlsZSDjga7jg6rjgrvjg4Pjg4hcclxuICAgIHRoaXMuX3JlbW92ZVN0eWxlKCk7XHJcblxyXG4gICAgLy/nj77lnKjjga7jgrnjgq/jg63jg7zjg6vkvY3nva7jgpLlj5blvpdcclxuICAgIGNvbnN0IGJlZm9yZUNvb3JkaW5hdGVzOiBDb29yZGluYXRlcyA9IHtcclxuICAgICAgeDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXS5zY3JvbGxUb3AsXHJcbiAgICAgIHk6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0uc2Nyb2xsTGVmdFxyXG4gICAgfTtcclxuXHJcbiAgICAvL+OCueOCr+ODreODvOODq+S9jee9ruOCkiBjb29yZGluYXRlcyDjgbjjg6rjgrvjg4Pjg4hcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0uc2Nyb2xsVG8oY29vcmRpbmF0ZXMueCwgY29vcmRpbmF0ZXMueSk7XHJcblxyXG4gICAgLy/kv67mraPliY3jga7jgrnjgq/jg63jg7zjg6vkvY3nva7jgpLov5TjgZlcclxuICAgIHJldHVybiBiZWZvcmVDb29yZGluYXRlcztcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7UmFuZ2UsIENvb3JkaW5hdGVzfSBmcm9tIFwiLi9jbGFzcy9pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHtTaXppbmd9IGZyb20gXCIuL2NsYXNzL1NpemluZ1wiO1xyXG5pbXBvcnQge0ZpbmRTdHlsZX0gZnJvbSBcIi4vY2xhc3MvRmluZFN0eWxlXCI7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xyXG5cclxuICAvL+OCteOCpOOCuuOCkuWPluW+l+OBmeOCi+OBn+OCgeOBruOCr+ODqeOCuVxyXG4gIGNvbnN0IHNpemluZyA9IG5ldyBTaXppbmcoKTtcclxuXHJcbiAgLy9wb3NpdGlvbjogZml4ZWQg44KS5o6h55So44GX44Gm44GE44KL6KaB57SgXHJcbiAgbGV0IGZpeGVkRWxlbWVudHM6IEhUTUxFbGVtZW50W10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICog5LiA556s55S76Z2i44Gu5Y+z5LiL56uv44Gr44K544Kv44Ot44O844Or44GX44Gm55u044GQ44Gr5oi744KLXHJcbiAgICog44K544Kv44Ot44O844Or44GX44Gq44GE44Go5Ye654++44GX44Gq44GE6KaB57Sg5a++562WXHJcbiAgICovXHJcbiAgY29uc3Qgc2Nyb2xsRW5kID0gKCkgPT4ge1xyXG4gICAgY29uc3Qgc2Nyb2xsWCA9IHdpbmRvdy5zY3JvbGxYO1xyXG4gICAgY29uc3Qgc2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZO1xyXG4gICAgd2luZG93LnNjcm9sbChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGggLSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQgLSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB3aW5kb3cuc2Nyb2xsKHNjcm9sbFgsIHNjcm9sbFkpO1xyXG4gICAgfSwgMTAwKTtcclxuICB9O1xyXG5cclxuICAvL3Bvc2l0aW9uOiBmaXhlZCDjgpLmjqHnlKjjgZfjgabjgYTjgovopoHntKDjgpLnorrkv53jgZnjgotcclxuICBjb25zdCBnZXRGaXhlZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGZpbmRTdHlsZSA9IG5ldyBGaW5kU3R5bGUoZG9jdW1lbnQuYm9keSk7XHJcbiAgICBmaXhlZEVsZW1lbnRzID0gZmluZFN0eWxlLmZpbmQoJ3Bvc2l0aW9uJywgJ2ZpeGVkJyk7XHJcbiAgfVxyXG5cclxuICAvL3Bvc2l0aW9uOiBmaXhlZCDjgpLmjqHnlKjjgZfjgabjgYTjgovopoHntKDjgpLpnZ7ooajnpLrjgavjgZnjgosgb3Ig5YWD44Gr5oi744GZXHJcbiAgY29uc3QgY29udHJvbEZpeGVkID0gKHByb3BlcnR5OiAnaGlkZGVuJyB8ICcnKSA9PiB7XHJcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gZml4ZWRFbGVtZW50cy5sZW5ndGg7IGkgPCBtYXg7IGkgPSAoaSArIDEpIHwgMCkge1xyXG4gICAgICBmaXhlZEVsZW1lbnRzW2ldLnN0eWxlLnZpc2liaWxpdHkgPSBwcm9wZXJ0eTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvL+ihqOekuuOBleOCjOOBpuOBhOOCi+OCv+ODluOBruaDheWgseOCkui/lOOBmVxyXG4gIGNvbnN0IGluZm9ybWF0aW9uID0gKG1heDogYm9vbGVhbikgPT4ge1xyXG4gICAgcmV0dXJuIHNpemluZy5nZXRJbmZvcm1hdGlvbihtYXgpO1xyXG4gIH07XHJcblxyXG4gIC8v44OW44Op44Km44K244Gu5aSn44GN44GV44KS6YGp5YiH44Gq44KC44Gu44Gr5aSJ44GI44KLXHJcbiAgY29uc3Qgc3R5bGluZyA9IChyYW5nZTogUmFuZ2UsIGluZGV4OiBudW1iZXIsIG1heDogYm9vbGVhbikgPT4ge1xyXG4gICAgLy/lh6bnkIbntYLkuoblvozjga7luqfmqJnmg4XloLFcclxuICAgIGxldCBjb29yZGluYXRlOiBDb29yZGluYXRlcyA9IHtcclxuICAgICAgeDogMCxcclxuICAgICAgeTogMFxyXG4gICAgfTtcclxuXHJcbiAgICAvL3JhbmdlIOOBq+OCiOOBo+OBpuWHpueQhuOCkuWIhuOBkeOCi1xyXG4gICAgc3dpdGNoIChyYW5nZSkge1xyXG4gICAgICBjYXNlICdmdWxsJzpcclxuICAgICAgICBjb29yZGluYXRlID0gc2l6aW5nLmZ1bGxTaXppbmcoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAncGVyZmVjdCc6XHJcbiAgICAgICAgY29vcmRpbmF0ZSA9IHNpemluZy5kaXNwbGF5U2l6aW5nKGluZGV4LCBtYXgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGNvb3JkaW5hdGUgPSBzaXppbmcuZGlzcGxheVNpemluZyhudWxsKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICAvL+W6p+aomeaDheWgseOCkui/lOOBmVxyXG4gICAgcmV0dXJuIGNvb3JkaW5hdGU7XHJcbiAgfTtcclxuXHJcbiAgLy/jg5bjg6njgqbjgrbjga7lpKfjgY3jgZXjgpLlhYPjgavmiLvjgZlcclxuICBjb25zdCByZXNldFNpemluZyA9IChjb29yZGluYXRlczogQ29vcmRpbmF0ZXMpID0+IHtcclxuICAgIHNpemluZy5yZXNldFNpemluZyhjb29yZGluYXRlcyk7XHJcbiAgfTtcclxuXHJcbiAgLy/jg6Hjg4Pjgrvjg7zjgrjjg5Hjg4Pjgrfjg7PjgrBcclxuICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XHJcbiAgICAvLyDlj5fjgZHlj5bjgaPjgZ/lgKTjgafliIblspBcclxuICAgIHN3aXRjaCAocmVxdWVzdC50eXBlKSB7XHJcbiAgICAgIGNhc2UgJ2luZm9ybWF0aW9uJzpcclxuICAgICAgICBzZW5kUmVzcG9uc2UoaW5mb3JtYXRpb24ocmVxdWVzdC5tYXgpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnc2l6aW5nJzpcclxuICAgICAgICBzZW5kUmVzcG9uc2Uoc3R5bGluZyhyZXF1ZXN0LnJhbmdlLCByZXF1ZXN0LmluZGV4LCByZXF1ZXN0Lm1heCkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzY3JvbGxFbmQnOlxyXG4gICAgICAgIHNjcm9sbEVuZCgpO1xyXG4gICAgICAgIHNlbmRSZXNwb25zZSh7fSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2tpbGxGaXhlZCc6XHJcbiAgICAgICAgY29udHJvbEZpeGVkKCdoaWRkZW4nKTtcclxuICAgICAgICBzZW5kUmVzcG9uc2Uoe30pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdyZXNldFNpemluZyc6XHJcbiAgICAgICAgY29udHJvbEZpeGVkKCcnKTtcclxuICAgICAgICByZXNldFNpemluZyh7eDogcmVxdWVzdC54LCB5OiByZXF1ZXN0Lnl9KTtcclxuICAgICAgICBzZW5kUmVzcG9uc2Uoe30pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHNlbmRSZXNwb25zZSh7fSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vcG9zaXRpb246IGZpeGVkIOOCkuaOoeeUqOOBl+OBpuOBhOOCi+imgee0oOOBrueiuuS/nVxyXG4gIGdldEZpeGVkKCk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==