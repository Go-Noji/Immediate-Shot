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
/*! exports provided: DEFAULT_RANGE, DEFAULT_TITLE, DEFAULT_COUNTER, CAPTURE_WAIT_MILLISECONDS, FIRST_CAPTURE_WAIT_MILLISECONDS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_RANGE", function() { return DEFAULT_RANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_TITLE", function() { return DEFAULT_TITLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_COUNTER", function() { return DEFAULT_COUNTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CAPTURE_WAIT_MILLISECONDS", function() { return CAPTURE_WAIT_MILLISECONDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FIRST_CAPTURE_WAIT_MILLISECONDS", function() { return FIRST_CAPTURE_WAIT_MILLISECONDS; });
//キャプチャ範囲初期値
const DEFAULT_RANGE = 'perfect';
//タイトル名初期値
const DEFAULT_TITLE = '{{title}}';
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
    const isChecked = (id) => {
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
    const setChecked = (id) => {
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
     * 保存
     */
    const save_options = () => {
        //設定の取得(range)
        let range = 'full';
        if (isChecked('display')) {
            range = 'display';
        }
        else if (isChecked('perfect')) {
            range = 'perfect';
        }
        //設定の取得(title)
        const title = getValue('title');
        //設定の取得(counter)
        const counter = Number(getValue('counter'));
        //保存
        chrome.storage.sync.set({ range, title, counter }, () => {
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
            counter: _config__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_COUNTER"]
        }, (items) => {
            setChecked(items.range);
            setValue('title', items.title);
            setValue('counter', String(items.counter));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbmZpZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBQVk7QUFDTCxNQUFNLGFBQWEsR0FBVyxTQUFTLENBQUM7QUFFL0MsVUFBVTtBQUNILE1BQU0sYUFBYSxHQUFXLFdBQVcsQ0FBQztBQUVqRCxXQUFXO0FBQ0osTUFBTSxlQUFlLEdBQVcsQ0FBQyxDQUFDO0FBRXpDLGdDQUFnQztBQUN6QixNQUFNLHlCQUF5QixHQUFXLEVBQUUsQ0FBQztBQUVwRCxvREFBb0Q7QUFDN0MsTUFBTSwrQkFBK0IsR0FBVyxHQUFHLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNiM0Q7QUFBQTtBQUF1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SyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzlELFlBQVk7WUFDWixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRS9CLG1CQUFtQjtZQUNuQixJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7Z0JBQ25CLFNBQVM7YUFDVjtZQUVELGlCQUFpQjtZQUNqQixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTVDLHdCQUF3QjtZQUN4QixJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7Z0JBQ2hCLFNBQVM7YUFDVjtZQUVELFFBQVE7WUFDUixNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2RDtJQUNILENBQUMsQ0FBQztJQUVGLFNBQVM7SUFDVCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDL0QsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7UUFDakIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztLQUM5QztJQUVELGFBQWE7SUFDYixRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FDeEQiLCJmaWxlIjoib3B0aW9ucy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9vcHRpb25zLnRzXCIpO1xuIiwiLy/jgq3jg6Pjg5fjg4Hjg6Pnr4Tlm7LliJ3mnJ/lgKRcclxuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkFOR0U6IHN0cmluZyA9ICdwZXJmZWN0JztcclxuXHJcbi8v44K/44Kk44OI44Or5ZCN5Yid5pyf5YCkXHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX1RJVExFOiBzdHJpbmcgPSAne3t0aXRsZX19JztcclxuXHJcbi8v44Kr44Km44Oz44OI5aSJ5pWw5Yid5pyf5YCkXHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPVU5URVI6IG51bWJlciA9IDE7XHJcblxyXG4vL+ikh+aVsOaemuOCreODo+ODl+ODgeODo+OBrumam+OAgeasoeOBruOCreODo+ODl+ODgeODo+OBvuOBp+S9leODn+ODquenkumWk+malOOCkue9ruOBj+OBi1xyXG5leHBvcnQgY29uc3QgQ0FQVFVSRV9XQUlUX01JTExJU0VDT05EUzogbnVtYmVyID0gMjA7XHJcblxyXG4vL0NBUFRVUkVfV0FJVF9NSUxMSVNFQ09ORFMg44GM5L2/44KP44KM44KL6Zqb44CB5pyA5Yid44Gu5LiA5Zue44Gg44GR44Gv44GT44Gu5YCk44GM5L2/55So44GV44KM44KLXHJcbmV4cG9ydCBjb25zdCBGSVJTVF9DQVBUVVJFX1dBSVRfTUlMTElTRUNPTkRTOiBudW1iZXIgPSAxMDA7XHJcbiIsImltcG9ydCB7REVGQVVMVF9DT1VOVEVSLCBERUZBVUxUX1JBTkdFLCBERUZBVUxUX1RJVExFfSBmcm9tIFwiLi9jb25maWdcIjtcclxuXHJcbi8v6Kit5a6a6aCF55uuXHJcbi8vcmFuZ2U6ICdmdWxsJyDjgYsgJ2Rpc3BsYXknLCAncGVyZmVjdCcuICDjg4fjg5Xjgqnjg6vjg4jlgKTjga8gJ2Z1bGwnXHJcbi8vdGl0bGU6IOODgOOCpuODs+ODreODvOODieOBmeOCi+ODleOCoeOCpOODq+WQjeOBjCwg44GT44GT44Gr5LuV6L6844KT44Gg5paH5a2X5YiXKycucG5nJyDjgavjgarjgosg44OG44Oz44OX44Os44O844OI5aSJ5pWw44KS5YWl44KM44KL44GT44Go44KC5Y+v6IO9IOODh+ODleOCqeODq+ODiOOBryB7e3RpdGxlfX1cclxuLy9jb3VudGVyOiDkuIroqJggdGl0bGUg44GrIHt7Y291bnRlcn19IOOBp+S7lei+vOOCgeOCi+OCq+OCpuODs+OCv+ODvOOBruaVsOWApFxyXG4vL+ODhuODs+ODl+ODrOODvOODiOWkieaVsFxyXG4vL3t7dGl0bGV9fTog44K/44Kk44OI44Or44K/44Kw44Gu5YaF5a65XHJcbi8ve3t1cmx9fTogdXJsIOOBruWGheWuuVxyXG4vL3t7Y291bnRlcn19OiBjb3VudGVyIOOBruWGheWuuVxyXG57XHJcbiAgLyoqXHJcbiAgICogdGFyZ2V0IOOBryB2YWx1ZSDlgKTjgpLmjIHjgaPjgabjgYTjgovjgYvliKTlrppcclxuICAgKiBAcGFyYW0gdGFyZ2V0XHJcbiAgICovXHJcbiAgY29uc3QgaXNIVE1MSW5wdXRFbGVtZW50ID0gKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIEhUTUxJbnB1dEVsZW1lbnQgPT4ge1xyXG4gICAgcmV0dXJuIHRhcmdldCAhPT0gbnVsbCAmJiB0YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZDtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiB0YXJnZXQg44Gv44Op44K444Kq44Oc44K/44Oz44GL5Yik5a6aXHJcbiAgICogQHBhcmFtIHRhcmdldFxyXG4gICAqL1xyXG4gIGNvbnN0IGlzSFRNTFJhZGlvSW5wdXRFbGVtZW50ID0gKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIEhUTUxJbnB1dEVsZW1lbnQgID0+IHtcclxuICAgIHJldHVybiB0YXJnZXQgIT09IG51bGwgJiYgdGFyZ2V0LnR5cGUgPT09ICdyYWRpbycgJiYgdGFyZ2V0LmNoZWNrZWQgIT09IHVuZGVmaW5lZDtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBpZCDlsZ7mgKfjgYwgaWQg44Gu6KaB57Sg44GM5oyB44GkIHZhbHVlIOWApOOCkui/lOOBmVxyXG4gICAqIHZhbHVlIOWApOOBjOWtmOWcqOOBl+OBquOBi+OBo+OBn+WgtOWQiOOBr+epuuaWh+Wtl+OCkui/lOOBmVxyXG4gICAqIEBwYXJhbSBpZFxyXG4gICAqL1xyXG4gIGNvbnN0IGdldFZhbHVlID0gKGlkOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gICAgLy9pZCDjgafmjZXmjYlcclxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHJcbiAgICAvL0RPTSDjgYzlhaXlipvmrITjgafjgarjgYvjgaPjgZ/jgonnqbrmloflrZfjgpLov5TjgZlcclxuICAgIGlmICggISBpc0hUTUxJbnB1dEVsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICByZXR1cm4gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgLy92YWx1ZSDjgpLjgZ3jga7jgb7jgb7ov5TjgZlcclxuICAgIHJldHVybiB0YXJnZXQudmFsdWU7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogaWQg5bGe5oCn44GMIGlkIOOBruimgee0oOOBjOaMgeOBpCB2YWx1ZSDlsZ7mgKfjgpIgdmFsdWUg44Gr44GZ44KLXHJcbiAgICogQHBhcmFtIGlkXHJcbiAgICogQHBhcmFtIHZhbHVlXHJcbiAgICovXHJcbiAgY29uc3Qgc2V0VmFsdWUgPSAoaWQ6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xyXG4gICAgLy9pZCDjgafmjZXmjYlcclxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHJcbiAgICAvL0RPTSDjgYzlhaXlipvmrITjgafjgarjgYvjgaPjgZ/jgonjgarjgavjgoLjgZfjgarjgYRcclxuICAgIGlmICggISBpc0hUTUxJbnB1dEVsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy/jgrvjg4Pjg4hcclxuICAgIHRhcmdldC52YWx1ZSA9IHZhbHVlO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIGlkIOWxnuaAp+OBjCBpZCDjga7opoHntKDjgYzjg6njgrjjgqrjg5zjgr/jg7PjgYvjgaTjgIHjg4Hjgqfjg4Pjgq/jgZXjgozjgabjgYTjgovjgYvliKTlrppcclxuICAgKiBAcGFyYW0gaWRcclxuICAgKi9cclxuICBjb25zdCBpc0NoZWNrZWQgPSAoaWQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gICAgLy9pZCDjgafmjZXmjYlcclxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHJcbiAgICAvL0RPTSDjgYzjg6njgrjjgqrjg5zjgr/jg7PjgafjgarjgYvjgaPjgZ/jgonlpLHmlZdcclxuICAgIGlmICggISBpc0hUTUxSYWRpb0lucHV0RWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NoZWNrZWQg44KS44Gd44Gu44G+44G+6L+U44GZXHJcbiAgICByZXR1cm4gdGFyZ2V0LmNoZWNrZWQ7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogaWQg5bGe5oCn44GMIGlkIOOBruimgee0oOOBjOODqeOCuOOCquODnOOCv+ODs+OCkuODgeOCp+ODg+OCr+eKtuaFi+OBq+OBmeOCi1xyXG4gICAqIEBwYXJhbSBpZFxyXG4gICAqL1xyXG4gIGNvbnN0IHNldENoZWNrZWQgPSAoaWQ6IHN0cmluZykgPT4ge1xyXG4gICAgLy9pZCDjgafmjZXmjYlcclxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHJcbiAgICAvL0RPTSDjgYzjg6njgrjjgqrjg5zjgr/jg7PjgafjgarjgYvjgaPjgZ/jgonjgarjgavjgoLjgZfjgarjgYRcclxuICAgIGlmICggISBpc0hUTUxSYWRpb0lucHV0RWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+ODgeOCp+ODg+OCr1xyXG4gICAgdGFyZ2V0LmNoZWNrZWQgPSB0cnVlO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIOS/neWtmFxyXG4gICAqL1xyXG4gIGNvbnN0IHNhdmVfb3B0aW9ucyA9ICgpID0+IHtcclxuICAgIC8v6Kit5a6a44Gu5Y+W5b6XKHJhbmdlKVxyXG4gICAgbGV0IHJhbmdlID0gJ2Z1bGwnO1xyXG4gICAgaWYgKGlzQ2hlY2tlZCgnZGlzcGxheScpKSB7XHJcbiAgICAgIHJhbmdlID0gJ2Rpc3BsYXknO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNDaGVja2VkKCdwZXJmZWN0JykpIHtcclxuICAgICAgcmFuZ2UgPSAncGVyZmVjdCc7XHJcbiAgICB9XHJcblxyXG4gICAgLy/oqK3lrprjga7lj5blvpcodGl0bGUpXHJcbiAgICBjb25zdCB0aXRsZSA9IGdldFZhbHVlKCd0aXRsZScpO1xyXG5cclxuICAgIC8v6Kit5a6a44Gu5Y+W5b6XKGNvdW50ZXIpXHJcbiAgICBjb25zdCBjb3VudGVyID0gTnVtYmVyKGdldFZhbHVlKCdjb3VudGVyJykpO1xyXG5cclxuICAgIC8v5L+d5a2YXHJcbiAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7cmFuZ2UsIHRpdGxlLCBjb3VudGVyfSwgKCkgPT4ge1xyXG4gICAgICBjb25zdCBzdGF0dXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhdHVzJyk7XHJcbiAgICAgIGlmIChzdGF0dXMgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgc3RhdHVzLnRleHRDb250ZW50ID0gY2hyb21lLmkxOG4uZ2V0TWVzc2FnZSgnbXNnX3NhdmVkJyk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHN0YXR1cy50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgICB9LCA3NTApO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICog6Kqt44G/5Y+W44KKXHJcbiAgICovXHJcbiAgY29uc3QgcmVzdG9yZV9vcHRpb25zID0gKCkgPT4ge1xyXG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoe1xyXG4gICAgICByYW5nZTogREVGQVVMVF9SQU5HRSxcclxuICAgICAgdGl0bGU6IERFRkFVTFRfVElUTEUsXHJcbiAgICAgIGNvdW50ZXI6IERFRkFVTFRfQ09VTlRFUlxyXG4gICAgfSwgKGl0ZW1zOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSkgPT4ge1xyXG4gICAgICBzZXRDaGVja2VkKGl0ZW1zLnJhbmdlKTtcclxuICAgICAgc2V0VmFsdWUoJ3RpdGxlJywgaXRlbXMudGl0bGUpO1xyXG4gICAgICBzZXRWYWx1ZSgnY291bnRlcicsIFN0cmluZyhpdGVtcy5jb3VudGVyKSk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBsYW5nIOOCr+ODqeOCueOCkuaMgeOBo+OBn+imgee0oOOBriAnbXNnXycgKyBkYXRhLWtleeWxnuaApyDjgYvjgonoqIDoqp7jg6Hjg4Pjgrvjg7zjgrjjgpLlj5blvpfjgZfjgIHopoHntKDjga7jg4bjgq3jgrnjg4jjgpLlpInmm7TjgZnjgotcclxuICAgKi9cclxuICBjb25zdCBzZXRMYW5nID0gKCkgPT4ge1xyXG4gICAgLy/jg4bjgq3jgrnjg4jlpInmj5vlr77osaHjga7lj5blvpdcclxuICAgIGNvbnN0IHRhcmdldHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsYW5nJyk7XHJcblxyXG4gICAgLy/lpInmj5vlh6bnkIZcclxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSB0YXJnZXRzLmxlbmd0aDsgaSA8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XHJcbiAgICAgIC8v5a++6LGh44KS5LiA5pem5aSJ5pWw44G45oy/5YWlXHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IHRhcmdldHMuaXRlbShpKTtcclxuXHJcbiAgICAgIC8v5a++6LGh44GM5a2Y5Zyo44GX44Gq44GL44Gj44Gf44KJ44Gq44Gr44KC44GX44Gq44GEXHJcbiAgICAgIGlmICh0YXJnZXQgPT09IG51bGwpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy/jg6Hjg4Pjgrvjg7zjgrjjgq3jg7zjgpLkuIDml6blpInmlbDjgbjmjL/lhaVcclxuICAgICAgY29uc3Qga2V5ID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKTtcclxuXHJcbiAgICAgIC8v44Oh44OD44K744O844K444Kt44O844GM5a2Y5Zyo44GX44Gq44GL44Gj44Gf44KJ44Gq44Gr44KC44GX44Gq44GEXHJcbiAgICAgIGlmIChrZXkgPT09IG51bGwpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy/jg4bjgq3jgrnjg4joqK3lrppcclxuICAgICAgdGFyZ2V0LmlubmVySFRNTCA9IGNocm9tZS5pMThuLmdldE1lc3NhZ2UoJ21zZ18nK2tleSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy/jgqTjg5njg7Pjg4jjga7nmbvpjLJcclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgcmVzdG9yZV9vcHRpb25zKTtcclxuICBjb25zdCBzYXZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmUnKTtcclxuICBpZiAoc2F2ZSAhPT0gbnVsbCkge1xyXG4gICAgc2F2ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNhdmVfb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICAvL+iogOiqnuOBlOOBqOOBq+ODhuOCreOCueODiOioreWumlxyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzZXRMYW5nKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9