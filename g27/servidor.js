const express= require('express')
const app1=express()
const port=5005

const bodyParser=require("body-parser")
app1.use(bodyParser.json())
app1.use(bodyParser.urlencoded({extended:false}))
//Conexión base de datos
const mongoose=require('mongoose')

mongoose
    .connect('mongodb://localhost:27017/g_27')
    .then(console.log("Conectado a la base de datos"))

const Esquema=require('./Esquema_articulo')

app1.get('/todo',(req,res)=>{
    Esquema
        .find({})
        .then(datos=>res.json(datos))
})

app1.get('/articulos/:parametro',(req,res)=>{
    let {parametro}=req.params
    Esquema
        .findOne({usuario:parametro})
        .then(datos=>res.json(datos))
        
})

const dato_nuevo={
    nombre:"Lamina Neymar",
    descripcion:"Lamina panini Qatar 2022 Brasil Neymar",
    cantidad:5,
    valor:"Alto",
    usuario:"Luis",
    imagen:"neimar.jpg"
}

let nuevo_dato=new Esquema(dato_nuevo)

app1.get('/nuevo',(req,res)=>{
    //nuevo_dato.save()
    let nuevo=req.body.nombre
    res.send(nuevo)
})

app1.get('/borrar/:borrar',(req,res)=>{
    let {borrar}=req.params

    Esquema
        .findOneAndDelete({nombre:borrar})
        .then(res.send(`<h1>Registro ${borrar} borrado</h1>`))
})


app1.get('/productos',(req,res)=>res.send(
    "<h1>Hola Mundo</h1><h2>Titulo 2</h2>"
))

app1.get('/nuevo_usuario',(req,res)=>res.json({
    nombre:"Luis Fernando",
    apellido:"Salas Nunez",
    Edad:29,
    usuario:"lfsalasnu"
}))

let rutas=require('./router/rutas')
app1.use('/articulos2',rutas)

app1.listen(port,()=>console.log("Servidor Levantado..."))