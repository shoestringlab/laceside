export var routes = [
  [ '/auth/login', 'auth.login' ],
  [ '/auth/logout', 'auth.logout' ],
  [ '/auth/failed', 'auth.failed' ],
  [ '/u/:username', 'user.show' ],
  [ '/u/:username/:appId', 'app.show' ],
  [ '/u/:username/profile', 'profile.show' ],
  [ '/', 'main.home' ]
];
