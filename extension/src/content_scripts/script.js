
console.log('addListener');
chrome.runtime.onMessage.addListener(function(message) {
	console.log(message);
	if (message === 'tweet') {
		tweetCps();
	} else if (message === 'config') {
		openConfig();
	}
});

function openConfig() {
	alert('wwwwwwww');
}

function tweetCps() {
	var cookieEl = document.getElementById('cookies');
	var cpsEl = cookieEl.getElementsByTagName('div')[0];
	var text = cpsEl.innerText;
	var cps = text.replace('per second : ', '');
	console.dir(cps);
	var tweet = generateTweet(cps);
	console.log(tweet);
	openTweetWindow(tweet);
}
function generateTweet(cps) {
	return '秒間' + cps + '枚のクッキーを作っています！';
}

function openTweetWindow(text) {
	window.open('https://twitter.com/intent/tweet?text=' + text, '', 'width=480,height=240');
}

