import { z } from 'zod';

// const VariantValidationSchema = z.object({
//   image: z.string()
// });

const InventoryValidationSchema = z.object({
  quantity: z.number(),
  inStock: z.boolean()
});

const RatingValidationSchema = z.object({
  // email: z.string(),
  rating: z.number(),
  // comment: z.string().optional(),
})

const createProductValidation = z.object({
    body: z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        category: z.string(),
        // tags: z.array(z.string()).optional(),
        // variants: z.array(VariantValidationSchema).optional(),
        inventory: InventoryValidationSchema,
        image: z.string(),
        ratings: z.array(RatingValidationSchema).optional(),
    })
});
  
const updateProductValidation = z.object({
  body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        price: z.number().optional(),
        category: z.string().optional(),
        // tags: z.array(z.string()).optional(),
        // variants: z.array(VariantValidationSchema).optional(),
        inventory: InventoryValidationSchema.optional(),
        image: z.string().optional(),
        isDeleted: z.boolean().optional()
  })
});

export const ProductsValidation ={
    createProductValidation,
    updateProductValidation
};


