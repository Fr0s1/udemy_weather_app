const request = require('request');

const forecast = (latitude, longtitude, callback) => {
    // Weatherstack API
    const url = 'http://api.weatherstack.com/current?access_key=29bd103d395e449837d72430c5caf306&query=' + latitude + ',' + longtitude;

    request({ url: url, json: true }, (error, response) => {
        console.log(url)
        if (error) {
            callback('Unable to connect to network', undefined);
        } else if (response.body.error) {
            callback('Can\' find weather forecast for given location', undefined);
        } else {
            const data = response.body.current;

            callback(undefined, `It is ${data.temperature} degrees out`);
        }
    })
}

module.exports = forecast;