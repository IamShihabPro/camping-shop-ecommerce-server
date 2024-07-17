"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
// const variantSchema = new Schema<TVariant>({
//   image: { type: String},
// });
const inventorySchema = new mongoose_1.Schema({
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
});
const ratingsSchema = new mongoose_1.Schema({
    // email: { type: String, required: true },
    rating: { type: Number, required: true },
    // comment: { type: String },
});
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    // tags: { type: [String], required: true },
    // variants: { type: [variantSchema], required: true },
    inventory: { type: inventorySchema, required: true },
    image: { type: String, required: true },
    ratings: { type: [ratingsSchema] },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true,
});
const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
const capitalizeWords = (str) => {
    return str.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
};
productSchema.pre('save', function (next) {
    this.name = capitalizeWords(this.name);
    this.category = capitalizeFirstLetter(this.category);
    next();
});
// Middleware to exclude deleted cars
productSchema.pre('find', function (next) {
    this.where({ isDeleted: { $ne: true } });
    next();
});
productSchema.pre('findOne', function (next) {
    this.where({ isDeleted: { $ne: true } });
    next();
});
exports.Product = (0, mongoose_1.model)('Product', productSchema);
