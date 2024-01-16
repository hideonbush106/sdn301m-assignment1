import express, { Request, Response, urlencoded } from 'express'
import path from 'path'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import * as bodyParser from 'body-parser'
import dbConnect from './utils/dbConnect'
import { engine } from 'express-handlebars'
import orchidsRouter from './routes/orchids.routes'
import categoriesRouter from './routes/category.routes'

dotenv.config()
const port = process.env.PORT
const env = process.env.NODE_ENV
const dbUrl = process.env.MONGO_DB_URL
const app = express()

dbConnect(dbUrl)

//Config
app.use(cors())
app.use(express.static(path.join(__dirname + '/public')))
app.use(
  urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())
if (env === 'DEV') {
  app.use(morgan('dev'))
}

//Template engine
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname + '/views'))

//App endpoint
app.use('/orchids', orchidsRouter)
app.use('/categories', categoriesRouter)

//Root endpoint
app.get('/', (req, res) => {
  res.render('home')
})
app.get('*', (req: Request, res: Response) => {
  res.render('error')
})
//Start server
app.listen(port, () => {
  console.log(`[⚡] App listening on http://localhost:${port}`)
})

export default app
