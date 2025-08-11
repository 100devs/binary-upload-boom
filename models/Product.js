const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productTitle: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        require: true,
    },
    productDescription: {
        type: String,
        require: true,
    },
    cloudinaryId: {
        type: String,
        require: true
    },
    ratings: {
        type: [Number],
        default: []
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company1",
    },
    companyName: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model("Product", ProductSchema)