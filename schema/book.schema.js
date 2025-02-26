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
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Author is required"],
		},
		description: {
			type: String,
			required: [true, "Description is required"],
		},
	},
	{
		versionKey: false,
	}
);

const bookSchemas = model("Book", bookSchema);
