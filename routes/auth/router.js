import {Router} from "express";
import {validateUserSignUp} from "../../middleware/verifyUser.Middleware.js";
const router = Router();

router.post(`/sign-up`, validateUserSignUp);

export {router};
