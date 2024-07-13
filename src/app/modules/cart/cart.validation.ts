import { z } from "zod";

const createCartValidation = z.object({
    body: z.object({
        productId: z.string(),
        // price: z.number(),
        // image: z.string(),
        quantity: z.number(),
    })
});

export const CartValidations = {
    createCartValidation,
} 