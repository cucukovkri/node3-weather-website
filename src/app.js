const path = require ('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')

const app = express()

//define paths for express cofniguration
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs') // per template dinamico
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Meteo',
        name: 'Kristijan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Informazioni',
        name: 'Kristijan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Per eventuali problemi rivolgersi a: Cucukovkri@gmail.com',
        title: 'Aiuto',
        name: 'Kristijan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Inserire un indirizzo'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast (latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            
            res.send ({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'Inserire un indirizzo'
        })
    }

    res.send({
       products: []
    })
})

app.get('/help/*', (req, res)=> {
    res.render('404', {
        title: '404',
        name: 'Andrew',
        errorMessage: 'Aiuto non trovato'
     })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew',
        errorMessage: 'Page not found'
     })
})


app.listen(3000, () => {
    console.log('Server in ascolto sulla porta 3000.')
})
