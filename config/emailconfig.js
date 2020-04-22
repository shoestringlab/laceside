"use strict";

const nodemailer = require("nodemailer");

const smtpServer = {
  host: 'mail.shoestringlab.com' // email server host
};

const emailUser = {
  name: "LacesIDE Admin",
  emailaddress: "lacesadmin@shoestringlab.com", // your admin email address
  user: "lacesadmin", // your admin email username
  pass: "pwd123" // your admin email password
};

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: smtpServer.host,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: emailUser.user,
    pass: emailUser.pass
  },
  tls: {
      rejectUnauthorized: false
  }
});

module.exports = {
  smtpServer: smtpServer,
  emailUser: emailUser,
  transporter: transporter
};
