const http = require ("http")
const app = require("./app")
const server = http.createServer(app)
const {PORT} = require("./utils/confing")

server.listen(PORT, ()=>{
    console.log("el servidor esta corriendo en el puerto 3001")
})

