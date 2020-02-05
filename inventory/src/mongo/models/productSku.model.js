import mongoose, {Schema} from 'mongoose';
import uuidv4 from 'uuid/v4';
export const ProductSkuSchema = new Schema({
    size: {
        type: String,
        enum: ['REGULAR', 'MEDIUM', 'LARGE'],
        required: true
    },
    sizeId: {
        type:  String,
        default: uuidv4
    },
    crust: {
        type: String,
        required: true
    },
    crustId: {
        type:  String,
        default: uuidv4
    },
    price: {
        type: Number,
        required: true
    }
});


export default mongoose.model('ProductSKU', ProductSkuSchema);
