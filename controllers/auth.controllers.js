import userSchemas from "../schema/user.schema.js";
import {sendVerifyCode} from "../utils/helpers.js";
import {SignInJwt} from "../utils/jwt.js";
import {CustomError} from "../utils/res-helpers.js";

export const signUp = async (req, res, next) => {
	try {
		const newUser = req.body;
		const checkNewUser = await userSchemas.findOne({email: newUser.email});
		if (checkNewUser)
			throw new CustomError(400, `Already registered with this email`);
		sendVerifyCode(newUser);
		const verifyToken = SignInJwt({email: newUser.email}, `5m+`);
	} catch (error) {
		next(error);
	}
};
