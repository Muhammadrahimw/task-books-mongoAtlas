import authorSchemas from "../schema/author.schema.js";
import bookSchemas from "../schema/book.schema.js";
import {CustomError, ResData} from "../utils/res-helpers.js";

export const addBook = async (req, res, next) => {
	try {
		const newBook = req.body;
		await bookSchemas.create(newBook);
		const resData = new ResData(201, `success`, {...newBook});
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const addAuthor = async (req, res, next) => {
	try {
		const author = req.body;
		const checkAuthor = await authorSchemas.findOne({
			firstName: author.firstName,
			lastName: author.lastName,
		});
		if (checkAuthor)
			throw new CustomError(400, `This author has already been added`);
		await authorSchemas.create(author);
		const resData = new ResData(201, `success`, {...author});
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};
