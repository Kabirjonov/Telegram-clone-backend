import BaseError from "../Error/BaseError";
import otpModel from "../models/otp.model";
const bcrypt = require("bcrypt");
import nodemailer from "nodemailer";

class MailService {
	private transporter: ReturnType<typeof nodemailer.createTransport>;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: Number(process.env.SMTP_PORT),
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		});
	}

	async sendOtp(to: string) {
		const otp = String(Math.floor(100000 + Math.random() * 900000));
		console.log({ "Sending otp": otp });
		const hashedOtp = await bcrypt.hash(otp.toString(), 10);
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: `OTP for verification ${new Date().toLocaleString()}`,
			html: `<h2>Your verification code</h2>
<p style="font-size:20px">${otp}</p>`,
		});
		await otpModel.create({
			email: to,
			otp: hashedOtp,
			expireAt: new Date(Date.now() + 5 * 60 * 1000),
		});
	}

	async verifyOtp(email: string, otp: string) {
		const otpData = await otpModel.findOne({ email }).sort({ createdAt: -1 });
		if (!otpData) {
			throw BaseError.BadRequest("Otp not found");
		}

		if (otpData.expireAt < new Date()) {
			throw BaseError.BadRequest("Your otp is expired");
		}

		const isValid = await bcrypt.compare(otp, otpData.otp);

		if (!isValid) {
			throw BaseError.BadRequest("Invalid otp entered");
		}

		await otpModel.deleteMany({ email });

		return true;
	}
}

export const mailService = new MailService();
