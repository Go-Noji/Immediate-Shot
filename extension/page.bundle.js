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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/page.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Sizing.js":
/*!***********************!*\
  !*** ./src/Sizing.js ***!
  \***********************/
/*! exports provided: Sizing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sizing", function() { return Sizing; });
class Sizing {
  /**
   * このクラスが仕込んだスタイルが存在するか判定
   * @return {boolean}
   * @private
   */
  _isStyle() {
    //対象の選定
    const target = document.getElementById(this.STYLE_ID); //対象が存在するか判定

    return target !== null;
  }
  /**
   * このクラスが仕込んだ style タグを削除する
   * @private
   */


  _removeStyle() {
    if (!this._isStyle()) {
      return;
    } //対象を削除する


    document.getElementById(this.STYLE_ID).remove();
  }
  /**
   * style タグを挿入する
   * 既にこのクラスが扱っている style が存在した場合はなにもしない
   * @param style
   * @private
   */


  _appendStyle(style) {
    //既に style タグがあれば何もしない
    if (this._isStyle()) {
      return;
    } //style タグを用意


    const tag = document.createElement('style');
    tag.setAttribute('id', this.STYLE_ID);
    tag.innerText = style; //tag タグ挿入

    document.head.appendChild(tag);
  }
  /**
   * 各サイズ情報を取得・計算・保持する
   * 加えて必用な定数も保管する
   */


  constructor() {
    //ウィンドウサイズ
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight; //ドキュメントサイズ

    this.documentWidth = document.body.getBoundingClientRect().width;
    this.documentHeight = document.body.getBoundingClientRect().height; //幅と高さそれぞれの割合

    const widthRatio = this.windowWidth / this.documentWidth;
    const heightRatio = this.windowHeight / this.documentHeight; //一旦幅の方をより小さい割合とする

    let ratio = widthRatio;
    let ratioType = 'width'; //高さの方が小さい割合だったら上記二つの変数を書き換える

    if (widthRatio > heightRatio) {
      ratio = heightRatio;
      ratioType = 'height';
    } //ratio が 1 以上だったら 1 とする


    this.ratio = ratio > 1 ? 1 : Number(ratio); //縦と横においてそれぞれ現在のウィンドウサイズ何枚分で全画面を捕捉できるかの数値を算出

    this.columnNumber = Math.ceil(this.documentWidth / this.windowWidth);
    this.rowNumber = Math.ceil(this.documentHeight / this.windowHeight); //上記二つの乗算値

    this.captureNumber = this.columnNumber * this.rowNumber; //二つの変数をセット

    this.ratio = ratio;
    this.ratioType = ratioType; //現在のスクロール座標を記録

    this.scrollX = window.scrollX;
    this.scrollY = window.scrollY; //style タグに使用する id

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
      columnNumber: this.columnNumber,
      rowNumber: this.rowNumber,
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
    this._appendStyle('body,html{overflow:hidden}html{transform-origin: left top;transform: scale(' + this.ratio + ')}'); //スクロール位置を 0 にする


    window.scrollTo(0, 0);
  }
  /**
   * スクロールバーを消すだけのサイジング処理を行う
   */


  standardSizing(scrollIndex = null) {
    //style タグを生成
    this._appendStyle('body,html{overflow:hidden}'); //スクロール指定があればその位置までスクロール


    if (scrollIndex !== null) {
      window.scrollTo(Math.floor(scrollIndex % this.columnNumber) % this.captureNumber * this.windowWidth, Math.floor(scrollIndex / this.columnNumber) % this.captureNumber * this.windowHeight);
    }
  }
  /**
   * サイジングのリセット
   * スクロール位置もリセットする
   */


  resetSizing() {
    //style のリセット
    this._removeStyle(); //スクロール位置のリセット


    window.scrollTo(this.scrollX, this.scrollY);
  }

}

/***/ }),

