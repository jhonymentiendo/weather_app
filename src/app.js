const path = require('path')
const {geocode} = require('./utils/geocode.js')
const {consultaClima} = require('./utils/clima.js')
const hbs = require('hbs')

//paths para la configuración de express
const express = require('express')
const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views') //si esto no existiera, buscaría la carpeta views por default
const partialsPath = path.join(__dirname,'../templates/partials')

//handlebars engine y views location
app.set('view engine','hbs')
app.set('views',viewPath) //si esto no existiera, buscaría la carpeta views por default
hbs.registerPartials(partialsPath)

//directorios
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{

    res.render('index',{
        titulo:'App Prueba Node + Express(handlebars [views + partials])',
        desarrollador : 'Juan Carlos Iglesias Ruiz'
    })

})

app.get('/about',(req,res)=>{

    res.render('about',{
        titulo:'About',
        desarrollador : 'Juan Carlos Iglesias Ruiz'
    })

})

app.get('/help',(req,res)=>{

    res.render('help',{
        titulo:'help',
        desarrollador : 'Juan Carlos Iglesias Ruiz'
    })

})

app.get('/weather',(req,res)=>{
var address = req.query.address;
var ciudad = address
    geocode(ciudad,(error,datacoordenadas)=>{
        if(error || ciudad==undefined){

            res.send({
                errormsj : 'no hay datos para la ciudad '+ ciudad,
                error
            })

        }else{
            consultaClima(datacoordenadas,(error,dataClima)=>{

                if(error){
                    res.send({
                        errormsj : 'no hay datos para la ciudad '+ ciudad,
                        error
                    })
                }else{
                    res.send({ resp : 'la temperatura en ' + (ciudad ) + ' es ' + dataClima.resp/*JSON.stringify(dataClima)*/ })
                }

                

              })
        }


      })
})


app.get('/help/*',(req,res)=>{

    res.render('notfound',{
        titulo:'notfound',
        desarrollador : 'Juan Carlos Iglesias Ruiz',
        errormsj : 'pagina de help no encontrada'
    })

})

app.get('*',(req,res)=>{

    res.render('notfound',{
        titulo:'notfound',
        desarrollador : 'Juan Carlos Iglesias Ruiz',
        errormsj : 'pagina no encontrada'
    })
})

app.listen(3001,()=>{
    console.log('Server is Up on port 3001')
})