const BaseController = require('./base');

class RankingController extends BaseController {

	constructor() {
		super(require('../models/game'));
	}

	getAll(id, modelId, callback) {
		this.find({ _id: id, 'runs._id': modelId }, { 'runs.$.ranking': 1 }, (error, data) => {
			if (error) return callback(error);

			callback(null, { entities: data.entities[0].runs[0].ranking });
		});
	}

	create(id, modelId, data, callback) {
		this._model.updateOne({ _id: id, 'runs._id': modelId }, { $push: { 'runs.$.ranking': { $each: data }}}, callback);
	}

}

module.exports = new RankingController();
