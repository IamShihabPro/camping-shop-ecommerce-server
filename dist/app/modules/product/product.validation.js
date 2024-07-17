"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsValidation = void 0;
const zod_1 = require("zod");
// const VariantValidationSchema = z.object({
//   image: z.string()
// });
const InventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number(),
    inStock: zod_1.z.boolean()
});
const RatingValidationSchema = zod_1.z.object({
    // email: z.string(),
    rating: zod_1.z.number(),
    // comment: z.string().optional(),
});
const createProductValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        description: zod_1.z.string(),
        price: zod_1.z.number(),
        category: zod_1.z.string(),
        // tags: z.array(z.string()).optional(),
        // variants: z.array(VariantValidationSchema).optional(),
        inventory: InventoryValidationSchema,
        image: zod_1.z.string(),
        ratings: zod_1.z.array(RatingValidationSchema).optional(),
    })
});
const updateProductValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        category: zod_1.z.string().optional(),
        // tags: z.array(z.string()).optional(),
        // variants: z.array(VariantValidationSchema).optional(),
        inventory: InventoryValidationSchema.optional(),
        image: zod_1.z.string().optional(),
        isDeleted: zod_1.z.boolean().optional()
    })
});
exports.ProductsValidation = {
    createProductValidation,
    updateProductValidation
};
