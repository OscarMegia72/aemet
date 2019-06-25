# aemet
## Consulta de los valores del clima ofrecidos por Aemet

Instalación como npm
```
git+https://github.com/OscarMegia72/aemet.git
```
### Obtención de api-key
https://opendata.aemet.es/centrodedescargas/altaUsuario

### Listado de municipio ine de España
Fuente:

https://www.ine.es/daco/daco42/codmun/codmun11/11codmunmapa.htm

Se encuentran en la carpeta doc-ine
```
CPRO	CMUN	DC	NOMBRE
01	001	4	Alegría-Dulantzi
Concatenamos CPRO y CMUN para obtener el código válido
```
### Ejemplo
```
    let municipio='28090'
    let aemet_api_key='paste aemet api key'
    getMunicipio(aemet_api_key,municipio).then((data) => {
        console.log(data)
    }).catch(e=>{
        console.log(e)
    })
```