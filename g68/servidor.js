const express = require('express')

const app1 = express()
const port = 5005

//mongodb

const mongoose = require('mongoose')
const Esquema = require('./modelo_bd')
mongoose
    .connect('mongodb://localhost:27017/g_68')
    .then(() => console.log('Conectado a la base de datos'))

//modelo
const Esquemas = require('./modelo_bd')


app1.get('/todo', (req, res) => {
    Esquemas
        .find({})
        .then(datos => res.json(datos))
})

app1.get('/pedido/:id_articulo', (req, res) => {
    const { id_articulo } = req.params

    Esquemas
        .findOne({ usuario: id_articulo })
        .then(dato => res.json(dato))

    //res.send('<h1>Id no encontrado</h1>')
})

const nuevo_art = {
    nombre: "Lamina Neymar",
    descripcion: "Lamina panini Qatar 2022 Brasil Neymar",
    cantidad: 2,
    valor: "Alto",
    usuario: "Fernando",
    imagen: "/Recursos/neymar.jpg"
}

const art=new Esquemas(nuevo_art)

app1.post('/nuevo5', function (req, res){
    let body =req.body;
    //art.save()
    res.json(body)})

app1.get('/productos', (req, res) => res.json({
    nombre: "Libro Cien años de soledad",
    autor: "Gabriel Garcia Marquez",
    an: 1967,
    descripcion: "Cien años de soledad es una novela del escritor colombiano Gabriel García Márquez, ganador del Premio Nobel de Literatura en 1982. Es considerada una obra maestra de la literatura hispanoamericana y universal, así como una de las obras más traducidas y leídas en español"
}))

app1.get("/nuevo", (req, res) => res.json({
    nombres: "Luis Fernando",
    apellidos: "Salas Nunez",
    edad: 29,
    ciudad: "Bogotá"
}))

app1.listen(port, () => console.log('Servidor levantado'))