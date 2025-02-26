import server from './server'

// process.env.PORT para el puerto que elija el host - deploy
const port = process.env.PORT || 4000

server.listen(port, () =>{
    console.log("Servidor corriendo .......")
})

