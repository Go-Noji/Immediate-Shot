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
/******/ 	return __webpack_require__(__webpack_require__.s = "../../../OneDrive/デスクトップ/_github/immediate_shot/src/options.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../../OneDrive/デスクトップ/_github/immediate_shot/src/config.ts":
/*!************************************************************************!*\
  !*** c:/Users/go/OneDrive/デスクトップ/_github/immediate_shot/src/config.ts ***!
  \************************************************************************/
/*! exports provided: DEFAULT_RANGE, DEFAULT_TITLE, DEFAULT_MAX, DEFAULT_COUNTER, DEFAULT_INTERVAL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_RANGE", function() { return DEFAULT_RANGE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_TITLE", function() { return DEFAULT_TITLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_MAX", function() { return DEFAULT_MAX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_COUNTER", function() { return DEFAULT_COUNTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_INTERVAL", function() { return DEFAULT_INTERVAL; });
//キャプチャ範囲初期値
const DEFAULT_RANGE = 'perfect';
//タイトル名初期値
const DEFAULT_TITLE = '{{title}}';
//サイトのマックス値を画面幅だけで取るか、全要素から取得するか
const DEFAULT_MAX = false;
//カウント変数初期値
const DEFAULT_COUNTER = 1;
//インターバル初期値
const DEFAULT_INTERVAL = 500;


/***/ }),

