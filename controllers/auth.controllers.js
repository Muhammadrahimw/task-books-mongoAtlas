import userSchemas from "../schema/user.schema.js";
import {sendVerifyLink} from "../utils/helpers.js";
import {hashPassword, SignInJwt} from "../utils/jwt.js";
import {CustomError, ResData} from "../utils/res-helpers.js";
import bcrypt from "bcrypt";

export const signUp = async (req, res, next) => {
	try {
		const newUser = req.body;
		const checkNewUser = await userSchemas.findOne({email: newUser.email});
		if (checkNewUser)
			throw new CustomError(400, `Already registered with this email`);
		const hashedPassword = await hashPassword(newUser.password);
		const verifyToken = SignInJwt(
			{
				firstName: newUser.firstName,
				email: newUser.email,
				lastName: newUser.lastName,
				phone: newUser.phone,
				password: hashedPassword,
			},
			`5m`
		);
		sendVerifyLink({...newUser, token: verifyToken});
		const resData = new ResData(200, `verify link sent to your email`);
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const verifySignUp = async (req, res, next) => {
	try {
		const checkUser = await userSchemas.findOne({email: req.user.email});
		if (checkUser) throw new CustomError(400, `Already registered`);
		const user = await userSchemas.create({
			firstName: req.user.firstName,
			lastName: req.user.lastName,
			phone: req.user.phone,
			email: req.user.email,
			password: req.user.password,
		});
		const token = SignInJwt({id: user._id}, `1d`);
		const resData = new ResData(201, `successfully registered`, {
			firstName: user.firstName,
			lastName: user.lastName,
			phone: user.phone,
			email: user.email,
			password: user.password,
			token: token,
		});
		res.cookie(`token`, token, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			maxAge: 60 * 60 * 1000,
		});
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const signIn = async (req, res, next) => {
	try {
		const {email, password} = req.body;
		if (!email || !password)
			throw new CustomError(400, `Email or password not found`);
		const checkUser = await userSchemas.findOne({email});
		if (!checkUser) throw new CustomError(404, `User not found`);
		const isMatch = await bcrypt.compare(password, checkUser.password);
		if (!isMatch) throw new CustomError(401, `Incorrect password`);
		const token = SignInJwt({id: checkUser.id}, `1d`);
		const resData = new ResData(200, `Logged in successfully`, {
			id: checkUser._id,
			firstName: checkUser.firstName,
			lastName: checkUser.lastName,
			phone: checkUser.phone,
			email: checkUser.email,
			token: token,
		});
		res.cookie(`token`, token, {
			httpOnly: true,
			secure: true,
			sameSite: "strict",
			maxAge: 60 * 60 * 1000,
		});
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const signOut = async (req, res, next) => {
	try {
		res.clearCookie("token");
		res.status(200).json({message: `Logged out successfully`});
	} catch (error) {
		next(error);
	}
};
