const BaseController = require('./base');

class GameController extends BaseController {

	constructor() {
		super(require('../models/game'));
	}

	getAll(callback) {
		this.find({}, { name: 1 }, callback);
	}

}

module.exports = new GameController();