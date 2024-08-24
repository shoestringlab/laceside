import { librariesdao as dao } from './librariesdao.js';
import { librariesgateway as gateway } from './librariesgateway.js';

export var librariesservice = (function () {
	return {
		getLibraries: function (userID) {
			return (gateway.getLibraries(userID));
		},
		create: function (libraryID, userID, link, name) {
			return (dao.create(libraryID, userID, link, name));
		},
		read: function (libraryID) {
			return (dao.read(libraryID));
		},
		update: function (libraryID, userID, link, name) {
			return (dao.update(libraryID, userID, link, name));
		},
		delete: function (libraryID, userID) {
			return (dao.delete(libraryID, userID));
		}
	};

})();