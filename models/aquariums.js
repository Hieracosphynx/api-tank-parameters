var mongoose = require('mongoose');

const AquariumSchema = mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	shape: {
		type: String,
	},
	gallons: {
		type: Number,
	},
});

module.exports = mongoose.model('aquarium', AquariumSchema);
