const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/8544ddefbd82ac12e4816312688a8faf/'+ latitude +','+longitude;
 
    request({ url, json : true }, (error, { body }) => {
       if(error) {
            callback('Unable to connect wheather service',undefined);
       } else if (body.error) {
            callback('Unable to find location', undefined);
       } else {
            callback(undefined,body.currently.summary + '. It is currently '+  body.currently.temperature + ' degress out. There is a '+ body.currently.precipProbability + '% chance of rain.')
       }
    });
 }
 
 module.exports = forecast