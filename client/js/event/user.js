import { a7 } from '/lib/altseven/dist/a7.js';
import * as utils from '/js/app.utils.js';
import {ui} from '/js/app.ui.js';

export var userEvents = function init() {

	a7.events.subscribe("user.create", function (obj) {
		a7.remote.invoke("user.create", obj)
			.then(function (response) {
				// get json response and pass to handler to resolve
				return response.json();
			})
			.then(function (response) {
				if( response.success ){
					a7.ui.getView("signupForm").components.modal.close();
					let mState = a7.ui.getView("message").getState();
					mState.message = "Your account has been created. Please confirm your email address to start using the site.";
					a7.ui.getView("message").setState(mState);
					a7.ui.getView("message").components.modal.open();
				}else{
					console.log( response.error );
				}

			});
	});

	a7.events.subscribe("user.confirm", function (obj) {
		a7.remote.invoke("user.confirm", obj)
			.then(function (response) {
				// get json response and pass to handler to resolve
				return response.json();
			})
			.then(function (user) {
				a7.events.publish("main.home");
				a7.events.publish("main.showMessage", { message: "Your account has been confirmed, you may login to continue." });
			});
	});

	a7.events.subscribe("user.show", function (obj) {
		a7.remote.invoke("user.getUserByUsername", obj)
			.then(function (response) {
				// get json response and pass to handler to resolve
				return response.json();
			})
			.then(function (user) {
				a7.model.set("author", user);
				//reset the editor so no apps are cached in the background
				a7.events.publish("apps.new", {});
				a7.events.publish("main.run", { view: 'userhome' });
			});
	});

	a7.events.subscribe("user.update", function (obj) {
		a7.remote.invoke("user.update", obj)
			.then(function (response) {
				// get json response and pass to handler to resolve
				return response.json();
			})
			.then(function (user) {
				if (user.userID) {
					a7.events.publish("profile.refreshProfile");
				}
			});
	});

	a7.events.subscribe("user.getUserLibraries", function (obj) {
		a7.remote.invoke("user.getUserLibraries", obj)
			.then(function (response) {
				// get json response and pass to handler to resolve
				return response.json();
			})
			.then(function (json) {
				a7.model.set("libraryList", json);
				// if appID was passed, this event came from ide.show and we need to load the app
				if (obj.appID && a7.model.get("appList") !== undefined) {
					a7.events.publish("apps.load", obj);
				}
				a7.ui.getView('userLibs').fireEvent("mustRender");
			});
	});

	a7.events.subscribe("user.getUserApps", function (obj) {
		a7.remote.invoke("user.getUserApps", obj)
			.then(function (response) {
				// get json response and pass to handler to resolve
				return response.json();
			})
			.then(function (json) {

				a7.model.set("appList", json);

				// if appID was passed, this event came from ide.show and we need to load the app
				if (obj.appID && a7.model.get("libraryList") !== undefined) {
					a7.events.publish("apps.load", obj);
				}
				a7.ui.getView('userApps').fireEvent("mustRender");
			});
	});

	a7.events.subscribe("user.checkPassword", function (obj) {
		a7.remote.invoke("user.checkPassword", obj)
			.then(function (response) {
				// get json response and pass to handler to resolve
				return response.json();
			})
			.then(function (valid) {
				let profile = a7.ui.getView("profile");
				let dv = profile.element.querySelector("#currentPasswordMatches");
				let html = `<img src="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/check-8x.png" title="check.png" height="20">`;
				if (!valid) {
					html = `<img src="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/x-8x.png" title="x.png" height="20">`;
				}
				dv.innerHTML = html;
				profile.setState(Object.assign(profile.getState(), { currentPasswordMatches: valid }));
			});
	});

	a7.events.subscribe("user.changePassword", function (obj) {
		a7.remote.invoke("user.changePassword", obj)
			.then(function (response) {
				// get json response and pass to handler to resolve
				return response.json();
			})
			.then(function (success) {
				if (success) {
					utils.showNotice("Password changed.", "#pTab2Notice");
					let profile = a7.ui.getView("profile");
					let updated = { passwordIsValid: false, passwordMatches: false, currentPasswordMatches: false };
					profile.setState(Object.assign(profile.getState(), updated));
				}
			});
	});

	a7.events.subscribe("user.sendResetEmail", function (obj) {
		a7.remote.invoke("user.sendResetEmail", obj)
			.then(function (response) {
				return response.json();
			})
			.then(function (success) {
				if (success) {
					let fpf = a7.ui.getView("forgotPasswordForm");
					fpf.setState({ emailAddress: "", message: "" });
					fpf.components.modal.close();
					let msg = a7.ui.getView("message");
					msg.setState({ message: "An email message with a link to reset your password has been sent to you." });
					msg.components.modal.open();
				}
			});
	});

	a7.events.subscribe("user.showResetPasswordForm", function (obj) {
		a7.remote.invoke("user.getPasswordReset", obj)
			.then(function (response) {
				return response.json();
			})
			.then(function (passwordReset) {
				ui.setLayout("home");
				if (new Date(passwordReset.expires) < new Date()) {
					let msg = a7.ui.getView("message");
					msg.setState({ message: "That link has expired. Please request another password reset link." });
					msg.components.modal.open();
				} else {
					let rp = a7.ui.getView("resetPasswordForm");
					rp.setState({ passwordIsValid: false, passwordMatches: false, resetID: obj.resetID, message: "" });
					rp.components.modal.open();
				}
			});
	});

	a7.events.subscribe("user.resetPassword", function (obj) {
		a7.remote.invoke("user.resetPassword", obj)
			.then(function (response) {
				// get json response and pass to handler to resolve
				return response.json();
			})
			.then(function (success) {

				let rpf = a7.ui.getView("resetPasswordForm");
				if (success) {
					// close the form
					rpf.setState({ passwordIsValid: false, passwordMatches: false, resetID: 0, message: "" });
					rpf.components.modal.close();

					utils.showNotice("Password reset successful.", "#headerMiddle");
					let msg = a7.ui.getView("message");
					msg.setState({ message: "Your password has been reset. You may now login using your new password." });
					msg.components.modal.open();
				} else {
					rpf.setState(Object.assign(rpf.getState(), { passwordIsValid: false, passwordMatches: false, message: "There was an error attempting to reset your password." }));
				}
			});
	});

};
