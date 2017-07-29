// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });

// chrome.tabs.create({url: chrome.extension.getURL('src/bg/background.html')});
var derp = "derp"
console.log(derp);
console.log(webgazer);

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {

    // do your things
    // alert("hello");
    webgazer.setRegression('ridge') /* currently must set regression and tracker */
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
         //   console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
         //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
        })
        .begin()
        .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */

    var width = 320;
    var height = 240;
    var topDist = '0px';
    var leftDist = '0px';
    
    var setup = function() {
        // var video = document.getElementById('webgazerVideoFeed');
        // video.style.display = 'block';
        // video.style.position = 'absolute';
        // video.style.top = topDist;
        // video.style.left = leftDist;
        // video.width = width;
        // video.height = height;
        // video.style.margin = '0px';

        // webgazer.params.imgWidth = width;
        // webgazer.params.imgHeight = height;

        // var overlay = document.createElement('canvas');
        // overlay.id = 'overlay';
        // overlay.style.position = 'absolute';
        // overlay.width = width;
        // overlay.height = height;
        // overlay.style.top = topDist;
        // overlay.style.left = leftDist;
        // overlay.style.margin = '0px';

        // document.body.appendChild(overlay);

        // var cl = webgazer.getTracker().clm;

        // function drawLoop() {
        //     requestAnimFrame(drawLoop);
        //     overlay.getContext('2d').clearRect(0,0,width,height);
        //     if (cl.getCurrentPosition()) {
        //         cl.draw(overlay);
        //     }
        //     console.log("derp")
        // }
        // drawLoop();
        console.log('derp');
    };

    function checkIfReady() {
        if (webgazer.isReady()) {
            setup();
        } else {
            setTimeout(checkIfReady, 100);
        }
    }
    setTimeout(checkIfReady,100);

  }
})