UGIT.PUSH = METHOD((m) => {
	
	let git = require('simple-git');
	
	return {
		
		run : (params, callbackOrHandlers) => {
			//REQUIRED: params.path
			//REQUIRED: params.message
			//REQUIRED: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success
			
			let path = params.path;
			let message = params.message;
				
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
			
			git(path).silent(true).add('./*').commit(message).push('origin', 'master', (error) => {
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
