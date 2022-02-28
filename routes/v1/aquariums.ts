import express from 'express';
import { body, validationResult } from 'express-validator';
import Aquarium from '../../models/aquariums';

const router: express.Router = express.Router();

interface AquariumFields {
	name: string;
	shape: string;
	gallons: number;
}
/**
 * @method      GET
 * @description Return aquarium/s.
 * @access      Private
 */
router.get('/', async (req, res) => {
	try {
		const aquariums = await Aquarium.find();
		return res.status(200).send(aquariums);
	} catch (err) {
		return res.status(500).send('Server Error!');
	}
});

/**
 * @method      POST
 * @description New aquarium
 * @access      Private
 */
router.post(
	'/',

	body('name', 'Name is required').not().isEmpty(),
	body('shape', 'Shape is required').not().isEmpty(),
	body('gallons', 'Gallons is required').isNumeric().not().isEmpty(),

	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(200).send({ errors: errors.array() });
		}

		const { name, shape, gallons } = req.body;
		const aquariumField: AquariumFields = {
			name,
			shape,
			gallons,
		};
		try {
			const aquarium = new Aquarium(aquariumField);

			await aquarium.save();

			return res.status(200).send('Successfully added Aquarium!');
		} catch (err) {
			console.error('Server Error!');
			return res.status(500).send(err);
		}
	}
);

/**
 * @method      PUT
 * @description Update aquarium
 * @access      Private
 */
router.put('/:id', async (req, res) => {
	try {
		const { name, shape, gallons } = req.body;

		const aquariumFields: any = {};

		if (name) aquariumFields.name = name;
		if (shape) aquariumFields.shape = shape;
		if (gallons) aquariumFields.gallons = gallons;

		let aquarium = await Aquarium.findById(req.params.id);

		if (!aquarium) {
			return res.status(404).send('No data found.');
		}

		aquarium = await Aquarium.findByIdAndUpdate(
			req.params.id,
			{ $set: aquariumFields },
			{ new: true }
		);
		return res.status(200).send('Successfully updated aquarium!');
	} catch (err) {
		return res.status(500).send('Server Error!');
	}
});

/**
 * @method      DELETE
 * @description Delete aquarium
 * @access      Private
 */
router.delete('/:id', async (req, res) => {
	try {
		const aquarium = await Aquarium.findById(req.params.id);

		if (!aquarium) {
			return res.status(404).send('No data found.');
		}

		await Aquarium.findOneAndDelete({ _id: req.params.id });

		return res.status(200).send('Successfully deleted aquarium.');
	} catch (err) {
		return res.status(500).send('Server Error!');
	}
});

export default router;
