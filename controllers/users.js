
import { userservice } from '../model/userservice.js';
import { passwordresetservice } from '../model/passwordresetservice.js';
import { utils } from '../model/utils.js';
import { emailConfig } from "../config/emailconfig.js";
import { siteConfig } from "../config/siteconfig.js";
import crypto from 'crypto';
import { createId } from '@paralleldrive/cuid2';


async function sendConfirmationMail(user, userConfirmationID) {
	let message = {};
	message.plainText = `Please confirm your email address.

           This email address has been signed up for an account at ${siteConfig.host}

           To confirm this account, please visit:

           ${siteConfig.userConfirmationURI + userConfirmationID}
          `;
	message.htmlText = `Dear ${user.firstName} ${user.lastName},
           <p>
           This email address has been signed up for an account at ${siteConfig.host}
           </p>
           <p>
           To confirm this account, please visit:
           </p>
           <p>
           ${siteConfig.userConfirmationURI + userConfirmationID}
           </p>
          `;
	let from = '"' + emailConfig.emailUser.name + '" ' + '<' + emailConfig.emailUser.emailaddress + '>';
	let to = user.emailAddress;
	let subject = 'Please confirm you email address.';

	let sent = await utils.sendEmail(to, from, subject, message);

	return sent;
	/* .then( function( results ){

	})
	.catch(console.error); */
}

function sendResetMessage(emailAddress, resetID) {
	let message = {};
	message.plainText = `A request to reset your account password was made at ${siteConfig.host}.
        Go to the URL below to create a new password. This link will expire in one hour.
        ${siteConfig.passwordResetURI + resetID}
        `;
	message.htmlText = `<p>A request to reset your account password was made at ${siteConfig.host}.</p>
        <p>Go to the URL below to create a new password. This link will expire in one hour.</p>
        <p><a href="${siteConfig.passwordResetURI + resetID}">${siteConfig.passwordResetURI + resetID}</a></p>
        `;
	let from = '"' + emailConfig.emailUser.name + '" ' + '<' + emailConfig.emailUser.emailaddress + '>';
	let to = emailAddress;
	let subject = 'Password reset request.';

	utils.sendEmail(to, from, subject, message)
		.then()
		.catch(console.error);
}

function readUser( userID, response ){
	userservice.read(userID)
		.then(function (results) {
			response.send(JSON.stringify(results));
		})
		.catch(function (error) {
			console.log(error);
			response.send(JSON.stringify(error));
		});
}

