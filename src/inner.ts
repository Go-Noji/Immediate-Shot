import {Queries} from "./class/Queries";
import {Filename} from "./class/Filename";

document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.sendMessage({type: 'open'}, (response) => {
    //空文字が返ってきたら何もしない
    if (response.src === '') {
      window.close();
      return;
    }

    //クエリ文字列パース用クラス
    const queries = new Queries();

    //現在のクエリ情報を取得
    const query = queries.getHistory();

    //ウィンドウを閉じるための処理
    window.opener = window;

    //src キーに値が存在すればそれをダウンロード
    chrome.storage.sync.get({
      range: 'full',
      title: '{{title}}',
      counter: 0
    }, (items: {[key: string]: string}) => {
      //ファイル名変換用クラス
      const filename = new Filename();

      //ファイル名テンプレート変数文字列登録
      if (typeof query.queries.title === 'string' && items.title.indexOf('{{title}}') !== -1) {
        filename.setTemplate('{{title}}', decodeURIComponent(query.queries.title));
      }
      if (typeof query.queries.url === 'string' && items.title.indexOf('{{url}}') !== -1) {
        filename.setTemplate('{{url}}', query.queries.url.replace(/https?:\/\//, ''));
      }
      if (items.title.indexOf('{{counter}}') !== -1) {
        filename.setTemplate('{{counter}}', String(items.counter));
        items.counter = items.counter + 1;
      }

      //ダウンロード
      chrome.downloads.download({
        url: response.src,
        filename: filename.getFileName(items.title)+'.png'
      }, () => {
        window.close();
      });
    });
  });
});
