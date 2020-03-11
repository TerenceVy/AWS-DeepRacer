const BaseAutoBindedClass = require('../base/base-autobind');

class BaseController extends BaseAutoBindedClass {

	constructor(model) {
		super();
		this._model = model;
		this._notFoundError = require('../errors/not-found');
	}

	find(query, fields, callback) {
		if (typeof query === 'function') {
			callback = query;
			query = {};
			fields = {};
		} else if (typeof fields === 'function') {
			callback = fields;
			fields = {};
		}

		this._model.find(query, fields, (error, entities) => {
			if (error) return callback(error);
			if (!entities || !entities.length) return callback(new this._notFoundError());

			callback(null, { entities });
		});
	}

	getOne(id, callback) {
		this.find(id, callback);
	}

	update(id, data, callback) {
		this._model.updateMany(id, data, error => {
			if (error) return callback(error);

			callback(null);
		});
	}

	create(data, callback) {
		let model = new this._model(data);

		model.save(callback);
	}

}

module.exports = BaseController;