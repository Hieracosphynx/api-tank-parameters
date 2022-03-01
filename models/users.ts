import { Schema, Types, model } from 'mongoose';

interface User {
	username: string;
	password: string;
}

const UserSchema = new Schema<User>({
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

const UserModel = model<User>('user', UserSchema);

export interface UserInterface {
	userId: Types.ObjectId;
	username: string;
}

export default UserModel;
