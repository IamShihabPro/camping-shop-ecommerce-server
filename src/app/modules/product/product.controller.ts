import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { ProductsServices } from "./product.service";

const createProducts = catchAsync(async(req, res)=>{
    const result = await ProductsServices.createProductsIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product is created succesfully',
        data: result,
      });
})

const getAllProducts = catchAsync(async(req, res)=>{
    const result = await ProductsServices.getAllProductsFromDB(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product are retrive succesfully',
        data: result,
      });
})

const getSingleProduct = catchAsync(async(req, res)=>{
    const {id} = req.params
    const result = await ProductsServices.getSingleProduct(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'A product retrieved successfully',
        data: result,
      });
})

const updateProduct = catchAsync(async(req, res)=>{
    const {id} = req.params
    const result = await ProductsServices.updateProductIntoDB(id, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product is updated succesfully',
        data: result,
      });
})

const deleteProduct = catchAsync(async(req, res)=>{
    const {id} = req.params
    const result = await ProductsServices.deleteProductIntoDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product is deleted succesfully',
        data: result,
      });
})

const addRatings = catchAsync(async(req, res)=>{
    const {id} = req.params
    const result = await ProductsServices.addRatings(id, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Thanks for ratings',
        data: result,
      });
})

export const ProductsController ={
    createProducts,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    addRatings
}