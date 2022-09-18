const { json } = require("express");
const express = require("express");
const app = express()
const PORT = 8080
const pug = require("pug");

const Contenedor = require("./api/Clase");
const nombreDelArchivo = "Productos";
const cont = new Contenedor(nombreDelArchivo);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "pug");
app.set("views", "./views");
/* app.use(express.static("public")); */

const routerProductos = express.Router();
const productos= [];

const server = app.listen(PORT, () => {
    console.log("servidor iniciado");
});

//GET '/api/productos' -> devuelve todos los productos
routerProductos.get("/", async (req, res) => {
   /*  res.json({ Productos: await cont.getAll() }); */
    res.render("formulario", {productos});
});

//GET '/api/productos/:id' -> devuelve un producto según su id.
routerProductos.get("/:id", async (req, res) => {
    const productos = req.params.id
    const productosPorID = await cont.getById(productos)
    if (isNaN(productos)) {
        res.json({ error: "401 El parametro no es un número" });
    } else {
        productosPorID == null  
            ? res.json({ error: "404 Producto no encontrado" })
            : res.json(productosPorID);
    }
});

//POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
routerProductos.post("/", async (req, res) => {
    const producto = req.body
    await cont.save(producto)
    /* res.json(productoAgregado); */
   /*  res.redirect("/"); */
    res.render("formulario",{productos})
});

//PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
routerProductos.put("/:id", async (req, res) => {
    let idAActualizar = parseInt(req.params.id);
    const producto = req.body;
    if (isNaN(idAActualizar)) {
        res.json({ error: "400 El parametro no es un número" });
    } else {
        const idBuscado = await cont.getById(idAActualizar)
        if (idBuscado == "") {
            res.json({ error: "404 El producto que usted desea actualizar no existe" })
        } else {
            res.json(await cont.updateById(idAActualizar, producto));
        }
    }
})

//DELETE '/api/productos/:id' -> elimina un producto según su id.
routerProductos.delete("/:id", async (req, res) => {
    let idEliminado = parseInt(req.params.id)
    const idBuscado = await cont.getById(idEliminado)
    if (isNaN(idEliminado)) {
        res.json({ error: "400 El parametro no es un número" });
    } else {
        if (idBuscado === null) {
            res.json({ error: "404 El producto que usted desea eliminar no existe" })
        } else {
            await cont.deleteById(idEliminado)
            res.json(`201 Producto con id: ${idEliminado} fue eliminado`);
        }
    }
});

routerProductos.get("/lista/ver", async (req,res)=>{
    let productos = await cont.getAll();
    res.render("detalle", {productos});
    });

app.use("/api/productos", routerProductos);