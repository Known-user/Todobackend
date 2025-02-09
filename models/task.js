import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    editedAt: {
        type: Date,
        default: Date.now
    }
});

export const task = mongoose.model("Task",taskSchema);
