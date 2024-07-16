import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import sendResponse from "../utils/sendResponse";
import { OrdersServices } from "./order.service";

const createOrders = catchAsync(async(req, res)=>{
    const result = await OrdersServices.createOrderIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order is created succesfully',
        data: result,
      });
})


const getAllOrdersFromDB = catchAsync(async(req, res)=>{
    const result = await OrdersServices.getAllOrdersFromDB(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Orders are retrive succesfully',
        data: result,
      });
})


export const OrderControllers = {
    createOrders,
    getAllOrdersFromDB
}