/***/ "../../../OneDrive/デスクトップ/_github/immediate_shot/src/options.ts":
/*!*************************************************************************!*\
  !*** c:/Users/go/OneDrive/デスクトップ/_github/immediate_shot/src/options.ts ***!
  \*************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "../../../OneDrive/デスクトップ/_github/immediate_shot/src/config.ts");

//設定項目
//range: 'full' か 'display', 'perfect'.  デフォルト値は 'full'
//title: ダウンロードするファイル名が, ここに仕込んだ文字列+'.png' になる テンプレート変数を入れることも可能 デフォルトは {{title}}
//counter: 上記 title に {{counter}} で仕込めるカウンターの数値
//interval: キャプチャ間のミリ秒
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
        //設定の取得(interval)
        const interval = Number(getValue('interval'));
        //設定の取得(max)
        const max = isCheckedCheckbox('max');
        //保存
        chrome.storage.sync.set({ range, title, counter, interval, max }, () => {
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
            interval: _config__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_INTERVAL"],
            max: _config__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_MAX"]
        }, (items) => {
            setCheckedRadio(items.range);
            setValue('title', items.title);
            setValue('counter', String(items.counter));
            setValue('interval', String(items.interval));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2dvL09uZURyaXZlL+ODh+OCueOCr+ODiOODg+ODly9fZ2l0aHViL2ltbWVkaWF0ZV9zaG90L3NyYy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vL2M6L1VzZXJzL2dvL09uZURyaXZlL+ODh+OCueOCr+ODiOODg+ODly9fZ2l0aHViL2ltbWVkaWF0ZV9zaG90L3NyYy9vcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFBWTtBQUNMLE1BQU0sYUFBYSxHQUFXLFNBQVMsQ0FBQztBQUUvQyxVQUFVO0FBQ0gsTUFBTSxhQUFhLEdBQVcsV0FBVyxDQUFDO0FBRWpELGdDQUFnQztBQUN6QixNQUFNLFdBQVcsR0FBWSxLQUFLLENBQUM7QUFFMUMsV0FBVztBQUNKLE1BQU0sZUFBZSxHQUFXLENBQUMsQ0FBQztBQUV6QyxXQUFXO0FBQ0osTUFBTSxnQkFBZ0IsR0FBVyxHQUFHLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNiNUM7QUFBQTtBQUFzRztBQUV0RyxNQUFNO0FBQ04sdURBQXVEO0FBQ3ZELGlGQUFpRjtBQUNqRiwrQ0FBK0M7QUFDL0Msc0JBQXNCO0FBQ3RCLDRDQUE0QztBQUM1QyxVQUFVO0FBQ1Ysc0JBQXNCO0FBQ3RCLGtCQUFrQjtBQUNsQiwwQkFBMEI7QUFDMUI7SUFDRTs7O09BR0c7SUFDSCxNQUFNLGtCQUFrQixHQUFHLENBQUMsTUFBVyxFQUE4QixFQUFFO1FBQ3JFLE9BQU8sTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztJQUN2RCxDQUFDLENBQUM7SUFFRjs7O09BR0c7SUFDSCxNQUFNLHVCQUF1QixHQUFHLENBQUMsTUFBVyxFQUErQixFQUFFO1FBQzNFLE9BQU8sTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLE9BQU8sSUFBSSxNQUFNLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQztJQUNwRixDQUFDLENBQUM7SUFFRjs7O09BR0c7SUFDSCxNQUFNLDBCQUEwQixHQUFHLENBQUMsTUFBVyxFQUErQixFQUFFO1FBQzlFLE9BQU8sTUFBTSxLQUFLLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFVBQVUsSUFBSSxNQUFNLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQztJQUN2RixDQUFDLENBQUM7SUFFRjs7OztPQUlHO0lBQ0gsTUFBTSxRQUFRLEdBQUcsQ0FBQyxFQUFVLEVBQVUsRUFBRTtRQUN0QyxRQUFRO1FBQ1IsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUUzQyxzQkFBc0I7UUFDdEIsSUFBSyxDQUFFLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2pDLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxlQUFlO1FBQ2YsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUMsQ0FBQztJQUVGOzs7O09BSUc7SUFDSCxNQUFNLFFBQVEsR0FBRyxDQUFDLEVBQVUsRUFBRSxLQUFhLEVBQUUsRUFBRTtRQUM3QyxRQUFRO1FBQ1IsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUUzQyxzQkFBc0I7UUFDdEIsSUFBSyxDQUFFLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ2pDLE9BQU87U0FDUjtRQUVELEtBQUs7UUFDTCxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDLENBQUM7SUFFRjs7O09BR0c7SUFDSCxNQUFNLGNBQWMsR0FBRyxDQUFDLEVBQVUsRUFBVyxFQUFFO1FBQzdDLFFBQVE7UUFDUixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTNDLHFCQUFxQjtRQUNyQixJQUFLLENBQUUsdUJBQXVCLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdEMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELGlCQUFpQjtRQUNqQixPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQyxDQUFDO0lBRUY7OztPQUdHO0lBQ0gsTUFBTSxlQUFlLEdBQUcsQ0FBQyxFQUFVLEVBQUUsRUFBRTtRQUNyQyxRQUFRO1FBQ1IsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUUzQyx5QkFBeUI7UUFDekIsSUFBSyxDQUFFLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3RDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxNQUFNO1FBQ04sTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQyxDQUFDO0lBRUY7OztPQUdHO0lBQ0gsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEVBQVUsRUFBVyxFQUFFO1FBQ2hELFFBQVE7UUFDUixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTNDLHFCQUFxQjtRQUNyQixJQUFLLENBQUUsMEJBQTBCLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDekMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELGlCQUFpQjtRQUNqQixPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQyxDQUFDO0lBRUY7OztPQUdHO0lBQ0gsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLEVBQVUsRUFBRSxVQUFtQixJQUFJLEVBQUUsRUFBRTtRQUNqRSxRQUFRO1FBQ1IsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUUzQyx5QkFBeUI7UUFDekIsSUFBSyxDQUFFLDBCQUEwQixDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3pDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxNQUFNO1FBQ04sTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0lBRUY7O09BRUc7SUFDSCxNQUFNLFlBQVksR0FBRyxHQUFHLEVBQUU7UUFDeEIsY0FBYztRQUNkLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUNuQixJQUFJLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUM3QixLQUFLLEdBQUcsU0FBUyxDQUFDO1NBQ25CO2FBQ0ksSUFBSSxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDbEMsS0FBSyxHQUFHLFNBQVMsQ0FBQztTQUNuQjtRQUVELGNBQWM7UUFDZCxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFaEMsZ0JBQWdCO1FBQ2hCLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUU1QyxpQkFBaUI7UUFDakIsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBRTlDLFlBQVk7UUFDWixNQUFNLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVyQyxJQUFJO1FBQ0osTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBQyxFQUFFLEdBQUcsRUFBRTtZQUNuRSxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtnQkFDbkIsT0FBTzthQUNSO1lBQ0QsTUFBTSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6RCxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLE1BQU0sQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQzFCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNWLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0lBRUY7O09BRUc7SUFDSCxNQUFNLGVBQWUsR0FBRyxHQUFHLEVBQUU7UUFDM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQ3RCLEtBQUssRUFBRSxxREFBYTtZQUNwQixLQUFLLEVBQUUscURBQWE7WUFDcEIsT0FBTyxFQUFFLHVEQUFlO1lBQ3hCLFFBQVEsRUFBRSx3REFBZ0I7WUFDMUIsR0FBRyxFQUFFLG1EQUFXO1NBQ2pCLEVBQUUsQ0FBQyxLQUE4QixFQUFFLEVBQUU7WUFDcEMsZUFBZSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QixRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMvQixRQUFRLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMzQyxRQUFRLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUM3QyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0lBRUY7O09BRUc7SUFDSCxNQUFNLE9BQU8sR0FBRyxHQUFHLEVBQUU7UUFDbkIsYUFBYTtRQUNiLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4RCxNQUFNO1FBQ04sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzlELFlBQVk7WUFDWixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRS9CLG1CQUFtQjtZQUNuQixJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7Z0JBQ25CLFNBQVM7YUFDVjtZQUVELGlCQUFpQjtZQUNqQixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTVDLHdCQUF3QjtZQUN4QixJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7Z0JBQ2hCLFNBQVM7YUFDVjtZQUVELFFBQVE7WUFDUixNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2RDtJQUNILENBQUMsQ0FBQztJQUVGLFNBQVM7SUFDVCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDL0QsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7UUFDakIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztLQUM5QztJQUVELGFBQWE7SUFDYixRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FDeEQiLCJmaWxlIjoib3B0aW9ucy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuLi8uLi8uLi9PbmVEcml2ZS/jg4fjgrnjgq/jg4jjg4Pjg5cvX2dpdGh1Yi9pbW1lZGlhdGVfc2hvdC9zcmMvb3B0aW9ucy50c1wiKTtcbiIsIi8v44Kt44Oj44OX44OB44Oj56+E5Zuy5Yid5pyf5YCkXHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX1JBTkdFOiBzdHJpbmcgPSAncGVyZmVjdCc7XHJcblxyXG4vL+OCv+OCpOODiOODq+WQjeWIneacn+WApFxyXG5leHBvcnQgY29uc3QgREVGQVVMVF9USVRMRTogc3RyaW5nID0gJ3t7dGl0bGV9fSc7XHJcblxyXG4vL+OCteOCpOODiOOBruODnuODg+OCr+OCueWApOOCkueUu+mdouW5heOBoOOBkeOBp+WPluOCi+OBi+OAgeWFqOimgee0oOOBi+OCieWPluW+l+OBmeOCi+OBi1xyXG5leHBvcnQgY29uc3QgREVGQVVMVF9NQVg6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbi8v44Kr44Km44Oz44OI5aSJ5pWw5Yid5pyf5YCkXHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPVU5URVI6IG51bWJlciA9IDE7XHJcblxyXG4vL+OCpOODs+OCv+ODvOODkOODq+WIneacn+WApFxyXG5leHBvcnQgY29uc3QgREVGQVVMVF9JTlRFUlZBTDogbnVtYmVyID0gNTAwO1xyXG4iLCJpbXBvcnQge0RFRkFVTFRfQ09VTlRFUiwgREVGQVVMVF9JTlRFUlZBTCwgREVGQVVMVF9NQVgsIERFRkFVTFRfUkFOR0UsIERFRkFVTFRfVElUTEV9IGZyb20gXCIuL2NvbmZpZ1wiO1xyXG5cclxuLy/oqK3lrprpoIXnm65cclxuLy9yYW5nZTogJ2Z1bGwnIOOBiyAnZGlzcGxheScsICdwZXJmZWN0Jy4gIOODh+ODleOCqeODq+ODiOWApOOBryAnZnVsbCdcclxuLy90aXRsZTog44OA44Km44Oz44Ot44O844OJ44GZ44KL44OV44Kh44Kk44Or5ZCN44GMLCDjgZPjgZPjgavku5XovrzjgpPjgaDmloflrZfliJcrJy5wbmcnIOOBq+OBquOCiyDjg4bjg7Pjg5fjg6zjg7zjg4jlpInmlbDjgpLlhaXjgozjgovjgZPjgajjgoLlj6/og70g44OH44OV44Kp44Or44OI44GvIHt7dGl0bGV9fVxyXG4vL2NvdW50ZXI6IOS4iuiomCB0aXRsZSDjgasge3tjb3VudGVyfX0g44Gn5LuV6L6844KB44KL44Kr44Km44Oz44K/44O844Gu5pWw5YCkXHJcbi8vaW50ZXJ2YWw6IOOCreODo+ODl+ODgeODo+mWk+OBruODn+ODquenklxyXG4vL21heDogdHJ1ZSDjgavoqK3lrprjgZfjgabjgYLjgovjgajnlLvpnaLjga7luYXjg7vpq5jjgZXjgpLlj5blvpfjgZnjgovmmYLjgavlhajopoHntKDjgpLjg4Hjgqfjg4Pjgq/jgZnjgotcclxuLy/jg4bjg7Pjg5fjg6zjg7zjg4jlpInmlbBcclxuLy97e3RpdGxlfX06IOOCv+OCpOODiOODq+OCv+OCsOOBruWGheWuuVxyXG4vL3t7dXJsfX06IHVybCDjga7lhoXlrrlcclxuLy97e2NvdW50ZXJ9fTogY291bnRlciDjga7lhoXlrrlcclxue1xyXG4gIC8qKlxyXG4gICAqIHRhcmdldCDjga8gdmFsdWUg5YCk44KS5oyB44Gj44Gm44GE44KL44GL5Yik5a6aXHJcbiAgICogQHBhcmFtIHRhcmdldFxyXG4gICAqL1xyXG4gIGNvbnN0IGlzSFRNTElucHV0RWxlbWVudCA9ICh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBIVE1MSW5wdXRFbGVtZW50ID0+IHtcclxuICAgIHJldHVybiB0YXJnZXQgIT09IG51bGwgJiYgdGFyZ2V0LnZhbHVlICE9PSB1bmRlZmluZWQ7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogdGFyZ2V0IOOBr+ODqeOCuOOCquODnOOCv+ODs+OBi+WIpOWumlxyXG4gICAqIEBwYXJhbSB0YXJnZXRcclxuICAgKi9cclxuICBjb25zdCBpc0hUTUxSYWRpb0lucHV0RWxlbWVudCA9ICh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBIVE1MSW5wdXRFbGVtZW50ICA9PiB7XHJcbiAgICByZXR1cm4gdGFyZ2V0ICE9PSBudWxsICYmIHRhcmdldC50eXBlID09PSAncmFkaW8nICYmIHRhcmdldC5jaGVja2VkICE9PSB1bmRlZmluZWQ7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogdGFyZ2V0IOOBr+ODgeOCp+ODg+OCr+ODnOODg+OCr+OCueOBi+WIpOWumlxyXG4gICAqIEBwYXJhbSB0YXJnZXRcclxuICAgKi9cclxuICBjb25zdCBpc0hUTUxDaGVja2JveElucHV0RWxlbWVudCA9ICh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBIVE1MSW5wdXRFbGVtZW50ICA9PiB7XHJcbiAgICByZXR1cm4gdGFyZ2V0ICE9PSBudWxsICYmIHRhcmdldC50eXBlID09PSAnY2hlY2tib3gnICYmIHRhcmdldC5jaGVja2VkICE9PSB1bmRlZmluZWQ7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogaWQg5bGe5oCn44GMIGlkIOOBruimgee0oOOBjOaMgeOBpCB2YWx1ZSDlgKTjgpLov5TjgZlcclxuICAgKiB2YWx1ZSDlgKTjgYzlrZjlnKjjgZfjgarjgYvjgaPjgZ/loLTlkIjjga/nqbrmloflrZfjgpLov5TjgZlcclxuICAgKiBAcGFyYW0gaWRcclxuICAgKi9cclxuICBjb25zdCBnZXRWYWx1ZSA9IChpZDogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICAgIC8vaWQg44Gn5o2V5o2JXHJcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcblxyXG4gICAgLy9ET00g44GM5YWl5Yqb5qyE44Gn44Gq44GL44Gj44Gf44KJ56m65paH5a2X44KS6L+U44GZXHJcbiAgICBpZiAoICEgaXNIVE1MSW5wdXRFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vdmFsdWUg44KS44Gd44Gu44G+44G+6L+U44GZXHJcbiAgICByZXR1cm4gdGFyZ2V0LnZhbHVlO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIGlkIOWxnuaAp+OBjCBpZCDjga7opoHntKDjgYzmjIHjgaQgdmFsdWUg5bGe5oCn44KSIHZhbHVlIOOBq+OBmeOCi1xyXG4gICAqIEBwYXJhbSBpZFxyXG4gICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAqL1xyXG4gIGNvbnN0IHNldFZhbHVlID0gKGlkOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcclxuICAgIC8vaWQg44Gn5o2V5o2JXHJcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcblxyXG4gICAgLy9ET00g44GM5YWl5Yqb5qyE44Gn44Gq44GL44Gj44Gf44KJ44Gq44Gr44KC44GX44Gq44GEXHJcbiAgICBpZiAoICEgaXNIVE1MSW5wdXRFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8v44K744OD44OIXHJcbiAgICB0YXJnZXQudmFsdWUgPSB2YWx1ZTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBpZCDlsZ7mgKfjgYwgaWQg44Gu6KaB57Sg44GM44Op44K444Kq44Oc44K/44Oz44GL44Gk44CB44OB44Kn44OD44Kv44GV44KM44Gm44GE44KL44GL5Yik5a6aXHJcbiAgICogQHBhcmFtIGlkXHJcbiAgICovXHJcbiAgY29uc3QgaXNDaGVja2VkUmFkaW8gPSAoaWQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gICAgLy9pZCDjgafmjZXmjYlcclxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHJcbiAgICAvL0RPTSDjgYzjg6njgrjjgqrjg5zjgr/jg7PjgafjgarjgYvjgaPjgZ/jgonlpLHmlZdcclxuICAgIGlmICggISBpc0hUTUxSYWRpb0lucHV0RWxlbWVudCh0YXJnZXQpKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvL2NoZWNrZWQg44KS44Gd44Gu44G+44G+6L+U44GZXHJcbiAgICByZXR1cm4gdGFyZ2V0LmNoZWNrZWQ7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogaWQg5bGe5oCn44GMIGlkIOOBruimgee0oOOBjOODqeOCuOOCquODnOOCv+ODs+OCkuODgeOCp+ODg+OCr+eKtuaFi+OBq+OBmeOCi1xyXG4gICAqIEBwYXJhbSBpZFxyXG4gICAqL1xyXG4gIGNvbnN0IHNldENoZWNrZWRSYWRpbyA9IChpZDogc3RyaW5nKSA9PiB7XHJcbiAgICAvL2lkIOOBp+aNleaNiVxyXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG5cclxuICAgIC8vRE9NIOOBjOODqeOCuOOCquODnOOCv+ODs+OBp+OBquOBi+OBo+OBn+OCieOBquOBq+OCguOBl+OBquOBhFxyXG4gICAgaWYgKCAhIGlzSFRNTFJhZGlvSW5wdXRFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v44OB44Kn44OD44KvXHJcbiAgICB0YXJnZXQuY2hlY2tlZCA9IHRydWU7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogaWQg5bGe5oCn44GMIGlkIOOBruimgee0oOOBjOODgeOCp+ODg+OCr+ODnOODg+OCr+OCueOBi+OBpOOAgeODgeOCp+ODg+OCr+OBleOCjOOBpuOBhOOCi+OBi+WIpOWumlxyXG4gICAqIEBwYXJhbSBpZFxyXG4gICAqL1xyXG4gIGNvbnN0IGlzQ2hlY2tlZENoZWNrYm94ID0gKGlkOiBzdHJpbmcpOiBib29sZWFuID0+IHtcclxuICAgIC8vaWQg44Gn5o2V5o2JXHJcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcblxyXG4gICAgLy9ET00g44GM44Op44K444Kq44Oc44K/44Oz44Gn44Gq44GL44Gj44Gf44KJ5aSx5pWXXHJcbiAgICBpZiAoICEgaXNIVE1MQ2hlY2tib3hJbnB1dEVsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy9jaGVja2VkIOOCkuOBneOBruOBvuOBvui/lOOBmVxyXG4gICAgcmV0dXJuIHRhcmdldC5jaGVja2VkO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIGlkIOWxnuaAp+OBjCBpZCDjga7jg4Hjgqfjg4Pjgq/jg5zjg4Pjgq/jgrnopoHntKDjgpLjg4Hjgqfjg4Pjgq/nirbmhYvjgavjgZnjgotcclxuICAgKiBAcGFyYW0gaWRcclxuICAgKi9cclxuICBjb25zdCBzZXRDaGVja2VkQ2hlY2tib3ggPSAoaWQ6IHN0cmluZywgY2hlY2tlZDogYm9vbGVhbiA9IHRydWUpID0+IHtcclxuICAgIC8vaWQg44Gn5o2V5o2JXHJcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcblxyXG4gICAgLy9ET00g44GM44Op44K444Kq44Oc44K/44Oz44Gn44Gq44GL44Gj44Gf44KJ44Gq44Gr44KC44GX44Gq44GEXHJcbiAgICBpZiAoICEgaXNIVE1MQ2hlY2tib3hJbnB1dEVsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy/jg4Hjgqfjg4Pjgq9cclxuICAgIHRhcmdldC5jaGVja2VkID0gY2hlY2tlZDtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiDkv53lrZhcclxuICAgKi9cclxuICBjb25zdCBzYXZlX29wdGlvbnMgPSAoKSA9PiB7XHJcbiAgICAvL+ioreWumuOBruWPluW+lyhyYW5nZSlcclxuICAgIGxldCByYW5nZSA9ICdmdWxsJztcclxuICAgIGlmIChpc0NoZWNrZWRSYWRpbygnZGlzcGxheScpKSB7XHJcbiAgICAgIHJhbmdlID0gJ2Rpc3BsYXknO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoaXNDaGVja2VkUmFkaW8oJ3BlcmZlY3QnKSkge1xyXG4gICAgICByYW5nZSA9ICdwZXJmZWN0JztcclxuICAgIH1cclxuXHJcbiAgICAvL+ioreWumuOBruWPluW+lyh0aXRsZSlcclxuICAgIGNvbnN0IHRpdGxlID0gZ2V0VmFsdWUoJ3RpdGxlJyk7XHJcblxyXG4gICAgLy/oqK3lrprjga7lj5blvpcoY291bnRlcilcclxuICAgIGNvbnN0IGNvdW50ZXIgPSBOdW1iZXIoZ2V0VmFsdWUoJ2NvdW50ZXInKSk7XHJcblxyXG4gICAgLy/oqK3lrprjga7lj5blvpcoaW50ZXJ2YWwpXHJcbiAgICBjb25zdCBpbnRlcnZhbCA9IE51bWJlcihnZXRWYWx1ZSgnaW50ZXJ2YWwnKSk7XHJcblxyXG4gICAgLy/oqK3lrprjga7lj5blvpcobWF4KVxyXG4gICAgY29uc3QgbWF4ID0gaXNDaGVja2VkQ2hlY2tib3goJ21heCcpO1xyXG5cclxuICAgIC8v5L+d5a2YXHJcbiAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7cmFuZ2UsIHRpdGxlLCBjb3VudGVyLCBpbnRlcnZhbCwgbWF4fSwgKCkgPT4ge1xyXG4gICAgICBjb25zdCBzdGF0dXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhdHVzJyk7XHJcbiAgICAgIGlmIChzdGF0dXMgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgc3RhdHVzLnRleHRDb250ZW50ID0gY2hyb21lLmkxOG4uZ2V0TWVzc2FnZSgnbXNnX3NhdmVkJyk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHN0YXR1cy50ZXh0Q29udGVudCA9ICcnO1xyXG4gICAgICB9LCA3NTApO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICog6Kqt44G/5Y+W44KKXHJcbiAgICovXHJcbiAgY29uc3QgcmVzdG9yZV9vcHRpb25zID0gKCkgPT4ge1xyXG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoe1xyXG4gICAgICByYW5nZTogREVGQVVMVF9SQU5HRSxcclxuICAgICAgdGl0bGU6IERFRkFVTFRfVElUTEUsXHJcbiAgICAgIGNvdW50ZXI6IERFRkFVTFRfQ09VTlRFUixcclxuICAgICAgaW50ZXJ2YWw6IERFRkFVTFRfSU5URVJWQUwsXHJcbiAgICAgIG1heDogREVGQVVMVF9NQVhcclxuICAgIH0sIChpdGVtczoge1trZXk6IHN0cmluZ106IHN0cmluZ30pID0+IHtcclxuICAgICAgc2V0Q2hlY2tlZFJhZGlvKGl0ZW1zLnJhbmdlKTtcclxuICAgICAgc2V0VmFsdWUoJ3RpdGxlJywgaXRlbXMudGl0bGUpO1xyXG4gICAgICBzZXRWYWx1ZSgnY291bnRlcicsIFN0cmluZyhpdGVtcy5jb3VudGVyKSk7XHJcbiAgICAgIHNldFZhbHVlKCdpbnRlcnZhbCcsIFN0cmluZyhpdGVtcy5pbnRlcnZhbCkpO1xyXG4gICAgICBzZXRDaGVja2VkQ2hlY2tib3goJ21heCcsIEJvb2xlYW4oaXRlbXMubWF4KSk7XHJcbiAgICB9KTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBsYW5nIOOCr+ODqeOCueOCkuaMgeOBo+OBn+imgee0oOOBriAnbXNnXycgKyBkYXRhLWtleeWxnuaApyDjgYvjgonoqIDoqp7jg6Hjg4Pjgrvjg7zjgrjjgpLlj5blvpfjgZfjgIHopoHntKDjga7jg4bjgq3jgrnjg4jjgpLlpInmm7TjgZnjgotcclxuICAgKi9cclxuICBjb25zdCBzZXRMYW5nID0gKCkgPT4ge1xyXG4gICAgLy/jg4bjgq3jgrnjg4jlpInmj5vlr77osaHjga7lj5blvpdcclxuICAgIGNvbnN0IHRhcmdldHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsYW5nJyk7XHJcblxyXG4gICAgLy/lpInmj5vlh6bnkIZcclxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSB0YXJnZXRzLmxlbmd0aDsgaSA8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XHJcbiAgICAgIC8v5a++6LGh44KS5LiA5pem5aSJ5pWw44G45oy/5YWlXHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IHRhcmdldHMuaXRlbShpKTtcclxuXHJcbiAgICAgIC8v5a++6LGh44GM5a2Y5Zyo44GX44Gq44GL44Gj44Gf44KJ44Gq44Gr44KC44GX44Gq44GEXHJcbiAgICAgIGlmICh0YXJnZXQgPT09IG51bGwpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy/jg6Hjg4Pjgrvjg7zjgrjjgq3jg7zjgpLkuIDml6blpInmlbDjgbjmjL/lhaVcclxuICAgICAgY29uc3Qga2V5ID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKTtcclxuXHJcbiAgICAgIC8v44Oh44OD44K744O844K444Kt44O844GM5a2Y5Zyo44GX44Gq44GL44Gj44Gf44KJ44Gq44Gr44KC44GX44Gq44GEXHJcbiAgICAgIGlmIChrZXkgPT09IG51bGwpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy/jg4bjgq3jgrnjg4joqK3lrppcclxuICAgICAgdGFyZ2V0LmlubmVySFRNTCA9IGNocm9tZS5pMThuLmdldE1lc3NhZ2UoJ21zZ18nK2tleSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy/jgqTjg5njg7Pjg4jjga7nmbvpjLJcclxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgcmVzdG9yZV9vcHRpb25zKTtcclxuICBjb25zdCBzYXZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmUnKTtcclxuICBpZiAoc2F2ZSAhPT0gbnVsbCkge1xyXG4gICAgc2F2ZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNhdmVfb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICAvL+iogOiqnuOBlOOBqOOBq+ODhuOCreOCueODiOioreWumlxyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzZXRMYW5nKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9