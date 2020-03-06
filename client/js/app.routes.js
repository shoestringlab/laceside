export var routes = [
  [ '/auth/login', 'auth.login' ],
  [ '/auth/logout', 'auth.logout' ],
  [ '/u/:username', 'user.show' ],
  [ '/u/:username/:appId', 'app.show' ],
  [ '/u/:username/profile', 'profile.show' ]
];
