import express from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../../models/users';

const router: express.Router = express.Router();

interface UserFields {
	username: string;
	password: string;
}

/* GET users listing. */
router.get('/', function (req: express.Request, res: express.Response) {
	res.send('respond with a resource');
});

/**
 * @method POST
 * @description Register user.
 * @public
 */
router.post(
	'/',

	body('username', 'Username should unique and not empty')
		.isLength({ min: 4 })
		.not()
		.isEmpty(),
	body('password', 'Password should be longer than 4')
		.isLength({ min: 5 })
		.not()
		.isEmpty(),

	async (req: express.Request, res: express.Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(200).send({
				errors: errors.array(),
			});
		}

		try {
			type HashedPassword = string;

			const { username, password } = req.body;
			const userFields: UserFields = {
				username: username.toLowerCase(),
				password,
			};

			const existingUsername = await User.findOne({
				username: userFields.username,
			});
			if (existingUsername) {
				return res.status(200).send({
					message: 'Username already exist!',
				});
			}

			const hashedPassword: HashedPassword = await argon2.hash(
				userFields.password,
				{
					hashLength: 50,
				}
			);

			userFields.password = hashedPassword;

			const user = new User(userFields);
			await user.save();

			return res.status(200).send({
				message: 'Successfully registered!',
			});
		} catch (err) {
			console.error('Something went wrong');
			return res.status(500).send({
				message: 'Server Error!',
			});
		}
	}
);

export default router;
