"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const cart_validation_1 = require("./cart.validation");
const cart_controller_1 = require("./cart.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(cart_validation_1.CartValidations.createCartValidation), cart_controller_1.CartsConroller.createCarts);
router.get('/', cart_controller_1.CartsConroller.getAllCarts);
router.get('/:id', cart_controller_1.CartsConroller.getSingleCarts);
router.put('/', (0, validateRequest_1.default)(cart_validation_1.CartValidations.updateCartValidation), cart_controller_1.CartsConroller.updateCart);
router.delete('/:id', cart_controller_1.CartsConroller.deleteCart);
exports.CartRoute = router;
