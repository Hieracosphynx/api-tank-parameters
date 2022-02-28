import mongoose from 'mongoose';

interface User {
	username: string;
	password: string;
}

const UserSchema = new mongoose.Schema<User>({
	username: {
		type: String,
		require: true,
		unique: true,
	},
	password: {
		type: String,
		require: true,
	},
});

const UserModel = mongoose.model<User>('user', UserSchema);

export default UserModel;
