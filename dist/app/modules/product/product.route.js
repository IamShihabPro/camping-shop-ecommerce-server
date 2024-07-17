"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const product_validation_1 = require("./product.validation");
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(product_validation_1.ProductsValidation.createProductValidation), product_controller_1.ProductsController.createProducts);
router.put('/:id', (0, validateRequest_1.default)(product_validation_1.ProductsValidation.updateProductValidation), product_controller_1.ProductsController.updateProduct);
router.put('/ratings/:id', product_controller_1.ProductsController.addRatings);
router.get('/', product_controller_1.ProductsController.getAllProducts);
router.get('/:id', product_controller_1.ProductsController.getSingleProduct);
router.delete('/:id', product_controller_1.ProductsController.deleteProduct);
exports.ProductRoute = router;
