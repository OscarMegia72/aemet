# aemet
## Consulta de los valores del clima ofrecidos por Aemet

Instalación como npm
```
npm install --save git+https://github.com/OscarMegia72/aemet.git
```
### Obtención de api-key
https://opendata.aemet.es/centrodedescargas/altaUsuario

### Listado de municipio ine de España
Fuente:

https://www.ine.es/daco/daco42/codmun/codmun11/11codmunmapa.htm

Se encuentran en la carpeta doc-ine
Concatenamos CPRO y CMUN para obtener el código válido
```
CPRO	CMUN	DC	NOMBRE
01	001	4	Alegría-Dulantzi
01	002	9	Amurrio
01	049	3	Añana
01	003	5	Aramaio

```
### Ejemplo
```
const aemet = require('aemet')
let codmun='28090'
aemet.getMunicipio('[pegar aemet api key]',codmun).then((data) => 
    {
        console.info(data)
    }).catch(e=>{
        console.error(e)
    })
```