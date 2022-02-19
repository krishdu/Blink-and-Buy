const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter product Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please Enter product Description"],
        maxlength: [100, "description cannot exceed 100 characted"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"],
        maxlength: [8, "Price cannot exceed 8 figure"]
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        required: [true, "Please enter product category"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxlength: [4, "Stock cannot exceed 4 figure"],
        default: 1
    },
    numOfReviews: {
        typr: Number,
        default: 0
    },
    reviews: [
        {
            name:{
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type:String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports  = mongoose.model("Product", productSchema);