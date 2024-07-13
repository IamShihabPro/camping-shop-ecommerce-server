import { Types } from "mongoose";

export type TOrder = {
    cartId: Types.ObjectId;
    name: string;
    category: string;
    totalCost: number;
    quantity: number;
    isDeleted: boolean;
}
  