import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: false },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema)