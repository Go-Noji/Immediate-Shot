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
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _class_Capturing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class/Capturing */ "./src/class/Capturing.ts");
/* harmony import */ var _class_Filename__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./class/Filename */ "./src/class/Filename.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


{
    //Capturing クラス
    const capturing = new _class_Capturing__WEBPACK_IMPORTED_MODULE_0__["Capturing"]();
    /**
     * 拡張機能の設定と現在参照中のタブ情報を返す
     */
    const init = () => {
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
    /**
     * 現在表示しているタブのキャプチャを一回行う
     * @param id
     * @param range
     */
    const createCapture = (id, range, index) => {
        return new Promise(resolve => {
            //index === 1 (キャプチャが二回目)の場合は position: fixed の要素を非表示にする
            if (index === 1) {
                chrome.tabs.sendMessage(id, { type: 'killFixed' });
            }
            //スクロール・キャプチャ
            chrome.tabs.sendMessage(id, { type: 'sizing', range: range, index: index }, response => {
                setTimeout(() => {
                    capturing.capture(response.x, response.y)
                        .then(() => {
                        resolve();
                    });
                }, index < 2 ? 200 : 30);
            });
        });
    };
    /**
     * settings と information から求められている画像サイズを導き出す
     * @param settings
     * @param information
     */
    const getImageSize = (settings, information) => {
        //最終的な画像サイズを決定(この時点では range = display 用)
        let width = information.windowWidth;
        let height = information.windowHeight;
        //range に合わせた画像サイズを用意
        switch (settings.range) {
            case 'full':
                width = information.ratioType === 'width'
                    ? information.windowWidth
                    : information.windowWidth * information.ratio;
                height = information.ratioType === 'height'
                    ? information.windowHeight
                    : information.windowHeight * information.ratio;
                break;
            case 'perfect':
                width = information.documentWidth;
                height = information.documentHeight;
                break;
        }
        //返す
        return { width, height };
    };
    /**
     * 現在開いているタブのキャプチャを行う
     * @param settings
     * @param information
     * @param tab
     */
    const getDataURL = (settings, information, tab) => __awaiter(undefined, void 0, void 0, function* () {
        //何枚の画像をキャプチャするか
        const captureNumber = settings.range === 'perfect'
            ? information.captureNumber
            : 1;
        //サイズ取得
        const size = getImageSize(settings, information);
        //キャプチャ処理を必要な回数だけ行う
        for (let i = 0, max = captureNumber; i < max; i = (i + 1) | 0) {
            yield createCapture(Number(tab.id), settings.range, i);
        }
        //スタイルを元に戻す
        chrome.tabs.sendMessage(Number(tab.id), { type: 'back' });
        //dataURL 化
        return capturing.compose(size.width, size.height);
    });
    /**
     * ファイル名を決定し、ダウンロードを行う
     * @param url
     * @param settings
     */
    const download = (url, settings, tab) => {
        //ファイル名変換用クラス
        const filename = new _class_Filename__WEBPACK_IMPORTED_MODULE_1__["Filename"]();
        //ファイル名テンプレート変数文字列登録
        if (settings.title.indexOf('{{title}}') !== -1) {
            filename.setTemplate('{{title}}', decodeURIComponent(String(tab.title)));
        }
        if (settings.title.indexOf('{{url}}') !== -1) {
            filename.setTemplate('{{url}}', String(tab.url).replace(/https?:\/\//, ''));
        }
        if (settings.title.indexOf('{{counter}}') !== -1) {
            filename.setTemplate('{{counter}}', String(settings.counter));
            settings.counter = settings.counter + 1;
        }
        //counter 設定の保存
        chrome.storage.sync.set({ counter: settings.counter });
        //ダウンロード
        chrome.downloads.download({ url: url, filename: filename.getFileName(settings.title) + '.png' });
    };
    //キャプチャ実行
    const action = () => {
        //キャプチャの初期化
        capturing.init();
        //現在表示しているタブの情報を入手する
        init()
            .then(data => {
            getDataURL(data.settings, data.information, data.tab)
                .then((url) => {
                download(url, data.settings, data.tab);
            });
        })
            .catch((data) => {
            console.log(data);
            alert('Sorry, Try again after reload.');
        });
    };
    //アイコンクリック
    chrome.browserAction.onClicked.addListener(action);
    //右クリックメニュー
    chrome.contextMenus.create({
        id: 'run',
        title: 'Immediate Shot',
        contexts: ['all'],
        type: 'normal'
    });
    chrome.contextMenus.onClicked.addListener(action);
}


/***/ }),

/***/ "./src/class/Capturing.ts":
/*!********************************!*\
  !*** ./src/class/Capturing.ts ***!
  \********************************/
/*! exports provided: Capturing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Capturing", function() { return Capturing; });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Capturing {
    constructor() {
        //キャプチャ済み DataURL の集合
        this.captureURLs = [];
        /**
         * target が CanvasRenderingContext2D であるか判定する
         * 具体的には drawImage メソッドが存在するか判定する
         * @param target
         */
        this._isCanvasRenderingContext2D = (target) => {
            return target.drawImage !== undefined;
        };
        /**
         * キャプチャが複数枚ある場合、一番右 or 一番下に位置する画像は座標をズラす必用があるのでその変更前・後の値を算出
         * captureURLs の各配列値の x か y の中かから最大値を探し、その値と変更すべき値を返す
         * documentSize は target = 'x' だったら documentWidth, target = 'y' だったら documentHeight
         * @param target
         * @param documentSize
         * @private
         */
        this._getNeedToChangeCoordinate = (target, documentSize) => {
            //captureURLs 内のの target 最大値
            let max = 0;
            //target = 'x' なら画像一枚あたりの幅, target = 'y' なら画像一枚あたりの高さ
            let size = 0;
            //最大値検索
            for (let i = 0, length = this.captureURLs.length; i < length; i = (i + 1) | 0) {
                if (this.captureURLs[i][target] <= max) {
                    continue;
                }
                //画像一枚あたりの大きさを算出
                size = this.captureURLs[i][target] - max;
                //最大値の更新
                max = this.captureURLs[i][target];
            }
            //最大値 / documentSize の余りを引く
            return {
                original: max,
                changed: size === 0 || max === 0 ? max : max - (size - documentSize % size)
            };
        };
        /**
         * captureURLs の一番右 or 一番下に位置する画像座標を整形して返す
         * @param width
         * @param height
         * @private
         */
        this._getCaptureURLsShapedCoordinates = (width, height) => {
            //この関数が返す値
            let results = [];
            //x 座標と y 座標それぞれの変更すべき座標を算出
            const changeX = this._getNeedToChangeCoordinate('x', width);
            const changeY = this._getNeedToChangeCoordinate('y', height);
            //captureURLs を整形しつつ results へコピー
            for (let i = 0, max = this.captureURLs.length; i < max; i = (i + 1) | 0) {
                //コピー
                results[i] = this.captureURLs[i];
                //x 座標の整形
                if (results[i].x === changeX.original) {
                    results[i].x = changeX.changed;
                }
                //y 座標の整形
                if (results[i].y === changeY.original) {
                    results[i].y = changeY.changed;
                }
            }
            //返す
            return results;
        };
        /**
         * 現在 captureURLs に読み込まれているデータをカンバスに読み込み、合成、トリミングする
         * 最終的に吐き出される画像の大きさは width * height となる
         * @private
         */
        this.compose = (width, height) => __awaiter(this, void 0, void 0, function* () {
            //カンバスの作成
            const canvas = document.createElement('canvas');
            //カンバスの大きさを設定
            canvas.setAttribute('width', width + 'px');
            canvas.setAttribute('height', height + 'px');
            //2D コンテキストを取得
            const ctx = canvas.getContext('2d');
            //ctx のタイプガード
            if (!this._isCanvasRenderingContext2D(ctx)) {
                return '';
            }
            //座標整形後の captureURL
            const changedCaptureURLs = this._getCaptureURLsShapedCoordinates(width, height);
            //カンバスに画像を設置
            yield changedCaptureURLs.reduce((prev, current) => prev.then(() => {
                return new Promise(resolve => {
                    const image = new Image();
                    image.onload = () => {
                        ctx.drawImage(image, current.x, current.y);
                        resolve();
                    };
                    image.src = current.url;
                });
            }), Promise.resolve());
            //dataURL を生成
            const data = canvas.toDataURL();
            //canvas を消す
            canvas.remove();
            //dataURL を返す
            return data;
        });
    }
    /**
     * キャプチャを取得し、captureURLs に push する
     * @param x
     * @param y
     * @private
     */
    capture(x, y) {
        return new Promise(resolve => {
            chrome.tabs.captureVisibleTab((url) => {
                this.captureURLs.push({ x, y, url });
                resolve();
            });
        });
    }
    /**
     * captureURLs を空にする
     */
    init() {
        this.captureURLs = [];
    }
}


