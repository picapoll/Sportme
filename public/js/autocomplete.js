// Autocomplete with google Place API
var lat
var lon
var place
var address

google.maps.event.addDomListener(window, 'load', function () {
  const places = new google.maps.places.Autocomplete(document.getElementById('txtPlaces'))
  google.maps.event.addListener(places, 'place_changed', function () {
    place = places.getPlace()
    address = place.formatted_address
    lat = place.geometry.location.lat().toFixed(4)
    lon = place.geometry.location.lng().toFixed(4)

    console.log(place.geometry.location.lat(), place.geometry.location.lng())
    console.log('Google Maps API version: ' + google.maps.version)
  })
})
	