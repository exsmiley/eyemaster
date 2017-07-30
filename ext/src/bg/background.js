// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
// chrome.extension.onMessage.addListener(
//   function(request, sender, sendResponse) {
//   	chrome.pageAction.show(sender.tab.id);
//     sendResponse();
//   });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.action === "newTab") {
        chrome.tabs.create({});
    } else if(request.action === "duplicateTab") {
        chrome.tabs.duplicate(sender.tab.id);
    } else if(request.action === "reloadTab") {
        chrome.tabs.reload(sender.tab.id);
    } else if(request.action === "removeTab") {
        chrome.tabs.remove(sender.tab.id);
    } else if(request.action === "say") {
        chrome.tts.speak(request.text, {"voiceName": request.voice});
    } else if(request.action == "googleIt") {
        chrome.tabs.create({"url": request.url});
    }
});

// chrome.tabs.create({url: chrome.extension.getURL('src/bg/background.html')});
var derp = "derp"
console.log(derp);

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
   console.log('REQUQEST');
   if(request.cmd == "read_file") {
     console.log(chrome.extension.getURL("index.html"));
     $.ajax({
       url: chrome.extension.getURL("index.html"),
       dataType: "html",
       success: sendResponse
     });
   console.log('REQUQEST');
   }
});
console.log('REQUQEST');
