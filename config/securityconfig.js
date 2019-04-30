const secured = [
  /\/library\/[0-9]+/,
  /\/libraries/,
  /\/library/,
  /\/user\/[0-9]+/,
  /\/users/,
  /\/user/,
  /\/auth\/refresh/,
];

const open = [
  /\/auth\/login/,
  /\/auth\/logout/
];

module.exports = {
  routes:{
    secured: secured,
    open: open
  },
  ttl: 30 // in minutes
}
