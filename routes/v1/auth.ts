import express from 'express';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { body, validationResult } from 'express-validator';
import User, { UserInterface } from '../../models/users';

import 'dotenv/config';

const router: express.Router = express.Router();

/**
 * @method GET
 * @description Get logged in user
 * @access private
 */
router.get('/', async (req, res) => {
	return res.status(200).send({
		message: 'Get username',
	});
});

/**
 * @method POST
 * @description Log in user
 * @access public
 */
router.post(
	'/login',
	body('username', 'Username is required').not().isEmpty(),
	body('password', 'Password is required').not().isEmpty(),
	async (req: express.Request, res: express.Response) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(200).send({ errors: errors.array() });
		}

		type VerifyPassword = boolean;

		try {
			const { username, password } = req.body;

			const user = await User.findOne({ username });
			if (!user) {
				return res.status(200).send({
					message: 'Either username and password is incorrect',
				});
			}

			const verifyPassword: VerifyPassword = await argon2.verify(
				user.password,
				password
			);

			if (!verifyPassword) {
				return res.status(401).send({
					message: 'Either username or password is incorrect.',
				});
			}

			const userPayload: UserInterface = {
				userId: user._id,
				username: user.username,
			};

			jwt.sign(
				{
					user: userPayload,
				},
				process.env.TOKEN_SECRET!,
				{
					expiresIn: 36000,
				},
				(err, token) => {
					console.log(err);
					if (err) throw err;
					return res.status(200).json({ token });
				}
			);
		} catch (err) {
			console.error('Something went wrong');
			return res.status(500).send({
				message: 'Server Error',
			});
		}
	}
);

export default router;
