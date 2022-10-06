import express from "express";
import Productos from "../clases/Producto.class.js";

const cont = new Productos("Productos");
const router = express.Router();

function validarAdmin(req, res, next) {
	if (req.query.admin) {
		next();
	} else {
		res.send("Usted no tiene acceso");
	}
}


//1.a) Me permite listar todos los productos disponibles ó un producto por su id.--------------------------------------------------------------
router.get("/", async (req, res) => {
    res.json({ Productos: await cont.getAll() });
});

router.get("/:id", async (req, res) => {
        const productos = req.params.id
        const productosPorID = await cont.getById(productos)
    if (isNaN(productos)) {
                res.json({ error: "El parametro no es un número" })
        } else {
            productosPorID == null  
            ? res.json({ error: "Producto no encontrado" })
            : res.json(productosPorID);
    }
});

//1.b)Para incorporar productos al listado.------------------------------------------------------------------------------------------------

router.post("/",validarAdmin, async (req, res) => {
    const producto = req.body
    res.json(await cont.save(producto));
});   
 
//1.c)Actualiza un producto por su id.----------------------------------------------------------------------------------------------------

router.put("/:id",validarAdmin, async (req, res) => {
    let idAActualizar = parseInt(req.params.id);
    const producto = req.body;
    if (isNaN(idAActualizar)) {
        res.json({ error: "El parametro no es un número" });
    } else {
        const idBuscado = await cont.getById(idAActualizar)
        if (idBuscado == null) {
            res.json({ error: "El producto que usted desea actualizar no existe" })
        } else {
            res.json(await cont.updateById(idAActualizar, producto));
        }
    }
})

//1.d)Borra un producto por su id.--------------------------------------------------------------------------------------------------------

router.delete("/:id",validarAdmin, async (req, res) => {
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
