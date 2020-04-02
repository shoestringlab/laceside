import {a7} from '/lib/altseven/dist/a7.js';

export var SignupForm = function signupform(props) {
    var signupform = a7.components.Constructor(a7.components.View, [props], true);
    signupform.state = {

    };

    signupform.template = `
      <h2>Create Account</h2>
      <form>
      <div class="panel">
        <div>
          <div class="col w10 right-align"><label for="firstName">First Name</label></div>
          <div class="col w20"><input name="firstName" type="text"/></div>
        </div>
        <div>
          <div class="col w10 right-align"><label for="lastName">Last Name</label></div>
          <div class="col w20"><input name="lastName" type="text"/></div>
        </div>
        <div>
          <div class="col w10 right-align"><label for="email">Email Address</label></div>
          <div class="col w20"><input name="email" type="text"/></div>
        </div>
        <div>
          <div class="col w10 right-align"><label for="username">Username</label></div>
          <div class="col w20"><input name="username" type="text" data-onchange="checkUsername"/></div>
        </div>
      </div>
      </form>
    `;

    signupform.eventHandlers = {

    };

    return signupform;
  };
