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

const createNewUser = async (email, passowrd, username) => {
	let hashPass = hashUserPassword(passowrd)
	const connection = await mysql.createConnection({
		host: 'localhost',
		user: 'root',
		database: 'jwt',
		Promise: bluebird,
	})
	// connection.query(
	// 	'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
	// 	[email, hashPass, username],
	// 	function (err, results, fields) {
	// 		if (err) {
	// 			console.log(err)
	// 		}
	// 	},
	// )
	try {
		const [rows, fields] = await connection.execute(
			'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
			[email, hashPass, username],
		)
	} catch (error) {
		console.log(error)
	}
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

const deleteUser = async (id) => {
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
		const [rows, fields] = await connection.execute(
			'DELETE FROM users WHERE id=?',
			[id],
		)
		// return rows
	} catch (error) {
		console.log(error)
	}
}

const getUserById = async (id) => {
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
		const [rows, fields] = await connection.execute(
			'SELECT * FROM users where id=?',
			[id],
		)
		// console.log(rows)
		return rows
	} catch (error) {
		console.log(error)
	}
}

const updateUserInfor = async (email, username, id) => {
	const connection = await mysql.createConnection({
		host: 'localhost',
		user: 'root',
		database: 'jwt',
		Promise: bluebird,
	})
	let users = []

	try {
		const [rows, fields] = await connection.execute(
			'update users set email = ?, username = ? where id = ? ',
			[email, username, id],
		)
		// console.log(rows)
		return rows
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	createNewUser,
	getUserList,
	deleteUser,
	getUserById,
	updateUserInfor,
}
