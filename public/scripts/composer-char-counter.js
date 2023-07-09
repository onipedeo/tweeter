$(document).ready(function() {

  $(".new-tweet textarea").on('input', function() {
    const maxlen = 140;
    let currentLen = $(this).val().length;
    //targeting the counter class by transversing the DOM
    const counter = $(this).parent().find('.counter');
    counter.text(maxlen - currentLen);

    //checking if maxlen is more than currentlen 
    if (currentLen <= maxlen) {
      $(counter).removeClass('counterRed').addClass('counterBlack');
    } else {
      $(counter).removeClass('counterBlack').addClass('counterRed');
    }
  });

});