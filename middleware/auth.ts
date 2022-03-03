import express from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../compiler/types';

const AuthMiddleware = async (
	req: AuthRequest,
	res: express.Response,
	next: express.NextFunction
) => {
	const token = req.header('Authorization');

	if (!token) {
		return res.status(401).send({
			message: 'Please login',
		});
	}

	try {
		type DecodedUser = any;
		const decoded: DecodedUser = jwt.verify(token, process.env.TOKEN_SECRET!);
		req.user = decoded.user;
		next();
	} catch (err) {
		console.error('Server Error');
		return res.status(500).send({
			errors: err,
		});
	}
};

export default AuthMiddleware;
