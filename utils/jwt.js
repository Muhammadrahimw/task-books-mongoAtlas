import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();
export const SignInJwt = (params, time = `2h`) => {
	return jwt.sign(params, process.env.SECRET_KEY, {expiresIn: time});
};

export const hashPassword = async (password) => {
	return await bcrypt.hash(password, 10);
};
