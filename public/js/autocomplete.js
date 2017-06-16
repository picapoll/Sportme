// Autocomplete with google Place API
var lat
var lon
var place
var address
var gwww
var phone
var icon
var website
var photoId
var photoWeb

google.maps.event.addDomListener(window, 'load', function () {
  const places = new google.maps.places.Autocomplete(document.getElementById('txtPlaces'))
  google.maps.event.addListener(places, 'place_changed', function () {
    place = places.getPlace()
    address = place.formatted_address
    lat = place.geometry.location.lat().toFixed(4)
    lon = place.geometry.location.lng().toFixed(4)
    gwww = place.url
    phone = place.formatted_phone_number
    icon = place.icon
    website = place.website
    photoWeb = 'https:' + '//' + 'maps.googleapis.com/maps/api/place/photo?' + photoId
  })
})
