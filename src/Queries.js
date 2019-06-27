/**
 * URL 履歴を取りため、クエリ文字列を扱いやすいようにパースするクラス
 */
export class Queries {

  /**
   * 渡されたクエリ文字列をパースしてキー:バリューの形にする
   * url そのままを渡してもクエリ部分だけを渡しても動作する
   * @param string
   * @return Object
   * @private
   */
  _parseQueries(string) {
    //このメソッドが返すオブジェクト
    let queries = {};

    //? が含まれていたらそれより前を削除
    if (string.indexOf('?') !== -1) {
      string = string.slice(string.indexOf('?') + 1);
    }

    //& で分割
    const splits = string.split('&');

    //splits が空だったらこの時点で空オブジェクトを返す
    if (splits.length === 0) {
      return queries;
    }

    //& で区切られた文字列ごとに queries を加えていくためのループ
    for (let i = 0, max = splits.length; i< max; i = (i + 1) | 0) {
      //= で分割
      const keyAndValue = splits[i].split('=');

      //もし = が含まれていない or = の先(値部分)が存在しなかったら true を挿入
      queries[keyAndValue[0]] =
        keyAndValue[1] === undefined || keyAndValue[1] === ''
          ? true
          : keyAndValue[1];
    }

    //返却
    return  queries;
  }

  /**
   * this.histories 内で最新の一項目を返す
   * 何も存在しない場合は undefined を返す
   * @return {Object}
   * @private
   */
  _getLatestHistory() {
    return this.histories[Math.max(...Object.keys(this.histories).map(value => Number(value)))];
  }

  /**
   * this.histories に url を新たにセットする
   * url が空文字(デフォルト)の場合は現在の window.location.href をセットする
   * this.histories に既に、現在時刻とミリ秒単位で一致する値が存在する
   * もしくは最新の URL  がセットしようとしている URL と一致している場合はなにもしない
   * @param url
   * @private
   */
  _addHistory(url = '') {
    //url が空文字だったらこの時点での window.location.href をセットする
    url = url === ''
      ? window.location.href
      : url;

    //現在のタイムスタンプ(ミリ秒)
    const time  = new Date().getTime();

    //最新履歴
    const lastHistory = this._getLatestHistory();

    //タイムスタンプと最新の URL のどちらかが一致していたらなにもしない
    if (this.histories[time] !== undefined || (lastHistory !== undefined && lastHistory.url === url)) {
      return;
    }

    //クエリをパースしたオブジェクトを用意
    const queries = this._parseQueries(url);

    //現在のタイムスタンプ(ミリ秒単位)に url をセット
    this.histories[new Date().getTime()] = {url, queries};
  }

  /**
   * histories の設定
   */
  constructor() {
    //タイムスタンプ: {url: string, queries{string: string, ...}} の形で保存される
    this.histories = {};

    //この時点の履歴を記録しておく
    this._addHistory();
  }

  /**
   * histories を返す
   * @return {{}|*}
   */
  getHistories() {
    return this.histories;
  }

  /**
   * this.histories 最新データをひとつぶん返す
   * 内部的には this._getLatestHistory() と同義
   * @param timestamp
   * @return {Object}
   */
  getHistory() {
    return this._getLatestHistory();
  }

  /**
   * 履歴データを一つ増やす
   * 内部的には this._addHistory(url) と同義
   * @param url
   */
  setHistory(url = '') {
    this._addHistory(url);
  }

}
