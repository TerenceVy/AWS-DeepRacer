class BaseError extends Error {

	constructor(message, status, data) {
		super(message);

		Error.captureStackTrace(this, this.constructor);

		this.name = this.constructor.name;
		this.status = status || 500;
		this.data = data || {};
	}

}

module.exports = BaseError;