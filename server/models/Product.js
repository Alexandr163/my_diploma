const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      requied: true,
    },
    categoriesId: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", schema);
