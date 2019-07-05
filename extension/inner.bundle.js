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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/inner.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/class/Filename.ts":
/*!*******************************!*\
  !*** ./src/class/Filename.ts ***!
  \*******************************/
/*! exports provided: Filename */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filename", function() { return Filename; });
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
        for (let i = 0, max = this.templates.length; i < max; i = (i + 1) | 0) {
            name = String(name).replace(new RegExp(this.templates[i].template, 'g'), this.templates[i].value);
        }
        //使用不可の文字を全て置き換えて返却
        return this._replaceBadCharacter(name);
    }
}


/***/ }),

/***/ "./src/class/Queries.ts":
/*!******************************!*\
  !*** ./src/class/Queries.ts ***!
  \******************************/
/*! exports provided: Queries */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Queries", function() { return Queries; });
class Queries {
    /**
     * histories の設定
     */
    constructor() {
        /**
         * URL 履歴
         */
        this.histories = {};
        //この時点の履歴を記録しておく
        this._addHistory();
    }
    /**
     * 渡されたクエリ文字列をパースしてキー:バリューの形にする
     * url そのままを渡してもクエリ部分だけを渡しても動作する
     * @param string
     * @return Object
     * @private
     */
    _parseQueries(string) {
        //このメソッドが返すオブジェクト
        let queries = {};
        //? が含まれていたらそれより前を削除
        if (string.indexOf('?') !== -1) {
            string = string.slice(string.indexOf('?') + 1);
        }
        //& で分割
        const splits = string.split('&');
        //splits が空だったらこの時点で空オブジェクトを返す
        if (splits.length === 0) {
            return queries;
        }
        //& で区切られた文字列ごとに queries を加えていくためのループ
        for (let i = 0, max = splits.length; i < max; i = (i + 1) | 0) {
            //= で分割
            const keyAndValue = splits[i].split('=');
            //もし = が含まれていない or = の先(値部分)が存在しなかったら true を挿入
            queries[keyAndValue[0]] =
                keyAndValue[1] === undefined || keyAndValue[1] === ''
                    ? true
                    : keyAndValue[1];
        }
        //返却
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
        url = url === ''
            ? window.location.href
            : url;
        //現在のタイムスタンプ(ミリ秒)
        const time = new Date().getTime();
        //最新履歴
        const lastHistory = this._getLatestHistory();
        //タイムスタンプと最新の URL のどちらかが一致していたらなにもしない
        if (this.histories[time] !== undefined || (lastHistory !== undefined && lastHistory.url === url)) {
            return;
        }
        //現在のタイムスタンプ(ミリ秒単位)に url をセット
        this.histories[new Date().getTime()] = { url, queries: this._parseQueries(url) };
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

/***/ "./src/inner.ts":
/*!**********************!*\
  !*** ./src/inner.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _class_Queries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class/Queries */ "./src/class/Queries.ts");
/* harmony import */ var _class_Filename__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./class/Filename */ "./src/class/Filename.ts");


