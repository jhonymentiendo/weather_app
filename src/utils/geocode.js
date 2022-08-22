const request = require('postman-request')

const geocode = (addres,callback) => {
    
    let urlmapa = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(addres)+'.json?access_token=pk.eyJ1IjoiamhvbnltZW50aWVuZG8iLCJhIjoiY2w1cmFka3E2MDByeDNqbnR3aDY2NDdhcSJ9.ou2UkliFZz9oMd6ya1Qa9w&limit=1'

    request({
        rejectUnauthorized: false,
        url : urlmapa , json: true},(error,response) => {

          if(error){
            callback('Ocurrio un error en el llamado',error)
          }
          else if( response.body.features.length === 0 ) {
            callback('Ocurrio un error en el llamado',undefined)
          }else{
            let data = {
              logitud:0,
              latitud:0
          }
        const latitude = response.body.features[0].center[0]
        const longitude = response.body.features[0].center[1]
          data.latitud = latitude
          data.logitud = longitude
          callback(undefined,data)
          }
      })
}


module.exports = {
    geocode : geocode
}
