import {Schema} from 'mongoose';
import mongoose from "mongoose";

export const SizeSchema = new Schema({
    name: {
        type: String,
        enum: ['REGULAR', 'MEDIUM', 'LARGE'],
        required: true
    },
    price: {
        type: Number,
        required: true,
        validate: [limitPrice, '{PATH} cannot be equal to or less than zero']
    }

});

export function limitPrice(val) {
    return val > 0;
}

export default mongoose.model('Size', SizeSchema);
