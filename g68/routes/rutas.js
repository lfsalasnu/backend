const express = require('express')

const rutas = express.Router()

//modelo
const Esquema=require('../modelo_bd')

rutas.post('/nuevo',(req,res)=>{
    let body=req.body
    let guardar=new Esquema({
        nombre: body.nombre,
        descripcion: body.descripcion,
        cantidad: body.cantidad,
        valor: body.valor,
        usuario: body.usuario,
        imagen: body.imagen
    })
    guardar.save((err,guardardb)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send("información Guardada")
        }
    })
    //res.json(body)
    //res.send('<h1>Ruta nuevo</h1>')
})

rutas.get('/todo',(req,res)=>{
    Esquema
        .find({})
        .then(datos=>res.json({datos}))
})

rutas.get('/borrar/:id',(req,res)=>{
    let {id}=req.params
    Esquema
        .findByIdAndDelete(id)
        .then(res.send("Registro Borrado"))
})

rutas.post('/actualizar',(req,res)=>{
    let body=req.body
    Esquema.updateOne({nombre:body.nombre},{
        $set:{
            cantidad:body.cantidad,
            imagen:"Sin imagen"
        }
    },function(error,info){
    if(error){
        res.send(error)
    }
    else{
        res.json(info)
    }
})
})

module.exports=rutas