const express = require('express')

const rutas=express.Router()

const Esquema=require('../Modelos/bd_articulos')

rutas.post('/nuevo',(req,res)=>{
    let body=req.body
    let guardar=new Esquema({
        nombre:body.nombre,
        descripcion:body.descripcion,
        valor:body.valor,
        cantidad:body.cantidad,
        usuario:body.usuario,
        imagen:body.imagen
    })
    guardar.save((err,guardadodb)=>{
        if(err){
            res.send(err)
        }
        else{
            res.json(guardadodb)
        }
    })
    //res.json({body})
})

rutas.get('/todo',(req,res)=>{
    Esquema
        .find({})
        .then(datos=>res.json(datos))
})

rutas.post('/actualizar',(req,res)=>{
    let body=req.body
    Esquema.updateOne({nombre:body.nombre},{
        $set:{
            cantidad:body.cantidad,
            imagen:"No existe"
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

rutas.get('/borrar/:id',(req,res)=>{
    let {id}=req.params
    Esquema
        .findByIdAndDelete(id)
        .then(res.send("<h1>Documento borrado</h1>"))
})
module.exports=rutas