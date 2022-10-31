import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    timeStamp: Date,
    productos: []

})

const cartModel= mongoose.model("carts", carritoSchema)

export default cartModel