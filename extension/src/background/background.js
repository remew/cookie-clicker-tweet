//example of using a message handler from the inject scripts
//

function sendMessage(message) {
	chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
		var lastTabId = tabs[0].id;
		chrome.tabs.sendMessage(lastTabId, message);
	});
}

chrome.contextMenus.create({
	'title': '現在のCPSをツイート',
	'documentUrlPatterns': ['http://orteil.dashnet.org/cookieclicker/*'],
	'id': 'tweet',
	'onclick': (info) => {
		sendMessage(info.menuItemId);
	},
});
chrome.contextMenus.create({
	'title': '設定を開く',
	'documentUrlPatterns': ['http://orteil.dashnet.org/cookieclicker/*'],
	'id': 'config',
	'onclick': () => {
		chrome.tabs.create({url: '/src/options/index.html'});
	},
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
	//storageが更新された時に呼ばれる
});


