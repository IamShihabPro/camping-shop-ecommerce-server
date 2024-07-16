import { z } from 'zod';

const productDetailsSchema = z.object({
    productId: z.string(),
    name: z.string(),
    category: z.string(),
    quantity: z.number(),
    price: z.number(),
    image: z.string()
});

const createOrderValidation = z.object({
    body: z.object({
        userName: z.string(),
        userEmail: z.string().email(),
        phone: z.number(),
        address: z.string(),
        products: z.array(productDetailsSchema),
    })
  });
  

export const OrdersValidation ={
    createOrderValidation,
};


