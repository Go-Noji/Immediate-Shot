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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFBWTtBQUNMLE1BQU0sYUFBYSxHQUFXLFNBQVMsQ0FBQztBQUUvQyxVQUFVO0FBQ0gsTUFBTSxhQUFhLEdBQVcsV0FBVyxDQUFDO0FBRWpELGdDQUFnQztBQUN6QixNQUFNLFdBQVcsR0FBWSxLQUFLLENBQUM7QUFFMUMsV0FBVztBQUNKLE1BQU0sZUFBZSxHQUFXLENBQUMsQ0FBQztBQUV6QyxnQ0FBZ0M7QUFDekIsTUFBTSx5QkFBeUIsR0FBVyxFQUFFLENBQUM7QUFFcEQsb0RBQW9EO0FBQzdDLE1BQU0s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QUFDO1FBRXhELE1BQU07UUFDTixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDOUQsWUFBWTtZQUNaLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFL0IsbUJBQW1CO1lBQ25CLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtnQkFDbkIsU0FBUzthQUNWO1lBRUQsaUJBQWlCO1lBQ2pCLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFNUMsd0JBQXdCO1lBQ3hCLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtnQkFDaEIsU0FBUzthQUNWO1lBRUQsUUFBUTtZQUNSLE1BQU0sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZEO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsU0FBUztJQUNULFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUMvRCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdDLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtRQUNqQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO0tBQzlDO0lBRUQsYUFBYTtJQUNiLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsQ0FBQztDQUN4RCIsImZpbGUiOiJvcHRpb25zLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL29wdGlvbnMudHNcIik7XG4iLCIvL+OCreODo+ODl+ODgeODo+evhOWbsuWIneacn+WApFxuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkFOR0U6IHN0cmluZyA9ICdwZXJmZWN0JztcblxuLy/jgr/jgqTjg4jjg6vlkI3liJ3mnJ/lgKRcbmV4cG9ydCBjb25zdCBERUZBVUxUX1RJVExFOiBzdHJpbmcgPSAne3t0aXRsZX19JztcblxuLy/jgrXjgqTjg4jjga7jg57jg4Pjgq/jgrnlgKTjgpLnlLvpnaLluYXjgaDjgZHjgaflj5bjgovjgYvjgIHlhajopoHntKDjgYvjgonlj5blvpfjgZnjgovjgYtcbmV4cG9ydCBjb25zdCBERUZBVUxUX01BWDogYm9vbGVhbiA9IGZhbHNlO1xuXG4vL+OCq+OCpuODs+ODiOWkieaVsOWIneacn+WApFxuZXhwb3J0IGNvbnN0IERFRkFVTFRfQ09VTlRFUjogbnVtYmVyID0gMTtcblxuLy/opIfmlbDmnprjgq3jg6Pjg5fjg4Hjg6Pjga7pmpvjgIHmrKHjga7jgq3jg6Pjg5fjg4Hjg6Pjgb7jgafkvZXjg5/jg6rnp5LplpPpmpTjgpLnva7jgY/jgYtcbmV4cG9ydCBjb25zdCBDQVBUVVJFX1dBSVRfTUlMTElTRUNPTkRTOiBudW1iZXIgPSAyMDtcblxuLy9DQVBUVVJFX1dBSVRfTUlMTElTRUNPTkRTIOOBjOS9v+OCj+OCjOOCi+mam+OAgeacgOWIneOBruS4gOWbnuOBoOOBkeOBr+OBk+OBruWApOOBjOS9v+eUqOOBleOCjOOCi1xuZXhwb3J0IGNvbnN0IEZJUlNUX0NBUFRVUkVfV0FJVF9NSUxMSVNFQ09ORFM6IG51bWJlciA9IDEwMDtcbiIsImltcG9ydCB7REVGQVVMVF9DT1VOVEVSLCBERUZBVUxUX01BWCwgREVGQVVMVF9SQU5HRSwgREVGQVVMVF9USVRMRX0gZnJvbSBcIi4vY29uZmlnXCI7XG5cbi8v6Kit5a6a6aCF55uuXG4vL3JhbmdlOiAnZnVsbCcg44GLICdkaXNwbGF5JywgJ3BlcmZlY3QnLiAg44OH44OV44Kp44Or44OI5YCk44GvICdmdWxsJ1xuLy90aXRsZTog44OA44Km44Oz44Ot44O844OJ44GZ44KL44OV44Kh44Kk44Or5ZCN44GMLCDjgZPjgZPjgavku5XovrzjgpPjgaDmloflrZfliJcrJy5wbmcnIOOBq+OBquOCiyDjg4bjg7Pjg5fjg6zjg7zjg4jlpInmlbDjgpLlhaXjgozjgovjgZPjgajjgoLlj6/og70g44OH44OV44Kp44Or44OI44GvIHt7dGl0bGV9fVxuLy9jb3VudGVyOiDkuIroqJggdGl0bGUg44GrIHt7Y291bnRlcn19IOOBp+S7lei+vOOCgeOCi+OCq+OCpuODs+OCv+ODvOOBruaVsOWApFxuLy9tYXg6IHRydWUg44Gr6Kit5a6a44GX44Gm44GC44KL44Go55S76Z2i44Gu5bmF44O76auY44GV44KS5Y+W5b6X44GZ44KL5pmC44Gr5YWo6KaB57Sg44KS44OB44Kn44OD44Kv44GZ44KLXG4vL+ODhuODs+ODl+ODrOODvOODiOWkieaVsFxuLy97e3RpdGxlfX06IOOCv+OCpOODiOODq+OCv+OCsOOBruWGheWuuVxuLy97e3VybH19OiB1cmwg44Gu5YaF5a65XG4vL3t7Y291bnRlcn19OiBjb3VudGVyIOOBruWGheWuuVxue1xuICAvKipcbiAgICogdGFyZ2V0IOOBryB2YWx1ZSDlgKTjgpLmjIHjgaPjgabjgYTjgovjgYvliKTlrppcbiAgICogQHBhcmFtIHRhcmdldFxuICAgKi9cbiAgY29uc3QgaXNIVE1MSW5wdXRFbGVtZW50ID0gKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIEhUTUxJbnB1dEVsZW1lbnQgPT4ge1xuICAgIHJldHVybiB0YXJnZXQgIT09IG51bGwgJiYgdGFyZ2V0LnZhbHVlICE9PSB1bmRlZmluZWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIHRhcmdldCDjga/jg6njgrjjgqrjg5zjgr/jg7PjgYvliKTlrppcbiAgICogQHBhcmFtIHRhcmdldFxuICAgKi9cbiAgY29uc3QgaXNIVE1MUmFkaW9JbnB1dEVsZW1lbnQgPSAodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgSFRNTElucHV0RWxlbWVudCAgPT4ge1xuICAgIHJldHVybiB0YXJnZXQgIT09IG51bGwgJiYgdGFyZ2V0LnR5cGUgPT09ICdyYWRpbycgJiYgdGFyZ2V0LmNoZWNrZWQgIT09IHVuZGVmaW5lZDtcbiAgfTtcblxuICAvKipcbiAgICogdGFyZ2V0IOOBr+ODgeOCp+ODg+OCr+ODnOODg+OCr+OCueOBi+WIpOWumlxuICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAqL1xuICBjb25zdCBpc0hUTUxDaGVja2JveElucHV0RWxlbWVudCA9ICh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBIVE1MSW5wdXRFbGVtZW50ICA9PiB7XG4gICAgcmV0dXJuIHRhcmdldCAhPT0gbnVsbCAmJiB0YXJnZXQudHlwZSA9PT0gJ2NoZWNrYm94JyAmJiB0YXJnZXQuY2hlY2tlZCAhPT0gdW5kZWZpbmVkO1xuICB9O1xuXG4gIC8qKlxuICAgKiBpZCDlsZ7mgKfjgYwgaWQg44Gu6KaB57Sg44GM5oyB44GkIHZhbHVlIOWApOOCkui/lOOBmVxuICAgKiB2YWx1ZSDlgKTjgYzlrZjlnKjjgZfjgarjgYvjgaPjgZ/loLTlkIjjga/nqbrmloflrZfjgpLov5TjgZlcbiAgICogQHBhcmFtIGlkXG4gICAqL1xuICBjb25zdCBnZXRWYWx1ZSA9IChpZDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAvL2lkIOOBp+aNleaNiVxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblxuICAgIC8vRE9NIOOBjOWFpeWKm+ashOOBp+OBquOBi+OBo+OBn+OCieepuuaWh+Wtl+OCkui/lOOBmVxuICAgIGlmICggISBpc0hUTUxJbnB1dEVsZW1lbnQodGFyZ2V0KSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIC8vdmFsdWUg44KS44Gd44Gu44G+44G+6L+U44GZXG4gICAgcmV0dXJuIHRhcmdldC52YWx1ZTtcbiAgfTtcblxuICAvKipcbiAgICogaWQg5bGe5oCn44GMIGlkIOOBruimgee0oOOBjOaMgeOBpCB2YWx1ZSDlsZ7mgKfjgpIgdmFsdWUg44Gr44GZ44KLXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIGNvbnN0IHNldFZhbHVlID0gKGlkOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAvL2lkIOOBp+aNleaNiVxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblxuICAgIC8vRE9NIOOBjOWFpeWKm+ashOOBp+OBquOBi+OBo+OBn+OCieOBquOBq+OCguOBl+OBquOBhFxuICAgIGlmICggISBpc0hUTUxJbnB1dEVsZW1lbnQodGFyZ2V0KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8v44K744OD44OIXG4gICAgdGFyZ2V0LnZhbHVlID0gdmFsdWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIGlkIOWxnuaAp+OBjCBpZCDjga7opoHntKDjgYzjg6njgrjjgqrjg5zjgr/jg7PjgYvjgaTjgIHjg4Hjgqfjg4Pjgq/jgZXjgozjgabjgYTjgovjgYvliKTlrppcbiAgICogQHBhcmFtIGlkXG4gICAqL1xuICBjb25zdCBpc0NoZWNrZWRSYWRpbyA9IChpZDogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gICAgLy9pZCDjgafmjZXmjYlcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG5cbiAgICAvL0RPTSDjgYzjg6njgrjjgqrjg5zjgr/jg7PjgafjgarjgYvjgaPjgZ/jgonlpLHmlZdcbiAgICBpZiAoICEgaXNIVE1MUmFkaW9JbnB1dEVsZW1lbnQodGFyZ2V0KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vY2hlY2tlZCDjgpLjgZ3jga7jgb7jgb7ov5TjgZlcbiAgICByZXR1cm4gdGFyZ2V0LmNoZWNrZWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIGlkIOWxnuaAp+OBjCBpZCDjga7opoHntKDjgYzjg6njgrjjgqrjg5zjgr/jg7PjgpLjg4Hjgqfjg4Pjgq/nirbmhYvjgavjgZnjgotcbiAgICogQHBhcmFtIGlkXG4gICAqL1xuICBjb25zdCBzZXRDaGVja2VkUmFkaW8gPSAoaWQ6IHN0cmluZykgPT4ge1xuICAgIC8vaWQg44Gn5o2V5o2JXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuXG4gICAgLy9ET00g44GM44Op44K444Kq44Oc44K/44Oz44Gn44Gq44GL44Gj44Gf44KJ44Gq44Gr44KC44GX44Gq44GEXG4gICAgaWYgKCAhIGlzSFRNTFJhZGlvSW5wdXRFbGVtZW50KHRhcmdldCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvL+ODgeOCp+ODg+OCr1xuICAgIHRhcmdldC5jaGVja2VkID0gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICogaWQg5bGe5oCn44GMIGlkIOOBruimgee0oOOBjOODgeOCp+ODg+OCr+ODnOODg+OCr+OCueOBi+OBpOOAgeODgeOCp+ODg+OCr+OBleOCjOOBpuOBhOOCi+OBi+WIpOWumlxuICAgKiBAcGFyYW0gaWRcbiAgICovXG4gIGNvbnN0IGlzQ2hlY2tlZENoZWNrYm94ID0gKGlkOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICAvL2lkIOOBp+aNleaNiVxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblxuICAgIC8vRE9NIOOBjOODqeOCuOOCquODnOOCv+ODs+OBp+OBquOBi+OBo+OBn+OCieWkseaVl1xuICAgIGlmICggISBpc0hUTUxDaGVja2JveElucHV0RWxlbWVudCh0YXJnZXQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy9jaGVja2VkIOOCkuOBneOBruOBvuOBvui/lOOBmVxuICAgIHJldHVybiB0YXJnZXQuY2hlY2tlZDtcbiAgfTtcblxuICAvKipcbiAgICogaWQg5bGe5oCn44GMIGlkIOOBruODgeOCp+ODg+OCr+ODnOODg+OCr+OCueimgee0oOOCkuODgeOCp+ODg+OCr+eKtuaFi+OBq+OBmeOCi1xuICAgKiBAcGFyYW0gaWRcbiAgICovXG4gIGNvbnN0IHNldENoZWNrZWRDaGVja2JveCA9IChpZDogc3RyaW5nLCBjaGVja2VkOiBib29sZWFuID0gdHJ1ZSkgPT4ge1xuICAgIC8vaWQg44Gn5o2V5o2JXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuXG4gICAgLy9ET00g44GM44Op44K444Kq44Oc44K/44Oz44Gn44Gq44GL44Gj44Gf44KJ44Gq44Gr44KC44GX44Gq44GEXG4gICAgaWYgKCAhIGlzSFRNTENoZWNrYm94SW5wdXRFbGVtZW50KHRhcmdldCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvL+ODgeOCp+ODg+OCr1xuICAgIHRhcmdldC5jaGVja2VkID0gY2hlY2tlZDtcbiAgfTtcblxuICAvKipcbiAgICog5L+d5a2YXG4gICAqL1xuICBjb25zdCBzYXZlX29wdGlvbnMgPSAoKSA9PiB7XG4gICAgLy/oqK3lrprjga7lj5blvpcocmFuZ2UpXG4gICAgbGV0IHJhbmdlID0gJ2Z1bGwnO1xuICAgIGlmIChpc0NoZWNrZWRSYWRpbygnZGlzcGxheScpKSB7XG4gICAgICByYW5nZSA9ICdkaXNwbGF5JztcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNDaGVja2VkUmFkaW8oJ3BlcmZlY3QnKSkge1xuICAgICAgcmFuZ2UgPSAncGVyZmVjdCc7XG4gICAgfVxuXG4gICAgLy/oqK3lrprjga7lj5blvpcodGl0bGUpXG4gICAgY29uc3QgdGl0bGUgPSBnZXRWYWx1ZSgndGl0bGUnKTtcblxuICAgIC8v6Kit5a6a44Gu5Y+W5b6XKGNvdW50ZXIpXG4gICAgY29uc3QgY291bnRlciA9IE51bWJlcihnZXRWYWx1ZSgnY291bnRlcicpKTtcblxuICAgIC8v6Kit5a6a44Gu5Y+W5b6XKG1heClcbiAgICBjb25zdCBtYXggPSBpc0NoZWNrZWRDaGVja2JveCgnbWF4Jyk7XG5cbiAgICAvL+S/neWtmFxuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtyYW5nZSwgdGl0bGUsIGNvdW50ZXIsIG1heH0sICgpID0+IHtcbiAgICAgIGNvbnN0IHN0YXR1cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGF0dXMnKTtcbiAgICAgIGlmIChzdGF0dXMgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc3RhdHVzLnRleHRDb250ZW50ID0gY2hyb21lLmkxOG4uZ2V0TWVzc2FnZSgnbXNnX3NhdmVkJyk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc3RhdHVzLnRleHRDb250ZW50ID0gJyc7XG4gICAgICB9LCA3NTApO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiDoqq3jgb/lj5bjgopcbiAgICovXG4gIGNvbnN0IHJlc3RvcmVfb3B0aW9ucyA9ICgpID0+IHtcbiAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldCh7XG4gICAgICByYW5nZTogREVGQVVMVF9SQU5HRSxcbiAgICAgIHRpdGxlOiBERUZBVUxUX1RJVExFLFxuICAgICAgY291bnRlcjogREVGQVVMVF9DT1VOVEVSLFxuICAgICAgbWF4OiBERUZBVUxUX01BWFxuICAgIH0sIChpdGVtczoge1trZXk6IHN0cmluZ106IHN0cmluZ30pID0+IHtcbiAgICAgIHNldENoZWNrZWRSYWRpbyhpdGVtcy5yYW5nZSk7XG4gICAgICBzZXRWYWx1ZSgndGl0bGUnLCBpdGVtcy50aXRsZSk7XG4gICAgICBzZXRWYWx1ZSgnY291bnRlcicsIFN0cmluZyhpdGVtcy5jb3VudGVyKSk7XG4gICAgICBzZXRDaGVja2VkQ2hlY2tib3goJ21heCcsIEJvb2xlYW4oaXRlbXMubWF4KSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIGxhbmcg44Kv44Op44K544KS5oyB44Gj44Gf6KaB57Sg44GuICdtc2dfJyArIGRhdGEta2V55bGe5oCnIOOBi+OCieiogOiqnuODoeODg+OCu+ODvOOCuOOCkuWPluW+l+OBl+OAgeimgee0oOOBruODhuOCreOCueODiOOCkuWkieabtOOBmeOCi1xuICAgKi9cbiAgY29uc3Qgc2V0TGFuZyA9ICgpID0+IHtcbiAgICAvL+ODhuOCreOCueODiOWkieaPm+WvvuixoeOBruWPluW+l1xuICAgIGNvbnN0IHRhcmdldHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsYW5nJyk7XG5cbiAgICAvL+WkieaPm+WHpueQhlxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSB0YXJnZXRzLmxlbmd0aDsgaSA8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XG4gICAgICAvL+WvvuixoeOCkuS4gOaXpuWkieaVsOOBuOaMv+WFpVxuICAgICAgY29uc3QgdGFyZ2V0ID0gdGFyZ2V0cy5pdGVtKGkpO1xuXG4gICAgICAvL+WvvuixoeOBjOWtmOWcqOOBl+OBquOBi+OBo+OBn+OCieOBquOBq+OCguOBl+OBquOBhFxuICAgICAgaWYgKHRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy/jg6Hjg4Pjgrvjg7zjgrjjgq3jg7zjgpLkuIDml6blpInmlbDjgbjmjL/lhaVcbiAgICAgIGNvbnN0IGtleSA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5Jyk7XG5cbiAgICAgIC8v44Oh44OD44K744O844K444Kt44O844GM5a2Y5Zyo44GX44Gq44GL44Gj44Gf44KJ44Gq44Gr44KC44GX44Gq44GEXG4gICAgICBpZiAoa2V5ID09PSBudWxsKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvL+ODhuOCreOCueODiOioreWumlxuICAgICAgdGFyZ2V0LmlubmVySFRNTCA9IGNocm9tZS5pMThuLmdldE1lc3NhZ2UoJ21zZ18nK2tleSk7XG4gICAgfVxuICB9O1xuXG4gIC8v44Kk44OZ44Oz44OI44Gu55m76YyyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCByZXN0b3JlX29wdGlvbnMpO1xuICBjb25zdCBzYXZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmUnKTtcbiAgaWYgKHNhdmUgIT09IG51bGwpIHtcbiAgICBzYXZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2F2ZV9vcHRpb25zKTtcbiAgfVxuXG4gIC8v6KiA6Kqe44GU44Go44Gr44OG44Kt44K544OI6Kit5a6aXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzZXRMYW5nKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=