var loc = {latitude: 0, longitude: 0};
var center = {lat: loc.latitude, lng: loc.longitude};
var clientMarker;
var map;
var loopUpdate;
var busLocations = {bus: [{lat: 0, lng: 0},{lat: 1, lng: 1}]};
var busMarkers = [{marker: ""}];
var loopBus;

function getLatitude()  {
  return loc.latitude;
}
function getLongitude() {
  return loc.longitude;
}

function getBuses() {
  $.post("/map",{},
    function(res,err){
      busLocations=res;
      drawBuses(busLocations);
  });
}

function drawBuses(buses)  {
  var x;
  for (x in buses.bus) {
    console.log('Bus drawn')
    busMarkers[x] = new google.maps.Marker({
    position: buses.bus[x], icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 10},map: map});
      console.log(busMarkers[x]);
  }
  loopBus = window.setInterval(updateBuses, 1000);

}

function updateBuses(){
  $.post("/map",{},
    function(res,err){
      busLocations=res;
  });
  for (x in busMarkers){
    console.log('bus ' + x + ' moved to ' + busLocations.bus[x].lat + ', ' + busLocations.bus[x].lng);
    if (busMarkers[x].getMap()==null) busMarkers[x].setMap(map);
    busMarkers[x].setPosition({lat: busLocations.bus[x].lat,lng: busLocations.bus[x].lng});
  }
}

function initMap() {
    if (navigator && navigator.geolocation) {
        console.log('Geolocation is supported');
        navigator.geolocation.getCurrentPosition(locationFound, failure);
    } else {
        console.log('Geolocation is not supported');
        document.getElementById('map').innerHTML = "Location Services are not supported on this device";
    }
    getBuses();
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
  var x;
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
