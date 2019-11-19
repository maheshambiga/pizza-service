import mongoose, {Schema} from 'mongoose';
import {CrustSchema}from './crust.model';
import {CategorySchema} from './category.model';
import {ProductSkuSchema} from './productSku.model';
import {SizeSchema, limitPrice} from './size.model';
const PizzaSchema = Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 300
    },
    categoryId: {
        type: Schema.ObjectId,
        required: true
    },
    toppings: {
        type: [String],
        validate: [toppingsLimit, '{PATH} exceeds the limit of 10']
    },
    skus:  {
        type: [ProductSkuSchema],
        required: false,
        default: []
    }
});

function toppingsLimit(val) {
    return val.length <= 10;
}
export default mongoose.model('Pizza', PizzaSchema);
