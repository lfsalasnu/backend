const express= require('express')

const rutas=express.Router()

const Esquema=require('../Esquema_articulo')

rutas.post('/nuevo',(req,res)=>{
    let body=req.body

    let guardar=new Esquema({
        nombre:body.nombre,
        descripcion:body.descripcion,
        cantidad:body.cantidad,
        valor:body.valor,
        usuario:body.usuario,
        imagen:body.imagen
    })

    guardar.save((err,guardardb)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send("<h1>Dato Guardado</h1>")
            guardardb
        }
    })
    //res.json(body)
})

rutas.get('/todo',(req,res)=>{
    Esquema
        .find({})
        .then(datos=>res.json(datos))
})

rutas.get('/eliminar/:id',(req,res)=>{
    let {id}=req.params
    Esquema
        .findByIdAndDelete(id)
        .then(res.send("Elemento Borrado"))
})

rutas.post('/actualizar',(req,res)=>{
    let body=req.body
    Esquema.updateOne({nombre:body.nombre},{
        $set:{
            cantidad:body.cantidad,
            imagen:"no hay imagen"
        }
    },function(error,info){
        if(error){
            res.send('error')
        }
        else{
            res.json({info})
        }
    })
})



module.exports=rutas