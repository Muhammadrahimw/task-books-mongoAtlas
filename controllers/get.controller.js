import authorSchemas from "../schema/author.schema.js";
import bookSchemas from "../schema/book.schema.js";
import {CustomError, ResData} from "../utils/res-helpers.js";

export const getBooks = async (req, res, next) => {
	try {
		const {category, search} = req.query;
		let pipeline = [];

		if (search) {
			pipeline.push({
				$search: {
					index: "title",
					text: {
						query: search,
						path: ["title", "description", "author"],
					},
				},
			});
		}
		if (category) {
			pipeline.push({$match: {category}});
		}
		if (!pipeline.length) {
			const books = await bookSchemas.find();
			if (!books.length) throw new CustomError(404, "No books found");
			return res.status(200).json({status: 200, message: "success", books});
		}
		const books = await bookSchemas.aggregate(pipeline);
		if (!books.length)
			throw new CustomError(404, "No books found matching the query");

		res.status(200).json({status: 200, message: "success", books});
	} catch (error) {
		next(error);
	}
};

export const getBookById = async (req, res, next) => {
	try {
		const {id} = req.params;
		console.log(id);
		const book = await bookSchemas.findById(id).lean();
		if (!book) throw new CustomError(404, `Book not found`);
		const resData = new ResData(200, `success`, {...book});
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const getBookByName = async (req, res, next) => {
	try {
		const {name} = req.query;
		const findBook = await bookSchemas.find({title: name});
		if (!findBook.length) throw new CustomError(404, `Book not found`);
		const resData = new ResData(200, `success`, [...findBook]);
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const getAuthors = async (req, res, next) => {
	try {
		const authors = await authorSchemas.find();
		if (!authors) throw new CustomError(404, `There are no authors yet`);
		const resData = new ResData(200, `success`, [...authors]);
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};

export const getAuthorById = async (req, res, next) => {
	try {
		const {id} = req.params;
		const author = await authorSchemas.findById(id).lean();
		if (!author) throw new CustomError(404, `Author not found`);
		const resData = new ResData(200, `success`, {...author});
		res.status(resData.status).json(resData);
	} catch (error) {
		next(error);
	}
};
