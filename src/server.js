import express from 'express'
import configViewEngine from './configs/viewEngine'
import initWebRoutes from './routes/web'
import bodyParser from 'body-parser'
// import connection from './configs/connectDB'

const app = express()

configViewEngine(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// connection()

initWebRoutes(app)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
	console.log('>>> JWT backend is running on the port' + PORT)
})
