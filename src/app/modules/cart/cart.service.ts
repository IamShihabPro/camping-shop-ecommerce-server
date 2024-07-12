import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Product } from "../product/product.model";
import { Cart } from "./cart.model";
import { TCart } from "./cat.interface";

const createCartsIntoDB = async (payload: TCart) => {
    const product = await Product.findById(payload.productId);
    if (!product) {
        throw new AppError(httpStatus.NOT_FOUND, "Product not found!!");
    }

    if(product.inventory.quantity < payload.quantity){
        throw new Error('Insuficient quantity');
    }
    product.inventory.quantity -= payload.quantity

     if (product.inventory.quantity === 0) {
        product.inventory.inStock = false;
    }
    await product.save()
    const result = await Cart.create(payload);
    return result;
}

export const CartsServices = {
    createCartsIntoDB,
}