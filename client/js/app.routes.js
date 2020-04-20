export var routes = [
  [ '/auth/login', 'auth.login' ],
  [ '/auth/logout', 'auth.logout' ],
  [ '/auth/failed', 'auth.failed' ],
  [ '/u/:username/profile', 'profile.show' ],
  [ '/u/:username/:appID', 'ide.show' ],
  [ '/u/userconfirmation/:userConfirmationID', 'user.confirm' ],
  [ '/u/:username', 'user.show' ],
  [ '/', 'main.home' ],
  [ '', 'main.home' ]
];
