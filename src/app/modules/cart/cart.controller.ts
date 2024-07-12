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

export const CartsConroller = {
    createCarts
}