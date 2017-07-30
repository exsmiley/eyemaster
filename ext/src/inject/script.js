selectedArray = ["one", "two", "three", "four"]
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

$(document).ready(function(){
    $(document).bind('keydown', 'shift+4', function(){$('.quadrant').removeClass('clear');})
    .bind('keyup','shift+4', function(){
        $('.quadrant').addClass('clear');
        applyFuncBasedOnSelected([openNewTab,duplicateTab,reloadTab,removeTab]);
    })
    .bind('keydown', 'shift+right', function(){onBlink();});
})
