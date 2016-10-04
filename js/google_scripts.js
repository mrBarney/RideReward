var loc = {latitude: 0, longitude: 0};
var center = {lat: loc.latitude, lng: loc.longitude};
var clientMarker;
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
        document.getElementById('map').innerHTML = "Location Services are not supported on this device";
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
  clientMarker = new google.maps.Marker({
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
  document.getElementById("map").innerHTML="Location services are not enabled";
}




function updateLocation() {
  navigator.geolocation.getCurrentPosition(updateSuccess, updateFailure);
}

function updateSuccess(position)	{
  console.log('location updated');
  loc = position.coords;
  center = {lat: loc.latitude, lng: loc.longitude};
  if (clientMarker.getMap() == null) clientMarker.setMap(map);
  clientMarker.setPosition(center);
}

function updateFailure()  {
  console.log('location not updated, permissions revoked');
  clientMarker.setMap(null);
}
