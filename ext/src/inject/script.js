selectedArray = ["one", "two", "three", "four"];
functionsArray = [openNewTab,duplicateTab,reloadTab,removeTab];
namingArray = ['New Tab', 'Duplicate Tab', 'Reload Tab', 'Remove Tab'];
function applyFuncBasedOnSelected(arrayOfFunc){
  var selected = $.find(".selected")[0].id;
  for (i = 0; i < 4; i++){
    if (selectedArray[i] == selected){
      var func_to_execute = arrayOfFunc[i];
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
function onBlink() {
  var selected = $.find(".selected")[0].id;
  $(".selected").removeClass("selected");
  var index = selectedArray.indexOf(selected);
  if (index == 3){
    index = -1;
  }
  $('#' + selectedArray[index+1]).addClass('selected')
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
  console.log("quadrant = " + quadrant);
  //funcs[quadrant - 1]();
}

$(document).ready(function(){
    $(document).bind('keydown', 'shift+4', function(){$('.quadrant').removeClass('clear');})
    .bind('keyup','shift+4', function(){
        $('.quadrant').addClass('clear');
        applyFuncBasedOnSelected(functionsArray);
    })
    .bind('keydown', 'shift+right', function(){onBlink();});
})
