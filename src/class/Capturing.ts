interface CaptureURL {
  url: string,
  x: number,
  y: number
}

export class Capturing {

  //キャプチャ済み DataURL の集合
  private captureURLs: CaptureURL[] = [];

  /**
   * target が CanvasRenderingContext2D であるか判定する
   * 具体的には drawImage メソッドが存在するか判定する
   * @param target
   */
  private _isCanvasRenderingContext2D = (target: any): target is CanvasRenderingContext2D => {
    return target.drawImage !== undefined;
  }

  /**
   * 現在 captureURLs に読み込まれているデータをカンバスに読み込み、合成、トリミングする
   * 最終的に吐き出される画像の大きさは width * height となる
   * @private
   */
  public compose = async (width: number, height: number): Promise<string> => {
    //カンバスの作成
    const canvas = document.createElement('canvas');

    //カンバスの大きさを設定
    canvas.setAttribute('width', width+'px');
    canvas.setAttribute('height', height+'px');

    //2D コンテキストを取得
    const ctx = canvas.getContext('2d');

    //ctx のタイプガード
    if ( ! this._isCanvasRenderingContext2D(ctx))
    {
      return '';
    }

    //カンバスに画像を設置
    await this.captureURLs.reduce((prev, current) => prev.then(() => {
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
  };

  /**
   * キャプチャを取得し、captureURLs に push する
   * @param x
   * @param y
   * @private
   */
  public capture(x: number, y: number): Promise<void> {
    return new Promise(resolve => {
      chrome.tabs.captureVisibleTab((url) => {
        this.captureURLs.push({x, y, url});
        resolve();
      });
    });
  }

  /**
   * captureURLs を空にする
   */
  public init() {
    this.captureURLs = [];
  }

}
