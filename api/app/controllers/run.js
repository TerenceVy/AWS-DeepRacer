const BaseController = require('./base');

class RunController extends BaseController {

	constructor() {
		super(require('../models/game'));
	}

	getAll(id, callback) {
		this.find({ _id: id }, { 'runs._id': 1, 'runs.name': 1 }, (error, data) => {
			if (error) return callback(error);

			callback(null, { entities: data.entities[0].runs });
		});
	}

	create(id, data, callback) {
		this._model.updateOne({ _id: id }, { $push: { runs: data }}, callback);
	}

}

module.exports = new RunController();