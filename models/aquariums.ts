import { Schema, model } from 'mongoose';

interface Aquarium {
	ownerId: Schema.Types.ObjectId;
	name: string;
	shape: string;
	habitat: string; // Freshwater, Saltwater, etc....
	gallons: number;
}

const AquariumSchema = new Schema<Aquarium>({
	ownerId: {
		type: Schema.Types.ObjectId,
		ref: 'user',
		required: true,
	},
	name: { type: String, required: true },
	shape: {
		type: String,
		required: true,
	},
	habitat: {
		type: String,
		required: true,
	},
	gallons: {
		type: Number,
		required: true,
	},
});

const AquariumModel = model<Aquarium>('aquarium', AquariumSchema);
export default AquariumModel;
