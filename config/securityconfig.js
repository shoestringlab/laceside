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

/* 
	/api/u - public access to user data, including POSTing a new user 
	/api/user - secured to only the current logged in user to access their own data

*/

const secured = [
	/\/api\/app\/[\w]+/,
	/\/api\/apps/,
	/\/api\/app/,
	/\/api\/applibraries/,
	/\/api\/files/,
	/\/api\/library\/[\w]+/,
	/\/api\/libraries/,
	/\/api\/library/,
	/\/api\/auth\/refresh/,
	/\/api\/user/,
	/\/api\/user\/[\w]+/,
	/\/api\/user\/[\w]+\/checkPassword/,
	/\/api\/user\/[\w]+\/changePassword/,
	/\/api\/user\/[\w]+\/libraries/,
	/\/api\/user\/[\w]+\/apps/,
	/\/api\/user\/profile\/[\w]+/
];

const open = [
	/\/api\/u/,
	/\/api\/u\/sendresetemail/,
	/\/api\/u\/passwordreset\/[\w]+/,
	/\/api\/u\/username\/[\w]+/,
	/\/api\/u\/email\/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
	/\/api\/u\/userconfirmation\/[\w]+/,
	/\/api\/auth\/login/,
	/\/api\/auth\/logout/
];

export var securityConfig = {
	routes: {
		secured: secured,
		open: open
	},
	ttl: 30 * 60 * 1000 // in milliseconds
}
