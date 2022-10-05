/* const { json } = require("express");
const fs = require("fs");  */
import Productos from "./Producto.class.js";
/* const Productos = require("../clases/Producto.class.js"); */
import fs from "fs";

export default class Carrito {
    //aqui dejo un espacio de almacenaje con el nombre que traigo por nombredelarchivo
    constructor(nombreDelArchivo) {
        this.nombreDelArchivo = `./${nombreDelArchivo}.txt`;
        this.productos = new Productos("Productos");
        this.carritos = [];
           
    } 

    //save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado
    async save() {
        try {
            const carr = { id: this.id, timeStamp: Date.now(), productos: [] };
            if (!fs.existsSync(this.nombreDelArchivo)) {
                carr.id = 1;
                await fs.promises.writeFile(this.nombreDelArchivo, JSON.stringify([carr], null, 2));
                return carr.id;
            } else {
                const contenido = await this.getAll();   
                if (contenido.lengt<1) {
                    carr.id = 1;
                    await fs.promises.appendFile(this.nombreDelArchivo, JSON.stringify([carr], null, 2));
                    return carr.id;
                } else {
                    const indice = contenido.sort((a, b) => b.id - a.id)[0].id; 
                    carr.id = indice + 1
                    contenido.push(carr);   
                    contenido.sort((a, b) => a.id - b.id) //vulevo a ordenar para que quede bien el txt
                    await fs.promises.writeFile(this.nombreDelArchivo, JSON.stringify(contenido, null, 2));
                    return carr.id;
                }
               
            }
        }
        catch (error) {
            throw new Error (error);
        }
    }

    //deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
    async deleteById(idEliminado) {
        try {
            if(this.getById(idEliminado)!= null){
                const contenido = await this.getAll();
                const carritosSinElEliminado = contenido.filter(carr => carr.id !== idEliminado);
                await fs.promises.writeFile(this.nombreDelArchivo, JSON.stringify(carritosSinElEliminado, null, 2));
            }else {
                return null
            }
          
        } catch (error) {
            throw new Error (`Existe un error en la función "deleteById": verificar el valor ingresado`);
        } 
    }

        //getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
        async getAll() {
            try {
                const contenido = await fs.promises.readFile(this.nombreDelArchivo, "utf-8");
                if (contenido.length > 0) {
                    const arreglo = JSON.parse(contenido);
                    return arreglo;
                }
                else {
                    return [];
                }
            }
            catch (error) {
                throw new Error (`Existe un error en la función "getAll": verificar el valor ingresado`);
            }
        }    

    //getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(id) {
        try {
            const contenido = await this.getAll();
            const carr = contenido.find(carr => carr.id == id);
            if (carr) {
                return carr;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(`Existe un error en la función "getById": verificar el valor ingresado`);
        }

    }

    async guardarProductoEnCarrito(idProd, idCarrito) {
        try {
            let producto = await this.productos.getById(idProd);
            const todosCarritos= await this.getAll();
            todosCarritos.forEach((carr) => {
			if(carr.id == idCarrito){
                carr.productos.push(producto)
                fs.writeFileSync(this.nombreDelArchivo, JSON.stringify(carr, null, 2))
            }
				null;
		});
		           
        } catch (error) {
            throw new Error(error);
        }
		

	}









    
    // updateByID actualiza un objeto obtenido por su id
    async updateById(idAActualizar, update) {
                 
            try {
                await this.deleteById(idAActualizar);
                const contenido = await this.getAll();
                update.id = idAActualizar;
                contenido.push(update);   
                contenido.sort((a, b) => a.id - b.id);
                await fs.promises.writeFile(this.nombreDelArchivo, JSON.stringify(contenido, null, 2));          
               
            } catch (error) {
                throw new Error (`Existe un error en la función "updateById": verificar el valor ingresado`);
            } 
    }   
}

/* module.exports = Carrito */