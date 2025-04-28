import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    type: {
        type: String, required: true,
        enum: ["inquiry", "tour"],
        default: "inquiry"
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    message: { type: String, required: true },
    tourDate: { type: Date, required: false },
    visitors: { type: Number, required: false },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);