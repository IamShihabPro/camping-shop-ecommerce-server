import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { ProductsValidation } from './product.validation'
import { ProducsController } from './product.controller'

const router = express.Router()

router.post('/', validateRequest(ProductsValidation.createProductValidation), ProducsController.createProducts)
router.get('/', ProducsController.getAllProducts )
router.get('/:id', ProducsController.getSingleProduct)
router.put('/:id', validateRequest(ProductsValidation.updateProductValidation), ProducsController.updateProduct);
router.delete('/:id', ProducsController.deleteProduct)

export const ProductRoute = router;