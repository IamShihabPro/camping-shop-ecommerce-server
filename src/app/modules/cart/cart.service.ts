import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Product } from "../product/product.model";
import { Cart } from "./cart.model";
import { TCart } from "./cat.interface";

const createCartsIntoDB = async (payload: TCart) => {
    // Check if the product exists
    const product = await Product.findById(payload.productId);
    if (!product) {
        throw new AppError(httpStatus.NOT_FOUND, "Product not found!!");
    }

    // Check inventory quantity
    if (product.inventory.quantity < payload.quantity) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Insufficient quantity');
    }

    // Set the price in the payload from the product's price
    payload.price = product.price;
    payload.image = product.image;

    // Check if the product already exists in the cart
    const existingCartItem = await Cart.findOne({ productId: payload.productId });

    if (existingCartItem) {
        // If the product exists in the cart, increase the quantity and update the price
        existingCartItem.quantity += payload.quantity;
        existingCartItem.price = product.price; // Ensure the price is updated
        existingCartItem.image = product.image; // Ensure the image is updated
        await existingCartItem.save();

        // Update product inventory
        product.inventory.quantity -= payload.quantity;
        if (product.inventory.quantity === 0) {
            product.inventory.inStock = false;
        }
        await product.save();

        return existingCartItem;
    } else {
        // If the product does not exist in the cart, create a new cart entry with the updated price
        const result = await Cart.create(payload);

        // Update product inventory
        product.inventory.quantity -= payload.quantity;
        if (product.inventory.quantity === 0) {
            product.inventory.inStock = false;
        }
        await product.save();

        return result;
    }
}

export const CartsServices = {
    createCartsIntoDB,
}