export var routes = [
  [ '/auth/showlogin', 'auth.showLogin' ],
  [ '/auth/login', 'auth.login' ],
  [ '/auth/logoutsuccess', 'auth.logoutsucess' ],
  [ '/auth/success', 'auth.success' ],
  [ '/auth/failed', 'auth.failed' ],
  [ '/u/:username/profile', 'profile.show' ],
  [ '/u/:username/:appID', 'ide.show' ],
  [ '/auth/userconfirmation/:userConfirmationID', 'user.confirm' ],
  [ '/auth/resetpassword/:resetID', 'user.showResetPasswordForm' ],
  [ '/u/:username', 'user.show' ],
  [ '/', 'main.home' ],
  [ '', 'main.home' ]
];
