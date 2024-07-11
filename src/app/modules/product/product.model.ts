import { Query, Schema, model } from "mongoose";
import { TInventory, TProduct, TRating, TVariant } from "./product.interface";

const variantSchema = new Schema<TVariant>({
  image: { type: String},
});

const inventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const ratingsSchema = new Schema<TRating>({
  // email: { type: String, required: true },
  rating: { type: Number, required: true },
  // comment: { type: String },
});

const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [variantSchema], required: true },
  inventory: { type: inventorySchema, required: true },
  image: { type: String, required: true },
  ratings: { type: [ratingsSchema] },
  isDeleted: {type: Boolean, default: false}
},
{
  timestamps: true,
}
);


// Middleware to exclude deleted cars
productSchema.pre<Query<TProduct, TProduct>>('find', function(next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre<Query<TProduct, TProduct>>('findOne', function(next) {
  this.where({ isDeleted: { $ne: true } });
  next();
})

export const Product = model<TProduct>('Product', productSchema);
