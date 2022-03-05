import express from 'express';
import Parameter from '../../models/parameters';
import Aquarium from '../../models/aquariums';
import auth from '../../middleware/auth';
import { AuthRequest } from '../../common/types';

const router: express.Router = express.Router();

interface ParameterType {
	ownerId: string;
	aquariumId: string;
	ph: {
		value?: number;
	};
	hrph: {
		value?: number;
	};
	ammonia: {
		value?: number;
	};
	nitrite: {
		value?: number;
	};
	nitrate: {
		value?: number;
	};
}

/*
 * @method GET
 * @desc get water parameters
 * @access private
 */
router.get('/:id', [auth], async (req: AuthRequest, res: express.Response) => {
	try {
		const { userId } = req.user;
		const { id } = req.params;

		const parameters = await Parameter.find({
			ownerId: userId,
			aquariumId: id,
		});
		return res.status(200).send({ parameters });
	} catch (err) {
		console.error(err);
		return res.status(500).send({
			errors: err,
		});
	}
});

/**
 * @method POST
 * @desc Create new parameter
 * @access private
 */
router.post('/:id', [auth], async (req: AuthRequest, res: express.Response) => {
	try {
		const { userId } = req.user;
		const { id } = req.params;

		const parameterField: ParameterType = {
			ownerId: userId,
			aquariumId: id,
			ph: {},
			hrph: {},
			ammonia: {},
			nitrite: {},
			nitrate: {},
		};

		// If the aquarium belongs to the user.
		const notUser = await Aquarium.countDocuments({
			_id: parameterField.aquariumId,
			ownerId: parameterField.ownerId,
		});

		if (notUser === 0) {
			return res.status(200).send('User does not own aquarium.');
		}

		const { ph, hrph, ammonia, nitrite, nitrate } = req.body;

		if (ph) parameterField.ph.value = ph;
		if (hrph) parameterField.hrph.value = hrph;
		if (ammonia) parameterField.ammonia.value = ammonia;
		if (nitrite) parameterField.nitrite.value = nitrite;
		if (nitrate) parameterField.nitrate.value = nitrate;

		const parameters = await Parameter.create(parameterField);

		await parameters.save();

		return res.status(200).send('Successfully added parameters');
	} catch (err) {
		console.error(err);
		return res.status(500).send({ errors: err });
	}
});

/**
 * @method PUT
 * @desc New input / record
 * @access private
 */
interface ParameterUpdate {
	ph: {
		value?: number;
	};
	hrph: {
		value?: number;
	};
	ammonia: {
		value?: number;
	};
	nitrite: {
		value?: number;
	};
	nitrate: {
		value?: number;
	};
}
// ID from parameters not from aquarium
router.put('/:id', [auth], async (req: AuthRequest, res: express.Response) => {
	try {
		const { id } = req.params;

		const parameterField: ParameterUpdate = {
			ph: {},
			hrph: {},
			ammonia: {},
			nitrite: {},
			nitrate: {},
		};

		const { ph, hrph, ammonia, nitrite, nitrate } = req.body;
		// Append objects if value exist.
		if (ph) parameterField.ph.value = ph;
		if (hrph) parameterField.hrph.value = hrph;
		if (ammonia) parameterField.ammonia.value = ammonia;
		if (nitrite) parameterField.nitrite.value = nitrite;
		if (nitrate) parameterField.nitrate.value = nitrate;

		const parameter = await Parameter.updateOne(
			{ _id: id },
			{ $push: parameterField }
		);

		return res.status(200).send(parameter);
	} catch (err) {
		console.error(err);
		return res.status(500).send({ errors: err });
	}
});

export default router;
