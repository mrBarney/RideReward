var loc;

function sendLocation() {
		console.log("Retrieving Coordinates");
		document.getElementById("creq").innerHTML = "Requesting Coupon";
    if (navigator && navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(successCallback, ()=>console.log('Geolocation error'));
    } else {
        console.log('Geolocation is not supported');
    }

}

function successCallback(position) {
	console.log("Sending Coordinates... ");

  loc = position.coords;
		$.post("/",{lat:position.coords.latitude,long:position.coords.longitude, store: document.getElementById("sel1").value},
		function(res,err){
			playad();
			console.log("Success");
		});
}

function getLatitude()  {
  return loc.latitude;
}
function getLongitude() {
  return loc.longitude;
}

function updateLocation() {
    if (navigator && navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition((position)=>{map.panTo(new google.maps.LatLng(position.latitude,position.longitude))}, ()=>console.log('Geolocation error'));
    } else {
        console.log('Geolocation is not supported');
    }

}
function playad(){
	document.getElementById("creq").innerHTML = "playing ad";
}
