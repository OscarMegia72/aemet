/***
 *     ██████╗ ███████╗ ██████╗ █████╗ ██████╗     ███╗   ███╗███████╗ ██████╗ ██╗ █████╗ 
 *    ██╔═══██╗██╔════╝██╔════╝██╔══██╗██╔══██╗    ████╗ ████║██╔════╝██╔════╝ ██║██╔══██╗
 *    ██║   ██║███████╗██║     ███████║██████╔╝    ██╔████╔██║█████╗  ██║  ███╗██║███████║
 *    ██║   ██║╚════██║██║     ██╔══██║██╔══██╗    ██║╚██╔╝██║██╔══╝  ██║   ██║██║██╔══██║
 *    ╚██████╔╝███████║╚██████╗██║  ██║██║  ██║    ██║ ╚═╝ ██║███████╗╚██████╔╝██║██║  ██║
 *     ╚═════╝ ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚═╝     ╚═╝╚══════╝ ╚═════╝ ╚═╝╚═╝  ╚═╝
 *                                                                                        
 */
const dotenv = require('dotenv') 
dotenv.config()
const clima = require('./main')
console.log("main.test")
// alpedrete 2810
// collado villalba 28047
let municipio='01011'
let aemet_api_key=process.env.KEY_AEMET
clima.getMunicipio(aemet_api_key,municipio).then((data) => {
        console.log(data)  
}).catch(e=>{
        console.log("==ERROR AEMET =================")
        console.log(e.message)
        console.log("===============================")
})