const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views') 
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=> {
    res.render('index',{
        title: 'Weather App',
        name: 'Luke Skywalker'
    })
})

app.get('/about', (req, res)=> {
    res.render('about',{
        title: 'About',
        name: 'Luke Skywalker'
    })
})

app.get('/help', (req, res)=> {
    res.render('help',{
        title: 'Help',
        message: 'Get your help here',
        name: 'Luke Skywalker'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.location){
        return res.send({
            error: 'Please provide location.'
        })
    }
    const location = req.query.location;
    geocode(location, (error, {latitude, longitude, location }={})=> {
        if (error !== undefined){
            return res.send({
                error:error
            })
        }

        forecast(latitude, longitude, (error, data)=>{
            if (error !== undefined){
                return res.send({
                    error:error
                })
            }

            return res.send({
                forecast: data,
                location: location
            });

        })
    })
})

app.get('/products', (req, res)=>{
    if (!req.query.search){
        return res.send({
            error: 'Please provide search term.'
        })
    }
    
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: 'Help Page - Error 404',
        message: 'Article not found',
        name: 'Luke Skywalker'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        title: 'Error 404',
        message: 'Page not found',
        name: 'Luke Skywalker'
    })
})

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
})