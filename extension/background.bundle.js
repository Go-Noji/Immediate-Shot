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
            chrome.tabs.sendMessage(id, { type: 'sizing', range: range, index: index }, response => {
                setTimeout(() => {
                    capturing.capture(response.x, response.y)
                        .then(() => {
                        resolve();
                    });
                }, index === 0 ? 200 : 10);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsYXNzL0NhcHR1cmluZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY2xhc3MvRmlsZW5hbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakY0QztBQUNGO0FBUTFDO0lBQ0MsZUFBZTtJQUNmLE1BQU0sU0FBUyxHQUFHLElBQUksMERBQVMsRUFBRSxDQUFDO0lBRWxDOztPQUVHO0lBQ0gsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO1FBQ2pCOzs7V0FHRztRQUNILE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBYSxFQUFTLEVBQUU7WUFDMUMsUUFBUSxLQUFLLEVBQUU7Z0JBQ2QsS0FBSyxNQUFNLENBQUM7Z0JBQ1os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QyxDQUFDO0lBQ3ZFLENBQUM7SUFFRDs7T0FFRztJQUNIO1FBQ0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksV0FBVyxDQUFDLFFBQWdCLEVBQUUsS0FBYTtRQUNoRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUNsQixRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUMxQixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUNyQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLFdBQVcsQ0FBQyxJQUFZO1FBQzdCLHFCQUFxQjtRQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3JFLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkc7UUFFRCxtQkFBbUI7UUFDbkIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztDQUVGIiwiZmlsZSI6ImJhY2tncm91bmQuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYmFja2dyb3VuZC50c1wiKTtcbiIsImltcG9ydCB7SW5mb3JtYXRpb24sIFNldHRpbmdzLCBSYW5nZX0gZnJvbSBcInNyYy9jbGFzcy9pbnRlcmZhY2VcIjtcclxuaW1wb3J0IHtDYXB0dXJpbmd9IGZyb20gXCIuL2NsYXNzL0NhcHR1cmluZ1wiO1xyXG5pbXBvcnQge0ZpbGVuYW1lfSBmcm9tIFwiLi9jbGFzcy9GaWxlbmFtZVwiO1xyXG5cclxuaW50ZXJmYWNlIEluaXREYXRhIHtcclxuXHR0YWI6IGNocm9tZS50YWJzLlRhYixcclxuXHRzZXR0aW5nczogU2V0dGluZ3MsXHJcblx0aW5mb3JtYXRpb246IEluZm9ybWF0aW9uXHJcbn1cclxuXHJcbntcclxuXHQvL0NhcHR1cmluZyDjgq/jg6njgrlcclxuXHRjb25zdCBjYXB0dXJpbmcgPSBuZXcgQ2FwdHVyaW5nKCk7XHJcblxyXG5cdC8qKlxyXG5cdCAqIOaLoeW8teapn+iDveOBruioreWumuOBqOePvuWcqOWPgueFp+S4reOBruOCv+ODluaDheWgseOCkui/lOOBmVxyXG5cdCAqL1xyXG5cdGNvbnN0IGluaXQgPSAoKSA9PiB7XHJcblx0XHQvKipcclxuXHRcdCAqIHJhbmdlIOOCkiBSYW5nZSDlnovjgavjgq3jg6Pjgrnjg4jjgZnjgotcclxuXHRcdCAqIEBwYXJhbSByYW5nZVxyXG5cdFx0ICovXHJcblx0XHRjb25zdCBjYXN0UmFuZ2UgPSAocmFuZ2U6IHN0cmluZyk6IFJhbmdlID0+IHtcclxuXHRcdFx0c3dpdGNoIChyYW5nZSkge1xyXG5cdFx0XHRcdGNhc2UgJ2Z1bGwnOlxyXG5cdFx0XHRcdGNhc2UgJ2Rpc3BsYXknOlxyXG5cdFx0XHRcdGNhc2UgJ3BlcmZlY3QnOlxyXG5cdFx0XHRcdFx0cmV0dXJuIHJhbmdlO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHJldHVybiAnZnVsbCc7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8SW5pdERhdGE+KHJlc29sdmUgPT4ge1xyXG5cdFx0XHQvL+aLoeW8teapn+iDveOBruioreWumuOCkuWFpeaJi1xyXG5cdFx0XHRuZXcgUHJvbWlzZTxjaHJvbWUudGFicy5UYWI+KGlubmVyUmVzb2x2ZSA9PiB7XHJcblx0XHRcdFx0Y2hyb21lLnRhYnMucXVlcnkoe2FjdGl2ZTogdHJ1ZX0sICh0YWJzOiBjaHJvbWUudGFicy5UYWJbXSkgPT4ge1xyXG5cdFx0XHRcdFx0aW5uZXJSZXNvbHZlKHRhYnNbMF0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KVxyXG5cdFx0XHRcdC50aGVuKHRhYiA9PiB7XHJcblx0XHRcdFx0XHRyZXR1cm4gbmV3IFByb21pc2U8e3RhYjogY2hyb21lLnRhYnMuVGFiLCBzZXR0aW5nczogU2V0dGluZ3N9Pihpbm5lclJlc29sdmUgPT4ge1xyXG5cdFx0XHRcdFx0XHRjaHJvbWUuc3RvcmFnZS5zeW5jLmdldCh7cmFuZ2U6ICdmdWxsJywgdGl0bGU6ICd7e3RpdGxlfX0nLCBjb3VudGVyOiAwfSwgKGl0ZW1zOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdGlubmVyUmVzb2x2ZSh7dGFiLCBzZXR0aW5nczoge3JhbmdlOiBjYXN0UmFuZ2UoaXRlbXMucmFuZ2UpLCB0aXRsZTogU3RyaW5nKGl0ZW1zLnRpdGxlKSwgY291bnRlcjogTnVtYmVyKGl0ZW1zLmNvdW50ZXIpfX0pO1xyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LnRoZW4oKGRhdGE6IHt0YWI6IGNocm9tZS50YWJzLlRhYiwgc2V0dGluZ3M6IFNldHRpbmdzfSkgPT4ge1xyXG5cdFx0XHRcdFx0Ly/nj77lkIjooajnpLrjgZfjgabjgYTjgovjgr/jg5bjga7mg4XloLHjgpLlhaXmiYtcclxuXHRcdFx0XHRcdGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKE51bWJlcihkYXRhLnRhYi5pZCksIHt0eXBlOiAnaW5mb3JtYXRpb24nfSwgKGluZm9ybWF0aW9uOiBJbmZvcm1hdGlvbikgPT4ge1xyXG5cdFx0XHRcdFx0XHRyZXNvbHZlKHt0YWI6IGRhdGEudGFiLCBzZXR0aW5nczogZGF0YS5zZXR0aW5ncywgaW5mb3JtYXRpb259KTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICog54++5Zyo6KGo56S644GX44Gm44GE44KL44K/44OW44Gu44Kt44Oj44OX44OB44Oj44KS5LiA5Zue6KGM44GGXHJcblx0ICogQHBhcmFtIGlkXHJcblx0ICogQHBhcmFtIHJhbmdlXHJcblx0ICovXHJcblx0Y29uc3QgY3JlYXRlQ2FwdHVyZSA9IChpZDogbnVtYmVyLCByYW5nZTogUmFuZ2UsIGluZGV4OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuXHRcdHJldHVybiAgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcblx0XHRcdGNocm9tZS50YWJzLnNlbmRNZXNzYWdlKGlkLCB7dHlwZTogJ3NpemluZycsIHJhbmdlOiByYW5nZSwgaW5kZXg6IGluZGV4fSwgcmVzcG9uc2UgPT4ge1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdFx0Y2FwdHVyaW5nLmNhcHR1cmUocmVzcG9uc2UueCwgcmVzcG9uc2UueSlcclxuXHRcdFx0XHRcdFx0LnRoZW4oKCkgPT4ge1xyXG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSwgaW5kZXggPT09IDAgPyAyMDAgOiAxMCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogc2V0dGluZ3Mg44GoIGluZm9ybWF0aW9uIOOBi+OCieaxguOCgeOCieOCjOOBpuOBhOOCi+eUu+WDj+OCteOCpOOCuuOCkuWwjuOBjeWHuuOBmVxyXG5cdCAqIEBwYXJhbSBzZXR0aW5nc1xyXG5cdCAqIEBwYXJhbSBpbmZvcm1hdGlvblxyXG5cdCAqL1xyXG5cdGNvbnN0IGdldEltYWdlU2l6ZSA9IChzZXR0aW5nczogU2V0dGluZ3MsIGluZm9ybWF0aW9uOiBJbmZvcm1hdGlvbik6IHt3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcn0gPT4ge1xyXG5cdFx0Ly/mnIDntYLnmoTjgarnlLvlg4/jgrXjgqTjgrrjgpLmsbrlrpoo44GT44Gu5pmC54K544Gn44GvIHJhbmdlID0gZGlzcGxheSDnlKgpXHJcblx0XHRsZXQgd2lkdGggPSBpbmZvcm1hdGlvbi53aW5kb3dXaWR0aDtcclxuXHRcdGxldCBoZWlnaHQgPSBpbmZvcm1hdGlvbi53aW5kb3dIZWlnaHQ7XHJcblxyXG5cdFx0Ly9yYW5nZSDjgavlkIjjgo/jgZvjgZ/nlLvlg4/jgrXjgqTjgrrjgpLnlKjmhI9cclxuXHRcdHN3aXRjaCAoc2V0dGluZ3MucmFuZ2UpIHtcclxuXHRcdFx0Y2FzZSAnZnVsbCc6XHJcblx0XHRcdFx0d2lkdGggPSBpbmZvcm1hdGlvbi5yYXRpb1R5cGUgPT09ICd3aWR0aCdcclxuXHRcdFx0XHRcdD8gaW5mb3JtYXRpb24ud2luZG93V2lkdGhcclxuXHRcdFx0XHRcdDogaW5mb3JtYXRpb24ud2luZG93V2lkdGggKiBpbmZvcm1hdGlvbi5yYXRpbztcclxuXHRcdFx0XHRoZWlnaHQgPSBpbmZvcm1hdGlvbi5yYXRpb1R5cGUgPT09ICdoZWlnaHQnXHJcblx0XHRcdFx0XHQ/IGluZm9ybWF0aW9uLndpbmRvd0hlaWdodFxyXG5cdFx0XHRcdFx0OiBpbmZvcm1hdGlvbi53aW5kb3dIZWlnaHQgKiBpbmZvcm1hdGlvbi5yYXRpbztcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAncGVyZmVjdCc6XHJcblx0XHRcdFx0d2lkdGggPSBpbmZvcm1hdGlvbi5kb2N1bWVudFdpZHRoO1xyXG5cdFx0XHRcdGhlaWdodCA9IGluZm9ybWF0aW9uLmRvY3VtZW50SGVpZ2h0O1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8v6L+U44GZXHJcblx0XHRyZXR1cm4gIHt3aWR0aCwgaGVpZ2h0fTtcclxuXHR9O1xyXG5cclxuXHQvKipcclxuXHQgKiDnj77lnKjplovjgYTjgabjgYTjgovjgr/jg5bjga7jgq3jg6Pjg5fjg4Hjg6PjgpLooYzjgYZcclxuXHQgKiBAcGFyYW0gc2V0dGluZ3NcclxuXHQgKiBAcGFyYW0gaW5mb3JtYXRpb25cclxuXHQgKiBAcGFyYW0gdGFiXHJcblx0ICovXHJcblx0Y29uc3QgZ2V0RGF0YVVSTCA9IGFzeW5jIChzZXR0aW5nczogU2V0dGluZ3MsIGluZm9ybWF0aW9uOiBJbmZvcm1hdGlvbiwgdGFiOiBjaHJvbWUudGFicy5UYWIpID0+IHtcclxuXHRcdC8v5L2V5p6a44Gu55S75YOP44KS44Kt44Oj44OX44OB44Oj44GZ44KL44GLXHJcblx0XHRjb25zdCBjYXB0dXJlTnVtYmVyID0gc2V0dGluZ3MucmFuZ2UgPT09ICdwZXJmZWN0J1xyXG5cdFx0XHQ/IGluZm9ybWF0aW9uLmNhcHR1cmVOdW1iZXJcclxuXHRcdFx0OiAxO1xyXG5cclxuXHRcdC8v44K144Kk44K65Y+W5b6XXHJcblx0XHRjb25zdCBzaXplID0gZ2V0SW1hZ2VTaXplKHNldHRpbmdzLCBpbmZvcm1hdGlvbik7XHJcblxyXG5cdFx0Ly/jgq3jg6Pjg5fjg4Hjg6Plh6bnkIbjgpLlv4XopoHjgarlm57mlbDjgaDjgZHooYzjgYZcclxuXHRcdGZvciAobGV0IGkgPSAwLCBtYXggPSBjYXB0dXJlTnVtYmVyOyBpIDwgbWF4OyBpID0gKGkgKyAxKSB8IDApIHtcclxuXHRcdFx0YXdhaXQgY3JlYXRlQ2FwdHVyZShOdW1iZXIodGFiLmlkKSwgc2V0dGluZ3MucmFuZ2UsIGkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8v44K544K/44Kk44Or44KS5YWD44Gr5oi744GZXHJcblx0XHRjaHJvbWUudGFicy5zZW5kTWVzc2FnZShOdW1iZXIodGFiLmlkKSwge3R5cGU6ICdiYWNrJ30pO1xyXG5cclxuXHRcdC8vZGF0YVVSTCDljJZcclxuXHRcdHJldHVybiBjYXB0dXJpbmcuY29tcG9zZShzaXplLndpZHRoLCBzaXplLmhlaWdodCk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICog44OV44Kh44Kk44Or5ZCN44KS5rG65a6a44GX44CB44OA44Km44Oz44Ot44O844OJ44KS6KGM44GGXHJcblx0ICogQHBhcmFtIHVybFxyXG5cdCAqIEBwYXJhbSBzZXR0aW5nc1xyXG5cdCAqL1xyXG5cdGNvbnN0IGRvd25sb2FkID0gKHVybDogc3RyaW5nLCBzZXR0aW5nczogU2V0dGluZ3MsIHRhYjogY2hyb21lLnRhYnMuVGFiKSA9PiB7XHJcblx0XHQvL+ODleOCoeOCpOODq+WQjeWkieaPm+eUqOOCr+ODqeOCuVxyXG5cdFx0Y29uc3QgZmlsZW5hbWUgPSBuZXcgRmlsZW5hbWUoKTtcclxuXHJcblx0XHQvL+ODleOCoeOCpOODq+WQjeODhuODs+ODl+ODrOODvOODiOWkieaVsOaWh+Wtl+WIl+eZu+mMslxyXG5cdFx0aWYgKHNldHRpbmdzLnRpdGxlLmluZGV4T2YoJ3t7dGl0bGV9fScpICE9PSAtMSkge1xyXG5cdFx0XHRmaWxlbmFtZS5zZXRUZW1wbGF0ZSgne3t0aXRsZX19JywgZGVjb2RlVVJJQ29tcG9uZW50KFN0cmluZyh0YWIudGl0bGUpKSk7XHJcblx0XHR9XHJcblx0XHRpZiAoc2V0dGluZ3MudGl0bGUuaW5kZXhPZigne3t1cmx9fScpICE9PSAtMSkge1xyXG5cdFx0XHRmaWxlbmFtZS5zZXRUZW1wbGF0ZSgne3t1cmx9fScsIFN0cmluZyh0YWIudXJsKS5yZXBsYWNlKC9odHRwcz86XFwvXFwvLywgJycpKTtcclxuXHRcdH1cclxuXHRcdGlmIChzZXR0aW5ncy50aXRsZS5pbmRleE9mKCd7e2NvdW50ZXJ9fScpICE9PSAtMSkge1xyXG5cdFx0XHRmaWxlbmFtZS5zZXRUZW1wbGF0ZSgne3tjb3VudGVyfX0nLCBTdHJpbmcoc2V0dGluZ3MuY291bnRlcikpO1xyXG5cdFx0XHRzZXR0aW5ncy5jb3VudGVyID0gc2V0dGluZ3MuY291bnRlciArIDE7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly9jb3VudGVyIOioreWumuOBruS/neWtmFxyXG5cdFx0Y2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe2NvdW50ZXI6IHNldHRpbmdzLmNvdW50ZXJ9KTtcclxuXHJcblx0XHQvL+ODgOOCpuODs+ODreODvOODiVxyXG5cdFx0Y2hyb21lLmRvd25sb2Fkcy5kb3dubG9hZCh7dXJsOiB1cmwsIGZpbGVuYW1lOiBmaWxlbmFtZS5nZXRGaWxlTmFtZShzZXR0aW5ncy50aXRsZSkrJy5wbmcnfSk7XHJcblx0fTtcclxuXHJcblx0Ly/jgq3jg6Pjg5fjg4Hjg6Plrp/ooYxcclxuXHRjb25zdCBhY3Rpb24gPSAoKSA9PiB7XHJcblx0XHQvL+OCreODo+ODl+ODgeODo+OBruWIneacn+WMllxyXG5cdFx0Y2FwdHVyaW5nLmluaXQoKTtcclxuXHJcblx0XHQvL+ePvuWcqOihqOekuuOBl+OBpuOBhOOCi+OCv+ODluOBruaDheWgseOCkuWFpeaJi+OBmeOCi1xyXG5cdFx0aW5pdCgpXHJcblx0XHRcdC50aGVuKGRhdGEgPT4ge1xyXG5cdFx0XHRcdGdldERhdGFVUkwoZGF0YS5zZXR0aW5ncywgZGF0YS5pbmZvcm1hdGlvbiwgZGF0YS50YWIpXHJcblx0XHRcdFx0XHQudGhlbigodXJsOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0XHRcdFx0ZG93bmxvYWQodXJsLCBkYXRhLnNldHRpbmdzLCBkYXRhLnRhYik7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHRcdFx0LmNhdGNoKChkYXRhKSA9PiB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0YWxlcnQoJ1NvcnJ5LCBUcnkgYWdhaW4gYWZ0ZXIgcmVsb2FkLicpO1xyXG5cdFx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHQvL+OCouOCpOOCs+ODs+OCr+ODquODg+OCr1xyXG5cdGNocm9tZS5icm93c2VyQWN0aW9uLm9uQ2xpY2tlZC5hZGRMaXN0ZW5lcihhY3Rpb24pO1xyXG59XHJcbiIsImludGVyZmFjZSBDYXB0dXJlVVJMIHtcclxuICB1cmw6IHN0cmluZyxcclxuICB4OiBudW1iZXIsXHJcbiAgeTogbnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBDYXB0dXJpbmcge1xyXG5cclxuICAvL+OCreODo+ODl+ODgeODo+a4iOOBvyBEYXRhVVJMIOOBrumbhuWQiFxyXG4gIHByaXZhdGUgY2FwdHVyZVVSTHM6IENhcHR1cmVVUkxbXSA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiB0YXJnZXQg44GMIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCDjgafjgYLjgovjgYvliKTlrprjgZnjgotcclxuICAgKiDlhbfkvZPnmoTjgavjga8gZHJhd0ltYWdlIOODoeOCveODg+ODieOBjOWtmOWcqOOBmeOCi+OBi+WIpOWumuOBmeOCi1xyXG4gICAqIEBwYXJhbSB0YXJnZXRcclxuICAgKi9cclxuICBwcml2YXRlIF9pc0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCA9ICh0YXJnZXQ6IGFueSk6IHRhcmdldCBpcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgPT4ge1xyXG4gICAgcmV0dXJuIHRhcmdldC5kcmF3SW1hZ2UgIT09IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOOCreODo+ODl+ODgeODo+OBjOikh+aVsOaemuOBguOCi+WgtOWQiOOAgeS4gOeVquWPsyBvciDkuIDnlarkuIvjgavkvY3nva7jgZnjgovnlLvlg4/jga/luqfmqJnjgpLjgrrjg6njgZnlv4XnlKjjgYzjgYLjgovjga7jgafjgZ3jga7lpInmm7TliY3jg7vlvozjga7lgKTjgpLnrpflh7pcclxuICAgKiBjYXB0dXJlVVJMcyDjga7lkITphY3liJflgKTjga4geCDjgYsgeSDjga7kuK3jgYvjgYvjgonmnIDlpKflgKTjgpLmjqLjgZfjgIHjgZ3jga7lgKTjgajlpInmm7TjgZnjgbnjgY3lgKTjgpLov5TjgZlcclxuICAgKiBkb2N1bWVudFNpemUg44GvIHRhcmdldCA9ICd4JyDjgaDjgaPjgZ/jgokgZG9jdW1lbnRXaWR0aCwgdGFyZ2V0ID0gJ3knIOOBoOOBo+OBn+OCiSBkb2N1bWVudEhlaWdodFxyXG4gICAqIEBwYXJhbSB0YXJnZXRcclxuICAgKiBAcGFyYW0gZG9jdW1lbnRTaXplXHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwcml2YXRlIF9nZXROZWVkVG9DaGFuZ2VDb29yZGluYXRlID0gKHRhcmdldDogJ3gnIHwgJ3knLCBkb2N1bWVudFNpemU6IG51bWJlcik6IHtvcmlnaW5hbDogbnVtYmVyLCBjaGFuZ2VkOiBudW1iZXJ9ID0+IHtcclxuICAgIC8vY2FwdHVyZVVSTHMg5YaF44Gu44GuIHRhcmdldCDmnIDlpKflgKRcclxuICAgIGxldCBtYXggPSAwO1xyXG5cclxuICAgIC8vdGFyZ2V0ID0gJ3gnIOOBquOCieeUu+WDj+S4gOaemuOBguOBn+OCiuOBruW5hSwgdGFyZ2V0ID0gJ3knIOOBquOCieeUu+WDj+S4gOaemuOBguOBn+OCiuOBrumrmOOBlVxyXG4gICAgbGV0IHNpemUgPSAwO1xyXG5cclxuICAgIC8v5pyA5aSn5YCk5qSc57SiXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0gdGhpcy5jYXB0dXJlVVJMcy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkgPSAoaSArIDEpIHwgMCkge1xyXG4gICAgICBpZiAodGhpcy5jYXB0dXJlVVJMc1tpXVt0YXJnZXRdIDw9IG1heCkge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvL+eUu+WDj+S4gOaemuOBguOBn+OCiuOBruWkp+OBjeOBleOCkueul+WHulxyXG4gICAgICBzaXplID0gdGhpcy5jYXB0dXJlVVJMc1tpXVt0YXJnZXRdIC0gbWF4O1xyXG5cclxuICAgICAgLy/mnIDlpKflgKTjga7mm7TmlrBcclxuICAgICAgbWF4ID0gdGhpcy5jYXB0dXJlVVJMc1tpXVt0YXJnZXRdO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pyA5aSn5YCkIC8gZG9jdW1lbnRTaXplIOOBruS9meOCiuOCkuW8leOBj1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgb3JpZ2luYWw6IG1heCxcclxuICAgICAgY2hhbmdlZDogc2l6ZSA9PT0gMCB8fCBtYXggPT09IDAgPyBtYXggOiBtYXggLSAoc2l6ZSAtIGRvY3VtZW50U2l6ZSAlIHNpemUpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjYXB0dXJlVVJMcyDjga7kuIDnlarlj7Mgb3Ig5LiA55Wq5LiL44Gr5L2N572u44GZ44KL55S75YOP5bqn5qiZ44KS5pW05b2i44GX44Gm6L+U44GZXHJcbiAgICogQHBhcmFtIHdpZHRoXHJcbiAgICogQHBhcmFtIGhlaWdodFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZ2V0Q2FwdHVyZVVSTHNTaGFwZWRDb29yZGluYXRlcyA9ICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IENhcHR1cmVVUkxbXSA9PiB7XHJcbiAgICAvL+OBk+OBrumWouaVsOOBjOi/lOOBmeWApFxyXG4gICAgbGV0IHJlc3VsdHM6IENhcHR1cmVVUkxbXSA9IFtdO1xyXG5cclxuICAgIC8veCDluqfmqJnjgaggeSDluqfmqJnjgZ3jgozjgZ7jgozjga7lpInmm7TjgZnjgbnjgY3luqfmqJnjgpLnrpflh7pcclxuICAgIGNvbnN0IGNoYW5nZVggPSB0aGlzLl9nZXROZWVkVG9DaGFuZ2VDb29yZGluYXRlKCd4Jywgd2lkdGgpO1xyXG4gICAgY29uc3QgY2hhbmdlWSA9IHRoaXMuX2dldE5lZWRUb0NoYW5nZUNvb3JkaW5hdGUoJ3knLCBoZWlnaHQpO1xyXG5cclxuICAgIC8vY2FwdHVyZVVSTHMg44KS5pW05b2i44GX44Gk44GkIHJlc3VsdHMg44G444Kz44OU44O8XHJcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gdGhpcy5jYXB0dXJlVVJMcy5sZW5ndGg7IGkgPCBtYXg7IGkgPSAoaSArIDEpIHwgMCkge1xyXG4gICAgICAvL+OCs+ODlOODvFxyXG4gICAgICByZXN1bHRzW2ldID0gdGhpcy5jYXB0dXJlVVJMc1tpXTtcclxuXHJcbiAgICAgIC8veCDluqfmqJnjga7mlbTlvaJcclxuICAgICAgaWYgKHJlc3VsdHNbaV0ueCA9PT0gY2hhbmdlWC5vcmlnaW5hbCkge1xyXG4gICAgICAgIHJlc3VsdHNbaV0ueCA9IGNoYW5nZVguY2hhbmdlZDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy95IOW6p+aomeOBruaVtOW9olxyXG4gICAgICBpZiAocmVzdWx0c1tpXS55ID09PSBjaGFuZ2VZLm9yaWdpbmFsKSB7XHJcbiAgICAgICAgcmVzdWx0c1tpXS55ID0gY2hhbmdlWS5jaGFuZ2VkO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/ov5TjgZlcclxuICAgIHJldHVybiByZXN1bHRzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog54++5ZyoIGNhcHR1cmVVUkxzIOOBq+iqreOBv+i+vOOBvuOCjOOBpuOBhOOCi+ODh+ODvOOCv+OCkuOCq+ODs+ODkOOCueOBq+iqreOBv+i+vOOBv+OAgeWQiOaIkOOAgeODiOODquODn+ODs+OCsOOBmeOCi1xyXG4gICAqIOacgOe1gueahOOBq+WQkOOBjeWHuuOBleOCjOOCi+eUu+WDj+OBruWkp+OBjeOBleOBryB3aWR0aCAqIGhlaWdodCDjgajjgarjgotcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqL1xyXG4gIHB1YmxpYyBjb21wb3NlID0gYXN5bmMgKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcclxuICAgIC8v44Kr44Oz44OQ44K544Gu5L2c5oiQXHJcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuXHJcbiAgICAvL+OCq+ODs+ODkOOCueOBruWkp+OBjeOBleOCkuioreWumlxyXG4gICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3aWR0aCsncHgnKTtcclxuICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGhlaWdodCsncHgnKTtcclxuXHJcbiAgICAvLzJEIOOCs+ODs+ODhuOCreOCueODiOOCkuWPluW+l1xyXG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG4gICAgLy9jdHgg44Gu44K/44Kk44OX44Ks44O844OJXHJcbiAgICBpZiAoICEgdGhpcy5faXNDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQoY3R4KSlcclxuICAgIHtcclxuICAgICAgcmV0dXJuICcnO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5bqn5qiZ5pW05b2i5b6M44GuIGNhcHR1cmVVUkxcclxuICAgIGNvbnN0IGNoYW5nZWRDYXB0dXJlVVJMcyA9IHRoaXMuX2dldENhcHR1cmVVUkxzU2hhcGVkQ29vcmRpbmF0ZXMod2lkdGgsIGhlaWdodCk7XHJcblxyXG4gICAgLy/jgqvjg7Pjg5DjgrnjgavnlLvlg4/jgpLoqK3nva5cclxuICAgIGF3YWl0IGNoYW5nZWRDYXB0dXJlVVJMcy5yZWR1Y2UoKHByZXYsIGN1cnJlbnQpID0+IHByZXYudGhlbigoKSA9PiB7XHJcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIGN1cnJlbnQueCwgY3VycmVudC55KTtcclxuICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGltYWdlLnNyYyA9IGN1cnJlbnQudXJsO1xyXG4gICAgICB9KTtcclxuICAgIH0pLCBQcm9taXNlLnJlc29sdmUoKSk7XHJcblxyXG4gICAgLy9kYXRhVVJMIOOCkueUn+aIkFxyXG4gICAgY29uc3QgZGF0YSA9IGNhbnZhcy50b0RhdGFVUkwoKTtcclxuXHJcbiAgICAvL2NhbnZhcyDjgpLmtojjgZlcclxuICAgIGNhbnZhcy5yZW1vdmUoKTtcclxuXHJcbiAgICAvL2RhdGFVUkwg44KS6L+U44GZXHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiDjgq3jg6Pjg5fjg4Hjg6PjgpLlj5blvpfjgZfjgIFjYXB0dXJlVVJMcyDjgasgcHVzaCDjgZnjgotcclxuICAgKiBAcGFyYW0geFxyXG4gICAqIEBwYXJhbSB5XHJcbiAgICogQHByaXZhdGVcclxuICAgKi9cclxuICBwdWJsaWMgY2FwdHVyZSh4OiBudW1iZXIsIHk6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgICBjaHJvbWUudGFicy5jYXB0dXJlVmlzaWJsZVRhYigodXJsKSA9PiB7XHJcbiAgICAgICAgdGhpcy5jYXB0dXJlVVJMcy5wdXNoKHt4LCB5LCB1cmx9KTtcclxuICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBjYXB0dXJlVVJMcyDjgpLnqbrjgavjgZnjgotcclxuICAgKi9cclxuICBwdWJsaWMgaW5pdCgpIHtcclxuICAgIHRoaXMuY2FwdHVyZVVSTHMgPSBbXTtcclxuICB9XHJcblxyXG59XHJcbiIsIi8qKlxyXG4gKiDjg5XjgqHjgqTjg6vjg43jg7zjg6DkvZzmiJDjgq/jg6njgrlcclxuICovXHJcbmltcG9ydCB7VGVtcGxhdGVzfSBmcm9tIFwiLi9pbnRlcmZhY2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGaWxlbmFtZSB7XHJcblxyXG4gIC8qKlxyXG4gICAqIOe9ruOBjeaPm+OBiOWumue+qVxyXG4gICAqL1xyXG4gIHByaXZhdGUgdGVtcGxhdGVzOiBUZW1wbGF0ZXM7XHJcblxyXG4gIC8qKlxyXG4gICAqIOODleOCoeOCpOODq+WQjeOBq+S9v+eUqOOBp+OBjeOBquOBhOaWh+Wtl+OCkuWFqOOBpiByZXBsYWNlbWVudCDjgavnva7mj5vjgZfjgabov5TjgZlcclxuICAgKiBAcGFyYW0gc3RyaW5nXHJcbiAgICogQHBhcmFtIHJlcGxhY2VtZW50XHJcbiAgICogQHJldHVybiB7c3RyaW5nfVxyXG4gICAqIEBwcml2YXRlXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcmVwbGFjZUJhZENoYXJhY3RlcihzdHJpbmc6IHN0cmluZywgcmVwbGFjZW1lbnQ6IHN0cmluZyA9ICdfJykge1xyXG4gICAgcmV0dXJuIFN0cmluZyhzdHJpbmcpLnJlcGxhY2UoL1tcXFxcXFwvOlxcKlxcP1wiPD5cXC1cXHxcXHNdKy9nLCByZXBsYWNlbWVudCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiB0aGlzLnRlbXBsYXRlcyDjga7lrprnvqlcclxuICAgKi9cclxuICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnRlbXBsYXRlcyA9IG5ldyBBcnJheSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog44OG44Oz44OX44Os44O844OI5aSJ5pWw5paH5a2X5YiX44Go44Gd44Gu5YCk44KS6Kit5a6a44GZ44KLXHJcbiAgICogQHBhcmFtIHRlbXBsYXRlXHJcbiAgICogQHBhcmFtIHZhbHVlXHJcbiAgICovXHJcbiAgcHVibGljIHNldFRlbXBsYXRlKHRlbXBsYXRlOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMudGVtcGxhdGVzLnB1c2goe1xyXG4gICAgICB0ZW1wbGF0ZTogU3RyaW5nKHRlbXBsYXRlKSxcclxuICAgICAgdmFsdWU6IFN0cmluZyh2YWx1ZSlcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogc2V0VGVtcGxhdGUoKSwgX3JlcGxhY2VCYWRDaGFyYWN0ZXIoKSDjgaflpInmj5vjgZfjgZ/jg5XjgqHjgqTjg6vlkI3jgpLlh7rliptcclxuICAgKiBAcGFyYW0gbmFtZVxyXG4gICAqIEByZXR1cm4ge3N0cmluZ31cclxuICAgKi9cclxuICBwdWJsaWMgZ2V0RmlsZU5hbWUobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIC8v44OG44Oz44OX44Os44O844OI5aSJ5pWw5paH5a2X5YiX44KS5YCk44Gr572u44GN5o+b44GI44KLXHJcbiAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gdGhpcy50ZW1wbGF0ZXMubGVuZ3RoOyBpIDwgbWF4OyBpID0gKGkgKyAxKSB8IDApIHtcclxuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKS5yZXBsYWNlKG5ldyBSZWdFeHAodGhpcy50ZW1wbGF0ZXNbaV0udGVtcGxhdGUsICdnJyksIHRoaXMudGVtcGxhdGVzW2ldLnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S9v+eUqOS4jeWPr+OBruaWh+Wtl+OCkuWFqOOBpue9ruOBjeaPm+OBiOOBpui/lOWNtFxyXG4gICAgcmV0dXJuIHRoaXMuX3JlcGxhY2VCYWRDaGFyYWN0ZXIobmFtZSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9