selectedArray = ["one", "two", "three", "four"];
functionsArray = [openNewTab,duplicateTab,reloadTab,removeTab];
namingArray = ['New Tab', 'Duplicate Tab', 'Reload Tab', 'Remove Tab'];
function applyFuncBasedOnSelected(arrayOfFunc){
  if(menuUp) {
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

}
function ex(num){
  return function f(){
    console.log(num)
  }
}

function onBlink() {
  // var selected = $.find(".selected")[0].id;
  // $(".selected").removeClass("selected");
  // var index = selectedArray.indexOf(selected);
  // if (index == 3){
  //   index = -1;
  // }
  // $('#' + selectedArray[index+1]).addClass('selected')
  console.log(menuUp)
  applyFuncBasedOnSelected(functionsArray)
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
        if (!cancel){
        applyFuncBasedOnSelected(functionsArray);
        }
}

var cancel = false;
var menuUp = false;
function resetSelected(){
    $('.selected').removeClass('selected');
    $('#one').addClass('selected');
}
$(document).ready(function(){
    $(document).bind('keydown', 'ctrl', function(){$('.quadrant').removeClass('clear');cancel=false;menuUp = true;})
    .bind('keyup','ctrl', function(){
        // closeMenu()
    })
    .bind('keydown', 'ctrl+right', function(){onBlink();})
    .bind('keydown', 'ctrl+space', function(){cancel=true;$('.quadrant').addClass('clear');resetSelected();});
})
