const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: {
        type: String,
        requied: true
    },
    categoriesId: {
        type: String,
        requied: true
    }
}, {
    timestamps: true
});

module.exports = model("Product", schema);