import { model, Query, Schema } from "mongoose";
import { TOrder, TProductDetails } from "./order.interface";


const productDetailsSchema = new Schema<TProductDetails>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true},
});



const orderSchema = new Schema<TOrder>({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: true },
    products: { type: [productDetailsSchema], required: true },
    totalCost: { type: Number, required: true },
    isDeleted: {type: Boolean, default: false}
},
{
  timestamps: true,
}
);

const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};


orderSchema.pre('save', function (next) {
  this.userName = capitalizeFirstLetter(this.userName);
  next();
});


// Middleware to exclude deleted cars
orderSchema.pre<Query<TOrder, TOrder>>('find', function(next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

orderSchema.pre<Query<TOrder, TOrder>>('findOne', function(next) {
  this.where({ isDeleted: { $ne: true } });
  next();
})

export const Order = model<TOrder>('Order', orderSchema);
