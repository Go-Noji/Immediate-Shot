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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/options.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/*! exports provided: DEFAULT_RANGE, DEFAULT_TITLE, DEFAULT_MAX, DEFAULT_COUNTER, CAPTURE_WAIT_MILLISECONDS, FIRST_CAPTURE_WAIT_MILLISECONDS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_RANGE", function() { return DEFAULT_RANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_TITLE", function() { return DEFAULT_TITLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_MAX", function() { return DEFAULT_MAX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_COUNTER", function() { return DEFAULT_COUNTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CAPTURE_WAIT_MILLISECONDS", function() { return CAPTURE_WAIT_MILLISECONDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FIRST_CAPTURE_WAIT_MILLISECONDS", function() { return FIRST_CAPTURE_WAIT_MILLISECONDS; });
//キャプチャ範囲初期値
const DEFAULT_RANGE = 'perfect';
//タイトル名初期値
const DEFAULT_TITLE = '{{title}}';
//サイトのマックス値を画面幅だけで取るか、全要素から取得するか
const DEFAULT_MAX = false;
//カウント変数初期値
const DEFAULT_COUNTER = 1;
//複数枚キャプチャの際、次のキャプチャまで何ミリ秒間隔を置くか
const CAPTURE_WAIT_MILLISECONDS = 20;
//CAPTURE_WAIT_MILLISECONDS が使われる際、最初の一回だけはこの値が使用される
const FIRST_CAPTURE_WAIT_MILLISECONDS = 100;


/***/ }),

