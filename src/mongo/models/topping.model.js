import mongoose, {Schema} from "mongoose";

const ToppingSchema = new Schema({
    name: {
        type: String,
        minLength: 5,
        maxLength: 20,
        required: true
    },
    categoryId: {
        type: Schema.ObjectId,
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

export default mongoose.model('Topping', ToppingSchema);
