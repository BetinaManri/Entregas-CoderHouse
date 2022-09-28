const { json } = require("express");
const fs = require("fs");



class Contenedor {
    //aqui dejo un espacio de almacenaje con el nombre que traigo por nombredelarchivo
    constructor(nombreDelArchivo) {
        this.nombreDelArchivo = `./${nombreDelArchivo}.txt`;
    }

    //save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado
    async save(prod) {
        try {

            if (!fs.existsSync(this.nombreDelArchivo)) {
                prod.id = 1;
                await fs.promises.writeFile(this.nombreDelArchivo, JSON.stringify([prod], null, 2));
                return prod;
            } else {
                const contenido = await this.getAll();
                if (contenido.lengt < 1) {
                    prod.id = 1;
                    await fs.promises.appendFile(this.nombreDelArchivo, JSON.stringify([prod], null, 2));
                    return prod;
                } else {
                    const indice = contenido.sort((a, b) => b.id - a.id)[0].id;
                    prod.id = indice + 1
                    contenido.push(prod);
                    contenido.sort((a, b) => a.id - b.id) //vulevo a ordenar para que quede bien el txt
                    await fs.promises.writeFile(this.nombreDelArchivo, JSON.stringify(contenido, null, 2));
                    return prod;
                }

            }
        }
        catch (error) {
            throw new Error(`Existe un error en la función "save": verificar el valor ingresado`);
        }
    }

    

    //getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(id) {
        try {
            const contenido = await this.getAll();
            const prod = contenido.find(prod => prod.id == id);
            if (prod) {
                return prod;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(`Existe un error en la función "getById": verificar el valor ingresado`);
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
            throw new Error(`Existe un error en la función "getById": verificar el valor ingresado`);
        }
    }

    //deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
    async deleteById(idEliminado) {
        try {
            if (this.getById(idEliminado) !== null) {
                const contenido = await this.getAll();
                const listaSinProducto = contenido.filter(prod => prod.id !== idEliminado);
                await fs.promises.writeFile(this.nombreDelArchivo, JSON.stringify(listaSinProducto, null, 2));
            } else {
                return null
            }

        } catch (error) {
            throw new Error(`Existe un error en la función "deleteById": verificar el valor ingresado`);
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
            throw new Error(`Existe un error en la función "updateById": verificar el valor ingresado`);
        }
    }

    async saveMensaje(mensajes) {
        try {

            if (!fs.existsSync(this.nombreDelArchivo)) {
                await fs.promises.writeFile(this.nombreDelArchivo, JSON.stringify(mensajes, null, 2));
            } else {           
                    await fs.promises.writeFile(this.nombreDelArchivo, JSON.stringify(mensajes, null, 2));            
                }
        }
        catch (error) {
            throw new Error(`Existe un error en la función "save": verificar el valor ingresado`);
        }
    }



}

module.exports = Contenedor