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
});

const authorSchemas = model(`Author`, authorSchema);
export default authorSchemas;
