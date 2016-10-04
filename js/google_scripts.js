var loc = {latitude: 0, longitude: 0};
var center = {lat: loc.latitude, lng: loc.longitude};
var cityCircle;
var map;
var loopUpdate;

function getLatitude()  {
  return loc.latitude;
}
function getLongitude() {
  return loc.longitude;
}

function initMap() {
    if (navigator && navigator.geolocation) {
        console.log('Geolocation is supported');
        return navigator.geolocation.getCurrentPosition(locationFound, failure);
    } else {
        console.log('Geolocation is not supported');
    }

}

function updateLocation() {
    if (navigator && navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(success, ()=>console.log('location not updated'));
    } else {
        console.log('location update failed');
    }

}

function locationFound(position){
  loc = position.coords;
  center = {lat: loc.latitude, lng: loc.longitude};
  map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: 13
  });
  console.log('map initialized');
  console.log('location found');
  cityCircle = new google.maps.Marker({
            position: center,
            icon: {
              url: "sprites/dick.gif",
              scale: 9,
              anchor: {x: 41, y: 32}
            },
            map: map
          });
  loopUpdate = window.setInterval(updateLocation, 1000);
}


function failure(){
  console.log('Geolocation error');
  document.getElementById("map").innerHTML="Location services are not enabled"
}

function success(position)	{
  console.log('location updated');
  loc = position.coords;
  center = {lat: loc.latitude, lng: loc.longitude};
  cityCircle.setPosition(center);
}
