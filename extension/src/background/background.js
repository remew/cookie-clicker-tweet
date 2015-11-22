//example of using a message handler from the inject scripts
//

function sendMessage(message) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var lastTabId = tabs[0].id;
		chrome.tabs.sendMessage(lastTabId, message);
	});
}

chrome.contextMenus.create({
	"title": "現在のCPSをツイート",
	"documentUrlPatterns": ["http://orteil.dashnet.org/cookieclicker/*"],
	"id": "tweet",
	"onclick": function(info) {
		console.log(info);
		sendMessage(info.menuItemId);
	},
});
chrome.contextMenus.create({
	"title": "設定",
	"documentUrlPatterns": ["http://orteil.dashnet.org/cookieclicker/*"],
	"id": "config",
	"onclick": function(info) {
		console.log(info);
		sendMessage(info.menuItemId);
	},
});

/*chrome.storage.local.get(['name', 'kosen'], function(data) {
	var nickname = data.name;
	var kosen = data.kosen;
	console.log(nickname, kosen);
});*/

chrome.storage.onChanged.addListener(function(changes, namespace) {
	var nickname = changes.name.newValue;
	var kosen = changes.kosen.newValue;
	console.log(nickname, kosen);
});


