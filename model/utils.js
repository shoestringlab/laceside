"use strict";
const emailConfig = require( "../config/emailconfig.js" );
const Base64 = require('js-base64').Base64;
const shajs = require('sha.js');
const securityconfig = require('../config/securityconfig.js');

module.exports = {
  generateToken: function( user ){
    let authtoken = Object.assign( {}, user );
    let now = new Date();
	authtoken.expires =  new Date( new Date( now ).getTime() + securityconfig.ttl * 60000);
    let base64Token = Base64.encode( JSON.stringify( authtoken ) );
    let hash = new shajs.sha512().update( base64Token ).digest('hex');

    return JSON.stringify( { token: base64Token, hash: hash } );
  },

  checkAuthToken: function( authtoken, timeout ){
    let auth = { userID : 0, expires : new Date() };
    let tokenhash = JSON.parse( authtoken );
    let token = tokenhash.token;
    let hashCode = tokenhash.hash;
    console.log( "base auth:" );
    console.table( auth );
    if( hashCode == new shajs.sha512().update( token ).digest('hex') ){
      // token is valid
      auth = JSON.parse( Base64.decode( token ) );
      console.log( "Authenticated" );
      console.table( auth );
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
}
