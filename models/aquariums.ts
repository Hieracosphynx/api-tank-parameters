import mongoose from 'mongoose';

interface Aquarium {
	name: string;
	shape: string;
	gallons: number;
}

const AquariumSchema = new mongoose.Schema<Aquarium>({
	name: { type: String, required: true },
	shape: {
		type: String,
		required: true,
	},
	gallons: {
		type: Number,
		required: true,
	},
});

const AquariumModel = mongoose.model<Aquarium>('aquarium', AquariumSchema);
export default AquariumModel;
