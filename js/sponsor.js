'use strict';
$(document).ready(function(){
  function startTimer(){
    let counter = 2;
  	let lbl = $("#startClock").attr("value");
    let id;
    id = setInterval(()=> {
  		$("#startClock").attr("value","Your coupon will be ready in"+"... "+counter);
      counter--;
      if (counter === 0) {
          resendLocation();
          clearInterval(id);
      }
    }, 1000);
  }
  $("#startClock").click(startTimer);
});
