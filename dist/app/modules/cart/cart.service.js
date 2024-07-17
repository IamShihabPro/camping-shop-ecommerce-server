"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartsServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = require("../product/product.model");
const cart_model_1 = require("./cart.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createCartsIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(payload.productId);
    if (!product) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product not found!!");
    }
    if (product.inventory.quantity < payload.quantity) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Insufficient quantity');
    }
    payload.name = product.name;
    payload.category = product.category;
    payload.price = product.price;
    payload.image = product.image;
    payload.quantity = payload.quantity || 1;
    const existingCartItem = yield cart_model_1.Cart.findOne({ productId: payload.productId });
    if (existingCartItem) {
        existingCartItem.quantity += payload.quantity;
        existingCartItem.price = product.price;
        existingCartItem.image = product.image;
        yield existingCartItem.save();
        return existingCartItem;
    }
    else {
        const result = yield cart_model_1.Cart.create(payload);
        return result;
    }
});
const getAllCartsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const cartSearchableFields = ['price'];
    const cartsQuery = new QueryBuilder_1.default(cart_model_1.Cart.find(), query)
        .search(cartSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield cartsQuery.modelQuery;
    return result;
});
const getSingleCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.Cart.findById(id);
    return result;
});
const updateCartIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.Cart.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteCartIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.Cart.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
exports.CartsServices = {
    createCartsIntoDB,
    getAllCartsFromDB,
    getSingleCart,
    updateCartIntoDB,
    deleteCartIntoDB
};
