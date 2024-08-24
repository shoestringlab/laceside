import {a7} from '/lib/altseven/dist/a7.js';
import {auth} from '/js/app.auth.js';
import {constructor, modal} from '/lib/gadget-ui/dist/gadget-ui.es.js';

export var ForgotPasswordForm = function ForgotPasswordForm(props) {
    var forgotPasswordForm = a7.components.Constructor(a7.components.View, [props], true);
    forgotPasswordForm.state = {
      emailAddress: "",
      emailExists: false,
      message: ""
    };

    forgotPasswordForm.components.modal = constructor( modal,
      [ document.querySelector("#forgotPasswordModal"),
        {autoOpen: false, featherPath: '/lib/feather-icons'}], true ) ;

    forgotPasswordForm.template = function(){
      let state = forgotPasswordForm.getState();
      let templ = `
          <form><div id="forgotPasswordForm" class="pane">
          <h3>Forgot Your Password?</h3>
          <div class="right-align">
						<div class="col md right-align"><label for="username">Email Address</label></div>
						<div class="col md"><input name="emailAddress" type="email" value="${state.emailAddress}" data-onchange="checkEmail"/></div>
					</div>

          <div class="right-align">
            <div class="col md right-align">&nbsp;</div>
            <div class="col md" id="forgotPasswordMessages"><span>${state.message}</span></div>
          </div>
					<div class="right-align">
						<div class="col md"></div>
						<div class="col md"><button name="sendReset" type="button" data-onclick="sendReset">Send Reset Email</button></div>
					</div>
				</div>
        </form>
			`;
      return templ;
    }
    forgotPasswordForm.eventHandlers = {
      checkEmail: function(event){
        let email = event.currentTarget.value;
        a7.remote.invoke( "user.checkEmail", { emailAddress: event.currentTarget.value } )
          .then( function( response ){
            return response.json();
          })
          .then( function( exists){
            if( ! exists ){
              forgotPasswordForm.setState( { emailAddress: email, emailExists: false, message: "That email address was not found." } );
            }else{
              forgotPasswordForm.skipRender = true;
              forgotPasswordForm.setState( { emailAddress: email, emailExists: true, message: "" } );
            }
          });
      },
      sendReset: function(event){
        if( forgotPasswordForm.getState().emailExists ){
          a7.events.publish( "user.sendResetEmail", { emailAddress: forgotPasswordForm.element.querySelector( "input[name='emailAddress']" ).value } );
        }
      }
    };

    return forgotPasswordForm;
  };
