UGIT.DIFF = METHOD((m) => {
	
	let git = require('simple-git');
	let diffParser = require("git-diff-parser");
	
	return {
		
		run : (params, callbackOrHandlers) => {
			//REQUIRED: params
			//REQUIRED: params.url
			//REQUIRED: params.path
			//REQUIRED: params.username
			//REQUIRED: params.password
			//REQUIRED: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.error
			//REQUIRED: callbackOrHandlers.success
			
			let url = params.url;
			let path = params.path;
			let username = params.username;
			let password = params.password;
				
			let errorHandler;
			let callback;
			
			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				errorHandler = callbackOrHandlers.error;
				callback = callbackOrHandlers.success;
			}
			
			git(path).silent(true).addConfig('remote.origin.url', url.substring(0, url.indexOf('://') + 3) + username + ':' + password + '@' + url.substring(url.indexOf('://') + 3), (error) => {
				if (error !== TO_DELETE) {
					if (errorHandler !== undefined) {
						errorHandler(error.toString());
					}
				} else {
					
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
							
							let commit = diffParser(diff).commits[0];
							
							if (commit !== undefined) {
								EACH(commit.files, (info) => {
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
							}
							
							callback(newFilePaths, updatedFilePaths, movedFilePaths, removedFilePaths);
						}
					});
				}
			});
		}
	};
});
