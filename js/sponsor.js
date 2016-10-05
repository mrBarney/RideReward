'use strict';
$(document).ready(function(){
  function startTimer(){
    let counter = 3;
  	let lbl = $("#startClock").attr("value");
    let id;
    id = setInterval(()=> {
  		$("#startClock").attr("value","Your coupon will be ready in"+"... "+counter);
      if (counter === 0) {
          resendLocation();
          clearInterval(id);
          document.remove(document.getElementById("startClock"));
      }
      counter--;
    }, 1000);
  }
  $("#startClock").click(startTimer);
});
