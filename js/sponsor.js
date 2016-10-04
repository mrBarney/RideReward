'use strict';
$(document).ready(function(){
  function startTimer(){
    let counter = 2;
  	let lbl = $("#startClock").attr("value");
    let id;
    id = setInterval(()=> {
  		$("#startClock").attr("value",lbl+"... "+counter);
      counter--;
      if (counter === 0) {
          alert('You will now be redirected');
          window.location.href = "http://www.google.com";
          clearInterval(id);
      }
    }, 1000);
  }
  $("#startClock").click(startTimer);
});
