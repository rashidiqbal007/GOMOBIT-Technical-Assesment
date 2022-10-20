const mongoose = require("mongoose")

const mobuserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    CellNo: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: String,
        default: 'false',
    }




}, {
    timestamps: true
})

const mobuserModel = mongoose.model('mobusers', mobuserSchema);
module.exports = mobuserModel;