const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    // name: {
    //   type: String,
    //   requied: true,
    // },
    email: {
      type: String,
      requied: true,
    },
    password: {
      type: String,
      requied: true,
    },
    data:Buffer
    // phoneNumber: {
    //   type: Number,
    //   requied: true,
    // },
    // avatar: String,
    // sex: {
    //   type: String,
    //   enum: ["male", "female", "other"],
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
