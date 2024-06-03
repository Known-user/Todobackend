import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        select: false,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const user = mongoose.model("users",userSchema);
