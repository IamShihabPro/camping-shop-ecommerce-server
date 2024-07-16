import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { OrdersValidation } from './order.validation';
import { OrderControllers } from './order.controller';


const router = express.Router()

router.post('/', validateRequest(OrdersValidation.createOrderValidation), OrderControllers.createOrders )
router.get('/', OrderControllers.getAllOrdersFromDB)

export const OrderRoute = router