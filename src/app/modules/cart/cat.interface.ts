import { Types } from "mongoose";

export type TCart = {
    productId: Types.ObjectId;
    name: string;
    category: string;
    price: number;
    image: string;
    quantity: number;
    isDeleted: boolean;
  };
  