chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

	}
	}, 10);
});

var mouseDown = 0;
document.body.addEventListener('mousedown', function() { 
    mouseDown = 1;
    console.log('mouse down');
});

document.body.addEventListener('mouseup', function() {
    mouseDown = 0;
    console.log('mouse up');
});

var hasLoaded = false;

window.addEventListener("load", function() {
    webgazer.setRegression('ridge') /* currently must set regression and tracker */
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
         //   console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
         //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
        })
        .setOnBlinkCallback(function() {
        	console.log("I see a blink!");
        	//openNewTab();
          var selectedText = window.getSelection().toString();
          if (selectedText && selectedText.length < 20 && mouseDown) {
            mouseDown = false;
            googleIt(selectedText);
          }
        	// textToSpeech("I am google and I can see into your soul!");
        })
        .begin()
        .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */

    function checkIfReady() {
        if (webgazer.isReady()) {
            loadVideo();
        } else {
            setTimeout(checkIfReady, 100);
        }
    }
    setTimeout(checkIfReady,100);
}, false);


window.addEventListener("focus", function() {
	if(hasLoaded) {
		webgazer.resume()
	}
}, false);

window.addEventListener("blur", function() {
	hasLoaded = true;
	webgazer.pause()
}, false);

// window.onbeforeunload = function() {
// 	webgazer.end()
// }

$(document).ready(function(){
        $('body').prepend('<div id="wrapper-eyemaster"></div>');
        console.log('inserted');
        chrome.extension.sendRequest({cmd: "read_file"}, function(html){
        console.log('inse');
        $('#wrapper-eyemaster').prepend(html);
        });
        console.log('inse');
       
});

// comment out after we're done training
window.onbeforeunload = function() {
	webgazer.end()
}
