UGIT.DIFF = METHOD((m) => {
	
	let git = require('simple-git');
	
	return {
		
		run : (path, callbackOrHandlers) => {
			//REQUIRED: path
			//REQUIRED: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success
				
			let errorHandler;
			let callback;
			
			if (callbackOrHandlers !== undefined) {
				
				if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
					callback = callbackOrHandlers;
				} else {
					errorHandler = callbackOrHandlers.error;
					callback = callbackOrHandlers.success;
				}
			}
			
			git(path).silent(true).add('./*').diffSummary(['origin/master'], (error, diff) => {
				
				let newFilePaths = [];
				let updatedFilePaths = [];
				let removedFilePaths = [];
				
				EACH(diff.files, (info) => {
					if (info.insertions === 1 && info.deletions === 0) {
						newFilePaths.push(info.file);
					} else if (info.insertions === 0 && info.deletions === 1) {
						removedFilePaths.push(info.file);
					} else {
						updatedFilePaths.push(info.file);
					}
				});
				
				if (error !== TO_DELETE) {
					if (errorHandler !== undefined) {
						errorHandler(error.toString());
					}
				} else if (callback !== undefined) {
					callback(newFilePaths, updatedFilePaths, removedFilePaths);
				}
			});
		}
	};
});
