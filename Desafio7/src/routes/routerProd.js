const express = require("express");
const router = express.Router();

const ContenedorProd = require("../models/classProd");
const dataBase = new ContenedorProd("productos");


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//Devuelve todos los productos
router.get("/", async (req, res) => {
    const productos = await dataBase.getAll();
    res.render("formulario", { productos });
});

router.get("/lista", async (req, res) => {
    const productos = await dataBase.getAll();
    res.status(200).json({ respuesta: productos });
});

//Devuelve un producto según su id.
router.get("/:id", async (req, res) => {
    const productoBuscado = req.params.id
    res.json(await dataBase.getById(productoBuscado))
});

//Recibe y agrega un producto, y lo devuelve con su id asignado.
router.post("/", async (req, res) => {
    const productoAgregado = req.body
    await dataBase.save(productoAgregado)
    res.redirect("/");
});

//Recibe y actualiza un producto según su id.
router.put("/:id", async (req, res) => {
    let idAActualizar = parseInt(req.params.id);
    const producto = req.body;
    if (isNaN(idAActualizar)) {
        res.json({ error: "400 El parametro no es un número" });
    } else {
        const idBuscado = await dataBase.getById(idAActualizar)
        if (idBuscado == null) {
            res.json({ error: "404 El producto que usted desea actualizar no existe" })
        } else {
            res.json(await dataBase.updateById(idAActualizar, producto));
        }
    }
})

//DELETE '/api/productos/:id' -> elimina un producto según su id.
router.delete("/:id", async (req, res) => {
    let idEliminado = parseInt(req.params.id)
    const idBuscado = await dataBase.getById(idEliminado)
    if (isNaN(idEliminado)) {
        res.json({ error: "400 El parametro no es un número" });
    } else {
        if (idBuscado === null) {
            res.json({ error: "404 El producto que usted desea eliminar no existe" })
        } else {
            await dataBase.deleteById(idEliminado)
            res.json(`201 Producto con id: ${idEliminado} fue eliminado`);
        }
    }
});

module.exports = router

