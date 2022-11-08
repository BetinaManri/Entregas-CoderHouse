const Productos = require('../api/productos.js');
const ContenedorBD = require('../models/ContendeorBD.js');
const express = require("express");
const router = express.Router();

const bdCont = new ContenedorBD('productos');
const productos = new Productos();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));



router.get("/productos/list", async (req, res) => {
    try {
        const lista = await bdCont.getAll();
        return res.status(200).json({ lista });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});


router.get("/productos/list/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id == undefined) {
            return res.status(400).json({ error: 'El id ingresado no es válido.' });
        } else {
            const resultado = await bdCont.getById(id);
            if (resultado === undefined || resultado.length == 0) {
                return res.status(404).json({ error: 'El id ingresado no existe.' });
            } else {
                return res.status(200).json({ resultado });
            }
        }
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});


router.post("/productos/save", async (req, res) => {
    try {
        let producto = req.body;
        await bdCont.save(producto);
        //res.redirect('/');
        return res.status(200).send({ response: `El producto fue agregado con éxito.` });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});


router.put("/productos/update/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id == undefined) {
            return res.status(400).json({ error: 'El id ingresado no es válido.' });
        } else {
            let producto = req.body;
            if (producto) {
                await bdCont.update(producto, id);
                return res.status(201).json({ producto });
            } else {
                return res.status(400).send({ error: 'El id especificado no existe.' });
            }
        }
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});


router.delete("/productos/delete/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id == undefined) {
            return res.status(400).json({ error: 'El id ingresado no es válido.' });
        } else {
            const resultado = await bdCont.getById(id);
            if (resultado.length > 0) {
                await bdCont.deleteById(id);
                return res.status(201).json(`El producto fue eliminado.`);
            } else {
                return res.status(400).json({ error: 'El id especificado no existe.' });
            }
        }
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

router.get('*', (req, res) => {
    try {
        res.status(404).render('404', {
            titulo: '404 - algo salió mal..',
            info: 'La URL especificada no se encuentra en este servidor.'
        });
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
});

module.exports = { router };



