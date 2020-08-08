const request = require('request')

const forecast = (longitude, latitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=3b90fe660bf279b499eb83be648dc376&query='+latitude+','+longitude+'&units=m'
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