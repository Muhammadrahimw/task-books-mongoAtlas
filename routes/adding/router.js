import {Router} from "express";
import {addBook} from "../../controllers/adding.controller.js";
import {validateBook} from "../../middleware/verifyUser.Middleware.js";

const router = Router();

router.post(`/book`, validateBook, addBook);

export {router};
