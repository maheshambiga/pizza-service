import { modelGenerator } from "../../utils";

export default modelGenerator({
  name: "Category",
  fields: {
    name: {
      type: String,
      required: true
    }
  }
});
