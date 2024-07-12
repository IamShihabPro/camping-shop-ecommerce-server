import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { CartValidations } from './cart.validation';
import { CartsConroller } from './cart.controller';

const router = express.Router()

router.post('/', validateRequest(CartValidations.createCartValidation), CartsConroller.createCarts)

export const CartRoute = router;