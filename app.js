const express = require("express")
const app = express()
const cors= require("cors")
const mongoose = require("mongoose")
const {MONGOURI} = require("./utils/confing")
const {tokenExtractor} = require("./utils/middlewares")
require("express-async-errors")


//get read
//update = put atualizar
//delete eliminar
//post crear
//(()=>{}) funcion flecha
mongoose.connect(MONGOURI).then(()=>{console.log("Mongo esta corriendo")}).catch((error)=>{console.log(error)})
app.use(cors())
app.use(express.json())
app.use(tokenExtractor)

const userRouter = require("./controllers/users")
app.use("/api/user", userRouter)

const phoneRouter = require("./controllers/phone")
app.use("/api/phone",phoneRouter )

const loginRouter = require ("./controllers/login")
app.use("/api/login", loginRouter)

//modulo.exprots es porta una variable un objeto o una funcion 
//para que pueda ser utilizado en cualquier parte de nuestro codigo 
module.exports = app





