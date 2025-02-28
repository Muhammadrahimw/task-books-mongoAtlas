import {Router} from "express";
import {verifyToken} from "../../middleware/auth.middleware.js";
import {
	getAuthorById,
	getAuthors,
	getBookById,
	getBookByName,
	getBooks,
} from "../../controllers/get.controller.js";
const router = Router();

router.get(`/books`, getBooks);
router.get(`/book/name`, getBookByName);
router.get(`/book/:id`, getBookById);
router.get(`/authors`, getAuthors);
router.get(`/author/:id`, getAuthorById);

export {router};
