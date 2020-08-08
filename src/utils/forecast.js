const request = require('request')
const fs = require('fs')
const path = require('path')

const forecast = (longitude, latitude, callback) => {
  const keyCode = fs.readFileSync(path.join(__dirname,'../../access-keys/weatherstack.key')).toString()
  const url = 'http://api.weatherstack.com/current?access_key='+keyCode+'&query='+latitude+','+longitude+'&units=m'
  // console.log (url)
  request({url, json: true}, (error, {body}={}) => {
    if (error) {
      callback('Unable to connect to weather service (2)')
    } else if (body.error) {
      callback('Unable to connect to weather service (3)')
    } else {
      callback(undefined, {
        description: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelslike: body.current.feelslike
      })
    }
  })
}

module.exports = forecast