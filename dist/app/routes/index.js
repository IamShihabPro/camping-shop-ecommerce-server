"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_route_1 = require("../modules/product/product.route");
const cart_route_1 = require("../modules/cart/cart.route");
const order_route_1 = require("../modules/order/order.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/products',
        route: product_route_1.ProductRoute
    },
    {
        path: '/carts',
        route: cart_route_1.CartRoute
    },
    {
        path: '/orders',
        route: order_route_1.OrderRoute
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
