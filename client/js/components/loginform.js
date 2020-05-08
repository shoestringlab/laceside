import {a7} from '/lib/altseven/dist/a7.js';
import {auth} from '/js/app.auth.js';
import {constructor, modal} from '/lib/gadget-ui/dist/gadget-ui.es6.js';

export var LoginForm = function LoginForm(props) {
    var loginform = a7.components.Constructor(a7.components.View, [props], true);
    loginform.state = {
      username: "",
      password: "",
      message: ""
    };

    loginform.components.modal = constructor( modal,
      [ document.querySelector("#authModal"),
        {autoOpen: false, featherPath: '/lib/feather-icons'}], true ) ;

    loginform.template = function(){
      let state = loginform.getState();
      let templ = `

          <form><div id="loginForm" name="loginDiv" class="pane">
          <h3>Please Login</h3>

          <div class="right-align">
						<div class="col md right-align"><label for="username">Username</label></div>
						<div class="col md"><input name="username" type="text" value="${state.username}" data-onchange="handleUsername"/></div>
					</div>
					<div class="right-align">
						<div class="col md right-align"><label for="password">Password</label></div>
						<div class="col md"><input name="password" type="password" value="${state.password}" data-onchange="handlePassword"/></div>
					</div>
          <div class="right-align">
            <div class="col md right-align">&nbsp;</div>
            <div class="col md" id="loginMessages"><span>${state.message}</span></div>
          </div>
					<div class="right-align">
						<div class="col md"></div>
						<div class="col md"><button name="login" type="button" data-onclick="handleClick">Login</button></div>
					</div>
				</div>
        </form>
			`;
      return templ;
    }
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
      },
      forgotPassword: function(event){
        a7.events.publish( "auth.showForgotPassword" );
      }
    };

    return loginform;
  };
