const request = require ('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY3VjdWtvdmtyaXN0aWphbiIsImEiOiJja2F3dzMwNDMwMGRtMnBvMmFpbHp3dHR1In0.s-663Ixmtt9oJHmDLQfcRA&limit=1'

    request ({ url, json:true}, (error, { body }) => {
        if (error) {
            callback('impossibile connettersi ai servizi di localizzazione', undefined)
        } else if (body.features.length === 0) {
            callback('Indirizzo non trovato. Riprova', undefined)
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