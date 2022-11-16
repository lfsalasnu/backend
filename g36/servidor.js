const express = require('express')
const app1 = express()
const port = 5005

const bodyParser=require('body-parser')
app1.use(bodyParser.json())
app1.use(bodyParser.urlencoded({extended:false}))

// Conexión Mongo
const mongoose = require('mongoose')
    //.connect('mongodb://localhost:27017/g_36')
        //.connect('mongodb://trueke:123456789abcd@ac-wfj5jiq-shard-00-00.py9ltpf.mongodb.net:27017,ac-wfj5jiq-shard-00-01.py9ltpf.mongodb.net:27017,ac-wfj5jiq-shard-00-02.py9ltpf.mongodb.net:27017/?ssl=true&replicaSet=atlas-i85vos-shard-0&authSource=admin&retryWrites=true&w=majority/trueke_g36')
mongoose
    .connect('mongodb+srv://trueke:123456789abcd@cluster0.py9ltpf.mongodb.net/trueke_g36')
    .then(() => console.log('conectado a la base de datos'))

// modelo
const datos = require('./Modelo/bd_g36')

//ruta
app1.get('/api2/:articulo', (req, res) => {
    let { articulo } = req.params
    datos
        .findOne({ articulo })
        .then(allCoasters => res.json(allCoasters))
})


let daton = {
    nombre: "Lamina Karim Benzema",
    descripcion: "Lamina Panini Qatar 2022 Francia Karim benzema",
    usuario: "Luis",
    valor: "Alto",
    cantidad: 1,
    imagen: "benzema.jpg"

}

let datonn = new datos(daton)

//nuevo
app1.get('/nuevo', (req, res) => {
    datonn.save()
    res.json(datonn)
})

app1.get('/borrar/:id', (req, res) => {
    let { id } = req.params
    datos
        .findByIdAndDelete(id)
        .then(res.send(`Id ${id} ha sido borrado`))
})

app1.get('/productos', (req, res) => { res.send('<h1>Hola!</h1>') })

const rutas=require('./router/rutas')
app1.use('/articulos',rutas)

app1.listen(port, () => { console.log(`Conexión puerto ${port}`) })   
