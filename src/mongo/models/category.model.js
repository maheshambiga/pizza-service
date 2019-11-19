import {Schema} from 'mongoose';
import mongoose from "mongoose";

export const CategorySchema = new Schema({
    id: String,
    name: {
        type: String,
        minLength: 5,
        maxLength: 20,
        required: true
    }
});

export default mongoose.model('Category', CategorySchema);
