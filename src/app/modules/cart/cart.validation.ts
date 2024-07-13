import { z } from "zod";

const createCartValidation = z.object({
    body: z.object({
        productId: z.string(),
        // price: z.number(),
        // image: z.string(),
        quantity: z.number(),
    })
});


const updateCartValidation = z.object({
    body: z.object({
        productId: z.string().optional(),
        price: z.number().optional(),
        image: z.string().optional(),
        quantity: z.number().optional(),
    })
  });

export const CartValidations = {
    createCartValidation,
    updateCartValidation
} 