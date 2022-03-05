import { Schema, Types, model } from 'mongoose';

type ParameterType = Array<{
	value: number;
	date: Date;
}>;

interface Parameter {
	aquariumId: Schema.Types.ObjectId;
	ownerId: Schema.Types.ObjectId;
	ph: ParameterType;
	hrph: ParameterType;
	ammonia: ParameterType;
	nitrite: ParameterType;
	nitrate: ParameterType;
}

const ParameterSchema = new Schema<Parameter>(
	{
		aquariumId: {
			type: Schema.Types.ObjectId,
			ref: 'aquarium',
			required: true,
		},
		ownerId: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
		ph: [
			{
				value: {
					type: Number,
					default: 0.0,
				},
				date: {
					type: Date,
					default: Date.now,
				},
			},
		],
		hrph: [
			{
				value: {
					type: Number,
					default: 0.0,
				},
				date: {
					type: Date,
					default: Date.now,
				},
			},
		],
		ammonia: [
			{
				value: {
					type: Number,
					default: 0.0,
				},
				date: {
					type: Date,
					default: Date.now,
				},
			},
		],
		nitrite: [
			{
				value: {
					type: Number,
					default: 0.0,
				},
				date: {
					type: Date,
					default: Date.now,
				},
			},
		],
		nitrate: [
			{
				value: {
					type: Number,
					default: 0.0,
				},
				date: {
					type: Date,
					default: Date.now,
				},
			},
		],
	},
	{ timestamps: true }
);

const ParameterModel = model<Parameter>('parameter', ParameterSchema);

export default ParameterModel;
