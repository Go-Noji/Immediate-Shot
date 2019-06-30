//設定項目
//range: 'full' か 'display', 'perfect'.  デフォルト値は 'full'
//title: ダウンロードするファイル名が, ここに仕込んだ文字列+'.png' になる テンプレート変数を入れることも可能 デフォルトは {{title}}
//counter: 上記 title に {{counter}} で仕込めるカウンターの数値
//テンプレート変数
//{{title}}: タイトルタグの内容
//{{url}}: url の内容
//{{counter}}: counter の内容

/**
 * 保存
 */
function save_options() {
  //設定の取得
  let range = 'full';
  if (document.getElementById('display').checked) {
    range = 'display';
  }
  else if (document.getElementById('perfect').checked) {
    range = 'perfect';
  }
  const title = document.getElementById('title').value;
  const counter = Number(document.getElementById('counter').value);

  //保存
  chrome.storage.sync.set({range, title, counter}, function() {
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

/**
 * 読み取り
 */
function restore_options() {
  chrome.storage.sync.get({
    range: 'full',
    title: '{{title}}',
    counter: 0
  }, function(items) {
    document.getElementById(items.range).checked = true;
    document.getElementById('title').value = items.title;
    document.getElementById('counter').value = items.counter;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
