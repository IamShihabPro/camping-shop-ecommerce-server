import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { CartsServices } from "./cart.service";

const createCarts = catchAsync(async(req, res)=>{
    const result = await CartsServices.createCartsIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cart is added succesfully',
        data: result,
      });
})

const getAllCarts = catchAsync(async(req, res)=>{
    const result = await CartsServices.getAllCartsFromDB(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Carts are retrive succesfully',
        data: result,
      });
})

const getSingleCarts = catchAsync(async(req, res)=>{
    const {id} = req.params
    const result = await CartsServices.getSingleCart(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'A cart retrieved successfully',
        data: result,
      });
})

const updateCart = catchAsync(async(req, res)=>{
    const {id} = req.params
    const result = await CartsServices.updateCartIntoDB(id, req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cart is updated succesfully',
        data: result,
      });
})

const deleteCart = catchAsync(async(req, res)=>{
    const {id} = req.params
    const result = await CartsServices.deleteCartIntoDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Cart is deleted succesfully',
        data: result,
      });
})

export const CartsConroller = {
    createCarts,
    getAllCarts,
    getSingleCarts,
    updateCart,
    deleteCart
}