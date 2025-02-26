import {Router} from "express";
import {router as authRouter} from "./auth/router.js";
import {router as bookRouter} from "./adding/router.js";
const router = Router();

router.use(`/auth`, authRouter);
router.use(`/create`, bookRouter);

export {router};
