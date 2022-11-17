const express = require('express')
const mongoose=require('mongoose')
const app1=express()
const port=5005

const bodyParser=require('body-parser')
app1.use(bodyParser.json())
app1.use(bodyParser.urlencoded({extended:false}))

mongoose
    .connect("mongodb://localhost:27017/g_47")
    .then(console.log("Conectado a la base de datos"))


let Esquema=require('./Modelos/bd_articulos')

app1.get("/articulos/:articulo",(req,res)=>{
    let {articulo}=req.params
    Esquema
        .findOne({usuario:articulo})
        .then(datos=>res.json(datos))
})

app1.get('/productos',(req,res)=> res.send('<h1>Hola a todos</h1><h2>Titulo 2</h2>'))

app1.get('/nuevo',(req,res)=> res.json({
    nombre:"Luis",
    apellidos:"Salas",
    Edad:29
}))

let daton={
    nombre: "Lamina Neymar jr",
    descripcion: "Lamina panini Qatar 2022 Brasil Neymar jr",
    cantidad: 5,
    valor: "Medio",
    usuario: "Fernando",
    imagenes: "/Recursos/neymar.jpg"
}

let datonn=new Esquema(daton)

app1.get('/nuevo_articulo',(req,res)=>{
    datonn.save()
    res.send('Articulo guardado')
})

app1.get('/borrar/:br',(req,res)=>{
    let {br}= req.params
    let var1=Esquema.findById(br)
    Esquema
        .findByIdAndDelete(br)
        .then(res.send(`Se borro el articulo con id: ${var1.nombre}`))
})

app1.get("/guardar/:articulo",(req,res)=>{
    let {articulo}=parse.json(req.params)
    res.json(articulo)
})

const rutas=require('./router/rutas')
app1.use('/servicios',rutas)


app1.listen(port,()=>console.log('Servidor...'))