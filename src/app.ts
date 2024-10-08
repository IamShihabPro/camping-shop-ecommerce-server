import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import notFound from './app/middlewares/notFound'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorhandler'

const app: Application = express()

//parsers
app.use(express.json())
app.use(cors({origin: ['https://camping-shop-ecommerce-client.vercel.app']}))

// application routes
app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Assignment 4')
})


app.use(globalErrorHandler)

// Not found
app.use(notFound)


export default app