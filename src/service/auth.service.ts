import userModel from "../models/user.model";
import BaseError from "../Error/BaseError";
import { mailService } from "./mail.service";

class AuthService {
	async login(email: string) {
		let user = null;
		user = await userModel.findOne({ email }); // bu yerda register yoq chunki user faqat email orqali tizimga kiradi va agar email bazada mavjud bo'lmasa yangi user yaratiladi va emailga otp  jonatiladi

		if (user) {
			await mailService.sendOtp(email);
			return user;
			// throw BaseError.BadRequest("User already exist", [ // bu yerda agar email bazada bolsa otp jonatish va kirish agar yoq bolsa yaratamiz
			// 	{ email: "User already exist" },
			// ]);
		}
		const createUser = await userModel.create({ email });
		await mailService.sendOtp(email);
		return createUser;
	}
}

export const authService = new AuthService();
