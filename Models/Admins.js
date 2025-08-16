const { Schema, model } = require("mongoose");

const adminSchema = new Schema({
    userId: {
        type: String,
        required: true
    }
});

module.exports = model('Admin', adminSchema);