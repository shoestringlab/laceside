/* const secured = [
  /\/app\/[0-9]+/,
  /\/apps/,
  /\/app/,
  /\/library\/[0-9]+/,
  /\/libraries/,
  /\/library/,
  /\/user\/[0-9]+/,
  /\/users/,
  /\/user/,
  /\/auth\/refresh/,
]; */

const secured = [
  /\/api\/app\/c[\w]+/,
  /\/api\/apps/,
  /\/api\/app/,
  /\/api\/library\/c[\w]+/,
  /\/api\/libraries/,
  /\/api\/library/,
  /\/api\/u\/user\/c[\w]+/,
  /\/api\/auth\/refresh/
];

const open = [
  /\/api\/u\/username\[\w]+/,
  /\/api\/user\/sendresetemail/,
  /\/api\/user\/passwordreset\/c[\w]+/,
  /\/api\/user\/c[\w]+\/libraries/,
  /\/api\/user\/c[\w]+\/apps/,
  /\/api\/auth\/login/,
  /\/api\/email\/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
  /\/api\/userconfirmation\/c[\w]+/,
  /\/u\/[\w]+/,
  /\/auth\/resetpassword\/c[\w]+/,
  /\/auth\/userconfirmation\/c[\w]+/,
  /\/api\/auth\/logout/
  ];

module.exports = {
  routes:{
    secured: secured,
    open: open
  },
  ttl: 30 // in minutes
}
