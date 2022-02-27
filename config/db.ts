import 'dotenv/config';
import mongoose from 'mongoose';

const connectToDB = async () => {
	try {
		await mongoose.connect(process.env.DB_URL!);
		console.log('Succesfully connect to database');
	} catch (err) {
		console.error('Could not connect to database' + err);
	}
};

export default connectToDB;
/*import mongoose from 'mongoose';
import 'dotenv/config';

const connectToDB = async () => {
	try {
		await mongoose.connect(process.env.DB_URL);
		console.log('Successfully connected to database.');
	} catch (err) {
		console.error('Could not connect to database.' + err);
		process.exit(1);
	}
};

export default connectToDB;
*/
