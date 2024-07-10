import QueryBuilder from "../../builder/QueryBuilder"
import { TProduct } from "./product.interface"
import { Product } from "./product.model"

const createProductsIntoDB = async(payload: TProduct)=>{
    const result = await Product.create(payload)
    return result
}

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
    const productSearchableFields = ['name', 'category', 'tags'];
    const productsQuery = new QueryBuilder(
        Product.find(),
      query,
    )
      .search(productSearchableFields)
      .filter()
      .sort()
      .paginate()
      .fields();
  
    const result = await productsQuery.modelQuery;
    return result;
};

const getSingleProduct = async(id: string) =>{
    const result = await Product.findById(id)
    return result
}

export const ProductsServices ={
    createProductsIntoDB,
    getAllProductsFromDB,
    getSingleProduct,
}