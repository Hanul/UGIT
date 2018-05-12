UGIT.CLONE = METHOD((m) => {
	
	let git = require('simple-git');
	
	return {
		
		run : (params, callbackOrHandlers) => {
			//REQUIRED: params
			//REQUIRED: params.url
			//REQUIRED: params.path
			//REQUIRED: params.username
			//REQUIRED: params.password
			//REQUIRED: callbackOrHandlers
			//OPTIONAL: callbackOrHandlers.error
			//OPTIONAL: callbackOrHandlers.success
			
			let url = params.url;
			let path = params.path;
			let username = params.username;
			let password = params.password;
				
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
			
			git().silent(true).clone(url.substring(0, url.indexOf('://') + 3) + username + ':' + password + '@' + url.substring(url.indexOf('://') + 3), path, (error) => {
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
