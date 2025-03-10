import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {CustomError, ResData} from "./utils/res-helpers.js";
import {router} from "./routes/router.js";
import {connectDB} from "./db/db.connect.js";

dotenv.config();
const PORT = process.env.PORT || 6060;
const app = express();
app.use(
	cors({
		origin: ["http://localhost:3000", "https://task-books-frontend.vercel.app"],
		credentials: true,
	})
);

app.use(express.json());
app.use(router);

app.use((req, res, next) => {
	try {
		throw new CustomError(404, `${req.url} page not found`);
	} catch (error) {
		next(error);
	}
});

app.use((error, req, res, next) => {
	const statusCode = error.status || 500;
	const resData = new ResData(statusCode, error.message);
	res.status(resData.status).json(resData);
});

app.listen(PORT, () => {
	connectDB();
	console.log(`Server started in http://localhost:${PORT}`);
});
