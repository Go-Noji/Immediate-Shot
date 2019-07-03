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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/background.ts":
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
{
    //キャプチャされた画像配列
    let captures = [];
    /**
     * range を Range 型にキャストする
     * @param range
     */
    const castRange = (range) => {
        switch (range) {
            case 'full':
            case 'display':
            case 'perfect':
                return range;
                break;
            default:
                return 'full';
                break;
        }
    };
    //拡張機能の設定と現在参照中のタブ情報を返す
    const init = () => {
        return new Promise(resolve => {
            //拡張機能の設定を入手
            new Promise(innerResolve => {
                chrome.tabs.query({ active: true }, (tabs) => {
                    innerResolve(tabs[0]);
                });
            })
                .then(tab => {
                return new Promise(innerResolve => {
                    chrome.storage.sync.get({ range: 'full', title: '{{title}}', counter: 0 }, (items) => {
                        innerResolve({ tab, settings: { range: castRange(items.range), title: String(items.title), counter: Number(items.counter) } });
                    });
                });
            })
                .then((data) => {
                //現合表示しているタブの情報を入手
                chrome.tabs.sendMessage(Number(data.tab.id), { type: 'information' }, (information) => {
                    resolve({ tab: data.tab, settings: data.settings, information });
                });
            });
        });
    };
    //キャプチャに必要な値を割り出して返す
    const captureCalculation = (settings, information) => {
        //キャプチャに必要な画像数
        const captureNumber = settings.range === 'perfect'
            ? information.captureNumber
            : 1;
        //キャプチャ画像は横に何枚並べればいいか
        const widthCaptureNumber = settings.range === 'perfect'
            ? information.widthCaptureNumber
            : 1;
        //合成後の画像の右端何 px を断ち落とすか
        let removeWidth = 0;
        switch (settings.range) {
            case 'perfect':
                removeWidth = information.documentWidth <= information.windowWidth
                    ? 0
                    : Math.ceil(information.documentWidth % information.windowWidth);
                break;
            case 'full':
                removeWidth = Math.ceil(information.windowWidth * information.ratio);
                break;
        }
        //合成後の画像の下端何 px を断ち落とすか
        let removeHeight = 0;
        switch (settings.range) {
            case 'perfect':
                removeHeight = information.documentHeight <= information.windowHeight
                    ? 0
                    : Math.ceil(information.documentHeight % information.windowHeight);
                break;
            case 'full':
                removeHeight = Math.ceil(information.windowHeight * information.ratio);
                break;
        }
        //返す
        return { captureNumber, widthCaptureNumber, removeWidth, removeHeight };
    };
    //サイズの変更・キャプチャ
    const pushCapture = (type, index, tab, x, y) => {
        return new Promise(resolve => {
            setTimeout(() => {
                chrome.tabs.sendMessage(Number(tab.id), { type: 'sizing', range: type, index: index }, () => {
                    chrome.tabs.captureVisibleTab((url) => {
                        captures.push({ x, y, url });
                        resolve();
                    });
                });
            }, 1000);
        });
    };
    //キャプチャを行う
    const getCaptures = (settings, information, tab) => __awaiter(this, void 0, void 0, function* () {
        //何枚の画像をキャプチャするか
        const captureNumber = settings.range === 'perfect'
            ? information.captureNumber
            : 1;
        //キャプチャ画像は横に何枚並べればいいか
        const widthCaptureNumber = settings.range === 'perfect'
            ? information.widthCaptureNumber
            : 1;
        for (let i = 0; i < captureNumber; i = (i + 1) | 0) {
            yield pushCapture(settings.range, i, tab, i % widthCaptureNumber * information.windowWidth, Math.floor(i / widthCaptureNumber) * information.windowHeight);
        }
    });
    //カンバスに画像を読み込み、描写する
    const drawCanvas = (ctx, index) => {
        return new Promise(resolve => {
            const image = new Image();
            image.onload = () => {
                ctx.drawImage(image, captures[index].x, captures[index].y);
                resolve();
            };
            image.src = captures[index].url;
        });
    };
    /**
     * target が CanvasRenderingContext2D であるか判定する
     * 具体的には drawImage メソッドが存在するか判定する
     * @param target
     */
    const isCanvasRenderingContext2D = (target) => {
        return target.drawImage !== undefined;
    };
    //カンバスを作成し、画像 URI を作成する
    const createDataURI = (settings, information) => {
        //この関数が行う非同期処理
        let task = [];
        //カンバスの作成
        const canvas = document.createElement('canvas');
        switch (settings.range) {
            case 'full':
                canvas.setAttribute('width', information.ratioType === 'width' ? String(information.documentWidth * information.ratio) : String(information.documentWidth));
                canvas.setAttribute('height', information.ratioType === 'height' ? String(information.documentHeight * information.ratio) : String(information.documentHeight));
                break;
            case 'display':
                canvas.setAttribute('width', String(information.windowWidth));
                canvas.setAttribute('height', String(information.windowHeight));
                break;
            case 'perfect':
                canvas.setAttribute('width', String(information.documentWidth));
                canvas.setAttribute('height', String(information.documentHeight));
                break;
        }
        document.body.appendChild(canvas);
        //カンバスのコンテキストを取得
        const ctx = canvas.getContext('2d');
        //画像配置処理登録
        if (isCanvasRenderingContext2D(ctx)) {
            for (let i = 0, max = captures.length; i < max; i = (i + 1) | 0) {
                task.push(drawCanvas(ctx, i));
            }
        }
        //全て書き終えたら DataURL を生成して Promise を返す
        return new Promise(resolve => {
            Promise.all(task).then(() => {
                //画像書き出し
                const url = canvas.toDataURL();
                //canvas を消す
                canvas.remove();
                //返す
                resolve(url);
            });
        });
    };
    //キャプチャ実行
    const action = () => {
        //現在表示しているタブの情報を入手する
        init()
            .then(data => {
            //キャプチャ・画像生成
            getCaptures(data.settings, data.information, data.tab)
                .then(() => {
                return createDataURI(data.settings, data.information);
            })
                .then(url => {
                chrome.tabs.create({ url: 'download.html?src=' + url + '&title=' + data.tab.title + '&url=' + data.tab.url });
                chrome.tabs.sendMessage(Number(data.tab.id), { type: 'back' });
            });
        })
            .catch((data) => {
            console.log(data);
            alert('Sorry, Try again after reload.');
        });
    };
    //アイコンクリック
    chrome.browserAction.onClicked.addListener(action);
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRUE7SUFDQyxjQUFjO0lBQ2QsSUFBSSxRQUFRLEdBQWMsRUFBRSxDQUFDO0lBRTdCOzs7T0FHRztJQUNILE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBYSxFQUFTLEVBQUU7UUFDMUMsUUFBUSxLQUFLLEVBQUU7WUFDZCxLQUFLLE1BQU0sQ0FBQztZQUNaLEtBQUssU0FBUyxDQUFDO1lBQ2YsS0FBSyxTQUFTO2dCQUNiLE9BQU8sS0FBSyxDQUFDO2dCQUNiLE1BQU07WUFDUDtnQkFDQyxPQUFPLE1BQU0sQ0FBQztnQkFDZCxNQUFNO1NBQ1A7SUFDRixDQUFDLENBQUM7SUFFRix1QkFBdUI7SUFDdkIsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO1FBQ2pCLE9BQU8sSUFBSSxPQUFPLENBQVcsT0FBTyxDQUFDLEVBQUU7WUFDdEMsWUFBWTtZQUNaLElBQUksT0FBTyxDQUFrQixZQUFZLENBQUMsRUFBRTtnQkFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUF1QixFQUFFLEVBQUU7b0JBQzdELFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsQ0FBQyxDQUFDLENBQUM7WUFDSixDQUFDLENBQUM7aUJBQ0EsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNYLE9BQU8sSUFBSSxPQUFPLENBQTZDLFlBQVksQ0FBQyxFQUFFO29CQUM3RSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBQyxFQUFFLENBQUMsS0FBOEIsRUFBRSxFQUFFO3dCQUMzRyxZQUFZLENBQUMsRUFBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLEVBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUMsRUFBQyxDQUFDLENBQUM7b0JBQzVILENBQUMsQ0FBQyxDQUFDO2dCQUNKLENBQUMsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxDQUFDO2lCQUNELElBQUksQ0FBQyxDQUFDLElBQWdELEVBQUUsRUFBRTtnQkFDMUQsa0JBQWtCO2dCQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLElBQUksRUFBRSxhQUFhLEVBQUMsRUFBRSxDQUFDLFdBQXdCLEVBQUUsRUFBRTtvQkFDaEcsT0FBTyxDQUFDLEVBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFDLENBQUMsQ0FBQztnQkFDaEUsQ0FBQyxDQUFDLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0lBRUYsb0JBQW9CO0lBQ3BCLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxRQUFrQixFQUFFLFdBQXdCLEVBQUUsRUFBRTtRQUMzRSxjQUFjO1FBQ2QsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLEtBQUssS0FBSyxTQUFTO1lBQ2pELENBQUMsQ0FBQyxXQUFXLENBQUMsYUFBYTtZQUMzQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRUwscUJBQXFCO1FBQ3JCLE1BQU0sa0JBQWtCLEdBQUcsUUFBUSxDQUFDLEtBQUssS0FBSyxTQUFTO1lBQ3RELENBQUMsQ0FBQyxXQUFXLENBQUMsa0JBQWtCO1lBQ2hDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFTCx1QkFBdUI7UUFDdkIsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLFFBQVEsUUFBUSxDQUFDLEtBQUssRUFBRTtZQUN2QixLQUFLLFNBQVM7Z0JBQ2IsV0FBVyxHQUFHLFdBQVcsQ0FBQyxhQUFhLElBQUksV0FBVyxDQUFDLFdBQVc7b0JBQ2pFLENBQUMsQ0FBQyxDQUFDO29CQUNILENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNsRSxNQUFNO1lBQ1AsS0FBSyxNQUFNO2dCQUNWLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyRSxNQUFNO1NBQ1A7UUFFRCx1QkFBdUI7UUFDdkIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLFFBQVEsUUFBUSxDQUFDLEtBQUssRUFBRTtZQUN2QixLQUFLLFNBQVM7Z0JBQ2IsWUFBWSxHQUFHLFdBQVcsQ0FBQyxjQUFjLElBQUksV0FBVyxDQUFDLFlBQVk7b0JBQ3BFLENBQUMsQ0FBQyxDQUFDO29CQUNILENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNwRSxNQUFNO1lBQ1AsS0FBSyxNQUFNO2dCQUNWLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2RSxNQUFNO1NBQ1A7UUFFRCxJQUFJO1FBQ0osT0FBTyxFQUFDLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFDLENBQUM7SUFDdkUsQ0FBQztJQUVELGNBQWM7SUFDZCxNQUFNLFdBQVcsR0FBRyxDQUFDLElBQVcsRUFBRSxLQUFhLEVBQUUsR0FBb0IsRUFBRSxDQUFTLEVBQUUsQ0FBUyxFQUFpQixFQUFFO1FBQzdHLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDNUIsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsRUFBRSxHQUFHLEVBQUU7b0JBQ3pGLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTt3QkFDckMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQzt3QkFDM0IsT0FBTyxFQUFFLENBQUM7b0JBQ1gsQ0FBQyxDQUFDLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUM7WUFDSixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDVixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztJQUVGLFVBQVU7SUFDVixNQUFNLFdBQVcsR0FBRyxDQUFPLFFBQWtCLEVBQUUsV0FBd0IsRUFBRSxHQUFvQixFQUFFLEVBQUU7UUFDaEcsZ0JBQWdCO1FBQ2hCLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxLQUFLLEtBQUssU0FBUztZQUNqRCxDQUFDLENBQUMsV0FBVyxDQUFDLGFBQWE7WUFDM0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVMLHFCQUFxQjtRQUNyQixNQUFNLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxLQUFLLEtBQUssU0FBUztZQUN0RCxDQUFDLENBQUMsV0FBVyxDQUFDLGtCQUFrQjtZQUNoQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRUwsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ25ELE1BQU0sV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsa0JBQWtCLEdBQUcsV0FBVyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUMzSjtJQUNGLENBQUMsRUFBQztJQUVGLG1CQUFtQjtJQUNuQixNQUFNLFVBQVUsR0FBRyxDQUFDLEdBQTZCLEVBQUUsS0FBYSxFQUFFLEVBQUU7UUFDbkUsT0FBTyxJQUFJLE9BQU8sQ0FBTyxPQUFPLENBQUMsRUFBRTtZQUNsQyxNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQzFCLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO2dCQUNuQixHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0QsT0FBTyxFQUFFLENBQUM7WUFDWCxDQUFDLENBQUM7WUFDRixLQUFLLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7SUFFRjs7OztPQUlHO0lBQ0gsTUFBTSwwQkFBMEIsR0FBRyxDQUFDLE1BQVcsRUFBc0MsRUFBRTtRQUN0RixPQUFPLE1BQU0sQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCx1QkFBdUI7SUFDdkIsTUFBTSxhQUFhLEdBQUcsQ0FBQyxRQUFpQixFQUFFLFdBQXdCLEVBQUUsRUFBRTtRQUNyRSxjQUFjO1FBQ2QsSUFBSSxJQUFJLEdBQW9CLEVBQUUsQ0FBQztRQUUvQixTQUFTO1FBQ1QsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxRQUFRLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDdkIsS0FBSyxNQUFNO2dCQUNWLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxTQUFTLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDNUosTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLFNBQVMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsY0FBYyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUNoSyxNQUFNO1lBQ1AsS0FBSyxTQUFTO2dCQUNiLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDOUQsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUNoRSxNQUFNO1lBQ1AsS0FBSyxTQUFTO2dCQUNiLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDaEUsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUNsRSxNQUFNO1NBQ1A7UUFDRCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVsQyxnQkFBZ0I7UUFDaEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwQyxVQUFVO1FBQ1YsSUFBSSwwQkFBMEIsQ0FBQyxHQUFHLENBQUMsRUFDbkM7WUFDQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ2hFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzlCO1NBQ0Q7UUFFRCxvQ0FBb0M7UUFDcEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQzNCLFFBQVE7Z0JBQ1IsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUUvQixZQUFZO2dCQUNaLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFFaEIsSUFBSTtnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0lBRUYsU0FBUztJQUNULE1BQU0sTUFBTSxHQUFHLEdBQUcsRUFBRTtRQUNuQixvQkFBb0I7UUFDcEIsSUFBSSxFQUFFO2FBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ1osWUFBWTtZQUNaLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQztpQkFDcEQsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDVixPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN2RCxDQUFDLENBQUM7aUJBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUMsR0FBRyxFQUFFLG9CQUFvQixHQUFDLEdBQUcsR0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUMsT0FBTyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQztnQkFDbEcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztZQUM5RCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQztJQUVGLFVBQVU7SUFDVixNQUFNLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDbkQiLCJmaWxlIjoiYmFja2dyb3VuZC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9iYWNrZ3JvdW5kLnRzXCIpO1xuIiwiaW1wb3J0IHtJbmZvcm1hdGlvbiwgU2V0dGluZ3MsIFJhbmdlfSBmcm9tIFwiLi9pbnRlcmZhY2VcIjtcblxuaW50ZXJmYWNlIEluaXREYXRhIHtcblx0dGFiOiBjaHJvbWUudGFicy5UYWIsXG5cdHNldHRpbmdzOiBTZXR0aW5ncyxcblx0aW5mb3JtYXRpb246IEluZm9ybWF0aW9uXG59XG5cbmludGVyZmFjZSBDYXB0dXJlIHtcblx0eDogbnVtYmVyLFxuXHR5OiBudW1iZXIsXG5cdHVybDogc3RyaW5nXG59XG5cbntcblx0Ly/jgq3jg6Pjg5fjg4Hjg6PjgZXjgozjgZ/nlLvlg4/phY3liJdcblx0bGV0IGNhcHR1cmVzOiBDYXB0dXJlW10gPSBbXTtcblxuXHQvKipcblx0ICogcmFuZ2Ug44KSIFJhbmdlIOWei+OBq+OCreODo+OCueODiOOBmeOCi1xuXHQgKiBAcGFyYW0gcmFuZ2Vcblx0ICovXG5cdGNvbnN0IGNhc3RSYW5nZSA9IChyYW5nZTogc3RyaW5nKTogUmFuZ2UgPT4ge1xuXHRcdHN3aXRjaCAocmFuZ2UpIHtcblx0XHRcdGNhc2UgJ2Z1bGwnOlxuXHRcdFx0Y2FzZSAnZGlzcGxheSc6XG5cdFx0XHRjYXNlICdwZXJmZWN0Jzpcblx0XHRcdFx0cmV0dXJuIHJhbmdlO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiAnZnVsbCc7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fTtcblxuXHQvL+aLoeW8teapn+iDveOBruioreWumuOBqOePvuWcqOWPgueFp+S4reOBruOCv+ODluaDheWgseOCkui/lOOBmVxuXHRjb25zdCBpbml0ID0gKCkgPT4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZTxJbml0RGF0YT4ocmVzb2x2ZSA9PiB7XG5cdFx0XHQvL+aLoeW8teapn+iDveOBruioreWumuOCkuWFpeaJi1xuXHRcdFx0bmV3IFByb21pc2U8Y2hyb21lLnRhYnMuVGFiPihpbm5lclJlc29sdmUgPT4ge1xuXHRcdFx0XHRjaHJvbWUudGFicy5xdWVyeSh7YWN0aXZlOiB0cnVlfSwgKHRhYnM6IGNocm9tZS50YWJzLlRhYltdKSA9PiB7XG5cdFx0XHRcdFx0aW5uZXJSZXNvbHZlKHRhYnNbMF0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKHRhYiA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlPHt0YWI6IGNocm9tZS50YWJzLlRhYiwgc2V0dGluZ3M6IFNldHRpbmdzfT4oaW5uZXJSZXNvbHZlID0+IHtcblx0XHRcdFx0XHRcdGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KHtyYW5nZTogJ2Z1bGwnLCB0aXRsZTogJ3t7dGl0bGV9fScsIGNvdW50ZXI6IDB9LCAoaXRlbXM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9KSA9PiB7XG5cdFx0XHRcdFx0XHRcdGlubmVyUmVzb2x2ZSh7dGFiLCBzZXR0aW5nczoge3JhbmdlOiBjYXN0UmFuZ2UoaXRlbXMucmFuZ2UpLCB0aXRsZTogU3RyaW5nKGl0ZW1zLnRpdGxlKSwgY291bnRlcjogTnVtYmVyKGl0ZW1zLmNvdW50ZXIpfX0pO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC50aGVuKChkYXRhOiB7dGFiOiBjaHJvbWUudGFicy5UYWIsIHNldHRpbmdzOiBTZXR0aW5nc30pID0+IHtcblx0XHRcdFx0XHQvL+ePvuWQiOihqOekuuOBl+OBpuOBhOOCi+OCv+ODluOBruaDheWgseOCkuWFpeaJi1xuXHRcdFx0XHRcdGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKE51bWJlcihkYXRhLnRhYi5pZCksIHt0eXBlOiAnaW5mb3JtYXRpb24nfSwgKGluZm9ybWF0aW9uOiBJbmZvcm1hdGlvbikgPT4ge1xuXHRcdFx0XHRcdFx0cmVzb2x2ZSh7dGFiOiBkYXRhLnRhYiwgc2V0dGluZ3M6IGRhdGEuc2V0dGluZ3MsIGluZm9ybWF0aW9ufSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9O1xuXG5cdC8v44Kt44Oj44OX44OB44Oj44Gr5b+F6KaB44Gq5YCk44KS5Ymy44KK5Ye644GX44Gm6L+U44GZXG5cdGNvbnN0IGNhcHR1cmVDYWxjdWxhdGlvbiA9IChzZXR0aW5nczogU2V0dGluZ3MsIGluZm9ybWF0aW9uOiBJbmZvcm1hdGlvbikgPT4ge1xuXHRcdC8v44Kt44Oj44OX44OB44Oj44Gr5b+F6KaB44Gq55S75YOP5pWwXG5cdFx0Y29uc3QgY2FwdHVyZU51bWJlciA9IHNldHRpbmdzLnJhbmdlID09PSAncGVyZmVjdCdcblx0XHRcdD8gaW5mb3JtYXRpb24uY2FwdHVyZU51bWJlclxuXHRcdFx0OiAxO1xuXG5cdFx0Ly/jgq3jg6Pjg5fjg4Hjg6PnlLvlg4/jga/mqKrjgavkvZXmnprkuKbjgbnjgozjgbDjgYTjgYTjgYtcblx0XHRjb25zdCB3aWR0aENhcHR1cmVOdW1iZXIgPSBzZXR0aW5ncy5yYW5nZSA9PT0gJ3BlcmZlY3QnXG5cdFx0XHQ/IGluZm9ybWF0aW9uLndpZHRoQ2FwdHVyZU51bWJlclxuXHRcdFx0OiAxO1xuXG5cdFx0Ly/lkIjmiJDlvozjga7nlLvlg4/jga7lj7Pnq6/kvZUgcHgg44KS5pat44Gh6JC944Go44GZ44GLXG5cdFx0bGV0IHJlbW92ZVdpZHRoID0gMDtcblx0XHRzd2l0Y2ggKHNldHRpbmdzLnJhbmdlKSB7XG5cdFx0XHRjYXNlICdwZXJmZWN0Jzpcblx0XHRcdFx0cmVtb3ZlV2lkdGggPSBpbmZvcm1hdGlvbi5kb2N1bWVudFdpZHRoIDw9IGluZm9ybWF0aW9uLndpbmRvd1dpZHRoXG5cdFx0XHRcdFx0PyAwXG5cdFx0XHRcdFx0OiBNYXRoLmNlaWwoaW5mb3JtYXRpb24uZG9jdW1lbnRXaWR0aCAlIGluZm9ybWF0aW9uLndpbmRvd1dpZHRoKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICdmdWxsJzpcblx0XHRcdFx0cmVtb3ZlV2lkdGggPSBNYXRoLmNlaWwoaW5mb3JtYXRpb24ud2luZG93V2lkdGggKiBpbmZvcm1hdGlvbi5yYXRpbyk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdC8v5ZCI5oiQ5b6M44Gu55S75YOP44Gu5LiL56uv5L2VIHB4IOOCkuaWreOBoeiQveOBqOOBmeOBi1xuXHRcdGxldCByZW1vdmVIZWlnaHQgPSAwO1xuXHRcdHN3aXRjaCAoc2V0dGluZ3MucmFuZ2UpIHtcblx0XHRcdGNhc2UgJ3BlcmZlY3QnOlxuXHRcdFx0XHRyZW1vdmVIZWlnaHQgPSBpbmZvcm1hdGlvbi5kb2N1bWVudEhlaWdodCA8PSBpbmZvcm1hdGlvbi53aW5kb3dIZWlnaHRcblx0XHRcdFx0XHQ/IDBcblx0XHRcdFx0XHQ6IE1hdGguY2VpbChpbmZvcm1hdGlvbi5kb2N1bWVudEhlaWdodCAlIGluZm9ybWF0aW9uLndpbmRvd0hlaWdodCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnZnVsbCc6XG5cdFx0XHRcdHJlbW92ZUhlaWdodCA9IE1hdGguY2VpbChpbmZvcm1hdGlvbi53aW5kb3dIZWlnaHQgKiBpbmZvcm1hdGlvbi5yYXRpbyk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblxuXHRcdC8v6L+U44GZXG5cdFx0cmV0dXJuIHtjYXB0dXJlTnVtYmVyLCB3aWR0aENhcHR1cmVOdW1iZXIsIHJlbW92ZVdpZHRoLCByZW1vdmVIZWlnaHR9O1xuXHR9XG5cblx0Ly/jgrXjgqTjgrrjga7lpInmm7Tjg7vjgq3jg6Pjg5fjg4Hjg6Ncblx0Y29uc3QgcHVzaENhcHR1cmUgPSAodHlwZTogUmFuZ2UsIGluZGV4OiBudW1iZXIsIHRhYjogY2hyb21lLnRhYnMuVGFiLCB4OiBudW1iZXIsIHk6IG51bWJlcik6IFByb21pc2U8dm9pZD4gPT4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHRjaHJvbWUudGFicy5zZW5kTWVzc2FnZShOdW1iZXIodGFiLmlkKSwge3R5cGU6ICdzaXppbmcnLCByYW5nZTogdHlwZSwgaW5kZXg6IGluZGV4fSwgKCkgPT4ge1xuXHRcdFx0XHRcdGNocm9tZS50YWJzLmNhcHR1cmVWaXNpYmxlVGFiKCh1cmwpID0+IHtcblx0XHRcdFx0XHRcdGNhcHR1cmVzLnB1c2goe3gsIHksIHVybH0pO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0sIDEwMDApO1xuXHRcdH0pO1xuXHR9O1xuXG5cdC8v44Kt44Oj44OX44OB44Oj44KS6KGM44GGXG5cdGNvbnN0IGdldENhcHR1cmVzID0gYXN5bmMgKHNldHRpbmdzOiBTZXR0aW5ncywgaW5mb3JtYXRpb246IEluZm9ybWF0aW9uLCB0YWI6IGNocm9tZS50YWJzLlRhYikgPT4ge1xuXHRcdC8v5L2V5p6a44Gu55S75YOP44KS44Kt44Oj44OX44OB44Oj44GZ44KL44GLXG5cdFx0Y29uc3QgY2FwdHVyZU51bWJlciA9IHNldHRpbmdzLnJhbmdlID09PSAncGVyZmVjdCdcblx0XHRcdD8gaW5mb3JtYXRpb24uY2FwdHVyZU51bWJlclxuXHRcdFx0OiAxO1xuXG5cdFx0Ly/jgq3jg6Pjg5fjg4Hjg6PnlLvlg4/jga/mqKrjgavkvZXmnprkuKbjgbnjgozjgbDjgYTjgYTjgYtcblx0XHRjb25zdCB3aWR0aENhcHR1cmVOdW1iZXIgPSBzZXR0aW5ncy5yYW5nZSA9PT0gJ3BlcmZlY3QnXG5cdFx0XHQ/IGluZm9ybWF0aW9uLndpZHRoQ2FwdHVyZU51bWJlclxuXHRcdFx0OiAxO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjYXB0dXJlTnVtYmVyOyBpID0gKGkgKyAxKSB8IDApIHtcblx0XHRcdGF3YWl0IHB1c2hDYXB0dXJlKHNldHRpbmdzLnJhbmdlLCBpLCB0YWIsIGkgJSB3aWR0aENhcHR1cmVOdW1iZXIgKiBpbmZvcm1hdGlvbi53aW5kb3dXaWR0aCwgTWF0aC5mbG9vcihpIC8gd2lkdGhDYXB0dXJlTnVtYmVyKSAqIGluZm9ybWF0aW9uLndpbmRvd0hlaWdodCk7XG5cdFx0fVxuXHR9O1xuXG5cdC8v44Kr44Oz44OQ44K544Gr55S75YOP44KS6Kqt44G/6L6844G/44CB5o+P5YaZ44GZ44KLXG5cdGNvbnN0IGRyYXdDYW52YXMgPSAoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIGluZGV4OiBudW1iZXIpID0+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiB7XG5cdFx0XHRjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuXHRcdFx0aW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuXHRcdFx0XHRjdHguZHJhd0ltYWdlKGltYWdlLCBjYXB0dXJlc1tpbmRleF0ueCwgY2FwdHVyZXNbaW5kZXhdLnkpO1xuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHR9O1xuXHRcdFx0aW1hZ2Uuc3JjID0gY2FwdHVyZXNbaW5kZXhdLnVybDtcblx0XHR9KTtcblx0fTtcblxuXHQvKipcblx0ICogdGFyZ2V0IOOBjCBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQg44Gn44GC44KL44GL5Yik5a6a44GZ44KLXG5cdCAqIOWFt+S9k+eahOOBq+OBryBkcmF3SW1hZ2Ug44Oh44K944OD44OJ44GM5a2Y5Zyo44GZ44KL44GL5Yik5a6a44GZ44KLXG5cdCAqIEBwYXJhbSB0YXJnZXRcblx0ICovXG5cdGNvbnN0IGlzQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gKHRhcmdldDogYW55KTogdGFyZ2V0IGlzIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9PiB7XG5cdFx0cmV0dXJuIHRhcmdldC5kcmF3SW1hZ2UgIT09IHVuZGVmaW5lZDtcblx0fVxuXG5cdC8v44Kr44Oz44OQ44K544KS5L2c5oiQ44GX44CB55S75YOPIFVSSSDjgpLkvZzmiJDjgZnjgotcblx0Y29uc3QgY3JlYXRlRGF0YVVSSSA9IChzZXR0aW5nczpTZXR0aW5ncywgaW5mb3JtYXRpb246IEluZm9ybWF0aW9uKSA9PiB7XG5cdFx0Ly/jgZPjga7plqLmlbDjgYzooYzjgYbpnZ7lkIzmnJ/lh6bnkIZcblx0XHRsZXQgdGFzazogUHJvbWlzZTx2b2lkPltdID0gW107XG5cblx0XHQvL+OCq+ODs+ODkOOCueOBruS9nOaIkFxuXHRcdGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXHRcdHN3aXRjaCAoc2V0dGluZ3MucmFuZ2UpIHtcblx0XHRcdGNhc2UgJ2Z1bGwnOlxuXHRcdFx0XHRjYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIGluZm9ybWF0aW9uLnJhdGlvVHlwZSA9PT0gJ3dpZHRoJyA/IFN0cmluZyhpbmZvcm1hdGlvbi5kb2N1bWVudFdpZHRoICogaW5mb3JtYXRpb24ucmF0aW8pIDogU3RyaW5nKGluZm9ybWF0aW9uLmRvY3VtZW50V2lkdGgpKTtcblx0XHRcdFx0Y2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaW5mb3JtYXRpb24ucmF0aW9UeXBlID09PSAnaGVpZ2h0JyA/IFN0cmluZyhpbmZvcm1hdGlvbi5kb2N1bWVudEhlaWdodCAqIGluZm9ybWF0aW9uLnJhdGlvKSA6IFN0cmluZyhpbmZvcm1hdGlvbi5kb2N1bWVudEhlaWdodCkpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgJ2Rpc3BsYXknOlxuXHRcdFx0XHRjYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsIFN0cmluZyhpbmZvcm1hdGlvbi53aW5kb3dXaWR0aCkpO1xuXHRcdFx0XHRjYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBTdHJpbmcoaW5mb3JtYXRpb24ud2luZG93SGVpZ2h0KSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAncGVyZmVjdCc6XG5cdFx0XHRcdGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgU3RyaW5nKGluZm9ybWF0aW9uLmRvY3VtZW50V2lkdGgpKTtcblx0XHRcdFx0Y2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgU3RyaW5nKGluZm9ybWF0aW9uLmRvY3VtZW50SGVpZ2h0KSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG5cblx0XHQvL+OCq+ODs+ODkOOCueOBruOCs+ODs+ODhuOCreOCueODiOOCkuWPluW+l1xuXHRcdGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG5cdFx0Ly/nlLvlg4/phY3nva7lh6bnkIbnmbvpjLJcblx0XHRpZiAoaXNDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQoY3R4KSlcblx0XHR7XG5cdFx0XHRmb3IgKGxldCBpID0gMCwgbWF4ID0gY2FwdHVyZXMubGVuZ3RoOyBpIDwgbWF4OyBpID0gKGkgKyAxKSB8IDApIHtcblx0XHRcdFx0dGFzay5wdXNoKGRyYXdDYW52YXMoY3R4LCBpKSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly/lhajjgabmm7jjgY3ntYLjgYjjgZ/jgokgRGF0YVVSTCDjgpLnlJ/miJDjgZfjgaYgUHJvbWlzZSDjgpLov5TjgZlcblx0XHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG5cdFx0XHRQcm9taXNlLmFsbCh0YXNrKS50aGVuKCgpID0+IHtcblx0XHRcdFx0Ly/nlLvlg4/mm7jjgY3lh7rjgZdcblx0XHRcdFx0Y29uc3QgdXJsID0gY2FudmFzLnRvRGF0YVVSTCgpO1xuXG5cdFx0XHRcdC8vY2FudmFzIOOCkua2iOOBmVxuXHRcdFx0XHRjYW52YXMucmVtb3ZlKCk7XG5cblx0XHRcdFx0Ly/ov5TjgZlcblx0XHRcdFx0cmVzb2x2ZSh1cmwpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH07XG5cblx0Ly/jgq3jg6Pjg5fjg4Hjg6Plrp/ooYxcblx0Y29uc3QgYWN0aW9uID0gKCkgPT4ge1xuXHRcdC8v54++5Zyo6KGo56S644GX44Gm44GE44KL44K/44OW44Gu5oOF5aCx44KS5YWl5omL44GZ44KLXG5cdFx0aW5pdCgpXG5cdFx0XHQudGhlbihkYXRhID0+IHtcblx0XHRcdFx0Ly/jgq3jg6Pjg5fjg4Hjg6Pjg7vnlLvlg4/nlJ/miJBcblx0XHRcdFx0Z2V0Q2FwdHVyZXMoZGF0YS5zZXR0aW5ncywgZGF0YS5pbmZvcm1hdGlvbiwgZGF0YS50YWIpXG5cdFx0XHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGNyZWF0ZURhdGFVUkkoZGF0YS5zZXR0aW5ncywgZGF0YS5pbmZvcm1hdGlvbik7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQudGhlbih1cmwgPT4ge1xuXHRcdFx0XHRcdFx0Y2hyb21lLnRhYnMuY3JlYXRlKHt1cmw6ICdkb3dubG9hZC5odG1sP3NyYz0nK3VybCsnJnRpdGxlPScrZGF0YS50YWIudGl0bGUrJyZ1cmw9JytkYXRhLnRhYi51cmx9KTtcblx0XHRcdFx0XHRcdGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKE51bWJlcihkYXRhLnRhYi5pZCksIHt0eXBlOiAnYmFjayd9KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2goKGRhdGEpID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XG5cdFx0XHRcdGFsZXJ0KCdTb3JyeSwgVHJ5IGFnYWluIGFmdGVyIHJlbG9hZC4nKTtcblx0XHRcdH0pO1xuXHR9O1xuXG5cdC8v44Ki44Kk44Kz44Oz44Kv44Oq44OD44KvXG5cdGNocm9tZS5icm93c2VyQWN0aW9uLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcihhY3Rpb24pO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==