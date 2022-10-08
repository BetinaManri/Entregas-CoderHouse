
import express from "express";
import Carrito from "../clases/Carrito.class.js";


const nombreDelArchivo = "Carritos";
const carrito = new Carrito(nombreDelArchivo);



const router = express.Router();

//2.a) Crea un carrito y devuelve su id.---------------------------------------------------------------------------------------------------
router.post("/", async (req, res) => {
    const carritoAgregado = await carrito.saveCart()
    res.json(carritoAgregado);
});

//2.b)Elimina carrito.----------------------------------------------------------------------------------------------------------------------

router.delete("/:id", async (req, res) => {
    let idEliminado = parseInt(req.params.id)
    const idBuscado = await carrito.getCartById(idEliminado)
    if (isNaN(idEliminado)) {
        res.json({ error: "400 El parametro no es un número" });
    } else {
        if (idBuscado === null) {
            res.json({ error: "404 El carrito que usted desea eliminar no existe" })
        } else {
            await carrito.deleteCartById(idEliminado)
            res.json(`201 Carrito con id: ${idEliminado} fue eliminado`);
        }
    }

});

//2.c)Me permite listar todos los productos guardados en el carrito.-----------------------------------------------------------------------------

router.get("/", async (req, res) => {
    const todosLosCarritos=await carrito.getAllCart()
    if (todosLosCarritos==null){
        res.json({ error: "404 No existen carritos" })
    }else{
        res.json({ Carritos: todosLosCarritos });
    }
    
});


router.get("/:id", async (req, res) => {
    const carritos = req.params.id
    const carritosPorID = await carrito.getCartById(carritos)
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
    const respuesta = await carrito.saveProductInCart(productoAgregado, carritoAAgregarProd)
    if (isNaN(productoAgregado) || isNaN(carritoAAgregarProd)) {
        res.json({ error: "401 El parametro no es un número" });
    } else {
        if (respuesta == null) {
            res.json({ error: "404 Carrito o producto no encontrado" })
        } else {
            res.json(`201 Producto con id: ${productoAgregado} fue agregado al carrito ${carritoAAgregarProd} `)
        }

    }
});


//2.c)Eliminar un producto del carrito por su id de carrito y de producto

router.delete("/:id/productos/:idPrd", async (req, res) => {
    const productoEliminado = parseInt(req.params.idPrd);
    const carritoActualizado = parseInt(req.params.id);
    const contenidoSinProducto = await carrito.deleteProductByID(carritoActualizado, productoEliminado);
    console.log(contenidoSinProducto)
    if (isNaN(productoEliminado) || isNaN(carritoActualizado)) { 
        res.json({ error: "401 El parametro no es un número" });
    } else {
        if (contenidoSinProducto === null) {
            res.json({ error: "404 Carrito o producto no encontrado" })
        } else {
            res.json(`201 Producto con id: ${productoEliminado} del carrito ${carritoActualizado} fue eliminado`)
        }

    }
    
})




export default router;

