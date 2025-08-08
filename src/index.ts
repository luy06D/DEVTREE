import colors from 'colors'
import server from "./server"

// Se cambiara cuando tenga un archivo con las variables de entorno
const port = process.env.PORT || 4000

server.listen(port, () => {
    console.log(colors.bgGreen.magenta.italic(`SERVIDOR CORRIENDO EN EL PUERTO: ${port}`) )
})

