import userModel from "../models/user.model";
import BaseError from "../Error/BaseError";
import { mailService } from "./mail.service";

class AuthService {
	async login(email: string) {
		const user = await userModel.findOne({ email });
		if (user) {
			throw BaseError.BadRequest("User already exist", [
				{ email: "User already exist" },
			]);
		}
		const createUser = await userModel.create({ email });
		await mailService.sendOtp(email);
		return createUser;
	}
}

export const authService = new AuthService();
