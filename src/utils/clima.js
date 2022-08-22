const request = require('postman-request')

const consultaClima = (data,callback)=>{

    let latitud = data.latitud;
    let logitud = data.logitud;
    let url = 'http://api.weatherstack.com/current?access_key=9b1e64a29244f39865c57836e60ae897&query='+logitud+','+latitud
    request({url : url , json: true},
            (error,response) => {
            if(error){
                callback('error en la consulta de temperaturas ',error)
            }else{
                let data = response.body.current
                let temperature = data.temperature
                let feelslike = data.feelslike
                
                callback(undefined,{resp :'temperatura :' +(temperature ) + ' con sensación de : ' + ( feelslike ) })
            }
      })
}

module.exports = {
    consultaClima : consultaClima
}