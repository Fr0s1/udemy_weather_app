const request = require('request');

const geocode = (address, callback) => {
    // Mapbox API
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZnIwczEiLCJhIjoiY2tmcTg5aWQwMDFyNzJ6bzh4ZDZtYnR5YSJ9.6FaKsaA9Xon3qSeNaf2bEw&limit=1'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location service', undefined);
        } else if (response.body.message || response.body.features.length == 0) {
            callback('Unable to find location', undefined);
        } else {
            const data = response.body.features;
            callback(undefined, { location: data[0].place_name, longtitude: data[0].center[0], latitude: data[0].center[1] });
        }
    })
}

module.exports = geocode;