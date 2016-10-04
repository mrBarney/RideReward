var loc = {latitude: 0, longitude: 0};
var cityCircle;

function getLatitude()  {
  return loc.latitude;
}
function getLongitude() {
  return loc.longitude;
}

function updateLocation() {
    if (navigator && navigator.geolocation) {
        console.log('map updated');

        return navigator.geolocation.getCurrentPosition(success, ()=>console.log('Geolocation error'));
    } else {
        console.log('Geolocation is not supported');
    }

}

function success(position)	{
loc = position.coords;
var center = {lat: loc.latitude, lng: loc.longitude};
if (cityCircle != null) cityCircle.setPosition(center);

else {
cityCircle = new google.maps.Marker({
          position: center,
          icon: {
            url: "sprites/dick.gif",
            scale: 7
          },
          draggable: true,
          map: map
        });
      }
}