/***/ }),

/***/ "./src/class/Filename.ts":
/*!*******************************!*\
  !*** ./src/class/Filename.ts ***!
  \*******************************/
/*! exports provided: Filename */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filename", function() { return Filename; });
class Filename {
    /**
     * ファイル名に使用できない文字を全て replacement に置換して返す
     * @param string
     * @param replacement
     * @return {string}
     * @private
     */
    _replaceBadCharacter(string, replacement = '_') {
        return String(string).replace(/[\\\/:\*\?"<>\-\|\s]+/g, replacement);
    }
    /**
     * this.templates の定義
     */
    constructor() {
        this.templates = new Array();
    }
    /**
     * テンプレート変数文字列とその値を設定する
     * @param template
     * @param value
     */
    setTemplate(template, value) {
        this.templates.push({
            template: String(template),
            value: String(value)
        });
    }
    /**
     * setTemplate(), _replaceBadCharacter() で変換したファイル名を出力
     * @param name
     * @return {string}
     */
    getFileName(name) {
        //テンプレート変数文字列を値に置き換える
        for (let i = 0, max = this.templates.length; i < max; i = (i + 1) | 0) {
            name = String(name).replace(new RegExp(this.templates[i].template, 'g'), this.templates[i].value);
        }
        //使用不可の文字を全て置き換えて返却
        return this._replaceBadCharacter(name);
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzL0NhcHR1cmluZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MvRmlsZW5hbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakY0QztBQUNGO0FBUTFDO0lBQ0MsZUFBZTtJQUNmLE1BQU0sU0FBUyxHQUFHLElBQUksMERBQVMsRUFBRSxDQUFDO0lBRWxDOztPQUVHO0lBQ0gsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO1FBQ2pCOzs7V0FHRztRQUNILE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBYSxFQUFTLEVBQUU7WUFDMUMsUUFBUSxLQUFLLEVBQUU7Z0JBQ2QsS0FBSyxNQUFNLENBQUM7Z0JBQ1os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QUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkc7UUFFRCxtQkFBbUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztDQUVGIiwiZmlsZSI6ImJhY2tncm91bmQuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYmFja2dyb3VuZC50c1wiKTtcbiIsImltcG9ydCB7SW5mb3JtYXRpb24sIFNldHRpbmdzLCBSYW5nZX0gZnJvbSBcInNyYy9jbGFzcy9pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHtDYXB0dXJpbmd9IGZyb20gXCIuL2NsYXNzL0NhcHR1cmluZ1wiO1xyXG5pbXBvcnQge0ZpbGVuYW1lfSBmcm9tIFwiLi9jbGFzcy9GaWxlbmFtZVwiO1xyXG5cclxuaW50ZXJmYWNlIEluaXREYXRhIHtcclxuXHR0YWI6IGNocm9tZS50YWJzLlRhYixcclxuXHRzZXR0aW5nczogU2V0dGluZ3MsXHJcblx0aW5mb3JtYXRpb246IEluZm9ybWF0aW9uXHJcbn1cclxuXHJcbntcclxuXHQvL0NhcHR1cmluZyDjgq/jg6njgrlcclxuXHRjb25zdCBjYXB0dXJpbmcgPSBuZXcgQ2FwdHVyaW5nKCk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIOaLoeW8teapn+iDveOBruioreWumuOBqOePvuWcqOWPgueFp+S4reOBruOCv+ODluaDheWgseOCkui/lOOBmVxyXG5cdCAqL1xyXG5cdGNvbnN0IGluaXQgPSAoKSA9PiB7XHJcblx0XHQvKipcclxuXHRcdCAqIHJhbmdlIOOCkiBSYW5nZSDlnovjgavjgq3jg6Pjgrnjg4jjgZnjgotcclxuXHRcdCAqIEBwYXJhbSByYW5nZVxyXG5cdFx0ICovXHJcblx0XHRjb25zdCBjYXN0UmFuZ2UgPSAocmFuZ2U6IHN0cmluZyk6IFJhbmdlID0+IHtcclxuXHRcdFx0c3dpdGNoIChyYW5nZSkge1xyXG5cdFx0XHRcdGNhc2UgJ2Z1bGwnOlxyXG5cdFx0XHRcdGNhc2UgJ2Rpc3BsYXknOlxyXG5cdFx0XHRcdGNhc2UgJ3BlcmZlY3QnOlxyXG5cdFx0XHRcdFx0cmV0dXJuIHJhbmdlO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHJldHVybiAnZnVsbCc7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8SW5pdERhdGE+KHJlc29sdmUgPT4ge1xyXG5cdFx0XHQvL+aLoeW8teapn+iDveOBruioreWumuOCkuWFpeaJi1xyXG5cdFx0XHRuZXcgUHJvbWlzZTxjaHJvbWUudGFicy5UYWI+KGlubmVyUmVzb2x2ZSA9PiB7XHJcblx0XHRcdFx0Y2hyb21lLnRhYnMucXVlcnkoe2FjdGl2ZTogdHJ1ZX0sICh0YWJzOiBjaHJvbWUudGFicy5UYWJbXSkgPT4ge1xyXG5cdFx0XHRcdFx0aW5uZXJSZXNvbHZlKHRhYnNbMF0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHRcdC50aGVuKHRhYiA9PiB7XHJcblx0XHRcdFx0XHRyZXR1cm4gbmV3IFByb21pc2U8e3RhYjogY2hyb21lLnRhYnMuVGFiLCBzZXR0aW5nczogU2V0dGluZ3N9Pihpbm5lclJlc29sdmUgPT4ge1xyXG5cdFx0XHRcdFx0XHRjaHJvbWUuc3RvcmFnZS5zeW5jLmdldCh7cmFuZ2U6ICdmdWxsJywgdGl0bGU6ICd7e3RpdGxlfX0nLCBjb3VudGVyOiAwfSwgKGl0ZW1zOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdGlubmVyUmVzb2x2ZSh7dGFiLCBzZXR0aW5nczoge3JhbmdlOiBjYXN0UmFuZ2UoaXRlbXMucmFuZ2UpLCB0aXRsZTogU3RyaW5nKGl0ZW1zLnRpdGxlKSwgY291bnRlcjogTnVtYmVyKGl0ZW1zLmNvdW50ZXIpfX0pO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LnRoZW4oKGRhdGE6IHt0YWI6IGNocm9tZS50YWJzLlRhYiwgc2V0dGluZ3M6IFNldHRpbmdzfSkgPT4ge1xyXG5cdFx0XHRcdFx0Ly/nj77lkIjooajnpLrjgZfjgabjgYTjgovjgr/jg5bjga7mg4XloLHjgpLlhaXmiYtcclxuXHRcdFx0XHRcdGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKE51bWJlcihkYXRhLnRhYi5pZCksIHt0eXBlOiAnaW5mb3JtYXRpb24nfSwgKGluZm9ybWF0aW9uOiBJbmZvcm1hdGlvbikgPT4ge1xyXG5cdFx0XHRcdFx0XHRyZXNvbHZlKHt0YWI6IGRhdGEudGFiLCBzZXR0aW5nczogZGF0YS5zZXR0aW5ncywgaW5mb3JtYXRpb259KTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICog54++5Zyo6KGo56S644GX44Gm44GE44KL44K/44OW44Gu44Kt44Oj44OX44OB44Oj44KS5LiA5Zue6KGM44GGXHJcblx0ICogQHBhcmFtIGlkXHJcblx0ICogQHBhcmFtIHJhbmdlXHJcblx0ICovXHJcblx0Y29uc3QgY3JlYXRlQ2FwdHVyZSA9IChpZDogbnVtYmVyLCByYW5nZTogUmFuZ2UsIGluZGV4OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuXHRcdHJldHVybiAgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcblx0XHRcdC8vaW5kZXggPT09IDEgKOOCreODo+ODl+ODgeODo+OBjOS6jOWbnuebrinjga7loLTlkIjjga8gcG9zaXRpb246IGZpeGVkIOOBruimgee0oOOCkumdnuihqOekuuOBq+OBmeOCi1xyXG5cdFx0XHRpZiAoaW5kZXggPT09IDEpIHtcclxuXHRcdFx0XHRjaHJvbWUudGFicy5zZW5kTWVzc2FnZShpZCwge3R5cGU6ICdraWxsRml4ZWQnfSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8v44K544Kv44Ot44O844Or44O744Kt44Oj44OX44OB44OjXHJcblx0XHRcdGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGlkLCB7dHlwZTogJ3NpemluZycsIHJhbmdlOiByYW5nZSwgaW5kZXg6IGluZGV4fSwgcmVzcG9uc2UgPT4ge1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0Y2FwdHVyaW5nLmNhcHR1cmUocmVzcG9uc2UueCwgcmVzcG9uc2UueSlcclxuXHRcdFx0XHRcdFx0LnRoZW4oKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSwgaW5kZXggPCAyID8gMjAwIDogMzApO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIHNldHRpbmdzIOOBqCBpbmZvcm1hdGlvbiDjgYvjgonmsYLjgoHjgonjgozjgabjgYTjgovnlLvlg4/jgrXjgqTjgrrjgpLlsI7jgY3lh7rjgZlcclxuXHQgKiBAcGFyYW0gc2V0dGluZ3NcclxuXHQgKiBAcGFyYW0gaW5mb3JtYXRpb25cclxuXHQgKi9cclxuXHRjb25zdCBnZXRJbWFnZVNpemUgPSAoc2V0dGluZ3M6IFNldHRpbmdzLCBpbmZvcm1hdGlvbjogSW5mb3JtYXRpb24pOiB7d2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXJ9ID0+IHtcclxuXHRcdC8v5pyA57WC55qE44Gq55S75YOP44K144Kk44K644KS5rG65a6aKOOBk+OBruaZgueCueOBp+OBryByYW5nZSA9IGRpc3BsYXkg55SoKVxyXG5cdFx0bGV0IHdpZHRoID0gaW5mb3JtYXRpb24ud2luZG93V2lkdGg7XHJcblx0XHRsZXQgaGVpZ2h0ID0gaW5mb3JtYXRpb24ud2luZG93SGVpZ2h0O1xyXG5cclxuXHRcdC8vcmFuZ2Ug44Gr5ZCI44KP44Gb44Gf55S75YOP44K144Kk44K644KS55So5oSPXHJcblx0XHRzd2l0Y2ggKHNldHRpbmdzLnJhbmdlKSB7XHJcblx0XHRcdGNhc2UgJ2Z1bGwnOlxyXG5cdFx0XHRcdHdpZHRoID0gaW5mb3JtYXRpb24ucmF0aW9UeXBlID09PSAnd2lkdGgnXHJcblx0XHRcdFx0XHQ/IGluZm9ybWF0aW9uLndpbmRvd1dpZHRoXHJcblx0XHRcdFx0XHQ6IGluZm9ybWF0aW9uLndpbmRvd1dpZHRoICogaW5mb3JtYXRpb24ucmF0aW87XHJcblx0XHRcdFx0aGVpZ2h0ID0gaW5mb3JtYXRpb24ucmF0aW9UeXBlID09PSAnaGVpZ2h0J1xyXG5cdFx0XHRcdFx0PyBpbmZvcm1hdGlvbi53aW5kb3dIZWlnaHRcclxuXHRcdFx0XHRcdDogaW5mb3JtYXRpb24ud2luZG93SGVpZ2h0ICogaW5mb3JtYXRpb24ucmF0aW87XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3BlcmZlY3QnOlxyXG5cdFx0XHRcdHdpZHRoID0gaW5mb3JtYXRpb24uZG9jdW1lbnRXaWR0aDtcclxuXHRcdFx0XHRoZWlnaHQgPSBpbmZvcm1hdGlvbi5kb2N1bWVudEhlaWdodDtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHJcblx0XHQvL+i/lOOBmVxyXG5cdFx0cmV0dXJuICB7d2lkdGgsIGhlaWdodH07XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICog54++5Zyo6ZaL44GE44Gm44GE44KL44K/44OW44Gu44Kt44Oj44OX44OB44Oj44KS6KGM44GGXHJcblx0ICogQHBhcmFtIHNldHRpbmdzXHJcblx0ICogQHBhcmFtIGluZm9ybWF0aW9uXHJcblx0ICogQHBhcmFtIHRhYlxyXG5cdCAqL1xyXG5cdGNvbnN0IGdldERhdGFVUkwgPSBhc3luYyAoc2V0dGluZ3M6IFNldHRpbmdzLCBpbmZvcm1hdGlvbjogSW5mb3JtYXRpb24sIHRhYjogY2hyb21lLnRhYnMuVGFiKSA9PiB7XHJcblx0XHQvL+S9leaemuOBrueUu+WDj+OCkuOCreODo+ODl+ODgeODo+OBmeOCi+OBi1xyXG5cdFx0Y29uc3QgY2FwdHVyZU51bWJlciA9IHNldHRpbmdzLnJhbmdlID09PSAncGVyZmVjdCdcclxuXHRcdFx0PyBpbmZvcm1hdGlvbi5jYXB0dXJlTnVtYmVyXHJcblx0XHRcdDogMTtcclxuXHJcblx0XHQvL+OCteOCpOOCuuWPluW+l1xyXG5cdFx0Y29uc3Qgc2l6ZSA9IGdldEltYWdlU2l6ZShzZXR0aW5ncywgaW5mb3JtYXRpb24pO1xyXG5cclxuXHRcdC8v44Kt44Oj44OX44OB44Oj5Yem55CG44KS5b+F6KaB44Gq5Zue5pWw44Gg44GR6KGM44GGXHJcblx0XHRmb3IgKGxldCBpID0gMCwgbWF4ID0gY2FwdHVyZU51bWJlcjsgaSA8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XHJcblx0XHRcdGF3YWl0IGNyZWF0ZUNhcHR1cmUoTnVtYmVyKHRhYi5pZCksIHNldHRpbmdzLnJhbmdlLCBpKTtcclxuXHRcdH1cclxuXHJcblx0XHQvL+OCueOCv+OCpOODq+OCkuWFg+OBq+aIu+OBmVxyXG5cdFx0Y2hyb21lLnRhYnMuc2VuZE1lc3NhZ2UoTnVtYmVyKHRhYi5pZCksIHt0eXBlOiAnYmFjayd9KTtcclxuXHJcblx0XHQvL2RhdGFVUkwg5YyWXHJcblx0XHRyZXR1cm4gY2FwdHVyaW5nLmNvbXBvc2Uoc2l6ZS53aWR0aCwgc2l6ZS5oZWlnaHQpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIOODleOCoeOCpOODq+WQjeOCkuaxuuWumuOBl+OAgeODgOOCpuODs+ODreODvOODieOCkuihjOOBhlxyXG5cdCAqIEBwYXJhbSB1cmxcclxuXHQgKiBAcGFyYW0gc2V0dGluZ3NcclxuXHQgKi9cclxuXHRjb25zdCBkb3dubG9hZCA9ICh1cmw6IHN0cmluZywgc2V0dGluZ3M6IFNldHRpbmdzLCB0YWI6IGNocm9tZS50YWJzLlRhYikgPT4ge1xyXG5cdFx0Ly/jg5XjgqHjgqTjg6vlkI3lpInmj5vnlKjjgq/jg6njgrlcclxuXHRcdGNvbnN0IGZpbGVuYW1lID0gbmV3IEZpbGVuYW1lKCk7XHJcblxyXG5cdFx0Ly/jg5XjgqHjgqTjg6vlkI3jg4bjg7Pjg5fjg6zjg7zjg4jlpInmlbDmloflrZfliJfnmbvpjLJcclxuXHRcdGlmIChzZXR0aW5ncy50aXRsZS5pbmRleE9mKCd7e3RpdGxlfX0nKSAhPT0gLTEpIHtcclxuXHRcdFx0ZmlsZW5hbWUuc2V0VGVtcGxhdGUoJ3t7dGl0bGV9fScsIGRlY29kZVVSSUNvbXBvbmVudChTdHJpbmcodGFiLnRpdGxlKSkpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHNldHRpbmdzLnRpdGxlLmluZGV4T2YoJ3t7dXJsfX0nKSAhPT0gLTEpIHtcclxuXHRcdFx0ZmlsZW5hbWUuc2V0VGVtcGxhdGUoJ3t7dXJsfX0nLCBTdHJpbmcodGFiLnVybCkucmVwbGFjZSgvaHR0cHM/OlxcL1xcLy8sICcnKSk7XHJcblx0XHR9XHJcblx0XHRpZiAoc2V0dGluZ3MudGl0bGUuaW5kZXhPZigne3tjb3VudGVyfX0nKSAhPT0gLTEpIHtcclxuXHRcdFx0ZmlsZW5hbWUuc2V0VGVtcGxhdGUoJ3t7Y291bnRlcn19JywgU3RyaW5nKHNldHRpbmdzLmNvdW50ZXIpKTtcclxuXHRcdFx0c2V0dGluZ3MuY291bnRlciA9IHNldHRpbmdzLmNvdW50ZXIgKyAxO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vY291bnRlciDoqK3lrprjga7kv53lrZhcclxuXHRcdGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHtjb3VudGVyOiBzZXR0aW5ncy5jb3VudGVyfSk7XHJcblxyXG5cdFx0Ly/jg4Djgqbjg7Pjg63jg7zjg4lcclxuXHRcdGNocm9tZS5kb3dubG9hZHMuZG93bmxvYWQoe3VybDogdXJsLCBmaWxlbmFtZTogZmlsZW5hbWUuZ2V0RmlsZU5hbWUoc2V0dGluZ3MudGl0bGUpKycucG5nJ30pO1xyXG5cdH07XHJcblxyXG5cdC8v44Kt44Oj44OX44OB44Oj5a6f6KGMXHJcblx0Y29uc3QgYWN0aW9uID0gKCkgPT4ge1xyXG5cdFx0Ly/jgq3jg6Pjg5fjg4Hjg6Pjga7liJ3mnJ/ljJZcclxuXHRcdGNhcHR1cmluZy5pbml0KCk7XHJcblxyXG5cdFx0Ly/nj77lnKjooajnpLrjgZfjgabjgYTjgovjgr/jg5bjga7mg4XloLHjgpLlhaXmiYvjgZnjgotcclxuXHRcdGluaXQoKVxyXG5cdFx0XHQudGhlbihkYXRhID0+IHtcclxuXHRcdFx0XHRnZXREYXRhVVJMKGRhdGEuc2V0dGluZ3MsIGRhdGEuaW5mb3JtYXRpb24sIGRhdGEudGFiKVxyXG5cdFx0XHRcdFx0LnRoZW4oKHVybDogc3RyaW5nKSA9PiB7XHJcblx0XHRcdFx0XHRcdGRvd25sb2FkKHVybCwgZGF0YS5zZXR0aW5ncywgZGF0YS50YWIpO1xyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdH0pXHJcblx0XHRcdC5jYXRjaCgoZGF0YSkgPT4ge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGRhdGEpO1xyXG5cdFx0XHRcdGFsZXJ0KCdTb3JyeSwgVHJ5IGFnYWluIGFmdGVyIHJlbG9hZC4nKTtcclxuXHRcdFx0fSk7XHJcblx0fTtcclxuXHJcblx0Ly/jgqLjgqTjgrPjg7Pjgq/jg6rjg4Pjgq9cclxuXHRjaHJvbWUuYnJvd3NlckFjdGlvbi5vbkNsaWNrZWQuYWRkTGlzdGVuZXIoYWN0aW9uKTtcclxuXHJcblxyXG5cdC8v5Y+z44Kv44Oq44OD44Kv44Oh44OL44Ol44O8XHJcblx0Y2hyb21lLmNvbnRleHRNZW51cy5jcmVhdGUoe1xyXG5cdFx0aWQ6ICdydW4nLFxyXG5cdFx0dGl0bGU6ICdJbW1lZGlhdGUgU2hvdCcsXHJcblx0XHRjb250ZXh0czogWydhbGwnXSxcclxuXHRcdHR5cGU6ICdub3JtYWwnXHJcblx0fSk7XHJcblx0Y2hyb21lLmNvbnRleHRNZW51cy5vbkNsaWNrZWQuYWRkTGlzdGVuZXIoYWN0aW9uKTtcclxufVxyXG4iLCJpbnRlcmZhY2UgQ2FwdHVyZVVSTCB7XHJcbiAgdXJsOiBzdHJpbmcsXHJcbiAgeDogbnVtYmVyLFxyXG4gIHk6IG51bWJlclxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ2FwdHVyaW5nIHtcclxuXHJcbiAgLy/jgq3jg6Pjg5fjg4Hjg6PmuIjjgb8gRGF0YVVSTCDjga7pm4blkIhcclxuICBwcml2YXRlIGNhcHR1cmVVUkxzOiBDYXB0dXJlVVJMW10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogdGFyZ2V0IOOBjCBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQg44Gn44GC44KL44GL5Yik5a6a44GZ44KLXHJcbiAgICog5YW35L2T55qE44Gr44GvIGRyYXdJbWFnZSDjg6Hjgr3jg4Pjg4njgYzlrZjlnKjjgZnjgovjgYvliKTlrprjgZnjgotcclxuICAgKiBAcGFyYW0gdGFyZ2V0XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfaXNDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPSAodGFyZ2V0OiBhbnkpOiB0YXJnZXQgaXMgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0+IHtcclxuICAgIHJldHVybiB0YXJnZXQuZHJhd0ltYWdlICE9PSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDjgq3jg6Pjg5fjg4Hjg6PjgYzopIfmlbDmnprjgYLjgovloLTlkIjjgIHkuIDnlarlj7Mgb3Ig5LiA55Wq5LiL44Gr5L2N572u44GZ44KL55S75YOP44Gv5bqn5qiZ44KS44K644Op44GZ5b+F55So44GM44GC44KL44Gu44Gn44Gd44Gu5aSJ5pu05YmN44O75b6M44Gu5YCk44KS566X5Ye6XHJcbiAgICogY2FwdHVyZVVSTHMg44Gu5ZCE6YWN5YiX5YCk44GuIHgg44GLIHkg44Gu5Lit44GL44GL44KJ5pyA5aSn5YCk44KS5o6i44GX44CB44Gd44Gu5YCk44Go5aSJ5pu044GZ44G544GN5YCk44KS6L+U44GZXHJcbiAgICogZG9jdW1lbnRTaXplIOOBryB0YXJnZXQgPSAneCcg44Gg44Gj44Gf44KJIGRvY3VtZW50V2lkdGgsIHRhcmdldCA9ICd5JyDjgaDjgaPjgZ/jgokgZG9jdW1lbnRIZWlnaHRcclxuICAgKiBAcGFyYW0gdGFyZ2V0XHJcbiAgICogQHBhcmFtIGRvY3VtZW50U2l6ZVxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZ2V0TmVlZFRvQ2hhbmdlQ29vcmRpbmF0ZSA9ICh0YXJnZXQ6ICd4JyB8ICd5JywgZG9jdW1lbnRTaXplOiBudW1iZXIpOiB7b3JpZ2luYWw6IG51bWJlciwgY2hhbmdlZDogbnVtYmVyfSA9PiB7XHJcbiAgICAvL2NhcHR1cmVVUkxzIOWGheOBruOBriB0YXJnZXQg5pyA5aSn5YCkXHJcbiAgICBsZXQgbWF4ID0gMDtcclxuXHJcbiAgICAvL3RhcmdldCA9ICd4JyDjgarjgonnlLvlg4/kuIDmnprjgYLjgZ/jgorjga7luYUsIHRhcmdldCA9ICd5JyDjgarjgonnlLvlg4/kuIDmnprjgYLjgZ/jgorjga7pq5jjgZVcclxuICAgIGxldCBzaXplID0gMDtcclxuXHJcbiAgICAvL+acgOWkp+WApOaknOe0olxyXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbmd0aCA9IHRoaXMuY2FwdHVyZVVSTHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpID0gKGkgKyAxKSB8IDApIHtcclxuICAgICAgaWYgKHRoaXMuY2FwdHVyZVVSTHNbaV1bdGFyZ2V0XSA8PSBtYXgpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy/nlLvlg4/kuIDmnprjgYLjgZ/jgorjga7lpKfjgY3jgZXjgpLnrpflh7pcclxuICAgICAgc2l6ZSA9IHRoaXMuY2FwdHVyZVVSTHNbaV1bdGFyZ2V0XSAtIG1heDtcclxuXHJcbiAgICAgIC8v5pyA5aSn5YCk44Gu5pu05pawXHJcbiAgICAgIG1heCA9IHRoaXMuY2FwdHVyZVVSTHNbaV1bdGFyZ2V0XTtcclxuICAgIH1cclxuXHJcbiAgICAvL+acgOWkp+WApCAvIGRvY3VtZW50U2l6ZSDjga7kvZnjgorjgpLlvJXjgY9cclxuICAgIHJldHVybiB7XHJcbiAgICAgIG9yaWdpbmFsOiBtYXgsXHJcbiAgICAgIGNoYW5nZWQ6IHNpemUgPT09IDAgfHwgbWF4ID09PSAwID8gbWF4IDogbWF4IC0gKHNpemUgLSBkb2N1bWVudFNpemUgJSBzaXplKVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY2FwdHVyZVVSTHMg44Gu5LiA55Wq5Y+zIG9yIOS4gOeVquS4i+OBq+S9jee9ruOBmeOCi+eUu+WDj+W6p+aomeOCkuaVtOW9ouOBl+OBpui/lOOBmVxyXG4gICAqIEBwYXJhbSB3aWR0aFxyXG4gICAqIEBwYXJhbSBoZWlnaHRcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2dldENhcHR1cmVVUkxzU2hhcGVkQ29vcmRpbmF0ZXMgPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBDYXB0dXJlVVJMW10gPT4ge1xyXG4gICAgLy/jgZPjga7plqLmlbDjgYzov5TjgZnlgKRcclxuICAgIGxldCByZXN1bHRzOiBDYXB0dXJlVVJMW10gPSBbXTtcclxuXHJcbiAgICAvL3gg5bqn5qiZ44GoIHkg5bqn5qiZ44Gd44KM44Ge44KM44Gu5aSJ5pu044GZ44G544GN5bqn5qiZ44KS566X5Ye6XHJcbiAgICBjb25zdCBjaGFuZ2VYID0gdGhpcy5fZ2V0TmVlZFRvQ2hhbmdlQ29vcmRpbmF0ZSgneCcsIHdpZHRoKTtcclxuICAgIGNvbnN0IGNoYW5nZVkgPSB0aGlzLl9nZXROZWVkVG9DaGFuZ2VDb29yZGluYXRlKCd5JywgaGVpZ2h0KTtcclxuXHJcbiAgICAvL2NhcHR1cmVVUkxzIOOCkuaVtOW9ouOBl+OBpOOBpCByZXN1bHRzIOOBuOOCs+ODlOODvFxyXG4gICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IHRoaXMuY2FwdHVyZVVSTHMubGVuZ3RoOyBpIDwgbWF4OyBpID0gKGkgKyAxKSB8IDApIHtcclxuICAgICAgLy/jgrPjg5Tjg7xcclxuICAgICAgcmVzdWx0c1tpXSA9IHRoaXMuY2FwdHVyZVVSTHNbaV07XHJcblxyXG4gICAgICAvL3gg5bqn5qiZ44Gu5pW05b2iXHJcbiAgICAgIGlmIChyZXN1bHRzW2ldLnggPT09IGNoYW5nZVgub3JpZ2luYWwpIHtcclxuICAgICAgICByZXN1bHRzW2ldLnggPSBjaGFuZ2VYLmNoYW5nZWQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8veSDluqfmqJnjga7mlbTlvaJcclxuICAgICAgaWYgKHJlc3VsdHNbaV0ueSA9PT0gY2hhbmdlWS5vcmlnaW5hbCkge1xyXG4gICAgICAgIHJlc3VsdHNbaV0ueSA9IGNoYW5nZVkuY2hhbmdlZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8v6L+U44GZXHJcbiAgICByZXR1cm4gcmVzdWx0cztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOePvuWcqCBjYXB0dXJlVVJMcyDjgavoqq3jgb/ovrzjgb7jgozjgabjgYTjgovjg4fjg7zjgr/jgpLjgqvjg7Pjg5Djgrnjgavoqq3jgb/ovrzjgb/jgIHlkIjmiJDjgIHjg4jjg6rjg5/jg7PjgrDjgZnjgotcclxuICAgKiDmnIDntYLnmoTjgavlkJDjgY3lh7rjgZXjgozjgovnlLvlg4/jga7lpKfjgY3jgZXjga8gd2lkdGggKiBoZWlnaHQg44Go44Gq44KLXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwdWJsaWMgY29tcG9zZSA9IGFzeW5jICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IFByb21pc2U8c3RyaW5nPiA9PiB7XHJcbiAgICAvL+OCq+ODs+ODkOOCueOBruS9nOaIkFxyXG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcblxyXG4gICAgLy/jgqvjg7Pjg5Djgrnjga7lpKfjgY3jgZXjgpLoqK3lrppcclxuICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgd2lkdGgrJ3B4Jyk7XHJcbiAgICBjYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBoZWlnaHQrJ3B4Jyk7XHJcblxyXG4gICAgLy8yRCDjgrPjg7Pjg4bjgq3jgrnjg4jjgpLlj5blvpdcclxuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuICAgIC8vY3R4IOOBruOCv+OCpOODl+OCrOODvOODiVxyXG4gICAgaWYgKCAhIHRoaXMuX2lzQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKGN0eCkpXHJcbiAgICB7XHJcbiAgICAgIHJldHVybiAnJztcclxuICAgIH1cclxuXHJcbiAgICAvL+W6p+aomeaVtOW9ouW+jOOBriBjYXB0dXJlVVJMXHJcbiAgICBjb25zdCBjaGFuZ2VkQ2FwdHVyZVVSTHMgPSB0aGlzLl9nZXRDYXB0dXJlVVJMc1NoYXBlZENvb3JkaW5hdGVzKHdpZHRoLCBoZWlnaHQpO1xyXG5cclxuICAgIC8v44Kr44Oz44OQ44K544Gr55S75YOP44KS6Kit572uXHJcbiAgICBhd2FpdCBjaGFuZ2VkQ2FwdHVyZVVSTHMucmVkdWNlKChwcmV2LCBjdXJyZW50KSA9PiBwcmV2LnRoZW4oKCkgPT4ge1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCBjdXJyZW50LngsIGN1cnJlbnQueSk7XHJcbiAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpbWFnZS5zcmMgPSBjdXJyZW50LnVybDtcclxuICAgICAgfSk7XHJcbiAgICB9KSwgUHJvbWlzZS5yZXNvbHZlKCkpO1xyXG5cclxuICAgIC8vZGF0YVVSTCDjgpLnlJ/miJBcclxuICAgIGNvbnN0IGRhdGEgPSBjYW52YXMudG9EYXRhVVJMKCk7XHJcblxyXG4gICAgLy9jYW52YXMg44KS5raI44GZXHJcbiAgICBjYW52YXMucmVtb3ZlKCk7XHJcblxyXG4gICAgLy9kYXRhVVJMIOOCkui/lOOBmVxyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICog44Kt44Oj44OX44OB44Oj44KS5Y+W5b6X44GX44CBY2FwdHVyZVVSTHMg44GrIHB1c2gg44GZ44KLXHJcbiAgICogQHBhcmFtIHhcclxuICAgKiBAcGFyYW0geVxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHVibGljIGNhcHR1cmUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgY2hyb21lLnRhYnMuY2FwdHVyZVZpc2libGVUYWIoKHVybCkgPT4ge1xyXG4gICAgICAgIHRoaXMuY2FwdHVyZVVSTHMucHVzaCh7eCwgeSwgdXJsfSk7XHJcbiAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogY2FwdHVyZVVSTHMg44KS56m644Gr44GZ44KLXHJcbiAgICovXHJcbiAgcHVibGljIGluaXQoKSB7XHJcbiAgICB0aGlzLmNhcHR1cmVVUkxzID0gW107XHJcbiAgfVxyXG5cclxufVxyXG4iLCIvKipcclxuICog44OV44Kh44Kk44Or44ON44O844Og5L2c5oiQ44Kv44Op44K5XHJcbiAqL1xyXG5pbXBvcnQge1RlbXBsYXRlc30gZnJvbSBcIi4vaW50ZXJmYWNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRmlsZW5hbWUge1xyXG5cclxuICAvKipcclxuICAgKiDnva7jgY3mj5vjgYjlrprnvqlcclxuICAgKi9cclxuICBwcml2YXRlIHRlbXBsYXRlczogVGVtcGxhdGVzO1xyXG5cclxuICAvKipcclxuICAgKiDjg5XjgqHjgqTjg6vlkI3jgavkvb/nlKjjgafjgY3jgarjgYTmloflrZfjgpLlhajjgaYgcmVwbGFjZW1lbnQg44Gr572u5o+b44GX44Gm6L+U44GZXHJcbiAgICogQHBhcmFtIHN0cmluZ1xyXG4gICAqIEBwYXJhbSByZXBsYWNlbWVudFxyXG4gICAqIEByZXR1cm4ge3N0cmluZ31cclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3JlcGxhY2VCYWRDaGFyYWN0ZXIoc3RyaW5nOiBzdHJpbmcsIHJlcGxhY2VtZW50OiBzdHJpbmcgPSAnXycpIHtcclxuICAgIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKC9bXFxcXFxcLzpcXCpcXD9cIjw+XFwtXFx8XFxzXSsvZywgcmVwbGFjZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogdGhpcy50ZW1wbGF0ZXMg44Gu5a6a576pXHJcbiAgICovXHJcbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy50ZW1wbGF0ZXMgPSBuZXcgQXJyYXkoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOODhuODs+ODl+ODrOODvOODiOWkieaVsOaWh+Wtl+WIl+OBqOOBneOBruWApOOCkuioreWumuOBmeOCi1xyXG4gICAqIEBwYXJhbSB0ZW1wbGF0ZVxyXG4gICAqIEBwYXJhbSB2YWx1ZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBzZXRUZW1wbGF0ZSh0ZW1wbGF0ZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICB0aGlzLnRlbXBsYXRlcy5wdXNoKHtcclxuICAgICAgdGVtcGxhdGU6IFN0cmluZyh0ZW1wbGF0ZSksXHJcbiAgICAgIHZhbHVlOiBTdHJpbmcodmFsdWUpXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIHNldFRlbXBsYXRlKCksIF9yZXBsYWNlQmFkQ2hhcmFjdGVyKCkg44Gn5aSJ5o+b44GX44Gf44OV44Kh44Kk44Or5ZCN44KS5Ye65YqbXHJcbiAgICogQHBhcmFtIG5hbWVcclxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAgICovXHJcbiAgcHVibGljIGdldEZpbGVOYW1lKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAvL+ODhuODs+ODl+ODrOODvOODiOWkieaVsOaWh+Wtl+WIl+OCkuWApOOBq+e9ruOBjeaPm+OBiOOCi1xyXG4gICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IHRoaXMudGVtcGxhdGVzLmxlbmd0aDsgaSA8IG1heDsgaSA9IChpICsgMSkgfCAwKSB7XHJcbiAgICAgIG5hbWUgPSBTdHJpbmcobmFtZSkucmVwbGFjZShuZXcgUmVnRXhwKHRoaXMudGVtcGxhdGVzW2ldLnRlbXBsYXRlLCAnZycpLCB0aGlzLnRlbXBsYXRlc1tpXS52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/kvb/nlKjkuI3lj6/jga7mloflrZfjgpLlhajjgabnva7jgY3mj5vjgYjjgabov5TljbRcclxuICAgIHJldHVybiB0aGlzLl9yZXBsYWNlQmFkQ2hhcmFjdGVyKG5hbWUpO1xyXG4gIH1cclxuXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==