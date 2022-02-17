var mongoose = require('mongoose');
require('dotenv').config();

const connectToDB = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Successfully connected to database.');
	} catch (err) {
		console.error('Could not connect to database.' + err);
		process.exit(1);
	}
};

module.exports = connectToDB;
