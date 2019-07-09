import {Range, Coordinates} from "./class/interface";
import {Sizing} from "./class/Sizing";
import {FindStyle} from "./class/FindStyle";
window.addEventListener('load', () => {

  //サイズを取得するためのクラス
  const sizing = new Sizing();

  //position: fixed を採用している要素
  let fixedElements: HTMLElement[] = [];

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
  const back = () => {
    sizing.resetSizing();
  };

  /*
  const getFixed = () => {
    const start = performance.now();
    const findStyle = new FindStyle(document.body);
    fixedElements = findStyle.find('position', 'fixed');
    for (let i = 0, max = fixedElements.length; i < max; i = (i + 1) | 0) {
      fixedElements[i].style.visibility = 'hidden';
    }
    const end = performance.now();
    console.log('[killFixed]: ' + String((end - start) / 1000)+'sec');
  }
  getFixed();
  */

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
      case 'back':
        back();
        sendResponse({});
        break;
      default:
        sendResponse({});
        break;
    }
  });

});
