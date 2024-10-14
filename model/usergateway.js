import { dbConfig } from "../config/dbconfig.js";
import crypto from 'crypto';


const pool = dbConfig.pool;

export var usergateway = (function () {
	return {
		getAll: function () {
			return new Promise(function (resolve, reject) {
				pool.getConnection()
					.then(connection => {
						connection.query('SELECT userID, username, firstName, lastName, nickName, emailAddress from users ORDER BY userID')
							.then((results) => {
								connection.end();
								resolve(results);
							})
							.catch(err => {
								connection.end();
								reject(err);
							});
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		//public profile access
		getUserByUsername: function (username) {
			return new Promise(function (resolve, reject) {
				pool.getConnection()
					.then(connection => {
						connection.query(`SELECT u.userID, u.username, u.firstName, u.lastName, u.dateCreated, u.nickName, up.profilePic
                              FROM users u
                              JOIN userProfile up on u.userID = up.userID
                              WHERE u.username = ?`, [username])
							.then((results) => {
								connection.end();
								resolve(results);
							})
							.catch(err => {
								connection.end();
								reject(err);
							});
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		//public profile access
		getUserByUserID: function (userID) {
			return new Promise(function (resolve, reject) {
				pool.getConnection()
					.then(connection => {
						connection.query(`SELECT u.userID, u.username, u.firstName, u.lastName, u.dateCreated, u.nickName, up.profilePic
								FROM users u
								JOIN userProfile up on u.userID = up.userID
								WHERE u.userID = ?`, [userID])
							.then((results) => {
								connection.end();
								resolve(results);
							})
							.catch(err => {
								connection.end();
								reject(err);
							});
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		getByUsername: function (username) {
			return new Promise(function (resolve, reject) {
				pool.getConnection()
					.then(connection => {
						connection.query(`SELECT u.userID, u.username, u.hash, u.salt, u.firstName, u.lastName, u.dateCreated, u.nickName, u.emailAddress, up.profilePic
                              FROM users u
                              JOIN userProfile up on u.userID = up.userID
                              WHERE u.username = ?`, [username])
							.then((results) => {
								connection.end();
								resolve(results);
							})
							.catch(err => {
								connection.end();
								reject(err);
							});
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		getByUserID: function (userID) {
			return new Promise(function (resolve, reject) {
				pool.getConnection()
					.then(connection => {
						connection.query(`SELECT u.userID, u.username, u.firstName, u.lastName, u.dateCreated, u.nickName, u.emailAddress, up.profilePic
								FROM users u
								JOIN userProfile up on u.userID = up.userID
								WHERE u.userID = ?`, [userID])
							.then((results) => {
								connection.end();
								resolve(results[0]);
							})
							.catch(err => {
								connection.end();
								reject(err);
							});
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		getEmailAddress: function (emailAddress) {
			return new Promise(function (resolve, reject) {
				pool.getConnection()
					.then(connection => {
						connection.query(`SELECT userID
                              FROM users
                              WHERE emailAddress = ?`, [emailAddress])
							.then((results) => {
								connection.end();
								resolve(results);
							})
							.catch(err => {
								connection.end();
								reject(err);
							});
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		changePassword: function (userID, password) {
			let salt = crypto.randomBytes(16).toString('hex');
			let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
			
			let updated = new Date();
			updated = updated.toISOString().split('T')[0] + ' ' + updated.toTimeString().split(' ')[0];

			return new Promise(function (resolve, reject) {
				pool.getConnection()
					.then(connection => {
						connection.query(`UPDATE  users
                              SET   hash = ?,
							  		salt = ?,
							  dateUpdated = ?
                              WHERE   userID = ?`, [hash, salt, updated, userID])
							.then((results) => {
								connection.end();
								console.log(results);
								resolve(true);
							})
							.catch(err => {
								connection.end();
								console.log(err);
								reject(err);
							});
					})
					.catch(err => {
						console.log(err);
						reject(err);
					});
			});
		},
		confirmUser: function (userConfirmationID) {
			return new Promise(function (resolve, reject) {
				pool.getConnection()
					.then(connection => {
						connection.query(`UPDATE users, userConfirmation SET users.disabled = 0, userConfirmation.confirmed = 1, userConfirmation.confirmedDate = curdate()
                              WHERE   users.userID = userConfirmation.userID
                              AND userConfirmation.userConfirmationID = ?`, [userConfirmationID])
							.then((results) => {
								connection.end();
								resolve(true); // successful delete
							})
							.catch(err => {
								connection.end();
								reject(err);
							});
					})
					.catch(err => {
						reject(err);
					});
			});
		}
	};

})();
