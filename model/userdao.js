import { dbConfig } from "../config/dbconfig.js";
import crypto from 'crypto';

import { createId } from '@paralleldrive/cuid2';

const pool = dbConfig.pool;

export var userdao = (function () {
	return {
		create: function (userID, username, password, firstName, lastName, nickName, emailAddress) {
			// Creating a unique salt for a particular user
			let salt = crypto.randomBytes(16).toString('hex');

			// Hashing user's salt and password with 1000 iterations,
			// 64 length and sha512 digest
			let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
			return new Promise(function (resolve, reject) {
				pool.getConnection()
					.then(connection => {
						connection.query('INSERT INTO users ( userID, username, hash, salt, firstName, lastName, nickName, emailAddress, dateCreated ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?,  curdate() )',
							[userID, username, hash, salt, firstName, lastName, nickName, emailAddress])
							.then((results) => {
								let userConfirmationID = createId();

								connection.query('INSERT INTO userConfirmation ( userConfirmationID, userID ) VALUES ( ?, ? )',
									[userConfirmationID, userID])
									.then((confResults) => {
										connection.query('INSERT INTO userProfile ( userID ) VALUES ( ? )',
											[userID])
											.then((profileResults) => {
												connection.end();
												resolve({ userID: userID, userConfirmationID: userConfirmationID });
											})
											.catch(err => {
												connection.rollback();
												connection.end();
												reject(err);
											});
									})
									.catch(err => {
										connection.rollback();
										connection.end();
										reject(err);
									});
							})
							.catch(err => {
								connection.end();
								reject(err);
							});
					})
					.catch(err => {
						//not connected
						reject(err);
					});
			});
		},

		read: function (userID) {
			return new Promise(function (resolve, reject) {
				pool.getConnection()
					.then(connection => {
						connection.query(`SELECT u.userID, u.username, u.hash, u.salt, u.firstName, u.lastName, u.dateCreated, u.emailAddress, u.nickName, up.profilePic
                              FROM users u
                              JOIN userProfile up on u.userID = up.userID
                              WHERE u.userID = ?`,
							[userID])
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

		update: function (userID, firstName, lastName, nickName, emailAddress) {
			return new Promise(function (resolve, reject) {
				pool.getConnection()
					.then(connection => {
						connection.query('UPDATE users SET firstName = ?, lastName = ?, nickName = ?, emailAddress = ? WHERE userID = ?',
							[firstName, lastName, nickName, emailAddress, userID])
							.then((results) => {
								connection.end();
								resolve(true);
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

		delete: function (userID) {
			return new Promise(function (resolve, reject) {
				pool.getConnection()
					.then(connection => {
						connection.query('DELETE FROM users WHERE userID = ?', [userID])
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
