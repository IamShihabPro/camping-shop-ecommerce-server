import { Query, Schema, model } from "mongoose";
import { TCart } from "./cat.interface";

const cartSchema = new Schema<TCart>({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    name: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true},
    quantity: {type: Number, required: true},
    isDeleted: { type: Boolean, default: false }
},
{
  timestamps: true,
})

// Middleware to exclude deleted cars
cartSchema.pre<Query<TCart, TCart>>('find', function(next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

cartSchema.pre<Query<TCart, TCart>>('findOne', function(next) {
  this.where({ isDeleted: { $ne: true } });
  next();
})


export const Cart = model<TCart>('Cart', cartSchema)