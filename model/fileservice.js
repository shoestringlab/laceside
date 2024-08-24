import { filepartdao as dao } from './filepartdao.js';
import { createId } from '@paralleldrive/cuid2';
import concat from 'concat-files';


const uploadPath = './client';
import fs from 'fs';

function deleteFiles(files, callback) {
	let i = files.length;
	files.forEach(function (filepath) {
		fs.unlink(filepath, function (err) {
			i--;
			if (err) {
				callback(err);
				return;
			} else if (i <= 0) {
				callback(null);
			}
		});
	});
}

export var fileservice = (function () {
	return {
		createFilePart: function (fileId, filepath, filepart, parts) {
			return (dao.create(fileId, filepath, filepart, parts));
		},
		readFilePart: function (fileId) {
			return (dao.read(fileId));
		},
		deleteFileParts: function (fileId) {
			return (dao.delete(fileId));
		},
		upload: function (id, tempFile, part, parts, filename, filesize, path) {
			return new Promise(function (resolve, reject) {
				let addedPart = dao.create(id, tempFile, part, parts);

				let result = {
					fileId: id,
					path: path,
					filename: filename,
					disabled: 0,
					filesize: filesize,
					tags: '',
					mimetype: 'application/octect-stream',
					created: new Date()
				};

				if (part === parts) {
					dao.read(id)
						.then(function (fileparts) {
							let filenameparts = filename.split(".");
							let fileextension = filenameparts[filenameparts.length - 1].toLowerCase();
							// rename file
							let newFilename = createId() + "." + fileextension;

							let files = fileparts.map(filepart => filepart.filepath);
							console.dir(concat);

							concat(files, uploadPath + path + newFilename, function (err) {
								if (err) console.log(err);

								// clean up
								dao.delete(id)
									.then(function (success) {

										/*  deleteFiles( files, function(err){
										   if (err) {
											 console.log(err);
										   } else {
											 console.log('all temp files removed');
										   }
										 }); */
									})
									.catch(function (error) {
										console.log(error);
									});
								result.filename = newFilename;
								resolve(result);
							});
						})
						.catch(function (error) {
							console.log(error);
							reject(error);
						});

				} else {
					resolve(result);
				}
			});
		}
	};
})();

