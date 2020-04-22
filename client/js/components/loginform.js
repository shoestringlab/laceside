import {a7} from '/lib/altseven/dist/a7.js';
import {auth} from '/js/app.auth.js';
import {constructor, modal} from '/lib/gadget-ui/dist/gadget-ui.es6.js';

export var LoginForm = function LoginForm(props) {
    var loginform = a7.components.Constructor(a7.components.View, [props], true);
    loginform.state = {
      username: "",
      password: ""
    };

    loginform.components.modal = constructor( modal,
      [ document.querySelector("#authModal"),
        {autoOpen: false, featherPath: '/lib/feather-icons'}], true ) ;

    loginform.template = `<form><div id="loginForm" name="loginDiv" class="pane">
					<div class="right-align">
						<div class="col md right-align"><label for="username">Username</label></div>
						<div class="col md"><input name="username" type="text" value="${loginform.state.username}" data-onchange="handleUsername"/></div>
					</div>
					<div class="right-align">
						<div class="col md right-align"><label for="password">Password</label></div>
						<div class="col md"><input name="password" type="password" value="${loginform.state.password}" data-onchange="handlePassword"/></div>
					</div>
					<div class="right-align">
						<div class="col md"></div>
						<div class="col md"><button name="login" type="button" data-onclick="handleClick">Login</button></div>
					</div>
				</div>
        </form>
				<p>
					<h3>Instructions</h3>
				</p>
				<p>
					Login using the credentials:
				</p>
				<p>
					&nbsp;&nbsp;username : user
				</p>
				<p>
					&nbsp;&nbsp;password: password
				</p>`;

    loginform.eventHandlers = {
      handleClick: function(event) {
        a7.events.publish('auth.login', {
          username: loginform.state.username,
          password: loginform.state.password,
          success: "/auth/success",
          failure: "/auth/failed"
          //callback: auth.loginHandler
        });
      },
      handleUsername: function(event) {
        loginform.state.username = event.target.value;
      },
      handlePassword: function(event) {
        loginform.state.password = event.target.value;
      }
    };

    return loginform;
  };
