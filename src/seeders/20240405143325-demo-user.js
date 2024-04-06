'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		await queryInterface.bulkInsert(
			'User',
			[
				{
					email: 'John Doe',
					password: '1234',
					username: 'fake11',
				},
				{
					email: 'John Doe2',
					password: '1234',
					username: 'fake12',
				},
				{
					email: 'John Doe3',
					password: '1234',
					username: 'fake13',
				},
			],
			{},
		)
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
}
