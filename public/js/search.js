google.maps.event.addDomListener(window, 'load', function () {
  const places = new google.maps.places.Autocomplete(document.getElementById('txtPlaces'))
  google.maps.event.addListener(places, 'place_changed', function () {
    const place = places.getPlace()
    const address = place.formatted_address
    const lat = place.geometry.location.lat().toFixed(4)
    const lon = place.geometry.location.lng().toFixed(4)

    const routesInfo = []
    console.log(place.geometry.location.lat(), place.geometry.location.lng())
            // charge Map

    console.log('Google Maps API version: ' + google.maps.version)

    const url = 'https://oauth2-api.mapmyapi.com/v7.1/route/'
    const urlTrack = 'https://oauth2-api.mapmyapi.com'

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

                const kml = route._links.alternate[0].href
                const gpx = route._links.alternate[1].href
                const aLength = routesInfo.length + 1
                const urlTrack = 'https://oauth2-api.mapmyapi.com' + gpx
                const urlKml = 'https://oauth2-api.mapmyapi.com' + kml
                routesInfo.push({ aLength, lat, lon, distance, name, href, kml, gpx, urlTrack, urlKml })

                return {
                  lat,
                  lon,
                  distance,
                  name,
                  href,
                  kml,
                  gpx
                }
              })
            })
            .then(function () {
              console.log(routesInfo)
              map = new GMaps({
                div: '#gmap',
                lat: lat,
                lng: lon
              })

              map.addMarker({
                lat: lat,
                lng: lon,
                title: place.formatted_address,
                icon: '../images/hotel_0star.png'
              })

              routesInfo.forEach(location => {
                const htmlMap = `
                  <div id="map"></div>
                    <script>

                      function initMap() {
                        var map = new google.maps.Map(document.getElementById('map'), {
                          zoom: 11,
                          center: {lat: 41.876, lng: -87.624}
                        });

                        var ctaLayer = new google.maps.KmlLayer({
                          url: 'http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml',
                          map: map
                        });
                      }
                    </script> 
                  `
                const htmlString = `
                    <div class="container-fluid">
                    <div class="content">
                          <div class="col-sm-6 sidenav">
                            <iframe width="100%" height="100" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" margin="0 auto" src="${location.href.href}"></iframe>
                        </div>
                        
                          <div class="col-sm-6">
                          <h2>Description</h2>
                         
                            <strong> ${location.name}</strong><br>
                            ${location.distance}<br>
                          
                        </div>
                      </div>
                  </div>

                `

                const htmlStringMap = ` <div class="container-fluid">
                    <div class="content">
                       <div id="map">
                </div>  
                     </div>
                  </div>
                   `
                            // const contentString = '<div class="container">' + '<div class="row-fluid">' + '<div class="span8">'  +'<iframe'+ width="100%"'+' height="150"'+' frameborder="0"'+' scrolling="no"'+' marginheight="0"'+' marginwidth="0" '+'src=http://'+ location.href.href + '>+'</img>' + '</div>' + '<div class="span4">' + '<h2> Description:</h2>' + location.name + '</div>' + '</div>' + '</div>'
                map.addMarker({

                  lat: location.lat,
                  lng: location.lon,
                  icon: '../images/jogging.png',
                  infoWindow: {
                    content: htmlStringMap
                  }
                })

                        // console.log(location.urlKml)

                var tr

                tr = $('<tr/>')
                tr.append('<td>' + location.aLength + '</td>')
                tr.append('<td>' + '<img src=' + 'http://' + location.href.href + '></img></td>')
                tr.append('<td>' + location.name + '</td>')
                tr.append('<td>' + location.distance + '</td>')
                tr.append('<td>' + 'UserAction' + '</td>')
                $('tbody').append(tr)
              })
                    /*
                                       $.ajax({
                                         url: routesInfo[0].urlKml,
                                         beforeSend,
                                         track
                                       }) */

              var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 11,
                center: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }

              })
              var marker = new google.maps.Marker({
                position: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng()},
                map: map,
                title: 'Hello World!'
              })

              var ctaLayer = new google.maps.KmlLayer({
                url: 'http://gaia-si.com/temp/route131505119.kml',
                map: map
              })

              infoWindow = new google.maps.InfoWindow({})
              map.loadFromKML({
                url: 'http://gaia-si.com/temp/route131505119.kml',
                suppressInfoWindows: true,
                events: {
                  click: function (point) {
                    infoWindow.setContent(point.featureData.infoWindowHtml)
                    infoWindow.setPosition(point.latLng)
                    infoWindow.open(map.map)
                  }
                }
              })
            })
  })
})
