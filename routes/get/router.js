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

router.get(`/books`, verifyToken, getBooks);
router.get(`/book/name`, verifyToken, getBookByName);
router.get(`/book/:id`, verifyToken, getBookById);
router.get(`/authors`, verifyToken, getAuthors);
router.get(`/author/:id`, verifyToken, getAuthorById);

export {router};
