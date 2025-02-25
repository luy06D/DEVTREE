import server from './server'

// process.env.PORT para el puerto que elija el host - deploy
const port = process.env.PORT || 4000

server.listen(port, () =>{
    console.log("Servidor corriendo .......")
})


type Producto =  {
    id: number,
    name: string,
}


let nombre = "Luis D"
let age = 23
let xd = true

let object: Producto = {
    id: 1,
    name: "alucina"
}