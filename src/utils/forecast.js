const request = require ('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/dbf22779710ffcd1abf857bc15bdb7ba/' + latitude + ',' + longitude + '?lang=it&units=si'

    request({ url, json: true }, (error, { body }) => {
        if (error){
          callback('Impossibile connetersi al servizio meteo', undefined)
        } else if ( body.error) {
          callback('Indirizzo non trovato', undefined)
        } else {
          callback(undefined, body.daily.data[0].summary + ' Attualmente ci sono ' + body.currently.temperature + ' gradi.' + body.currently.precipProbability + '  percento di probabilita che si verifichino precipitazioni. ')
    }
        
    })
}

module.exports = forecast