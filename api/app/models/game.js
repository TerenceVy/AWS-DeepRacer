const mongoose = require('mongoose');

module.exports = mongoose.model('games', new mongoose.Schema({
	name: {
		type: String, required: true
	},
	runs: [{
		name: {
			type: String, required: true
		},
		ranking: [{
			name: {
				type: String, required: true
			},
			time: {
				type: Number, required: true
			}
		}]
	}]
}));