/***/ "./src/options.ts":
/*!************************!*\
  !*** ./src/options.ts ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./src/config.ts");

//設定項目
//range: 'full' か 'display', 'perfect'.  デフォルト値は 'full'
//title: ダウンロードするファイル名が, ここに仕込んだ文字列+'.png' になる テンプレート変数を入れることも可能 デフォルトは {{title}}
//counter: 上記 title に {{counter}} で仕込めるカウンターの数値
//max: true に設定してあると画面の幅・高さを取得する時に全要素をチェックする
//テンプレート変数
//{{title}}: タイトルタグの内容
//{{url}}: url の内容
//{{counter}}: counter の内容
{
    /**
     * target は value 値を持っているか判定
     * @param target
     */
    const isHTMLInputElement = (target) => {
        return target !== null && target.value !== undefined;
    };
    /**
     * target はラジオボタンか判定
     * @param target
     */
    const isHTMLRadioInputElement = (target) => {
        return target !== null && target.type === 'radio' && target.checked !== undefined;
    };
    /**
     * target はチェックボックスか判定
     * @param target
     */
    const isHTMLCheckboxInputElement = (target) => {
        return target !== null && target.type === 'checkbox' && target.checked !== undefined;
    };
    /**
     * id 属性が id の要素が持つ value 値を返す
     * value 値が存在しなかった場合は空文字を返す
     * @param id
     */
    const getValue = (id) => {
        //id で捕捉
        const target = document.getElementById(id);
        //DOM が入力欄でなかったら空文字を返す
        if (!isHTMLInputElement(target)) {
            return '';
        }
        //value をそのまま返す
        return target.value;
    };
    /**
     * id 属性が id の要素が持つ value 属性を value にする
     * @param id
     * @param value
     */
    const setValue = (id, value) => {
        //id で捕捉
        const target = document.getElementById(id);
        //DOM が入力欄でなかったらなにもしない
        if (!isHTMLInputElement(target)) {
            return;
        }
        //セット
        target.value = value;
    };
    /**
     * id 属性が id の要素がラジオボタンかつ、チェックされているか判定
     * @param id
     */
    const isCheckedRadio = (id) => {
        //id で捕捉
        const target = document.getElementById(id);
        //DOM がラジオボタンでなかったら失敗
        if (!isHTMLRadioInputElement(target)) {
            return false;
        }
        //checked をそのまま返す
        return target.checked;
    };
    /**
     * id 属性が id の要素がラジオボタンをチェック状態にする
     * @param id
     */
    const setCheckedRadio = (id) => {
        //id で捕捉
        const target = document.getElementById(id);
        //DOM がラジオボタンでなかったらなにもしない
        if (!isHTMLRadioInputElement(target)) {
            return false;
        }
        //チェック
        target.checked = true;
    };
    /**
     * id 属性が id の要素がチェックボックスかつ、チェックされているか判定
     * @param id
     */
    const isCheckedCheckbox = (id) => {
        //id で捕捉
        const target = document.getElementById(id);
        //DOM がラジオボタンでなかったら失敗
        if (!isHTMLCheckboxInputElement(target)) {
            return false;
        }
        //checked をそのまま返す
        return target.checked;
    };
    /**
     * id 属性が id のチェックボックス要素をチェック状態にする
     * @param id
     */
    const setCheckedCheckbox = (id, checked = true) => {
        //id で捕捉
        const target = document.getElementById(id);
        //DOM がラジオボタンでなかったらなにもしない
        if (!isHTMLCheckboxInputElement(target)) {
            return false;
        }
        //チェック
        target.checked = checked;
    };
    /**
     * 保存
     */
    const save_options = () => {
        //設定の取得(range)
        let range = 'full';
        if (isCheckedRadio('display')) {
            range = 'display';
        }
        else if (isCheckedRadio('perfect')) {
            range = 'perfect';
        }
        //設定の取得(title)
        const title = getValue('title');
        //設定の取得(counter)
        const counter = Number(getValue('counter'));
        //設定の取得(max)
        const max = isCheckedCheckbox('max');
        //保存
        chrome.storage.sync.set({ range, title, counter, max }, () => {
            const status = document.getElementById('status');
            if (status === null) {
                return;
            }
            status.textContent = chrome.i18n.getMessage('msg_saved');
            setTimeout(() => {
                status.textContent = '';
            }, 750);
        });
    };
    /**
     * 読み取り
     */
    const restore_options = () => {
        chrome.storage.sync.get({
            range: _config__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_RANGE"],
            title: _config__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_TITLE"],
            counter: _config__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_COUNTER"],
            max: _config__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_MAX"]
        }, (items) => {
            setCheckedRadio(items.range);
            setValue('title', items.title);
            setValue('counter', String(items.counter));
            setCheckedCheckbox('max', Boolean(items.max));
        });
    };
    /**
     * lang クラスを持った要素の 'msg_' + data-key属性 から言語メッセージを取得し、要素のテキストを変更する
     */
    const setLang = () => {
        //テキスト変換対象の取得
        const targets = document.getElementsByClassName('lang');
        //変換処理
        for (let i = 0, max = targets.length; i < max; i = (i + 1) | 0) {
            //対象を一旦変数へ挿入
            const target = targets.item(i);
            //対象が存在しなかったらなにもしない
            if (target === null) {
                continue;
            }
            //メッセージキーを一旦変数へ挿入
            const key = target.getAttribute('data-key');
            //メッセージキーが存在しなかったらなにもしない
            if (key === null) {
                continue;
            }
            //テキスト設定
            target.innerHTML = chrome.i18n.getMessage('msg_' + key);
        }
    };
    //イベントの登録
    document.addEventListener('DOMContentLoaded', restore_options);
    const save = document.getElementById('save');
    if (save !== null) {
        save.addEventListener('click', save_options);
    }
    //言語ごとにテキスト設定
    document.addEventListener('DOMContentLoaded', setLang);
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFBWTtBQUNMLE1BQU0sYUFBYSxHQUFXLFNBQVMsQ0FBQztBQUUvQyxVQUFVO0FBQ0gsTUFBTSxhQUFhLEdBQVcsV0FBVyxDQUFDO0FBRWpELGdDQUFnQztBQUN6QixNQUFNLFdBQVcsR0FBWSxLQUFLLENBQUM7QUFFMUMsV0FBVztBQUNKLE1BQU0sZUFBZSxHQUFXLENBQUMsQ0FBQztBQUV6QyxnQ0FBZ0M7QUFDekIsTUFBTSx5QkFBeUIsR0FBVyxFQUFFLENBQUM7QUFFcEQsb0RBQW9EO0FBQzdDLE1BQU0s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QUFDO1FBRXhELE1BQU07UUFDTixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDOUQsWUFBWTtZQUNaLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFL0IsbUJBQW1CO1lBQ25CLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtnQkFDbkIsU0FBUzthQUNWO1lBRUQsaUJBQWlCO1lBQ2pCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFNUMsd0JBQXdCO1lBQ3hCLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtnQkFDaEIsU0FBUzthQUNWO1lBRUQsUUFBUTtZQUNSLE1BQU0sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZEO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsU0FBUztJQUNULFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUMvRCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdDLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtRQUNqQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO0tBQzlDO0lBRUQsYUFBYTtJQUNiLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsQ0FBQztDQUN4RCIsImZpbGUiOiJvcHRpb25zLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL29wdGlvbnMudHNcIik7XG4iLCIvL+OCreODo+ODl+ODgeODo+evhOWbsuWIneacn+WApFxyXG5leHBvcnQgY29uc3QgREVGQVVMVF9SQU5HRTogc3RyaW5nID0gJ3BlcmZlY3QnO1xyXG5cclxuLy/jgr/jgqTjg4jjg6vlkI3liJ3mnJ/lgKRcclxuZXhwb3J0IGNvbnN0IERFRkFVTFRfVElUTEU6IHN0cmluZyA9ICd7e3RpdGxlfX0nO1xyXG5cclxuLy/jgrXjgqTjg4jjga7jg57jg4Pjgq/jgrnlgKTjgpLnlLvpnaLluYXjgaDjgZHjgaflj5bjgovjgYvjgIHlhajopoHntKDjgYvjgonlj5blvpfjgZnjgovjgYtcclxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTUFYOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4vL+OCq+OCpuODs+ODiOWkieaVsOWIneacn+WApFxyXG5leHBvcnQgY29uc3QgREVGQVVMVF9DT1VOVEVSOiBudW1iZXIgPSAxO1xyXG5cclxuLy/opIfmlbDmnprjgq3jg6Pjg5fjg4Hjg6Pjga7pmpvjgIHmrKHjga7jgq3jg6Pjg5fjg4Hjg6Pjgb7jgafkvZXjg5/jg6rnp5LplpPpmpTjgpLnva7jgY/jgYtcclxuZXhwb3J0IGNvbnN0IENBUFRVUkVfV0FJVF9NSUxMSVNFQ09ORFM6IG51bWJlciA9IDIwO1xyXG5cclxuLy9DQVBUVVJFX1dBSVRfTUlMTElTRUNPTkRTIOOBjOS9v+OCj+OCjOOCi+mam+OAgeacgOWIneOBruS4gOWbnuOBoOOBkeOBr+OBk+OBruWApOOBjOS9v+eUqOOBleOCjOOCi1xyXG5leHBvcnQgY29uc3QgRklSU1RfQ0FQVFVSRV9XQUlUX01JTExJU0VDT05EUzogbnVtYmVyID0gMTAwO1xyXG4iLCJpbXBvcnQge0RFRkFVTFRfQ09VTlRFUiwgREVGQVVMVF9NQVgsIERFRkFVTFRfUkFOR0UsIERFRkFVTFRfVElUTEV9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5cclxuLy/oqK3lrprpoIXnm65cclxuLy9yYW5nZTogJ2Z1bGwnIOOBiyAnZGlzcGxheScsICdwZXJmZWN0Jy4gIOODh+ODleOCqeODq+ODiOWApOOBryAnZnVsbCdcclxuLy90aXRsZTog44OA44Km44Oz44Ot44O844OJ44GZ44KL44OV44Kh44Kk44Or5ZCN44GMLCDjgZPjgZPjgavku5XovrzjgpPjgaDmloflrZfliJcrJy5wbmcnIOOBq+OBquOCiyDjg4bjg7Pjg5fjg6zjg7zjg4jlpInmlbDjgpLlhaXjgozjgovjgZPjgajjgoLlj6/og70g44OH44OV44Kp44Or44OI44GvIHt7dGl0bGV9fVxyXG4vL2NvdW50ZXI6IOS4iuiomCB0aXRsZSDjgasge3tjb3VudGVyfX0g44Gn5LuV6L6844KB44KL44Kr44Km44Oz44K/44O844Gu5pWw5YCkXHJcbi8vbWF4OiB0cnVlIOOBq+ioreWumuOBl+OBpuOBguOCi+OBqOeUu+mdouOBruW5heODu+mrmOOBleOCkuWPluW+l+OBmeOCi+aZguOBq+WFqOimgee0oOOCkuODgeOCp+ODg+OCr+OBmeOCi1xyXG4vL+ODhuODs+ODl+ODrOODvOODiOWkieaVsFxyXG4vL3t7dGl0bGV9fTog44K/44Kk44OI44Or44K/44Kw44Gu5YaF5a65XHJcbi8ve3t1cmx9fTogdXJsIOOBruWGheWuuVxyXG4vL3t7Y291bnRlcn19OiBjb3VudGVyIOOBruWGheWuuVxyXG57XHJcbiAgLyoqXHJcbiAgICogdGFyZ2V0IOOBryB2YWx1ZSDlgKTjgpLmjIHjgaPjgabjgYTjgovjgYvliKTlrppcclxuICAgKiBAcGFyYW0gdGFyZ2V0XHJcbiAgICovXHJcbiAgY29uc3QgaXNIVE1MSW5wdXRFbGVtZW50ID0gKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIEhUTUxJbnB1dEVsZW1lbnQgPT4ge1xyXG4gICAgcmV0dXJuIHRhcmdldCAhPT0gbnVsbCAmJiB0YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZDtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiB0YXJnZXQg44Gv44Op44K444Kq44Oc44K/44Oz44GL5Yik5a6aXHJcbiAgICogQHBhcmFtIHRhcmdldFxyXG4gICAqL1xyXG4gIGNvbnN0IGlzSFRNTFJhZGlvSW5wdXRFbGVtZW50ID0gKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIEhUTUxJbnB1dEVsZW1lbnQgID0+IHtcclxuICAgIHJldHVybiB0YXJnZXQgIT09IG51bGwgJiYgdGFyZ2V0LnR5cGUgPT09ICdyYWRpbycgJiYgdGFyZ2V0LmNoZWNrZWQgIT09IHVuZGVmaW5lZDtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiB0YXJnZXQg44Gv44OB44Kn44OD44Kv44Oc44OD44Kv44K544GL5Yik5a6aXHJcbiAgICogQHBhcmFtIHRhcmdldFxyXG4gICAqL1xyXG4gIGNvbnN0IGlzSFRNTENoZWNrYm94SW5wdXRFbGVtZW50ID0gKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIEhUTUxJbnB1dEVsZW1lbnQgID0+IHtcclxuICAgIHJldHVybiB0YXJnZXQgIT09IG51bGwgJiYgdGFyZ2V0LnR5cGUgPT09ICdjaGVja2JveCcgJiYgdGFyZ2V0LmNoZWNrZWQgIT09IHVuZGVmaW5lZDtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBpZCDlsZ7mgKfjgYwgaWQg44Gu6KaB57Sg44GM5oyB44GkIHZhbHVlIOWApOOCkui/lOOBmVxyXG4gICAqIHZhbHVlIOWApOOBjOWtmOWcqOOBl+OBquOBi+OBo+OBn+WgtOWQiOOBr+epuuaWh+Wtl+OCkui/lOOBmVxyXG4gICAqIEBwYXJhbSBpZFxyXG4gICAqL1xyXG4gIGNvbnN0IGdldFZhbHVlID0gKGlkOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gICAgLy9pZCDjgafmjZXmjYlcclxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHJcbiAgICAvL0RPTSDjgYzlhaXlipvmrITjgafjgarjgYvjgaPjgZ/jgonnqbrmloflrZfjgpLov5TjgZlcclxuICAgIGlmICggISBpc0hUTUxJbnB1dEVsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLy92YWx1ZSDjgpLjgZ3jga7jgb7jgb7ov5TjgZlcclxuICAgIHJldHVybiB0YXJnZXQudmFsdWU7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogaWQg5bGe5oCn44GMIGlkIOOBruimgee0oOOBjOaMgeOBpCB2YWx1ZSDlsZ7mgKfjgpIgdmFsdWUg44Gr44GZ44KLXHJcbiAgICogQHBhcmFtIGlkXHJcbiAgICogQHBhcmFtIHZhbHVlXHJcbiAgICovXHJcbiAgY29uc3Qgc2V0VmFsdWUgPSAoaWQ6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgLy9pZCDjgafmjZXmjYlcclxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHJcbiAgICAvL0RPTSDjgYzlhaXlipvmrITjgafjgarjgYvjgaPjgZ/jgonjgarjgavjgoLjgZfjgarjgYRcclxuICAgIGlmICggISBpc0hUTUxJbnB1dEVsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy/jgrvjg4Pjg4hcclxuICAgIHRhcmdldC52YWx1ZSA9IHZhbHVlO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIGlkIOWxnuaAp+OBjCBpZCDjga7opoHntKDjgYzjg6njgrjjgqrjg5zjgr/jg7PjgYvjgaTjgIHjg4Hjgqfjg4Pjgq/jgZXjgozjgabjgYTjgovjgYvliKTlrppcclxuICAgKiBAcGFyYW0gaWRcclxuICAgKi9cclxuICBjb25zdCBpc0NoZWNrZWRSYWRpbyA9IChpZDogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgICAvL2lkIOOBp+aNleaNiVxyXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG5cclxuICAgIC8vRE9NIOOBjOODqeOCuOOCquODnOOCv+ODs+OBp+OBquOBi+OBo+OBn+OCieWkseaVl1xyXG4gICAgaWYgKCAhIGlzSFRNTFJhZGlvSW5wdXRFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vY2hlY2tlZCDjgpLjgZ3jga7jgb7jgb7ov5TjgZlcclxuICAgIHJldHVybiB0YXJnZXQuY2hlY2tlZDtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBpZCDlsZ7mgKfjgYwgaWQg44Gu6KaB57Sg44GM44Op44K444Kq44Oc44K/44Oz44KS44OB44Kn44OD44Kv54q25oWL44Gr44GZ44KLXHJcbiAgICogQHBhcmFtIGlkXHJcbiAgICovXHJcbiAgY29uc3Qgc2V0Q2hlY2tlZFJhZGlvID0gKGlkOiBzdHJpbmcpID0+IHtcclxuICAgIC8vaWQg44Gn5o2V5o2JXHJcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcblxyXG4gICAgLy9ET00g44GM44Op44K444Kq44Oc44K/44Oz44Gn44Gq44GL44Gj44Gf44KJ44Gq44Gr44KC44GX44Gq44GEXHJcbiAgICBpZiAoICEgaXNIVE1MUmFkaW9JbnB1dEVsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy/jg4Hjgqfjg4Pjgq9cclxuICAgIHRhcmdldC5jaGVja2VkID0gdHJ1ZTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBpZCDlsZ7mgKfjgYwgaWQg44Gu6KaB57Sg44GM44OB44Kn44OD44Kv44Oc44OD44Kv44K544GL44Gk44CB44OB44Kn44OD44Kv44GV44KM44Gm44GE44KL44GL5Yik5a6aXHJcbiAgICogQHBhcmFtIGlkXHJcbiAgICovXHJcbiAgY29uc3QgaXNDaGVja2VkQ2hlY2tib3ggPSAoaWQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gICAgLy9pZCDjgafmjZXmjYlcclxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHJcbiAgICAvL0RPTSDjgYzjg6njgrjjgqrjg5zjgr/jg7PjgafjgarjgYvjgaPjgZ/jgonlpLHmlZdcclxuICAgIGlmICggISBpc0hUTUxDaGVja2JveElucHV0RWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NoZWNrZWQg44KS44Gd44Gu44G+44G+6L+U44GZXHJcbiAgICByZXR1cm4gdGFyZ2V0LmNoZWNrZWQ7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogaWQg5bGe5oCn44GMIGlkIOOBruODgeOCp+ODg+OCr+ODnOODg+OCr+OCueimgee0oOOCkuODgeOCp+ODg+OCr+eKtuaFi+OBq+OBmeOCi1xyXG4gICAqIEBwYXJhbSBpZFxyXG4gICAqL1xyXG4gIGNvbnN0IHNldENoZWNrZWRDaGVja2JveCA9IChpZDogc3RyaW5nLCBjaGVja2VkOiBib29sZWFuID0gdHJ1ZSkgPT4ge1xyXG4gICAgLy9pZCDjgafmjZXmjYlcclxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHJcbiAgICAvL0RPTSDjgYzjg6njgrjjgqrjg5zjgr/jg7PjgafjgarjgYvjgaPjgZ/jgonjgarjgavjgoLjgZfjgarjgYRcclxuICAgIGlmICggISBpc0hUTUxDaGVja2JveElucHV0RWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+ODgeOCp+ODg+OCr1xyXG4gICAgdGFyZ2V0LmNoZWNrZWQgPSBjaGVja2VkO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIOS/neWtmFxyXG4gICAqL1xyXG4gIGNvbnN0IHNhdmVfb3B0aW9ucyA9ICgpID0+IHtcclxuICAgIC8v6Kit5a6a44Gu5Y+W5b6XKHJhbmdlKVxyXG4gICAgbGV0IHJhbmdlID0gJ2Z1bGwnO1xyXG4gICAgaWYgKGlzQ2hlY2tlZFJhZGlvKCdkaXNwbGF5JykpIHtcclxuICAgICAgcmFuZ2UgPSAnZGlzcGxheSc7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpc0NoZWNrZWRSYWRpbygncGVyZmVjdCcpKSB7XHJcbiAgICAgIHJhbmdlID0gJ3BlcmZlY3QnO1xyXG4gICAgfVxyXG5cclxuICAgIC8v6Kit5a6a44Gu5Y+W5b6XKHRpdGxlKVxyXG4gICAgY29uc3QgdGl0bGUgPSBnZXRWYWx1ZSgndGl0bGUnKTtcclxuXHJcbiAgICAvL+ioreWumuOBruWPluW+lyhjb3VudGVyKVxyXG4gICAgY29uc3QgY291bnRlciA9IE51bWJlcihnZXRWYWx1ZSgnY291bnRlcicpKTtcclxuXHJcbiAgICAvL+ioreWumuOBruWPluW+lyhtYXgpXHJcbiAgICBjb25zdCBtYXggPSBpc0NoZWNrZWRDaGVja2JveCgnbWF4Jyk7XHJcblxyXG4gICAgLy/kv53lrZhcclxuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtyYW5nZSwgdGl0bGUsIGNvdW50ZXIsIG1heH0sICgpID0+IHtcclxuICAgICAgY29uc3Qgc3RhdHVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXR1cycpO1xyXG4gICAgICBpZiAoc3RhdHVzID09PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHN0YXR1cy50ZXh0Q29udGVudCA9IGNocm9tZS5pMThuLmdldE1lc3NhZ2UoJ21zZ19zYXZlZCcpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBzdGF0dXMudGV4dENvbnRlbnQgPSAnJztcclxuICAgICAgfSwgNzUwKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIOiqreOBv+WPluOCilxyXG4gICAqL1xyXG4gIGNvbnN0IHJlc3RvcmVfb3B0aW9ucyA9ICgpID0+IHtcclxuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KHtcclxuICAgICAgcmFuZ2U6IERFRkFVTFRfUkFOR0UsXHJcbiAgICAgIHRpdGxlOiBERUZBVUxUX1RJVExFLFxyXG4gICAgICBjb3VudGVyOiBERUZBVUxUX0NPVU5URVIsXHJcbiAgICAgIG1heDogREVGQVVMVF9NQVhcclxuICAgIH0sIChpdGVtczoge1trZXk6IHN0cmluZ106IHN0cmluZ30pID0+IHtcclxuICAgICAgc2V0Q2hlY2tlZFJhZGlvKGl0ZW1zLnJhbmdlKTtcclxuICAgICAgc2V0VmFsdWUoJ3RpdGxlJywgaXRlbXMudGl0bGUpO1xyXG4gICAgICBzZXRWYWx1ZSgnY291bnRlcicsIFN0cmluZyhpdGVtcy5jb3VudGVyKSk7XHJcbiAgICAgIHNldENoZWNrZWRDaGVja2JveCgnbWF4JywgQm9vbGVhbihpdGVtcy5tYXgpKTtcclxuICAgIH0pO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIGxhbmcg44Kv44Op44K544KS5oyB44Gj44Gf6KaB57Sg44GuICdtc2dfJyArIGRhdGEta2V55bGe5oCnIOOBi+OCieiogOiqnuODoeODg+OCu+ODvOOCuOOCkuWPluW+l+OBl+OAgeimgee0oOOBruODhuOCreOCueODiOOCkuWkieabtOOBmeOCi1xyXG4gICAqL1xyXG4gIGNvbnN0IHNldExhbmcgPSAoKSA9PiB7XHJcbiAgICAvL+ODhuOCreOCueODiOWkieaPm+WvvuixoeOBruWPluW+l1xyXG4gICAgY29uc3QgdGFyZ2V0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xhbmcnKTtcclxuXHJcbiAgICAvL+WkieaPm+WHpueQhlxyXG4gICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IHRhcmdldHMubGVuZ3RoOyBpIDwgbWF4OyBpID0gKGkgKyAxKSB8IDApIHtcclxuICAgICAgLy/lr77osaHjgpLkuIDml6blpInmlbDjgbjmjL/lhaVcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gdGFyZ2V0cy5pdGVtKGkpO1xyXG5cclxuICAgICAgLy/lr77osaHjgYzlrZjlnKjjgZfjgarjgYvjgaPjgZ/jgonjgarjgavjgoLjgZfjgarjgYRcclxuICAgICAgaWYgKHRhcmdldCA9PT0gbnVsbCkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvL+ODoeODg+OCu+ODvOOCuOOCreODvOOCkuS4gOaXpuWkieaVsOOBuOaMv+WFpVxyXG4gICAgICBjb25zdCBrZXkgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpO1xyXG5cclxuICAgICAgLy/jg6Hjg4Pjgrvjg7zjgrjjgq3jg7zjgYzlrZjlnKjjgZfjgarjgYvjgaPjgZ/jgonjgarjgavjgoLjgZfjgarjgYRcclxuICAgICAgaWYgKGtleSA9PT0gbnVsbCkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvL+ODhuOCreOCueODiOioreWumlxyXG4gICAgICB0YXJnZXQuaW5uZXJIVE1MID0gY2hyb21lLmkxOG4uZ2V0TWVzc2FnZSgnbXNnXycra2V5KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvL+OCpOODmeODs+ODiOOBrueZu+mMslxyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCByZXN0b3JlX29wdGlvbnMpO1xyXG4gIGNvbnN0IHNhdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2F2ZScpO1xyXG4gIGlmIChzYXZlICE9PSBudWxsKSB7XHJcbiAgICBzYXZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2F2ZV9vcHRpb25zKTtcclxuICB9XHJcblxyXG4gIC8v6KiA6Kqe44GU44Go44Gr44OG44Kt44K544OI6Kit5a6aXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHNldExhbmcpO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=