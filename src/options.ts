//設定項目
//range: 'full' か 'display', 'perfect'.  デフォルト値は 'full'
//title: ダウンロードするファイル名が, ここに仕込んだ文字列+'.png' になる テンプレート変数を入れることも可能 デフォルトは {{title}}
//counter: 上記 title に {{counter}} で仕込めるカウンターの数値
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
  const isChecked = (id: string): boolean => {
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
  const setChecked = (id: string) => {
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
   * 保存
   */
  const save_options = () => {
    //設定の取得(range)
    let range = 'full';
    if (isChecked('display')) {
      range = 'display';
    }
    else if (isChecked('perfect')) {
      range = 'perfect';
    }

    //設定の取得(title)
    const title = getValue('title');

    //設定の取得(counter)
    const counter = Number(getValue('counter'));

    //保存
    chrome.storage.sync.set({range, title, counter}, () => {
      const status = document.getElementById('status');
      if (status === null) {
        return;
      }
      status.textContent = 'Options saved.';
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
      range: 'full',
      title: '{{title}}',
      counter: 0
    }, (items: {[key: string]: string}) => {
      setChecked(items.range);
      setValue('title', items.title);
      setValue('counter', String(items.counter));
    });
  };

  //イベントの登録
  document.addEventListener('DOMContentLoaded', restore_options);
  const save = document.getElementById('save');
  if (save !== null) {
    addEventListener('click', save_options);
  }
}
