 $('#searchButton').click(function () {
   const url = 'https://oauth2-api.mapmyapi.com/v7.1/route/'
   const urlTrack = 'https://oauth2-api.mapmyapi.com'
   $()

   const config = {
     'Api-Key': 'g49mt653s27z9qyjhunk2vhck7brffxp',
     'Authorization': 'Bearer de9f9c0cdf3274550cb0bede702d343f3330f56b',
     'Content-Type': 'application/json'
   }

     // Empty Array and Table
   $('#no-more-tables tbody').empty()
   let routesInfo = []
   console.log(routesInfo)
   const close_to_location = `${lat},${lon}`

   let maximum_distance, minimum_distance

   minimum_distance = $('#min_dst').val()
   maximum_distance = $('#max_dst').val()

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
           map = new GMaps({
             div: '#gmap',
             lat: lat,
             lng: lon
           })

           const placeString = `<span style="padding: 0px; text-align:left" align="left"><h5>${website} &nbsp; &nbsp; 
                            </h5><p> ${address} <br />

                            <a target="_blank" href= ${gwww}> More Information </a></p>`
           map.addMarker({
             lat: lat,
             lng: lon,
             title: place.formatted_address,
             icon: 'https://res.cloudinary.com/picapoll/image/upload/c_scale,w_64/v1497606255/blue-pin-md_mx7nm6.png',
             infoWindow: {
               content: placeString
             }
           })

           routesInfo.forEach(location => {
             const htmlString = `
                    <div class="container-fluid">
                    <div class="content">
                          <div class="col-sm-6 sidenav">
                            <iframe width="100%" height="100" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" margin="0 auto" src="http:${location.href.href}"></iframe>
                        </div>

                          <div class="col-sm-6">
                          <h2>Description</h2>

                            <strong> ${location.name}</strong><br>
                            ${location.distance}<br>

                        </div>
                      </div>
                  </div>

                `

             const product = `
                    <div>
                        <div class="col-md-4 ">
                            <img src="http:${location.href.href}" class="img-responsive">
                        </div>
                    <div class="col-md-8 ">
                        <h4>Description: </h4>${location.name}
                        <h6>Distance </h6>${location.distance}</div></div>
                    </div>
                  `
             map.addMarker({

               lat: location.lat,
               lng: location.lon,
               icon: 'https://res.cloudinary.com/picapoll/image/upload/v1497371946/jogging_kmbdhu.png',
               infoWindow: {
                 content: product
               }
             })

             var tr

             tr = $('<tr/>')
             tr.append('<td>' + location.aLength + '</td>')
             tr.append('<td>' + '<img src=' + 'http://' + location.href.href + '></img></td>')
             tr.append('<td>' + location.name + '</td>')
             tr.append('<td>' + location.distance + '</td>')
             tr.append('<td>' + 'UserAction' + '</td>')
             $('tbody').append(tr)
           })
         })
   $('#txtPlaces').val('')
 })
