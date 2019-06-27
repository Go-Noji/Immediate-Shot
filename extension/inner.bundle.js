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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/inner.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Filename.js":
/*!*************************!*\
  !*** ./src/Filename.js ***!
  \*************************/
/*! exports provided: Filename */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filename", function() { return Filename; });
/**
 * ファイルネーム作成クラス
 */
class Filename {
  /**
   * ファイル名に使用できない文字を全て replacement に置換して返す
   * @param string
   * @param replacement
   * @return {string}
   * @private
   */
  _replaceBadCharacter(string, replacement = '_') {
    return String(string).replace(/\\\/:\*\?"<>\|/g, String(replacement));
  }
  /**
   * this.templates の定義
   */


  constructor() {
    this.templates = new Array();
  }
  /**
   * テンプレート変数文字列とその値を設定する
   * @param template
   * @param value
   */


  setTemplate(template, value) {
    this.templates.push({
      template: String(template),
      value: String(value)
    });
  }
  /**
   * setTemplate(), _replaceBadCharacter() で変換したファイル名を出力
   * @param name
   * @return {string}
   */


  getFileName(name) {
    //テンプレート変数文字列を値に置き換える
    for (let i = 0, max = this.templates.length; i < max; i = i + 1 | 0) {
      name = String(name).replace(new RegExp(this.templates[i].template, 'g'), this.templates[i].value);
    } //使用不可の文字を全て置き換えて返却


    return this._replaceBadCharacter(name);
  }

}

/***/ }),

/***/ "./src/Queries.js":
/*!************************!*\
  !*** ./src/Queries.js ***!
  \************************/
/*! exports provided: Queries */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Queries", function() { return Queries; });
/**
 * URL 履歴を取りため、クエリ文字列を扱いやすいようにパースするクラス
 */
class Queries {
  /**
   * 渡されたクエリ文字列をパースしてキー:バリューの形にする
   * url そのままを渡してもクエリ部分だけを渡しても動作する
   * @param string
   * @return Object
   * @private
   */
  _parseQueries(string) {
    //このメソッドが返すオブジェクト
    let queries = {}; //? が含まれていたらそれより前を削除

    if (string.indexOf('?') !== -1) {
      string = string.slice(string.indexOf('?') + 1);
    } //& で分割


    const splits = string.split('&'); //splits が空だったらこの時点で空オブジェクトを返す

    if (splits.length === 0) {
      return queries;
    } //& で区切られた文字列ごとに queries を加えていくためのループ


    for (let i = 0, max = splits.length; i < max; i = i + 1 | 0) {
      //= で分割
      const keyAndValue = splits[i].split('='); //もし = が含まれていない or = の先(値部分)が存在しなかったら true を挿入

      queries[keyAndValue[0]] = keyAndValue[1] === undefined || keyAndValue[1] === '' ? true : keyAndValue[1];
    } //返却


    return queries;
  }
  /**
   * this.histories 内で最新の一項目を返す
   * 何も存在しない場合は undefined を返す
   * @return {Object}
   * @private
   */


  _getLatestHistory() {
    return this.histories[Math.max(...Object.keys(this.histories).map(value => Number(value)))];
  }
  /**
   * this.histories に url を新たにセットする
   * url が空文字(デフォルト)の場合は現在の window.location.href をセットする
   * this.histories に既に、現在時刻とミリ秒単位で一致する値が存在する
   * もしくは最新の URL  がセットしようとしている URL と一致している場合はなにもしない
   * @param url
   * @private
   */


  _addHistory(url = '') {
    //url が空文字だったらこの時点での window.location.href をセットする
    url = url === '' ? window.location.href : url; //現在のタイムスタンプ(ミリ秒)

    const time = new Date().getTime(); //最新履歴

    const lastHistory = this._getLatestHistory(); //タイムスタンプと最新の URL のどちらかが一致していたらなにもしない


    if (this.histories[time] !== undefined || lastHistory !== undefined && lastHistory.url === url) {
      return;
    } //クエリをパースしたオブジェクトを用意


    const queries = this._parseQueries(url); //現在のタイムスタンプ(ミリ秒単位)に url をセット


    this.histories[new Date().getTime()] = {
      url,
      queries
    };
  }
  /**
   * histories の設定
   */


