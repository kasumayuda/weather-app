const request = require('postman-request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=bdcd6eb6346473a752b35163dd524e47&query=' + latitude + ', ' + longitude
    request({url, json: true}, (error, {body} = {})=>{

        if (error){
            callback('Unable to connect to weatherstack services')
            return
        }

        if (body.success != undefined && body.success === false){
            callback('Unable to find forecast. Try another coordinate.')
            return;
        }

        const currentWeather = body.current;
        callback(undefined, currentWeather.weather_descriptions[0] + ". It is currently " + currentWeather.temperature + " degrees. But it feels like " + currentWeather.feelslike + " degrees")

    })
}

module.exports = forecast