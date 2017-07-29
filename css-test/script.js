function onBlink() {
  var selected = $.find(".selected")[0].id
  selectedArray = ["one", "two", "three", "four"]
  $(".selected").removeClass("selected")
  for (item in selectedArray) {
    if (selectedArray[item] === selected) {
      $("." + selectedArray[item + 1]).addClass("selected")
    }
  }
}

  $(document).ready(function(){
    $(document).bind('keydown', 'shift+4', function(){$('.quadrant').removeClass('clear');}).bind('keyup','shift+4', function(){$('.quadrant').addClass('clear');});
    onBlink();
  })
