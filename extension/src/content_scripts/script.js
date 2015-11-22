
chrome.runtime.onMessage.addListener(function(message) {
	console.log(message);
	if (message === 'tweet') {
		tweetCps();
	}
});

function tweetCps() {
	chrome.storage.local.get(['template'], function(data) {
		console.log(data);
		var template = data.template;
		if (!template) {
			template = '毎秒{CPS}枚のクッキーを作っています！'
		}
		var data = extractTemplateData();
		console.log(tweet);
		var tweet = generateTweet(template, data);
		console.log(tweet);
		openTweetWindow(tweet);
	});
}

function extractTemplateData() {
	var cookieEl = document.getElementById('cookies');
	var cookies = cookieEl.childNodes[0].textContent.split(' ')[0];
	var cpsEl = cookieEl.getElementsByTagName('div')[0];
	var text = cpsEl.innerText;
	var cps = text.replace('per second : ', '');
	return {
		cps: cps,
		cookies: cookies,
	};
}

function generateTweet(template, data) {
	return encodeURIComponent(
			template.replace('{CPS}', data.cps)
					.replace('{COOKIES}', data.cookies)
	);
}

function openTweetWindow(text) {
	window.open('https://twitter.com/intent/tweet?text=' + text, '', 'width=480,height=240');
}

