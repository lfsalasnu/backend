const express = require('express')
const rutas=express.Router()

const datos=require('../Modelo/bd_g36')

rutas.post('/nuevo',(req,res)=>{
    let body=req.body
    let nuevo=new datos({
        nombre:body.nombre,
        descripcion:body.descripcion,
        cantidad:body.cantidad,
        valor:body.valor,
        usuario:body.usuario,
        imagen:body.imagen
    })

    

    nuevo.save((err,nuevodb)=>{
        if(err){
            res.send(`<p>${err}</p>`)
        }
        else{
            res.json({nuevodb})
        }
    })
    
    //res.json(body)
})

rutas.get('/todo',(req,res)=>{
    datos
        .find({})
        .then(todo=>res.json(todo))
})

rutas.post('/actualizar',(req,res)=>{
    let body=req.body
    datos.updateOne({nombre:body.nombre}, {
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
    //res.json({body})
})

rutas.get('/eliminar/:id',(req,res)=>{
    let {id}=req.params
    datos
        .findByIdAndDelete(id)
        .then(res.send('Registro borrado'))
})

module.exports=rutas