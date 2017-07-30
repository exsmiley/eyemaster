selectedArray = ["one", "two", "three", "four"];
functionsArray = [openNewTab,duplicateTab,reloadTab,removeTab];
socialArray = [facebook, yelp, twitter, linkedin];
designArray = [figma, envision, framer, sketch]; 
namingArray = ['New Tab', 'Duplicate Tab', 'Reload Tab', 'Remove Tab'];
socialNamingArray = ['open Facebook', 'open Yelp', 'open Twitter', 'open Linkedin']
designNamingArray = ['open Figma', 'open Envision', 'open Framer', 'open Sketch']

function applyFuncBasedOnSelected(arrayOfFunc){
    var selected = $.find(".selected")[0].id;
    for (i = 0; i < 4; i++){
      if (selectedArray[i] == selected){
        var func_to_execute = arrayOfFunc[i];
        // close menu before otherwise function might cause odd stuff to happen
        menuUp = false;
        closeMenu()
        func_to_execute();
        return true
      }
  }

}
function ex(num){
  return function f(){
    console.log(num)
  }
}

function trigger(funcarray) {
  // var selected = $.find(".selected")[0].id;
  // $(".selected").removeClass("selected");
  // var index = selectedArray.indexOf(selected);
  // if (index == 3){
  //   index = -1;
  // }
  // $('#' + selectedArray[index+1]).addClass('selected')
  if(menuUp && !cancel && !trainingMode) {
    console.log(menuUp)
     applyFuncBasedOnSelected(funcarray)
  }
 
}

function onBlink() {
  var selected = $.find(".selected")[0].id;
  $(".selected").removeClass("selected");
  var index = selectedArray.indexOf(selected);
  if (index == 3){
    index = -1;
  }
  $('#' + selectedArray[index+1]).addClass('selected')
}

function setSelected(num) {
  var index = num-1
  if(index >= 0 && index < 4) {
    if($.find(".selected")[0]) {
        var selected = $.find(".selected")[0].id;
        $(".selected").removeClass("selected");
      }
    $('#' + selectedArray[index]).addClass('selected')
  }

}

function nameQuadrants(namingArray){
  for (i=0; i<4; i++){
    console.log(namingArray[i]);
    $('#' + selectedArray[i]).find('.quadrant-text').text(namingArray[i]);
  }
}

//  1  |  2
//  -------
//  4  |  3
function onBlinkOnPosition(prediction) {
  var funcs = [openNewTab,duplicateTab,reloadTab,removeTab];
  var x = prediction.x;
  var y = prediction.y;
  var quadrant = 0;
  if (x < window.innerWidth / 2 && y < window.innerHeight / 2) {
    quadrant = 1;
  } else if (x >= window.innerWidth / 2 && y < window.innerHeight / 2) {
    quadrant = 2;
  } else if (x >= window.innerWidth / 2 && y >= window.innerHeight / 2) {
    quadrant = 3;
  } else if (x < window.innerWidth / 2 && y >= window.innerHeight / 2) {
    quadrant = 4;
  }
  return quadrant
  //funcs[quadrant - 1]();
}

function closeMenu() {
  $('.quadrant').addClass('clear');
        resetSelected();
        // if (!cancel){
        // applyFuncBasedOnSelected(functionsArray);
        // }
}

var cancel = false;
var menuUp = false;
var trainingMode = false;
function resetSelected(){
    $('.selected').removeClass('selected');
    $('#one').addClass('selected');
}
$(document).ready(function(){
    $(document).bind('keydown', 'Ctrl+a', function(){$('.quadrant').removeClass('clear');cancel=false;menuUp = true;nameQuadrants(namingArray);})
    .bind('keyup','Ctrl+a', function(){
        trigger(functionsArray)
    })
    .bind('keydown', 'Ctrl+space', function(){cancel=true;$('.quadrant').addClass('clear');resetSelected();})
    .bind('keydown', 'Ctrl+s', function(){$('.quadrant').removeClass('clear');cancel=false;menuUp = true;nameQuadrants(socialNamingArray);})
    .bind('keyup','Ctrl+s', function(){
        trigger(socialArray)
    })
    .bind('keydown', 'Ctrl+space', function(){cancel=true;$('.quadrant').addClass('clear');resetSelected();})
    .bind('keydown', 'Ctrl+d', function(){$('.quadrant').removeClass('clear');cancel=false;menuUp = true;nameQuadrants(designNamingArray);})
    .bind('keyup','Ctrl+d', function(){
        trigger(designArray)
    })
    .bind('keydown', 'Ctrl+space', function(){cancel=true;$('.quadrant').addClass('clear');resetSelected();})
})
