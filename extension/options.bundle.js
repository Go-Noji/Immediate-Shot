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
            status.textContent = 'Options saved.';
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
    //イベントの登録
    document.addEventListener('DOMContentLoaded', restore_options);
    const save = document.getElementById('save');
    if (save !== null) {
        addEventListener('click', save_options);
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsTUFBTTtBQUNOLHVEQUF1RDtBQUN2RCxpRkFBaUY7QUFDakYsK0NBQStDO0FBQy9DLFVBQVU7QUFDVixzQkFBc0I7QUFDdEIsa0JBQWtCO0FBQ2xCLDBCQUEwQjtBQUMxQjtJQUNFOzs7T0FHRztJQUNILE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxNQUFXLEVBQThCLEVBQUU7UUFDckUsT0FBTyxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO0lBQ3ZELENBQUMsQ0FBQztJQUVGOzs7T0FHRztJQUNILE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxNQUFXLEVBQStCLEVBQUU7UUFDM0UsT0FBTyxNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDO0lBQ3BGLENBQUMsQ0FBQztJQUVGOzs7O09BSUc7SUFDSCxNQUFNLFFBQVEsR0FBRyxDQUFDLEVBQVUsRUFBVSxFQUFFO1FBQ3RDLFFBQVE7UUFDUixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTNDLHNCQUFzQjtRQUN0QixJQUFLLENBQUUsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDakMsT0FBTyxFQUFFLENBQUM7U0FDWDtRQUVELGVBQWU7UUFDZixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQyxDQUFDO0lBRUY7Ozs7T0FJRztJQUNILE1BQU0sUUFBUSxHQUFHLENBQUMsRUFBVSxFQUFFLEtBQWEsRUFBRSxFQUFFO1FBQzdDLFFBQVE7UUFDUixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTNDLHNCQUFzQjtRQUN0QixJQUFLLENBQUUsa0JBQWtCLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDakMsT0FBTztTQUNSO1FBRUQsS0FBSztRQUNMLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUMsQ0FBQztJQUVGOzs7T0FHRztJQUNILE1BQU0sU0FBUyxHQUFHLENBQUMsRUFBVSxFQUFXLEVBQUU7UUFDeEMsUUFBUTtRQUNSLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFM0MscUJBQXFCO1FBQ3JCLElBQUssQ0FBRSx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN0QyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsaUJBQWlCO1FBQ2pCLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDLENBQUM7SUFFRjs7O09BR0c7SUFDSCxNQUFNLFVBQVUsR0FBRyxDQUFDLEVBQVUsRUFBRSxFQUFFO1FBQ2hDLFFBQVE7UUFDUixNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTNDLHlCQUF5QjtRQUN6QixJQUFLLENBQUUsdUJBQXVCLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDdEMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE1BQU07UUFDTixNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDLENBQUM7SUFFRjs7T0FFRztJQUNILE1BQU0sWUFBWSxHQUFHLEdBQUcsRUFBRTtRQUN4QixjQUFjO1FBQ2QsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDO1FBQ25CLElBQUksU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3hCLEtBQUssR0FBRyxTQUFTLENBQUM7U0FDbkI7YUFDSSxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUM3QixLQUFLLEdBQUcsU0FBUyxDQUFDO1NBQ25CO1FBRUQsY0FBYztRQUNkLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVoQyxnQkFBZ0I7UUFDaEIsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBRTVDLElBQUk7UUFDSixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBQyxFQUFFLEdBQUcsRUFBRTtZQUNwRCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtnQkFDbkIsT0FBTzthQUNSO1lBQ0QsTUFBTSxDQUFDLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQztZQUN0QyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNkLE1BQU0sQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQzFCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNWLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0lBRUY7O09BRUc7SUFDSCxNQUFNLGVBQWUsR0FBRyxHQUFHLEVBQUU7UUFDM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQ3RCLEtBQUssRUFBRSxNQUFNO1lBQ2IsS0FBSyxFQUFFLFdBQVc7WUFDbEIsT0FBTyxFQUFFLENBQUM7U0FDWCxFQUFFLENBQUMsS0FBOEIsRUFBRSxFQUFFO1lBQ3BDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEIsUUFBUSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDL0IsUUFBUSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7SUFFRixTQUFTO0lBQ1QsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQy9ELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0MsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO1FBQ2pCLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztLQUN6QztDQUNGIiwiZmlsZSI6Im9wdGlvbnMuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvb3B0aW9ucy50c1wiKTtcbiIsIi8v6Kit5a6a6aCF55uuXG4vL3JhbmdlOiAnZnVsbCcg44GLICdkaXNwbGF5JywgJ3BlcmZlY3QnLiAg44OH44OV44Kp44Or44OI5YCk44GvICdmdWxsJ1xuLy90aXRsZTog44OA44Km44Oz44Ot44O844OJ44GZ44KL44OV44Kh44Kk44Or5ZCN44GMLCDjgZPjgZPjgavku5XovrzjgpPjgaDmloflrZfliJcrJy5wbmcnIOOBq+OBquOCiyDjg4bjg7Pjg5fjg6zjg7zjg4jlpInmlbDjgpLlhaXjgozjgovjgZPjgajjgoLlj6/og70g44OH44OV44Kp44Or44OI44GvIHt7dGl0bGV9fVxuLy9jb3VudGVyOiDkuIroqJggdGl0bGUg44GrIHt7Y291bnRlcn19IOOBp+S7lei+vOOCgeOCi+OCq+OCpuODs+OCv+ODvOOBruaVsOWApFxuLy/jg4bjg7Pjg5fjg6zjg7zjg4jlpInmlbBcbi8ve3t0aXRsZX19OiDjgr/jgqTjg4jjg6vjgr/jgrDjga7lhoXlrrlcbi8ve3t1cmx9fTogdXJsIOOBruWGheWuuVxuLy97e2NvdW50ZXJ9fTogY291bnRlciDjga7lhoXlrrlcbntcbiAgLyoqXG4gICAqIHRhcmdldCDjga8gdmFsdWUg5YCk44KS5oyB44Gj44Gm44GE44KL44GL5Yik5a6aXG4gICAqIEBwYXJhbSB0YXJnZXRcbiAgICovXG4gIGNvbnN0IGlzSFRNTElucHV0RWxlbWVudCA9ICh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBIVE1MSW5wdXRFbGVtZW50ID0+IHtcbiAgICByZXR1cm4gdGFyZ2V0ICE9PSBudWxsICYmIHRhcmdldC52YWx1ZSAhPT0gdW5kZWZpbmVkO1xuICB9O1xuXG4gIC8qKlxuICAgKiB0YXJnZXQg44Gv44Op44K444Kq44Oc44K/44Oz44GL5Yik5a6aXG4gICAqIEBwYXJhbSB0YXJnZXRcbiAgICovXG4gIGNvbnN0IGlzSFRNTFJhZGlvSW5wdXRFbGVtZW50ID0gKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIEhUTUxJbnB1dEVsZW1lbnQgID0+IHtcbiAgICByZXR1cm4gdGFyZ2V0ICE9PSBudWxsICYmIHRhcmdldC50eXBlID09PSAncmFkaW8nICYmIHRhcmdldC5jaGVja2VkICE9PSB1bmRlZmluZWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIGlkIOWxnuaAp+OBjCBpZCDjga7opoHntKDjgYzmjIHjgaQgdmFsdWUg5YCk44KS6L+U44GZXG4gICAqIHZhbHVlIOWApOOBjOWtmOWcqOOBl+OBquOBi+OBo+OBn+WgtOWQiOOBr+epuuaWh+Wtl+OCkui/lOOBmVxuICAgKiBAcGFyYW0gaWRcbiAgICovXG4gIGNvbnN0IGdldFZhbHVlID0gKGlkOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICAgIC8vaWQg44Gn5o2V5o2JXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuXG4gICAgLy9ET00g44GM5YWl5Yqb5qyE44Gn44Gq44GL44Gj44Gf44KJ56m65paH5a2X44KS6L+U44GZXG4gICAgaWYgKCAhIGlzSFRNTElucHV0RWxlbWVudCh0YXJnZXQpKSB7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgLy92YWx1ZSDjgpLjgZ3jga7jgb7jgb7ov5TjgZlcbiAgICByZXR1cm4gdGFyZ2V0LnZhbHVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBpZCDlsZ7mgKfjgYwgaWQg44Gu6KaB57Sg44GM5oyB44GkIHZhbHVlIOWxnuaAp+OCkiB2YWx1ZSDjgavjgZnjgotcbiAgICogQHBhcmFtIGlkXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKi9cbiAgY29uc3Qgc2V0VmFsdWUgPSAoaWQ6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4ge1xuICAgIC8vaWQg44Gn5o2V5o2JXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuXG4gICAgLy9ET00g44GM5YWl5Yqb5qyE44Gn44Gq44GL44Gj44Gf44KJ44Gq44Gr44KC44GX44Gq44GEXG4gICAgaWYgKCAhIGlzSFRNTElucHV0RWxlbWVudCh0YXJnZXQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy/jgrvjg4Pjg4hcbiAgICB0YXJnZXQudmFsdWUgPSB2YWx1ZTtcbiAgfTtcblxuICAvKipcbiAgICogaWQg5bGe5oCn44GMIGlkIOOBruimgee0oOOBjOODqeOCuOOCquODnOOCv+ODs+OBi+OBpOOAgeODgeOCp+ODg+OCr+OBleOCjOOBpuOBhOOCi+OBi+WIpOWumlxuICAgKiBAcGFyYW0gaWRcbiAgICovXG4gIGNvbnN0IGlzQ2hlY2tlZCA9IChpZDogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gICAgLy9pZCDjgafmjZXmjYlcbiAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG5cbiAgICAvL0RPTSDjgYzjg6njgrjjgqrjg5zjgr/jg7PjgafjgarjgYvjgaPjgZ/jgonlpLHmlZdcbiAgICBpZiAoICEgaXNIVE1MUmFkaW9JbnB1dEVsZW1lbnQodGFyZ2V0KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vY2hlY2tlZCDjgpLjgZ3jga7jgb7jgb7ov5TjgZlcbiAgICByZXR1cm4gdGFyZ2V0LmNoZWNrZWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIGlkIOWxnuaAp+OBjCBpZCDjga7opoHntKDjgYzjg6njgrjjgqrjg5zjgr/jg7PjgpLjg4Hjgqfjg4Pjgq/nirbmhYvjgavjgZnjgotcbiAgICogQHBhcmFtIGlkXG4gICAqL1xuICBjb25zdCBzZXRDaGVja2VkID0gKGlkOiBzdHJpbmcpID0+IHtcbiAgICAvL2lkIOOBp+aNleaNiVxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcblxuICAgIC8vRE9NIOOBjOODqeOCuOOCquODnOOCv+ODs+OBp+OBquOBi+OBo+OBn+OCieOBquOBq+OCguOBl+OBquOBhFxuICAgIGlmICggISBpc0hUTUxSYWRpb0lucHV0RWxlbWVudCh0YXJnZXQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy/jg4Hjgqfjg4Pjgq9cbiAgICB0YXJnZXQuY2hlY2tlZCA9IHRydWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIOS/neWtmFxuICAgKi9cbiAgY29uc3Qgc2F2ZV9vcHRpb25zID0gKCkgPT4ge1xuICAgIC8v6Kit5a6a44Gu5Y+W5b6XKHJhbmdlKVxuICAgIGxldCByYW5nZSA9ICdmdWxsJztcbiAgICBpZiAoaXNDaGVja2VkKCdkaXNwbGF5JykpIHtcbiAgICAgIHJhbmdlID0gJ2Rpc3BsYXknO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc0NoZWNrZWQoJ3BlcmZlY3QnKSkge1xuICAgICAgcmFuZ2UgPSAncGVyZmVjdCc7XG4gICAgfVxuXG4gICAgLy/oqK3lrprjga7lj5blvpcodGl0bGUpXG4gICAgY29uc3QgdGl0bGUgPSBnZXRWYWx1ZSgndGl0bGUnKTtcblxuICAgIC8v6Kit5a6a44Gu5Y+W5b6XKGNvdW50ZXIpXG4gICAgY29uc3QgY291bnRlciA9IE51bWJlcihnZXRWYWx1ZSgnY291bnRlcicpKTtcblxuICAgIC8v5L+d5a2YXG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe3JhbmdlLCB0aXRsZSwgY291bnRlcn0sICgpID0+IHtcbiAgICAgIGNvbnN0IHN0YXR1cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGF0dXMnKTtcbiAgICAgIGlmIChzdGF0dXMgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc3RhdHVzLnRleHRDb250ZW50ID0gJ09wdGlvbnMgc2F2ZWQuJztcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzdGF0dXMudGV4dENvbnRlbnQgPSAnJztcbiAgICAgIH0sIDc1MCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIOiqreOBv+WPluOCilxuICAgKi9cbiAgY29uc3QgcmVzdG9yZV9vcHRpb25zID0gKCkgPT4ge1xuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KHtcbiAgICAgIHJhbmdlOiAnZnVsbCcsXG4gICAgICB0aXRsZTogJ3t7dGl0bGV9fScsXG4gICAgICBjb3VudGVyOiAwXG4gICAgfSwgKGl0ZW1zOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSkgPT4ge1xuICAgICAgc2V0Q2hlY2tlZChpdGVtcy5yYW5nZSk7XG4gICAgICBzZXRWYWx1ZSgndGl0bGUnLCBpdGVtcy50aXRsZSk7XG4gICAgICBzZXRWYWx1ZSgnY291bnRlcicsIFN0cmluZyhpdGVtcy5jb3VudGVyKSk7XG4gICAgfSk7XG4gIH07XG5cbiAgLy/jgqTjg5njg7Pjg4jjga7nmbvpjLJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIHJlc3RvcmVfb3B0aW9ucyk7XG4gIGNvbnN0IHNhdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2F2ZScpO1xuICBpZiAoc2F2ZSAhPT0gbnVsbCkge1xuICAgIGFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2F2ZV9vcHRpb25zKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==