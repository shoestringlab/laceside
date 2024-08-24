import { dbConfig } from "../config/dbconfig.js";

const pool = dbConfig.pool;


export var appsgateway = (function () {
	return {
		getApps: function (userID) {
			return new Promise(function (resolve, reject) {
				pool.getConnection()
					.then(connection => {
						connection.query(`	SELECT a.appID, a.userID, a.jsCode, a.htmlCode, a.cssCode, a.esModule, a.name
                              FROM  apps a
                              WHERE userID = ?
                              ORDER BY a.name`, [userID])
							.then((results) => {
								connection.end();
								resolve(results);
							})
							.catch(err => {
								//not connected
								connection.end();
								reject(err);
							});
					})
					.catch(err => {
						//not connected
						reject(err);
					});
			});
		}
	};
})();
