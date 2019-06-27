import {Queries} from "./Queries";
import {Filename} from "./Filename";

document.addEventListener('DOMContentLoaded', () => {
  //クエリ文字列パース用クラス
  const queries = new Queries();

  //現在のクエリ情報を取得
  const query = queries.getHistory();

  //ウィンドウを閉じるための処理
  window.opener = window;

  //src キーに値が存在すればそれをダウンロード
  if (query.queries.src) {
    //現在の設定を取得
    chrome.storage.sync.get({
      range: 'full',
      title: '{{title}}',
      counter: 0
    }, function(items) {
      //ファイル名変換用クラス
      const filename = new Filename();

      //ファイル名テンプレート変数文字列登録
      if (items.title.indexOf('{{title}}') !== -1) {
        filename.setTemplate('{{title}}', decodeURIComponent(query.queries.title));
      }
      if (items.title.indexOf('{{url}}') !== -1) {
        filename.setTemplate('{{url}}', query.queries.url.replace(/https?:\/\//, ''));
      }
      if (items.title.indexOf('{{counter}}') !== -1) {
        filename.setTemplate('{{counter}}', items.counter);
        items.counter = items.counter + 1;
      }

      //ダウンロードのための a タグを作成
      const link = document.createElement('a');

      //a タグに download 属性をセット
      link.setAttribute('download', filename.getFileName(items.title)+'.png');

      //リンク先に src の値を仕込む
      link.setAttribute('href', query.queries.src);

      //クリックイベントを発火
      link.dispatchEvent(new MouseEvent('click'));

      //counter のインクリメント
      chrome.storage.sync.set({counter: items.counter}, () => {
        window.close();
      });
    });
  }
  else {
    //ウィンドウを閉じる
    window.close();
  }
});
