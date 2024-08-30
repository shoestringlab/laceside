import { a7 } from '/lib/altseven/dist/a7.js';
import { auth } from '/js/app.auth.js';
import { checkPasswordStrength } from '/js/app.utils.js';
import { fileuploader, modal, tabs, constructor } from '/lib/gadget-ui/dist/gadget-ui.es.js';

export var PublicProfile = function PublicProfile(props) {
	var publicprofile = a7.components.Constructor(a7.components.View, [props], true);


	publicprofile.state = {
		user: props.user
	};

	publicprofile.eventHandlers = {

	};

	publicprofile.template = function () {
		return `
      <div>
      <h2>${publicprofile.state.user.nickName}</h2>
      </div>
      <div class="right-align"><img style="max-width:300px;" src="${publicprofile.state.user.publicprofilePic || '/img/publicprofilePics/anon.png'}"/></div>

    `;
	};

	publicprofile.on("rendered", function () {
		return publicprofile;
	});
};
