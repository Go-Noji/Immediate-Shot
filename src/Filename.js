/**
 * ファイルネーム作成クラス
 */
export class Filename {

  /**
   * ファイル名に使用できない文字を全て replacement に置換して返す
   * @param string
   * @param replacement
   * @return {string}
   * @private
   */
  _replaceBadCharacter(string, replacement = '_') {
    return String(string).replace(/\\\/:\*\?"<>\|/g, String(replacement));
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
