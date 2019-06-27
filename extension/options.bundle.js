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
//range: 'full' か 'display'.  デフォルト値は 'full'
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
  const range = document.getElementById('display').checked ? 'display' : 'full';
  const title = document.getElementById('title').value;
  const counter = Number(document.getElementById('counter').value);
  chrome.storage.sync.set({
    range,
    title,
    counter
  }, function () {
    var status = document.getElementById('status');
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
    if (items.range === 'display') {
      document.getElementById('display').checked = true;
    } else {
      document.getElementById('full').checked = true;
    }

    document.getElementById('title').value = items.title;
    document.getElementById('counter').value = items.counter;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL29wdGlvbnMuanMiXSwibmFtZXMiOlsic2F2ZV9vcHRpb25zIiwicmFuZ2UiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY2hlY2tlZCIsInRpdGxlIiwidmFsdWUiLCJjb3VudGVyIiwiTnVtYmVyIiwiY2hyb21lIiwic3RvcmFnZSIsInN5bmMiLCJzZXQiLCJzdGF0dXMiLCJ0ZXh0Q29udGVudCIsInNldFRpbWVvdXQiLCJyZXN0b3JlX29wdGlvbnMiLCJnZXQiLCJpdGVtcyIsImFkZEV2ZW50TGlzdGVuZXIiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQSxTQUFTQSxZQUFULEdBQXdCO0FBQ3RCLFFBQU1DLEtBQUssR0FBR0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLFNBQXhCLEVBQW1DQyxPQUFuQyxHQUE2QyxTQUE3QyxHQUF5RCxNQUF2RTtBQUNBLFFBQU1DLEtBQUssR0FBR0gsUUFBUSxDQUFDQyxjQUFULENBQXdCLE9BQXhCLEVBQWlDRyxLQUEvQztBQUNBLFFBQU1DLE9BQU8sR0FBR0MsTUFBTSxDQUFDTixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsU0FBeEIsRUFBbUNHLEtBQXBDLENBQXRCO0FBQ0FHLFFBQU0sQ0FBQ0MsT0FBUCxDQUFlQyxJQUFmLENBQW9CQyxHQUFwQixDQUF3QjtBQUFDWCxTQUFEO0FBQVFJLFNBQVI7QUFBZUU7QUFBZixHQUF4QixFQUFpRCxZQUFXO0FBQzFELFFBQUlNLE1BQU0sR0FBR1gsUUFBUSxDQUFDQyxjQUFULENBQXdCLFFBQXhCLENBQWI7QUFDQVUsVUFBTSxDQUFDQyxXQUFQLEdBQXFCLGdCQUFyQjtBQUNBQyxjQUFVLENBQUMsWUFBVztBQUNwQkYsWUFBTSxDQUFDQyxXQUFQLEdBQXFCLEVBQXJCO0FBQ0QsS0FGUyxFQUVQLEdBRk8sQ0FBVjtBQUdELEdBTkQ7QUFPRDtBQUVEOzs7OztBQUdBLFNBQVNFLGVBQVQsR0FBMkI7QUFDekJQLFFBQU0sQ0FBQ0MsT0FBUCxDQUFlQyxJQUFmLENBQW9CTSxHQUFwQixDQUF3QjtBQUN0QmhCLFNBQUssRUFBRSxNQURlO0FBRXRCSSxTQUFLLEVBQUUsV0FGZTtBQUd0QkUsV0FBTyxFQUFFO0FBSGEsR0FBeEIsRUFJRyxVQUFTVyxLQUFULEVBQWdCO0FBQ2pCLFFBQUlBLEtBQUssQ0FBQ2pCLEtBQU4sS0FBZ0IsU0FBcEIsRUFBK0I7QUFDN0JDLGNBQVEsQ0FBQ0MsY0FBVCxDQUF3QixTQUF4QixFQUFtQ0MsT0FBbkMsR0FBNkMsSUFBN0M7QUFDRCxLQUZELE1BR0s7QUFDSEYsY0FBUSxDQUFDQyxjQUFULENBQXdCLE1BQXhCLEVBQWdDQyxPQUFoQyxHQUEwQyxJQUExQztBQUNEOztBQUNERixZQUFRLENBQUNDLGNBQVQsQ0FBd0IsT0FBeEIsRUFBaUNHLEtBQWpDLEdBQXlDWSxLQUFLLENBQUNiLEtBQS9DO0FBQ0FILFlBQVEsQ0FBQ0MsY0FBVCxDQUF3QixTQUF4QixFQUFtQ0csS0FBbkMsR0FBMkNZLEtBQUssQ0FBQ1gsT0FBakQ7QUFDRCxHQWJEO0FBY0Q7O0FBRURMLFFBQVEsQ0FBQ2lCLGdCQUFULENBQTBCLGtCQUExQixFQUE4Q0gsZUFBOUM7QUFDQWQsUUFBUSxDQUFDQyxjQUFULENBQXdCLE1BQXhCLEVBQWdDZ0IsZ0JBQWhDLENBQWlELE9BQWpELEVBQTBEbkIsWUFBMUQsRSIsImZpbGUiOiJvcHRpb25zLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL29wdGlvbnMuanNcIik7XG4iLCIvL+ioreWumumgheebrlxyXG4vL3JhbmdlOiAnZnVsbCcg44GLICdkaXNwbGF5Jy4gIOODh+ODleOCqeODq+ODiOWApOOBryAnZnVsbCdcclxuLy90aXRsZTog44OA44Km44Oz44Ot44O844OJ44GZ44KL44OV44Kh44Kk44Or5ZCN44GMLCDjgZPjgZPjgavku5XovrzjgpPjgaDmloflrZfliJcrJy5wbmcnIOOBq+OBquOCiyDjg4bjg7Pjg5fjg6zjg7zjg4jlpInmlbDjgpLlhaXjgozjgovjgZPjgajjgoLlj6/og70g44OH44OV44Kp44Or44OI44GvIHt7dGl0bGV9fVxyXG4vL2NvdW50ZXI6IOS4iuiomCB0aXRsZSDjgasge3tjb3VudGVyfX0g44Gn5LuV6L6844KB44KL44Kr44Km44Oz44K/44O844Gu5pWw5YCkXHJcbi8v44OG44Oz44OX44Os44O844OI5aSJ5pWwXHJcbi8ve3t0aXRsZX19OiDjgr/jgqTjg4jjg6vjgr/jgrDjga7lhoXlrrlcclxuLy97e3VybH19OiB1cmwg44Gu5YaF5a65XHJcbi8ve3tjb3VudGVyfX06IGNvdW50ZXIg44Gu5YaF5a65XHJcblxyXG4vKipcclxuICog5L+d5a2YXHJcbiAqL1xyXG5mdW5jdGlvbiBzYXZlX29wdGlvbnMoKSB7XHJcbiAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlzcGxheScpLmNoZWNrZWQgPyAnZGlzcGxheScgOiAnZnVsbCc7XHJcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGl0bGUnKS52YWx1ZTtcclxuICBjb25zdCBjb3VudGVyID0gTnVtYmVyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3VudGVyJykudmFsdWUpO1xyXG4gIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtyYW5nZSwgdGl0bGUsIGNvdW50ZXJ9LCBmdW5jdGlvbigpIHtcclxuICAgIHZhciBzdGF0dXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhdHVzJyk7XHJcbiAgICBzdGF0dXMudGV4dENvbnRlbnQgPSAnT3B0aW9ucyBzYXZlZC4nO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgc3RhdHVzLnRleHRDb250ZW50ID0gJyc7XHJcbiAgICB9LCA3NTApO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vKipcclxuICog6Kqt44G/5Y+W44KKXHJcbiAqL1xyXG5mdW5jdGlvbiByZXN0b3JlX29wdGlvbnMoKSB7XHJcbiAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoe1xyXG4gICAgcmFuZ2U6ICdmdWxsJyxcclxuICAgIHRpdGxlOiAne3t0aXRsZX19JyxcclxuICAgIGNvdW50ZXI6IDBcclxuICB9LCBmdW5jdGlvbihpdGVtcykge1xyXG4gICAgaWYgKGl0ZW1zLnJhbmdlID09PSAnZGlzcGxheScpIHtcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rpc3BsYXknKS5jaGVja2VkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnVsbCcpLmNoZWNrZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpdGxlJykudmFsdWUgPSBpdGVtcy50aXRsZTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3VudGVyJykudmFsdWUgPSBpdGVtcy5jb3VudGVyO1xyXG4gIH0pO1xyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgcmVzdG9yZV9vcHRpb25zKTtcclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNhdmVfb3B0aW9ucyk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=