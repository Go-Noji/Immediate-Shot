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
        //index 指定が無かったら style タグを適用の後、現在のスクロール位置を返す
        if (index === null) {
            //style タグを生成
            this._appendStyle('html{overflow:hidden}');
            //現在のスクロール位置を返す
            return {
                x: document.getElementsByTagName('html')[0].scrollTop,
                y: document.getElementsByTagName('html')[0].scrollLeft
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzL0ZpbmRTdHlsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MvU2l6aW5nLnRzIiwid2VicGFjazovLy8uL3NyYy9wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFPLE1BQU0sU0FBUztJQWNwQjs7Ozs7T0FLRztJQUNLLGNBQWMsQ0FBQyxNQUFXO1FBQ2hDLE9BQVEsTUFBTSxLQUFLLElBQUksQ0FBQztJQUMxQixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNLLGFBQWEsQ0FBQyxNQUFtQjtRQUN2QyxTQUFTO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFM0IsUUFBUTtRQUNSLE1BQU0sUUFBUSxHQUFHLE1B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QUMsSUFBSSxFQUFFO1lBQ3BCLEtBQUssYUFBYTtnQkFDaEIsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7Z0JBQzVCLE1BQU07WUFDUixLQUFLLFFBQVE7Z0JBQ1gsWUFBWSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxNQUFNO1lBQ1IsS0FBSyxXQUFXO2dCQUNkLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDdkIsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQixNQUFNO1lBQ1IsS0FBSyxhQUFhO2dCQUNoQixZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2pCLFdBQVcsQ0FBQyxFQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztnQkFDMUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQixNQUFNO1lBQ1I7Z0JBQ0UsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQixNQUFNO1NBQ1Q7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILDhCQUE4QjtJQUM5QixRQUFRLEVBQUUsQ0FBQztBQUViLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6InBhZ2UuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvcGFnZS50c1wiKTtcbiIsImV4cG9ydCBjbGFzcyBGaW5kU3R5bGUge1xyXG5cclxuICAvKipcclxuICAgKiBjb25zdHJ1Y3RvciDjgafmjL/lhaXjgZnjgosgSFRNTEVsZW1lbnRcclxuICAgKiDjgZPjga7opoHntKDjgavjgbbjgonkuIvjgYzjgaPjgabjgYTjgosgRE9NIOODhOODquODvOOBjOWvvuixoVxyXG4gICAqL1xyXG4gIHJlYWRvbmx5IHJvb3Q6IEhUTUxFbGVtZW50O1xyXG5cclxuICAvKipcclxuICAgKiByb290IOS4i+OBruWFqCBIVE1MRWxlbWVudFxyXG4gICAqIOmajuWxpOalruOBr+eEoeOBj+OAgeS4gOasoeWFg+mFjeWIl+OBqOOBl+OBpuaNleaNiVxyXG4gICAqL1xyXG4gIHByaXZhdGUgZWxlbWVudHM6IEhUTUxFbGVtZW50W107XHJcblxyXG4gIC8qKlxyXG4gICAqIHRhcmdldCDjgYwgbnVsbCDjgafjgarjgYTjgZPjgajjgpLkv53oqLzjgZnjgosgVHlwZSBndWFyZFxyXG4gICAqIEhUTUxFbGVtZW50LmNoaWxkcmVuIOOBi+OCieWPluOBo+OBpuOBjeOBn+OCquODluOCuOOCp+OCr+ODiOOBq+WvvuOBl+OBpueUqOOBhOOCi1xyXG4gICAqIEBwYXJhbSB0YXJnZXRcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2lzSFRNTEVsZW1lbnQodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgSFRNTEVsZW1lbnQge1xyXG4gICAgcmV0dXJuICB0YXJnZXQgIT09IG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBwYXJlbnQg5LiL44Gr44G244KJ5LiL44GM44KLIERPTSDjg4Tjg6rjg7zjgpLlho3luLDnmoTjgavlj5blvpfjgZfjgIF0aGlzLmVsZW1lbnRzIOOBq+i/veWKoOOBmeOCi1xyXG4gICAqIEBwYXJhbSBwYXJlbnRcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2ZpbmRDaGlsZHJlbihwYXJlbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAvL+iHqui6q+OCknB1c2hcclxuICAgIHRoaXMuZWxlbWVudHMucHVzaChwYXJlbnQpO1xyXG5cclxuICAgIC8v5a2Q6KaB57Sg44Gu5Y+W5b6XXHJcbiAgICBjb25zdCBjaGlsZHJlbiA9IHBhcmVudC5jaGlsZHJlbjtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbWF4OyBpID0gKGkgKyAxKSB8IDApIHtcclxuICAgICAgLy/jgr/jgqTjg5fjgqzjg7zjg4njgpLpgJrjgZnjgZ/jgoHjgIHkuIDml6blpInmlbDjgbjmoLzntI1cclxuICAgICAgY29uc3QgdGFyZ2V0ID0gY2hpbGRyZW4uaXRlbShpKTtcclxuXHJcbiAgICAgIC8vdGFyZ2V0IOOBjCBudWxsIOOBp+OBquOBhOOBk+OBqOOCkuS/neiovFxyXG4gICAgICBpZiAoICEgdGhpcy5faXNIVE1MRWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8v5YaN5biw55qE44Gr44GT44Gu6Zai5pWw44KS5ZG844G2XHJcbiAgICAgIHRoaXMuX2ZpbmRDaGlsZHJlbih0YXJnZXQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44OJ44Kt44Ol44Oh44Oz44OI44Or44O844OI44KS56K65L+d44GX44CB5qSc57Si5a++6LGh44Gu6KaB57Sg44KS5o2V5o2J44GZ44KLXHJcbiAgICogQHBhcmFtIHJvb3RcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihyb290OiBIVE1MRWxlbWVudCkge1xyXG4gICAgLy/mpJzntKLlr77osaHjg4Tjg6rjg7zjga7opqropoHntKDjgpLnmbvpjLJcclxuICAgIHRoaXMucm9vdCA9IHJvb3Q7XHJcblxyXG4gICAgLy/mpJzntKLntZDmnpzphY3liJfjgpLliJ3mnJ/ljJZcclxuICAgIHRoaXMuZWxlbWVudHMgPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAvL+aknOe0oumWi+Wni1xyXG4gICAgdGhpcy5fZmluZENoaWxkcmVuKHJvb3QpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY3NzIOOBqOOBl+OBpiBwcm9wZXJ0eTogdmFsdWUg44GM6YGp55So44GV44KM44Gm44GE44KL6KaB57Sg44KSIHRoaXMuZWxlbWVudHMg44GL44KJ5Y+W5b6X44GZ44KLXHJcbiAgICogQHBhcmFtIHByb3BlcnR5XHJcbiAgICogQHBhcmFtIHZhbHVlXHJcbiAgICovXHJcbiAgcHVibGljIGZpbmQocHJvcGVydHk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IEhUTUxFbGVtZW50W10ge1xyXG4gICAgLy/jgZPjga7jg6Hjgr3jg4Pjg4njgYzov5TjgZnphY3liJfjga7nlKjmhI9cclxuICAgIGxldCByZXN1bHQgPSBuZXcgQXJyYXkoKTtcclxuXHJcbiAgICAvL+aNleaNiea4iOOBv+OBruimgee0oOOCkumAkOS4gOaknOe0olxyXG4gICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IHRoaXMuZWxlbWVudHMubGVuZ3RoOyBpIDwgbWF4OyBpID0gKGkgKyAxKSB8IDApIHtcclxuICAgICAgLy/oqIjnrpfmuIjjgb8gY3NzIOOBjOWQiOiHtOOBl+OBpuOBhOOBquOBi+OBo+OBn+OCieOCueODq+ODvFxyXG4gICAgICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50c1tpXSkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSkgIT09IHZhbHVlKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8v6Kmy5b2T6KaB57Sg44Go44GX44Gm5qSc57Si57WQ5p6c6YWN5YiX44Gr6L+95YqgXHJcbiAgICAgIHJlc3VsdC5wdXNoKHRoaXMuZWxlbWVudHNbaV0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6Kmy5b2T6KaB57Sg44KS6L+U44GZXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtDb29yZGluYXRlcywgSW5mb3JtYXRpb259IGZyb20gXCJzcmMvY2xhc3MvaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2l6aW5nIHtcclxuXHJcbiAgLy9jb25zdHJ1Y3RvcigpIOaZgueCueOBriB3aW5kb3cgd2lkdGhcclxuICBwcml2YXRlIHdpbmRvd1dpZHRoOiBudW1iZXIgPSAwO1xyXG5cclxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544GuIHdpbmRvdyBoZWlnaHRcclxuICBwcml2YXRlIHdpbmRvd0hlaWdodDogbnVtYmVyID0gMDtcclxuXHJcbiAgLy9jb25zdHJ1Y3RvcigpIOaZgueCueOBriBkb2N1bWVudCB3aWR0aFxyXG4gIHByaXZhdGUgZG9jdW1lbnRXaWR0aDogbnVtYmVyID0gMDtcclxuXHJcbiAgLy9jb25zdHJ1Y3RvcigpIOaZgueCueOBriBkb2N1bWVudCBoZWlnaHRcclxuICBwcml2YXRlIGRvY3VtZW50SGVpZ2h0OiBudW1iZXIgPSAwO1xyXG5cclxuICAvL+eUu+mdoue4ruWwj+avlOeOh1xyXG4gIHByaXZhdGUgcmF0aW86IG51bWJlciA9IDA7XHJcblxyXG4gIC8v55S76Z2i44KS5bmF44Go6auY44GV44Gu44Gp44Gh44KJ44Gn57iu5bCP44GX44Gf44GLXHJcbiAgcHJpdmF0ZSByYXRpb1R5cGU6ICd3aWR0aCcgfCAnaGVpZ2h0JyA9ICdoZWlnaHQnO1xyXG5cclxuICAvL2RvY3VtZW50V2lkdGgg44KS54++5Zyo44GuIHdpbmRvd1dpZHRoIOOBruWkp+OBjeOBleOBp+OCreODo+ODl+ODgeODo+OBmeOCi+OBq+OBr+aoquOBq+S9leaemuOCreODo+ODl+ODgeODo+OBjOW/heimgeOBi1xyXG4gIHByaXZhdGUgd2lkdGhDYXB0dXJlTnVtYmVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAvL2RvY3VtZW50SGVpZ2h0IOOCkuePvuWcqOOBriB3aW5kb3dIZWlnaHQg44Gu5aSn44GN44GV44Gn44Kt44Oj44OX44OB44Oj44GZ44KL44Gr44Gv57im44Gr5L2V5p6a44Kt44Oj44OX44OB44Oj44GM5b+F6KaB44GLXHJcbiAgcHJpdmF0ZSBoZWlnaHRDYXB0dXJlTnVtYmVyOiBudW1iZXIgPSAwO1xyXG5cclxuICAvL+S4iuiomOS6jOOBpOOBruS5l+eul+WApFxyXG4gIHByaXZhdGUgY2FwdHVyZU51bWJlcjogbnVtYmVyID0gMDtcclxuXHJcbiAgLy9jb25zdHJ1Y3RvcigpIOaZgueCueOBruOCueOCr+ODreODvOODq+S9jee9rijmqKopXHJcbiAgcHJpdmF0ZSBzY3JvbGxYOiBudW1iZXIgPSAwO1xyXG5cclxuICAvL2NvbnN0cnVjdG9yKCkg5pmC54K544Gu44K544Kv44Ot44O844Or5L2N572uKOe4pilcclxuICBwcml2YXRlIHNjcm9sbFk6IG51bWJlciA9IDA7XHJcblxyXG4gIC8v44GT44Gu44Kv44Op44K544GM5omx44GGIDxzdHlsZT4g44K/44Kw44GuIGlkIOWxnuaAp+WApFxyXG4gIHJlYWRvbmx5IFNUWUxFX0lEOiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIOOBk+OBruOCr+ODqeOCueOBjOS7lei+vOOCk+OBoCBzdHlsZSDjgr/jgrDjgpLliYrpmaTjgZnjgotcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3JlbW92ZVN0eWxlKCkge1xyXG4gICAgLy/liYrpmaTlr77osaHjga7lj5blvpdcclxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuU1RZTEVfSUQpO1xyXG5cclxuICAgIC8vdGFyZ2V0IOOBjOWtmOWcqOOBl+OBquOBi+OBo+OBn+OCieS9leOCguOBl+OBquOBhFxyXG4gICAgaWYgKHRhcmdldCA9PT0gbnVsbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy/lr77osaHjgpLliYrpmaTjgZnjgotcclxuICAgIHRhcmdldC5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHN0eWxlIOOCv+OCsOOCkuaMv+WFpeOBmeOCi1xyXG4gICAqIOaXouOBq+OBk+OBruOCr+ODqeOCueOBjOaJseOBo+OBpuOBhOOCiyBzdHlsZSDjgYzlrZjlnKjjgZfjgZ/loLTlkIjjga/jg6rjgrvjg4Pjg4jjgZnjgotcclxuICAgKiBAcGFyYW0gc3R5bGVcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2FwcGVuZFN0eWxlKHN0eWxlOiBzdHJpbmcpIHtcclxuICAgIC8v44Oq44K744OD44OIXHJcbiAgICB0aGlzLl9yZW1vdmVTdHlsZSgpO1xyXG5cclxuICAgIC8vc3R5bGUg44K/44Kw44KS55So5oSPXHJcbiAgICBjb25zdCB0YWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG4gICAgdGFnLnNldEF0dHJpYnV0ZSgnaWQnLCB0aGlzLlNUWUxFX0lEKTtcclxuICAgIHRhZy5pbm5lclRleHQgPSBzdHlsZTtcclxuXHJcbiAgICAvL3RhZyDjgr/jgrDmjL/lhaVcclxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodGFnKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOaMh+WumuOBleOCjOOBnyBpbmRleCDjgYvjgonjgrnjgq/jg63jg7zjg6vjgZnjgbnjgY3luqfmqJnjgpLov5TjgZlcclxuICAgKiBAcGFyYW0gaW5kZXhcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2dldFNjcm9sbENvb3JkaW5hdGVzKGluZGV4OiBudW1iZXIpOiBDb29yZGluYXRlcyB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4OiBNYXRoLmZsb29yKGluZGV4ICUgdGhpcy53aWR0aENhcHR1cmVOdW1iZXIpICUgdGhpcy5jYXB0dXJlTnVtYmVyICogdGhpcy53aW5kb3dXaWR0aCxcclxuICAgICAgeTogTWF0aC5mbG9vcihpbmRleCAvIHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyKSAlIHRoaXMuY2FwdHVyZU51bWJlciAqIHRoaXMud2luZG93SGVpZ2h0XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5ZCE56iu5oOF5aCx44KS44Ki44OD44OX44OH44O844OI44GZ44KLXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF91cGRhdGVJbmZvcm1hdGlvbigpIHtcclxuICAgIC8v44Km44Kj44Oz44OJ44Km44K144Kk44K6XHJcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICB0aGlzLndpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICAvL+ODieOCreODpeODoeODs+ODiOOCteOCpOOCulxyXG4gICAgdGhpcy5kb2N1bWVudFdpZHRoID0gTWF0aC5tYXgoLi4uW2RvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgsIGRvY3VtZW50LmJvZHkuc2Nyb2xsV2lkdGgsIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxXaWR0aCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoXSk7XHJcbiAgICB0aGlzLmRvY3VtZW50SGVpZ2h0ID0gTWF0aC5tYXgoLi4uW2RvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0LCBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodF0pO1xyXG5cclxuICAgIC8v5bmF44Go6auY44GV44Gd44KM44Ge44KM44Gu5Ymy5ZCIXHJcbiAgICBjb25zdCB3aWR0aFJhdGlvID0gdGhpcy53aW5kb3dXaWR0aCAvIHRoaXMuZG9jdW1lbnRXaWR0aDtcclxuICAgIGNvbnN0IGhlaWdodFJhdGlvID0gdGhpcy53aW5kb3dIZWlnaHQgLyB0aGlzLmRvY3VtZW50SGVpZ2h0O1xyXG5cclxuICAgIC8vcmF0aW8g44GoIHJhdGlvVHlwZSDjga7jgrvjg4Pjg4hcclxuICAgIHRoaXMucmF0aW8gPSB3aWR0aFJhdGlvID4gaGVpZ2h0UmF0aW8gPyBoZWlnaHRSYXRpbyA6IHdpZHRoUmF0aW87XHJcbiAgICB0aGlzLnJhdGlvVHlwZSA9IHdpZHRoUmF0aW8gPiBoZWlnaHRSYXRpbyA/ICdoZWlnaHQnIDogJ3dpZHRoJztcclxuXHJcbiAgICAvL3JhdGlvIOOBjCAxIOS7peS4iuOBoOOBo+OBn+OCiSAxIOOBqOOBmeOCi1xyXG4gICAgdGhpcy5yYXRpbyA9IHRoaXMucmF0aW8gPiAxID8gMSA6IHRoaXMucmF0aW87XHJcblxyXG4gICAgLy/nuKbjgajmqKrjgavjgYrjgYTjgabjgZ3jgozjgZ7jgoznj77lnKjjga7jgqbjgqPjg7Pjg4njgqbjgrXjgqTjgrrkvZXmnprliIbjgaflhajnlLvpnaLjgpLmjZXmjYnjgafjgY3jgovjgYvjga7mlbDlgKTjgpLnrpflh7pcclxuICAgIHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyID0gTWF0aC5jZWlsKHRoaXMuZG9jdW1lbnRXaWR0aCAvIHRoaXMud2luZG93V2lkdGgpO1xyXG4gICAgdGhpcy5oZWlnaHRDYXB0dXJlTnVtYmVyID0gTWF0aC5jZWlsKHRoaXMuZG9jdW1lbnRIZWlnaHQgLyB0aGlzLndpbmRvd0hlaWdodCk7XHJcblxyXG4gICAgLy/kuIroqJjkuozjgaTjga7kuZfnrpflgKRcclxuICAgIHRoaXMuY2FwdHVyZU51bWJlciA9IHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyICogdGhpcy5oZWlnaHRDYXB0dXJlTnVtYmVyO1xyXG5cclxuICAgIC8v54++5Zyo44Gu44K544Kv44Ot44O844Or5bqn5qiZ44KS6KiY6YyyXHJcbiAgICB0aGlzLnNjcm9sbFggPSB3aW5kb3cuc2Nyb2xsWDtcclxuICAgIHRoaXMuc2Nyb2xsWSA9IHdpbmRvdy5zY3JvbGxZO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5ZCE44K144Kk44K65oOF5aCx44KS5Y+W5b6X44O76KiI566X44O75L+d5oyB44GZ44KLXHJcbiAgICog5Yqg44GI44Gm5b+F55So44Gq5a6a5pWw44KC5L+d566h44GZ44KLXHJcbiAgICovXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy9zdHlsZSDjgr/jgrDjgavkvb/nlKjjgZnjgosgaWRcclxuICAgIHRoaXMuU1RZTEVfSUQgPSAnc2l6aW5nXycrTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoLTgpO1xyXG5cclxuICAgIC8v5ZCE56iu5oOF5aCx44KS44K744OD44OI44GZ44KLXHJcbiAgICB0aGlzLl91cGRhdGVJbmZvcm1hdGlvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5oOF5aCx44KS6L+U44GZXHJcbiAgICogQHJldHVybiB7e2RvY3VtZW50V2lkdGg6IG51bWJlciB8ICosIGRvY3VtZW50SGVpZ2h0OiBudW1iZXIgfCAqLCB3aW5kb3dIZWlnaHQ6IG51bWJlciB8ICosIHJhdGlvVHlwZTogc3RyaW5nLCB3aW5kb3dXaWR0aDogbnVtYmVyIHwgKiwgcmF0aW86ICgqfG51bWJlcil9fVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRJbmZvcm1hdGlvbigpOiBJbmZvcm1hdGlvbiB7XHJcbiAgICAvL+aDheWgseOBruabtOaWsFxyXG4gICAgdGhpcy5fdXBkYXRlSW5mb3JtYXRpb24oKTtcclxuXHJcbiAgICAvL+ioiOeul+e1kOaenOOCkui/lOOBmVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgd2luZG93V2lkdGg6IHRoaXMud2luZG93V2lkdGgsXHJcbiAgICAgIHdpbmRvd0hlaWdodDogdGhpcy53aW5kb3dIZWlnaHQsXHJcbiAgICAgIGRvY3VtZW50V2lkdGg6IHRoaXMuZG9jdW1lbnRXaWR0aCxcclxuICAgICAgZG9jdW1lbnRIZWlnaHQ6IHRoaXMuZG9jdW1lbnRIZWlnaHQsXHJcbiAgICAgIHdpZHRoQ2FwdHVyZU51bWJlcjogdGhpcy53aWR0aENhcHR1cmVOdW1iZXIsXHJcbiAgICAgIGhlaWdodENhcHR1cmVOdW1iZXI6IHRoaXMuaGVpZ2h0Q2FwdHVyZU51bWJlcixcclxuICAgICAgY2FwdHVyZU51bWJlcjogdGhpcy5jYXB0dXJlTnVtYmVyLFxyXG4gICAgICByYXRpbzogdGhpcy5yYXRpbyxcclxuICAgICAgcmF0aW9UeXBlOiB0aGlzLnJhdGlvVHlwZSxcclxuICAgICAgc2Nyb2xsWDogdGhpcy5zY3JvbGxYLFxyXG4gICAgICBzY3JvbGxZOiB0aGlzLnNjcm9sbFlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOODleODq+OCteOCpOOCuueUqOOBruOCteOCpOOCuOODs+OCsOWHpueQhuOCkuihjOOBhlxyXG4gICAqL1xyXG4gIHB1YmxpYyBmdWxsU2l6aW5nKCk6IENvb3JkaW5hdGVzIHtcclxuICAgIC8vc3R5bGUg44K/44Kw44KS55Sf5oiQXHJcbiAgICB0aGlzLl9hcHBlbmRTdHlsZSgnYm9keXtvdmVyZmxvdzpoaWRkZW47dHJhbnNmb3JtLW9yaWdpbjogbGVmdCB0b3A7dHJhbnNmb3JtOiBzY2FsZSgnK3RoaXMucmF0aW8rJyl9Jyk7XHJcblxyXG4gICAgLy/jgrnjgq/jg63jg7zjg6vkvY3nva7jgpIgMCDjgavjgZnjgotcclxuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcclxuXHJcbiAgICAvLzAsIDAg44KS6L+U44GZXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB4OiAwLFxyXG4gICAgICB5OiAwXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K544Kv44Ot44O844Or44OQ44O844KS5raI44GZ44Gg44GR44Gu44K144Kk44K444Oz44Kw5Yem55CG44KS6KGM44GGXHJcbiAgICog44K544Kv44Ot44O844Or5L2N572u44GvIGluZGV4IOeVquWPt+OBp+aMh+WumuOBmeOCi1xyXG4gICAqIGluZGV4IOOBjCBudWxsIOOBoOOBo+OBn+WgtOWQiOOBr+OCueOCr+ODreODvOODq+OCkuWkieabtOOBl+OBquOBhFxyXG4gICAqIOOBk+OBriBpbmRleCDnlarlj7fjga8gZ2V0SW5mb3JtYXRpb24oKSDjgaflj5blvpfjgafjgY3jgosgY2FwdHVyZU51bWJlciDjga7nr4Tlm7LjgafmjIflrprjgZfjgIFcclxuICAgKiDkvovjgYjjgbBcclxuICAgKiB3aWR0aENhcHR1cmVOdW1iZXIgPSA0XHJcbiAgICogaGVpZ2h0Q2FwdHVyZU51bWJlciA9IDNcclxuICAgKiBjYXB0dXJlTnVtYmVyID0gMTJcclxuICAgKiDjgaDjgaPjgZ/loLTlkIjjga9cclxuICAgKiArLS0tLSstLS0tKy0tLS0rLS0tLStcclxuICAgKiB8ICAwICB8ICAxICB8ICAyICB8ICAzICB8XHJcbiAgICogKy0tLS0rLS0tLSstLS0tKy0tLS0rXHJcbiAgICogfCAgNCAgfCAgNSAgfCAgNiAgfCAgNyAgfFxyXG4gICAqICstLS0tKy0tLS0rLS0tLSstLS0tK1xyXG4gICAqIHwgIDggIHwgIDkgIHwgMTAgfCAxMSB8XHJcbiAgICogKy0tLS0rLS0tLSstLS0tKy0tLS0rXHJcbiAgICog44Go44GE44Gj44Gf5ZCE44Oe44K544Gu5bem5LiK5bqn5qiZ44G444K544Kv44Ot44O844Or44GZ44KL44GT44Go44Gr44Gq44KLXHJcbiAgICog5ZCE44Oe44K544GuIHdpZHRoLCBoZWlnaHQgPSB3aW5kb3dXaWR0aCwgd2luZG93SGVpZ2h0XHJcbiAgICog5aSn5p6g44GuIHdpZHRoLCBoZWlnaHQgPSBkb2N1bWVudFdpZHRoLCBkb2N1bWVudEhlaWdodFxyXG4gICAqL1xyXG4gIHB1YmxpYyBkaXNwbGF5U2l6aW5nKGluZGV4OiBudW1iZXJ8bnVsbCA9IG51bGwpOiBDb29yZGluYXRlcyB7XHJcbiAgICAvL2luZGV4IOaMh+WumuOBjOeEoeOBi+OBo+OBn+OCiSBzdHlsZSDjgr/jgrDjgpLpgannlKjjga7lvozjgIHnj77lnKjjga7jgrnjgq/jg63jg7zjg6vkvY3nva7jgpLov5TjgZlcclxuICAgIGlmIChpbmRleCA9PT0gbnVsbCkge1xyXG4gICAgICAvL3N0eWxlIOOCv+OCsOOCkueUn+aIkFxyXG4gICAgICB0aGlzLl9hcHBlbmRTdHlsZSgnaHRtbHtvdmVyZmxvdzpoaWRkZW59Jyk7XHJcblxyXG4gICAgICAvL+ePvuWcqOOBruOCueOCr+ODreODvOODq+S9jee9ruOCkui/lOOBmVxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHg6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0uc2Nyb2xsVG9wLFxyXG4gICAgICAgIHk6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0uc2Nyb2xsTGVmdFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8v44KC44GXIGluZGV4IOOBjCAwIOOBoOOBo+OBn+OCieOCueOCr+ODreODvOODq+S9jee9ruOCkiAwLCAwIOOBq+OBmeOCi1xyXG4gICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdodG1sJylbMF0uc2Nyb2xsVG8oMCwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/np7vli5XlhYjluqfmqJnjga7lrprnvqlcclxuICAgIGNvbnN0IGNvb3JkaW5hdGVzID0gdGhpcy5fZ2V0U2Nyb2xsQ29vcmRpbmF0ZXMoaW5kZXgpO1xyXG5cclxuICAgIC8vb3ZlcmZsb3cg44K544K/44Kk44Or44Gu6YGp55SoICYgdHJhbnNmb3JtOiB0cmFuc2xhdGUg44Gr44KI44KL55aR5Ly855qE44Gq44K544Kv44Ot44O844Or44Gu5a6f6KGMXHJcbiAgICB0aGlzLl9hcHBlbmRTdHlsZSgnYm9keXtvdmVyZmxvdzpoaWRkZW47dHJhbnNmb3JtOnRyYW5zbGF0ZSgnKyhjb29yZGluYXRlcy54ICogLTEpKydweCwnKyhjb29yZGluYXRlcy55ICogLTEpKydweCl9Jyk7XHJcblxyXG4gICAgLy/jgrnjgq/jg63jg7zjg6vmg4XloLHjgpLov5TjgZlcclxuICAgIHJldHVybiBjb29yZGluYXRlcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCteOCpOOCuOODs+OCsOOBruODquOCu+ODg+ODiFxyXG4gICAqIOOCueOCr+ODreODvOODq+S9jee9ruOCguODquOCu+ODg+ODiOOBmeOCi1xyXG4gICAqL1xyXG4gIHB1YmxpYyByZXNldFNpemluZyhjb29yZGluYXRlczogQ29vcmRpbmF0ZXMpOiBDb29yZGluYXRlcyB7XHJcbiAgICAvL3N0eWxlIOOBruODquOCu+ODg+ODiFxyXG4gICAgdGhpcy5fcmVtb3ZlU3R5bGUoKTtcclxuXHJcbiAgICAvL+ePvuWcqOOBruOCueOCr+ODreODvOODq+S9jee9ruOCkuWPluW+l1xyXG4gICAgY29uc3QgYmVmb3JlQ29vcmRpbmF0ZXM6IENvb3JkaW5hdGVzID0ge1xyXG4gICAgICB4OiBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaHRtbCcpWzBdLnNjcm9sbFRvcCxcclxuICAgICAgeTogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXS5zY3JvbGxMZWZ0XHJcbiAgICB9O1xyXG5cclxuICAgIC8v44K544Kv44Ot44O844Or5L2N572u44KSIGNvb3JkaW5hdGVzIOOBuOODquOCu+ODg+ODiFxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2h0bWwnKVswXS5zY3JvbGxUbyhjb29yZGluYXRlcy54LCBjb29yZGluYXRlcy55KTtcclxuXHJcbiAgICAvL+S/ruato+WJjeOBruOCueOCr+ODreODvOODq+S9jee9ruOCkui/lOOBmVxyXG4gICAgcmV0dXJuIGJlZm9yZUNvb3JkaW5hdGVzO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtSYW5nZSwgQ29vcmRpbmF0ZXN9IGZyb20gXCIuL2NsYXNzL2ludGVyZmFjZVwiO1xyXG5pbXBvcnQge1NpemluZ30gZnJvbSBcIi4vY2xhc3MvU2l6aW5nXCI7XHJcbmltcG9ydCB7RmluZFN0eWxlfSBmcm9tIFwiLi9jbGFzcy9GaW5kU3R5bGVcIjtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XHJcblxyXG4gIC8v44K144Kk44K644KS5Y+W5b6X44GZ44KL44Gf44KB44Gu44Kv44Op44K5XHJcbiAgY29uc3Qgc2l6aW5nID0gbmV3IFNpemluZygpO1xyXG5cclxuICAvL3Bvc2l0aW9uOiBmaXhlZCDjgpLmjqHnlKjjgZfjgabjgYTjgovopoHntKBcclxuICBsZXQgZml4ZWRFbGVtZW50czogSFRNTEVsZW1lbnRbXSA9IFtdO1xyXG5cclxuICAvL3Bvc2l0aW9uOiBmaXhlZCDjgpLmjqHnlKjjgZfjgabjgYTjgovopoHntKDjgpLnorrkv53jgZnjgotcclxuICBjb25zdCBnZXRGaXhlZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IGZpbmRTdHlsZSA9IG5ldyBGaW5kU3R5bGUoZG9jdW1lbnQuYm9keSk7XHJcbiAgICBmaXhlZEVsZW1lbnRzID0gZmluZFN0eWxlLmZpbmQoJ3Bvc2l0aW9uJywgJ2ZpeGVkJyk7XHJcbiAgfVxyXG5cclxuICAvL3Bvc2l0aW9uOiBmaXhlZCDjgpLmjqHnlKjjgZfjgabjgYTjgovopoHntKDjgpLpnZ7ooajnpLrjgavjgZnjgosgb3Ig5YWD44Gr5oi744GZXHJcbiAgY29uc3QgY29udHJvbEZpeGVkID0gKHByb3BlcnR5OiAnaGlkZGVuJyB8ICcnKSA9PiB7XHJcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gZml4ZWRFbGVtZW50cy5sZW5ndGg7IGkgPCBtYXg7IGkgPSAoaSArIDEpIHwgMCkge1xyXG4gICAgICBmaXhlZEVsZW1lbnRzW2ldLnN0eWxlLnZpc2liaWxpdHkgPSBwcm9wZXJ0eTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvL+ihqOekuuOBleOCjOOBpuOBhOOCi+OCv+ODluOBruaDheWgseOCkui/lOOBmVxyXG4gIGNvbnN0IGluZm9ybWF0aW9uID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIHNpemluZy5nZXRJbmZvcm1hdGlvbigpO1xyXG4gIH07XHJcblxyXG4gIC8v44OW44Op44Km44K244Gu5aSn44GN44GV44KS6YGp5YiH44Gq44KC44Gu44Gr5aSJ44GI44KLXHJcbiAgY29uc3Qgc3R5bGluZyA9IChyYW5nZTogUmFuZ2UsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgIC8v5Yem55CG57WC5LqG5b6M44Gu5bqn5qiZ5oOF5aCxXHJcbiAgICBsZXQgY29vcmRpbmF0ZTogQ29vcmRpbmF0ZXMgPSB7XHJcbiAgICAgIHg6IDAsXHJcbiAgICAgIHk6IDBcclxuICAgIH07XHJcblxyXG4gICAgLy9yYW5nZSDjgavjgojjgaPjgablh6bnkIbjgpLliIbjgZHjgotcclxuICAgIHN3aXRjaCAocmFuZ2UpIHtcclxuICAgICAgY2FzZSAnZnVsbCc6XHJcbiAgICAgICAgY29vcmRpbmF0ZSA9IHNpemluZy5mdWxsU2l6aW5nKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3BlcmZlY3QnOlxyXG4gICAgICAgIGNvb3JkaW5hdGUgPSBzaXppbmcuZGlzcGxheVNpemluZyhpbmRleCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29vcmRpbmF0ZSA9IHNpemluZy5kaXNwbGF5U2l6aW5nKG51bGwpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5bqn5qiZ5oOF5aCx44KS6L+U44GZXHJcbiAgICByZXR1cm4gY29vcmRpbmF0ZTtcclxuICB9O1xyXG5cclxuICAvL+ODluODqeOCpuOCtuOBruWkp+OBjeOBleOCkuWFg+OBq+aIu+OBmVxyXG4gIGNvbnN0IHJlc2V0U2l6aW5nID0gKGNvb3JkaW5hdGVzOiBDb29yZGluYXRlcykgPT4ge1xyXG4gICAgc2l6aW5nLnJlc2V0U2l6aW5nKGNvb3JkaW5hdGVzKTtcclxuICB9O1xyXG5cclxuICAvL+ODoeODg+OCu+ODvOOCuOODkeODg+OCt+ODs+OCsFxyXG4gIGNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcclxuICAgIC8vIOWPl+OBkeWPluOBo+OBn+WApOOBp+WIhuWykFxyXG4gICAgc3dpdGNoIChyZXF1ZXN0LnR5cGUpIHtcclxuICAgICAgY2FzZSAnaW5mb3JtYXRpb24nOlxyXG4gICAgICAgIHNlbmRSZXNwb25zZShpbmZvcm1hdGlvbigpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnc2l6aW5nJzpcclxuICAgICAgICBzZW5kUmVzcG9uc2Uoc3R5bGluZyhyZXF1ZXN0LnJhbmdlLCByZXF1ZXN0LmluZGV4KSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2tpbGxGaXhlZCc6XHJcbiAgICAgICAgY29udHJvbEZpeGVkKCdoaWRkZW4nKTtcclxuICAgICAgICBzZW5kUmVzcG9uc2Uoe30pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdyZXNldFNpemluZyc6XHJcbiAgICAgICAgY29udHJvbEZpeGVkKCcnKTtcclxuICAgICAgICByZXNldFNpemluZyh7eDogcmVxdWVzdC54LCB5OiByZXF1ZXN0Lnl9KTtcclxuICAgICAgICBzZW5kUmVzcG9uc2Uoe30pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHNlbmRSZXNwb25zZSh7fSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vcG9zaXRpb246IGZpeGVkIOOCkuaOoeeUqOOBl+OBpuOBhOOCi+imgee0oOOBrueiuuS/nVxyXG4gIGdldEZpeGVkKCk7XHJcblxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==