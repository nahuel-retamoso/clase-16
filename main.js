const express = require('express')
const hbs = require('hbs')
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const ProductosApi = require('./knex.js')
const chat = require('./chatknex.js')

const productosApi = new ProductosApi()
const chatApi = new chat()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.set('view engine', hbs)
app.set('views', './views')




app.post('/productos', (req, res) => {

    const producto = productosApi.guardar(req.body)
    res.render('formulario', { producto })
})

app.get('/productos', (req, res) => {

    const productos = productosApi.listarAll()
    res.render('vista', { productos })
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

io.on('new-message', (data) => {
    const mensaje = chatApi.nuevoMensaje(data)
    io.emit('messages', mensaje)
});


server.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
});

server.on("error", error => console.log(`Error en servidor ${error}`));