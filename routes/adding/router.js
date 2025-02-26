import {Router} from "express";
import {addAuthor, addBook} from "../../controllers/adding.controller.js";
import {
	validateAuthor,
	validateBook,
} from "../../middleware/verifyUser.Middleware.js";

const router = Router();

router.post(`/author`, validateAuthor, addAuthor);
router.post(`/book`, validateBook, addBook);

export {router};
