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
exports.OrdersServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const mongoose_1 = require("mongoose");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createOrderIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check for each product's existence and available quantity
    const products = yield Promise.all(payload.products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
        // Ensure productId is a valid ObjectId
        if (!mongoose_1.Types.ObjectId.isValid(product.productId)) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Invalid product ID: ${product.productId}`);
        }
        const foundProduct = yield product_model_1.Product.findById(product.productId);
        if (!foundProduct) {
            console.error(`Product Not Found: ${product.productId}`);
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product Not Found!');
        }
        console.log(`Found Product: ${foundProduct.name}, Inventory: ${foundProduct.inventory.quantity}`);
        if (foundProduct.inventory.quantity < product.quantity) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Insufficient quantity for product ${foundProduct.name}`);
        }
        // Optionally, reduce the inventory quantity of the found product
        foundProduct.inventory.quantity -= product.quantity;
        yield foundProduct.save();
        return Object.assign(Object.assign({}, product), { name: foundProduct.name, category: foundProduct.category, price: foundProduct.price, image: foundProduct.image });
    })));
    // Calculate the total cost
    const totalCost = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    // Create the order with the validated products and calculated totalCost
    const order = new order_model_1.Order(Object.assign(Object.assign({}, payload), { products, totalCost }));
    yield order.save();
    return order;
});
const getAllOrdersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const orderSearchableFields = ['userName', 'userEmail'];
    const ordersQuery = new QueryBuilder_1.default(order_model_1.Order.find(), query)
        .search(orderSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield ordersQuery.modelQuery;
    return result;
});
exports.OrdersServices = {
    createOrderIntoDB,
    getAllOrdersFromDB
};
