import express from "express";
import Productos from "../daos/productosDao.js";

const product = new Productos();
const router = express.Router();


//Funcion para validar administrador
function validarAdmin(req, res, next) {
    if (req.query.admin) {
        next();
    } else {
        res.send("Usted no tiene acceso");
    }
}


//1.a) Me permite listar todos los productos disponibles ó un producto por su id.--------------------------------------------------------------ok
router.get("/", async (req, res) => {
    try {
        const products = await product.getAll()
        products == false ?
            res.status(404).send({ error: 'No existen productos en la base.' }) :
            res.status(200).send({ response: products });
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
});

router.get("/:id", async (req, res) => {
    try {
        const prodSearch = await product.getById(req.params.id)
        prodSearch == false ?
            res.status(404).send({ error: 'El producto buscado no existe en la base' }) :
            res.status(200).send({ response: prodSearch });
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
});


//1.b)Para incorporar productos al listado.------------------------------------------------------------------------------------------------

router.post("/", validarAdmin, async (req, res) => {
    try {
        const prodAdd = await product.saveProd(req.body)
        prodAdd == false ?
            res.status(400).send({ error: 'No fue posible agregar el producto: Formato incorrecto.' }) :
            res.status(201).send({ response: prodAdd });
    } catch (error) {
        res.status(500).send({ error: error.message })
    }

});

//1.c)Actualiza un producto por su id.----------------------------------------------------------------------------------------------------

router.put("/:id", validarAdmin, async (req, res) => {
    try {
        const productUpdate = await product.updateById(req.params.id, req.body)
        productUpdate == false ?
            res.status(400).send({ error: 'El producto que desea actualizar no existe' }) :
            res.status(201).send({ response: 'Producto actualizado.' });
    } catch (error) {
        res.status(500).send({ error: error.message })
    }

})

//1.d)Borra un producto por su id.--------------------------------------------------------------------------------------------------------

router.delete("/:id", validarAdmin, async (req, res) => {
    try {
        const prodDeleted= await product.deleteById(req.params.id)
        prodDeleted == false ?
            res.status(404).send({ error: 'El producto que desea eliminar no existe' }) :
            res.status(200).send({ response: 'Producto eliminado.' });
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
    
});

export default router;
