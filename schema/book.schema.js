import {Schema, model} from "mongoose";

const bookSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Title is required"],
		},
		pages: {
			type: Number,
			required: [true, "Number of pages is required"],
		},
		year: {
			type: Number,
			required: [true, "Year of publication is required"],
		},
		price: {
			type: Number,
			required: [true, "Price is required"],
		},
		country: {
			type: String,
			required: [true, "Country of publication is required"],
		},
		author: {
			type: String,
			ref: "User",
			required: [true, "Author is required"],
		},
		description: {
			type: String,
			required: [true, "Description is required"],
		},
		image: {
			type: String,
			required: [true, "Image URL is required"],
			match: [
				/^https?:\/\/[^\s@]+\.[^\s@]+\.[^\s@]+$/,
				"Please enter a valid image URL",
			],
		},
		category: {
			type: String,
			required: [true, "Category is required"],
			enum: [
				"Temuriylar davri",
				"Jadid adabiyoti",
				"Sovet davri",
				"Mustaqillik davri",
			],
		},
	},
	{
		versionKey: false,
	}
);

const bookSchemas = model("Book", bookSchema);
export default bookSchemas;
