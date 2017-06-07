google.maps.event.addDomListener(window, 'load', function () {
  const places = new google.maps.places.Autocomplete(document.getElementById('txtPlaces'))
  google.maps.event.addListener(places, 'place_changed', function () {
    const place = places.getPlace()
    const address = place.formatted_address
    const lat = place.geometry.location.lat().toFixed(4)
    const lon = place.geometry.location.lng().toFixed(4)

    const routesInfo = []
    console.log(routesInfo)

    console.log(place.geometry.location.lat(), place.geometry.location.lng())
            // charge Map

    console.log('Google Maps API version: ' + google.maps.version)

    const url = 'https://oauth2-api.mapmyapi.com/v7.1/route/'
    console.log(url)
    const config = {
      'Api-Key': 'g49mt653s27z9qyjhunk2vhck7brffxp',
      'Authorization': 'Bearer de9f9c0cdf3274550cb0bede702d343f3330f56b',
      'Content-Type': 'application/json'
    }
    console.log('search')
    const close_to_location = `${lat},${lon}`
    const maximum_distance = 9700
    const minimum_distance = 9500

    const data = {
      close_to_location,
      maximum_distance,
      minimum_distance
    }

    const beforeSend = request => {
      request.setRequestHeader('Api-Key', config['Api-Key'])
      request.setRequestHeader('Authorization', config['Authorization'])
      request.setRequestHeader('Content-Type', config['Content-Type'])
    }

    $.ajax({
      url,
      beforeSend,
      data
    })

        .then(data => data._embedded.routes)
            .then(routes => {
              return routes.map(route => {
                const [lon, lat] = route.starting_location.coordinates
                const distance = route.distance
                const name = route.name
                let [href] = route._links.thumbnail
                href = href.href
                const kml = route._links.alternate[0].href
                routesInfo.push({lat, lon})
                console.log(routesInfo)
                return {
                  lat,
                  lon,
                  distance,
                  name,
                  href,
                  kml
                }
              })
            })
        .then
        .then(locations => {
          console.log('locations ready!')
          console.log(locations)
          map = new GMaps({
            div: '#gmap',
            lat: locations[0].lat,
            lng: locations[0].lon

          })

          map.addMarker({
            lat: locations[0].lat,
            lng: locations[0].lon,
            title: 'Hello World!',
            icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'

          })

          locations.forEach(location => {
            map.addMarker({
              lat: location.lat,
              lng: location.lon,
              click: function (e) {
                alert('You clicked in this marker')
              }
            })
          })

            .catch(err => console.log(err))
        })
  })
})