document.addEventListener('DOMContentLoaded', () => {
    chrome.runtime.sendMessage({ type: 'open' }, (response) => {
        //空文字が返ってきたら何もしない
        if (response.src === '') {
            window.close();
            return;
        }
        //クエリ文字列パース用クラス
        const queries = new _class_Queries__WEBPACK_IMPORTED_MODULE_0__["Queries"]();
        //現在のクエリ情報を取得
        const query = queries.getHistory();
        //ウィンドウを閉じるための処理
        window.opener = window;
        //src キーに値が存在すればそれをダウンロード
        chrome.storage.sync.get({
            range: 'full',
            title: '{{title}}',
            counter: 0
        }, (items) => {
            //ファイル名変換用クラス
            const filename = new _class_Filename__WEBPACK_IMPORTED_MODULE_1__["Filename"]();
            //ファイル名テンプレート変数文字列登録
            if (typeof query.queries.title === 'string' && items.title.indexOf('{{title}}') !== -1) {
                filename.setTemplate('{{title}}', decodeURIComponent(query.queries.title));
            }
            if (typeof query.queries.url === 'string' && items.title.indexOf('{{url}}') !== -1) {
                filename.setTemplate('{{url}}', query.queries.url.replace(/https?:\/\//, ''));
            }
            if (items.title.indexOf('{{counter}}') !== -1) {
                filename.setTemplate('{{counter}}', String(items.counter));
                items.counter = items.counter + 1;
            }
            //ダウンロード
            chrome.downloads.download({
                url: response.src,
                filename: filename.getFileName(items.title) + '.png'
            }, () => {
                window.close();
            });
        });
    });
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzL0ZpbGVuYW1lLnRzIiwid2VicGFjazovLy8uL3NyYy9jbGFzcy9RdWVyaWVzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0VBO0FBQUE7QUFBTyxNQUFNLFFBQVE7SUFPbkI7Ozs7OztPQU1HO0lBQ0ssb0JBQW9CLENBQUMsTUFBYyxFQUFFLGNBQXNCLEdBQUc7UUFDcEUsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRDs7T0FFRztJQUNIO1FBQ0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksV0FBVyxDQUFDLFFBQWdCLEVBQUUsS0FBYTtRQUNoRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUNsQixRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUMxQixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNyQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFdBQVcsQ0FBQyxJQUFZO1FBQzdCLHFCQUFxQjtRQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3JFLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkc7UUFFRCxtQkFBbUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztDQUVGOzs7Ozs7Ozs7Ozs7O0FDcEREO0FBQUE7QUFBTyxNQUFNLE9BQU87SUFzRmxCOztPQUVHO0lBQ0g7UUF2RkE7O1dBRUc7UUFDSyxjQUFTLEdBQWMsRUFBRSxDQUFDO1FBcUZoQyxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFyRkQ7Ozs7OztPQU1HO0lBQ0ssYUFBYSxDQUFDLE1BQWM7UUFDbEMsaUJBQWlCO1FBQ2pCLElBQUksT0FBTyxHQUFjLEVBQUUsQ0FBQztRQUU1QixvQkFBb0I7UUFDcEIsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzlCLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDaEQ7UUFFRCxPQUFPO1FBQ1AsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqQyw4QkFBOEI7UUFDOUIsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN2QixPQUFPLE9BQU8sQ0FBQztTQUNoQjtRQUVELHFDQUFxQztRQUNyQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDNUQsT0FBTztZQUNQLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFekMsOENBQThDO1lBQzlDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUU7b0JBQ25ELENBQUMsQ0FBQyxJQUFJO29CQUNOLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEI7UUFFRCxJQUFJO1FBQ0osT0FBUSxPQUFPLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssaUJBQWlCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ssV0FBVyxDQUFDLE1BQWMsRUFBRTtRQUNsQyxnREFBZ0Q7UUFDaEQsR0FBRyxHQUFHLEdBQUcsS0FBSyxFQUFFO1lBQ2QsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSTtZQUN0QixDQUFDLENBQUMsR0FBRyxDQUFDO1FBRVIsaUJBQWlCO1FBQ2pCLE1BQU0sSUFBSSxHQUFJLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFbkMsTUFBTTtRQUNOLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRTdDLHFDQUFxQztRQUNyQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsSUFBSSxXQUFXLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ2hHLE9BQU87U0FDUjtRQUVELDZCQUE2QjtRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDO0lBQ2pGLENBQUM7SUFVRDs7O09BR0c7SUFDSSxZQUFZO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxVQUFVO1FBQ2YsT0FBTyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFVBQVUsQ0FBQyxNQUFjLEVBQUU7UUFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QixDQUFDO0NBRUY7Ozs7Ozs7Ozs7Ozs7QUM5SEQ7QUFBQTtBQUFBO0FBQXdDO0FBQ0U7QUFFMUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRTtJQUNqRCxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ3RELGlCQUFpQjtRQUNqQixJQUFJLFFBQVEsQ0FBQyxHQUFHLEtBQUssRUFBRSxFQUFFO1lBQ3ZCLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU87U0FDUjtRQUVELGVBQWU7UUFDZixNQUFNLE9BQU8sR0FBRyxJQUFJLHNEQUFPLEVBQUUsQ0FBQztRQUU5QixhQUFhO1FBQ2IsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBRW5DLGdCQUFnQjtRQUNoQixNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUV2Qix5QkFBeUI7UUFDekIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQ3RCLEtBQUssRUFBRSxNQUFNO1lBQ2IsS0FBSyxFQUFFLFdBQVc7WUFDbEIsT0FBTyxFQUFFLENBQUM7U0FDWCxFQUFFLENBQUMsS0FBOEIsRUFBRSxFQUFFO1lBQ3BDLGFBQWE7WUFDYixNQUFNLFFBQVEsR0FBRyxJQUFJLHdEQUFRLEVBQUUsQ0FBQztZQUVoQyxvQkFBb0I7WUFDcEIsSUFBSSxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDdEYsUUFBUSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsa0JBQWtCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2FBQzVFO1lBQ0QsSUFBSSxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDbEYsUUFBUSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQy9FO1lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDN0MsUUFBUSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO2FBQ25DO1lBRUQsUUFBUTtZQUNSLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO2dCQUN4QixHQUFHLEVBQUUsUUFBUSxDQUFDLEdBQUc7Z0JBQ2pCLFFBQVEsRUFBRSxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBQyxNQUFNO2FBQ25ELEVBQUUsR0FBRyxFQUFFO2dCQUNOLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJpbm5lci5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbm5lci50c1wiKTtcbiIsIi8qKlxuICog44OV44Kh44Kk44Or44ON44O844Og5L2c5oiQ44Kv44Op44K5XG4gKi9cbmltcG9ydCB7VGVtcGxhdGVzfSBmcm9tIFwiLi9pbnRlcmZhY2VcIjtcblxuZXhwb3J0IGNsYXNzIEZpbGVuYW1lIHtcblxuICAvKipcbiAgICog572u44GN5o+b44GI5a6a576pXG4gICAqL1xuICBwcml2YXRlIHRlbXBsYXRlczogVGVtcGxhdGVzO1xuXG4gIC8qKlxuICAgKiDjg5XjgqHjgqTjg6vlkI3jgavkvb/nlKjjgafjgY3jgarjgYTmloflrZfjgpLlhajjgaYgcmVwbGFjZW1lbnQg44Gr572u5o+b44GX44Gm6L+U44GZXG4gICAqIEBwYXJhbSBzdHJpbmdcbiAgICogQHBhcmFtIHJlcGxhY2VtZW50XG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX3JlcGxhY2VCYWRDaGFyYWN0ZXIoc3RyaW5nOiBzdHJpbmcsIHJlcGxhY2VtZW50OiBzdHJpbmcgPSAnXycpIHtcbiAgICByZXR1cm4gU3RyaW5nKHN0cmluZykucmVwbGFjZSgvXFxcXFxcLzpcXCpcXD9cIjw+XFx8L2csIFN0cmluZyhyZXBsYWNlbWVudCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMudGVtcGxhdGVzIOOBruWumue+qVxuICAgKi9cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudGVtcGxhdGVzID0gbmV3IEFycmF5KCk7XG4gIH1cblxuICAvKipcbiAgICog44OG44Oz44OX44Os44O844OI5aSJ5pWw5paH5a2X5YiX44Go44Gd44Gu5YCk44KS6Kit5a6a44GZ44KLXG4gICAqIEBwYXJhbSB0ZW1wbGF0ZVxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIHB1YmxpYyBzZXRUZW1wbGF0ZSh0ZW1wbGF0ZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy50ZW1wbGF0ZXMucHVzaCh7XG4gICAgICB0ZW1wbGF0ZTogU3RyaW5nKHRlbXBsYXRlKSxcbiAgICAgIHZhbHVlOiBTdHJpbmcodmFsdWUpXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogc2V0VGVtcGxhdGUoKSwgX3JlcGxhY2VCYWRDaGFyYWN0ZXIoKSDjgaflpInmj5vjgZfjgZ/jg5XjgqHjgqTjg6vlkI3jgpLlh7rliptcbiAgICogQHBhcmFtIG5hbWVcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKi9cbiAgcHVibGljIGdldEZpbGVOYW1lKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgLy/jg4bjg7Pjg5fjg6zjg7zjg4jlpInmlbDmloflrZfliJfjgpLlgKTjgavnva7jgY3mj5vjgYjjgotcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gdGhpcy50ZW1wbGF0ZXMubGVuZ3RoOyBpIDwgbWF4OyBpID0gKGkgKyAxKSB8IDApIHtcbiAgICAgIG5hbWUgPSBTdHJpbmcobmFtZSkucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMudGVtcGxhdGVzW2ldLnRlbXBsYXRlLCAnZycpLCB0aGlzLnRlbXBsYXRlc1tpXS52YWx1ZSk7XG4gICAgfVxuXG4gICAgLy/kvb/nlKjkuI3lj6/jga7mloflrZfjgpLlhajjgabnva7jgY3mj5vjgYjjgabov5TljbRcbiAgICByZXR1cm4gdGhpcy5fcmVwbGFjZUJhZENoYXJhY3RlcihuYW1lKTtcbiAgfVxuXG59XG4iLCIvKipcbiAqIFVSTCDlsaXmrbTjgpLlj5bjgorjgZ/jgoHjgIHjgq/jgqjjg6rmloflrZfliJfjgpLmibHjgYTjgoTjgZnjgYTjgojjgYbjgavjg5Hjg7zjgrnjgZnjgovjgq/jg6njgrlcbiAqL1xuaW1wb3J0IHtIaXN0b3J5LCBIaXN0b3JpZXMsIFF1ZXJ5UGFyZX0gZnJvbSBcIi4vaW50ZXJmYWNlXCI7XG5cbmV4cG9ydCBjbGFzcyBRdWVyaWVzIHtcblxuICAvKipcbiAgICogVVJMIOWxpeattFxuICAgKi9cbiAgcHJpdmF0ZSBoaXN0b3JpZXM6IEhpc3RvcmllcyA9IHt9O1xuXG4gIC8qKlxuICAgKiDmuKHjgZXjgozjgZ/jgq/jgqjjg6rmloflrZfliJfjgpLjg5Hjg7zjgrnjgZfjgabjgq3jg7w644OQ44Oq44Ol44O844Gu5b2i44Gr44GZ44KLXG4gICAqIHVybCDjgZ3jga7jgb7jgb7jgpLmuKHjgZfjgabjgoLjgq/jgqjjg6rpg6jliIbjgaDjgZHjgpLmuKHjgZfjgabjgoLli5XkvZzjgZnjgotcbiAgICogQHBhcmFtIHN0cmluZ1xuICAgKiBAcmV0dXJuIE9iamVjdFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBfcGFyc2VRdWVyaWVzKHN0cmluZzogc3RyaW5nKTogUXVlcnlQYXJlIHtcbiAgICAvL+OBk+OBruODoeOCveODg+ODieOBjOi/lOOBmeOCquODluOCuOOCp+OCr+ODiFxuICAgIGxldCBxdWVyaWVzOiBRdWVyeVBhcmUgPSB7fTtcblxuICAgIC8vPyDjgYzlkKvjgb7jgozjgabjgYTjgZ/jgonjgZ3jgozjgojjgorliY3jgpLliYrpmaRcbiAgICBpZiAoc3RyaW5nLmluZGV4T2YoJz8nKSAhPT0gLTEpIHtcbiAgICAgIHN0cmluZyA9IHN0cmluZy5zbGljZShzdHJpbmcuaW5kZXhPZignPycpICsgMSk7XG4gICAgfVxuXG4gICAgLy8mIOOBp+WIhuWJslxuICAgIGNvbnN0IHNwbGl0cyA9IHN0cmluZy5zcGxpdCgnJicpO1xuXG4gICAgLy9zcGxpdHMg44GM56m644Gg44Gj44Gf44KJ44GT44Gu5pmC54K544Gn56m644Kq44OW44K444Kn44Kv44OI44KS6L+U44GZXG4gICAgaWYgKHNwbGl0cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBxdWVyaWVzO1xuICAgIH1cblxuICAgIC8vJiDjgafljLrliIfjgonjgozjgZ/mloflrZfliJfjgZTjgajjgasgcXVlcmllcyDjgpLliqDjgYjjgabjgYTjgY/jgZ/jgoHjga7jg6vjg7zjg5dcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gc3BsaXRzLmxlbmd0aDsgaTwgbWF4OyBpID0gKGkgKyAxKSB8IDApIHtcbiAgICAgIC8vPSDjgafliIblibJcbiAgICAgIGNvbnN0IGtleUFuZFZhbHVlID0gc3BsaXRzW2ldLnNwbGl0KCc9Jyk7XG5cbiAgICAgIC8v44KC44GXID0g44GM5ZCr44G+44KM44Gm44GE44Gq44GEIG9yID0g44Gu5YWIKOWApOmDqOWIhinjgYzlrZjlnKjjgZfjgarjgYvjgaPjgZ/jgokgdHJ1ZSDjgpLmjL/lhaVcbiAgICAgIHF1ZXJpZXNba2V5QW5kVmFsdWVbMF1dID1cbiAgICAgICAga2V5QW5kVmFsdWVbMV0gPT09IHVuZGVmaW5lZCB8fCBrZXlBbmRWYWx1ZVsxXSA9PT0gJydcbiAgICAgICAgICA/IHRydWVcbiAgICAgICAgICA6IGtleUFuZFZhbHVlWzFdO1xuICAgIH1cblxuICAgIC8v6L+U5Y20XG4gICAgcmV0dXJuICBxdWVyaWVzO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMuaGlzdG9yaWVzIOWGheOBp+acgOaWsOOBruS4gOmgheebruOCkui/lOOBmVxuICAgKiDkvZXjgoLlrZjlnKjjgZfjgarjgYTloLTlkIjjga8gdW5kZWZpbmVkIOOCkui/lOOBmVxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIF9nZXRMYXRlc3RIaXN0b3J5KCkge1xuICAgIHJldHVybiB0aGlzLmhpc3Rvcmllc1tNYXRoLm1heCguLi5PYmplY3Qua2V5cyh0aGlzLmhpc3RvcmllcykubWFwKHZhbHVlID0+IE51bWJlcih2YWx1ZSkpKV07XG4gIH1cblxuICAvKipcbiAgICogdGhpcy5oaXN0b3JpZXMg44GrIHVybCDjgpLmlrDjgZ/jgavjgrvjg4Pjg4jjgZnjgotcbiAgICogdXJsIOOBjOepuuaWh+Wtlyjjg4fjg5Xjgqnjg6vjg4gp44Gu5aC05ZCI44Gv54++5Zyo44GuIHdpbmRvdy5sb2NhdGlvbi5ocmVmIOOCkuOCu+ODg+ODiOOBmeOCi1xuICAgKiB0aGlzLmhpc3RvcmllcyDjgavml6LjgavjgIHnj77lnKjmmYLliLvjgajjg5/jg6rnp5LljZjkvY3jgafkuIDoh7TjgZnjgovlgKTjgYzlrZjlnKjjgZnjgotcbiAgICog44KC44GX44GP44Gv5pyA5paw44GuIFVSTCAg44GM44K744OD44OI44GX44KI44GG44Go44GX44Gm44GE44KLIFVSTCDjgajkuIDoh7TjgZfjgabjgYTjgovloLTlkIjjga/jgarjgavjgoLjgZfjgarjgYRcbiAgICogQHBhcmFtIHVybFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBfYWRkSGlzdG9yeSh1cmw6IHN0cmluZyA9ICcnKSB7XG4gICAgLy91cmwg44GM56m65paH5a2X44Gg44Gj44Gf44KJ44GT44Gu5pmC54K544Gn44GuIHdpbmRvdy5sb2NhdGlvbi5ocmVmIOOCkuOCu+ODg+ODiOOBmeOCi1xuICAgIHVybCA9IHVybCA9PT0gJydcbiAgICAgID8gd2luZG93LmxvY2F0aW9uLmhyZWZcbiAgICAgIDogdXJsO1xuXG4gICAgLy/nj77lnKjjga7jgr/jgqTjg6Djgrnjgr/jg7Pjg5co44Of44Oq56eSKVxuICAgIGNvbnN0IHRpbWUgID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAvL+acgOaWsOWxpeattFxuICAgIGNvbnN0IGxhc3RIaXN0b3J5ID0gdGhpcy5fZ2V0TGF0ZXN0SGlzdG9yeSgpO1xuXG4gICAgLy/jgr/jgqTjg6Djgrnjgr/jg7Pjg5fjgajmnIDmlrDjga4gVVJMIOOBruOBqeOBoeOCieOBi+OBjOS4gOiHtOOBl+OBpuOBhOOBn+OCieOBquOBq+OCguOBl+OBquOBhFxuICAgIGlmICh0aGlzLmhpc3Rvcmllc1t0aW1lXSAhPT0gdW5kZWZpbmVkIHx8IChsYXN0SGlzdG9yeSAhPT0gdW5kZWZpbmVkICYmIGxhc3RIaXN0b3J5LnVybCA9PT0gdXJsKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8v54++5Zyo44Gu44K/44Kk44Og44K544K/44Oz44OXKOODn+ODquenkuWNmOS9jSnjgasgdXJsIOOCkuOCu+ODg+ODiFxuICAgIHRoaXMuaGlzdG9yaWVzW25ldyBEYXRlKCkuZ2V0VGltZSgpXSA9IHt1cmwsIHF1ZXJpZXM6IHRoaXMuX3BhcnNlUXVlcmllcyh1cmwpfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoaXN0b3JpZXMg44Gu6Kit5a6aXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgLy/jgZPjga7mmYLngrnjga7lsaXmrbTjgpLoqJjpjLLjgZfjgabjgYrjgY9cbiAgICB0aGlzLl9hZGRIaXN0b3J5KCk7XG4gIH1cblxuICAvKipcbiAgICogaGlzdG9yaWVzIOOCkui/lOOBmVxuICAgKiBAcmV0dXJuIHt7fXwqfVxuICAgKi9cbiAgcHVibGljIGdldEhpc3RvcmllcygpOiBIaXN0b3JpZXMge1xuICAgIHJldHVybiB0aGlzLmhpc3RvcmllcztcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzLmhpc3RvcmllcyDmnIDmlrDjg4fjg7zjgr/jgpLjgbLjgajjgaTjgbbjgpPov5TjgZlcbiAgICog5YaF6YOo55qE44Gr44GvIHRoaXMuX2dldExhdGVzdEhpc3RvcnkoKSDjgajlkIznvqlcbiAgICogQHBhcmFtIHRpbWVzdGFtcFxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBwdWJsaWMgZ2V0SGlzdG9yeSgpOiBIaXN0b3J5IHtcbiAgICByZXR1cm4gdGhpcy5fZ2V0TGF0ZXN0SGlzdG9yeSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOWxpeattOODh+ODvOOCv+OCkuS4gOOBpOWil+OChOOBmVxuICAgKiDlhoXpg6jnmoTjgavjga8gdGhpcy5fYWRkSGlzdG9yeSh1cmwpIOOBqOWQjOe+qVxuICAgKiBAcGFyYW0gdXJsXG4gICAqL1xuICBwdWJsaWMgc2V0SGlzdG9yeSh1cmw6IHN0cmluZyA9ICcnKSB7XG4gICAgdGhpcy5fYWRkSGlzdG9yeSh1cmwpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7UXVlcmllc30gZnJvbSBcIi4vY2xhc3MvUXVlcmllc1wiO1xuaW1wb3J0IHtGaWxlbmFtZX0gZnJvbSBcIi4vY2xhc3MvRmlsZW5hbWVcIjtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe3R5cGU6ICdvcGVuJ30sIChyZXNwb25zZSkgPT4ge1xuICAgIC8v56m65paH5a2X44GM6L+U44Gj44Gm44GN44Gf44KJ5L2V44KC44GX44Gq44GEXG4gICAgaWYgKHJlc3BvbnNlLnNyYyA9PT0gJycpIHtcbiAgICAgIHdpbmRvdy5jbG9zZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8v44Kv44Ko44Oq5paH5a2X5YiX44OR44O844K555So44Kv44Op44K5XG4gICAgY29uc3QgcXVlcmllcyA9IG5ldyBRdWVyaWVzKCk7XG5cbiAgICAvL+ePvuWcqOOBruOCr+OCqOODquaDheWgseOCkuWPluW+l1xuICAgIGNvbnN0IHF1ZXJ5ID0gcXVlcmllcy5nZXRIaXN0b3J5KCk7XG5cbiAgICAvL+OCpuOCo+ODs+ODieOCpuOCkumWieOBmOOCi+OBn+OCgeOBruWHpueQhlxuICAgIHdpbmRvdy5vcGVuZXIgPSB3aW5kb3c7XG5cbiAgICAvL3NyYyDjgq3jg7zjgavlgKTjgYzlrZjlnKjjgZnjgozjgbDjgZ3jgozjgpLjg4Djgqbjg7Pjg63jg7zjg4lcbiAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldCh7XG4gICAgICByYW5nZTogJ2Z1bGwnLFxuICAgICAgdGl0bGU6ICd7e3RpdGxlfX0nLFxuICAgICAgY291bnRlcjogMFxuICAgIH0sIChpdGVtczoge1trZXk6IHN0cmluZ106IHN0cmluZ30pID0+IHtcbiAgICAgIC8v44OV44Kh44Kk44Or5ZCN5aSJ5o+b55So44Kv44Op44K5XG4gICAgICBjb25zdCBmaWxlbmFtZSA9IG5ldyBGaWxlbmFtZSgpO1xuXG4gICAgICAvL+ODleOCoeOCpOODq+WQjeODhuODs+ODl+ODrOODvOODiOWkieaVsOaWh+Wtl+WIl+eZu+mMslxuICAgICAgaWYgKHR5cGVvZiBxdWVyeS5xdWVyaWVzLnRpdGxlID09PSAnc3RyaW5nJyAmJiBpdGVtcy50aXRsZS5pbmRleE9mKCd7e3RpdGxlfX0nKSAhPT0gLTEpIHtcbiAgICAgICAgZmlsZW5hbWUuc2V0VGVtcGxhdGUoJ3t7dGl0bGV9fScsIGRlY29kZVVSSUNvbXBvbmVudChxdWVyeS5xdWVyaWVzLnRpdGxlKSk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHF1ZXJ5LnF1ZXJpZXMudXJsID09PSAnc3RyaW5nJyAmJiBpdGVtcy50aXRsZS5pbmRleE9mKCd7e3VybH19JykgIT09IC0xKSB7XG4gICAgICAgIGZpbGVuYW1lLnNldFRlbXBsYXRlKCd7e3VybH19JywgcXVlcnkucXVlcmllcy51cmwucmVwbGFjZSgvaHR0cHM/OlxcL1xcLy8sICcnKSk7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbXMudGl0bGUuaW5kZXhPZigne3tjb3VudGVyfX0nKSAhPT0gLTEpIHtcbiAgICAgICAgZmlsZW5hbWUuc2V0VGVtcGxhdGUoJ3t7Y291bnRlcn19JywgU3RyaW5nKGl0ZW1zLmNvdW50ZXIpKTtcbiAgICAgICAgaXRlbXMuY291bnRlciA9IGl0ZW1zLmNvdW50ZXIgKyAxO1xuICAgICAgfVxuXG4gICAgICAvL+ODgOOCpuODs+ODreODvOODiVxuICAgICAgY2hyb21lLmRvd25sb2Fkcy5kb3dubG9hZCh7XG4gICAgICAgIHVybDogcmVzcG9uc2Uuc3JjLFxuICAgICAgICBmaWxlbmFtZTogZmlsZW5hbWUuZ2V0RmlsZU5hbWUoaXRlbXMudGl0bGUpKycucG5nJ1xuICAgICAgfSwgKCkgPT4ge1xuICAgICAgICB3aW5kb3cuY2xvc2UoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==