import {CustomError} from "../utils/res-helpers.js";
import {userValidator} from "../validator/user.validator.js";

export const validateUserSignUp = (req, res, next) => {
	try {
		const {error} = userValidator.validate(req.body);
		if (error) throw new CustomError(400, error.details[0].message);
		next();
	} catch (error) {
		next(error);
	}
};