export var users = (function () {
	return {
		getAll: function (request, response) {
			userservice.getAll()
				.then(function (results) {
					response.send(JSON.stringify(results));
				})
				.catch(function (error) {
					console.log(error);
					response.send(JSON.stringify(error));
				});
		},
		// public user call
		getUserByUsername: function (request, response) {
			userservice.getUserByUsername(request.params.username)
				.then(function (results) {

					if (request.query.returnType !== undefined && request.query.returnType === 'boolean') {
						response.send(JSON.stringify(results.length));
					} else {
						let user = results[0];

						response.send(JSON.stringify(user));
					}
				})
				.catch(function (error) {
					console.log(error);
					response.send(JSON.stringify(error));
				});
		},

		// public user call
		getUserByUserID: function (request, response) {
			userservice.getUserByUserID(request.params.ID)
				.then(function (results) {

					let user = results[0];
					response.send(JSON.stringify(user));
				})
				.catch(function (error) {
					console.log(error);
					response.send(JSON.stringify(error));
				});
		},

		getByUsername: function (request, response) {
			userservice.getByUsername(request.params.username)
				.then(function (results) {

					if (request.query.returnType !== undefined && request.query.returnType === 'boolean') {
						response.send(JSON.stringify(results.length));
					} else {
						let user = results[0];

						response.send(JSON.stringify(user));
					}
				})
				.catch(function (error) {
					console.log(error);
					response.send(JSON.stringify(error));
				});
		},

		getEmailAddress: function (request, response) {
			userservice.getEmailAddress(request.params.emailAddress)
				.then(function (results) {
					let exists = results.length;
					response.send(JSON.stringify(exists));
				})
				.catch(function (error) {
					console.log(error);
					response.send(JSON.stringify(error));
				});
		},

		sendResetEmail: function (request, response) {
			passwordresetservice.create(request.body.emailAddress)
				.then(function (resetID) {

					sendResetMessage(request.body.emailAddress, resetID);
					response.send(JSON.stringify(true));
				})
				.catch(function (error) {
					console.log(error);
					response.send(JSON.stringify(error));
				});
		},

		getPasswordReset: function (request, response) {
			passwordresetservice.read(request.params.ID)
				.then(function (results) {
					response.send(JSON.stringify(results));
				})
				.catch(function (error) {
					console.log(error);
					response.send(JSON.stringify(error));
				});
		},

		create: function (request, response) {
			//if( request.params.ID === request.user.userID ){
			let userID = createId();
			userservice.create(userID, request.body.username, request.body.password, request.body.firstName, request.body.lastName, request.body.nickName, request.body.emailAddress)
				.then(function (results) {
					// email the user

					//we are reading back the inserted row
					userservice.getByUserID(results.userID)
						.then(async function (user) {
							//let sent = await 
							sendConfirmationMail(user, results.userConfirmationID)
								.then(function (sendResult) {
									console.dir(sendResult);
									response.send(JSON.stringify({ success: true, user: user }));
								})
								.catch(function (error) {
									response.send(JSON.stringify({ success: false, error: error }));
								});
						})
						.catch(function (error) {
							console.log(error);
							response.send(JSON.stringify({ success: false, error: error }));
						});
				})
				.catch(function (error) {
					console.log(error);
					response.send(JSON.stringify({ success: false, error: error }));
				});
			/* }else{
			  response.setHeader( "Status", "401" );
			  response.send("Not authorized" );
			} */
		},
		// read a user record by ID
		read: function (request, response) {
			//read the full record for the current user
			if (request.params.ID === request.user.userID) {
				readUser( request.params.ID, response );
			} else {
				// if the current user is not the requested user, only get public profile data
				this.getUserByUserID(request, response);
			}
		},
		// update the current user's information
		update: function (request, response) {
			if (request.params.ID === request.user.userID) {
				userservice.update(request.params.ID, request.body.firstName, request.body.lastName, request.body.nickName, request.body.emailAddress)
					.then(function (user) {
						//we are reading back the updated row
						userservice.getByUserID(request.params.ID)
							.then(function (user) {
								response.send(JSON.stringify({ sucess: true, user: user }));
							})
							.catch(function (error) {
								console.log(error);
								response.send(JSON.stringify(error));
							});
					})
					.catch(function (error) {
						console.log(error);
						response.send(JSON.stringify(error));
					});
			} else {
				response.setHeader("Status", "401");
				response.send("Not authorized");
			}
		},
		// delete a user by ID
		delete: function (request, response) {
			if (request.params.ID === request.user.userID) {
				userservice.delete(request.params.ID)
					.then(function (success) {
						response.send(JSON.stringify(success));
					})
					.catch(function (error) {
						console.log(error);
						response.send(JSON.stringify(error));
					});
			} else {
				response.setHeader("Status", "401");
				response.send("Not authorized");
			}
		},
		// confirm a user by userConfirmationID
		confirmUser: function (request, response) {
			userservice.confirmUser(request.params.ID)
				.then(function (success) {
					response.send(JSON.stringify(success));
				})
				.catch(function (error) {
					console.log(error);
					response.send(JSON.stringify(error));
				});
		},
		// get the current logged in user
		getCurrentUser: function (request, response) {
			readUser( request.user.userID, response );
		},
		// check the current logged in user's password
		checkPassword: function (request, response) {
			if (request.params.ID === request.user.userID) {
				userservice.read(request.user.userID)
					.then(function (results) {
						let valid = false;
						if (results.length) {
							let hash = crypto.pbkdf2Sync(request.body.currentPassword, results[0].salt, 1000, 64, `sha512`).toString(`hex`);
							valid = (hash === results[0].hash);
						}
						response.send(JSON.stringify(valid));
					})
					.catch(function (error) {
						console.log(error);
						response.send(JSON.stringify(error));
					});
			} else {
				response.setHeader("Status", "401");
				response.send("Not authorized");
			}
		},
		// change the current logged in user's password
		changePassword: function (request, response) {
			if (request.params.ID === request.user.userID) {
				userservice.changePassword(request.params.ID, request.body.newPassword)
					.then(function (results) {
						response.send(JSON.stringify(results));
					})
					.catch(function (error) {
						console.log(error);
						response.send(JSON.stringify(error));
					});
			} else {
				response.setHeader("Status", "401");
				response.send("Not authorized");
			}

		},
		// reset a user's password using a code sent by email
		resetPassword: function (request, response) {
			passwordresetservice.getUserByResetID(request.params.ID)
				.then(function (user) {
					userservice.changePassword(user[0].userID, request.body.newPassword)
						.then(function (results) {
							// expire the reset request
							passwordresetservice.update(request.params.ID)
								.then(function (success) {
									response.send(JSON.stringify(results));
								})
								.catch(function (error) {
									console.log(error);
									response.send(JSON.stringify(error));
								});
						})
						.catch(function (error) {
							console.log(error);
							response.send(JSON.stringify(error));
						});
				})
				.catch(function (error) {
					console.log(error);
					response.send(JSON.stringify(error));
				});
		}
	};

})();
