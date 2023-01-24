"use strict";

const nodemailer = require("nodemailer");

const smtpServer = {
  host: 'mail.famili.io' // email server host
};

const emailUser = {
  name: "Famili Admin",
  emailaddress: "admin@famili.io", // your admin email address
  user: "admin", // your admin email username
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
