"use strict";
import {emailConfig} from '../config/emailconfig.js';
import {securityConfig} from '../config/securityconfig.js';
import {Base64} from 'js-base64';

import { SHA3 } from 'sha3';

export var utils = (function() {
  return{
    generateToken: function( user ){
      const hash = new SHA3(512);

      let authtoken = Object.assign( {}, user );
      let now = new Date();
      authtoken.expires =  new Date( new Date( now ).getTime() + securityConfig.ttl );
	  console.log( "current date " +  new Date( now ) );
	  console.log( "expires " + authtoken.expires );
      let base64Token = Base64.encode( JSON.stringify( authtoken ) );
	  //let base64Token = Base64.encode( authtoken );
      hash.update( base64Token );
      let myhash = hash.digest( 'hex' );
	  console.log( myhash );

      return JSON.stringify( { token: base64Token, hash: myhash } );
    },
  
    checkAuthToken: function( authtoken, timeout ){
		const hash = new SHA3(512);
		let auth;
		authtoken = JSON.parse( authtoken );
		let token = authtoken.token;
		let hashCode = authtoken.hash;
		hash.update( token );
		let myhash = hash.digest( 'hex' );
		if( hashCode == myhash ){
			// token is valid
			auth = JSON.parse( Base64.decode( token ) );
		}
		return auth;
    },
  
    // async..await is not allowed in global scope, must use a wrapper
    sendEmail: async function( to, from, subject, message ) {
  
      // send mail with defined transport object
      let info = await emailConfig.transporter.sendMail({
        from: from, // sender address
        to: to,
        subject: subject,
        text: message.plainText,
        html: message.htmlText,
      });
  
      console.log("Message sent: %s", info.messageId);
    }
  };

})();
