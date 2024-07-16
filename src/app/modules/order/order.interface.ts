import { Types } from "mongoose";

export type TProductDetails = {
    productId: Types.ObjectId;
    name: string
    category: string
    quantity: number
    price: number
    image: string
}

export type TOrder = {
    userName: string;
    userEmail: string;
    phone: number;
    address: string;
    products: TProductDetails[]
    totalCost: number;
    isDeleted: boolean;
}
  