const { Schema, model } = require("mongoose");

const schema = new Schema({
    name: {
        type: String,
        requied: true
    },
    email: {
        type: String,
        requied: true,
        unique: true
    },
    password: {
        type: String,
        requied: true
    },
    avatar: String
}, {
    timestamps: true
});

module.exports = model("Admin", schema);