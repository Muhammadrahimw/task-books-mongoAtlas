import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {CustomError} from "../utils/res-helpers.js";
dotenv.config();

export const verifyToken = (req, res, next) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token) throw new CustomError(401, `Access denied. No token provided`);
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.user = decoded;
		next();
	} catch (error) {
		next(error);
	}
};

export const verifyQueryToken = (req, res, next) => {
	
	try {
		const {token} = req.query;
		if (!token) throw new CustomError(401, `Access denied. No token provided`);
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.user = decoded;
		next();
	} catch (error) {
		next(error);
	}
};
