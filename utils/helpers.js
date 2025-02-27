import {totp} from "otplib";
import {transport} from "../config/mailer.js";
import {
	registerMailDesign,
	verifyCodeDesign,
	verifyLinkDesign,
} from "./res-verify-design.js";

export const sendVerifyCode = async (props) => {
	const secret = process.env.SECRET_KEY + props.email;
	const otpCode = totp.generate(secret);

	await transport.sendMail({
		from: process.env.MAIL_AUTH_NAME,
		to: props.email,
		subject: `Register code`,
		html: registerMailDesign({name: props.name, code: otpCode}),
	});
};

export const sendOnlyCode = async (props) => {
	const secret = process.env.SECRET_KEY + props;
	const otpCode = totp.generate(secret);
	console.log(props);
	await transport.sendMail({
		from: process.env.MAIL_AUTH_NAME,
		to: props,
		subject: `Register code`,
		html: verifyCodeDesign(otpCode),
	});
};

export const sendVerifyLink = async (props) => {
	await transport.sendMail({
		from: process.env.MAIL_AUTH_NAME,
		to: props.email,
		subject: `Verify`,
		html: verifyLinkDesign({
			link: `${process.env.FRONTEND_URL}/verify/?token=${props.token}`,
		}),
	});
};
