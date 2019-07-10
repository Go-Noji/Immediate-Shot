export class FindStyle {

  /**
   * constructor で挿入する HTMLElement
   * この要素にぶら下がっている DOM ツリーが対象
   */
  readonly root: HTMLElement;

  /**
   * root 下の全 HTMLElement
   * 階層楮は無く、一次元配列として捕捉
   */
  private elements: HTMLElement[];

  /**
   * target が null でないことを保証する Type guard
   * HTMLElement.children から取ってきたオブジェクトに対して用いる
   * @param target
   * @private
   */
  private _isHTMLElement(target: any): target is HTMLElement {
    return  target !== null;
  }

  /**
   * parent 下にぶら下がる DOM ツリーを再帰的に取得し、this.elements に追加する
   * @param parent
   * @private
   */
  private _findChildren(parent: HTMLElement) {
    //自身をpush
    this.elements.push(parent);

    //子要素の取得
    const children = parent.children;

    for (let i = 0, max = children.length; i < max; i = (i + 1) | 0) {
      //タイプガードを通すため、一旦変数へ格納
      const target = children.item(i);

      //target が null でないことを保証
      if ( ! this._isHTMLElement(target)) {
        continue;
      }

      //再帰的にこの関数を呼ぶ
      this._findChildren(target);
    }
  }

  /**
   * ドキュメントルートを確保し、検索対象の要素を捕捉する
   * @param root
   */
  constructor(root: HTMLElement) {
    //検索対象ツリーの親要素を登録
    this.root = root;

    //検索結果配列を初期化
    this.elements = new Array();

    //検索開始
    this._findChildren(root);
  }

  /**
   * css として property: value が適用されている要素を this.elements から取得する
   * @param property
   * @param value
   */
  public find(property: string, value: string): HTMLElement[] {
    //このメソッドが返す配列の用意
    let result = new Array();

    //捕捉済みの要素を逐一検索
    for (let i = 0, max = this.elements.length; i < max; i = (i + 1) | 0) {
      //計算済み css が合致していなかったらスルー
      if (window.getComputedStyle(this.elements[i]).getPropertyValue(property) !== value) {
        continue;
      }

      //該当要素として検索結果配列に追加
      result.push(this.elements[i]);
    }

    //該当要素を返す
    return result;
  }

}
