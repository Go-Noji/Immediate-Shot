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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzL0ZpbmRTdHlsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MvU2l6aW5nLnRzIiwid2VicGFjazovLy8uL3NyYy9wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFPLE1BQU0sU0FBUztJQWNwQjs7Ozs7T0FLRztJQUNLLGNBQWMsQ0FBQyxNQUFXO1FBQ2hDLE9BQVEsTUFBTSxLQUFLLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGFBQWEsQ0FBQyxNQUFtQjtRQUN2QyxTQUFTO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFM0IsUUFBUTtRQUNSLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFFakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQy9ELHFCQUFxQjtZQUNyQixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWhDLHdCQUF3QjtZQUN4QixJQUFLLENBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDbEMsU0FBUzthQUNWO1lBRUQsYUFBYTtZQUNiLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDNUI7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsWUFBWSxJQUFpQjtRQUMzQixnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFakIsWUFBWTtRQUNaLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUU1QixNQUFNO1FBQ04sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLElBQUksQ0FBQyxRQUFnQixFQUFFLEtBQWE7UUFDekMsZ0JBQWdCO1FBQ2hCLElBQUksTUFBTSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7UUFFekIsY0FBYztRQUNkLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDcEUseUJBQXlCO1lBQ3pCLElBQUksTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsS0FBSyxLQUFLLEVBQUU7Z0JBQ2xGLFNBQVM7YUFDVjtZQUVELGtCQUFrQjtZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMvQjtRQUVELFNBQVM7UUFDVCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBRUY7Ozs7Ozs7Ozs7Ozs7QUN2RkQ7QUFBQTtBQUFPLE1BQU0sTUFBTTtJQXNDakI7OztPQUdHO0lBQ0ssWUFBWTtRQUNsQixTQUFTO1FBQ1QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdEQsdUJBQXVCO1FBQ3ZCLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtZQUNuQixPQUFPO1NBQ1I7UUFFRCxTQUFTO1FBQ1QsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLFlBQVksQ0FBQyxLQUFhO1FBQ2hDLE1BQU07UUFDTixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEIsYUFBYTtRQUNiLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBRXRCLFVBQVU7UUFDVixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLHFCQUFxQixDQUFDLEtBQWE7UUFDekMsT0FBTztZQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXO1lBQ3RGLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxZQUFZO1NBQ3hGLENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ0g7UUFDRSxVQUFVO1FBQ1YsSUFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUV2QyxXQUFXO1FBQ1gsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDckssSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFFMUssYUFBYTtRQUNiLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN6RCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFFNUQsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUM7UUFDakUsSUFBSSxDQUFDLFNBQVMsR0FBRyxVQUFVLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUUvRCx3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRTdDLDRDQUE0QztRQUM1QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUU5RSxVQUFVO1FBQ1YsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBRXhFLGVBQWU7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1FBRTlCLGtCQUFrQjtRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsR0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRDs7O09BR0c7SUFDSSxjQUFjO1FBQ25CLE9BQU87WUFDTCxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQy9CLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNqQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWM7WUFDbkMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQjtZQUMzQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CO1lBQzdDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNqQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQzFCO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0ksVUFBVTtRQUNmLGFBQWE7UUFDYixJQUFJLENBQUMsWUFBWSxDQUFDLG1FQUFtRSxHQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkcsZ0JBQWdCO1FBQ2hCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRXRCLFVBQVU7UUFDVixPQUFPO1lBQ0wsQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztTQUNMLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FtQkc7SUFDSSxhQUFhLENBQUMsUUFBcUIsSUFBSTtRQUM1QyxhQUFhO1FBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBRTNDLFVBQVU7UUFDVixJQUFJLFdBQVcsR0FBZ0I7WUFDN0IsQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztTQUNMLENBQUM7UUFFRixtQ0FBbUM7UUFDbkMsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1lBQ2xCLFdBQVcsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakQ7UUFFRCxVQUFVO1FBQ1YsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVoRixZQUFZO1FBQ1osT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLFdBQVc7UUFDaEIsYUFBYTtRQUNiLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUVwQixjQUFjO1FBQ2QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU1QyxZQUFZO1FBQ1osT0FBTztZQUNMLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTztZQUNmLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTztTQUNoQixDQUFDO0lBQ0osQ0FBQztDQUVGOzs7Ozs7Ozs7Ozs7O0FDN05EO0FBQUE7QUFBQTtBQUFzQztBQUNNO0FBQzVDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFO0lBRW5DLGdCQUFnQjtJQUNoQixNQUFNLE1BQU0sR0FBRyxJQUFJLG9EQUFNLEVBQUUsQ0FBQztJQUU1QiwyQkFBMkI7SUFDM0IsSUFBSSxhQUFhLEdBQWtCLEVBQUUsQ0FBQztJQUV0QyxnQ0FBZ0M7SUFDaEMsTUFBTSxRQUFRLEdBQUcsR0FBRyxFQUFFO1FBQ3BCLE1BQU0sU0FBUyxHQUFHLElBQUksMERBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsYUFBYSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCwwQ0FBMEM7SUFDMUMsTUFBTSxZQUFZLEdBQUcsQ0FBQyxRQUF1QixFQUFFLEVBQUU7UUFDL0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3BFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztTQUM5QztJQUNILENBQUMsQ0FBQztJQUVGLGlCQUFpQjtJQUNqQixNQUFNLFdBQVcsR0FBRyxHQUFHLEVBQUU7UUFDdkIsT0FBTyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDO0lBRUYsb0JBQW9CO0lBQ3BCLE1BQU0sT0FBTyxHQUFHLENBQUMsS0FBWSxFQUFFLEtBQWEsRUFBRSxFQUFFO1FBQzlDLFlBQVk7UUFDWixJQUFJLFVBQVUsR0FBZ0I7WUFDNUIsQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztTQUNMLENBQUM7UUFFRixrQkFBa0I7UUFDbEIsUUFBUSxLQUFLLEVBQUU7WUFDYixLQUFLLE1BQU07Z0JBQ1QsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDakMsTUFBTTtZQUNSLEtBQUssU0FBUztnQkFDWixVQUFVLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekMsTUFBTTtZQUNSO2dCQUNFLFVBQVUsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN4QyxNQUFNO1NBQ1Q7UUFFRCxTQUFTO1FBQ1QsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQyxDQUFDO0lBRUYsZUFBZTtJQUNmLE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRTtRQUNoQixNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQyxDQUFDO0lBRUYsWUFBWTtJQUNaLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUU7UUFDckUsWUFBWTtRQUNaLFFBQVEsT0FBTyxDQUFDLElBQUksRUFBRTtZQUNwQixLQUFLLGFBQWE7Z0JBQ2hCLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO2dCQUM1QixNQUFNO1lBQ1IsS0FBSyxRQUFRO2dCQUNYLFlBQVksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDcEQsTUFBTTtZQUNSLEtBQUssV0FBVztnQkFDZCxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3ZCLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDakIsTUFBTTtZQUNSLEtBQUssTUFBTTtnQkFDVCxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pCLElBQUksRUFBRSxDQUFDO2dCQUNQLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDakIsTUFBTTtZQUNSO2dCQUNFLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDakIsTUFBTTtTQUNUO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCw4QkFBOEI7SUFDOUIsUUFBUSxFQUFFLENBQUM7QUFFYixDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJwYWdlLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3BhZ2UudHNcIik7XG4iLCJleHBvcnQgY2xhc3MgRmluZFN0eWxlIHtcclxuXHJcbiAgLyoqXHJcbiAgICogY29uc3RydWN0b3Ig44Gn5oy/5YWl44GZ44KLIEhUTUxFbGVtZW50XHJcbiAgICog44GT44Gu6KaB57Sg44Gr44G244KJ5LiL44GM44Gj44Gm44GE44KLIERPTSDjg4Tjg6rjg7zjgYzlr77osaFcclxuICAgKi9cclxuICByZWFkb25seSByb290OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgLyoqXHJcbiAgICogcm9vdCDkuIvjga7lhaggSFRNTEVsZW1lbnRcclxuICAgKiDpmo7lsaTmpa7jga/nhKHjgY/jgIHkuIDmrKHlhYPphY3liJfjgajjgZfjgabmjZXmjYlcclxuICAgKi9cclxuICBwcml2YXRlIGVsZW1lbnRzOiBIVE1MRWxlbWVudFtdO1xyXG5cclxuICAvKipcclxuICAgKiB0YXJnZXQg44GMIG51bGwg44Gn44Gq44GE44GT44Go44KS5L+d6Ki844GZ44KLIFR5cGUgZ3VhcmRcclxuICAgKiBIVE1MRWxlbWVudC5jaGlsZHJlbiDjgYvjgonlj5bjgaPjgabjgY3jgZ/jgqrjg5bjgrjjgqfjgq/jg4jjgavlr77jgZfjgabnlKjjgYTjgotcclxuICAgKiBAcGFyYW0gdGFyZ2V0XHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9pc0hUTUxFbGVtZW50KHRhcmdldDogYW55KTogdGFyZ2V0IGlzIEhUTUxFbGVtZW50IHtcclxuICAgIHJldHVybiAgdGFyZ2V0ICE9PSBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogcGFyZW50IOS4i+OBq+OBtuOCieS4i+OBjOOCiyBET00g44OE44Oq44O844KS5YaN5biw55qE44Gr5Y+W5b6X44GX44CBdGhpcy5lbGVtZW50cyDjgavov73liqDjgZnjgotcclxuICAgKiBAcGFyYW0gcGFyZW50XHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9maW5kQ2hpbGRyZW4ocGFyZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgLy/oh6rouqvjgpJwdXNoXHJcbiAgICB0aGlzLmVsZW1lbnRzLnB1c2gocGFyZW50KTtcclxuXHJcbiAgICAvL+WtkOimgee0oOOBruWPluW+l1xyXG4gICAgY29uc3QgY2hpbGRyZW4gPSBwYXJlbnQuY2hpbGRyZW47XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IGNoaWxkcmVuLmxlbmd0aDsgaSA8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XHJcbiAgICAgIC8v44K/44Kk44OX44Ks44O844OJ44KS6YCa44GZ44Gf44KB44CB5LiA5pem5aSJ5pWw44G45qC857SNXHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGNoaWxkcmVuLml0ZW0oaSk7XHJcblxyXG4gICAgICAvL3RhcmdldCDjgYwgbnVsbCDjgafjgarjgYTjgZPjgajjgpLkv53oqLxcclxuICAgICAgaWYgKCAhIHRoaXMuX2lzSFRNTEVsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvL+WGjeW4sOeahOOBq+OBk+OBrumWouaVsOOCkuWRvOOBtlxyXG4gICAgICB0aGlzLl9maW5kQ2hpbGRyZW4odGFyZ2V0KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOODieOCreODpeODoeODs+ODiOODq+ODvOODiOOCkueiuuS/neOBl+OAgeaknOe0ouWvvuixoeOBruimgee0oOOCkuaNleaNieOBmeOCi1xyXG4gICAqIEBwYXJhbSByb290XHJcbiAgICovXHJcbiAgY29uc3RydWN0b3Iocm9vdDogSFRNTEVsZW1lbnQpIHtcclxuICAgIC8v5qSc57Si5a++6LGh44OE44Oq44O844Gu6Kaq6KaB57Sg44KS55m76YyyXHJcbiAgICB0aGlzLnJvb3QgPSByb290O1xyXG5cclxuICAgIC8v5qSc57Si57WQ5p6c6YWN5YiX44KS5Yid5pyf5YyWXHJcbiAgICB0aGlzLmVsZW1lbnRzID0gbmV3IEFycmF5KCk7XHJcblxyXG4gICAgLy/mpJzntKLplovlp4tcclxuICAgIHRoaXMuX2ZpbmRDaGlsZHJlbihyb290KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIGNzcyDjgajjgZfjgaYgcHJvcGVydHk6IHZhbHVlIOOBjOmBqeeUqOOBleOCjOOBpuOBhOOCi+imgee0oOOCkiB0aGlzLmVsZW1lbnRzIOOBi+OCieWPluW+l+OBmeOCi1xyXG4gICAqIEBwYXJhbSBwcm9wZXJ0eVxyXG4gICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBmaW5kKHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBIVE1MRWxlbWVudFtdIHtcclxuICAgIC8v44GT44Gu44Oh44K944OD44OJ44GM6L+U44GZ6YWN5YiX44Gu55So5oSPXHJcbiAgICBsZXQgcmVzdWx0ID0gbmV3IEFycmF5KCk7XHJcblxyXG4gICAgLy/mjZXmjYnmuIjjgb/jga7opoHntKDjgpLpgJDkuIDmpJzntKJcclxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSB0aGlzLmVsZW1lbnRzLmxlbmd0aDsgaSA8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XHJcbiAgICAgIC8v6KiI566X5riI44G/IGNzcyDjgYzlkIjoh7TjgZfjgabjgYTjgarjgYvjgaPjgZ/jgonjgrnjg6vjg7xcclxuICAgICAgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudHNbaV0pLmdldFByb3BlcnR5VmFsdWUocHJvcGVydHkpICE9PSB2YWx1ZSkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvL+ipsuW9k+imgee0oOOBqOOBl+OBpuaknOe0oue1kOaenOmFjeWIl+OBq+i/veWKoFxyXG4gICAgICByZXN1bHQucHVzaCh0aGlzLmVsZW1lbnRzW2ldKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+ipsuW9k+imgee0oOOCkui/lOOBmVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7Q29vcmRpbmF0ZXMsIEluZm9ybWF0aW9ufSBmcm9tIFwic3JjL2NsYXNzL2ludGVyZmFjZVwiO1xuXG5leHBvcnQgY2xhc3MgU2l6aW5nIHtcblxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544GuIHdpbmRvdyB3aWR0aFxuICByZWFkb25seSB3aW5kb3dXaWR0aDogbnVtYmVyO1xuXG4gIC8vY29uc3RydWN0b3IoKSDmmYLngrnjga4gd2luZG93IGhlaWdodFxuICByZWFkb25seSB3aW5kb3dIZWlnaHQ6IG51bWJlcjtcblxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544GuIGRvY3VtZW50IHdpZHRoXG4gIHJlYWRvbmx5IGRvY3VtZW50V2lkdGg6IG51bWJlcjtcblxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544GuIGRvY3VtZW50IGhlaWdodFxuICByZWFkb25seSBkb2N1bWVudEhlaWdodDogbnVtYmVyO1xuXG4gIC8v55S76Z2i57iu5bCP5q+U546HXG4gIHJlYWRvbmx5IHJhdGlvOiBudW1iZXI7XG5cbiAgLy/nlLvpnaLjgpLluYXjgajpq5jjgZXjga7jganjgaHjgonjgafnuK7lsI/jgZfjgZ/jgYtcbiAgcmVhZG9ubHkgcmF0aW9UeXBlOiAnd2lkdGgnIHwgJ2hlaWdodCc7XG5cbiAgLy9kb2N1bWVudFdpZHRoIOOCkuePvuWcqOOBriB3aW5kb3dXaWR0aCDjga7lpKfjgY3jgZXjgafjgq3jg6Pjg5fjg4Hjg6PjgZnjgovjgavjga/mqKrjgavkvZXmnprjgq3jg6Pjg5fjg4Hjg6PjgYzlv4XopoHjgYtcbiAgcmVhZG9ubHkgd2lkdGhDYXB0dXJlTnVtYmVyOiBudW1iZXI7XG5cbiAgLy9kb2N1bWVudEhlaWdodCDjgpLnj77lnKjjga4gd2luZG93SGVpZ2h0IOOBruWkp+OBjeOBleOBp+OCreODo+ODl+ODgeODo+OBmeOCi+OBq+OBr+e4puOBq+S9leaemuOCreODo+ODl+ODgeODo+OBjOW/heimgeOBi1xuICByZWFkb25seSBoZWlnaHRDYXB0dXJlTnVtYmVyOiBudW1iZXI7XG5cbiAgLy/kuIroqJjkuozjgaTjga7kuZfnrpflgKRcbiAgcmVhZG9ubHkgY2FwdHVyZU51bWJlcjogbnVtYmVyO1xuXG4gIC8vY29uc3RydWN0b3IoKSDmmYLngrnjga7jgrnjgq/jg63jg7zjg6vkvY3nva4o5qiqKVxuICByZWFkb25seSBzY3JvbGxYOiBudW1iZXI7XG5cbiAgLy9jb25zdHJ1Y3RvcigpIOaZgueCueOBruOCueOCr+ODreODvOODq+S9jee9rijnuKYpXG4gIHJlYWRvbmx5IHNjcm9sbFk6IG51bWJlcjtcblxuICAvL+OBk+OBruOCr+ODqeOCueOBjOaJseOBhiA8c3R5bGU+IOOCv+OCsOOBriBpZCDlsZ7mgKflgKRcbiAgcmVhZG9ubHkgU1RZTEVfSUQ6IHN0cmluZztcblxuICAvKipcbiAgICog44GT44Gu44Kv44Op44K544GM5LuV6L6844KT44GgIHN0eWxlIOOCv+OCsOOCkuWJiumZpOOBmeOCi1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmVtb3ZlU3R5bGUoKSB7XG4gICAgLy/liYrpmaTlr77osaHjga7lj5blvpdcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLlNUWUxFX0lEKTtcblxuICAgIC8vdGFyZ2V0IOOBjOWtmOWcqOOBl+OBquOBi+OBo+OBn+OCieS9leOCguOBl+OBquOBhFxuICAgIGlmICh0YXJnZXQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvL+WvvuixoeOCkuWJiumZpOOBmeOCi1xuICAgIHRhcmdldC5yZW1vdmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzdHlsZSDjgr/jgrDjgpLmjL/lhaXjgZnjgotcbiAgICog5pei44Gr44GT44Gu44Kv44Op44K544GM5omx44Gj44Gm44GE44KLIHN0eWxlIOOBjOWtmOWcqOOBl+OBn+WgtOWQiOOBr+ODquOCu+ODg+ODiOOBmeOCi1xuICAgKiBAcGFyYW0gc3R5bGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX2FwcGVuZFN0eWxlKHN0eWxlOiBzdHJpbmcpIHtcbiAgICAvL+ODquOCu+ODg+ODiFxuICAgIHRoaXMuX3JlbW92ZVN0eWxlKCk7XG5cbiAgICAvL3N0eWxlIOOCv+OCsOOCkueUqOaEj1xuICAgIGNvbnN0IHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgdGFnLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLlNUWUxFX0lEKTtcbiAgICB0YWcuaW5uZXJUZXh0ID0gc3R5bGU7XG5cbiAgICAvL3RhZyDjgr/jgrDmjL/lhaVcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHRhZyk7XG4gIH1cblxuICAvKipcbiAgICog5oyH5a6a44GV44KM44GfIGluZGV4IOOBi+OCieOCueOCr+ODreODvOODq+OBmeOBueOBjeW6p+aomeOCkui/lOOBmVxuICAgKiBAcGFyYW0gaW5kZXhcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX2dldFNjcm9sbENvb3JkaW5hdGVzKGluZGV4OiBudW1iZXIpOiBDb29yZGluYXRlcyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IE1hdGguZmxvb3IoaW5kZXggJSB0aGlzLndpZHRoQ2FwdHVyZU51bWJlcikgJSB0aGlzLmNhcHR1cmVOdW1iZXIgKiB0aGlzLndpbmRvd1dpZHRoLFxuICAgICAgeTogTWF0aC5mbG9vcihpbmRleCAvIHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyKSAlIHRoaXMuY2FwdHVyZU51bWJlciAqIHRoaXMud2luZG93SGVpZ2h0XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiDlkITjgrXjgqTjgrrmg4XloLHjgpLlj5blvpfjg7voqIjnrpfjg7vkv53mjIHjgZnjgotcbiAgICog5Yqg44GI44Gm5b+F55So44Gq5a6a5pWw44KC5L+d566h44GZ44KLXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgLy/jgqbjgqPjg7Pjg4njgqbjgrXjgqTjgrpcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgdGhpcy53aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAvL+ODieOCreODpeODoeODs+ODiOOCteOCpOOCulxuICAgIHRoaXMuZG9jdW1lbnRXaWR0aCA9IE1hdGgubWF4KC4uLltkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoLCBkb2N1bWVudC5ib2R5LnNjcm9sbFdpZHRoLCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGgsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aF0pO1xuICAgIHRoaXMuZG9jdW1lbnRIZWlnaHQgPSBNYXRoLm1heCguLi5bZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQsIGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XSk7XG5cbiAgICAvL+W5heOBqOmrmOOBleOBneOCjOOBnuOCjOOBruWJsuWQiFxuICAgIGNvbnN0IHdpZHRoUmF0aW8gPSB0aGlzLndpbmRvd1dpZHRoIC8gdGhpcy5kb2N1bWVudFdpZHRoO1xuICAgIGNvbnN0IGhlaWdodFJhdGlvID0gdGhpcy53aW5kb3dIZWlnaHQgLyB0aGlzLmRvY3VtZW50SGVpZ2h0O1xuXG4gICAgLy9yYXRpbyDjgaggcmF0aW9UeXBlIOOBruOCu+ODg+ODiFxuICAgIHRoaXMucmF0aW8gPSB3aWR0aFJhdGlvID4gaGVpZ2h0UmF0aW8gPyBoZWlnaHRSYXRpbyA6IHdpZHRoUmF0aW87XG4gICAgdGhpcy5yYXRpb1R5cGUgPSB3aWR0aFJhdGlvID4gaGVpZ2h0UmF0aW8gPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG5cbiAgICAvL3JhdGlvIOOBjCAxIOS7peS4iuOBoOOBo+OBn+OCiSAxIOOBqOOBmeOCi1xuICAgIHRoaXMucmF0aW8gPSB0aGlzLnJhdGlvID4gMSA/IDEgOiB0aGlzLnJhdGlvO1xuXG4gICAgLy/nuKbjgajmqKrjgavjgYrjgYTjgabjgZ3jgozjgZ7jgoznj77lnKjjga7jgqbjgqPjg7Pjg4njgqbjgrXjgqTjgrrkvZXmnprliIbjgaflhajnlLvpnaLjgpLmjZXmjYnjgafjgY3jgovjgYvjga7mlbDlgKTjgpLnrpflh7pcbiAgICB0aGlzLndpZHRoQ2FwdHVyZU51bWJlciA9IE1hdGguY2VpbCh0aGlzLmRvY3VtZW50V2lkdGggLyB0aGlzLndpbmRvd1dpZHRoKTtcbiAgICB0aGlzLmhlaWdodENhcHR1cmVOdW1iZXIgPSBNYXRoLmNlaWwodGhpcy5kb2N1bWVudEhlaWdodCAvIHRoaXMud2luZG93SGVpZ2h0KTtcblxuICAgIC8v5LiK6KiY5LqM44Gk44Gu5LmX566X5YCkXG4gICAgdGhpcy5jYXB0dXJlTnVtYmVyID0gdGhpcy53aWR0aENhcHR1cmVOdW1iZXIgKiB0aGlzLmhlaWdodENhcHR1cmVOdW1iZXI7XG5cbiAgICAvL+ePvuWcqOOBruOCueOCr+ODreODvOODq+W6p+aomeOCkuiomOmMslxuICAgIHRoaXMuc2Nyb2xsWCA9IHdpbmRvdy5zY3JvbGxYO1xuICAgIHRoaXMuc2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZO1xuXG4gICAgLy9zdHlsZSDjgr/jgrDjgavkvb/nlKjjgZnjgosgaWRcbiAgICB0aGlzLlNUWUxFX0lEID0gJ3NpemluZ18nK01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKC04KTtcbiAgfVxuXG4gIC8qKlxuICAgKiDmg4XloLHjgpLov5TjgZlcbiAgICogQHJldHVybiB7e2RvY3VtZW50V2lkdGg6IG51bWJlciB8ICosIGRvY3VtZW50SGVpZ2h0OiBudW1iZXIgfCAqLCB3aW5kb3dIZWlnaHQ6IG51bWJlciB8ICosIHJhdGlvVHlwZTogc3RyaW5nLCB3aW5kb3dXaWR0aDogbnVtYmVyIHwgKiwgcmF0aW86ICgqfG51bWJlcil9fVxuICAgKi9cbiAgcHVibGljIGdldEluZm9ybWF0aW9uKCk6IEluZm9ybWF0aW9uIHtcbiAgICByZXR1cm4ge1xuICAgICAgd2luZG93V2lkdGg6IHRoaXMud2luZG93V2lkdGgsXG4gICAgICB3aW5kb3dIZWlnaHQ6IHRoaXMud2luZG93SGVpZ2h0LFxuICAgICAgZG9jdW1lbnRXaWR0aDogdGhpcy5kb2N1bWVudFdpZHRoLFxuICAgICAgZG9jdW1lbnRIZWlnaHQ6IHRoaXMuZG9jdW1lbnRIZWlnaHQsXG4gICAgICB3aWR0aENhcHR1cmVOdW1iZXI6IHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyLFxuICAgICAgaGVpZ2h0Q2FwdHVyZU51bWJlcjogdGhpcy5oZWlnaHRDYXB0dXJlTnVtYmVyLFxuICAgICAgY2FwdHVyZU51bWJlcjogdGhpcy5jYXB0dXJlTnVtYmVyLFxuICAgICAgcmF0aW86IHRoaXMucmF0aW8sXG4gICAgICByYXRpb1R5cGU6IHRoaXMucmF0aW9UeXBlXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIOODleODq+OCteOCpOOCuueUqOOBruOCteOCpOOCuOODs+OCsOWHpueQhuOCkuihjOOBhlxuICAgKi9cbiAgcHVibGljIGZ1bGxTaXppbmcoKTogQ29vcmRpbmF0ZXMge1xuICAgIC8vc3R5bGUg44K/44Kw44KS55Sf5oiQXG4gICAgdGhpcy5fYXBwZW5kU3R5bGUoJ2JvZHl7b3ZlcmZsb3c6aGlkZGVuO3RyYW5zZm9ybS1vcmlnaW46IGxlZnQgdG9wO3RyYW5zZm9ybTogc2NhbGUoJyt0aGlzLnJhdGlvKycpfScpO1xuXG4gICAgLy/jgrnjgq/jg63jg7zjg6vkvY3nva7jgpIgMCDjgavjgZnjgotcbiAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG5cbiAgICAvLzAsIDAg44KS6L+U44GZXG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IDAsXG4gICAgICB5OiAwXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjgrnjgq/jg63jg7zjg6vjg5Djg7zjgpLmtojjgZnjgaDjgZHjga7jgrXjgqTjgrjjg7PjgrDlh6bnkIbjgpLooYzjgYZcbiAgICog44K544Kv44Ot44O844Or5L2N572u44GvIGluZGV4IOeVquWPt+OBp+aMh+WumuOBmeOCi1xuICAgKiDjgZPjga4gaW5kZXgg55Wq5Y+344GvIGdldEluZm9ybWF0aW9uKCkg44Gn5Y+W5b6X44Gn44GN44KLIGNhcHR1cmVOdW1iZXIg44Gu56+E5Zuy44Gn5oyH5a6a44GX44CBXG4gICAqIOS+i+OBiOOBsFxuICAgKiB3aWR0aENhcHR1cmVOdW1iZXIgPSA0XG4gICAqIGhlaWdodENhcHR1cmVOdW1iZXIgPSAzXG4gICAqIGNhcHR1cmVOdW1iZXIgPSAxMlxuICAgKiDjgaDjgaPjgZ/loLTlkIjjga9cbiAgICogKy0tLS0rLS0tLSstLS0tKy0tLS0rXG4gICAqIHwgIDAgIHwgIDEgIHwgIDIgIHwgIDMgIHxcbiAgICogKy0tLS0rLS0tLSstLS0tKy0tLS0rXG4gICAqIHwgIDQgIHwgIDUgIHwgIDYgIHwgIDcgIHxcbiAgICogKy0tLS0rLS0tLSstLS0tKy0tLS0rXG4gICAqIHwgIDggIHwgIDkgIHwgMTAgfCAxMSB8XG4gICAqICstLS0tKy0tLS0rLS0tLSstLS0tK1xuICAgKiDjgajjgYTjgaPjgZ/lkITjg57jgrnjga7lt6bkuIrluqfmqJnjgbjjgrnjgq/jg63jg7zjg6vjgZnjgovjgZPjgajjgavjgarjgotcbiAgICog5ZCE44Oe44K544GuIHdpZHRoLCBoZWlnaHQgPSB3aW5kb3dXaWR0aCwgd2luZG93SGVpZ2h0XG4gICAqIOWkp+aeoOOBriB3aWR0aCwgaGVpZ2h0ID0gZG9jdW1lbnRXaWR0aCwgZG9jdW1lbnRIZWlnaHRcbiAgICovXG4gIHB1YmxpYyBkaXNwbGF5U2l6aW5nKGluZGV4OiBudW1iZXJ8bnVsbCA9IG51bGwpOiBDb29yZGluYXRlcyB7XG4gICAgLy9zdHlsZSDjgr/jgrDjgpLnlJ/miJBcbiAgICB0aGlzLl9hcHBlbmRTdHlsZSgnaHRtbHtvdmVyZmxvdzpoaWRkZW59Jyk7XG5cbiAgICAvL+enu+WLleWFiOW6p+aomeOBruWumue+qVxuICAgIGxldCBjb29yZGluYXRlczogQ29vcmRpbmF0ZXMgPSB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH07XG5cbiAgICAvL+OCueOCr+ODreODvOODq+aMh+WumuOBjOOBguOCjOOBsOOBneOBruW6p+aomeOBpyBjb29yZGluYXRlcyDjgpLkuIrmm7jjgY1cbiAgICBpZiAoaW5kZXggIT09IG51bGwpIHtcbiAgICAgIGNvb3JkaW5hdGVzID0gdGhpcy5fZ2V0U2Nyb2xsQ29vcmRpbmF0ZXMoaW5kZXgpO1xuICAgIH1cblxuICAgIC8v44K544Kv44Ot44O844Or44Gu5a6f6KGMXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXS5zY3JvbGxUbyhjb29yZGluYXRlcy54LCBjb29yZGluYXRlcy55KTtcblxuICAgIC8v44K544Kv44Ot44O844Or5oOF5aCx44KS6L+U44GZXG4gICAgcmV0dXJuIGNvb3JkaW5hdGVzO1xuICB9XG5cbiAgLyoqXG4gICAqIOOCteOCpOOCuOODs+OCsOOBruODquOCu+ODg+ODiFxuICAgKiDjgrnjgq/jg63jg7zjg6vkvY3nva7jgoLjg6rjgrvjg4Pjg4jjgZnjgotcbiAgICovXG4gIHB1YmxpYyByZXNldFNpemluZygpOiBDb29yZGluYXRlcyB7XG4gICAgLy9zdHlsZSDjga7jg6rjgrvjg4Pjg4hcbiAgICB0aGlzLl9yZW1vdmVTdHlsZSgpO1xuXG4gICAgLy/jgrnjgq/jg63jg7zjg6vkvY3nva7jga7jg6rjgrvjg4Pjg4hcbiAgICB3aW5kb3cuc2Nyb2xsVG8odGhpcy5zY3JvbGxYLCB0aGlzLnNjcm9sbFkpO1xuXG4gICAgLy/jgrnjgq/jg63jg7zjg6vkvY3nva7jgpLov5TjgZlcbiAgICByZXR1cm4ge1xuICAgICAgeDogdGhpcy5zY3JvbGxYLFxuICAgICAgeTogdGhpcy5zY3JvbGxZXG4gICAgfTtcbiAgfVxuXG59XG4iLCJpbXBvcnQge1JhbmdlLCBDb29yZGluYXRlc30gZnJvbSBcIi4vY2xhc3MvaW50ZXJmYWNlXCI7XG5pbXBvcnQge1NpemluZ30gZnJvbSBcIi4vY2xhc3MvU2l6aW5nXCI7XG5pbXBvcnQge0ZpbmRTdHlsZX0gZnJvbSBcIi4vY2xhc3MvRmluZFN0eWxlXCI7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcblxuICAvL+OCteOCpOOCuuOCkuWPluW+l+OBmeOCi+OBn+OCgeOBruOCr+ODqeOCuVxuICBjb25zdCBzaXppbmcgPSBuZXcgU2l6aW5nKCk7XG5cbiAgLy9wb3NpdGlvbjogZml4ZWQg44KS5o6h55So44GX44Gm44GE44KL6KaB57SgXG4gIGxldCBmaXhlZEVsZW1lbnRzOiBIVE1MRWxlbWVudFtdID0gW107XG5cbiAgLy9wb3NpdGlvbjogZml4ZWQg44KS5o6h55So44GX44Gm44GE44KL6KaB57Sg44KS56K65L+d44GZ44KLXG4gIGNvbnN0IGdldEZpeGVkID0gKCkgPT4ge1xuICAgIGNvbnN0IGZpbmRTdHlsZSA9IG5ldyBGaW5kU3R5bGUoZG9jdW1lbnQuYm9keSk7XG4gICAgZml4ZWRFbGVtZW50cyA9IGZpbmRTdHlsZS5maW5kKCdwb3NpdGlvbicsICdmaXhlZCcpO1xuICB9XG5cbiAgLy9wb3NpdGlvbjogZml4ZWQg44KS5o6h55So44GX44Gm44GE44KL6KaB57Sg44KS6Z2e6KGo56S644Gr44GZ44KLIG9yIOWFg+OBq+aIu+OBmVxuICBjb25zdCBjb250cm9sRml4ZWQgPSAocHJvcGVydHk6ICdoaWRkZW4nIHwgJycpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gZml4ZWRFbGVtZW50cy5sZW5ndGg7IGkgPCBtYXg7IGkgPSAoaSArIDEpIHwgMCkge1xuICAgICAgZml4ZWRFbGVtZW50c1tpXS5zdHlsZS52aXNpYmlsaXR5ID0gcHJvcGVydHk7XG4gICAgfVxuICB9O1xuXG4gIC8v6KGo56S644GV44KM44Gm44GE44KL44K/44OW44Gu5oOF5aCx44KS6L+U44GZXG4gIGNvbnN0IGluZm9ybWF0aW9uID0gKCkgPT4ge1xuICAgIHJldHVybiBzaXppbmcuZ2V0SW5mb3JtYXRpb24oKTtcbiAgfTtcblxuICAvL+ODluODqeOCpuOCtuOBruWkp+OBjeOBleOCkumBqeWIh+OBquOCguOBruOBq+WkieOBiOOCi1xuICBjb25zdCBzdHlsaW5nID0gKHJhbmdlOiBSYW5nZSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgIC8v5Yem55CG57WC5LqG5b6M44Gu5bqn5qiZ5oOF5aCxXG4gICAgbGV0IGNvb3JkaW5hdGU6IENvb3JkaW5hdGVzID0ge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9O1xuXG4gICAgLy9yYW5nZSDjgavjgojjgaPjgablh6bnkIbjgpLliIbjgZHjgotcbiAgICBzd2l0Y2ggKHJhbmdlKSB7XG4gICAgICBjYXNlICdmdWxsJzpcbiAgICAgICAgY29vcmRpbmF0ZSA9IHNpemluZy5mdWxsU2l6aW5nKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncGVyZmVjdCc6XG4gICAgICAgIGNvb3JkaW5hdGUgPSBzaXppbmcuZGlzcGxheVNpemluZyhpbmRleCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29vcmRpbmF0ZSA9IHNpemluZy5kaXNwbGF5U2l6aW5nKG51bGwpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvL+W6p+aomeaDheWgseOCkui/lOOBmVxuICAgIHJldHVybiBjb29yZGluYXRlO1xuICB9O1xuXG4gIC8v44OW44Op44Km44K244Gu5aSn44GN44GV44KS5YWD44Gr5oi744GZXG4gIGNvbnN0IGJhY2sgPSAoKSA9PiB7XG4gICAgc2l6aW5nLnJlc2V0U2l6aW5nKCk7XG4gIH07XG5cbiAgLy/jg6Hjg4Pjgrvjg7zjgrjjg5Hjg4Pjgrfjg7PjgrBcbiAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChyZXF1ZXN0LCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xuICAgIC8vIOWPl+OBkeWPluOBo+OBn+WApOOBp+WIhuWykFxuICAgIHN3aXRjaCAocmVxdWVzdC50eXBlKSB7XG4gICAgICBjYXNlICdpbmZvcm1hdGlvbic6XG4gICAgICAgIHNlbmRSZXNwb25zZShpbmZvcm1hdGlvbigpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzaXppbmcnOlxuICAgICAgICBzZW5kUmVzcG9uc2Uoc3R5bGluZyhyZXF1ZXN0LnJhbmdlLCByZXF1ZXN0LmluZGV4KSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAna2lsbEZpeGVkJzpcbiAgICAgICAgY29udHJvbEZpeGVkKCdoaWRkZW4nKTtcbiAgICAgICAgc2VuZFJlc3BvbnNlKHt9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdiYWNrJzpcbiAgICAgICAgY29udHJvbEZpeGVkKCcnKTtcbiAgICAgICAgYmFjaygpO1xuICAgICAgICBzZW5kUmVzcG9uc2Uoe30pO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHNlbmRSZXNwb25zZSh7fSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSk7XG5cbiAgLy9wb3NpdGlvbjogZml4ZWQg44KS5o6h55So44GX44Gm44GE44KL6KaB57Sg44Gu56K65L+dXG4gIGdldEZpeGVkKCk7XG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==