var express = require('express');
var router = express.Router();
var { body, validationResult } = require('express-validator');

var Aquarium = require('../../models/aquariums');
/**
 * @method      GET
 * @description Return aquarium/s.
 * @access      Private
 */
router.get('/', async (req, res) => {
	try {
		const aquariums = await Aquarium.find();
		res.status(200).send(aquariums);
	} catch (err) {
		res.status(500).send('Server Error!');
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
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, shape, gallons } = req.body;

		try {
			const aquarium = new Aquarium({
				name,
				shape,
				gallons,
			});

			await aquarium.save();

			res.status(200).send('Successfully added Aquarium!');
		} catch (err) {
			console.error('Server Error!');
			res.status(500).send(err);
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

		const aquariumFields = {};

		if (name) aquariumFields.name = name;
		if (shape) aquariumFields.shape = shape;
		if (gallons) aquariumFields.gallons = gallons;

		let aquarium = await Aquarium.findById(req.params.id);

		if (!aquarium) {
			res.status(404).send('No data found.');
		}

		aquarium = await Aquarium.findByIdAndUpdate(
			req.params.id,
			{ $set: aquariumFields },
			{ new: true }
		);
		res.status(200).send('Successfully updated aquarium!');
	} catch (err) {
		res.status(500).send('Server Error!');
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
			res.status(404).send('No data found.');
		}

		await Aquarium.findOneAndDelete(req.params.id);

		res.status(200).send('Successfully deleted aquarium.');
	} catch (err) {
		res.status(500).send('Server Error!');
	}
});

module.exports = router;
