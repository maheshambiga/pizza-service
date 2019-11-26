import { modelGenerator } from "../../utils";

export default modelGenerator({
  name: "Inventory",
  fields: {
    name: {
      type: String,
      required: true
    },
    categoryId: String,
    description: {
      type: String
    }
  }
});
