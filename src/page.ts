import {Range, Coordinates} from "./class/interface";
import {Sizing} from "./class/Sizing";
import {FindStyle} from "./class/FindStyle";
window.addEventListener('load', () => {

  //サイズを取得するためのクラス
  const sizing = new Sizing();

  //position: fixed を採用している要素
  let fixedElements: HTMLElement[] = [];

  //position: fixed を採用している要素を確保する
  const getFixed = () => {
    const findStyle = new FindStyle(document.body);
    fixedElements = findStyle.find('position', 'fixed');
  }

  //position: fixed を採用している要素を非表示にする or 元に戻す
  const controlFixed = (property: 'hidden' | '') => {
    for (let i = 0, max = fixedElements.length; i < max; i = (i + 1) | 0) {
      fixedElements[i].style.visibility = property;
    }
  };

  //表示されているタブの情報を返す
  const information = () => {
    return sizing.getInformation();
  };

  //ブラウザの大きさを適切なものに変える
  const styling = (range: Range, index: number) => {
    //処理終了後の座標情報
    let coordinate: Coordinates = {
      x: 0,
      y: 0
    };

    //range によって処理を分ける
    switch (range) {
      case 'full':
        coordinate = sizing.fullSizing();
        break;
      case 'perfect':
        coordinate = sizing.displaySizing(index);
        break;
      default:
        coordinate = sizing.displaySizing(null);
        break;
    }

    //座標情報を返す
    return coordinate;
  };

  //ブラウザの大きさを元に戻す
  const resetSizing = (coordinates: Coordinates) => {
    sizing.resetSizing(coordinates);
  };

  //メッセージパッシング
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // 受け取った値で分岐
    switch (request.type) {
      case 'information':
        sendResponse(information());
        break;
      case 'sizing':
        sendResponse(styling(request.range, request.index));
        break;
      case 'killFixed':
        controlFixed('hidden');
        sendResponse({});
        break;
      case 'resetSizing':
        controlFixed('');
        resetSizing({x: request.x, y: request.y});
        sendResponse({});
        break;
      default:
        sendResponse({});
        break;
    }
  });

  //position: fixed を採用している要素の確保
  getFixed();

});
