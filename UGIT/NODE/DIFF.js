UGIT.DIFF = METHOD((m) => {
	
	let git = require('simple-git');
	let diffParser = require("git-diff-parser");
	
	return {
		
		run : (path, callbackOrHandlers) => {
			//REQUIRED: path
			//REQUIRED: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.error
			//REQUIRED: callbackOrHandlers.success
				
			let errorHandler;
			let callback;
			
			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				errorHandler = callbackOrHandlers.error;
				callback = callbackOrHandlers.success;
			}
			
			git(path).silent(true).add('./*').diff(['origin/master'], (error, diff) => {
				
				if (error !== TO_DELETE) {
					if (errorHandler !== undefined) {
						errorHandler(error.toString());
					}
				} else if (callback !== undefined) {
					
					let newFilePaths = [];
					let updatedFilePaths = [];
					let movedFilePaths = [];
					let removedFilePaths = [];
					
					EACH(diffParser(diff).commits[0].files, (info) => {
						if (info.added === true) {
							newFilePaths.push(info.name);
						} else if (info.deleted === true) {
							removedFilePaths.push(info.name);
						} else if (info.renamed === true) {
							movedFilePaths.push(info.name);
						} else {
							updatedFilePaths.push(info.name);
						}
					});
					
					callback(newFilePaths, updatedFilePaths, movedFilePaths, removedFilePaths);
				}
			});
		}
	};
});
