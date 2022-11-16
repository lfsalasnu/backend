const mongoose=require('mongoose')

let esquema=mongoose.Schema({
    nombre:String,
    descripcion:String,
    cantidad:Number,
    valor:String,
    usuario:String,
    imagen:String
})

let Esquema=mongoose.model("datos",esquema)

module.exports=Esquema