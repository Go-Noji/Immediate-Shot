import {Coordinates, Information} from "src/class/interface";

export class Sizing {

  //constructor() 時点の window width
  readonly windowWidth: number;

  //constructor() 時点の window height
  readonly windowHeight: number;

  //constructor() 時点の document width
  readonly documentWidth: number;

  //constructor() 時点の document height
  readonly documentHeight: number;

  //画面縮小比率
  readonly ratio: number;

  //画面を幅と高さのどちらで縮小したか
  readonly ratioType: 'width' | 'height';

  //documentWidth を現在の windowWidth の大きさでキャプチャするには横に何枚キャプチャが必要か
  readonly widthCaptureNumber: number;

  //documentHeight を現在の windowHeight の大きさでキャプチャするには縦に何枚キャプチャが必要か
  readonly heightCaptureNumber: number;

  //上記二つの乗算値
  readonly captureNumber: number;

  //constructor() 時点のスクロール位置(横)
  readonly scrollX: number;

  //constructor() 時点のスクロール位置(縦)
  readonly scrollY: number;

  //このクラスが扱う <style> タグの id 属性値
  readonly STYLE_ID: string;

  /**
   * このクラスが仕込んだ style タグを削除する
   * @private
   */
  private _removeStyle() {
    //削除対象の取得
    const target = document.getElementById(this.STYLE_ID);

    //target が存在しなかったら何もしない
    if (target === null) {
      return;
    }

    //対象を削除する
    target.remove();
  }

  /**
   * style タグを挿入する
   * 既にこのクラスが扱っている style が存在した場合はリセットする
   * @param style
   * @private
   */
  private _appendStyle(style: string) {
    //リセット
    this._removeStyle();

    //style タグを用意
    const tag = document.createElement('style');
    tag.setAttribute('id', this.STYLE_ID);
    tag.innerText = style;

    //tag タグ挿入
    document.head.appendChild(tag);
  }

  /**
   * 指定された index からスクロールすべき座標を返す
   * @param index
   * @private
   */
  private _getScrollCoordinates(index: number): Coordinates {
    return {
      x: Math.floor(index % this.widthCaptureNumber) % this.captureNumber * this.windowWidth,
      y: Math.floor(index / this.widthCaptureNumber) % this.captureNumber * this.windowHeight
    };
  }

  /**
   * 各サイズ情報を取得・計算・保持する
   * 加えて必用な定数も保管する
   */
  public constructor() {
    //ウィンドウサイズ
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    //ドキュメントサイズ
    this.documentWidth = Math.max(...[document.body.clientWidth, document.body.scrollWidth, document.documentElement.scrollWidth, document.documentElement.clientWidth]);
    this.documentHeight = Math.max(...[document.body.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.documentElement.clientHeight]);

    //幅と高さそれぞれの割合
    const widthRatio = this.windowWidth / this.documentWidth;
    const heightRatio = this.windowHeight / this.documentHeight;

    //ratio と ratioType のセット
    this.ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
    this.ratioType = widthRatio > heightRatio ? 'height' : 'width';

    //ratio が 1 以上だったら 1 とする
    this.ratio = this.ratio > 1 ? 1 : this.ratio;

    //縦と横においてそれぞれ現在のウィンドウサイズ何枚分で全画面を捕捉できるかの数値を算出
    this.widthCaptureNumber = Math.ceil(this.documentWidth / this.windowWidth);
    this.heightCaptureNumber = Math.ceil(this.documentHeight / this.windowHeight);

    //上記二つの乗算値
    this.captureNumber = this.widthCaptureNumber * this.heightCaptureNumber;

    //現在のスクロール座標を記録
    this.scrollX = window.scrollX;
    this.scrollY = window.scrollY;

    //style タグに使用する id
    this.STYLE_ID = 'sizing_'+Math.random().toString(36).slice(-8);
  }

  /**
   * 情報を返す
   * @return {{documentWidth: number | *, documentHeight: number | *, windowHeight: number | *, ratioType: string, windowWidth: number | *, ratio: (*|number)}}
   */
  public getInformation(): Information {
    return {
      windowWidth: this.windowWidth,
      windowHeight: this.windowHeight,
      documentWidth: this.documentWidth,
      documentHeight: this.documentHeight,
      widthCaptureNumber: this.widthCaptureNumber,
      heightCaptureNumber: this.heightCaptureNumber,
      captureNumber: this.captureNumber,
      ratio: this.ratio,
      ratioType: this.ratioType
    }
  }

  /**
   * フルサイズ用のサイジング処理を行う
   */
  public fullSizing(): Coordinates {
    //style タグを生成
    this._appendStyle('body{overflow:hidden;transform-origin: left top;transform: scale('+this.ratio+')}');

    //スクロール位置を 0 にする
    window.scrollTo(0, 0);

    //0, 0 を返す
    return {
      x: 0,
      y: 0
    };
  }

  /**
   * スクロールバーを消すだけのサイジング処理を行う
   * スクロール位置は index 番号で指定する
   * この index 番号は getInformation() で取得できる captureNumber の範囲で指定し、
   * 例えば
   * widthCaptureNumber = 4
   * heightCaptureNumber = 3
   * captureNumber = 12
   * だった場合は
   * +----+----+----+----+
   * |  0  |  1  |  2  |  3  |
   * +----+----+----+----+
   * |  4  |  5  |  6  |  7  |
   * +----+----+----+----+
   * |  8  |  9  | 10 | 11 |
   * +----+----+----+----+
   * といった各マスの左上座標へスクロールすることになる
   * 各マスの width, height = windowWidth, windowHeight
   * 大枠の width, height = documentWidth, documentHeight
   */
  public displaySizing(index: number|null = null): Coordinates {
    //style タグを生成
    this._appendStyle('html{overflow:hidden}');

    //移動先座標の定義
    let coordinates: Coordinates = {
      x: 0,
      y: 0
    };

    //スクロール指定があればその座標で coordinates を上書き
    if (index !== null) {
      coordinates = this._getScrollCoordinates(index);
    }

    //スクロールの実行
    document.getElementsByTagName('html')[0].scrollTo(coordinates.x, coordinates.y);

    //スクロール情報を返す
    return coordinates;
  }

  /**
   * サイジングのリセット
   * スクロール位置もリセットする
   */
  public resetSizing(): Coordinates {
    //style のリセット
    this._removeStyle();

    //スクロール位置のリセット
    window.scrollTo(this.scrollX, this.scrollY);

    //スクロール位置を返す
    return {
      x: this.scrollX,
      y: this.scrollY
    };
  }

}
