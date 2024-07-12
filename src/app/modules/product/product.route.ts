import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ProductsValidation } from './product.validation'
import { ProductsController } from './product.controller'

const router = express.Router()

router.post('/', validateRequest(ProductsValidation.createProductValidation), ProductsController.createProducts)
router.put('/:id', validateRequest(ProductsValidation.updateProductValidation), ProductsController.updateProduct);
router.put('/ratings/:id', ProductsController.addRatings);
router.get('/', ProductsController.getAllProducts )
router.get('/:id', ProductsController.getSingleProduct)
router.delete('/:id', ProductsController.deleteProduct)

export const ProductRoute = router;