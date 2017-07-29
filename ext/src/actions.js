function openNewTab() {
	chrome.runtime.sendMessage({"action": "newTab", "params" : {}});
}

function googleIt(selectedText) {
  var url = "https://www.google.com/search?q=" + selectedText;
  chrome.runtime.sendMessage({"action": "newTab", "params": {"url": url}});
}
