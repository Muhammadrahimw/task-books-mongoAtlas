import {Router} from "express";
import {validateUserSignUp} from "../../middleware/verifyUser.Middleware.js";
import {
	signIn,
	signUp,
	verifySignUp,
} from "../../controllers/auth.controllers.js";
import {verifyQueryToken} from "../../middleware/auth.middleware.js";
const router = Router();

router.post(`/sign-up`, validateUserSignUp, signUp);
router.get(`/verify`, verifyQueryToken, verifySignUp);
router.post(`/sign-in`, signIn);

export {router};
