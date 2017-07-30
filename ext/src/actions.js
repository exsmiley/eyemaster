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

function textToSpeech(text, voiceName) {
	if(!voiceName) {
		voiceName = "Ralph"
	}
	chrome.runtime.sendMessage({"action": "say", "text": text, "voice": voiceName})
}

function googleIt(selectedText) {
  var url = "https://www.google.com/search?q=" + selectedText;
  chrome.runtime.sendMessage({"action": "googleIt", "url": url});
}
