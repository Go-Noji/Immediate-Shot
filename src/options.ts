import {DEFAULT_COUNTER, DEFAULT_INTERVAL, DEFAULT_MAX, DEFAULT_RANGE, DEFAULT_TITLE} from "./config";

//設定項目
//range: 'full' か 'display', 'perfect'.  デフォルト値は 'full'
//title: ダウンロードするファイル名が, ここに仕込んだ文字列+'.png' になる テンプレート変数を入れることも可能 デフォルトは {{title}}
//counter: 上記 title に {{counter}} で仕込めるカウンターの数値
//interval: キャプチャ間のミリ秒
//max: true に設定してあると画面の幅・高さを取得する時に全要素をチェックする
//テンプレート変数
//{{title}}: タイトルタグの内容
//{{url}}: url の内容
//{{counter}}: counter の内容
{
  /**
   * target は value 値を持っているか判定
   * @param target
   */
  const isHTMLInputElement = (target: any): target is HTMLInputElement => {
    return target !== null && target.value !== undefined;
  };

  /**
   * target はラジオボタンか判定
   * @param target
   */
  const isHTMLRadioInputElement = (target: any): target is HTMLInputElement  => {
    return target !== null && target.type === 'radio' && target.checked !== undefined;
  };

  /**
   * target はチェックボックスか判定
   * @param target
   */
  const isHTMLCheckboxInputElement = (target: any): target is HTMLInputElement  => {
    return target !== null && target.type === 'checkbox' && target.checked !== undefined;
  };

  /**
   * id 属性が id の要素が持つ value 値を返す
   * value 値が存在しなかった場合は空文字を返す
   * @param id
   */
  const getValue = (id: string): string => {
    //id で捕捉
    const target = document.getElementById(id);

    //DOM が入力欄でなかったら空文字を返す
    if ( ! isHTMLInputElement(target)) {
      return '';
    }

    //value をそのまま返す
    return target.value;
  };

  /**
   * id 属性が id の要素が持つ value 属性を value にする
   * @param id
   * @param value
   */
  const setValue = (id: string, value: string) => {
    //id で捕捉
    const target = document.getElementById(id);

    //DOM が入力欄でなかったらなにもしない
    if ( ! isHTMLInputElement(target)) {
      return;
    }

    //セット
    target.value = value;
  };

  /**
   * id 属性が id の要素がラジオボタンかつ、チェックされているか判定
   * @param id
   */
  const isCheckedRadio = (id: string): boolean => {
    //id で捕捉
    const target = document.getElementById(id);

    //DOM がラジオボタンでなかったら失敗
    if ( ! isHTMLRadioInputElement(target)) {
      return false;
    }

    //checked をそのまま返す
    return target.checked;
  };

  /**
   * id 属性が id の要素がラジオボタンをチェック状態にする
   * @param id
   */
  const setCheckedRadio = (id: string) => {
    //id で捕捉
    const target = document.getElementById(id);

    //DOM がラジオボタンでなかったらなにもしない
    if ( ! isHTMLRadioInputElement(target)) {
      return false;
    }

    //チェック
    target.checked = true;
  };

  /**
   * id 属性が id の要素がチェックボックスかつ、チェックされているか判定
   * @param id
   */
  const isCheckedCheckbox = (id: string): boolean => {
    //id で捕捉
    const target = document.getElementById(id);

    //DOM がラジオボタンでなかったら失敗
    if ( ! isHTMLCheckboxInputElement(target)) {
      return false;
    }

    //checked をそのまま返す
    return target.checked;
  };

  /**
   * id 属性が id のチェックボックス要素をチェック状態にする
   * @param id
   */
  const setCheckedCheckbox = (id: string, checked: boolean = true) => {
    //id で捕捉
    const target = document.getElementById(id);

    //DOM がラジオボタンでなかったらなにもしない
    if ( ! isHTMLCheckboxInputElement(target)) {
      return false;
    }

    //チェック
    target.checked = checked;
  };

  /**
   * 保存
   */
  const save_options = () => {
    //設定の取得(range)
    let range = 'full';
    if (isCheckedRadio('display')) {
      range = 'display';
    }
    else if (isCheckedRadio('perfect')) {
      range = 'perfect';
    }

    //設定の取得(title)
    const title = getValue('title');

    //設定の取得(counter)
    const counter = Number(getValue('counter'));

    //設定の取得(interval)
    const interval = Number(getValue('interval'));

    //設定の取得(max)
    const max = isCheckedCheckbox('max');

    //保存
    chrome.storage.sync.set({range, title, counter, interval, max}, () => {
      const status = document.getElementById('status');
      if (status === null) {
        return;
      }
      status.textContent = chrome.i18n.getMessage('msg_saved');
      setTimeout(() => {
        status.textContent = '';
      }, 750);
    });
  };

  /**
   * 読み取り
   */
  const restore_options = () => {
    chrome.storage.sync.get({
      range: DEFAULT_RANGE,
      title: DEFAULT_TITLE,
      counter: DEFAULT_COUNTER,
      interval: DEFAULT_INTERVAL,
      max: DEFAULT_MAX
    }, (items: {[key: string]: string}) => {
      setCheckedRadio(items.range);
      setValue('title', items.title);
      setValue('counter', String(items.counter));
      setValue('interval', String(items.interval));
      setCheckedCheckbox('max', Boolean(items.max));
    });
  };

  /**
   * lang クラスを持った要素の 'msg_' + data-key属性 から言語メッセージを取得し、要素のテキストを変更する
   */
  const setLang = () => {
    //テキスト変換対象の取得
    const targets = document.getElementsByClassName('lang');

    //変換処理
    for (let i = 0, max = targets.length; i < max; i = (i + 1) | 0) {
      //対象を一旦変数へ挿入
      const target = targets.item(i);

      //対象が存在しなかったらなにもしない
      if (target === null) {
        continue;
      }

      //メッセージキーを一旦変数へ挿入
      const key = target.getAttribute('data-key');

      //メッセージキーが存在しなかったらなにもしない
      if (key === null) {
        continue;
      }

      //テキスト設定
      target.innerHTML = chrome.i18n.getMessage('msg_'+key);
    }
  };

  //イベントの登録
  document.addEventListener('DOMContentLoaded', restore_options);
  const save = document.getElementById('save');
  if (save !== null) {
    save.addEventListener('click', save_options);
  }

  //言語ごとにテキスト設定
  document.addEventListener('DOMContentLoaded', setLang);
}
