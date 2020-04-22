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
  /\/api\/auth\/refresh/
];

const open = [
  /\/api\/u\/username\/c[\w]+/,
  /\/api\/user\/c[\w]+\/libraries/,
  /\/api\/user\/c[\w]+\/apps/,
  /\/api\/auth\/login/,
  /\/api\/auth\/logout/,
  /\/u\/[\w]+/,
  /\/u\/username\/[\w]+/
];

module.exports = {
  routes:{
    secured: secured,
    open: open
  },
  ttl: 30 // in minutes
}
