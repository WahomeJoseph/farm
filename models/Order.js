import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: false },
    userEmail: { type: String, required: false },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    shippingInfo: {
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        address: { type: String },
    },
    total: { type: Number, required: true },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);