/***/ "./src/page.js":
/*!*********************!*\
  !*** ./src/page.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Sizing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sizing */ "./src/Sizing.js");
 //サイズを取得するためのクラス

const sizing = new _Sizing__WEBPACK_IMPORTED_MODULE_0__["Sizing"](); //表示されているタブの情報を返す

const information = () => {
  return sizing.getInformation();
}; //ブラウザの大きさを適切なものに変える


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
  } //情報を返す


  return sizing.getInformation();
}; //ブラウザの大きさを元に戻す


const back = () => {
  sizing.resetSizing();
}; //メッセージパッシング


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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NpemluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZS5qcyJdLCJuYW1lcyI6WyJTaXppbmciLCJfaXNTdHlsZSIsInRhcmdldCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJTVFlMRV9JRCIsIl9yZW1vdmVTdHlsZSIsInJlbW92ZSIsIl9hcHBlbmRTdHlsZSIsInN0eWxlIiwidGFnIiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImlubmVyVGV4dCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsImNvbnN0cnVjdG9yIiwid2luZG93V2lkdGgiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwid2luZG93SGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJkb2N1bWVudFdpZHRoIiwiYm9keSIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIndpZHRoIiwiZG9jdW1lbnRIZWlnaHQiLCJoZWlnaHQiLCJ3aWR0aFJhdGlvIiwiaGVpZ2h0UmF0aW8iLCJyYXRpbyIsInJhdGlvVHlwZSIsIk51bWJlciIsImNvbHVtbk51bWJlciIsIk1hdGgiLCJjZWlsIiwicm93TnVtYmVyIiwiY2FwdHVyZU51bWJlciIsInNjcm9sbFgiLCJzY3JvbGxZIiwicmFuZG9tIiwidG9TdHJpbmciLCJzbGljZSIsImdldEluZm9ybWF0aW9uIiwiZnVsbFNpemluZyIsInNjcm9sbFRvIiwic3RhbmRhcmRTaXppbmciLCJzY3JvbGxJbmRleCIsImZsb29yIiwicmVzZXRTaXppbmciLCJzaXppbmciLCJpbmZvcm1hdGlvbiIsInN0eWxpbmciLCJyYW5nZSIsImluZGV4IiwiYmFjayIsImNocm9tZSIsInJ1bnRpbWUiLCJvbk1lc3NhZ2UiLCJhZGRMaXN0ZW5lciIsInJlcXVlc3QiLCJzZW5kZXIiLCJzZW5kUmVzcG9uc2UiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztB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QUFNWSxJQUFJLEdBQUcsTUFBTTtBQUNqQkwsUUFBTSxDQUFDRCxXQUFQO0FBQ0QsQ0FGRCxDLENBSUE7OztBQUNBTyxNQUFNLENBQUNDLE9BQVAsQ0FBZUMsU0FBZixDQUF5QkMsV0FBekIsQ0FBcUMsQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQWtCQyxZQUFsQixLQUFtQztBQUN0RTtBQUNBLFVBQVFGLE9BQU8sQ0FBQ0csSUFBaEI7QUFDRSxTQUFLLGFBQUw7QUFDRUQsa0JBQVksQ0FBQ1gsV0FBVyxFQUFaLENBQVo7QUFDQTs7QUFDRixTQUFLLFFBQUw7QUFDRUMsYUFBTyxDQUFDUSxPQUFPLENBQUNQLEtBQVQsRUFBZ0JPLE9BQU8sQ0FBQ04sS0FBeEIsQ0FBUDtBQUNBUSxrQkFBWSxDQUFDLEVBQUQsQ0FBWjtBQUNBOztBQUNGLFNBQUssTUFBTDtBQUNFUCxVQUFJO0FBQ0pPLGtCQUFZLENBQUMsRUFBRCxDQUFaO0FBQ0E7O0FBQ0Y7QUFDRUEsa0JBQVksQ0FBQyxFQUFELENBQVo7QUFDQTtBQWRKO0FBZ0JELENBbEJELEUiLCJmaWxlIjoicGFnZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9wYWdlLmpzXCIpO1xuIiwiZXhwb3J0IGNsYXNzIFNpemluZyB7XHJcblxyXG4gIC8qKlxyXG4gICAqIOOBk+OBruOCr+ODqeOCueOBjOS7lei+vOOCk+OBoOOCueOCv+OCpOODq+OBjOWtmOWcqOOBmeOCi+OBi+WIpOWumlxyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBfaXNTdHlsZSgpIHtcclxuICAgIC8v5a++6LGh44Gu6YG45a6aXHJcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLlNUWUxFX0lEKTtcclxuXHJcbiAgICAvL+WvvuixoeOBjOWtmOWcqOOBmeOCi+OBi+WIpOWumlxyXG4gICAgcmV0dXJuIHRhcmdldCAhPT0gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOBk+OBruOCr+ODqeOCueOBjOS7lei+vOOCk+OBoCBzdHlsZSDjgr/jgrDjgpLliYrpmaTjgZnjgotcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9yZW1vdmVTdHlsZSgpIHtcclxuICAgIGlmICggISB0aGlzLl9pc1N0eWxlKCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5a++6LGh44KS5YmK6Zmk44GZ44KLXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLlNUWUxFX0lEKS5yZW1vdmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHN0eWxlIOOCv+OCsOOCkuaMv+WFpeOBmeOCi1xyXG4gICAqIOaXouOBq+OBk+OBruOCr+ODqeOCueOBjOaJseOBo+OBpuOBhOOCiyBzdHlsZSDjgYzlrZjlnKjjgZfjgZ/loLTlkIjjga/jgarjgavjgoLjgZfjgarjgYRcclxuICAgKiBAcGFyYW0gc3R5bGVcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9hcHBlbmRTdHlsZShzdHlsZSkge1xyXG4gICAgLy/ml6Ljgasgc3R5bGUg44K/44Kw44GM44GC44KM44Gw5L2V44KC44GX44Gq44GEXHJcbiAgICBpZiAodGhpcy5faXNTdHlsZSgpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvL3N0eWxlIOOCv+OCsOOCkueUqOaEj1xyXG4gICAgY29uc3QgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICAgIHRhZy5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5TVFlMRV9JRCk7XHJcbiAgICB0YWcuaW5uZXJUZXh0ID0gc3R5bGU7XHJcblxyXG4gICAgLy90YWcg44K/44Kw5oy/5YWlXHJcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHRhZyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlkITjgrXjgqTjgrrmg4XloLHjgpLlj5blvpfjg7voqIjnrpfjg7vkv53mjIHjgZnjgotcclxuICAgKiDliqDjgYjjgablv4XnlKjjgarlrprmlbDjgoLkv53nrqHjgZnjgotcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8v44Km44Kj44Oz44OJ44Km44K144Kk44K6XHJcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICB0aGlzLndpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICAvL+ODieOCreODpeODoeODs+ODiOOCteOCpOOCulxyXG4gICAgdGhpcy5kb2N1bWVudFdpZHRoID0gZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcclxuICAgIHRoaXMuZG9jdW1lbnRIZWlnaHQgPSBkb2N1bWVudC5ib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcclxuXHJcbiAgICAvL+W5heOBqOmrmOOBleOBneOCjOOBnuOCjOOBruWJsuWQiFxyXG4gICAgY29uc3Qgd2lkdGhSYXRpbyA9IHRoaXMud2luZG93V2lkdGggLyB0aGlzLmRvY3VtZW50V2lkdGg7XHJcbiAgICBjb25zdCBoZWlnaHRSYXRpbyA9IHRoaXMud2luZG93SGVpZ2h0IC8gdGhpcy5kb2N1bWVudEhlaWdodDtcclxuXHJcbiAgICAvL+S4gOaXpuW5heOBruaWueOCkuOCiOOCiuWwj+OBleOBhOWJsuWQiOOBqOOBmeOCi1xyXG4gICAgbGV0IHJhdGlvID0gd2lkdGhSYXRpbztcclxuICAgIGxldCByYXRpb1R5cGUgPSAnd2lkdGgnO1xyXG5cclxuICAgIC8v6auY44GV44Gu5pa544GM5bCP44GV44GE5Ymy5ZCI44Gg44Gj44Gf44KJ5LiK6KiY5LqM44Gk44Gu5aSJ5pWw44KS5pu444GN5o+b44GI44KLXHJcbiAgICBpZiAod2lkdGhSYXRpbyA+IGhlaWdodFJhdGlvKSB7XHJcbiAgICAgIHJhdGlvID0gaGVpZ2h0UmF0aW87XHJcbiAgICAgIHJhdGlvVHlwZSA9ICdoZWlnaHQnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vcmF0aW8g44GMIDEg5Lul5LiK44Gg44Gj44Gf44KJIDEg44Go44GZ44KLXHJcbiAgICB0aGlzLnJhdGlvID0gcmF0aW8gPiAxID8gMSA6IE51bWJlcihyYXRpbyk7XHJcblxyXG4gICAgLy/nuKbjgajmqKrjgavjgYrjgYTjgabjgZ3jgozjgZ7jgoznj77lnKjjga7jgqbjgqPjg7Pjg4njgqbjgrXjgqTjgrrkvZXmnprliIbjgaflhajnlLvpnaLjgpLmjZXmjYnjgafjgY3jgovjgYvjga7mlbDlgKTjgpLnrpflh7pcclxuICAgIHRoaXMuY29sdW1uTnVtYmVyID0gTWF0aC5jZWlsKHRoaXMuZG9jdW1lbnRXaWR0aCAvIHRoaXMud2luZG93V2lkdGgpO1xyXG4gICAgdGhpcy5yb3dOdW1iZXIgPSBNYXRoLmNlaWwodGhpcy5kb2N1bWVudEhlaWdodCAvIHRoaXMud2luZG93SGVpZ2h0KTtcclxuXHJcbiAgICAvL+S4iuiomOS6jOOBpOOBruS5l+eul+WApFxyXG4gICAgdGhpcy5jYXB0dXJlTnVtYmVyID0gdGhpcy5jb2x1bW5OdW1iZXIgKiB0aGlzLnJvd051bWJlcjtcclxuXHJcbiAgICAvL+S6jOOBpOOBruWkieaVsOOCkuOCu+ODg+ODiFxyXG4gICAgdGhpcy5yYXRpbyA9IHJhdGlvO1xyXG4gICAgdGhpcy5yYXRpb1R5cGUgPSByYXRpb1R5cGU7XHJcblxyXG4gICAgLy/nj77lnKjjga7jgrnjgq/jg63jg7zjg6vluqfmqJnjgpLoqJjpjLJcclxuICAgIHRoaXMuc2Nyb2xsWCA9IHdpbmRvdy5zY3JvbGxYO1xyXG4gICAgdGhpcy5zY3JvbGxZID0gd2luZG93LnNjcm9sbFk7XHJcblxyXG4gICAgLy9zdHlsZSDjgr/jgrDjgavkvb/nlKjjgZnjgosgaWRcclxuICAgIHRoaXMuU1RZTEVfSUQgPSAnc2l6aW5nXycrTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoLTgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5oOF5aCx44KS6L+U44GZXHJcbiAgICogQHJldHVybiB7e2RvY3VtZW50V2lkdGg6IG51bWJlciB8ICosIGRvY3VtZW50SGVpZ2h0OiBudW1iZXIgfCAqLCB3aW5kb3dIZWlnaHQ6IG51bWJlciB8ICosIHJhdGlvVHlwZTogc3RyaW5nLCB3aW5kb3dXaWR0aDogbnVtYmVyIHwgKiwgcmF0aW86ICgqfG51bWJlcil9fVxyXG4gICAqL1xyXG4gIGdldEluZm9ybWF0aW9uKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgd2luZG93V2lkdGg6IHRoaXMud2luZG93V2lkdGgsXHJcbiAgICAgIHdpbmRvd0hlaWdodDogdGhpcy53aW5kb3dIZWlnaHQsXHJcbiAgICAgIGRvY3VtZW50V2lkdGg6IHRoaXMuZG9jdW1lbnRXaWR0aCxcclxuICAgICAgZG9jdW1lbnRIZWlnaHQ6IHRoaXMuZG9jdW1lbnRIZWlnaHQsXHJcbiAgICAgIGNvbHVtbk51bWJlcjogdGhpcy5jb2x1bW5OdW1iZXIsXHJcbiAgICAgIHJvd051bWJlcjogdGhpcy5yb3dOdW1iZXIsXHJcbiAgICAgIGNhcHR1cmVOdW1iZXI6IHRoaXMuY2FwdHVyZU51bWJlcixcclxuICAgICAgcmF0aW86IHRoaXMucmF0aW8sXHJcbiAgICAgIHJhdGlvVHlwZTogdGhpcy5yYXRpb1R5cGVcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOODleODq+OCteOCpOOCuueUqOOBruOCteOCpOOCuOODs+OCsOWHpueQhuOCkuihjOOBhlxyXG4gICAqL1xyXG4gIGZ1bGxTaXppbmcoKSB7XHJcbiAgICAvL3N0eWxlIOOCv+OCsOOCkueUn+aIkFxyXG4gICAgdGhpcy5fYXBwZW5kU3R5bGUoJ2JvZHksaHRtbHtvdmVyZmxvdzpoaWRkZW59aHRtbHt0cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0IHRvcDt0cmFuc2Zvcm06IHNjYWxlKCcrdGhpcy5yYXRpbysnKX0nKTtcclxuXHJcbiAgICAvL+OCueOCr+ODreODvOODq+S9jee9ruOCkiAwIOOBq+OBmeOCi1xyXG4gICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K544Kv44Ot44O844Or44OQ44O844KS5raI44GZ44Gg44GR44Gu44K144Kk44K444Oz44Kw5Yem55CG44KS6KGM44GGXHJcbiAgICovXHJcbiAgc3RhbmRhcmRTaXppbmcoc2Nyb2xsSW5kZXggPSBudWxsKSB7XHJcbiAgICAvL3N0eWxlIOOCv+OCsOOCkueUn+aIkFxyXG4gICAgdGhpcy5fYXBwZW5kU3R5bGUoJ2JvZHksaHRtbHtvdmVyZmxvdzpoaWRkZW59Jyk7XHJcblxyXG4gICAgLy/jgrnjgq/jg63jg7zjg6vmjIflrprjgYzjgYLjgozjgbDjgZ3jga7kvY3nva7jgb7jgafjgrnjgq/jg63jg7zjg6tcclxuICAgIGlmIChzY3JvbGxJbmRleCAhPT0gbnVsbCkge1xyXG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oTWF0aC5mbG9vcihzY3JvbGxJbmRleCAlIHRoaXMuY29sdW1uTnVtYmVyKSAlIHRoaXMuY2FwdHVyZU51bWJlciAqIHRoaXMud2luZG93V2lkdGgsIE1hdGguZmxvb3Ioc2Nyb2xsSW5kZXggLyB0aGlzLmNvbHVtbk51bWJlcikgJSB0aGlzLmNhcHR1cmVOdW1iZXIgKiB0aGlzLndpbmRvd0hlaWdodCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgrXjgqTjgrjjg7PjgrDjga7jg6rjgrvjg4Pjg4hcclxuICAgKiDjgrnjgq/jg63jg7zjg6vkvY3nva7jgoLjg6rjgrvjg4Pjg4jjgZnjgotcclxuICAgKi9cclxuICByZXNldFNpemluZygpIHtcclxuICAgIC8vc3R5bGUg44Gu44Oq44K744OD44OIXHJcbiAgICB0aGlzLl9yZW1vdmVTdHlsZSgpO1xyXG5cclxuICAgIC8v44K544Kv44Ot44O844Or5L2N572u44Gu44Oq44K744OD44OIXHJcbiAgICB3aW5kb3cuc2Nyb2xsVG8odGhpcy5zY3JvbGxYLCB0aGlzLnNjcm9sbFkpO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtTaXppbmd9IGZyb20gXCIuL1NpemluZ1wiO1xyXG5cclxuLy/jgrXjgqTjgrrjgpLlj5blvpfjgZnjgovjgZ/jgoHjga7jgq/jg6njgrlcclxuY29uc3Qgc2l6aW5nID0gbmV3IFNpemluZygpO1xyXG5cclxuLy/ooajnpLrjgZXjgozjgabjgYTjgovjgr/jg5bjga7mg4XloLHjgpLov5TjgZlcclxuY29uc3QgaW5mb3JtYXRpb24gPSAoKSA9PiB7XHJcbiAgcmV0dXJuIHNpemluZy5nZXRJbmZvcm1hdGlvbigpO1xyXG59O1xyXG5cclxuLy/jg5bjg6njgqbjgrbjga7lpKfjgY3jgZXjgpLpganliIfjgarjgoLjga7jgavlpInjgYjjgotcclxuY29uc3Qgc3R5bGluZyA9IChyYW5nZSwgaW5kZXgpID0+IHtcclxuICBzd2l0Y2ggKHJhbmdlKSB7XHJcbiAgICBjYXNlICdmdWxsJzpcclxuICAgICAgc2l6aW5nLmZ1bGxTaXppbmcoKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdkaXNwbGF5JzpcclxuICAgICAgc2l6aW5nLnN0YW5kYXJkU2l6aW5nKG51bGwpO1xyXG4gICAgICBicmVhaztcclxuICAgIGNhc2UgJ3BlcmZlY3QnOlxyXG4gICAgICBzaXppbmcuc3RhbmRhcmRTaXppbmcoaW5kZXgpO1xyXG4gICAgICBicmVhaztcclxuICB9XHJcblxyXG4gIC8v5oOF5aCx44KS6L+U44GZXHJcbiAgcmV0dXJuIHNpemluZy5nZXRJbmZvcm1hdGlvbigpO1xyXG59O1xyXG5cclxuLy/jg5bjg6njgqbjgrbjga7lpKfjgY3jgZXjgpLlhYPjgavmiLvjgZlcclxuY29uc3QgYmFjayA9ICgpID0+IHtcclxuICBzaXppbmcucmVzZXRTaXppbmcoKTtcclxufTtcclxuXHJcbi8v44Oh44OD44K744O844K444OR44OD44K344Oz44KwXHJcbmNocm9tZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcigocmVxdWVzdCwgc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcclxuICAvLyDlj5fjgZHlj5bjgaPjgZ/lgKTjgafliIblspBcclxuICBzd2l0Y2ggKHJlcXVlc3QudHlwZSkge1xyXG4gICAgY2FzZSAnaW5mb3JtYXRpb24nOlxyXG4gICAgICBzZW5kUmVzcG9uc2UoaW5mb3JtYXRpb24oKSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAnc2l6aW5nJzpcclxuICAgICAgc3R5bGluZyhyZXF1ZXN0LnJhbmdlLCByZXF1ZXN0LmluZGV4KTtcclxuICAgICAgc2VuZFJlc3BvbnNlKHt9KTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdiYWNrJzpcclxuICAgICAgYmFjaygpO1xyXG4gICAgICBzZW5kUmVzcG9uc2Uoe30pO1xyXG4gICAgICBicmVhaztcclxuICAgIGRlZmF1bHQ6XHJcbiAgICAgIHNlbmRSZXNwb25zZSh7fSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=