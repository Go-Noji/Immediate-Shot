import {Sizing} from "./Sizing";

//サイズを取得するためのクラス
const sizing = new Sizing();

//表示されているタブの情報を返す
const information = () => {
  return sizing.getInformation();
};

//ブラウザの大きさを適切なものに変える
const styling = (range, index) => {
  switch (range) {
    case 'full':
      sizing.fullSizing();
      break;
    case 'display':
      sizing.standardSizing(null);
      break;
    case 'perfect':
      sizing.standardSizing(index);
      break;
  }

  //情報を返す
  return sizing.getInformation();
};

//ブラウザの大きさを元に戻す
const back = () => {
  sizing.resetSizing();
};

//メッセージパッシング
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // 受け取った値で分岐
  switch (request.type) {
    case 'information':
      sendResponse(information());
      break;
    case 'sizing':
      styling(request.range, request.index);
      sendResponse({});
      break;
    case 'back':
      back();
      sendResponse({});
      break;
    default:
      sendResponse({});
      break;
  }
});
