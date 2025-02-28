import {Schema, model} from "mongoose";

const authorSchema = new Schema({
	firstName: {
		type: String,
		required: [true, "First name is required"],
		minlength: 3,
		maxlength: 20,
	},
	lastName: {
		type: String,
		required: [true, "Last name is required"],
		minlength: 3,
		maxlength: 20,
	},
	date: {
		type: String,
		required: [true, "Date of birth is required"],
	},
	dateofDeath: {
		type: String,
	},
	country: {
		type: String,
		required: [true, "Country is required"],
		minlength: 3,
		maxlength: 50,
	},
	bio: {
		type: String,
		minlength: 10,
		maxlength: 500,
	},
	image: {
		type: String,
		required: [true, "Image is required"],
		match: [
			/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
			"Please enter a valid image URL",
		],
	},
});

const authorSchemas = model(`Author`, authorSchema);
export default authorSchemas;
