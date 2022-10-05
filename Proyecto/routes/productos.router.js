/* const { json, Router } = require("express");
const express = require("express");
const app = express() */
import express from "express";
import Productos from "../clases/Producto.class.js";

/* const Productos = require("../clases/Producto.class.js"); */

const cont = new Productos("Productos");

const router = express.Router();

router.get("/", async (req, res) => {
    res.json({ Productos: await cont.getAll() });
});


router.get("/:id", async (req, res) => {
        const productos = req.params.id
        const productosPorID = await cont.getById(productos)
    if (isNaN(productos)) {
                res.json({ error: "El parametro no es un número" })
        } else {
            productosPorID == ""  
            ? res.json({ error: "Producto no encontrado" })
            : res.json(productosPorID);
    }
});


router.post("/", async (req, res) => {
    const producto = req.body
    res.json(await cont.save(producto));
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

router.delete("/:id", async (req, res) => {
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

export default router;
