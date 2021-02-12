const request = require('postman-request')

const geocode = (address, callback) => {
    if (!address){
        callback('Please supply place')
        return
    }
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoia2FzdW1heXVkYSIsImEiOiJja2t6NHB2emw1aW5yMndwZHFjYWhna2sxIn0.8OuSQC_YWWhGAARB9O6h2A'

    request({ url, json: true }, (error, {body})=>{
        if (error){
            callback('Unable to connect to geocode services.')
            return
        }
        if (body.features.length == 0){
            callback('Unable to find location. Try another search.')
            return
        }
        const features = body.features[0]
        callback(undefined, {
            latitude: features.center[1],
            longitude: features.center[0],
            location: features.place_name
        })

    })
}

module.exports = geocode