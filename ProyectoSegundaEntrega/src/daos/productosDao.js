import mongoose from "mongoose"
import ProductModel from "../models/productModel.js";
import mongoDBUrl from "./config.js";


export default class Productos {
    //aqui dejo un espacio de almacenaje con el nombre que traigo por nombredelarchivo
    constructor() {
        this.url = mongoDBUrl;
        this.mongodb= mongoose.connect
    }

    //save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado
    async saveProd(prod) {
        try {
            await this.mongodb(this.url);
            const newProduct = new ProductModel(prod);
            newProduct.timeStamp = Date.now();
            return await newProduct.save();
        }catch (error) {
            console.log(error);
            return false
        }
    }

    //getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(id) {
        try {
            await this.mongodb(this.url)
            return await ProductModel.findById(id)
        } catch (error) {
            console.log(error);
            return false
        }
    }


    //Devuleve todos los productos de la base
    async getAll() {
        try {
            await this.mongodb(this.url)
            return await ProductModel.find()
        }
        catch (error) {
            console.log(error);
            return false
        }
    }

    //deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
    async deleteById(idEliminado) {
        try {
            await this.mongodb(this.url)
            return await ProductModel.findByIdAndDelete(idEliminado)
        } catch (error) {
            console.log(error);
            return false
        }
    }
    // updateByID actualiza un objeto obtenido por su id
    async updateById(idAActualizar, update) {
        try {
            await this.mongodb(this.url)
            return await ProductModel.findByIdAndUpdate(idAActualizar,update)
        } catch (error) {
            console.log(error);
            return false
        }
    }
}

