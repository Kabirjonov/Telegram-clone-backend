import { Request, Response } from "express";
import { userService } from "../service/user.service";
const user = "69b154e4a1faa73b8113d505"; // bu yerda auth middlewaredan kelgan req.user._id boiyicha

class UserController {
	async getContacts(req: Request, res: Response) {
		const userId = req.user?._id;
		const result = await userService.getContacts(userId);
		return res.send({
			message: "All your contacts",
			body: result,
			status: 200,
		});
	}

	async createContact(req: Request, res: Response) {
		const userId = req.user?._id;
		const { email } = req.body;
		const result = await userService.createContact(email, userId);
		return res.send({
			message: "Contact succesfully added",
			body: result,
			status: 201,
		});
	}

	async updateProfile(req: Request, res: Response) {
		const { ...payload } = req.body;
		const userId = req.user?.id; // auth middlewaredan kelgan user id sini olish
		const result = await userService.updateProfile(userId, payload);
		return res.send({
			message: "Profile succesfully updated",
			body: result,
			status: 200,
		});
	}
	async sendOtp(req: Request, res: Response) {
		const email = req.body.email;
		const result = await userService.sendOtp(email);
		return res.send({
			message: `We sent otp to ${email}`,
			body: result,
			status: 200,
		});
	}
	async updateEmail(req: Request, res: Response) {
		const { email, otp } = req.body;
		const userId = req.user?.id;
		const result = await userService.updateEmail(userId, email, otp);
		return res.send({
			message: "Profile succesfully updated",
			body: result,
			status: 200,
		});
	}
	async deleteUser(req: Request, res: Response) {
		const userId = req.user?.id;
		const result = await userService.deleteUser(userId);
		return res.send({
			message: "Profile succesfully deleted",
			body: result,
			status: 200,
		});
	}
}

export default new UserController();
