import { Request, Response } from "express";
import { authService } from "../service/auth.service";
import { mailService } from "../service/mail.service";
import { userService } from "../service/user.service";

class AuthController {
	async login(req: Request, res: Response) {
		const { email } = req.body;
		console.log("email login", req.body);
		const user = await authService.login(email);
		return res.send({
			message: "Your account created successfully",
			body: user,
			status: 200,
		});
	}
	async verify(req: Request, res: Response) {
		const { email, otp } = req.body;
		const resume = await mailService.verifyOtp(email, otp);
		if (resume) {
			await userService.updateVerify(email);
		}
		return res.send({
			message: "verifi",
			body: { email },
			status: 200,
		});
	}
}

export default new AuthController();
