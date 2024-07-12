import { Types } from "mongoose";

export type TCart = {
    productId: Types.ObjectId;
    price: number;
    image: string;
    quantity: number;
    isDeleted: boolean;
  };
  