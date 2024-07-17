"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true,
});
// Middleware to exclude deleted cars
cartSchema.pre('find', function (next) {
    this.where({ isDeleted: { $ne: true } });
    next();
});
cartSchema.pre('findOne', function (next) {
    this.where({ isDeleted: { $ne: true } });
    next();
});
exports.Cart = (0, mongoose_1.model)('Cart', cartSchema);
