class ResponseManager {

	static getDefaultResponseHandler(req, res, error, result) {
		if (error) {
			let hiddenErrors = [
				'NotFoundError'
			];
			if (!hiddenErrors.includes(error.name)) {
				console.error(error);
			}
			ResponseManager.respondWithError(res, error.status || 500, error.data, error.message);
		} else {
			if (result && result.result) {
				ResponseManager.respondWithSuccess(res, result.code || 200, result.result, result.message);
			} else {
				ResponseManager.respondWithSuccess(res, 200, result);
			}
		}
	}

	static respondWithSuccess(res, code, result = {}, messageCode = "") {
		let response = {
			success: true,
			code: messageCode,
			result: result
		};
		res.status(code).json(response);
	}

	static respondWithError(res, errorCode, result = {}, messageCode = 'UNKNOWN_ERROR') {
		let response = {
			success: false,
			code: messageCode,
			result: result
		};
		res.status(errorCode).json(response);
	}

}

module.exports = ResponseManager;