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

/***/ "./src/options.ts":
/*!************************!*\
  !*** ./src/options.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
            range: 'full',
            title: '{{title}}',
            counter: 0
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsTUFBTTtBQUNOLHVEQUF1RDtBQUN2RCxpRkFBaUY7QUFDakYsK0NBQStDO0FBQy9DLFVBQVU7QUFDVixzQkFBc0I7QUFDdEIsa0JBQWtCO0FBQ2xCLDBCQUEwQjtBQUMxQjtJQUNFOzs7T0FHRztJQUNILE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxNQUFXLEVBQThCLEVBQUU7UUFDckUsT0FBTyxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO0lBQ3ZELENBQUMsQ0FBQztJQUVGOzs7T0FHRztJQUNILE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxNQUFXLEVBQStCLEVBQUU7UUFDM0UsT0FB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VUFBVSxDQUFDLENBQUM7WUFFNUMsd0JBQXdCO1lBQ3hCLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtnQkFDaEIsU0FBUzthQUNWO1lBRUQsUUFBUTtZQUNSLE1BQU0sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZEO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsU0FBUztJQUNULFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxlQUFlLENBQUMsQ0FBQztJQUMvRCxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdDLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtRQUNqQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO0tBQzlDO0lBRUQsYUFBYTtJQUNiLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxPQUFPLENBQUMsQ0FBQztDQUN4RCIsImZpbGUiOiJvcHRpb25zLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL29wdGlvbnMudHNcIik7XG4iLCIvL+ioreWumumgheebrlxuLy9yYW5nZTogJ2Z1bGwnIOOBiyAnZGlzcGxheScsICdwZXJmZWN0Jy4gIOODh+ODleOCqeODq+ODiOWApOOBryAnZnVsbCdcbi8vdGl0bGU6IOODgOOCpuODs+ODreODvOODieOBmeOCi+ODleOCoeOCpOODq+WQjeOBjCwg44GT44GT44Gr5LuV6L6844KT44Gg5paH5a2X5YiXKycucG5nJyDjgavjgarjgosg44OG44Oz44OX44Os44O844OI5aSJ5pWw44KS5YWl44KM44KL44GT44Go44KC5Y+v6IO9IOODh+ODleOCqeODq+ODiOOBryB7e3RpdGxlfX1cbi8vY291bnRlcjog5LiK6KiYIHRpdGxlIOOBqyB7e2NvdW50ZXJ9fSDjgafku5XovrzjgoHjgovjgqvjgqbjg7Pjgr/jg7zjga7mlbDlgKRcbi8v44OG44Oz44OX44Os44O844OI5aSJ5pWwXG4vL3t7dGl0bGV9fTog44K/44Kk44OI44Or44K/44Kw44Gu5YaF5a65XG4vL3t7dXJsfX06IHVybCDjga7lhoXlrrlcbi8ve3tjb3VudGVyfX06IGNvdW50ZXIg44Gu5YaF5a65XG57XG4gIC8qKlxuICAgKiB0YXJnZXQg44GvIHZhbHVlIOWApOOCkuaMgeOBo+OBpuOBhOOCi+OBi+WIpOWumlxuICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAqL1xuICBjb25zdCBpc0hUTUxJbnB1dEVsZW1lbnQgPSAodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgSFRNTElucHV0RWxlbWVudCA9PiB7XG4gICAgcmV0dXJuIHRhcmdldCAhPT0gbnVsbCAmJiB0YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZDtcbiAgfTtcblxuICAvKipcbiAgICogdGFyZ2V0IOOBr+ODqeOCuOOCquODnOOCv+ODs+OBi+WIpOWumlxuICAgKiBAcGFyYW0gdGFyZ2V0XG4gICAqL1xuICBjb25zdCBpc0hUTUxSYWRpb0lucHV0RWxlbWVudCA9ICh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBIVE1MSW5wdXRFbGVtZW50ICA9PiB7XG4gICAgcmV0dXJuIHRhcmdldCAhPT0gbnVsbCAmJiB0YXJnZXQudHlwZSA9PT0gJ3JhZGlvJyAmJiB0YXJnZXQuY2hlY2tlZCAhPT0gdW5kZWZpbmVkO1xuICB9O1xuXG4gIC8qKlxuICAgKiBpZCDlsZ7mgKfjgYwgaWQg44Gu6KaB57Sg44GM5oyB44GkIHZhbHVlIOWApOOCkui/lOOBmVxuICAgKiB2YWx1ZSDlgKTjgYzlrZjlnKjjgZfjgarjgYvjgaPjgZ/loLTlkIjjga/nqbrmloflrZfjgpLov5TjgZlcbiAgICogQHBhcmFtIGlkXG4gICAqL1xuICBjb25zdCBnZXRWYWx1ZSA9IChpZDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAvL2lkIOOBp+aNleaNiVxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblxuICAgIC8vRE9NIOOBjOWFpeWKm+ashOOBp+OBquOBi+OBo+OBn+OCieepuuaWh+Wtl+OCkui/lOOBmVxuICAgIGlmICggISBpc0hUTUxJbnB1dEVsZW1lbnQodGFyZ2V0KSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIC8vdmFsdWUg44KS44Gd44Gu44G+44G+6L+U44GZXG4gICAgcmV0dXJuIHRhcmdldC52YWx1ZTtcbiAgfTtcblxuICAvKipcbiAgICogaWQg5bGe5oCn44GMIGlkIOOBruimgee0oOOBjOaMgeOBpCB2YWx1ZSDlsZ7mgKfjgpIgdmFsdWUg44Gr44GZ44KLXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcGFyYW0gdmFsdWVcbiAgICovXG4gIGNvbnN0IHNldFZhbHVlID0gKGlkOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpID0+IHtcbiAgICAvL2lkIOOBp+aNleaNiVxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblxuICAgIC8vRE9NIOOBjOWFpeWKm+ashOOBp+OBquOBi+OBo+OBn+OCieOBquOBq+OCguOBl+OBquOBhFxuICAgIGlmICggISBpc0hUTUxJbnB1dEVsZW1lbnQodGFyZ2V0KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8v44K744OD44OIXG4gICAgdGFyZ2V0LnZhbHVlID0gdmFsdWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIGlkIOWxnuaAp+OBjCBpZCDjga7opoHntKDjgYzjg6njgrjjgqrjg5zjgr/jg7PjgYvjgaTjgIHjg4Hjgqfjg4Pjgq/jgZXjgozjgabjgYTjgovjgYvliKTlrppcbiAgICogQHBhcmFtIGlkXG4gICAqL1xuICBjb25zdCBpc0NoZWNrZWQgPSAoaWQ6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgIC8vaWQg44Gn5o2V5o2JXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuXG4gICAgLy9ET00g44GM44Op44K444Kq44Oc44K/44Oz44Gn44Gq44GL44Gj44Gf44KJ5aSx5pWXXG4gICAgaWYgKCAhIGlzSFRNTFJhZGlvSW5wdXRFbGVtZW50KHRhcmdldCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvL2NoZWNrZWQg44KS44Gd44Gu44G+44G+6L+U44GZXG4gICAgcmV0dXJuIHRhcmdldC5jaGVja2VkO1xuICB9O1xuXG4gIC8qKlxuICAgKiBpZCDlsZ7mgKfjgYwgaWQg44Gu6KaB57Sg44GM44Op44K444Kq44Oc44K/44Oz44KS44OB44Kn44OD44Kv54q25oWL44Gr44GZ44KLXG4gICAqIEBwYXJhbSBpZFxuICAgKi9cbiAgY29uc3Qgc2V0Q2hlY2tlZCA9IChpZDogc3RyaW5nKSA9PiB7XG4gICAgLy9pZCDjgafmjZXmjYlcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG5cbiAgICAvL0RPTSDjgYzjg6njgrjjgqrjg5zjgr/jg7PjgafjgarjgYvjgaPjgZ/jgonjgarjgavjgoLjgZfjgarjgYRcbiAgICBpZiAoICEgaXNIVE1MUmFkaW9JbnB1dEVsZW1lbnQodGFyZ2V0KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8v44OB44Kn44OD44KvXG4gICAgdGFyZ2V0LmNoZWNrZWQgPSB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiDkv53lrZhcbiAgICovXG4gIGNvbnN0IHNhdmVfb3B0aW9ucyA9ICgpID0+IHtcbiAgICAvL+ioreWumuOBruWPluW+lyhyYW5nZSlcbiAgICBsZXQgcmFuZ2UgPSAnZnVsbCc7XG4gICAgaWYgKGlzQ2hlY2tlZCgnZGlzcGxheScpKSB7XG4gICAgICByYW5nZSA9ICdkaXNwbGF5JztcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNDaGVja2VkKCdwZXJmZWN0JykpIHtcbiAgICAgIHJhbmdlID0gJ3BlcmZlY3QnO1xuICAgIH1cblxuICAgIC8v6Kit5a6a44Gu5Y+W5b6XKHRpdGxlKVxuICAgIGNvbnN0IHRpdGxlID0gZ2V0VmFsdWUoJ3RpdGxlJyk7XG5cbiAgICAvL+ioreWumuOBruWPluW+lyhjb3VudGVyKVxuICAgIGNvbnN0IGNvdW50ZXIgPSBOdW1iZXIoZ2V0VmFsdWUoJ2NvdW50ZXInKSk7XG5cbiAgICAvL+S/neWtmFxuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtyYW5nZSwgdGl0bGUsIGNvdW50ZXJ9LCAoKSA9PiB7XG4gICAgICBjb25zdCBzdGF0dXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhdHVzJyk7XG4gICAgICBpZiAoc3RhdHVzID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHN0YXR1cy50ZXh0Q29udGVudCA9IGNocm9tZS5pMThuLmdldE1lc3NhZ2UoJ21zZ19zYXZlZCcpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHN0YXR1cy50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgfSwgNzUwKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICog6Kqt44G/5Y+W44KKXG4gICAqL1xuICBjb25zdCByZXN0b3JlX29wdGlvbnMgPSAoKSA9PiB7XG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoe1xuICAgICAgcmFuZ2U6ICdmdWxsJyxcbiAgICAgIHRpdGxlOiAne3t0aXRsZX19JyxcbiAgICAgIGNvdW50ZXI6IDBcbiAgICB9LCAoaXRlbXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9KSA9PiB7XG4gICAgICBzZXRDaGVja2VkKGl0ZW1zLnJhbmdlKTtcbiAgICAgIHNldFZhbHVlKCd0aXRsZScsIGl0ZW1zLnRpdGxlKTtcbiAgICAgIHNldFZhbHVlKCdjb3VudGVyJywgU3RyaW5nKGl0ZW1zLmNvdW50ZXIpKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogbGFuZyDjgq/jg6njgrnjgpLmjIHjgaPjgZ/opoHntKDjga4gJ21zZ18nICsgZGF0YS1rZXnlsZ7mgKcg44GL44KJ6KiA6Kqe44Oh44OD44K744O844K444KS5Y+W5b6X44GX44CB6KaB57Sg44Gu44OG44Kt44K544OI44KS5aSJ5pu044GZ44KLXG4gICAqL1xuICBjb25zdCBzZXRMYW5nID0gKCkgPT4ge1xuICAgIC8v44OG44Kt44K544OI5aSJ5o+b5a++6LGh44Gu5Y+W5b6XXG4gICAgY29uc3QgdGFyZ2V0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xhbmcnKTtcblxuICAgIC8v5aSJ5o+b5Yem55CGXG4gICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IHRhcmdldHMubGVuZ3RoOyBpIDwgbWF4OyBpID0gKGkgKyAxKSB8IDApIHtcbiAgICAgIC8v5a++6LGh44KS5LiA5pem5aSJ5pWw44G45oy/5YWlXG4gICAgICBjb25zdCB0YXJnZXQgPSB0YXJnZXRzLml0ZW0oaSk7XG5cbiAgICAgIC8v5a++6LGh44GM5a2Y5Zyo44GX44Gq44GL44Gj44Gf44KJ44Gq44Gr44KC44GX44Gq44GEXG4gICAgICBpZiAodGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvL+ODoeODg+OCu+ODvOOCuOOCreODvOOCkuS4gOaXpuWkieaVsOOBuOaMv+WFpVxuICAgICAgY29uc3Qga2V5ID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKTtcblxuICAgICAgLy/jg6Hjg4Pjgrvjg7zjgrjjgq3jg7zjgYzlrZjlnKjjgZfjgarjgYvjgaPjgZ/jgonjgarjgavjgoLjgZfjgarjgYRcbiAgICAgIGlmIChrZXkgPT09IG51bGwpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8v44OG44Kt44K544OI6Kit5a6aXG4gICAgICB0YXJnZXQuaW5uZXJIVE1MID0gY2hyb21lLmkxOG4uZ2V0TWVzc2FnZSgnbXNnXycra2V5KTtcbiAgICB9XG4gIH07XG5cbiAgLy/jgqTjg5njg7Pjg4jjga7nmbvpjLJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHJlc3RvcmVfb3B0aW9ucyk7XG4gIGNvbnN0IHNhdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2F2ZScpO1xuICBpZiAoc2F2ZSAhPT0gbnVsbCkge1xuICAgIHNhdmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzYXZlX29wdGlvbnMpO1xuICB9XG5cbiAgLy/oqIDoqp7jgZTjgajjgavjg4bjgq3jgrnjg4joqK3lrppcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHNldExhbmcpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==