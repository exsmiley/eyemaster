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
    $(document).bind('keydown', 'shift+4', function(){$('.quadrant').removeClass('clear');}).bind('keyup','shift+4', function(){$('.quadrant').addClass('clear');});
    onBlink();
  })
