import {Sizing} from "./Sizing";

const sizing = new Sizing();

console.log('immediate shot');

//ブラウザの大きさを適切なものに変える
const styling = (full) => {
  if (full) {
    sizing.fullSizing();
  }
  else {
    sizing.standardSizing(null);
  }
};

//ブラウザの大きさを元に戻す
const back = () => {
  sizing.resetSizing();
};

//メッセージパッシング
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // 受け取った値で分岐
  switch (request.type) {
    case 'sizing':
      styling(request.full);
      sendResponse({});
      break;
    case 'back':
      //back();
      sendResponse({});
      break;
    default:
  }
});
