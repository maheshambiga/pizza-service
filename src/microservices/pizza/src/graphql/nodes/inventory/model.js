import { Schema } from "mongoose";
import { modelGenerator } from "../../utils";

export default modelGenerator({
  name: "Inventory",
  fields: {
    name: {
      type: String,
      required: true
    },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    description: String
  }
});
