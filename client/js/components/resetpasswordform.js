import {a7} from '/lib/altseven/dist/a7.js';
import {auth} from '/js/app.auth.js';
import {checkPasswordStrength} from '/js/app.utils.js';
import {modal,constructor} from '/lib/gadget-ui/dist/gadget-ui.es6.js';

export var ResetPasswordForm = function ResetPasswordForm(props) {
    var resetPasswordForm = a7.components.Constructor(a7.components.View, [props], true);
    resetPasswordForm.state = {
      passwordIsValid: false,
      passwordMatches: false,
      resetID: props.resetID,
      message: ""
    };

    resetPasswordForm.components.modal = constructor( modal,
      [ document.querySelector("#resetPasswordModal"),
        {autoOpen: false, featherPath: '/lib/feather-icons'}], true ) ;

    resetPasswordForm.template = function(){
      let state = resetPasswordForm.getState();
      let templ = `
          <form>
          <div id="resetPasswordForm" class="pane">
          <h3>Reset Your Password</h3>
          <div>
            <div class="col w10 right-align label">New Password</div>
            <div class="col w20"><input name="newPassword" type="password" placeholder="New password" data-onchange="checkPasswordStrength"></div>
            <div class="col w5" id="resetPasswordValidator"><span></span></div>
          </div>
          <div>
            <div class="col w10 right-align label">New Password (confirm)</div>
            <div class="col w20"><input name="newPasswordConfirm" type="password" placeholder="New password (confirm)" data-onchange="checkPasswordMatch"></div>
            <div class="col w5" id="resetPasswordMatched"></div>
          </div>
          <div class="right-align">
            <div class="col md right-align">&nbsp;</div>
            <div class="col md" id="resetPasswordMessages"><span>${state.message}</span></div>
          </div>
          <div>
            <div><button name="save" type="button" data-onclick="changePassword">Reset Password</button>
          </div>
				</div>
        </form>
			`;
      return templ;
    }
    resetPasswordForm.eventHandlers = {
      checkPasswordStrength: function( event ){
        resetPasswordForm.skipRender = true;
        let cls = ["Weak","Medium","Strong"];
        let password = resetPasswordForm.element.querySelector( "input[name='newPassword']" ).value;
        let strength = checkPasswordStrength( password );
        let pvs = resetPasswordForm.element.querySelector( "#resetPasswordValidator span" );
        pvs.classList.remove( ...cls );
        pvs.classList.add( strength.value );
        pvs.innerText = strength.value;
        let valid = false;
        if( password.trim().length > 5 ){
          valid = true;
        }
        resetPasswordForm.setState( Object.assign( resetPasswordForm.getState(), { passwordIsValid: valid } ) );
      },
      checkPasswordMatch: function( event ){
        resetPasswordForm.skipRender = true;
        let valid = ( resetPasswordForm.element.querySelector( "input[name='newPassword']" ).value === resetPasswordForm.element.querySelector( "input[name='newPasswordConfirm']" ).value );
        let dv = resetPasswordForm.element.querySelector( "#resetPasswordMatched" );
        let html = `<img src="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/check-8x.png" title="check.png" height="20">`;
        if( ! valid ){
          html = `<img src="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/x-8x.png" title="x.png" height="20">`;
        }
        dv.innerHTML = html;
        resetPasswordForm.setState( Object.assign( resetPasswordForm.getState(), { passwordMatches: valid } ) );
      },
      changePassword: function( event ){
        let state = resetPasswordForm.getState();
        a7.events.publish( "user.resetPassword", { resetID: state.resetID, newPassword: resetPasswordForm.element.querySelector( "input[name='newPassword']" ).value } );
      },
    };

    return resetPasswordForm;
  };
