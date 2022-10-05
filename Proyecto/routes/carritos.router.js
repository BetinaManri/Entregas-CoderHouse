/* const { json } = require("express");
const express = require("express");
const app = express() */
import express from "express";
import Carrito from "../clases/Carrito.class.js";

/* const Carrito = require("../clases/Carrito.class.js"); */
const nombreDelArchivo = "Carritos";
const carrito = new Carrito (nombreDelArchivo);



const router= express.Router();

//2.a) Crea un carrito y devuelve su id.---------------------------------------------------------------------------------------------------
router.post("/", async (req, res) => {
    const carritoAgregado = await carrito.save()
    res.json(carritoAgregado);
});

//2.b)Elimina carrito.----------------------------------------------------------------------------------------------------------------------

router.delete("/:id", async (req, res) => {
    let idEliminado = parseInt(req.params.id)
    const idBuscado = await carrito.getById(idEliminado)
    if (isNaN(idEliminado)) {
        res.json({ error: "400 El parametro no es un número" });
    } else {
        if (idBuscado === null) {
            res.json({ error: "404 El carrito que usted desea eliminar no existe" })
        } else {
            await carrito.deleteById(idEliminado)
            res.json(`201 Carrito con id: ${idEliminado} fue eliminado`);
        }
    }

});

//2.c)Me permite listar todos los productos guardados en el carrito.-----------------------------------------------------------------------------

router.get("/", async (req, res) => {
    res.json({ Carritos: await carrito.getAll() });
});


router.get("/:id", async (req, res) => {
    const carritos = req.params.id
    const carritosPorID = await carrito.getById(carritos)
    if (isNaN(carritos)) {
        res.json({ error: "401 El parametro no es un número" });
    } else {
        carritosPorID == null  // es un ternario
            ? res.json({ error: "404 Carrito no encontrado" })
            : res.json(carritosPorID);
    }
});

//2.d)Para incorporar productos al carrito por su id de producto.-----------------------------------------------------------------------------
router.post("/:id/productos/:idPrd", async (req, res) => {
    const productoAgregado = parseInt(req.params.idPrd);
    const carritoAAgregarProd = parseInt(req.params.id);
	const respuesta = await carrito.guardarProductoEnCarrito( productoAgregado, carritoAAgregarProd);
	res.json(respuesta);
});






router.put("/:id", async (req, res) => {
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




export default router;

