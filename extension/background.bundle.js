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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

{
  //キャプチャされた画像配列
  let captures = []; //拡張機能の設定と現在参照中のタブ情報を返す

  const init = () => {
    return new Promise(resolve => {
      //拡張機能の設定を入手
      new Promise(innerResolve => {
        chrome.tabs.getSelected(null, tab => {
          innerResolve(tab);
        });
      }).then(tab => {
        return new Promise(innerResolve => {
          chrome.storage.sync.get({
            range: 'full',
            title: '{{title}}',
            counter: 0
          }, settings => {
            innerResolve({
              tab,
              settings
            });
          });
        });
      }).then(data => {
        //現合表示しているタブの情報を入手
        chrome.tabs.sendMessage(data.tab.id, {
          type: 'information'
        }, information => {
          resolve(Object.assign(data, {
            information
          }));
        });
      });
    });
  }; //キャプチャに必要な値を割り出して返す


  const captureCalculation = (settings, information) => {
    //キャプチャに必要な画像数
    const captureNumber = settings.range === 'perfect' ? information.captureNumber : 1; //キャプチャ画像は横に何枚並べればいいか

    const columnNumber = settings.range === 'perfect' ? information.columnNumber : 1; //合成後の画像の右端何 px を断ち落とすか

    let removeWidth = 0;

    switch (settings.range) {
      case 'perfect':
        removeWidth = information.documentWidth <= information.windowWidth ? 0 : Math.ceil(information.documentWidth % information.windowWidth);
        break;

      case 'full':
        removeWidth = Math.ceil(information.windowWidth * information.ratio);
        break;
    } //合成後の画像の下端何 px を断ち落とすか


    let removeHeight = 0;

    switch (settings.range) {
      case 'perfect':
        removeHeight = information.documentHeight <= information.windowHeight ? 0 : Math.ceil(information.documentHeight % information.windowHeight);
        break;

      case 'full':
        removeHeight = Math.ceil(information.windowHeight * information.ratio);
        break;
    } //返す


    return {
      captureNumber,
      columnNumber,
      removeWidth,
      removeHeight
    };
  }; //サイズの変更・キャプチャ


  const pushCapture = (type, index, tab, x, y) => {
    return new Promise(resolve => {
      setTimeout(() => {
        chrome.tabs.sendMessage(tab.id, {
          type: 'sizing',
          range: type,
          index: index
        }, () => {
          chrome.tabs.captureVisibleTab(url => {
            captures.push({
              x,
              y,
              url
            });
            resolve();
          });
        });
      }, 1000);
    });
  }; //キャプチャを行う


  const getCaptures = (settings, information, tab) => {
    //この関数が行う非同期タスク
    let task = []; //何枚の画像をキャプチャするか

    const captureNumber = settings.range === 'perfect' ? information.captureNumber : 1; //キャプチャ画像は横に何枚並べればいいか

    const columnNumber = settings.range === 'perfect' ? information.columnNumber : 1; //キャプチャを定義順にこなす

    for (let i = 0; i < captureNumber; i = i + 1 | 0) {
      task.push(pushCapture(settings.range, i, tab, i % columnNumber * information.windowWidth, Math.floor(i / columnNumber) * information.windowHeight));
    } //全てのキャプチャが終わったら Promise を返す


    return Promise.all(task);
  }; //カンバスに画像を読み込み、描写する


  const drawCanvas = (ctx, index) => {
    return new Promise(resolve => {
      const image = new Image();

      image.onload = () => {
        ctx.drawImage(image, captures[index].x, captures[index].y);
        resolve();
      };

      image.src = captures[index].url;
    });
  }; //カンバスを作成し、画像 URI を作成する


  const createDataURI = (settings, information) => {
    //この関数が行う非同期処理
    let task = []; //カンバスの作成

    const canvas = document.createElement('canvas');

    switch (settings.range) {
      case 'full':
        canvas.setAttribute('width', information.ratioType === 'width' ? information.documentWidth * information.ratio : information.documentWidth);
        canvas.setAttribute('height', information.ratioType === 'height' ? information.documentHeight * information.ratio : information.documentHeight);
        break;

      case 'display':
        canvas.setAttribute('width', information.windowWidth);
        canvas.setAttribute('height', information.windowHeight);
        break;

      case 'perfect':
        canvas.setAttribute('width', information.documentWidth);
        canvas.setAttribute('height', information.documentHeight);
        break;
    }

    document.body.appendChild(canvas); //カンバスのコンテキストを取得

    const ctx = canvas.getContext('2d'); //画像配置処理登録

    for (let i = 0, max = captures.length; i < max; i = i + 1 | 0) {
      task.push(drawCanvas(ctx, i));
    } //全て書き終えたら DataURL を生成して Promise を返す


    return new Promise(resolve => {
      Promise.all(task).then(() => {
        //画像書き出し
        const url = canvas.toDataURL(); //canvas を消す

        canvas.remove(); //返す

        resolve(url);
      });
    });
  }; //キャプチャ実行


  const action = () => {
    //現在表示しているタブの情報を入手する
    init().then(data => {
      //キャプチャ・画像生成
      getCaptures(data.settings, data.information, data.tab).then(() => {
        return createDataURI(data.settings, data.information);
      }).then(url => {
        chrome.tabs.create({
          url: 'download.html?src=' + url + '&title=' + data.tab.title + '&url=' + data.tab.url
        });
        chrome.tabs.sendMessage(data.tab.id, {
          type: 'back'
        });
      });
    }).catch(data => {
      console.log(data);
      alert('Sorry, Try again after reload.');
    });
  }; //アイコンクリック


  chrome.browserAction.onClicked.addListener(action);
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQuanMiXSwibmFtZXMiOlsiY2FwdHVyZXMiLCJpbml0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJpbm5lclJlc29sdmUiLCJjaHJvbWUiLCJ0YWJzIiwiZ2V0U2VsZWN0ZWQiLCJ0YWIiLCJ0aGVuIiwic3RvcmFnZSIsInN5bmMiLCJnZXQiLCJyYW5nZSIsInRpdGxlIiwiY291bnRlciIsInNldHRpbmdzIiwiZGF0YSIsInNlbmRNZXNzYWdlIiwiaWQiLCJ0eXBlIiwiaW5mb3JtYXRpb24iLCJPYmplY3QiLCJhc3NpZ24iLCJjYXB0dXJlQ2FsY3VsYXRpb24iLCJjYXB0dXJlTnVtYmVyIiwiY29sdW1uTnVtYmVyIiwicmVtb3ZlV2lkdGgiLCJkb2N1bWVudFdpZHRoIiwid2luZG93V2lkdGgiLCJNYXRoIiwiY2VpbCIsInJhdGlvIiwicmVtb3ZlSGVpZ2h0IiwiZG9jdW1lbnRIZWlnaHQiLCJ3aW5kb3dIZWlnaHQiLCJwdXNoQ2FwdHVyZSIsImluZGV4IiwieCIsInkiLCJzZXRUaW1lb3V0IiwiY2FwdHVyZVZpc2libGVUYWIiLCJ1cmwiLCJwdXNoIiwiZ2V0Q2FwdHVyZXMiLCJ0YXNrIiwiaSIsImZsb29yIiwiYWxsIiwiZHJhd0NhbnZhcyIsImN0eCIsImltYWdlIiwiSW1hZ2UiLCJvbmxvYWQiLCJkcmF3SW1hZ2UiLCJzcmMiLCJjcmVhdGVEYXRhVVJJIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwicmF0aW9UeXBlIiwiYm9keSIsImFwcGVuZENoaWxkIiwiZ2V0Q29udGV4dCIsIm1heCIsImxlbmd0aCIsInRvRGF0YVVSTCIsInJlbW92ZSIsImFjdGlvbiIsImNyZWF0ZSIsImNhdGNoIiwiY29uc29sZSIsImxvZyIsImFsZXJ0IiwiYnJvd3NlckFjdGlvbiIsIm9uQ2xpY2tlZCIsImFkZExpc3RlbmVy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IG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYmFja2dyb3VuZC5qc1wiKTtcbiIsIntcclxuXHQvL+OCreODo+ODl+ODgeODo+OBleOCjOOBn+eUu+WDj+mFjeWIl1xyXG5cdGxldCBjYXB0dXJlcyA9IFtdO1xyXG5cclxuXHQvL+aLoeW8teapn+iDveOBruioreWumuOBqOePvuWcqOWPgueFp+S4reOBruOCv+ODluaDheWgseOCkui/lOOBmVxyXG5cdGNvbnN0IGluaXQgPSAoKSA9PiB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcblx0XHRcdC8v5ouh5by15qmf6IO944Gu6Kit5a6a44KS5YWl5omLXHJcblx0XHRcdG5ldyBQcm9taXNlKGlubmVyUmVzb2x2ZSA9PiB7XHJcblx0XHRcdFx0Y2hyb21lLnRhYnMuZ2V0U2VsZWN0ZWQobnVsbCwgdGFiID0+IHtcclxuXHRcdFx0XHRcdGlubmVyUmVzb2x2ZSh0YWIpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHRcdC50aGVuKHRhYiA9PiB7XHJcblx0XHRcdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoaW5uZXJSZXNvbHZlID0+IHtcclxuXHRcdFx0XHRcdFx0Y2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoe3JhbmdlOiAnZnVsbCcsIHRpdGxlOiAne3t0aXRsZX19JywgY291bnRlcjogMH0sIHNldHRpbmdzID0+IHtcclxuXHRcdFx0XHRcdFx0XHRpbm5lclJlc29sdmUoe3RhYiwgc2V0dGluZ3N9KTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC50aGVuKGRhdGEgPT4ge1xyXG5cdFx0XHRcdFx0Ly/nj77lkIjooajnpLrjgZfjgabjgYTjgovjgr/jg5bjga7mg4XloLHjgpLlhaXmiYtcclxuXHRcdFx0XHRcdGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGRhdGEudGFiLmlkLCB7dHlwZTogJ2luZm9ybWF0aW9uJ30sIGluZm9ybWF0aW9uID0+IHtcclxuXHRcdFx0XHRcdFx0cmVzb2x2ZShPYmplY3QuYXNzaWduKGRhdGEsIHtpbmZvcm1hdGlvbn0pKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Ly/jgq3jg6Pjg5fjg4Hjg6Pjgavlv4XopoHjgarlgKTjgpLlibLjgorlh7rjgZfjgabov5TjgZlcclxuXHRjb25zdCBjYXB0dXJlQ2FsY3VsYXRpb24gPSAoc2V0dGluZ3MsIGluZm9ybWF0aW9uKSA9PiB7XHJcblx0XHQvL+OCreODo+ODl+ODgeODo+OBq+W/heimgeOBqueUu+WDj+aVsFxyXG5cdFx0Y29uc3QgY2FwdHVyZU51bWJlciA9IHNldHRpbmdzLnJhbmdlID09PSAncGVyZmVjdCdcclxuXHRcdFx0PyBpbmZvcm1hdGlvbi5jYXB0dXJlTnVtYmVyXHJcblx0XHRcdDogMTtcclxuXHJcblx0XHQvL+OCreODo+ODl+ODgeODo+eUu+WDj+OBr+aoquOBq+S9leaemuS4puOBueOCjOOBsOOBhOOBhOOBi1xyXG5cdFx0Y29uc3QgY29sdW1uTnVtYmVyID0gc2V0dGluZ3MucmFuZ2UgPT09ICdwZXJmZWN0J1xyXG5cdFx0XHQ/IGluZm9ybWF0aW9uLmNvbHVtbk51bWJlclxyXG5cdFx0XHQ6IDE7XHJcblxyXG5cdFx0Ly/lkIjmiJDlvozjga7nlLvlg4/jga7lj7Pnq6/kvZUgcHgg44KS5pat44Gh6JC944Go44GZ44GLXHJcblx0XHRsZXQgcmVtb3ZlV2lkdGggPSAwO1xyXG5cdFx0c3dpdGNoIChzZXR0aW5ncy5yYW5nZSkge1xyXG5cdFx0XHRjYXNlICdwZXJmZWN0JzpcclxuXHRcdFx0XHRyZW1vdmVXaWR0aCA9IGluZm9ybWF0aW9uLmRvY3VtZW50V2lkdGggPD0gaW5mb3JtYXRpb24ud2luZG93V2lkdGhcclxuXHRcdFx0XHRcdD8gMFxyXG5cdFx0XHRcdFx0OiBNYXRoLmNlaWwoaW5mb3JtYXRpb24uZG9jdW1lbnRXaWR0aCAlIGluZm9ybWF0aW9uLndpbmRvd1dpZHRoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnZnVsbCc6XHJcblx0XHRcdFx0cmVtb3ZlV2lkdGggPSBNYXRoLmNlaWwoaW5mb3JtYXRpb24ud2luZG93V2lkdGggKiBpbmZvcm1hdGlvbi5yYXRpbyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly/lkIjmiJDlvozjga7nlLvlg4/jga7kuIvnq6/kvZUgcHgg44KS5pat44Gh6JC944Go44GZ44GLXHJcblx0XHRsZXQgcmVtb3ZlSGVpZ2h0ID0gMDtcclxuXHRcdHN3aXRjaCAoc2V0dGluZ3MucmFuZ2UpIHtcclxuXHRcdFx0Y2FzZSAncGVyZmVjdCc6XHJcblx0XHRcdFx0cmVtb3ZlSGVpZ2h0ID0gaW5mb3JtYXRpb24uZG9jdW1lbnRIZWlnaHQgPD0gaW5mb3JtYXRpb24ud2luZG93SGVpZ2h0XHJcblx0XHRcdFx0XHQ/IDBcclxuXHRcdFx0XHRcdDogTWF0aC5jZWlsKGluZm9ybWF0aW9uLmRvY3VtZW50SGVpZ2h0ICUgaW5mb3JtYXRpb24ud2luZG93SGVpZ2h0KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnZnVsbCc6XHJcblx0XHRcdFx0cmVtb3ZlSGVpZ2h0ID0gTWF0aC5jZWlsKGluZm9ybWF0aW9uLndpbmRvd0hlaWdodCAqIGluZm9ybWF0aW9uLnJhdGlvKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHJcblx0XHQvL+i/lOOBmVxyXG5cdFx0cmV0dXJuIHtjYXB0dXJlTnVtYmVyLCBjb2x1bW5OdW1iZXIsIHJlbW92ZVdpZHRoLCByZW1vdmVIZWlnaHR9O1xyXG5cdH1cclxuXHJcblx0Ly/jgrXjgqTjgrrjga7lpInmm7Tjg7vjgq3jg6Pjg5fjg4Hjg6NcclxuXHRjb25zdCBwdXNoQ2FwdHVyZSA9ICh0eXBlLCBpbmRleCwgdGFiLCB4LCB5KSA9PiB7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKHRhYi5pZCwge3R5cGU6ICdzaXppbmcnLCByYW5nZTogdHlwZSwgaW5kZXg6IGluZGV4fSwgKCkgPT4ge1xyXG5cdFx0XHRcdFx0Y2hyb21lLnRhYnMuY2FwdHVyZVZpc2libGVUYWIoKHVybCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRjYXB0dXJlcy5wdXNoKHt4LCB5LCB1cmx9KTtcclxuXHRcdFx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0sIDEwMDApO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Ly/jgq3jg6Pjg5fjg4Hjg6PjgpLooYzjgYZcclxuXHRjb25zdCBnZXRDYXB0dXJlcyA9IChzZXR0aW5ncywgaW5mb3JtYXRpb24sIHRhYikgPT4ge1xyXG5cdFx0Ly/jgZPjga7plqLmlbDjgYzooYzjgYbpnZ7lkIzmnJ/jgr/jgrnjgq9cclxuXHRcdGxldCB0YXNrID0gW107XHJcblxyXG5cdFx0Ly/kvZXmnprjga7nlLvlg4/jgpLjgq3jg6Pjg5fjg4Hjg6PjgZnjgovjgYtcclxuXHRcdGNvbnN0IGNhcHR1cmVOdW1iZXIgPSBzZXR0aW5ncy5yYW5nZSA9PT0gJ3BlcmZlY3QnXHJcblx0XHRcdD8gaW5mb3JtYXRpb24uY2FwdHVyZU51bWJlclxyXG5cdFx0XHQ6IDE7XHJcblxyXG5cdFx0Ly/jgq3jg6Pjg5fjg4Hjg6PnlLvlg4/jga/mqKrjgavkvZXmnprkuKbjgbnjgozjgbDjgYTjgYTjgYtcclxuXHRcdGNvbnN0IGNvbHVtbk51bWJlciA9IHNldHRpbmdzLnJhbmdlID09PSAncGVyZmVjdCdcclxuXHRcdFx0PyBpbmZvcm1hdGlvbi5jb2x1bW5OdW1iZXJcclxuXHRcdFx0OiAxO1xyXG5cclxuXHRcdC8v44Kt44Oj44OX44OB44Oj44KS5a6a576p6aCG44Gr44GT44Gq44GZXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNhcHR1cmVOdW1iZXI7IGkgPSAoaSArIDEpIHwgMCkge1xyXG5cdFx0XHR0YXNrLnB1c2gocHVzaENhcHR1cmUoc2V0dGluZ3MucmFuZ2UsIGksIHRhYiwgaSAlIGNvbHVtbk51bWJlciAqIGluZm9ybWF0aW9uLndpbmRvd1dpZHRoLCBNYXRoLmZsb29yKGkgLyBjb2x1bW5OdW1iZXIpICogaW5mb3JtYXRpb24ud2luZG93SGVpZ2h0KSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly/lhajjgabjga7jgq3jg6Pjg5fjg4Hjg6PjgYzntYLjgo/jgaPjgZ/jgokgUHJvbWlzZSDjgpLov5TjgZlcclxuXHRcdHJldHVybiBQcm9taXNlLmFsbCh0YXNrKTtcclxuXHR9O1xyXG5cclxuXHQvL+OCq+ODs+ODkOOCueOBq+eUu+WDj+OCkuiqreOBv+i+vOOBv+OAgeaPj+WGmeOBmeOCi1xyXG5cdGNvbnN0IGRyYXdDYW52YXMgPSAoY3R4LCBpbmRleCkgPT4ge1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG5cdFx0XHRjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG5cdFx0XHRpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcblx0XHRcdFx0Y3R4LmRyYXdJbWFnZShpbWFnZSwgY2FwdHVyZXNbaW5kZXhdLngsIGNhcHR1cmVzW2luZGV4XS55KTtcclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblx0XHRcdH07XHJcblx0XHRcdGltYWdlLnNyYyA9IGNhcHR1cmVzW2luZGV4XS51cmw7XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvL+OCq+ODs+ODkOOCueOCkuS9nOaIkOOBl+OAgeeUu+WDjyBVUkkg44KS5L2c5oiQ44GZ44KLXHJcblx0Y29uc3QgY3JlYXRlRGF0YVVSSSA9IChzZXR0aW5ncywgaW5mb3JtYXRpb24pID0+IHtcclxuXHRcdC8v44GT44Gu6Zai5pWw44GM6KGM44GG6Z2e5ZCM5pyf5Yem55CGXHJcblx0XHRsZXQgdGFzayA9IFtdO1xyXG5cclxuXHRcdC8v44Kr44Oz44OQ44K544Gu5L2c5oiQXHJcblx0XHRjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuXHRcdHN3aXRjaCAoc2V0dGluZ3MucmFuZ2UpIHtcclxuXHRcdFx0Y2FzZSAnZnVsbCc6XHJcblx0XHRcdFx0Y2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBpbmZvcm1hdGlvbi5yYXRpb1R5cGUgPT09ICd3aWR0aCcgPyBpbmZvcm1hdGlvbi5kb2N1bWVudFdpZHRoICogaW5mb3JtYXRpb24ucmF0aW8gOiBpbmZvcm1hdGlvbi5kb2N1bWVudFdpZHRoKTtcclxuXHRcdFx0XHRjYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBpbmZvcm1hdGlvbi5yYXRpb1R5cGUgPT09ICdoZWlnaHQnID8gaW5mb3JtYXRpb24uZG9jdW1lbnRIZWlnaHQgKiBpbmZvcm1hdGlvbi5yYXRpbyA6IGluZm9ybWF0aW9uLmRvY3VtZW50SGVpZ2h0KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAnZGlzcGxheSc6XHJcblx0XHRcdFx0Y2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBpbmZvcm1hdGlvbi53aW5kb3dXaWR0aCk7XHJcblx0XHRcdFx0Y2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaW5mb3JtYXRpb24ud2luZG93SGVpZ2h0KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAncGVyZmVjdCc6XHJcblx0XHRcdFx0Y2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBpbmZvcm1hdGlvbi5kb2N1bWVudFdpZHRoKTtcclxuXHRcdFx0XHRjYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBpbmZvcm1hdGlvbi5kb2N1bWVudEhlaWdodCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XHJcblxyXG5cdFx0Ly/jgqvjg7Pjg5Djgrnjga7jgrPjg7Pjg4bjgq3jgrnjg4jjgpLlj5blvpdcclxuXHRcdGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuXHRcdC8v55S75YOP6YWN572u5Yem55CG55m76YyyXHJcblx0XHRmb3IgKGxldCBpID0gMCwgbWF4ID0gY2FwdHVyZXMubGVuZ3RoOyBpIDwgbWF4OyBpID0gKGkgKyAxKSB8IDApIHtcclxuXHRcdFx0dGFzay5wdXNoKGRyYXdDYW52YXMoY3R4LCBpKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly/lhajjgabmm7jjgY3ntYLjgYjjgZ/jgokgRGF0YVVSTCDjgpLnlJ/miJDjgZfjgaYgUHJvbWlzZSDjgpLov5TjgZlcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuXHRcdFx0UHJvbWlzZS5hbGwodGFzaykudGhlbigoKSA9PiB7XHJcblx0XHRcdFx0Ly/nlLvlg4/mm7jjgY3lh7rjgZdcclxuXHRcdFx0XHRjb25zdCB1cmwgPSBjYW52YXMudG9EYXRhVVJMKCk7XHJcblxyXG5cdFx0XHRcdC8vY2FudmFzIOOCkua2iOOBmVxyXG5cdFx0XHRcdGNhbnZhcy5yZW1vdmUoKTtcclxuXHJcblx0XHRcdFx0Ly/ov5TjgZlcclxuXHRcdFx0XHRyZXNvbHZlKHVybCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Ly/jgq3jg6Pjg5fjg4Hjg6Plrp/ooYxcclxuXHRjb25zdCBhY3Rpb24gPSAoKSA9PiB7XHJcblx0XHQvL+ePvuWcqOihqOekuuOBl+OBpuOBhOOCi+OCv+ODluOBruaDheWgseOCkuWFpeaJi+OBmeOCi1xyXG5cdFx0aW5pdCgpXHJcblx0XHRcdC50aGVuKGRhdGEgPT4ge1xyXG5cdFx0XHRcdC8v44Kt44Oj44OX44OB44Oj44O755S75YOP55Sf5oiQXHJcblx0XHRcdFx0Z2V0Q2FwdHVyZXMoZGF0YS5zZXR0aW5ncywgZGF0YS5pbmZvcm1hdGlvbiwgZGF0YS50YWIpXHJcblx0XHRcdFx0XHQudGhlbigoKSA9PiB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBjcmVhdGVEYXRhVVJJKGRhdGEuc2V0dGluZ3MsIGRhdGEuaW5mb3JtYXRpb24pO1xyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdC50aGVuKHVybCA9PiB7XHJcblx0XHRcdFx0XHRcdGNocm9tZS50YWJzLmNyZWF0ZSh7dXJsOiAnZG93bmxvYWQuaHRtbD9zcmM9Jyt1cmwrJyZ0aXRsZT0nK2RhdGEudGFiLnRpdGxlKycmdXJsPScrZGF0YS50YWIudXJsfSk7XHJcblx0XHRcdFx0XHRcdGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGRhdGEudGFiLmlkLCB7dHlwZTogJ2JhY2snfSk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHRcdFx0LmNhdGNoKChkYXRhKSA9PiB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0YWxlcnQoJ1NvcnJ5LCBUcnkgYWdhaW4gYWZ0ZXIgcmVsb2FkLicpO1xyXG5cdFx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvL+OCouOCpOOCs+ODs+OCr+ODquODg+OCr1xyXG5cdGNocm9tZS5icm93c2VyQWN0aW9uLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcihhY3Rpb24pO1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=