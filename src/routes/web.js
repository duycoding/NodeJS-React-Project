import express from 'express'
import homeContronller from '../controller/homeContronller'

const router = express.Router()

const initWebRoutes = (app) => {
	router.get('/', homeContronller.handleHelloWorld)
	router.get('/user', homeContronller.handleUserPage)
	router.post('/users/create-user', homeContronller.handleCreateNewUser)
	return app.use('/', router)
}

export default initWebRoutes
