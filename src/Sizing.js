export class Sizing {

  /**
   * このクラスが仕込んだスタイルが存在するか判定
   * @return {boolean}
   * @private
   */
  _isStyle() {
    //対象の選定
    const target = document.getElementById(this.STYLE_ID);

    //対象が存在するか判定
    return target !== null;
  }

  /**
   * このクラスが仕込んだ style タグを削除する
   * @private
   */
  _removeStyle() {
    if ( ! this._isStyle()) {
      return;
    }

    //対象を削除する
    document.getElementById(this.STYLE_ID).remove();
  }

  /**
   * style タグを挿入する
   * 既にこのクラスが扱っている style が存在した場合はリセットする
   * @param style
   * @private
   */
  _appendStyle(style) {
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
   * 各サイズ情報を取得・計算・保持する
   * 加えて必用な定数も保管する
   */
  constructor() {
    //ウィンドウサイズ
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    //ドキュメントサイズ
    this.documentWidth = document.body.getBoundingClientRect().width;
    this.documentHeight = document.body.getBoundingClientRect().height;

    //幅と高さそれぞれの割合
    const widthRatio = this.windowWidth / this.documentWidth;
    const heightRatio = this.windowHeight / this.documentHeight;

    //一旦幅の方をより小さい割合とする
    let ratio = widthRatio;
    let ratioType = 'width';

    //高さの方が小さい割合だったら上記二つの変数を書き換える
    if (widthRatio > heightRatio) {
      ratio = heightRatio;
      ratioType = 'height';
    }

    //ratio が 1 以上だったら 1 とする
    this.ratio = ratio > 1 ? 1 : Number(ratio);

    //縦と横においてそれぞれ現在のウィンドウサイズ何枚分で全画面を捕捉できるかの数値を算出
    this.widthCaptureNumber = Math.ceil(this.documentWidth / this.windowWidth);
    this.heightCaptureNumber = Math.ceil(this.documentHeight / this.windowHeight);

    //上記二つの乗算値
    this.captureNumber = this.widthCaptureNumber * this.heightCaptureNumber;

    //二つの変数をセット
    this.ratio = ratio;
    this.ratioType = ratioType;

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
  getInformation() {
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
  fullSizing() {
    //style タグを生成
    this._appendStyle('body,html{overflow:hidden}html{transform-origin: left top;transform: scale('+this.ratio+')}');

    //スクロール位置を 0 にする
    window.scrollTo(0, 0);
  }

  /**
   * スクロールバーを消すだけのサイジング処理を行う
   */
  standardSizing(scrollIndex = null) {
    //style タグを生成
    this._appendStyle('body,html{overflow:hidden}');

    //スクロール指定があればその位置までスクロール
    if (scrollIndex !== null) {
      window.scrollTo(Math.floor(scrollIndex % this.widthCaptureNumber) % this.captureNumber * this.windowWidth, Math.floor(scrollIndex / this.widthCaptureNumber) % this.captureNumber * this.windowHeight);
    }
  }

  /**
   * サイジングのリセット
   * スクロール位置もリセットする
   */
  resetSizing() {
    //style のリセット
    this._removeStyle();

    //スクロール位置のリセット
    window.scrollTo(this.scrollX, this.scrollY);
  }

}
