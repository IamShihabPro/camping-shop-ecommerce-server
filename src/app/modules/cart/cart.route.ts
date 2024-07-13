import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { CartValidations } from './cart.validation';
import { CartsConroller } from './cart.controller';

const router = express.Router()

router.post('/', validateRequest(CartValidations.createCartValidation), CartsConroller.createCarts)
router.get('/', CartsConroller.getAllCarts)
router.get('/:id', CartsConroller.getSingleCarts)
router.put('/', validateRequest(CartValidations.updateCartValidation), CartsConroller.updateCart)
router.delete('/:id', CartsConroller.deleteCart)


export const CartRoute = router;