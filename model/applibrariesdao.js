import { dbConfig } from "../config/dbconfig.js";

const pool = dbConfig.pool;

export var applibrariesdao = (function () {
	return {
		create: function (appID, libraryID) {
			return new Promise(function (resolve, reject) {
				pool.getConnection()
					.then(connection => {
						connection.query(`INSERT INTO appLibraries ( appID, libraryID )
									VALUES ( ?, ? )`, [appID, libraryID])
							.then((results) => {
								connection.end();
								resolve(true);
							})
							.catch(err => {
								connection.end();
								reject(err);
							});
					})
					.catch(err => {
						reject(err);
					});
			});
		},
		delete: function ( appID, libraryID, userID ) {
			return new Promise(function (resolve, reject) {
				pool.getConnection()
					.then(connection => {
						connection.query(`DELETE FROM appLibraries
								WHERE appID = ?
								AND libraryID = ?
								AND appID = (SELECT appID from apps WHERE userID = ? AND appID = ?)
								
								`, [ appID, libraryID, userID, appID ])
							.then((results) => {
								connection.end();
								resolve(true); // successful delete
							})
							.catch(err => {
								connection.end();
								reject(err);
							});
					})
					.catch(err => {
						reject(err);
					});
			});
		}
	};

})();

