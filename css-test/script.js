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
  var selected = $(".selected").removeClass("selected")
  if (selected.next() && selected.next().length) {
    selected.next().addClass("selected")
  }
  else {
    selected.siblings(":first").addClass("selected")
  }
}

$(document).ready(function(){
    $(document).bind('keydown', 'shift+4', function(){$('.quadrant').removeClass('clear');})
    .bind('keyup','shift+4', function(){
        $('.quadrant').addClass('clear');
        applyFuncBasedOnSelected([ex(1),ex(2),ex(3),ex(4)]);
        
    });
    $(document).bind('keydown', 'right', function(){onBlink();});
})
