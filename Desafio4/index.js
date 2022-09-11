const { json } = require("express");
const express = require("express");
const app = express()
const PORT = 8080

const Contenedor = require("./Clase");
const nombreDelArchivo = "Productos";
const cont = new Contenedor(nombreDelArchivo);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const routerProductos = express.Router();

const server = app.listen(PORT, () => {
    console.log("servidor iniciado");
});

//GET '/api/productos' -> devuelve todos los productos
routerProductos.get("/", async (req, res) => {
    res.json({ Productos: await cont.getAll() });
});

//GET '/api/productos/:id' -> devuelve un producto según su id.
routerProductos.get("/:id", async (req, res) => {
    const productos = req.params.id
    const productosPorID = await cont.getById(productos)
    if (isNaN(productos)) {
        res.json({ error: "El parametro no es un número" });
    } else {
        productosPorID == ""  // es un ternario
            ? res.json({ error: "Producto no encontrado" })
            : res.json(productosPorID);
    }
});

//POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
routerProductos.post("/", async (req, res) => {
    const producto = req.body
    const productoAgregado = await cont.save(producto)
    res.json(productoAgregado);
});

//PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
routerProductos.put("/:id", async (req, res) => {
    let idAActualizar = parseInt(req.params.id);
    const producto = req.body;
    if (isNaN(idAActualizar)) {
        res.json({ error: "El parametro no es un número" });
    } else {
        const idBuscado = await cont.getById(idAActualizar)
        if (idBuscado == "") {
            res.json({ error: "El producto que usted desea eliminar no existe" })
        } else {
            res.json(await cont.updateById(idAActualizar, producto));
        }
    }
})

//DELETE '/api/productos/:id' -> elimina un producto según su id.
routerProductos.delete("/:id", async (req, res) => {
    let idEliminado = parseInt(req.params.id)
    const productoEliminado = await cont.deleteById(idEliminado)
    if (isNaN(idEliminado)) {
        res.json({ error: "El parametro no es un número" });
    } else {
        productoEliminado == null
            ? res.json({ error: "El producto que usted desea eliminar no existe" })
            : res.json(productoEliminado);
    }

});

app.use("/api/productos", routerProductos);