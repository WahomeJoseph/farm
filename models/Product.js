import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: {
        type: String,
        enum: ["Piglets", "Gilts", "Boars", "Sows", "Manure"],
        required: true
    },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    weight: {type: String, required: true},
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models?.Product || mongoose.model("Product", ProductSchema);