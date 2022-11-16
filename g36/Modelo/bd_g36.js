const mongoose=require('mongoose')

const esquema= mongoose.Schema({
    nombre: String,
    descripcion: String,
    valor: String,
    cantidad: Number,
    usuario:String,
    imagen:String
})

const datos=mongoose.model('datos',esquema)

module.exports=datos