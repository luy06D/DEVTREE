import express from 'express'


const app = express()

// Routing -- CREAMOS LAS RUTAS DE LA APLICACIÓN
app.get('/', (req, res) =>{
     res.send('Hola express...')
})

app.get('/pagina2', (req, res) =>{
     res.send('Hola soy pagina 2')
})

// Se cambiara cuando tenga un archivo con las variables de entorno
const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log("SERVIDOR CORRIENDO EN EL PUERTO: ", port)
})

  