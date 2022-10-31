import express from "express";
import Carrito from "../daos/carritosDao.js";


const carrito = new Carrito();

const router = express.Router();

//2.a) Crea un carrito y devuelve su id.---------------------------------------------------------------------------------------------------
router.post("/", async (req, res) => {
    try {
        const cartcreated= await carrito.saveCart()
        cartcreated == false ?
            res.status(400).send({ error: 'No fue posible crear el carrito' }) :
            res.status(201).send({ response: "Carrito creado." });
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
});

//2.b)Elimina carrito.----------------------------------------------------------------------------------------------------------------------

router.delete("/:id", async (req, res) => {
    try {
        const cartDeleted= await carrito.deleteCartById(req.params.id)
        cartDeleted == false ?
            res.status(404).send({ error: 'El carrito que desea eliminar no existe' }) :
            res.status(200).send({ response: 'Carrito eliminado ' });
    } catch (error) {
        res.status(500).send({ error: error.message })
    }

});

//2.c)Me permite listar todos los productos guardados en el carrito.-----------------------------------------------------------------------------

router.get("/", async (req, res) => {
    try {
        const allCarts =await carrito.getAllCart()
        allCarts == false ?
            res.status(404).send({ error: 'No hay carritos en la base.' }) :
            res.status(200).send({ response: allCarts });
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
});


router.get("/:id", async (req, res) => {
    try {
        const cartId = await carrito.getCartById(req.params.id)
        cartId == false ?
            res.status(404).send({ error: 'El carrito que suted busca no existe.' }) :
            res.status(200).send({ response: cartId });
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
});

//2.d)Para incorporar productos al carrito por su id de producto.-----------------------------------------------------------------------------
router.post("/:id/productos/:idPrd", async (req, res) => {
    try {
        const addProdToCart= await carrito.saveProductInCart(req.params.id, req.params.idPrd)
        addProdToCart == false ?
            res.status(404).send({ error: 'No fue posible agregar el producto al carrito.' }) :
            res.status(201).send({ response: 'El producto fue añadido al carrito.' });
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
});


//2.c)Eliminar un producto del carrito por su id de carrito y de producto.-------------------------------------------------------------------

router.delete("/:id/productos/:idPrd", async (req, res) => {
    try {
        const prodDeleted = await carrito.deleteProductByID(req.params.id, req.params.idPrd);
        prodDeleted == false ?
            res.status(404).send({ error: 'No fue posible eliminar el producto del carrito.' }) :
            res.status(200).send({ response: 'Producto eliminado del carrito. ' });
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})


export default router;

