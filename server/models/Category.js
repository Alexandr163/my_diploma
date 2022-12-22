const { Schema, model } = require("mongoose");

const schema = new Schema({
    title: {
        type: String,
        requied: true
    },
}, {
    timestamps: true
});

module.exports = model("Category", schema);