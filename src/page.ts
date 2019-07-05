import {Range, Coordinates} from "./class/interface";
import {Sizing} from "./class/Sizing";

window.addEventListener('load', () => {

  console.log('Immediate Shot Start');

  //サイズを取得するためのクラス
  const sizing = new Sizing();

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
