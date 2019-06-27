//キャプチャ
const action = () => {
	chrome.tabs.getSelected(null, tab => {
		chrome.storage.sync.get({range: 'full'}, (items) => {
			chrome.tabs.sendMessage(tab.id, {type: 'sizing', full: items.range === 'full'}, () => {
				setTimeout(() => {
					chrome.tabs.captureVisibleTab(function(url) {
						chrome.tabs.create({url: 'download.html?src='+url+'&title='+tab.title+'&url='+tab.url});
						chrome.tabs.sendMessage(tab.id, {type: 'back'});
					});
				}, 100);
			});
		});
	});
};

//アイコンクリック
chrome.browserAction.onClicked.addListener(action);
