 function getRoutes ($http) {
   var lat = document.getElementById('lat').innerHTML
   var long = document.getElementById('lon').innerHTML
   lat = parseFloat(lat).toFixed(4)
   long = parseFloat(long).toFixed(4)
   console.log('getRoutes')

   var config = {
     headers: {
       'Api-Key': 'g49mt653s27z9qyjhunk2vhck7brffxp',
       'Authorization': 'Bearer de9f9c0cdf3274550cb0bede702d343f3330f56b',

       'Content-Type': 'application / json'
     }
   }

         // var appikey = 'sFKou9NvWJAiRC7ddjqmX4tXJGAQNYMG'
   var url = 'https://oauth2-api.mapmyapi.com/v7.1/route/?close_to_location=' + lat + '%2C' + long + '&maximum_distance=5000&minimum_distance=1'
   console.log('getRoutesCloseby')
   console.log(url)
   console.log(lat)
   console.log(long)
   return $.get(url, config)
             .then(function (response) {
               return response.data.results
               console.log(response.data.results)
             })
             // .then(function(results) {
             //     var simplifiedFlights = results.map(function(results) {
             //         return {
             //             total_price: results.fare.total_price,
             //             flight_number: results.outbound.flights[0].flight_number,
             //             airport_departure: results.outbound.flights[0].origin.airport,
             //             departs_at: results.outbound.flights[0].departs_at,
             //             arrives_at: results.outbound.flights[0].arrives_at,
             //             urlbuylink: results.deep_link
             //         }
             //     })
             //     return simplifiedFlights
             // })

   return {
     getRoutesCloseby: getRoutesCloseby
   }
 }
