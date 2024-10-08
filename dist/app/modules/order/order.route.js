"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoute = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const order_validation_1 = require("./order.validation");
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(order_validation_1.OrdersValidation.createOrderValidation), order_controller_1.OrderControllers.createOrders);
router.get('/', order_controller_1.OrderControllers.getAllOrdersFromDB);
exports.OrderRoute = router;
