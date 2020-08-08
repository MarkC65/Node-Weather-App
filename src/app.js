const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')
const favicon = require('serve-favicon')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const faviconPath = path.join(__dirname,'../public/images/favicon.ico')

app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))
app.use(favicon(faviconPath))

app.get('', (req,res) => {
  res.render('index', {
    title: 'My Weather App',
    name: 'Mark Chalinder'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Mark Chalinder'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Mark Chalinder',
    help_msg: 'This is the help message that needs to be displayed in a new paragraph!'
  })
})

app.get('/weather', (req,res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address."
    })
  }
  geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
    if (error) {
      return res.send({
        error
      })
    }
    forecast(longitude, latitude, (error, {description, temperature, feelslike}) => {
      if (error) {
        return res.send({
          error
        })
      }
      var forecast = ''
      if (temperature === feelslike) {
        forecast = description+'. It is currently ' + temperature + ' degrees outside.'
      }
      else {
        forecast = description+'. It is currently ' + temperature + ' degrees outside, but it feels like ' + feelslike + '.'
      }
      res.send({
        address: req.query.address,
        forecast: forecast,
        location
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404_error',{
    title: '404',
    name: 'Mark Chalinder',
    help_msg: '404: Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404_error',{
    title: '404',
    name: 'Mark Chalinder',
    help_msg: '404: Page not found.'
  })
})

app.listen(3000, () => {
  console.log('Express server is listening on port 3000')
})