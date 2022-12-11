const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    categoriesId: { type: Schema.Types.ObjectId, ref: "Category" },
    title: {
      type: String,
      requied: true,
    },
    description: {
      type: String,
      requied: true
    },
    image: {
      type: String,
      requied: true
    },
    price: {
      type: Number,
      requied: true
    }
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", schema);
