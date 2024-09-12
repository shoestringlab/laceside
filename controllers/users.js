
import { userservice } from '../model/userservice.js';
import { passwordresetservice } from '../model/passwordresetservice.js';
import { utils } from '../model/utils.js';
import { emailConfig } from "../config/emailconfig.js";
import { siteConfig } from "../config/siteconfig.js";
import crypto from 'crypto';



function sendConfirmationMail(user, userConfirmationID) {
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

	utils.sendEmail(to, from, subject, message)
		.catch(console.error);
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
		.catch(console.error);
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

		getByUsername: function (request, response) {
			userservice.getByUsername(request.params.username)
				.then(function (results) {

					if (request.query.returnType !== undefined && request.query.returnType === 'boolean') {
						response.send(JSON.stringify(results.length));
					} else {
						let user = results[0];
						// remove the hash from the token so we don't send it outside the system
						delete user.hash;
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
			userservice.create(request.params.ID, request.body.username, request.body.password, request.body.firstName, request.body.lastName, request.body.nickName, request.body.emailAddress)
				.then(function (results) {
					// email the user

					//we are reading back the inserted row
					userservice.read(results.userID)
						.then(function (user) {
							sendConfirmationMail(user, results.userConfirmationID);

							response.send(JSON.stringify(user));
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
			/* }else{
			  response.setHeader( "Status", "401" );
			  response.send("Not authorized" );
			} */
		},

		read: function (request, response) {
			userservice.read(request.params.ID)
				.then(function (results) {
					// anon request
					if (request.user === undefined) {
						delete (results['hash']);
						delete (results['emailAddress']);
					}

					response.send(JSON.stringify(results));
				})
				.catch(function (error) {
					console.log(error);
					response.send(JSON.stringify(error));
				});
		},

		update: function (request, response) {
			if (request.params.ID === request.user.userID) {
				userservice.update(request.params.ID, request.body.firstName, request.body.lastName, request.body.nickName, request.body.emailAddress)
					.then(function (user) {
						//we are reading back the updated row
						userservice.read(request.params.ID)
							.then(function (user) {
								response.send(JSON.stringify(user));
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
		getCurrentUser: function (request, response) {
			userservice.read(request.user.userID)
				.then(function (results) {
					response.send(JSON.stringify(results));
				})
				.catch(function (error) {
					console.log(error);
					response.send(JSON.stringify(error));
				});
		},
		checkPassword: function (request, response) {
			userservice.getByUsername(request.params.username)
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
		},
		changePassword: function (request, response) {
			userservice.changePassword(request.params.ID, request.body.newPassword)
				.then(function (results) {
					response.send(JSON.stringify(results));
				})
				.catch(function (error) {
					console.log(error);
					response.send(JSON.stringify(error));
				});
		},
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
