import mongoose from "mongoose"
import mongoDBUrl from "./config.js";
import cartModel from "../models/cartModel.js";
import ProductModel from "../models/productModel.js";


export default class Carrito {

    constructor() {
        this.url = mongoDBUrl;
        this.mongodb= mongoose.connect
    }

    //Crea un carrito
    async saveCart() {
        try {
            await this.mongodb(this.url)
            const newCart = new cartModel()
            newCart.timeStamp = Date.now()
            return await newCart.save()
        }
        catch (error) {
            console.log(error);
            return false
        }
    }

    //Elimina carrito
    async deleteCartById(idEliminado) {
        try {
            await this.mongodb(this.url)
            return await cartModel.findByIdAndDelete(idEliminado)
        } catch (error) {
            console.log(error);
            return false
        }
    }

    //getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
    async getAllCart() {
        try {
            await this.mongodb(this.url)
            return await cartModel.find()
        }
        catch (error) {
            console.log(error);
            return false
        }
    }

    //getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getCartById(id) {
        try {
            await this.mongodb(this.url)
            return await cartModel.findById(id)
        } catch (error) {
            console.log(error);
            return false
        }

    }

    async saveProductInCart(idCarrito, idProd) {
        try {
            await this.mongodb(this.url);

            const productAdd = await ProductModel.findById(idProd);
            if (!productAdd) return false;

            const cartSearch = await cartModel.findById(idCarrito);
            if (!cartSearch) return false;

            return await cartModel.findByIdAndUpdate(cartSearch, { $push: { 'productos': productAdd } });
        } catch (error) {
            console.log(error);
            return false
        }
    }


    // updateByID actualiza un objeto obtenido por su id
    async deleteProductByID(idCarr, idProd) {
        try {
            await this.mongodb(this.url);

            const productDeleted = await ProductModel.findById(idProd);
            console.log(productDeleted)
            if (!productDeleted) return false;

            const cartSearch = await cartModel.findById(idCarr);
            if (!cartSearch) return false;

            return await cartModel.findByIdAndUpdate(cartSearch, { $pull: { 'productos': productDeleted } });

            
        } catch (error) {
            console.log(error);
            return false
        }
    }

}
