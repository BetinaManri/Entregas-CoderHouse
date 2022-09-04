const express = require("express");
const app = express();
const PORT = 8080

const Contenedor = require("./Clase");
const nombreDelArchivo = "Productos";
const cont = new Contenedor(nombreDelArchivo);

const server = app.listen(PORT, () => {
    console.log("servidor iniciado")
});

app.get('/', (req, resp) => {
    resp.send("Bienvenido");
});

app.get('/productos', async (req, resp) => {
    const listaProductos = await cont.getAll();
    resp.send(listaProductos);
});

app.get('/productoRandom', async (req, resp) => {
    let random = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    const prodRandom = await cont.getById(random);
    resp.send(prodRandom);
});
