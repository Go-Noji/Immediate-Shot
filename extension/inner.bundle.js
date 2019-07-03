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

/***/ "./src/Filename.ts":
/*!*************************!*\
  !*** ./src/Filename.ts ***!
  \*************************/
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

/***/ "./src/Queries.ts":
/*!************************!*\
  !*** ./src/Queries.ts ***!
  \************************/
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
/* harmony import */ var _Queries__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Queries */ "./src/Queries.ts");
/* harmony import */ var _Filename__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Filename */ "./src/Filename.ts");


document.addEventListener('DOMContentLoaded', () => {
    //クエリ文字列パース用クラス
    const queries = new _Queries__WEBPACK_IMPORTED_MODULE_0__["Queries"]();
    //現在のクエリ情報を取得
    const query = queries.getHistory();
    //ウィンドウを閉じるための処理
    window.opener = window;
    //src キーに値が存在すればそれをダウンロード
    if (query.queries.src) {
        //現在の設定を取得
        chrome.storage.sync.get({
            range: 'full',
            title: '{{title}}',
            counter: 0
        }, (items) => {
            //ファイル名変換用クラス
            const filename = new _Filename__WEBPACK_IMPORTED_MODULE_1__["Filename"]();
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
            //ダウンロードのための a タグを作成
            const link = document.createElement('a');
            //a タグに download 属性をセット
            link.setAttribute('download', filename.getFileName(items.title) + '.png');
            //リンク先に src の値を仕込む
            link.setAttribute('href', typeof query.queries.src === 'string' ? query.queries.src : '');
            //クリックイベントを発火
            link.dispatchEvent(new MouseEvent('click'));
            //counter のインクリメント
            chrome.storage.sync.set({ counter: items.counter }, () => {
                window.close();
            });
        });
    }
    else {
        //ウィンドウを閉じる
        window.close();
    }
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0ZpbGVuYW1lLnRzIiwid2VicGFjazovLy8uL3NyYy9RdWVyaWVzLnRzIiwid2VicGFjazovLy8uL3NyYy9pbm5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0VBO0FBQUE7QUFBTyxNQUFNLFFBQVE7SUFPbkI7Ozs7OztPQU1HO0lBQ0ssb0JBQW9CLENBQUMsTUFBYyxFQUFFLGNBQXNCLEdBQUc7UUFDcEUsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRDs7T0FFRztJQUNIO1FBQ0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksV0FBVyxDQUFDLFFBQWdCLEVBQUUsS0FBYTtRQUNoRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUNsQixRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUMxQixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNyQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFdBQVcsQ0FBQyxJQUFZO1FBQzdCLHFCQUFxQjtRQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3JFLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkc7UUFFRCxtQkFBbUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztDQUVGOzs7Ozs7Ozs7Ozs7O0FDcEREO0FBQUE7QUFBTyxNQUFNLE9BQU87SUFzRmxCOztPQUVHO0lBQ0g7UUF2RkE7O1dBRUc7UUFDSyxjQUFTLEdBQWMsRUFBRSxDQUFDO1FBcUZoQyxnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFyRkQ7Ozs7OztPQU1HO0lBQ0ssYUFBYSxDQUFDLE1BQWM7UUFDbEMsaUJBQWlCO1FBQ2pCLElBQUksT0FBTyxHQUFjLEVBQUUsQ0FBQztRQUU1QixvQkFBb0I7UUFDcEIsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzlCLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDaEQ7UUFFRCxPQUFPO1FBQ1AsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqQyw4QkFBOEI7UUFDOUIsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtZQUN2QixPQUFPLE9BQU8sQ0FBQztTQUNoQjtRQUVELHFDQUFxQztRQUNyQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDNUQsT0FBTztZQUNQLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFekMsOENBQThDO1lBQzlDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLFdBQVcsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUU7b0JBQ25ELENBQUMsQ0FBQyxJQUFJO29CQUNOLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEI7UUFFRCxJQUFJO1FBQ0osT0FBUSxPQUFPLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssaUJBQWlCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ssV0FBVyxDQUFDLE1BQWMsRUFBRTtRQUNsQyxnREFBZ0Q7UUFDaEQsR0FBRyxHQUFHLEdBQUcsS0FBSyxFQUFFO1lBQ2QsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSTtZQUN0QixDQUFDLENBQUMsR0FBRyxDQUFDO1FBRVIsaUJBQWlCO1FBQ2pCLE1BQU0sSUFBSSxHQUFJLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFbkMsTUFBTTtRQUNOLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBRTdDLHFDQUFxQztRQUNyQyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxJQUFJLENBQUMsV0FBVyxLQUFLLFNBQVMsSUFBSSxXQUFXLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ2hHLE9BQU87U0FDUjtRQUVELDZCQUE2QjtRQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDO0lBQ2pGLENBQUM7SUFVRDs7O09BR0c7SUFDSSxZQUFZO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxVQUFVO1FBQ2YsT0FBTyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFVBQVUsQ0FBQyxNQUFjLEVBQUU7UUFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4QixDQUFDO0NBRUY7Ozs7Ozs7Ozs7Ozs7QUM5SEQ7QUFBQTtBQUFBO0FBQWtDO0FBQ0U7QUFFcEMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRTtJQUNqRCxlQUFlO0lBQ2YsTUFBTSxPQUFPLEdBQUcsSUFBSSxnREFBTyxFQUFFLENBQUM7SUFFOUIsYUFBYTtJQUNiLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUVuQyxnQkFBZ0I7SUFDaEIsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFFdkIseUJBQXlCO0lBQ3pCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUU7UUFDckIsVUFBVTtRQUNWLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUN0QixLQUFLLEVBQUUsTUFBTTtZQUNiLEtBQUssRUFBRSxXQUFXO1lBQ2xCLE9BQU8sRUFBRSxDQUFDO1NBQ1gsRUFBRSxDQUFDLEtBQThCLEVBQUUsRUFBRTtZQUNwQyxhQUFhO1lBQ2IsTUFBTSxRQUFRLEdBQUcsSUFBSSxrREFBUSxFQUFFLENBQUM7WUFFaEMsb0JBQW9CO1lBQ3BCLElBQUksT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ3RGLFFBQVEsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUM1RTtZQUNELElBQUksT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ2xGLFFBQVEsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUMvRTtZQUNELElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQzdDLFFBQVEsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQzthQUNuQztZQUVELG9CQUFvQjtZQUNwQixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXpDLHVCQUF1QjtZQUN2QixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBQyxNQUFNLENBQUMsQ0FBQztZQUV4RSxrQkFBa0I7WUFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUUxRixhQUFhO1lBQ2IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBRTVDLGtCQUFrQjtZQUNsQixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFBQyxFQUFFLEdBQUcsRUFBRTtnQkFDckQsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7S0FDSjtTQUNJO1FBQ0gsV0FBVztRQUNYLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztLQUNoQjtBQUNILENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImlubmVyLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2lubmVyLnRzXCIpO1xuIiwiLyoqXG4gKiDjg5XjgqHjgqTjg6vjg43jg7zjg6DkvZzmiJDjgq/jg6njgrlcbiAqL1xuaW1wb3J0IHtUZW1wbGF0ZXN9IGZyb20gXCIuL2ludGVyZmFjZVwiO1xuXG5leHBvcnQgY2xhc3MgRmlsZW5hbWUge1xuXG4gIC8qKlxuICAgKiDnva7jgY3mj5vjgYjlrprnvqlcbiAgICovXG4gIHByaXZhdGUgdGVtcGxhdGVzOiBUZW1wbGF0ZXM7XG5cbiAgLyoqXG4gICAqIOODleOCoeOCpOODq+WQjeOBq+S9v+eUqOOBp+OBjeOBquOBhOaWh+Wtl+OCkuWFqOOBpiByZXBsYWNlbWVudCDjgavnva7mj5vjgZfjgabov5TjgZlcbiAgICogQHBhcmFtIHN0cmluZ1xuICAgKiBAcGFyYW0gcmVwbGFjZW1lbnRcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmVwbGFjZUJhZENoYXJhY3RlcihzdHJpbmc6IHN0cmluZywgcmVwbGFjZW1lbnQ6IHN0cmluZyA9ICdfJykge1xuICAgIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKC9cXFxcXFwvOlxcKlxcP1wiPD5cXHwvZywgU3RyaW5nKHJlcGxhY2VtZW50KSk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcy50ZW1wbGF0ZXMg44Gu5a6a576pXG4gICAqL1xuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50ZW1wbGF0ZXMgPSBuZXcgQXJyYXkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDjg4bjg7Pjg5fjg6zjg7zjg4jlpInmlbDmloflrZfliJfjgajjgZ3jga7lgKTjgpLoqK3lrprjgZnjgotcbiAgICogQHBhcmFtIHRlbXBsYXRlXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgcHVibGljIHNldFRlbXBsYXRlKHRlbXBsYXRlOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnRlbXBsYXRlcy5wdXNoKHtcbiAgICAgIHRlbXBsYXRlOiBTdHJpbmcodGVtcGxhdGUpLFxuICAgICAgdmFsdWU6IFN0cmluZyh2YWx1ZSlcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzZXRUZW1wbGF0ZSgpLCBfcmVwbGFjZUJhZENoYXJhY3RlcigpIOOBp+WkieaPm+OBl+OBn+ODleOCoeOCpOODq+WQjeOCkuWHuuWKm1xuICAgKiBAcGFyYW0gbmFtZVxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqL1xuICBwdWJsaWMgZ2V0RmlsZU5hbWUobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAvL+ODhuODs+ODl+ODrOODvOODiOWkieaVsOaWh+Wtl+WIl+OCkuWApOOBq+e9ruOBjeaPm+OBiOOCi1xuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSB0aGlzLnRlbXBsYXRlcy5sZW5ndGg7IGkgPCBtYXg7IGkgPSAoaSArIDEpIHwgMCkge1xuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKS5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy50ZW1wbGF0ZXNbaV0udGVtcGxhdGUsICdnJyksIHRoaXMudGVtcGxhdGVzW2ldLnZhbHVlKTtcbiAgICB9XG5cbiAgICAvL+S9v+eUqOS4jeWPr+OBruaWh+Wtl+OCkuWFqOOBpue9ruOBjeaPm+OBiOOBpui/lOWNtFxuICAgIHJldHVybiB0aGlzLl9yZXBsYWNlQmFkQ2hhcmFjdGVyKG5hbWUpO1xuICB9XG5cbn1cbiIsIi8qKlxuICogVVJMIOWxpeattOOCkuWPluOCiuOBn+OCgeOAgeOCr+OCqOODquaWh+Wtl+WIl+OCkuaJseOBhOOChOOBmeOBhOOCiOOBhuOBq+ODkeODvOOCueOBmeOCi+OCr+ODqeOCuVxuICovXG5pbXBvcnQge0hpc3RvcnksIEhpc3RvcmllcywgUXVlcnlQYXJlfSBmcm9tIFwiLi9pbnRlcmZhY2VcIjtcblxuZXhwb3J0IGNsYXNzIFF1ZXJpZXMge1xuXG4gIC8qKlxuICAgKiBVUkwg5bGl5q20XG4gICAqL1xuICBwcml2YXRlIGhpc3RvcmllczogSGlzdG9yaWVzID0ge307XG5cbiAgLyoqXG4gICAqIOa4oeOBleOCjOOBn+OCr+OCqOODquaWh+Wtl+WIl+OCkuODkeODvOOCueOBl+OBpuOCreODvDrjg5Djg6rjg6Xjg7zjga7lvaLjgavjgZnjgotcbiAgICogdXJsIOOBneOBruOBvuOBvuOCkua4oeOBl+OBpuOCguOCr+OCqOODqumDqOWIhuOBoOOBkeOCkua4oeOBl+OBpuOCguWLleS9nOOBmeOCi1xuICAgKiBAcGFyYW0gc3RyaW5nXG4gICAqIEByZXR1cm4gT2JqZWN0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIF9wYXJzZVF1ZXJpZXMoc3RyaW5nOiBzdHJpbmcpOiBRdWVyeVBhcmUge1xuICAgIC8v44GT44Gu44Oh44K944OD44OJ44GM6L+U44GZ44Kq44OW44K444Kn44Kv44OIXG4gICAgbGV0IHF1ZXJpZXM6IFF1ZXJ5UGFyZSA9IHt9O1xuXG4gICAgLy8/IOOBjOWQq+OBvuOCjOOBpuOBhOOBn+OCieOBneOCjOOCiOOCiuWJjeOCkuWJiumZpFxuICAgIGlmIChzdHJpbmcuaW5kZXhPZignPycpICE9PSAtMSkge1xuICAgICAgc3RyaW5nID0gc3RyaW5nLnNsaWNlKHN0cmluZy5pbmRleE9mKCc/JykgKyAxKTtcbiAgICB9XG5cbiAgICAvLyYg44Gn5YiG5YmyXG4gICAgY29uc3Qgc3BsaXRzID0gc3RyaW5nLnNwbGl0KCcmJyk7XG5cbiAgICAvL3NwbGl0cyDjgYznqbrjgaDjgaPjgZ/jgonjgZPjga7mmYLngrnjgafnqbrjgqrjg5bjgrjjgqfjgq/jg4jjgpLov5TjgZlcbiAgICBpZiAoc3BsaXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHF1ZXJpZXM7XG4gICAgfVxuXG4gICAgLy8mIOOBp+WMuuWIh+OCieOCjOOBn+aWh+Wtl+WIl+OBlOOBqOOBqyBxdWVyaWVzIOOCkuWKoOOBiOOBpuOBhOOBj+OBn+OCgeOBruODq+ODvOODl1xuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBzcGxpdHMubGVuZ3RoOyBpPCBtYXg7IGkgPSAoaSArIDEpIHwgMCkge1xuICAgICAgLy89IOOBp+WIhuWJslxuICAgICAgY29uc3Qga2V5QW5kVmFsdWUgPSBzcGxpdHNbaV0uc3BsaXQoJz0nKTtcblxuICAgICAgLy/jgoLjgZcgPSDjgYzlkKvjgb7jgozjgabjgYTjgarjgYQgb3IgPSDjga7lhYgo5YCk6YOo5YiGKeOBjOWtmOWcqOOBl+OBquOBi+OBo+OBn+OCiSB0cnVlIOOCkuaMv+WFpVxuICAgICAgcXVlcmllc1trZXlBbmRWYWx1ZVswXV0gPVxuICAgICAgICBrZXlBbmRWYWx1ZVsxXSA9PT0gdW5kZWZpbmVkIHx8IGtleUFuZFZhbHVlWzFdID09PSAnJ1xuICAgICAgICAgID8gdHJ1ZVxuICAgICAgICAgIDoga2V5QW5kVmFsdWVbMV07XG4gICAgfVxuXG4gICAgLy/ov5TljbRcbiAgICByZXR1cm4gIHF1ZXJpZXM7XG4gIH1cblxuICAvKipcbiAgICogdGhpcy5oaXN0b3JpZXMg5YaF44Gn5pyA5paw44Gu5LiA6aCF55uu44KS6L+U44GZXG4gICAqIOS9leOCguWtmOWcqOOBl+OBquOBhOWgtOWQiOOBryB1bmRlZmluZWQg44KS6L+U44GZXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX2dldExhdGVzdEhpc3RvcnkoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGlzdG9yaWVzW01hdGgubWF4KC4uLk9iamVjdC5rZXlzKHRoaXMuaGlzdG9yaWVzKS5tYXAodmFsdWUgPT4gTnVtYmVyKHZhbHVlKSkpXTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzLmhpc3RvcmllcyDjgasgdXJsIOOCkuaWsOOBn+OBq+OCu+ODg+ODiOOBmeOCi1xuICAgKiB1cmwg44GM56m65paH5a2XKOODh+ODleOCqeODq+ODiCnjga7loLTlkIjjga/nj77lnKjjga4gd2luZG93LmxvY2F0aW9uLmhyZWYg44KS44K744OD44OI44GZ44KLXG4gICAqIHRoaXMuaGlzdG9yaWVzIOOBq+aXouOBq+OAgeePvuWcqOaZguWIu+OBqOODn+ODquenkuWNmOS9jeOBp+S4gOiHtOOBmeOCi+WApOOBjOWtmOWcqOOBmeOCi1xuICAgKiDjgoLjgZfjgY/jga/mnIDmlrDjga4gVVJMICDjgYzjgrvjg4Pjg4jjgZfjgojjgYbjgajjgZfjgabjgYTjgosgVVJMIOOBqOS4gOiHtOOBl+OBpuOBhOOCi+WgtOWQiOOBr+OBquOBq+OCguOBl+OBquOBhFxuICAgKiBAcGFyYW0gdXJsXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIF9hZGRIaXN0b3J5KHVybDogc3RyaW5nID0gJycpIHtcbiAgICAvL3VybCDjgYznqbrmloflrZfjgaDjgaPjgZ/jgonjgZPjga7mmYLngrnjgafjga4gd2luZG93LmxvY2F0aW9uLmhyZWYg44KS44K744OD44OI44GZ44KLXG4gICAgdXJsID0gdXJsID09PSAnJ1xuICAgICAgPyB3aW5kb3cubG9jYXRpb24uaHJlZlxuICAgICAgOiB1cmw7XG5cbiAgICAvL+ePvuWcqOOBruOCv+OCpOODoOOCueOCv+ODs+ODlyjjg5/jg6rnp5IpXG4gICAgY29uc3QgdGltZSAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgIC8v5pyA5paw5bGl5q20XG4gICAgY29uc3QgbGFzdEhpc3RvcnkgPSB0aGlzLl9nZXRMYXRlc3RIaXN0b3J5KCk7XG5cbiAgICAvL+OCv+OCpOODoOOCueOCv+ODs+ODl+OBqOacgOaWsOOBriBVUkwg44Gu44Gp44Gh44KJ44GL44GM5LiA6Ie044GX44Gm44GE44Gf44KJ44Gq44Gr44KC44GX44Gq44GEXG4gICAgaWYgKHRoaXMuaGlzdG9yaWVzW3RpbWVdICE9PSB1bmRlZmluZWQgfHwgKGxhc3RIaXN0b3J5ICE9PSB1bmRlZmluZWQgJiYgbGFzdEhpc3RvcnkudXJsID09PSB1cmwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy/nj77lnKjjga7jgr/jgqTjg6Djgrnjgr/jg7Pjg5co44Of44Oq56eS5Y2Y5L2NKeOBqyB1cmwg44KS44K744OD44OIXG4gICAgdGhpcy5oaXN0b3JpZXNbbmV3IERhdGUoKS5nZXRUaW1lKCldID0ge3VybCwgcXVlcmllczogdGhpcy5fcGFyc2VRdWVyaWVzKHVybCl9O1xuICB9XG5cbiAgLyoqXG4gICAqIGhpc3RvcmllcyDjga7oqK3lrppcbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAvL+OBk+OBruaZgueCueOBruWxpeattOOCkuiomOmMsuOBl+OBpuOBiuOBj1xuICAgIHRoaXMuX2FkZEhpc3RvcnkoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBoaXN0b3JpZXMg44KS6L+U44GZXG4gICAqIEByZXR1cm4ge3t9fCp9XG4gICAqL1xuICBwdWJsaWMgZ2V0SGlzdG9yaWVzKCk6IEhpc3RvcmllcyB7XG4gICAgcmV0dXJuIHRoaXMuaGlzdG9yaWVzO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMuaGlzdG9yaWVzIOacgOaWsOODh+ODvOOCv+OCkuOBsuOBqOOBpOOBtuOCk+i/lOOBmVxuICAgKiDlhoXpg6jnmoTjgavjga8gdGhpcy5fZ2V0TGF0ZXN0SGlzdG9yeSgpIOOBqOWQjOe+qVxuICAgKiBAcGFyYW0gdGltZXN0YW1wXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIHB1YmxpYyBnZXRIaXN0b3J5KCk6IEhpc3Rvcnkge1xuICAgIHJldHVybiB0aGlzLl9nZXRMYXRlc3RIaXN0b3J5KCk7XG4gIH1cblxuICAvKipcbiAgICog5bGl5q2044OH44O844K/44KS5LiA44Gk5aKX44KE44GZXG4gICAqIOWGhemDqOeahOOBq+OBryB0aGlzLl9hZGRIaXN0b3J5KHVybCkg44Go5ZCM576pXG4gICAqIEBwYXJhbSB1cmxcbiAgICovXG4gIHB1YmxpYyBzZXRIaXN0b3J5KHVybDogc3RyaW5nID0gJycpIHtcbiAgICB0aGlzLl9hZGRIaXN0b3J5KHVybCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHtRdWVyaWVzfSBmcm9tIFwiLi9RdWVyaWVzXCI7XG5pbXBvcnQge0ZpbGVuYW1lfSBmcm9tIFwiLi9GaWxlbmFtZVwiO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAvL+OCr+OCqOODquaWh+Wtl+WIl+ODkeODvOOCueeUqOOCr+ODqeOCuVxuICBjb25zdCBxdWVyaWVzID0gbmV3IFF1ZXJpZXMoKTtcblxuICAvL+ePvuWcqOOBruOCr+OCqOODquaDheWgseOCkuWPluW+l1xuICBjb25zdCBxdWVyeSA9IHF1ZXJpZXMuZ2V0SGlzdG9yeSgpO1xuXG4gIC8v44Km44Kj44Oz44OJ44Km44KS6ZaJ44GY44KL44Gf44KB44Gu5Yem55CGXG4gIHdpbmRvdy5vcGVuZXIgPSB3aW5kb3c7XG5cbiAgLy9zcmMg44Kt44O844Gr5YCk44GM5a2Y5Zyo44GZ44KM44Gw44Gd44KM44KS44OA44Km44Oz44Ot44O844OJXG4gIGlmIChxdWVyeS5xdWVyaWVzLnNyYykge1xuICAgIC8v54++5Zyo44Gu6Kit5a6a44KS5Y+W5b6XXG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoe1xuICAgICAgcmFuZ2U6ICdmdWxsJyxcbiAgICAgIHRpdGxlOiAne3t0aXRsZX19JyxcbiAgICAgIGNvdW50ZXI6IDBcbiAgICB9LCAoaXRlbXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9KSA9PiB7XG4gICAgICAvL+ODleOCoeOCpOODq+WQjeWkieaPm+eUqOOCr+ODqeOCuVxuICAgICAgY29uc3QgZmlsZW5hbWUgPSBuZXcgRmlsZW5hbWUoKTtcblxuICAgICAgLy/jg5XjgqHjgqTjg6vlkI3jg4bjg7Pjg5fjg6zjg7zjg4jlpInmlbDmloflrZfliJfnmbvpjLJcbiAgICAgIGlmICh0eXBlb2YgcXVlcnkucXVlcmllcy50aXRsZSA9PT0gJ3N0cmluZycgJiYgaXRlbXMudGl0bGUuaW5kZXhPZigne3t0aXRsZX19JykgIT09IC0xKSB7XG4gICAgICAgIGZpbGVuYW1lLnNldFRlbXBsYXRlKCd7e3RpdGxlfX0nLCBkZWNvZGVVUklDb21wb25lbnQocXVlcnkucXVlcmllcy50aXRsZSkpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBxdWVyeS5xdWVyaWVzLnVybCA9PT0gJ3N0cmluZycgJiYgaXRlbXMudGl0bGUuaW5kZXhPZigne3t1cmx9fScpICE9PSAtMSkge1xuICAgICAgICBmaWxlbmFtZS5zZXRUZW1wbGF0ZSgne3t1cmx9fScsIHF1ZXJ5LnF1ZXJpZXMudXJsLnJlcGxhY2UoL2h0dHBzPzpcXC9cXC8vLCAnJykpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1zLnRpdGxlLmluZGV4T2YoJ3t7Y291bnRlcn19JykgIT09IC0xKSB7XG4gICAgICAgIGZpbGVuYW1lLnNldFRlbXBsYXRlKCd7e2NvdW50ZXJ9fScsIFN0cmluZyhpdGVtcy5jb3VudGVyKSk7XG4gICAgICAgIGl0ZW1zLmNvdW50ZXIgPSBpdGVtcy5jb3VudGVyICsgMTtcbiAgICAgIH1cblxuICAgICAgLy/jg4Djgqbjg7Pjg63jg7zjg4njga7jgZ/jgoHjga4gYSDjgr/jgrDjgpLkvZzmiJBcbiAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbiAgICAgIC8vYSDjgr/jgrDjgasgZG93bmxvYWQg5bGe5oCn44KS44K744OD44OIXG4gICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCBmaWxlbmFtZS5nZXRGaWxlTmFtZShpdGVtcy50aXRsZSkrJy5wbmcnKTtcblxuICAgICAgLy/jg6rjg7Pjgq/lhYjjgasgc3JjIOOBruWApOOCkuS7lei+vOOCgFxuICAgICAgbGluay5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB0eXBlb2YgcXVlcnkucXVlcmllcy5zcmMgPT09ICdzdHJpbmcnID8gcXVlcnkucXVlcmllcy5zcmMgOiAnJyk7XG5cbiAgICAgIC8v44Kv44Oq44OD44Kv44Kk44OZ44Oz44OI44KS55m654GrXG4gICAgICBsaW5rLmRpc3BhdGNoRXZlbnQobmV3IE1vdXNlRXZlbnQoJ2NsaWNrJykpO1xuXG4gICAgICAvL2NvdW50ZXIg44Gu44Kk44Oz44Kv44Oq44Oh44Oz44OIXG4gICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7Y291bnRlcjogaXRlbXMuY291bnRlcn0sICgpID0+IHtcbiAgICAgICAgd2luZG93LmNsb3NlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBlbHNlIHtcbiAgICAvL+OCpuOCo+ODs+ODieOCpuOCkumWieOBmOOCi1xuICAgIHdpbmRvdy5jbG9zZSgpO1xuICB9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=