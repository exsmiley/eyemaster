function openNewTab() {
	chrome.runtime.sendMessage({"action": "newTab"});
}

function duplicateTab() {
	chrome.runtime.sendMessage({"action": "duplicateTab"})
}

function reloadTab() {
	chrome.runtime.sendMessage({"action": "reloadTab"})
}

function removeTab() {
	chrome.runtime.sendMessage({"action": "removeTab"})
}

function textToSpeech(text) {
	chrome.runtime.sendMessage({"action": "say", "text": text})
}