/**
 * ファイルネーム作成クラス
 */
import {Templates} from "./interface";

export class Filename {

  /**
   * 置き換え定義
   */
  private templates: Templates;

  /**
   * ファイル名に使用できない文字を全て replacement に置換して返す
   * @param string
   * @param replacement
   * @return {string}
   * @private
   */
  private _replaceBadCharacter(string: string, replacement: string = '_') {
    return String(string).replace(/\\\/:\*\?"<>\|/g, String(replacement));
  }

  /**
   * this.templates の定義
   */
  public constructor() {
    this.templates = new Array();
  }

  /**
   * テンプレート変数文字列とその値を設定する
   * @param template
   * @param value
   */
  public setTemplate(template: string, value: string) {
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
  public getFileName(name: string): string {
    //テンプレート変数文字列を値に置き換える
    for (let i = 0, max = this.templates.length; i < max; i = (i + 1) | 0) {
      name = String(name).replace(new RegExp(this.templates[i].template, 'g'), this.templates[i].value);
    }

    //使用不可の文字を全て置き換えて返却
    return this._replaceBadCharacter(name);
  }

}
