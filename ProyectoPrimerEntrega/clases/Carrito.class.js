import Productos from "./Producto.class.js";
import fs from "fs";


export default class Carrito {
    //aqui dejo un espacio de almacenaje con el nombre que traigo por nombredelarchivo
    constructor(nombreDelArchivo) {
        this.nombreDelArchivo = `./${nombreDelArchivo}.txt`;
        this.productos = new Productos("Productos");


    }

    //save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado
    async saveCart() {
        try {
            const carr = { id: this.id, timeStamp: Date.now(), productos: [] };
            if (!fs.existsSync(this.nombreDelArchivo)) {
                carr.id = 1;
                await fs.promises.writeFile(this.nombreDelArchivo, JSON.stringify([carr], null, 2));
                return carr.id;
            } else {
                const contenido = await this.getAllCart();
                if (contenido.lengt < 1) {
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
            throw new Error(error);
        }
    }

    //deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
    async deleteCartById(idEliminado) {
        try {
            if (this.getCartById(idEliminado) != null) {
                const contenido = await this.getAllCart();
                const carritosSinElEliminado = contenido.filter(carr => carr.id !== idEliminado);
                await fs.promises.writeFile(this.nombreDelArchivo, JSON.stringify(carritosSinElEliminado, null, 2));
            } else {
                return null
            }

        } catch (error) {
            throw new Error(`Existe un error en la función "deleteById": verificar el valor ingresado`);
        }
    }

    //getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    async getAllCart() {
        try {
            if (fs.existsSync(this.nombreDelArchivo)){
            const contenido = await fs.promises.readFile(this.nombreDelArchivo, "utf-8");
            if (contenido.length > 0) {
                const arreglo = JSON.parse(contenido);
                return arreglo;
            }
            else {
                return null;
            }
        }else{
            return null
        }
        }
        catch (error) {
            throw new Error(`Existe un error en la función "getAllCart": verificar el valor ingresado`);
        }
    }

    //getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getCartById(id) {
        try {
            const contenido = await this.getAllCart();
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

    async saveProductInCart(idProd, idCarrito) {
        try {
            const buscaId = await this.getCartById(idCarrito);
            let producto = await this.productos.getById(idProd);
            if (buscaId != null & producto != null) {
                const todosCarritos = await this.getAllCart();
                const listaSincarrito = todosCarritos.filter(carr => carr.id !== idCarrito);
                todosCarritos.forEach((carr) => {
                    if (carr.id == idCarrito) {
                        carr.productos.push(producto)
                        listaSincarrito.push(carr)
                        listaSincarrito.sort((a, b) => a.id - b.id)
                        fs.writeFileSync(this.nombreDelArchivo, JSON.stringify(listaSincarrito, null, 2))
                    }
                })
                return await this.getCartById(idCarrito)
            } else {
                return null
            }
        } catch (error) {
            throw new Error(error);
        }
    }


    // updateByID actualiza un objeto obtenido por su id
    async deleteProductByID(idCarr, idProd) {
        try {
            const buscaId = await this.getCartById(idCarr);
            let producto = await this.productos.getById(idProd);
            if (buscaId != null & producto != null) {
                const todosCarritos = await this.getAllCart();
                const listaSincarrito = todosCarritos.filter(carr => carr.id !== idCarr);
                todosCarritos.forEach((carr) => {
                    if (carr.id == idCarr) {
                        const prodModif = carr.productos.filter(productos => productos.id !== idProd);
                        carr.productos = prodModif
                        listaSincarrito.push(carr)
                        listaSincarrito.sort((a, b) => a.id - b.id)
                        fs.writeFileSync(this.nombreDelArchivo, JSON.stringify(listaSincarrito, null, 2))
                    }
                    
                })
                return await this.getCartById(idCarr);
            } else {
                return null
            }


        } catch (error) {
            throw new Error(error);
        }
    }

}


