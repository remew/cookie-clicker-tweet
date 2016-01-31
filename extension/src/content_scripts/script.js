
chrome.runtime.onMessage.addListener((message) => {
	if (message === 'tweet') {
		tweetCps();
	}
});

function injectMetaData() {
	var scriptEl = document.createElement('script');
	var script =
	'var c = Game.cookies;' +
	'var cps = Game.cookiesPs;' +
	'var cookiesMeta = document.querySelector("meta[name=cookies]");' +
	'var cpsMeta = document.querySelector("meta[name=cps]");' +
	'if (cookiesMeta === null) {' +
		'cookiesMeta = document.createElement("meta");' +
		'cookiesMeta.name = "cookies";' +
		'document.head.appendChild(cookiesMeta);' +
	'}' +
	'if (cpsMeta === null) {' +
		'cpsMeta = document.createElement("meta");' +
		'cpsMeta.name = "cps";' +
		'document.head.appendChild(cpsMeta);' +
	'}' +
	'cookiesMeta.content = c;' +
	'cpsMeta.content = cps;';

	script = ';(function(){' + script + '})()';

	scriptEl.textContent = script;

	document.body.appendChild(scriptEl);
	document.body.removeChild(scriptEl);
}

function tweetCps() {
	chrome.storage.local.get(['template'], (data) => {
		var template = data.template;
		if (!template) {
			template = '毎秒{CPS}枚のクッキーを作っています！'
		}
		var data = extractTemplateData();
		var tweet = generateTweet(template, data);
		openTweetWindow(tweet);
	});
}

function extractTemplateData() {
	injectMetaData();
	var cookiesMeta = document.querySelector('meta[name=cookies]');
	var cpsMeta = document.querySelector('meta[name=cps]');
	var cookies = cookiesMeta.content;
	var cps = cpsMeta.content;
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

