//Consigna: Implementar programa que contenga una clase llamada Contenedor que reciba el nombre del archivo con el que va a trabajar
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
                return prod.id;
            } else {
                const contenido = await this.getAll();   
                if (contenido.lengt<1) {
                    prod.id = 1;
                    await fs.promises.appendFile(this.nombreDelArchivo, JSON.stringify([prod], null, 2));
                    return prod.id;
                } else {
                    const indice = contenido.sort((a, b) => b.id - a.id)[0].id; 
                    prod.id = indice + 1
                    contenido.push(prod);   
                    contenido.sort((a, b) => a.id - b.id) //vulevo a ordenar para que quede bien el txt
                    await fs.promises.writeFile(this.nombreDelArchivo, JSON.stringify(contenido, null, 2));
                    return prod.id;
                }
               
            }
        }
        catch (error) {
            throw new Error (`Existe un error en la función "save": verificar el valor ingresado`);
        }
    }

    //getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(id) {
        try {
            const contenido = await this.getAll();
            let productoBuscado = contenido.filter(prod =>
                prod.id == id
            );
            if (productoBuscado.length<1){
                productoBuscado = null;
            } 
            return productoBuscado;

        } catch (error) {
            throw new Error (`Existe un error en la función "getById": verificar el valor ingresado`);
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

    //deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
    async deleteById(idEliminado) {
        try {
            const contenido = await this.getAll();
            const listaSinProducto = contenido.filter(prod => prod.id !== idEliminado);
            fs.promises.writeFile(this.nombreDelArchivo, JSON.stringify(listaSinProducto, null, 2));
        } catch (error) {
            throw new Error (`Existe un error en la función "deleteById": verificar el valor ingresado`);
        } 
    }

    //deleteAll(): void - Elimina todos los objetos presentes en el archivo. 
    //No uso el unlink ya que se especifica eliminar los objetos y no el archivo
    async deleteAll() {
        try {
            if (fs.existsSync(this.nombreDelArchivo)) {
                fs.promises.writeFile(this.nombreDelArchivo, "");                 
            } else {
                return (`Los artículos del archivo que usted desea eliminar no existen`);
            }
            
        } catch (error) {
            throw new Error (`Existe un error en la función "deleteAll": verificar el valor ingresado`);
        } 
    }

}


module.exports = Contenedor