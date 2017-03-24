$(document).ready(function () {

});
var map;
var infoWindow;
var currentPos;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
  });
  infoWindow = new google.maps.InfoWindow({map: map});
  var service = new google.maps.places.PlacesService(map);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (pos) {
      currentPos = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
      map.setCenter(currentPos);

      var posMarker = new google.maps.Marker({
        map: map,
        position: currentPos,
        animation: google.maps.Animation.DROP
      });

      service.nearbySearch({
        location: currentPos,
        radius: 50000,
        type: ['campground']
      }, callback);
    }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