  constructor() {
    //タイムスタンプ: {url: string, queries{string: string, ...}} の形で保存される
    this.histories = {}; //この時点の履歴を記録しておく

    this._addHistory();
  }
  /**
   * histories を返す
   * @return {{}|*}
   */


  getHistories() {
    return this.histories;
  }
  /**
   * this.histories 最新データをひとつぶん返す
   * 内部的には this._getLatestHistory() と同義
   * @param timestamp
   * @return {Object}
   */


  getHistory() {
    return this._getLatestHistory();
  }
  /**
   * 履歴データを一つ増やす
   * 内部的には this._addHistory(url) と同義
   * @param url
   */


  setHistory(url = '') {
    this._addHistory(url);
  }

}

/***/ }),

/***/ "./src/inner.js":
/*!**********************!*\
  !*** ./src/inner.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Queries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Queries */ "./src/Queries.js");
/* harmony import */ var _Filename__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Filename */ "./src/Filename.js");


document.addEventListener('DOMContentLoaded', () => {
  //クエリ文字列パース用クラス
  const queries = new _Queries__WEBPACK_IMPORTED_MODULE_0__["Queries"](); //現在のクエリ情報を取得

  const query = queries.getHistory(); //ウィンドウを閉じるための処理

  window.opener = window; //src キーに値が存在すればそれをダウンロード

  if (query.queries.src) {
    //現在の設定を取得
    chrome.storage.sync.get({
      range: 'full',
      title: '{{title}}',
      counter: 0
    }, function (items) {
      //ファイル名変換用クラス
      const filename = new _Filename__WEBPACK_IMPORTED_MODULE_1__["Filename"](); //ファイル名テンプレート変数文字列登録

      if (items.title.indexOf('{{title}}') !== -1) {
        filename.setTemplate('{{title}}', decodeURIComponent(query.queries.title));
      }

      if (items.title.indexOf('{{url}}') !== -1) {
        filename.setTemplate('{{url}}', query.queries.url.replace(/https?:\/\//, ''));
      }

      if (items.title.indexOf('{{counter}}') !== -1) {
        filename.setTemplate('{{counter}}', items.counter);
        items.counter = items.counter + 1;
      } //ダウンロードのための a タグを作成


      const link = document.createElement('a'); //a タグに download 属性をセット

      link.setAttribute('download', filename.getFileName(items.title) + '.png'); //リンク先に src の値を仕込む

      link.setAttribute('href', query.queries.src); //クリックイベントを発火

      link.dispatchEvent(new MouseEvent('click')); //counter のインクリメント

      chrome.storage.sync.set({
        counter: items.counter
      }, () => {
        window.close();
      });
    });
  } else {
    //ウィンドウを閉じる
    window.close();
  }
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0ZpbGVuYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9RdWVyaWVzLmpzIiwid2VicGFjazovLy8uL3NyYy9pbm5lci5qcyJdLCJuYW1lcyI6WyJGaWxlbmFtZSIsIl9yZXBsYWNlQmFkQ2hhcmFjdGVyIiwic3RyaW5nIiwicmVwbGFjZW1lbnQiLCJTdHJpbmciLCJyZXBsYWNlIiwiY29uc3RydWN0b3IiLCJ0ZW1wbGF0ZXMiLCJBcnJheSIsInNldFRlbXBsYXRlIiwidGVtcGxhdGUiLCJ2YWx1ZSIsInB1c2giLCJnZXRGaWxlTmFtZSIsIm5hbWUiLCJpIiwibWF4IiwibGVuZ3RoIiwiUmVnRXhwIiwiUXVlcmllcyIsIl9wYXJzZVF1ZXJpZXMiLCJxdWVyaWVzIiwiaW5kZXhPZiIsInNsaWNlIiwic3BsaXRzIiwic3BsaXQiLCJrZXlBbmRWYWx1ZSIsInVuZGVmaW5lZCIsIl9nZXRMYXRlc3RIaXN0b3J5IiwiaGlzdG9yaWVzIiwiTWF0aCIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJOdW1iZXIiLCJfYWRkSGlzdG9yeSIsInVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwiaHJlZiIsInRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsImxhc3RIaXN0b3J5IiwiZ2V0SGlzdG9yaWVzIiwiZ2V0SGlzdG9yeSIsInNldEhpc3RvcnkiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJxdWVyeSIsIm9wZW5lciIsInNyYyIsImNocm9tZSIsInN0b3JhZ2UiLCJzeW5jIiwiZ2V0IiwicmFuZ2UiLCJ0aXRsZSIsImNvdW50ZXIiLCJpdGVtcyIsImZpbGVuYW1lIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwibGluayIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJkaXNwYXRjaEV2ZW50IiwiTW91c2VFdmVudCIsInNldCIsImNsb3NlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFD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Q0FBQy9DLFdBQVQsQ0FBcUI4QyxLQUFLLENBQUNGLEtBQTNCLElBQWtDLE1BQWhFLEVBcEJpQixDQXNCakI7O0FBQ0FLLFVBQUksQ0FBQ0UsWUFBTCxDQUFrQixNQUFsQixFQUEwQmYsS0FBSyxDQUFDNUIsT0FBTixDQUFjOEIsR0FBeEMsRUF2QmlCLENBeUJqQjs7QUFDQVcsVUFBSSxDQUFDRyxhQUFMLENBQW1CLElBQUlDLFVBQUosQ0FBZSxPQUFmLENBQW5CLEVBMUJpQixDQTRCakI7O0FBQ0FkLFlBQU0sQ0FBQ0MsT0FBUCxDQUFlQyxJQUFmLENBQW9CYSxHQUFwQixDQUF3QjtBQUFDVCxlQUFPLEVBQUVDLEtBQUssQ0FBQ0Q7QUFBaEIsT0FBeEIsRUFBa0QsTUFBTTtBQUN0RHJCLGNBQU0sQ0FBQytCLEtBQVA7QUFDRCxPQUZEO0FBR0QsS0FwQ0Q7QUFxQ0QsR0F2Q0QsTUF3Q0s7QUFDSDtBQUNBL0IsVUFBTSxDQUFDK0IsS0FBUDtBQUNEO0FBQ0YsQ0F2REQsRSIsImZpbGUiOiJpbm5lci5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbm5lci5qc1wiKTtcbiIsIi8qKlxyXG4gKiDjg5XjgqHjgqTjg6vjg43jg7zjg6DkvZzmiJDjgq/jg6njgrlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBGaWxlbmFtZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIOODleOCoeOCpOODq+WQjeOBq+S9v+eUqOOBp+OBjeOBquOBhOaWh+Wtl+OCkuWFqOOBpiByZXBsYWNlbWVudCDjgavnva7mj5vjgZfjgabov5TjgZlcclxuICAgKiBAcGFyYW0gc3RyaW5nXHJcbiAgICogQHBhcmFtIHJlcGxhY2VtZW50XHJcbiAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX3JlcGxhY2VCYWRDaGFyYWN0ZXIoc3RyaW5nLCByZXBsYWNlbWVudCA9ICdfJykge1xyXG4gICAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UoL1xcXFxcXC86XFwqXFw/XCI8PlxcfC9nLCBTdHJpbmcocmVwbGFjZW1lbnQpKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHRoaXMudGVtcGxhdGVzIOOBruWumue+qVxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy50ZW1wbGF0ZXMgPSBuZXcgQXJyYXkoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOODhuODs+ODl+ODrOODvOODiOWkieaVsOaWh+Wtl+WIl+OBqOOBneOBruWApOOCkuioreWumuOBmeOCi1xyXG4gICAqIEBwYXJhbSB0ZW1wbGF0ZVxyXG4gICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAqL1xyXG4gIHNldFRlbXBsYXRlKHRlbXBsYXRlLCB2YWx1ZSkge1xyXG4gICAgdGhpcy50ZW1wbGF0ZXMucHVzaCh7XHJcbiAgICAgIHRlbXBsYXRlOiBTdHJpbmcodGVtcGxhdGUpLFxyXG4gICAgICB2YWx1ZTogU3RyaW5nKHZhbHVlKVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBzZXRUZW1wbGF0ZSgpLCBfcmVwbGFjZUJhZENoYXJhY3RlcigpIOOBp+WkieaPm+OBl+OBn+ODleOCoeOCpOODq+WQjeOCkuWHuuWKm1xyXG4gICAqIEBwYXJhbSBuYW1lXHJcbiAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAqL1xyXG4gIGdldEZpbGVOYW1lKG5hbWUpIHtcclxuICAgIC8v44OG44Oz44OX44Os44O844OI5aSJ5pWw5paH5a2X5YiX44KS5YCk44Gr572u44GN5o+b44GI44KLXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gdGhpcy50ZW1wbGF0ZXMubGVuZ3RoOyBpIDwgbWF4OyBpID0gKGkgKyAxKSB8IDApIHtcclxuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKS5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy50ZW1wbGF0ZXNbaV0udGVtcGxhdGUsICdnJyksIHRoaXMudGVtcGxhdGVzW2ldLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S9v+eUqOS4jeWPr+OBruaWh+Wtl+OCkuWFqOOBpue9ruOBjeaPm+OBiOOBpui/lOWNtFxyXG4gICAgcmV0dXJuIHRoaXMuX3JlcGxhY2VCYWRDaGFyYWN0ZXIobmFtZSk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCIvKipcclxuICogVVJMIOWxpeattOOCkuWPluOCiuOBn+OCgeOAgeOCr+OCqOODquaWh+Wtl+WIl+OCkuaJseOBhOOChOOBmeOBhOOCiOOBhuOBq+ODkeODvOOCueOBmeOCi+OCr+ODqeOCuVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFF1ZXJpZXMge1xyXG5cclxuICAvKipcclxuICAgKiDmuKHjgZXjgozjgZ/jgq/jgqjjg6rmloflrZfliJfjgpLjg5Hjg7zjgrnjgZfjgabjgq3jg7w644OQ44Oq44Ol44O844Gu5b2i44Gr44GZ44KLXHJcbiAgICogdXJsIOOBneOBruOBvuOBvuOCkua4oeOBl+OBpuOCguOCr+OCqOODqumDqOWIhuOBoOOBkeOCkua4oeOBl+OBpuOCguWLleS9nOOBmeOCi1xyXG4gICAqIEBwYXJhbSBzdHJpbmdcclxuICAgKiBAcmV0dXJuIE9iamVjdFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX3BhcnNlUXVlcmllcyhzdHJpbmcpIHtcclxuICAgIC8v44GT44Gu44Oh44K944OD44OJ44GM6L+U44GZ44Kq44OW44K444Kn44Kv44OIXHJcbiAgICBsZXQgcXVlcmllcyA9IHt9O1xyXG5cclxuICAgIC8vPyDjgYzlkKvjgb7jgozjgabjgYTjgZ/jgonjgZ3jgozjgojjgorliY3jgpLliYrpmaRcclxuICAgIGlmIChzdHJpbmcuaW5kZXhPZignPycpICE9PSAtMSkge1xyXG4gICAgICBzdHJpbmcgPSBzdHJpbmcuc2xpY2Uoc3RyaW5nLmluZGV4T2YoJz8nKSArIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vJiDjgafliIblibJcclxuICAgIGNvbnN0IHNwbGl0cyA9IHN0cmluZy5zcGxpdCgnJicpO1xyXG5cclxuICAgIC8vc3BsaXRzIOOBjOepuuOBoOOBo+OBn+OCieOBk+OBruaZgueCueOBp+epuuOCquODluOCuOOCp+OCr+ODiOOCkui/lOOBmVxyXG4gICAgaWYgKHNwbGl0cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuIHF1ZXJpZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8mIOOBp+WMuuWIh+OCieOCjOOBn+aWh+Wtl+WIl+OBlOOBqOOBqyBxdWVyaWVzIOOCkuWKoOOBiOOBpuOBhOOBj+OBn+OCgeOBruODq+ODvOODl1xyXG4gICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IHNwbGl0cy5sZW5ndGg7IGk8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XHJcbiAgICAgIC8vPSDjgafliIblibJcclxuICAgICAgY29uc3Qga2V5QW5kVmFsdWUgPSBzcGxpdHNbaV0uc3BsaXQoJz0nKTtcclxuXHJcbiAgICAgIC8v44KC44GXID0g44GM5ZCr44G+44KM44Gm44GE44Gq44GEIG9yID0g44Gu5YWIKOWApOmDqOWIhinjgYzlrZjlnKjjgZfjgarjgYvjgaPjgZ/jgokgdHJ1ZSDjgpLmjL/lhaVcclxuICAgICAgcXVlcmllc1trZXlBbmRWYWx1ZVswXV0gPVxyXG4gICAgICAgIGtleUFuZFZhbHVlWzFdID09PSB1bmRlZmluZWQgfHwga2V5QW5kVmFsdWVbMV0gPT09ICcnXHJcbiAgICAgICAgICA/IHRydWVcclxuICAgICAgICAgIDoga2V5QW5kVmFsdWVbMV07XHJcbiAgICB9XHJcblxyXG4gICAgLy/ov5TljbRcclxuICAgIHJldHVybiAgcXVlcmllcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHRoaXMuaGlzdG9yaWVzIOWGheOBp+acgOaWsOOBruS4gOmgheebruOCkui/lOOBmVxyXG4gICAqIOS9leOCguWtmOWcqOOBl+OBquOBhOWgtOWQiOOBryB1bmRlZmluZWQg44KS6L+U44GZXHJcbiAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgX2dldExhdGVzdEhpc3RvcnkoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5oaXN0b3JpZXNbTWF0aC5tYXgoLi4uT2JqZWN0LmtleXModGhpcy5oaXN0b3JpZXMpLm1hcCh2YWx1ZSA9PiBOdW1iZXIodmFsdWUpKSldO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogdGhpcy5oaXN0b3JpZXMg44GrIHVybCDjgpLmlrDjgZ/jgavjgrvjg4Pjg4jjgZnjgotcclxuICAgKiB1cmwg44GM56m65paH5a2XKOODh+ODleOCqeODq+ODiCnjga7loLTlkIjjga/nj77lnKjjga4gd2luZG93LmxvY2F0aW9uLmhyZWYg44KS44K744OD44OI44GZ44KLXHJcbiAgICogdGhpcy5oaXN0b3JpZXMg44Gr5pei44Gr44CB54++5Zyo5pmC5Yi744Go44Of44Oq56eS5Y2Y5L2N44Gn5LiA6Ie044GZ44KL5YCk44GM5a2Y5Zyo44GZ44KLXHJcbiAgICog44KC44GX44GP44Gv5pyA5paw44GuIFVSTCAg44GM44K744OD44OI44GX44KI44GG44Go44GX44Gm44GE44KLIFVSTCDjgajkuIDoh7TjgZfjgabjgYTjgovloLTlkIjjga/jgarjgavjgoLjgZfjgarjgYRcclxuICAgKiBAcGFyYW0gdXJsXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBfYWRkSGlzdG9yeSh1cmwgPSAnJykge1xyXG4gICAgLy91cmwg44GM56m65paH5a2X44Gg44Gj44Gf44KJ44GT44Gu5pmC54K544Gn44GuIHdpbmRvdy5sb2NhdGlvbi5ocmVmIOOCkuOCu+ODg+ODiOOBmeOCi1xyXG4gICAgdXJsID0gdXJsID09PSAnJ1xyXG4gICAgICA/IHdpbmRvdy5sb2NhdGlvbi5ocmVmXHJcbiAgICAgIDogdXJsO1xyXG5cclxuICAgIC8v54++5Zyo44Gu44K/44Kk44Og44K544K/44Oz44OXKOODn+ODquenkilcclxuICAgIGNvbnN0IHRpbWUgID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblxyXG4gICAgLy/mnIDmlrDlsaXmrbRcclxuICAgIGNvbnN0IGxhc3RIaXN0b3J5ID0gdGhpcy5fZ2V0TGF0ZXN0SGlzdG9yeSgpO1xyXG5cclxuICAgIC8v44K/44Kk44Og44K544K/44Oz44OX44Go5pyA5paw44GuIFVSTCDjga7jganjgaHjgonjgYvjgYzkuIDoh7TjgZfjgabjgYTjgZ/jgonjgarjgavjgoLjgZfjgarjgYRcclxuICAgIGlmICh0aGlzLmhpc3Rvcmllc1t0aW1lXSAhPT0gdW5kZWZpbmVkIHx8IChsYXN0SGlzdG9yeSAhPT0gdW5kZWZpbmVkICYmIGxhc3RIaXN0b3J5LnVybCA9PT0gdXJsKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy/jgq/jgqjjg6rjgpLjg5Hjg7zjgrnjgZfjgZ/jgqrjg5bjgrjjgqfjgq/jg4jjgpLnlKjmhI9cclxuICAgIGNvbnN0IHF1ZXJpZXMgPSB0aGlzLl9wYXJzZVF1ZXJpZXModXJsKTtcclxuXHJcbiAgICAvL+ePvuWcqOOBruOCv+OCpOODoOOCueOCv+ODs+ODlyjjg5/jg6rnp5LljZjkvY0p44GrIHVybCDjgpLjgrvjg4Pjg4hcclxuICAgIHRoaXMuaGlzdG9yaWVzW25ldyBEYXRlKCkuZ2V0VGltZSgpXSA9IHt1cmwsIHF1ZXJpZXN9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogaGlzdG9yaWVzIOOBruioreWumlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy/jgr/jgqTjg6Djgrnjgr/jg7Pjg5c6IHt1cmw6IHN0cmluZywgcXVlcmllc3tzdHJpbmc6IHN0cmluZywgLi4ufX0g44Gu5b2i44Gn5L+d5a2Y44GV44KM44KLXHJcbiAgICB0aGlzLmhpc3RvcmllcyA9IHt9O1xyXG5cclxuICAgIC8v44GT44Gu5pmC54K544Gu5bGl5q2044KS6KiY6Yyy44GX44Gm44GK44GPXHJcbiAgICB0aGlzLl9hZGRIaXN0b3J5KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBoaXN0b3JpZXMg44KS6L+U44GZXHJcbiAgICogQHJldHVybiB7e318Kn1cclxuICAgKi9cclxuICBnZXRIaXN0b3JpZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5oaXN0b3JpZXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiB0aGlzLmhpc3RvcmllcyDmnIDmlrDjg4fjg7zjgr/jgpLjgbLjgajjgaTjgbbjgpPov5TjgZlcclxuICAgKiDlhoXpg6jnmoTjgavjga8gdGhpcy5fZ2V0TGF0ZXN0SGlzdG9yeSgpIOOBqOWQjOe+qVxyXG4gICAqIEBwYXJhbSB0aW1lc3RhbXBcclxuICAgKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAgICovXHJcbiAgZ2V0SGlzdG9yeSgpIHtcclxuICAgIHJldHVybiB0aGlzLl9nZXRMYXRlc3RIaXN0b3J5KCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDlsaXmrbTjg4fjg7zjgr/jgpLkuIDjgaTlopfjgoTjgZlcclxuICAgKiDlhoXpg6jnmoTjgavjga8gdGhpcy5fYWRkSGlzdG9yeSh1cmwpIOOBqOWQjOe+qVxyXG4gICAqIEBwYXJhbSB1cmxcclxuICAgKi9cclxuICBzZXRIaXN0b3J5KHVybCA9ICcnKSB7XHJcbiAgICB0aGlzLl9hZGRIaXN0b3J5KHVybCk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQge1F1ZXJpZXN9IGZyb20gXCIuL1F1ZXJpZXNcIjtcclxuaW1wb3J0IHtGaWxlbmFtZX0gZnJvbSBcIi4vRmlsZW5hbWVcIjtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgLy/jgq/jgqjjg6rmloflrZfliJfjg5Hjg7zjgrnnlKjjgq/jg6njgrlcclxuICBjb25zdCBxdWVyaWVzID0gbmV3IFF1ZXJpZXMoKTtcclxuXHJcbiAgLy/nj77lnKjjga7jgq/jgqjjg6rmg4XloLHjgpLlj5blvpdcclxuICBjb25zdCBxdWVyeSA9IHF1ZXJpZXMuZ2V0SGlzdG9yeSgpO1xyXG5cclxuICAvL+OCpuOCo+ODs+ODieOCpuOCkumWieOBmOOCi+OBn+OCgeOBruWHpueQhlxyXG4gIHdpbmRvdy5vcGVuZXIgPSB3aW5kb3c7XHJcblxyXG4gIC8vc3JjIOOCreODvOOBq+WApOOBjOWtmOWcqOOBmeOCjOOBsOOBneOCjOOCkuODgOOCpuODs+ODreODvOODiVxyXG4gIGlmIChxdWVyeS5xdWVyaWVzLnNyYykge1xyXG4gICAgLy/nj77lnKjjga7oqK3lrprjgpLlj5blvpdcclxuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KHtcclxuICAgICAgcmFuZ2U6ICdmdWxsJyxcclxuICAgICAgdGl0bGU6ICd7e3RpdGxlfX0nLFxyXG4gICAgICBjb3VudGVyOiAwXHJcbiAgICB9LCBmdW5jdGlvbihpdGVtcykge1xyXG4gICAgICAvL+ODleOCoeOCpOODq+WQjeWkieaPm+eUqOOCr+ODqeOCuVxyXG4gICAgICBjb25zdCBmaWxlbmFtZSA9IG5ldyBGaWxlbmFtZSgpO1xyXG5cclxuICAgICAgLy/jg5XjgqHjgqTjg6vlkI3jg4bjg7Pjg5fjg6zjg7zjg4jlpInmlbDmloflrZfliJfnmbvpjLJcclxuICAgICAgaWYgKGl0ZW1zLnRpdGxlLmluZGV4T2YoJ3t7dGl0bGV9fScpICE9PSAtMSkge1xyXG4gICAgICAgIGZpbGVuYW1lLnNldFRlbXBsYXRlKCd7e3RpdGxlfX0nLCBkZWNvZGVVUklDb21wb25lbnQocXVlcnkucXVlcmllcy50aXRsZSkpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpdGVtcy50aXRsZS5pbmRleE9mKCd7e3VybH19JykgIT09IC0xKSB7XHJcbiAgICAgICAgZmlsZW5hbWUuc2V0VGVtcGxhdGUoJ3t7dXJsfX0nLCBxdWVyeS5xdWVyaWVzLnVybC5yZXBsYWNlKC9odHRwcz86XFwvXFwvLywgJycpKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXRlbXMudGl0bGUuaW5kZXhPZigne3tjb3VudGVyfX0nKSAhPT0gLTEpIHtcclxuICAgICAgICBmaWxlbmFtZS5zZXRUZW1wbGF0ZSgne3tjb3VudGVyfX0nLCBpdGVtcy5jb3VudGVyKTtcclxuICAgICAgICBpdGVtcy5jb3VudGVyID0gaXRlbXMuY291bnRlciArIDE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8v44OA44Km44Oz44Ot44O844OJ44Gu44Gf44KB44GuIGEg44K/44Kw44KS5L2c5oiQXHJcbiAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblxyXG4gICAgICAvL2Eg44K/44Kw44GrIGRvd25sb2FkIOWxnuaAp+OCkuOCu+ODg+ODiFxyXG4gICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCBmaWxlbmFtZS5nZXRGaWxlTmFtZShpdGVtcy50aXRsZSkrJy5wbmcnKTtcclxuXHJcbiAgICAgIC8v44Oq44Oz44Kv5YWI44GrIHNyYyDjga7lgKTjgpLku5XovrzjgoBcclxuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBxdWVyeS5xdWVyaWVzLnNyYyk7XHJcblxyXG4gICAgICAvL+OCr+ODquODg+OCr+OCpOODmeODs+ODiOOCkueZuueBq1xyXG4gICAgICBsaW5rLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoJ2NsaWNrJykpO1xyXG5cclxuICAgICAgLy9jb3VudGVyIOOBruOCpOODs+OCr+ODquODoeODs+ODiFxyXG4gICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7Y291bnRlcjogaXRlbXMuY291bnRlcn0sICgpID0+IHtcclxuICAgICAgICB3aW5kb3cuY2xvc2UoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgZWxzZSB7XHJcbiAgICAvL+OCpuOCo+ODs+ODieOCpuOCkumWieOBmOOCi1xyXG4gICAgd2luZG93LmNsb3NlKCk7XHJcbiAgfVxyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==