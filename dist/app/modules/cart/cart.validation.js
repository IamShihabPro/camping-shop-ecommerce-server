"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartValidations = void 0;
const zod_1 = require("zod");
const createCartValidation = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string(),
        // price: z.number(),
        // image: z.string(),
        // quantity: z.number(),
    })
});
const updateCartValidation = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        image: zod_1.z.string().optional(),
        quantity: zod_1.z.number().optional(),
    })
});
exports.CartValidations = {
    createCartValidation,
    updateCartValidation
};
