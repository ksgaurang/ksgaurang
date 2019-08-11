import {Schema, model} from "mongoose";

const todoSchema = new Schema({
    userId:{
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 50
    },
    completed:{
        type: Boolean,
        default: false
    }
});

export const todoModel = model('todo', todoSchema);