import bcrypt from 'bcryptjs'
// get the client
import mysql from 'mysql2/promise'

// get the promise implementation, we will use bluebird
import bluebird from 'bluebird'

// create the connection, specify bluebird as Promise

const salt = bcrypt.genSaltSync(10)
const hashUserPassword = (userPassword) => {
	let hashPassword = bcrypt.hashSync(userPassword, salt)
	return hashPassword
}

const createNewUser = (email, passowrd, username) => {
	let hashPass = hashUserPassword(passowrd)

	connection.query(
		'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
		[email, hashPass, username],
		function (err, results, fields) {
			if (err) {
				console.log(err)
			}
		},
	)
}

const getUserList = async () => {
	const connection = await mysql.createConnection({
		host: 'localhost',
		user: 'root',
		database: 'jwt',
		Promise: bluebird,
	})
	let users = []
	// connection.query('select * from users', function (err, results, fields) {
	// 	if (err) {
	// 		console.log(err)
	// 		return users
	// 	}
	// 	users = results
	// 	console.log('>>> the result when i run: ', users)
	// 	return users
	// })
	try {
		const [rows, fields] = await connection.execute('select * from users')
		return rows
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	createNewUser,
	getUserList,
}
