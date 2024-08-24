import { dbConfig } from "../config/dbconfig.js";

const pool = dbConfig.pool;

export var librariesgateway = (function () {
	return {
		getLibraries: function (userID) {
			return new Promise(function (resolve, reject) {
				pool.getConnection()
					.then(connection => {
						connection.query(`SELECT libraryID, userID, name, link
                            FROM libraries
                            WHERE userID = ?
                            ORDER BY name`, [userID])
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
