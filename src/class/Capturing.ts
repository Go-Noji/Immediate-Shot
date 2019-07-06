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
   * キャプチャが複数枚ある場合、一番右 or 一番下に位置する画像は座標をズラす必用があるのでその変更前・後の値を算出
   * captureURLs の各配列値の x か y の中かから最大値を探し、その値と変更すべき値を返す
   * documentSize は target = 'x' だったら documentWidth, target = 'y' だったら documentHeight
   * @param target
   * @param documentSize
   * @private
   */
  private _getNeedToChangeCoordinate = (target: 'x' | 'y', documentSize: number): {original: number, changed: number} => {
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
    }
  }

  /**
   * captureURLs の一番右 or 一番下に位置する画像座標を整形して返す
   * @param width
   * @param height
   * @private
   */
  private _getCaptureURLsShapedCoordinates = (width: number, height: number): CaptureURL[] => {
    //この関数が返す値
    let results: CaptureURL[] = [];

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

    //座標整形後の captureURL
    const changedCaptureURLs = this._getCaptureURLsShapedCoordinates(width, height);

    //カンバスに画像を設置
    await changedCaptureURLs.reduce((prev, current) => prev.then(() => {
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
