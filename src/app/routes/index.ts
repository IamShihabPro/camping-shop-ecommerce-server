import express from 'express'
import { ProductRoute } from "../modules/product/product.route"
import { CartRoute } from '../modules/cart/cart.route'
import { OrderRoute } from '../modules/order/order.route'

const router = express.Router()

const moduleRoutes = [
    {
        path: '/products',
        route: ProductRoute
    },
    {
        path: '/carts',
        route: CartRoute
    },
    {
        path: '/orders',
        route: OrderRoute
    },
]


moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router