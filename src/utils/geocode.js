const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoicHVzaHBlbmRyYXlhZGF2IiwiYSI6ImNrOWcyZ2NsOTBoa2UzbXA0eTh2cmlncHoifQ.WP_QyMoEBro1SMfW56diAA'
 
    request({url, json : true}, (error, { body }) => {
       if(error){
          callback('Unable to connect map service', undefined);
       } else if (body.features.length === 0) {
          callback('Unable to get correct co-ordinates', undefined);
       } else {
          callback(undefined, {
             latitude: body.features[0].center[1],
             longitude: body.features[0].center[0],
             location: body.features[0].place_name
          })
       }
    })
 }
 

 module.exports = geocode