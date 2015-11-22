
registSendButton();

chrome.storage.local.get(['template'], function(data) {
	if (data.template) {
		document.getElementById('template').value = data.template;
	}
});

function registSendButton() {
	var btn = document.getElementById('updateButton');
	btn.addEventListener('click', () => {
		var template = document.getElementById('template').value;
		saveTemplate(template);
	});
}

function saveTemplate(template) {
	chrome.storage.local.set({template: template}, function() {
		alert('テンプレートを更新しました！');
	});
}

