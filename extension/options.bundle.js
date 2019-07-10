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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsTUFBTTtBQUNOLHVEQUF1RDtBQUN2RCxpRkFBaUY7QUFDakYsK0NBQStDO0FBQy9DLFVBQVU7QUFDVixzQkFBc0I7QUFDdEIsa0JBQWtCO0FBQ2xCLDBCQUEwQjtBQUMxQjtJQUNFOzs7T0FHRztJQUNILE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxNQUFXLEVBQThCLEVBQUU7UUFDckUsT0FBTyxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO0lBQ3ZELENBQUMsQ0FBQztJQUVGOzs7T0FHRztJQUNILE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxNQUFXLEVBQStCLEVBQUU7UUFDM0UsT0FBTyxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDO0lBQ3BGLENBQUMsQ0FBQztJQUVGOzs7O09BSUc7SUFDSCxNQUFNLFFBQVEsR0FBRyxDQUFDLEVBQVUsRUFBVSxFQUFFO1FBQ3RDLFFBQVE7UUFDUixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTNDLHNCQUFzQjtRQUN0QixJQUFLLENBQUUsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDakMsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELGVBQWU7UUFDZixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQyxDQUFDO0lBRUY7Ozs7T0FJRztJQUNILE1BQU0sUUFBUSxHQUFHLENBQUMsRUFBVSxFQUFFLEtBQWEsRUFBRSxFQUFFO1FBQzdDLFFBQVE7UUFDUixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTNDLHNCQUFzQjtRQUN0QixJQUFLLENBQUUsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDakMsT0FBTztTQUNSO1FBRUQsS0FBSztRQUNMLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUMsQ0FBQztJQUVGOzs7T0FHRztJQUNILE1BQU0sU0FBUyxHQUFHLENBQUMsRUFBVSxFQUFXLEVBQUU7UUFDeEMsUUFBUTtRQUNSLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFM0MscUJBQXFCO1FBQ3JCLElBQUssQ0FBRSx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN0QyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsaUJBQWlCO1FBQ2pCLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDLENBQUM7SUFFRjs7O09BR0c7SUFDSCxNQUFNLFVBQVUsR0FBRyxDQUFDLEVBQVUsRUFBRSxFQUFFO1FBQ2hDLFFBQVE7UUFDUixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTNDLHlCQUF5QjtRQUN6QixJQUFLLENBQUUsdUJBQXVCLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdEMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE1BQU07UUFDTixNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDLENBQUM7SUFFRjs7T0FFRztJQUNILE1BQU0sWUFBWSxHQUFHLEdBQUcsRUFBRTtRQUN4QixjQUFjO1FBQ2QsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ25CLElBQUksU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3hCLEtBQUssR0FBRyxTQUFTLENBQUM7U0FDbkI7YUFDSSxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUM3QixLQUFLLEdBQUcsU0FBUyxDQUFDO1NBQ25CO1FBRUQsY0FBYztRQUNkLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVoQyxnQkFBZ0I7UUFDaEIsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBRTVDLElBQUk7UUFDSixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBQyxFQUFFLEdBQUcsRUFBRTtZQUNwRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtnQkFDbkIsT0FBTzthQUNSO1lBQ0QsTUFBTSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN6RCxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLE1BQU0sQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQzFCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNWLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0lBRUY7O09BRUc7SUFDSCxNQUFNLGVBQWUsR0FBRyxHQUFHLEVBQUU7UUFDM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQ3RCLEtBQUssRUFBRSxNQUFNO1lBQ2IsS0FBSyxFQUFFLFdBQVc7WUFDbEIsT0FBTyxFQUFFLENBQUM7U0FDWCxFQUFFLENBQUMsS0FBOEIsRUFBRSxFQUFFO1lBQ3BDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEIsUUFBUSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsUUFBUSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxHQUFHLEVBQUU7UUFDbkIsYUFBYTtRQUNiLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV4RCxNQUFNO1FBQ04sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzlELFlBQVk7WUFDWixNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRS9CLG1CQUFtQjtZQUNuQixJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7Z0JBQ25CLFNBQVM7YUFDVjtZQUVELGlCQUFpQjtZQUNqQixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBRTVDLHdCQUF3QjtZQUN4QixJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7Z0JBQ2hCLFNBQVM7YUFDVjtZQUVELFFBQVE7WUFDUixNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2RDtJQUNILENBQUMsQ0FBQztJQUVGLFNBQVM7SUFDVCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDL0QsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QyxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7UUFDakIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztLQUM5QztJQUVELGFBQWE7SUFDYixRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FDeEQiLCJmaWxlIjoib3B0aW9ucy5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9vcHRpb25zLnRzXCIpO1xuIiwiLy/oqK3lrprpoIXnm65cbi8vcmFuZ2U6ICdmdWxsJyDjgYsgJ2Rpc3BsYXknLCAncGVyZmVjdCcuICDjg4fjg5Xjgqnjg6vjg4jlgKTjga8gJ2Z1bGwnXG4vL3RpdGxlOiDjg4Djgqbjg7Pjg63jg7zjg4njgZnjgovjg5XjgqHjgqTjg6vlkI3jgYwsIOOBk+OBk+OBq+S7lei+vOOCk+OBoOaWh+Wtl+WIlysnLnBuZycg44Gr44Gq44KLIOODhuODs+ODl+ODrOODvOODiOWkieaVsOOCkuWFpeOCjOOCi+OBk+OBqOOCguWPr+iDvSDjg4fjg5Xjgqnjg6vjg4jjga8ge3t0aXRsZX19XG4vL2NvdW50ZXI6IOS4iuiomCB0aXRsZSDjgasge3tjb3VudGVyfX0g44Gn5LuV6L6844KB44KL44Kr44Km44Oz44K/44O844Gu5pWw5YCkXG4vL+ODhuODs+ODl+ODrOODvOODiOWkieaVsFxuLy97e3RpdGxlfX06IOOCv+OCpOODiOODq+OCv+OCsOOBruWGheWuuVxuLy97e3VybH19OiB1cmwg44Gu5YaF5a65XG4vL3t7Y291bnRlcn19OiBjb3VudGVyIOOBruWGheWuuVxue1xuICAvKipcbiAgICogdGFyZ2V0IOOBryB2YWx1ZSDlgKTjgpLmjIHjgaPjgabjgYTjgovjgYvliKTlrppcbiAgICogQHBhcmFtIHRhcmdldFxuICAgKi9cbiAgY29uc3QgaXNIVE1MSW5wdXRFbGVtZW50ID0gKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIEhUTUxJbnB1dEVsZW1lbnQgPT4ge1xuICAgIHJldHVybiB0YXJnZXQgIT09IG51bGwgJiYgdGFyZ2V0LnZhbHVlICE9PSB1bmRlZmluZWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIHRhcmdldCDjga/jg6njgrjjgqrjg5zjgr/jg7PjgYvliKTlrppcbiAgICogQHBhcmFtIHRhcmdldFxuICAgKi9cbiAgY29uc3QgaXNIVE1MUmFkaW9JbnB1dEVsZW1lbnQgPSAodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgSFRNTElucHV0RWxlbWVudCAgPT4ge1xuICAgIHJldHVybiB0YXJnZXQgIT09IG51bGwgJiYgdGFyZ2V0LnR5cGUgPT09ICdyYWRpbycgJiYgdGFyZ2V0LmNoZWNrZWQgIT09IHVuZGVmaW5lZDtcbiAgfTtcblxuICAvKipcbiAgICogaWQg5bGe5oCn44GMIGlkIOOBruimgee0oOOBjOaMgeOBpCB2YWx1ZSDlgKTjgpLov5TjgZlcbiAgICogdmFsdWUg5YCk44GM5a2Y5Zyo44GX44Gq44GL44Gj44Gf5aC05ZCI44Gv56m65paH5a2X44KS6L+U44GZXG4gICAqIEBwYXJhbSBpZFxuICAgKi9cbiAgY29uc3QgZ2V0VmFsdWUgPSAoaWQ6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgLy9pZCDjgafmjZXmjYlcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG5cbiAgICAvL0RPTSDjgYzlhaXlipvmrITjgafjgarjgYvjgaPjgZ/jgonnqbrmloflrZfjgpLov5TjgZlcbiAgICBpZiAoICEgaXNIVE1MSW5wdXRFbGVtZW50KHRhcmdldCkpIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICAvL3ZhbHVlIOOCkuOBneOBruOBvuOBvui/lOOBmVxuICAgIHJldHVybiB0YXJnZXQudmFsdWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIGlkIOWxnuaAp+OBjCBpZCDjga7opoHntKDjgYzmjIHjgaQgdmFsdWUg5bGe5oCn44KSIHZhbHVlIOOBq+OBmeOCi1xuICAgKiBAcGFyYW0gaWRcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqL1xuICBjb25zdCBzZXRWYWx1ZSA9IChpZDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgLy9pZCDjgafmjZXmjYlcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG5cbiAgICAvL0RPTSDjgYzlhaXlipvmrITjgafjgarjgYvjgaPjgZ/jgonjgarjgavjgoLjgZfjgarjgYRcbiAgICBpZiAoICEgaXNIVE1MSW5wdXRFbGVtZW50KHRhcmdldCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvL+OCu+ODg+ODiFxuICAgIHRhcmdldC52YWx1ZSA9IHZhbHVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBpZCDlsZ7mgKfjgYwgaWQg44Gu6KaB57Sg44GM44Op44K444Kq44Oc44K/44Oz44GL44Gk44CB44OB44Kn44OD44Kv44GV44KM44Gm44GE44KL44GL5Yik5a6aXG4gICAqIEBwYXJhbSBpZFxuICAgKi9cbiAgY29uc3QgaXNDaGVja2VkID0gKGlkOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICAvL2lkIOOBp+aNleaNiVxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblxuICAgIC8vRE9NIOOBjOODqeOCuOOCquODnOOCv+ODs+OBp+OBquOBi+OBo+OBn+OCieWkseaVl1xuICAgIGlmICggISBpc0hUTUxSYWRpb0lucHV0RWxlbWVudCh0YXJnZXQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy9jaGVja2VkIOOCkuOBneOBruOBvuOBvui/lOOBmVxuICAgIHJldHVybiB0YXJnZXQuY2hlY2tlZDtcbiAgfTtcblxuICAvKipcbiAgICogaWQg5bGe5oCn44GMIGlkIOOBruimgee0oOOBjOODqeOCuOOCquODnOOCv+ODs+OCkuODgeOCp+ODg+OCr+eKtuaFi+OBq+OBmeOCi1xuICAgKiBAcGFyYW0gaWRcbiAgICovXG4gIGNvbnN0IHNldENoZWNrZWQgPSAoaWQ6IHN0cmluZykgPT4ge1xuICAgIC8vaWQg44Gn5o2V5o2JXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuXG4gICAgLy9ET00g44GM44Op44K444Kq44Oc44K/44Oz44Gn44Gq44GL44Gj44Gf44KJ44Gq44Gr44KC44GX44Gq44GEXG4gICAgaWYgKCAhIGlzSFRNTFJhZGlvSW5wdXRFbGVtZW50KHRhcmdldCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvL+ODgeOCp+ODg+OCr1xuICAgIHRhcmdldC5jaGVja2VkID0gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICog5L+d5a2YXG4gICAqL1xuICBjb25zdCBzYXZlX29wdGlvbnMgPSAoKSA9PiB7XG4gICAgLy/oqK3lrprjga7lj5blvpcocmFuZ2UpXG4gICAgbGV0IHJhbmdlID0gJ2Z1bGwnO1xuICAgIGlmIChpc0NoZWNrZWQoJ2Rpc3BsYXknKSkge1xuICAgICAgcmFuZ2UgPSAnZGlzcGxheSc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzQ2hlY2tlZCgncGVyZmVjdCcpKSB7XG4gICAgICByYW5nZSA9ICdwZXJmZWN0JztcbiAgICB9XG5cbiAgICAvL+ioreWumuOBruWPluW+lyh0aXRsZSlcbiAgICBjb25zdCB0aXRsZSA9IGdldFZhbHVlKCd0aXRsZScpO1xuXG4gICAgLy/oqK3lrprjga7lj5blvpcoY291bnRlcilcbiAgICBjb25zdCBjb3VudGVyID0gTnVtYmVyKGdldFZhbHVlKCdjb3VudGVyJykpO1xuXG4gICAgLy/kv53lrZhcbiAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldCh7cmFuZ2UsIHRpdGxlLCBjb3VudGVyfSwgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdHVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXR1cycpO1xuICAgICAgaWYgKHN0YXR1cyA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzdGF0dXMudGV4dENvbnRlbnQgPSBjaHJvbWUuaTE4bi5nZXRNZXNzYWdlKCdtc2dfc2F2ZWQnKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzdGF0dXMudGV4dENvbnRlbnQgPSAnJztcbiAgICAgIH0sIDc1MCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIOiqreOBv+WPluOCilxuICAgKi9cbiAgY29uc3QgcmVzdG9yZV9vcHRpb25zID0gKCkgPT4ge1xuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KHtcbiAgICAgIHJhbmdlOiAnZnVsbCcsXG4gICAgICB0aXRsZTogJ3t7dGl0bGV9fScsXG4gICAgICBjb3VudGVyOiAwXG4gICAgfSwgKGl0ZW1zOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSkgPT4ge1xuICAgICAgc2V0Q2hlY2tlZChpdGVtcy5yYW5nZSk7XG4gICAgICBzZXRWYWx1ZSgndGl0bGUnLCBpdGVtcy50aXRsZSk7XG4gICAgICBzZXRWYWx1ZSgnY291bnRlcicsIFN0cmluZyhpdGVtcy5jb3VudGVyKSk7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3Qgc2V0TGFuZyA9ICgpID0+IHtcbiAgICAvL+ODhuOCreOCueODiOWkieaPm+WvvuixoeOBruWPluW+l1xuICAgIGNvbnN0IHRhcmdldHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsYW5nJyk7XG5cbiAgICAvL+WkieaPm+WHpueQhlxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSB0YXJnZXRzLmxlbmd0aDsgaSA8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XG4gICAgICAvL+WvvuixoeOCkuS4gOaXpuWkieaVsOOBuOaMv+WFpVxuICAgICAgY29uc3QgdGFyZ2V0ID0gdGFyZ2V0cy5pdGVtKGkpO1xuXG4gICAgICAvL+WvvuixoeOBjOWtmOWcqOOBl+OBquOBi+OBo+OBn+OCieOBquOBq+OCguOBl+OBquOBhFxuICAgICAgaWYgKHRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy/jg6Hjg4Pjgrvjg7zjgrjjgq3jg7zjgpLkuIDml6blpInmlbDjgbjmjL/lhaVcbiAgICAgIGNvbnN0IGtleSA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5Jyk7XG5cbiAgICAgIC8v44Oh44OD44K744O844K444Kt44O844GM5a2Y5Zyo44GX44Gq44GL44Gj44Gf44KJ44Gq44Gr44KC44GX44Gq44GEXG4gICAgICBpZiAoa2V5ID09PSBudWxsKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvL+ODhuOCreOCueODiOioreWumlxuICAgICAgdGFyZ2V0LmlubmVySFRNTCA9IGNocm9tZS5pMThuLmdldE1lc3NhZ2UoJ21zZ18nK2tleSk7XG4gICAgfVxuICB9O1xuXG4gIC8v44Kk44OZ44Oz44OI44Gu55m76YyyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCByZXN0b3JlX29wdGlvbnMpO1xuICBjb25zdCBzYXZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmUnKTtcbiAgaWYgKHNhdmUgIT09IG51bGwpIHtcbiAgICBzYXZlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2F2ZV9vcHRpb25zKTtcbiAgfVxuXG4gIC8v6KiA6Kqe44GU44Go44Gr44OG44Kt44K544OI6Kit5a6aXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBzZXRMYW5nKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=