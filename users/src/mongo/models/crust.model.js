import {Schema} from 'mongoose';
import mongoose from "mongoose";

export const CrustSchema = new Schema({
    name: {
        type: String,
        minLength: 5,
        maxLength: 20,
        required: true
    }
});
/*schema.path('title').set(function (v) {
    this.slug = slugify(v);
    this._id = idify(this.slug);
    return v;
});
function slugify (v) {
    return (v || '').replace(/\s+/g, '')
}

function idify (v) {
    return 'mycustomid_' + v
}*/

export default mongoose.model('Crust', CrustSchema);
