import server from "./server"

// Se cambiara cuando tenga un archivo con las variables de entorno
const port = process.env.PORT || 4000

server.listen(port, () => {
    console.log("SERVIDOR CORRIENDO EN EL PUERTO: ", port)
})

  