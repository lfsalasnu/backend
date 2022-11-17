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

module.exports=rutas