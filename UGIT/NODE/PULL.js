UGIT.PULL = METHOD((m) => {
	
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
			
			git(path).silent(true).pull('origin', 'master', (error) => {
				if (error !== TO_DELETE) {
					if (errorHandler !== undefined) {
						errorHandler(error.toString());
					}
				} else if (callback !== undefined) {
					callback();
				}
			});
		}
	};
});
