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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/options.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/options.js":
/*!************************!*\
  !*** ./src/options.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

//設定項目
//range: 'full' か 'display', 'perfect'.  デフォルト値は 'full'
//title: ダウンロードするファイル名が, ここに仕込んだ文字列+'.png' になる テンプレート変数を入れることも可能 デフォルトは {{title}}
//counter: 上記 title に {{counter}} で仕込めるカウンターの数値
//テンプレート変数
//{{title}}: タイトルタグの内容
//{{url}}: url の内容
//{{counter}}: counter の内容

/**
 * 保存
 */
function save_options() {
  //設定の取得
  let range = 'full';

  if (document.getElementById('display').checked) {
    range = 'display';
  } else if (document.getElementById('perfect').checked) {
    range = 'perfect';
  }

  const title = document.getElementById('title').value;
  const counter = Number(document.getElementById('counter').value); //保存

  chrome.storage.sync.set({
    range,
    title,
    counter
  }, function () {
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function () {
      status.textContent = '';
    }, 750);
  });
}
/**
 * 読み取り
 */


function restore_options() {
  chrome.storage.sync.get({
    range: 'full',
    title: '{{title}}',
    counter: 0
  }, function (items) {
    document.getElementById(items.range).checked = true;
    document.getElementById('title').value = items.title;
    document.getElementById('counter').value = items.counter;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wdGlvbnMuanMiXSwibmFtZXMiOlsic2F2ZV9vcHRpb25zIiwicmFuZ2UiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2hlY2tlZCIsInRpdGxlIiwidmFsdWUiLCJjb3VudGVyIiwiTnVtYmVyIiwiY2hyb21lIiwic3RvcmFnZSIsInN5bmMiLCJzZXQiLCJzdGF0dXMiLCJ0ZXh0Q29udGVudCIsInNldFRpbWVvdXQiLCJyZXN0b3JlX29wdGlvbnMiLCJnZXQiLCJpdGVtcyIsImFkZEV2ZW50TGlzdGVuZXIiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQSxTQUFTQSxZQUFULEdBQXdCO0FBQ3RCO0FBQ0EsTUFBSUMsS0FBSyxHQUFHLE1BQVo7O0FBQ0EsTUFBSUMsUUFBUSxDQUFDQyxjQUFULENBQXdCLFNBQXhCLEVBQW1DQyxPQUF2QyxFQUFnRDtBQUM5Q0gsU0FBSyxHQUFHLFNBQVI7QUFDRCxHQUZELE1BR0ssSUFBSUMsUUFBUSxDQUFDQyxjQUFULENBQXdCLFNBQXhCLEVBQW1DQyxPQUF2QyxFQUFnRDtBQUNuREgsU0FBSyxHQUFHLFNBQVI7QUFDRDs7QUFDRCxRQUFNSSxLQUFLLEdBQUdILFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixPQUF4QixFQUFpQ0csS0FBL0M7QUFDQSxRQUFNQyxPQUFPLEdBQUdDLE1BQU0sQ0FBQ04sUUFBUSxDQUFDQyxjQUFULENBQXdCLFNBQXhCLEVBQW1DRyxLQUFwQyxDQUF0QixDQVZzQixDQVl0Qjs7QUFDQUcsUUFBTSxDQUFDQyxPQUFQLENBQWVDLElBQWYsQ0FBb0JDLEdBQXBCLENBQXdCO0FBQUNYLFNBQUQ7QUFBUUksU0FBUjtBQUFlRTtBQUFmLEdBQXhCLEVBQWlELFlBQVc7QUFDMUQsVUFBTU0sTUFBTSxHQUFHWCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBZjtBQUNBVSxVQUFNLENBQUNDLFdBQVAsR0FBcUIsZ0JBQXJCO0FBQ0FDLGNBQVUsQ0FBQyxZQUFXO0FBQ3BCRixZQUFNLENBQUNDLFdBQVAsR0FBcUIsRUFBckI7QUFDRCxLQUZTLEVBRVAsR0FGTyxDQUFWO0FBR0QsR0FORDtBQU9EO0FBRUQ7Ozs7O0FBR0EsU0FBU0UsZUFBVCxHQUEyQjtBQUN6QlAsUUFBTSxDQUFDQyxPQUFQLENBQWVDLElBQWYsQ0FBb0JNLEdBQXBCLENBQXdCO0FBQ3RCaEIsU0FBSyxFQUFFLE1BRGU7QUFFdEJJLFNBQUssRUFBRSxXQUZlO0FBR3RCRSxXQUFPLEVBQUU7QUFIYSxHQUF4QixFQUlHLFVBQVNXLEtBQVQsRUFBZ0I7QUFDakJoQixZQUFRLENBQUNDLGNBQVQsQ0FBd0JlLEtBQUssQ0FBQ2pCLEtBQTlCLEVBQXFDRyxPQUFyQyxHQUErQyxJQUEvQztBQUNBRixZQUFRLENBQUNDLGNBQVQsQ0FBd0IsT0FBeEIsRUFBaUNHLEtBQWpDLEdBQXlDWSxLQUFLLENBQUNiLEtBQS9DO0FBQ0FILFlBQVEsQ0FBQ0MsY0FBVCxDQUF3QixTQUF4QixFQUFtQ0csS0FBbkMsR0FBMkNZLEtBQUssQ0FBQ1gsT0FBakQ7QUFDRCxHQVJEO0FBU0Q7O0FBRURMLFFBQVEsQ0FBQ2lCLGdCQUFULENBQTBCLGtCQUExQixFQUE4Q0gsZUFBOUM7QUFDQWQsUUFBUSxDQUFDQyxjQUFULENBQXdCLE1BQXhCLEVBQWdDZ0IsZ0JBQWhDLENBQWlELE9BQWpELEVBQTBEbkIsWUFBMUQsRSIsImZpbGUiOiJvcHRpb25zLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL29wdGlvbnMuanNcIik7XG4iLCIvL+ioreWumumgheebrlxyXG4vL3JhbmdlOiAnZnVsbCcg44GLICdkaXNwbGF5JywgJ3BlcmZlY3QnLiAg44OH44OV44Kp44Or44OI5YCk44GvICdmdWxsJ1xyXG4vL3RpdGxlOiDjg4Djgqbjg7Pjg63jg7zjg4njgZnjgovjg5XjgqHjgqTjg6vlkI3jgYwsIOOBk+OBk+OBq+S7lei+vOOCk+OBoOaWh+Wtl+WIlysnLnBuZycg44Gr44Gq44KLIOODhuODs+ODl+ODrOODvOODiOWkieaVsOOCkuWFpeOCjOOCi+OBk+OBqOOCguWPr+iDvSDjg4fjg5Xjgqnjg6vjg4jjga8ge3t0aXRsZX19XHJcbi8vY291bnRlcjog5LiK6KiYIHRpdGxlIOOBqyB7e2NvdW50ZXJ9fSDjgafku5XovrzjgoHjgovjgqvjgqbjg7Pjgr/jg7zjga7mlbDlgKRcclxuLy/jg4bjg7Pjg5fjg6zjg7zjg4jlpInmlbBcclxuLy97e3RpdGxlfX06IOOCv+OCpOODiOODq+OCv+OCsOOBruWGheWuuVxyXG4vL3t7dXJsfX06IHVybCDjga7lhoXlrrlcclxuLy97e2NvdW50ZXJ9fTogY291bnRlciDjga7lhoXlrrlcclxuXHJcbi8qKlxyXG4gKiDkv53lrZhcclxuICovXHJcbmZ1bmN0aW9uIHNhdmVfb3B0aW9ucygpIHtcclxuICAvL+ioreWumuOBruWPluW+l1xyXG4gIGxldCByYW5nZSA9ICdmdWxsJztcclxuICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXknKS5jaGVja2VkKSB7XHJcbiAgICByYW5nZSA9ICdkaXNwbGF5JztcclxuICB9XHJcbiAgZWxzZSBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BlcmZlY3QnKS5jaGVja2VkKSB7XHJcbiAgICByYW5nZSA9ICdwZXJmZWN0JztcclxuICB9XHJcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGl0bGUnKS52YWx1ZTtcclxuICBjb25zdCBjb3VudGVyID0gTnVtYmVyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3VudGVyJykudmFsdWUpO1xyXG5cclxuICAvL+S/neWtmFxyXG4gIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtyYW5nZSwgdGl0bGUsIGNvdW50ZXJ9LCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHN0YXR1cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGF0dXMnKTtcclxuICAgIHN0YXR1cy50ZXh0Q29udGVudCA9ICdPcHRpb25zIHNhdmVkLic7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICBzdGF0dXMudGV4dENvbnRlbnQgPSAnJztcclxuICAgIH0sIDc1MCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDoqq3jgb/lj5bjgopcclxuICovXHJcbmZ1bmN0aW9uIHJlc3RvcmVfb3B0aW9ucygpIHtcclxuICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldCh7XHJcbiAgICByYW5nZTogJ2Z1bGwnLFxyXG4gICAgdGl0bGU6ICd7e3RpdGxlfX0nLFxyXG4gICAgY291bnRlcjogMFxyXG4gIH0sIGZ1bmN0aW9uKGl0ZW1zKSB7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpdGVtcy5yYW5nZSkuY2hlY2tlZCA9IHRydWU7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGl0bGUnKS52YWx1ZSA9IGl0ZW1zLnRpdGxlO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvdW50ZXInKS52YWx1ZSA9IGl0ZW1zLmNvdW50ZXI7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCByZXN0b3JlX29wdGlvbnMpO1xyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2F2ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2F2ZV9vcHRpb25zKTtcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==