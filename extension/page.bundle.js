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
   * 既にこのクラスが扱っている style が存在した場合はリセットする
   * @param style
   * @private
   */


  _appendStyle(style) {
    //リセット
    this._removeStyle(); //style タグを用意


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

    this.widthCaptureNumber = Math.ceil(this.documentWidth / this.windowWidth);
    this.heightCaptureNumber = Math.ceil(this.documentHeight / this.windowHeight); //上記二つの乗算値

    this.captureNumber = this.widthCaptureNumber * this.heightCaptureNumber; //二つの変数をセット

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
      window.scrollTo(Math.floor(scrollIndex % this.widthCaptureNumber) % this.captureNumber * this.windowWidth, Math.floor(scrollIndex / this.widthCaptureNumber) % this.captureNumber * this.windowHeight);
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

const sizing = new _Sizing__WEBPACK_IMPORTED_MODULE_0__["Sizing"]();
console.log('immediate shot'); //ブラウザの大きさを適切なものに変える

const styling = full => {
  if (full) {
    sizing.fullSizing();
  } else {
    sizing.standardSizing(null);
  }
}; //ブラウザの大きさを元に戻す


const back = () => {
  sizing.resetSizing();
}; //メッセージパッシング


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // 受け取った値で分岐
  switch (request.type) {
    case 'sizing':
      styling(request.full);
      sendResponse({});
      break;

    case 'back':
      //back();
      sendResponse({});
      break;

    default:
  }
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NpemluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZS5qcyJdLCJuYW1lcyI6WyJTaXppbmciLCJfaXNTdHlsZSIsInRhcmdldCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJTVFlMRV9JRCIsIl9yZW1vdmVTdHlsZSIsInJlbW92ZSIsIl9hcHBlbmRTdHlsZSIsInN0eWxlIiwidGFnIiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImlubmVyVGV4dCIsImhlYWQiLCJhcHBlbmRDaGlsZCIsImNvbnN0cnVjdG9yIiwid2luZG93V2lkdGgiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwid2luZG93SGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJkb2N1bWVudFdpZHRoIiwiYm9keSIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIndpZHRoIiwiZG9jdW1lbnRIZWlnaHQiLCJoZWlnaHQiLCJ3aWR0aFJhdGlvIiwiaGVpZ2h0UmF0aW8iLCJyYXRpbyIsInJhdGlvVHlwZSIsIk51bWJlciIsIndpZHRoQ2FwdHVyZU51bWJlciIsIk1hdGgiLCJjZWlsIiwiaGVpZ2h0Q2FwdHVyZU51bWJlciIsImNhcHR1cmVOdW1iZXIiLCJzY3JvbGxYIiwic2Nyb2xsWSIsInJhbmRvbSIsInRvU3RyaW5nIiwic2xpY2UiLCJnZXRJbmZvcm1hdGlvbiIsImZ1bGxTaXppbmciLCJzY3JvbGxUbyIsInN0YW5kYXJkU2l6aW5nIiwic2Nyb2xsSW5kZXgiLCJmbG9vciIsInJlc2V0U2l6aW5nIiwic2l6aW5nIiwiY29uc29sZSIsImxvZyIsInN0eWxpbmciLCJmdWxsIiwiYmFjayIsImNocm9tZSIsInJ1bnRpbWUiLCJvbk1lc3NhZ2UiLCJhZGRMaXN0ZW5lciIsInJlcXVlc3QiLCJzZW5kZXIiLCJzZW5kUmVzcG9uc2UiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBTyxNQUFNQSxNQUFOLENBQWE7QUFFbEI7Ozs7O0FBS0FDLFVBQVEsR0FBRztBQUNUO0FBQ0EsVUFBTUMsTUFBTSxHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsS0FBS0MsUUFBN0IsQ0FBZixDQUZTLENBSVQ7O0FBQ0EsV0FBT0gsTUFBTSxLQUFLLElBQWxCO0FBQ0Q7QUFFRDs7Ozs7O0FBSUFJLGNBQVksR0FBRztBQUNiLFFBQUssQ0FBRSxLQUFLTCxRQUFMLEVBQVAsRUFBd0I7QUFDdEI7QUFDRCxLQUhZLENBS2I7OztBQUNBRSxZQUFRLENBQUNDLGNBQVQsQ0FBd0IsS0FBS0MsUUFBN0IsRUFBdUNFLE1BQXZDO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFNQUMsY0FBWSxDQUFDQyxLQUFELEVBQVE7QUFDbEI7QUFDQSxTQUFLSCxZQUFMLEdBRmtCLENBSWxCOzs7QUFDQSxVQUFNSSxHQUFHLEdBQUdQLFFBQVEsQ0FBQ1EsYUFBVCxDQUF1QixPQUF2QixDQUFaO0FBQ0FELE9BQUcsQ0FBQ0UsWUFBSixDQUFpQixJQUFqQixFQUF1QixLQUFLUCxRQUE1QjtBQUNBSyxPQUFHLENBQUNHLFNBQUosR0FBZ0JKLEtBQWhCLENBUGtCLENBU2xCOztBQUNBTixZQUFRLENBQUNXLElBQVQsQ0FBY0MsV0FBZCxDQUEwQkwsR0FBMUI7QUFDRDtBQUVEOzs7Ozs7QUFJQU0sYUFBVyxHQUFHO0FBQ1o7QUFDQSxTQUFLQyxXQUFMLEdBQW1CQyxNQUFNLENBQUNDLFVBQTFCO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQkYsTUFBTSxDQUFDRyxXQUEzQixDQUhZLENBS1o7O0FBQ0EsU0FBS0MsYUFBTCxHQUFxQm5CLFFBQVEsQ0FBQ29CLElBQVQsQ0FBY0MscUJBQWQsR0FBc0NDLEtBQTNEO0FBQ0EsU0FBS0MsY0FBTCxHQUFzQnZCLFFBQVEsQ0FBQ29CLElBQVQsQ0FBY0MscUJBQWQsR0FBc0NHLE1BQTVELENBUFksQ0FTWjs7QUFDQSxVQUFNQyxVQUFVLEdBQUcsS0FBS1gsV0FBTCxHQUFtQixLQUFLSyxhQUEzQztBQUNBLFVBQU1PLFdBQVcsR0FBRyxLQUFLVCxZQUFMLEdBQW9CLEtBQUtNLGNBQTdDLENBWFksQ0FhWjs7QUFDQSxRQUFJSSxLQUFLLEdBQUdGLFVBQVo7QUFDQSxRQUFJRyxTQUFTLEdBQUcsT0FBaEIsQ0FmWSxDQWlCWjs7QUFDQSxRQUFJSCxVQUFVLEdBQUdDLFdBQWpCLEVBQThCO0FBQzVCQyxXQUFLLEdBQUdELFdBQVI7QUFDQUUsZUFBUyxHQUFHLFFBQVo7QUFDRCxLQXJCVyxDQXVCWjs7O0FBQ0EsU0FBS0QsS0FBTCxHQUFhQSxLQUFLLEdBQUcsQ0FBUixHQUFZLENBQVosR0FBZ0JFLE1BQU0sQ0FBQ0YsS0FBRCxDQUFuQyxDQXhCWSxDQTBCWjs7QUFDQSxTQUFLRyxrQkFBTCxHQUEwQkMsSUFBSSxDQUFDQyxJQUFMLENBQVUsS0FBS2IsYUFBTCxHQUFxQixLQUFLTCxXQUFwQyxDQUExQjtBQUNBLFNBQUttQixtQkFBTCxHQUEyQkYsSUFBSSxDQUFDQyxJQUFMLENBQVUsS0FBS1QsY0FBTCxHQUFzQixLQUFLTixZQUFyQyxDQUEzQixDQTVCWSxDQThCWjs7QUFDQSxTQUFLaUIsYUFBTCxHQUFxQixLQUFLSixrQkFBTCxHQUEwQixLQUFLRyxtQkFBcEQsQ0EvQlksQ0FpQ1o7O0FBQ0EsU0FBS04sS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQkEsU0FBakIsQ0FuQ1ksQ0FxQ1o7O0FBQ0EsU0FBS08sT0FBTCxHQUFlcEIsTUFBTSxDQUFDb0IsT0FBdEI7QUFDQSxTQUFLQyxPQUFMLEdBQWVyQixNQUFNLENBQUNxQixPQUF0QixDQXZDWSxDQXlDWjs7QUFDQSxTQUFLbEMsUUFBTCxHQUFnQixZQUFVNkIsSUFBSSxDQUFDTSxNQUFMLEdBQWNDLFFBQWQsQ0FBdUIsRUFBdkIsRUFBMkJDLEtBQTNCLENBQWlDLENBQUMsQ0FBbEMsQ0FBMUI7QUFDRDtBQUVEOzs7Ozs7QUFJQUMsZ0JBQWMsR0FBRztBQUNmLFdBQU87QUFDTDFCLGlCQUFXLEVBQUUsS0FBS0EsV0FEYjtBQUVMRyxrQkFBWSxFQUFFLEtBQUtBLFlBRmQ7QUFHTEUsbUJBQWEsRUFBRSxLQUFLQSxhQUhmO0FBSUxJLG9CQUFjLEVBQUUsS0FBS0EsY0FKaEI7QUFLTE8sd0JBQWtCLEVBQUUsS0FBS0Esa0JBTHBCO0FBTUxHLHlCQUFtQixFQUFFLEtBQUtBLG1CQU5yQjtBQU9MQyxtQkFBYSxFQUFFLEtBQUtBLGFBUGY7QUFRTFAsV0FBSyxFQUFFLEtBQUtBLEtBUlA7QUFTTEMsZUFBUyxFQUFFLEtBQUtBO0FBVFgsS0FBUDtBQVdEO0FBRUQ7Ozs7O0FBR0FhLFlBQVUsR0FBRztBQUNYO0FBQ0EsU0FBS3BDLFlBQUwsQ0FBa0IsZ0ZBQThFLEtBQUtzQixLQUFuRixHQUF5RixJQUEzRyxFQUZXLENBSVg7OztBQUNBWixVQUFNLENBQUMyQixRQUFQLENBQWdCLENBQWhCLEVBQW1CLENBQW5CO0FBQ0Q7QUFFRDs7Ozs7QUFHQUMsZ0JBQWMsQ0FBQ0MsV0FBVyxHQUFHLElBQWYsRUFBcUI7QUFDakM7QUFDQSxTQUFLdkMsWUFBTCxDQUFrQiw0QkFBbEIsRUFGaUMsQ0FJakM7OztBQUNBLFFBQUl1QyxXQUFXLEtBQUssSUFBcEIsRUFBMEI7QUFDeEI3QixZQUFNLENBQUMyQixRQUFQLENBQWdCWCxJQUFJLENBQUNjLEtBQUwsQ0FBV0QsV0FBVyxHQUFHLEtBQUtkLGtCQUE5QixJQUFvRCxLQUFLSSxhQUF6RCxHQUF5RSxLQUFLcEIsV0FBOUYsRUFBMkdpQixJQUFJLENBQUNjLEtBQUwsQ0FBV0QsV0FBVyxHQUFHLEtBQUtkLGtCQUE5QixJQUFvRCxLQUFLSSxhQUF6RCxHQUF5RSxLQUFLakIsWUFBekw7QUFDRDtBQUNGO0FBRUQ7Ozs7OztBQUlBNkIsYUFBVyxHQUFHO0FBQ1o7QUFDQSxTQUFLM0MsWUFBTCxHQUZZLENBSVo7OztBQUNBWSxVQUFNLENBQUMyQixRQUFQLENBQWdCLEtBQUtQLE9BQXJCLEVBQThCLEtBQUtDLE9BQW5DO0FBQ0Q7O0FBcEppQixDOzs7Ozs7Ozs7Ozs7QUNBcEI7QUFBQTtBQUFBO0FBRUEsTUFBTVcsTUFBTSxHQUFHLElBQUlsRCw4Q0FBSixFQUFmO0FBRUFtRCxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBWixFLENBRUE7O0FBQ0EsTUFBTUMsT0FBTyxHQUFJQyxJQUFELElBQVU7QUFDeEIsTUFBSUEsSUFBSixFQUFVO0FBQ1JKLFVBQU0sQ0FBQ04sVUFBUDtBQUNELEdBRkQsTUFHSztBQUNITSxVQUFNLENBQUNKLGNBQVAsQ0FBc0IsSUFBdEI7QUFDRDtBQUNGLENBUEQsQyxDQVNBOzs7QUFDQSxNQUFNUyxJQUFJLEdBQUcsTUFBTTtBQUNqQkwsUUFBTSxDQUFDRCxXQUFQO0FBQ0QsQ0FGRCxDLENBSUE7OztBQUNBTyxNQUFNLENBQUNDLE9BQVAsQ0FBZUMsU0FBZixDQUF5QkMsV0FBekIsQ0FBcUMsQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQWtCQyxZQUFsQixLQUFtQztBQUN0RTtBQUNBLFVBQVFGLE9BQU8sQ0FBQ0csSUFBaEI7QUFDRSxTQUFLLFFBQUw7QUFDRVYsYUFBTyxDQUFDTyxPQUFPLENBQUNOLElBQVQsQ0FBUDtBQUNBUSxrQkFBWSxDQUFDLEVBQUQsQ0FBWjtBQUNBOztBQUNGLFNBQUssTUFBTDtBQUNFO0FBQ0FBLGtCQUFZLENBQUMsRUFBRCxDQUFaO0FBQ0E7O0FBQ0Y7QUFURjtBQVdELENBYkQsRSIsImZpbGUiOiJwYWdlLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3BhZ2UuanNcIik7XG4iLCJleHBvcnQgY2xhc3MgU2l6aW5nIHtcclxuXHJcbiAgLyoqXHJcbiAgICog44GT44Gu44Kv44Op44K544GM5LuV6L6844KT44Gg44K544K/44Kk44Or44GM5a2Y5Zyo44GZ44KL44GL5Yik5a6aXHJcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIF9pc1N0eWxlKCkge1xyXG4gICAgLy/lr77osaHjga7pgbjlrppcclxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuU1RZTEVfSUQpO1xyXG5cclxuICAgIC8v5a++6LGh44GM5a2Y5Zyo44GZ44KL44GL5Yik5a6aXHJcbiAgICByZXR1cm4gdGFyZ2V0ICE9PSBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44GT44Gu44Kv44Op44K544GM5LuV6L6844KT44GgIHN0eWxlIOOCv+OCsOOCkuWJiumZpOOBmeOCi1xyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX3JlbW92ZVN0eWxlKCkge1xyXG4gICAgaWYgKCAhIHRoaXMuX2lzU3R5bGUoKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy/lr77osaHjgpLliYrpmaTjgZnjgotcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuU1RZTEVfSUQpLnJlbW92ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogc3R5bGUg44K/44Kw44KS5oy/5YWl44GZ44KLXHJcbiAgICog5pei44Gr44GT44Gu44Kv44Op44K544GM5omx44Gj44Gm44GE44KLIHN0eWxlIOOBjOWtmOWcqOOBl+OBn+WgtOWQiOOBr+ODquOCu+ODg+ODiOOBmeOCi1xyXG4gICAqIEBwYXJhbSBzdHlsZVxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2FwcGVuZFN0eWxlKHN0eWxlKSB7XHJcbiAgICAvL+ODquOCu+ODg+ODiFxyXG4gICAgdGhpcy5fcmVtb3ZlU3R5bGUoKTtcclxuXHJcbiAgICAvL3N0eWxlIOOCv+OCsOOCkueUqOaEj1xyXG4gICAgY29uc3QgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICAgIHRhZy5zZXRBdHRyaWJ1dGUoJ2lkJywgdGhpcy5TVFlMRV9JRCk7XHJcbiAgICB0YWcuaW5uZXJUZXh0ID0gc3R5bGU7XHJcblxyXG4gICAgLy90YWcg44K/44Kw5oy/5YWlXHJcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHRhZyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlkITjgrXjgqTjgrrmg4XloLHjgpLlj5blvpfjg7voqIjnrpfjg7vkv53mjIHjgZnjgotcclxuICAgKiDliqDjgYjjgablv4XnlKjjgarlrprmlbDjgoLkv53nrqHjgZnjgotcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8v44Km44Kj44Oz44OJ44Km44K144Kk44K6XHJcbiAgICB0aGlzLndpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICB0aGlzLndpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICAvL+ODieOCreODpeODoeODs+ODiOOCteOCpOOCulxyXG4gICAgdGhpcy5kb2N1bWVudFdpZHRoID0gZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcclxuICAgIHRoaXMuZG9jdW1lbnRIZWlnaHQgPSBkb2N1bWVudC5ib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcclxuXHJcbiAgICAvL+W5heOBqOmrmOOBleOBneOCjOOBnuOCjOOBruWJsuWQiFxyXG4gICAgY29uc3Qgd2lkdGhSYXRpbyA9IHRoaXMud2luZG93V2lkdGggLyB0aGlzLmRvY3VtZW50V2lkdGg7XHJcbiAgICBjb25zdCBoZWlnaHRSYXRpbyA9IHRoaXMud2luZG93SGVpZ2h0IC8gdGhpcy5kb2N1bWVudEhlaWdodDtcclxuXHJcbiAgICAvL+S4gOaXpuW5heOBruaWueOCkuOCiOOCiuWwj+OBleOBhOWJsuWQiOOBqOOBmeOCi1xyXG4gICAgbGV0IHJhdGlvID0gd2lkdGhSYXRpbztcclxuICAgIGxldCByYXRpb1R5cGUgPSAnd2lkdGgnO1xyXG5cclxuICAgIC8v6auY44GV44Gu5pa544GM5bCP44GV44GE5Ymy5ZCI44Gg44Gj44Gf44KJ5LiK6KiY5LqM44Gk44Gu5aSJ5pWw44KS5pu444GN5o+b44GI44KLXHJcbiAgICBpZiAod2lkdGhSYXRpbyA+IGhlaWdodFJhdGlvKSB7XHJcbiAgICAgIHJhdGlvID0gaGVpZ2h0UmF0aW87XHJcbiAgICAgIHJhdGlvVHlwZSA9ICdoZWlnaHQnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vcmF0aW8g44GMIDEg5Lul5LiK44Gg44Gj44Gf44KJIDEg44Go44GZ44KLXHJcbiAgICB0aGlzLnJhdGlvID0gcmF0aW8gPiAxID8gMSA6IE51bWJlcihyYXRpbyk7XHJcblxyXG4gICAgLy/nuKbjgajmqKrjgavjgYrjgYTjgabjgZ3jgozjgZ7jgoznj77lnKjjga7jgqbjgqPjg7Pjg4njgqbjgrXjgqTjgrrkvZXmnprliIbjgaflhajnlLvpnaLjgpLmjZXmjYnjgafjgY3jgovjgYvjga7mlbDlgKTjgpLnrpflh7pcclxuICAgIHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyID0gTWF0aC5jZWlsKHRoaXMuZG9jdW1lbnRXaWR0aCAvIHRoaXMud2luZG93V2lkdGgpO1xyXG4gICAgdGhpcy5oZWlnaHRDYXB0dXJlTnVtYmVyID0gTWF0aC5jZWlsKHRoaXMuZG9jdW1lbnRIZWlnaHQgLyB0aGlzLndpbmRvd0hlaWdodCk7XHJcblxyXG4gICAgLy/kuIroqJjkuozjgaTjga7kuZfnrpflgKRcclxuICAgIHRoaXMuY2FwdHVyZU51bWJlciA9IHRoaXMud2lkdGhDYXB0dXJlTnVtYmVyICogdGhpcy5oZWlnaHRDYXB0dXJlTnVtYmVyO1xyXG5cclxuICAgIC8v5LqM44Gk44Gu5aSJ5pWw44KS44K744OD44OIXHJcbiAgICB0aGlzLnJhdGlvID0gcmF0aW87XHJcbiAgICB0aGlzLnJhdGlvVHlwZSA9IHJhdGlvVHlwZTtcclxuXHJcbiAgICAvL+ePvuWcqOOBruOCueOCr+ODreODvOODq+W6p+aomeOCkuiomOmMslxyXG4gICAgdGhpcy5zY3JvbGxYID0gd2luZG93LnNjcm9sbFg7XHJcbiAgICB0aGlzLnNjcm9sbFkgPSB3aW5kb3cuc2Nyb2xsWTtcclxuXHJcbiAgICAvL3N0eWxlIOOCv+OCsOOBq+S9v+eUqOOBmeOCiyBpZFxyXG4gICAgdGhpcy5TVFlMRV9JRCA9ICdzaXppbmdfJytNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgtOCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDmg4XloLHjgpLov5TjgZlcclxuICAgKiBAcmV0dXJuIHt7ZG9jdW1lbnRXaWR0aDogbnVtYmVyIHwgKiwgZG9jdW1lbnRIZWlnaHQ6IG51bWJlciB8ICosIHdpbmRvd0hlaWdodDogbnVtYmVyIHwgKiwgcmF0aW9UeXBlOiBzdHJpbmcsIHdpbmRvd1dpZHRoOiBudW1iZXIgfCAqLCByYXRpbzogKCp8bnVtYmVyKX19XHJcbiAgICovXHJcbiAgZ2V0SW5mb3JtYXRpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB3aW5kb3dXaWR0aDogdGhpcy53aW5kb3dXaWR0aCxcclxuICAgICAgd2luZG93SGVpZ2h0OiB0aGlzLndpbmRvd0hlaWdodCxcclxuICAgICAgZG9jdW1lbnRXaWR0aDogdGhpcy5kb2N1bWVudFdpZHRoLFxyXG4gICAgICBkb2N1bWVudEhlaWdodDogdGhpcy5kb2N1bWVudEhlaWdodCxcclxuICAgICAgd2lkdGhDYXB0dXJlTnVtYmVyOiB0aGlzLndpZHRoQ2FwdHVyZU51bWJlcixcclxuICAgICAgaGVpZ2h0Q2FwdHVyZU51bWJlcjogdGhpcy5oZWlnaHRDYXB0dXJlTnVtYmVyLFxyXG4gICAgICBjYXB0dXJlTnVtYmVyOiB0aGlzLmNhcHR1cmVOdW1iZXIsXHJcbiAgICAgIHJhdGlvOiB0aGlzLnJhdGlvLFxyXG4gICAgICByYXRpb1R5cGU6IHRoaXMucmF0aW9UeXBlXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjg5Xjg6vjgrXjgqTjgrrnlKjjga7jgrXjgqTjgrjjg7PjgrDlh6bnkIbjgpLooYzjgYZcclxuICAgKi9cclxuICBmdWxsU2l6aW5nKCkge1xyXG4gICAgLy9zdHlsZSDjgr/jgrDjgpLnlJ/miJBcclxuICAgIHRoaXMuX2FwcGVuZFN0eWxlKCdib2R5LGh0bWx7b3ZlcmZsb3c6aGlkZGVufWh0bWx7dHJhbnNmb3JtLW9yaWdpbjogbGVmdCB0b3A7dHJhbnNmb3JtOiBzY2FsZSgnK3RoaXMucmF0aW8rJyl9Jyk7XHJcblxyXG4gICAgLy/jgrnjgq/jg63jg7zjg6vkvY3nva7jgpIgMCDjgavjgZnjgotcclxuICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCueOCr+ODreODvOODq+ODkOODvOOCkua2iOOBmeOBoOOBkeOBruOCteOCpOOCuOODs+OCsOWHpueQhuOCkuihjOOBhlxyXG4gICAqL1xyXG4gIHN0YW5kYXJkU2l6aW5nKHNjcm9sbEluZGV4ID0gbnVsbCkge1xyXG4gICAgLy9zdHlsZSDjgr/jgrDjgpLnlJ/miJBcclxuICAgIHRoaXMuX2FwcGVuZFN0eWxlKCdib2R5LGh0bWx7b3ZlcmZsb3c6aGlkZGVufScpO1xyXG5cclxuICAgIC8v44K544Kv44Ot44O844Or5oyH5a6a44GM44GC44KM44Gw44Gd44Gu5L2N572u44G+44Gn44K544Kv44Ot44O844OrXHJcbiAgICBpZiAoc2Nyb2xsSW5kZXggIT09IG51bGwpIHtcclxuICAgICAgd2luZG93LnNjcm9sbFRvKE1hdGguZmxvb3Ioc2Nyb2xsSW5kZXggJSB0aGlzLndpZHRoQ2FwdHVyZU51bWJlcikgJSB0aGlzLmNhcHR1cmVOdW1iZXIgKiB0aGlzLndpbmRvd1dpZHRoLCBNYXRoLmZsb29yKHNjcm9sbEluZGV4IC8gdGhpcy53aWR0aENhcHR1cmVOdW1iZXIpICUgdGhpcy5jYXB0dXJlTnVtYmVyICogdGhpcy53aW5kb3dIZWlnaHQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44K144Kk44K444Oz44Kw44Gu44Oq44K744OD44OIXHJcbiAgICog44K544Kv44Ot44O844Or5L2N572u44KC44Oq44K744OD44OI44GZ44KLXHJcbiAgICovXHJcbiAgcmVzZXRTaXppbmcoKSB7XHJcbiAgICAvL3N0eWxlIOOBruODquOCu+ODg+ODiFxyXG4gICAgdGhpcy5fcmVtb3ZlU3R5bGUoKTtcclxuXHJcbiAgICAvL+OCueOCr+ODreODvOODq+S9jee9ruOBruODquOCu+ODg+ODiFxyXG4gICAgd2luZG93LnNjcm9sbFRvKHRoaXMuc2Nyb2xsWCwgdGhpcy5zY3JvbGxZKTtcclxuICB9XHJcblxyXG59XHJcbiIsImltcG9ydCB7U2l6aW5nfSBmcm9tIFwiLi9TaXppbmdcIjtcclxuXHJcbmNvbnN0IHNpemluZyA9IG5ldyBTaXppbmcoKTtcclxuXHJcbmNvbnNvbGUubG9nKCdpbW1lZGlhdGUgc2hvdCcpO1xyXG5cclxuLy/jg5bjg6njgqbjgrbjga7lpKfjgY3jgZXjgpLpganliIfjgarjgoLjga7jgavlpInjgYjjgotcclxuY29uc3Qgc3R5bGluZyA9IChmdWxsKSA9PiB7XHJcbiAgaWYgKGZ1bGwpIHtcclxuICAgIHNpemluZy5mdWxsU2l6aW5nKCk7XHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgc2l6aW5nLnN0YW5kYXJkU2l6aW5nKG51bGwpO1xyXG4gIH1cclxufTtcclxuXHJcbi8v44OW44Op44Km44K244Gu5aSn44GN44GV44KS5YWD44Gr5oi744GZXHJcbmNvbnN0IGJhY2sgPSAoKSA9PiB7XHJcbiAgc2l6aW5nLnJlc2V0U2l6aW5nKCk7XHJcbn07XHJcblxyXG4vL+ODoeODg+OCu+ODvOOCuOODkeODg+OCt+ODs+OCsFxyXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSA9PiB7XHJcbiAgLy8g5Y+X44GR5Y+W44Gj44Gf5YCk44Gn5YiG5bKQXHJcbiAgc3dpdGNoIChyZXF1ZXN0LnR5cGUpIHtcclxuICAgIGNhc2UgJ3NpemluZyc6XHJcbiAgICAgIHN0eWxpbmcocmVxdWVzdC5mdWxsKTtcclxuICAgICAgc2VuZFJlc3BvbnNlKHt9KTtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlICdiYWNrJzpcclxuICAgICAgLy9iYWNrKCk7XHJcbiAgICAgIHNlbmRSZXNwb25zZSh7fSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICB9XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9