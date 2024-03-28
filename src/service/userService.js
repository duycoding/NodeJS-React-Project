import bcrypt from 'bcryptjs'
import mysql from 'mysql2'

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'jwt',
})

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

const getUserList = () => {
	let users = []
	connection.query('select * from users', function (err, results, fields) {
		if (err) {
			console.log(err)
		}
		console.log(results)
	})
}

module.exports = {
	createNewUser,
	getUserList,
}
