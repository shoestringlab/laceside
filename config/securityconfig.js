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
  /\/api\/app\/[0-9]+/,
  /\/api\/apps/,
  /\/api\/app/,
  /\/api\/library\/[0-9]+/,
  /\/api\/libraries/,
  /\/api\/library/,
  /\/api\/auth\/refresh/
];

const open = [
  /\/api\/u\/username\/[\w]+/,
  /\/api\/user\/[0-9]+\/libraries/,
  /\/api\/user\/[0-9]+\/apps/,
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
