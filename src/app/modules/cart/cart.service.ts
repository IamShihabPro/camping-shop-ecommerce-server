import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Product } from "../product/product.model";
import { Cart } from "./cart.model";
import { TCart } from "./cat.interface";
import QueryBuilder from "../../builder/QueryBuilder";

const createCartsIntoDB = async (payload: TCart) => {
    
    const product = await Product.findById(payload.productId);
    if (!product) {
        throw new AppError(httpStatus.NOT_FOUND, "Product not found!!");
    }

    if (product.inventory.quantity < payload.quantity) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Insufficient quantity');
    }

    payload.name = product.name;
    payload.category = product.category;
    payload.price = product.price;
    payload.image = product.image;
    payload.quantity = payload.quantity || 1

    const existingCartItem = await Cart.findOne({ productId: payload.productId });

    if (existingCartItem) {
        existingCartItem.quantity += payload.quantity;
        existingCartItem.price = product.price; 
        existingCartItem.image = product.image;
        await existingCartItem.save();

        return existingCartItem;
    } else {
        const result = await Cart.create(payload);
        return result;
    }
}

const getAllCartsFromDB = async (query: Record<string, unknown>) => {
    const cartSearchableFields = ['price'];
    const cartsQuery = new QueryBuilder(
        Cart.find(),
      query,
    )
      .search(cartSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();
  
    const result = await cartsQuery.modelQuery;
    return result;
};

const getSingleCart = async(id: string) =>{
    const result = await Cart.findById(id)
    return result
}


const updateCartIntoDB = async(id: string, payload: Partial<TCart>)=>{
    const result = await Cart.findByIdAndUpdate(id, payload, {new: true})
    return result
}
  
const deleteCartIntoDB = async(id: string) =>{
    const result = await Cart.findByIdAndUpdate(id, {isDeleted: true}, {new: true})
    return result
}


export const CartsServices = {
    createCartsIntoDB,
    getAllCartsFromDB,
    getSingleCart,
    updateCartIntoDB,
    deleteCartIntoDB
}