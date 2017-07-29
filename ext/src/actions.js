function openNewTab() {
	// chrome.tabs.create({})
	chrome.runtime.sendMessage("newTab");
}