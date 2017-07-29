function openNewTab() {
	// chrome.tabs.create({})
	chrome.runtime.sendMessage({ from: 'content_script', message: 'Information from webpage.' });
}