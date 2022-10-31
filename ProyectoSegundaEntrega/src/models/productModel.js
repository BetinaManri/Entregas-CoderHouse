import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    precio: {type: Number, required: true},
    stock: {type: Number, required: true},
    descripcion: {type: String},
    foto: {type: String, required: true},
    timeStamp: {type: Date, required: true}
})

const ProductModel= mongoose.model("products", productsSchema)

export default ProductModel