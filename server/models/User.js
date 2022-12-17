const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      requied: true,
    },
    email: {
      type: String,
      requied: true,
    },
    password: {
      type: String,
      requied: true,
    },
    phoneNumber: {
      type: Number,
      requied: true,
    },
    sex: {
      type: String,
      enum: ["male", "female", "other"],
      requied: true,
    },
    adminStatus: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
