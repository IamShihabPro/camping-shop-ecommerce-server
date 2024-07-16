import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { Product } from "../product/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";
import { Types } from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";

const createOrderIntoDB = async (payload: TOrder) => {

  // Check for each product's existence and available quantity
  const products = await Promise.all(payload.products.map(async (product) => {
    // Ensure productId is a valid ObjectId
    if (!Types.ObjectId.isValid(product.productId)) {
      throw new AppError(httpStatus.BAD_REQUEST, `Invalid product ID: ${product.productId}`);
    }

    const foundProduct = await Product.findById(product.productId);
    if (!foundProduct) {
      console.error(`Product Not Found: ${product.productId}`);
      throw new AppError(httpStatus.NOT_FOUND, 'Product Not Found!');
    }

    console.log(`Found Product: ${foundProduct.name}, Inventory: ${foundProduct.inventory.quantity}`);

    if (foundProduct.inventory.quantity < product.quantity) {
      throw new AppError(httpStatus.BAD_REQUEST, `Insufficient quantity for product ${foundProduct.name}`);
    }

    // Optionally, reduce the inventory quantity of the found product
    foundProduct.inventory.quantity -= product.quantity;
    await foundProduct.save();

    return {
      ...product,
      name: foundProduct.name,
      category: foundProduct.category,
      price: foundProduct.price,
      image: foundProduct.image,
    };
  }));

  // Calculate the total cost
  const totalCost = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);

  // Create the order with the validated products and calculated totalCost
  const order = new Order({ ...payload, products, totalCost });
  await order.save();

  return order;
};


const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const orderSearchableFields = ['userName', 'userEmail'];
  const ordersQuery = new QueryBuilder(
      Order.find(),
    query,
  )
    .search(orderSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await ordersQuery.modelQuery;
  return result;
};

export const OrdersServices = {
  createOrderIntoDB,
  getAllOrdersFromDB
};
