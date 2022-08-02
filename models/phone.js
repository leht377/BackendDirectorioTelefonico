const mongoose = require("mongoose")
const uniquevalidator = require("mongoose-unique-validator")

const phoneSchema = new mongoose.Schema({
    name:{
        type:String, unique:true, minlength:3
    },
     
    number:{
        type:String, minlenght:11, required:true
    },
//se hace una relacion  en la linea 13
    user:{
        type:mongoose.Schema.Types.ObjectId, ref:"User"

    }

})

//plugin es mongoose sirve para añadirle una modalidad al esquema 
phoneSchema.plugin(uniquevalidator)
const Phone = mongoose.model("Phone", phoneSchema)
module.exports = Phone
