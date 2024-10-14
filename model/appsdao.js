import { dbConfig } from "../config/dbconfig.js";

const pool = dbConfig.pool;

export var appsdao = (function () {
	return {
		create: function (appID, userID, name, jsCode, htmlCode, cssCode, esModule, libraries) {
			return new Promise(function (resolve, reject) {
				pool.getConnection()
					.then(connection => {
						connection.query(`INSERT INTO apps ( appID, userID, name, jsCode, htmlCode, cssCode, esModule )
                            VALUES ( ?, ?, ?, ?, ?, ?, ? )`, [appID, userID, name, jsCode, htmlCode, cssCode, esModule])
							.then((results) => {
								try {
									if (libraries.length) {
										let libs = libraries.split(",");
										for (var ix = 0; ix < libs.length; ix++) {
											if (ix < libs.length - 1) {
												connection.query(`INSERT INTO appLibraries ( appID, libraryID )
                                        VALUES ( ?, ? )`, [appID, libs[ix]]);
											} else {
												connection.query(`INSERT INTO appLibraries ( appID, libraryID )
                                        VALUES ( ?, ? )`, [appID, libs[ix]], (err) => {
													//must handle error if any
													connection.commit();
												});
											}
										}
									}
								} catch (err) {
									connection.rollback();
									connection.end();
									reject(err);
								}
								connection.end();
								resolve(appID);
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

		read: function (appID) {
			return new Promise(function (resolve, reject) {
				pool.getConnection()
					.then(connection => {
						connection.query(`SELECT appID, name, jsCode, cssCode, htmlCode, esModule, userID
                            FROM apps
                            WHERE appID = ?`, [appID])
							.then((results) => {
								connection.query(`SELECT libraryID
                                  FROM appLibraries
                                  WHERE appID = ?`, [appID])
									.then((nextResults) => {
										if(nextResults.length){
											results[0].libraries = nextResults.map(lib => lib.libraryID).join(",");
										}
										connection.end();
										resolve(results[0]);
									})
									.catch(err => {
										connection.end();
										reject(err);
									});
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
		update: function (appID, userID, name, jsCode, htmlCode, cssCode, esModule, libraries) {
			return new Promise(function (resolve, reject) {
				pool.getConnection()
					.then(connection => {
						connection.query(`UPDATE apps
                            SET   name = ?,
                                  jsCode = ?,
                                  htmlCode = ?,
                                  cssCode = ?,
                                  esModule = ?
                            WHERE   appID = ?
                            AND     userID = ?`, [name, jsCode, htmlCode, cssCode, esModule, appID, userID])
							.then((results) => {
								connection.query(`DELETE FROM appLibraries
                                  WHERE appID = ? `, [appID])
									.then((deletedResults) => {
										try {
											if (libraries.length) {
												let libs = libraries.split(",");
												for (var ix = 0; ix < libs.length; ix++) {
													if (ix < libs.length - 1) {
														connection.query(`INSERT INTO appLibraries ( appID, libraryID )
                                            VALUES ( ?, ? )`, [appID, libs[ix]]);
														connection.commit();
													} else {
														connection.query(`INSERT INTO appLibraries ( appID, libraryID )
                                            VALUES ( ?, ? )`, [appID, libs[ix]], (err) => {
															//must handle error if any
															connection.commit();
														});
													}
												}
											}
										} catch (err) {
											connection.rollback();
											connection.end();
											reject(err);
										}
										connection.end();
										resolve(true);
									})
									.catch(err => {
										connection.end();
										reject(err);
									});
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
		delete: function (appID, userID) {
			return new Promise(function (resolve, reject) {
				pool.getConnection()
					.then(connection => {
						connection.query(`DELETE FROM apps
                          WHERE appID = ?
                          AND userID = ?`, [appID, userID])
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

