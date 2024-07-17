"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const productDetailsSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
});
const orderSchema = new mongoose_1.Schema({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    products: { type: [productDetailsSchema], required: true },
    totalCost: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true,
});
const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
orderSchema.pre('save', function (next) {
    this.userName = capitalizeFirstLetter(this.userName);
    next();
});
// Middleware to exclude deleted cars
orderSchema.pre('find', function (next) {
    this.where({ isDeleted: { $ne: true } });
    next();
});
orderSchema.pre('findOne', function (next) {
    this.where({ isDeleted: { $ne: true } });
    next();
});
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
