/***
 *     ██████╗ ███████╗ ██████╗ █████╗ ██████╗     ███╗   ███╗███████╗ ██████╗ ██╗ █████╗ 
 *    ██╔═══██╗██╔════╝██╔════╝██╔══██╗██╔══██╗    ████╗ ████║██╔════╝██╔════╝ ██║██╔══██╗
 *    ██║   ██║███████╗██║     ███████║██████╔╝    ██╔████╔██║█████╗  ██║  ███╗██║███████║
 *    ██║   ██║╚════██║██║     ██╔══██║██╔══██╗    ██║╚██╔╝██║██╔══╝  ██║   ██║██║██╔══██║
 *    ╚██████╔╝███████║╚██████╗██║  ██║██║  ██║    ██║ ╚═╝ ██║███████╗╚██████╔╝██║██║  ██║
 *     ╚═════╝ ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚═╝     ╚═╝╚══════╝ ╚═════╝ ╚═╝╚═╝  ╚═╝
 *                                                                                        
 */
const moment = require('moment')
const request = require("request");
const urlPath = 'https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/'
let getMunicipio = (aemet_api_key,cod_municipio) => {
    return new Promise((resolve, reject) => {
        var options = {
            method: 'GET',
            url: urlPath + cod_municipio,
            headers: {
                'Authorization': 'Bearer ' + aemet_api_key,
                'cache-control': 'no-cache'
            }
        }
        request(options, function(error, response, body) {
            if (error) {
                reject(error)
            }
            let tempData = JSON.parse(body)
            getMuniKey(tempData.datos).then((data) => { 
                resolve(data)
            })
        })
    })
}
function getMuniKey(url) {
    return new Promise((resolve, reject) => {
        request(url, function(error, response, body) {
            if (error) {
                reject(error)
            }
            let jsonAemet = JSON.parse(body)
            // console.log(body)
            let _cielo = getEstadoCielo(jsonAemet)
            let _viento = getViento(jsonAemet)
            let _temperatura = getTemperatura(jsonAemet)
            let _ambito = getAmbito(jsonAemet)
            let miClima = {
                'ambito': _ambito,
                'cielo': _cielo,
                'viento': _viento,
                'temperatura': _temperatura
            }

            resolve(miClima)
        })
    })


}

function getAmbito(data) {
    let ambito = {
        'provincia': data[0].provincia,
        'municipio': data[0].nombre
    }
    return ambito
}

function getTemperatura(data) {
    let actual = getTemperaturaHoraActual(data)

    let temp = {
        'maxima': data[0].prediccion.dia[0].temperatura.maxima,
        'minima': data[0].prediccion.dia[0].temperatura.minima,
        'periodo_actual': actual
    }

    return temp
}

function getTemperaturaHoraActual(data) {
    let tempArr = data[0].prediccion.dia[0].temperatura.dato
    console.log(tempArr )
    let actual = -100
    tempArr.forEach(element => {
        if (element.hora === getHora()) {

            actual = element.value
        }
    })
    return actual
}

function getEstadoCielo(data) {

    let cielo
    data[0].prediccion.dia[0].estadoCielo.forEach(element => {
        if (element.periodo == getPeriodo()) {

            cielo = element
        }
    })
    return cielo
}

function getViento(data) {
    let viento
    data[0].prediccion.dia[0].viento.forEach(element => {
        if (element.periodo == getPeriodo()) {

            viento = element
        }
    })
    return viento
}

function getHora() {
    let tempHora = parseInt(moment(Date.now()).format('HH'))

    if (tempHora >= 0 && tempHora <= 9) return 6
    if (tempHora > 9 && tempHora <= 14) return 12
    if (tempHora > 14 && tempHora <= 18) return 18
    if (tempHora > 18 && tempHora <= 24) return 24
}

function getPeriodo() {
    let tempHora = parseInt(moment(Date.now()).format('HH'))

    if (tempHora >= 0 && tempHora <= 6) return '00-06'
    if (tempHora > 6 && tempHora <= 12) return '06-12'
    if (tempHora > 12 && tempHora <= 18) return '12-18'
    if (tempHora > 18 && tempHora <= 24) return '18-24'


    return tempHora
}
module.exports = {
    getMunicipio
}
// alpedrete 2810
// collado villalba 28047

if (!module.parent) {
    let municipio='28090'
    let aemet_api_key='paste aemet api key'
    console.info('busco: '+municipio)
    getMunicipio(aemet_api_key,municipio).then((data) => {
        console.log(data)
    }).catch(e=>{
        console.log(e)
    })
}