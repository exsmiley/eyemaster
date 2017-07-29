function onBlink() {
  jquery.find(".selected")
}

  $(document).ready(function(){
    $(document).bind('keydown', 'shift+4', function(){$('.quadrant').removeClass('clear');}).bind('keyup','shift+4', function(){$('.quadrant').addClass('clear');});
  })
