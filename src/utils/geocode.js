const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFyay1jaGFsaW5kZXIiLCJhIjoiY2tkZnplcW95MjBwejJ1dDlraHRsN2d5ayJ9.fkwVgtY5sD8j0Rhm_DF49Q&limit=1'
  request({url, json: true}, (error, {body}={}) => {
    if (error) {
      callback('Unable to connect to location services (1)')
    } else if (body.features.length == 0) {
      callback('Unable to find your address. Try another search.')
    } else {
      callback(undefined, {
        longitude: body.features[0].center[0], 
        latitude: body.features[0].center[1],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode