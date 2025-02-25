import {Schema, model} from "mongoose";

const userSchema = new Schema({
	firstName: {
		type: String,
		minlength: 3,
		required: [true, `First name required`],
	},
	lastName: {
		type: String,
		minlength: 3,
		required: [true, `Last name required`],
	},
	phone: {
		type: String,
		minlength: 9,
		maxlength: 12,
		required: [true, `Phone number required`],
	},
	email: {
		type: String,
		required: [true, `Email required`],
		lowercase: true,
		match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
	},
	password: {
		type: String,
		minlength: 5,
		required: [true, `Password required`],
	},
});

const userSchemas = model("user", userSchema);
export default userSchemas;
