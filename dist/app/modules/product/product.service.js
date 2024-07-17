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
exports.ProductsServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const product_model_1 = require("./product.model");
const createProductsIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(payload);
    return result;
});
const getAllProductsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productSearchableFields = ['name', 'category', 'tags'];
    const productsQuery = new QueryBuilder_1.default(product_model_1.Product.find(), query)
        .search(productSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield productsQuery.modelQuery;
    return result;
});
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id);
    return result;
});
const updateProductIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteProductIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
const addRatings = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, { $push: { ratings: payload } }, { new: true });
    return result;
});
exports.ProductsServices = {
    createProductsIntoDB,
    getAllProductsFromDB,
    getSingleProduct,
    updateProductIntoDB,
    deleteProductIntoDB,
    addRatings
};
