function openNewTab() {
	chrome.runtime.sendMessage({"action": "newTab"});
}