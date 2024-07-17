"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersValidation = void 0;
const zod_1 = require("zod");
const productDetailsSchema = zod_1.z.object({
    productId: zod_1.z.string(),
    name: zod_1.z.string(),
    category: zod_1.z.string(),
    quantity: zod_1.z.number(),
    price: zod_1.z.number(),
    image: zod_1.z.string()
});
const createOrderValidation = zod_1.z.object({
    body: zod_1.z.object({
        userName: zod_1.z.string(),
        userEmail: zod_1.z.string().email(),
        phone: zod_1.z.number(),
        address: zod_1.z.string(),
        products: zod_1.z.array(productDetailsSchema),
    })
});
exports.OrdersValidation = {
    createOrderValidation,
};
