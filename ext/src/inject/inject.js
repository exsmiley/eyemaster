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
var blinkVersion = false;
var predictionsWindow = [];
var predictionsWindowSize = 10;
var predictionsWindowIndex = 0;

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

function getPredictionWindowAverage() {
  var x = 0;
  var y = 0;
  if (predictionsWindow.length == 0) {
    return {
      "x": x,
      "y": y
    }
  }

  for (var i = 0; i < predictionsWindow.length; i += 1) {
    x += predictionsWindow[i].x.clamp(0, window.innerWidth);
    y += predictionsWindow[i].y.clamp(0, window.innerHeight);
  }
  return {"x": x/predictionsWindow.length, "y": y/predictionsWindow.length};
}

window.addEventListener("load", function() {
    webgazer.setRegression('ridge') /* currently must set regression and tracker */
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
         //   console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
         //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
         if (predictionsWindow.length < predictionsWindowSize && data) {
           predictionsWindow.push(data);
           predictionsWindowIndex += 1;
         } else if(data) {
           predictionsWindow[predictionsWindowIndex] = data;
           predictionsWindowIndex += 1;
         }
         predictionsWindowIndex = predictionsWindowIndex % predictionsWindowSize;
         var tile = onBlinkOnPosition(getPredictionWindowAverage())
         setSelected(tile)
        })
        .setOnBlinkCallback(function() {
        	console.log("I see a blink!");
          // var prediction = getPredictionWindowAverage();
          // if (prediction && prediction.x > 0 && prediction.y > 0) {
          //   console.log(prediction.x + "    " + prediction.y);
          //   onBlinkOnPosition(prediction);
          // }
        	//openNewTab();
          var selectedText = window.getSelection().toString();
          // console.log(selectedText && mouseDown && true)
          if (selectedText && mouseDown) {
            mouseDown = false;
            googleIt(selectedText);
          }
          onBlink();
        	// textToSpeech("I am google and I can see into your soul!");
        })
        .begin()
        .showPredictionPoints(true);

        loadVideo() /* shows a square every 100 milliseconds where current prediction is */
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
        chrome.extension.sendRequest({cmd: "read_file"}, function(html){
          $('#wrapper-eyemaster').prepend(html);
          nameQuadrants(namingArray);
        });
       
});

// comment out after we're done training
window.onbeforeunload = function() {
	webgazer.end()
}
