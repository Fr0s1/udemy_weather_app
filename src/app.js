const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dinh Trong Hieu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Dinh Trong Hieu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        number: '0927146476',
        name: 'Dinh Trong Hieu'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'You must provide an location' })
    }

    geocode(req.query.address, (error, { location, longtitude, latitude } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longtitude, (error, response) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                location,
                forecastData: response
            });
        })
    })
})

app.get('/products', (req, res) => {

})

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: '404',
        message: 'Help article not found',
        name: 'Dinh Trong Hieu'
    })
})

app.get('*', (req, res) => {
    res.render('404-page', {
        title: '404',
        message: 'Page not found',
        name: 'Dinh Trong Hieu'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})