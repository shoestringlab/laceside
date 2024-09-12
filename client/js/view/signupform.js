import {a7} from '/lib/altseven/dist/a7.js';
import {checkPasswordStrength} from '/js/app.utils.js';
import {constructor, modal} from '/lib/gadget-ui/dist/gadget-ui.es.js';

export var SignupForm = function signupform(props) {
    var signupform = a7.components.Constructor(a7.components.View, [props], true);
    signupform.state = {
      firstName: props.firstName || "",
      lastName: props.lastName || "",
      nickName: props.nickName || "",
      email: props.email || "",
      username: props.username || "",
      password: props.password || "",
      emailIsValid: props.emailIsValid || false,
      usernameIsValid: props.usernameIsValid || false,
      passwordIsValid: props.passwordIsValid || false,
      passwordMatches:  props.passwordMatches || false
    };

    signupform.components.modal = constructor( modal,
      [ document.querySelector("#signupModal"),
        {autoOpen: false, closeIcon: '/lib/feather-icons/dist/feather-sprite.svg#x-circle'}], true ) ;

    signupform.template = function(){

      let templ = `
        <h2>Create Account</h2>
        <form id="signupform">
        <div class="panel">
          <div>
            <div class="col w10 right-align label"><label for="firstName">First Name</label></div>
            <div class="col w20" style="align-content:flex-end;"><input class="required" required name="firstName" type="text" value="${signupform.state.firstName}" data-onchange="handleFirstName"/> <span>*</span></div>
            <div class="col w20"></div>
          </div>
          <div>
            <div class="col w10 right-align label"><label for="lastName">Last Name</label></div>
            <div class="col w20" style="align-content:flex-end;"><input required name="lastName" type="text" value="${signupform.state.lastName}" data-onchange="handleLastName"/> <span>*</span></div>
            <div class="col w20"></div>
          </div>
          <div>
            <div class="col w10 right-align label"><label for="nickName">Nick Name</label></div>
            <div class="col w20" style="align-content:flex-end;"><input required name="nickName" type="text" value="${signupform.state.nickName}" data-onchange="handleNickName"/> <span>&nbsp;</span></div>
            <div class="col w20"></div>
          </div>
          <div>
            <div class="col w10 right-align label"><label for="email">Email Address</label></div>
            <div class="col w20" style="align-content:flex-end;"><input required name="email" type="email" value="${signupform.state.email}" data-onchange="checkEmail"/> <span>*</span></div>
            <div class="col w20" id="emailValidator"></div>
          </div>
          <div>
            <div class="col w10 right-align label"><label for="username">Username</label></div>
            <div class="col w20" style="align-content:flex-end;"><input required name="username" type="text" data-onchange="checkUsername" value="${signupform.state.username}"/> <span>*</span></div>
            <div class="col w20" id="usernameValidator"></div>
          </div>
          <div>
            <div class="col w10 right-align label"><label for="username">Password</label></div>
            <div class="col w20" style="align-content:flex-end;"><input required name="password" placeholder="(minimum six characters)" type="password" data-onchange="checkPassword" value="${signupform.state.password}" data-onchange="checkPasswordMatch"/> <span>*</span></div>
            <div class="col w20" id="passwordValidator"><span></span></div>
          </div>
          <div style="display:inline-flex;">
            <div class="col w10 right-align label"><label for="username">Confirm Password</label></div>
            <div class="col w20" style="align-content:flex-end;"><input required name="passwordConfirm" type="password" data-onchange="checkPasswordMatch" value="${signupform.state.password}"/> <span>*</span></div>
            <div class="col w20" id="passwordMatched"></div>
          </div>
		  <div>
            <div class="col w10"></div>
            <div class="col w20 right-align" id="signupMessages">
			
			</div>
            <div class="col w20"></div>
          </div>
          <div>
            <div class="col w10"></div>
            <div class="col w20 right-align"><button name="cancel" type="button" data-onclick="cancelSignup">Cancel</button> <button name="signupButton" type="button" data-onclick="handleSubmit">Create Account</button></div>
            <div class="col w20"></div>
          </div>
        </div>
        </form>
      `;
      return templ;
    };

    signupform.eventHandlers = {
      handleFirstName: function( event ){
        signupform.skipRender = true;
        signupform.setState( Object.assign( signupform.getState(), { firstName: signupform.element.querySelector( "input[name='firstName']" ).value } ) );
      },
      handleLastName: function( event ){
        signupform.skipRender = true;
        signupform.setState( Object.assign( signupform.getState(), { lastName: signupform.element.querySelector( "input[name='lastName']" ).value } ) );
      },
      handleNickName: function( event ){
        signupform.skipRender = true;
        signupform.setState( Object.assign( signupform.getState(), { nickName: signupform.element.querySelector( "input[name='nickName']" ).value } ) );
      },
      checkUsername: function( event ){
        signupform.skipRender = true;
        let usernameValidator = signupform.element.querySelector( "#usernameValidator" );
        usernameValidator.innerHTML = '';
        let username = signupform.element.querySelector( "input[name='username']" ).value;
        if( username.trim().length ){
          // skipping events
          a7.remote.invoke( "user.checkUsername", { username: username } )
          .then( function( response ) {
            // get json response and pass to handler to resolve
            return response.json();
          })
          .then( function( exists ){
            let valid = false;
            if( exists ){
              usernameValidator.innerHTML = `<img src="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/x-8x.png" title="x.png" height="20">`;
            }else{
              valid = true;
              usernameValidator.innerHTML = `<img src="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/check-8x.png" title="check.png" height="20">`;
            }
            signupform.setState( Object.assign( signupform.getState(), { usernameIsValid: valid, username: username } ) );
          });
        }else{
          signupform.setState( Object.assign( signupform.getState(), { usernameIsValid: false, username: username } ) );
          usernameValidator.innerHTML = `<img src="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/x-8x.png" title="x.png" height="20">`;
        }
      },
      checkEmail: function( event ){
        signupform.skipRender = true;
        let emailValidator = signupform.element.querySelector( "#emailValidator" );
        emailValidator.innerHTML = '';
        let email = signupform.element.querySelector( "input[name='email']" ).value;

        if( email.trim().length ){
          // skipping events
          a7.remote.invoke( "user.checkEmail", { emailAddress: email } )
          .then( function( response ) {
            // get json response and pass to handler to resolve
            return response.json();
          })
          .then( function( exists ){
            let valid = false;
            if( exists ){
              emailValidator.innerHTML = `<img src="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/x-8x.png" title="x.png" height="20">`;
            }else{
              valid = true;
              emailValidator.innerHTML = `<img src="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/check-8x.png" title="check.png" height="20">`;
            }
            signupform.setState( Object.assign( signupform.getState(), { emailIsValid: valid, email: email } ) );
          });
        }else{
          signupform.setState( Object.assign( signupform.getState(), { emailIsValid: false, email: email } ) );
          emailValidator.innerHTML = `<img src="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/x-8x.png" title="x.png" height="20">`;
        }
      },
      checkPassword: function( event ){
        signupform.skipRender = true;
        let cls = ["Weak","Medium","Strong"];
        let password = signupform.element.querySelector( "input[name='password']" ).value;
        let strength = checkPasswordStrength( password );
        let pvs = signupform.element.querySelector( "#passwordValidator span" );
/*         pvs.classList.remove( ...cls )
			.classList.add( strength.value )
			.innerText = strength.value; */
        let valid = false;
        if( password.trim().length > 5 ){
          valid = true;
        }
        signupform.setState( Object.assign( signupform.getState(), { passwordIsValid: valid, password: password } ) );
      },
      checkPasswordMatch: function( event ){
        signupform.skipRender = true;
        let valid = ( signupform.element.querySelector( "input[name='password']" ).value === signupform.element.querySelector( "input[name='passwordConfirm']" ).value );
        //console.log( "Matched: " + valid );
        let dv = signupform.element.querySelector( "#passwordMatched" );
        let html = `<img src="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/check-8x.png" title="check.png" height="20">`;
        if( ! valid ){
          html = `<img src="https://cdnjs.cloudflare.com/ajax/libs/open-iconic/1.1.1/png/x-8x.png" title="x.png" height="20">&nbsp; Passwords do not match`;
        }
        dv.innerHTML = html;
        signupform.setState( Object.assign( signupform.getState(), { passwordMatches: valid } ) );
      },
      handleSubmit: function( event ){
		let state = signupform.getState();
		let signupMessages = document.getElementById("signupMessages");
        if( state.emailIsValid && state.usernameIsValid && state.passwordMatches ){
          let obj = {
            firstName: state.firstName,
            lastName: state.lastName,
            nickName: state.nickName,
            email: state.email,
            username: state.username,
            password: state.password
          };
		  signupMessages.innerHTML = '';
          a7.events.publish( "user.create", obj );
        }else{
			signupMessages.innerHTML = 'Please check your information';
		}
      },
      cancelSignup: function(){
        signupform.components.modal.close();
      }
    };

    return signupform;
  };
