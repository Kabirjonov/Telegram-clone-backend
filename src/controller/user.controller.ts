import { Request, Response } from "express";
import { userService } from "../service/user.service";
const user = "69b154e4a1faa73b8113d505"; // bu yerda auth middlewaredan kelgan req.user._id boiyicha

class UserController {
	async getContacts(req: Request, res: Response) {
		const result = await userService.getContacts(user);
		return res.send({
			message: "All your contacts",
			body: result,
			status: 200,
		});
	}

	async createContact(req: Request, res: Response) {
		const user = "69b16c18c55c3d510c31089b";
		const { email } = req.body;
		const result = await userService.createContact(email, user);
		return res.send({
			message: "Contact succesfully added",
			body: result,
			status: 201,
		});
	}

	async updateProfile(req: Request, res: Response) {
		const { userId, ...payload } = req.body;
		console.log("paylad", payload);
		const result = await userService.updateProfile(userId, payload);
		return res.send({
			message: "Profile succesfully updated",
			body: result,
			status: 200,
		});
	}
	async sendOtp(req: Request, res: Response) {
		const { email } = req.body;
		const result = await userService.sendOtp(email);
		return res.send({
			message: "Otp seccesfully sended",
			body: result,
			status: 200,
		});
	}
	async updateEmail(req: Request, res: Response) {
		const { email, otp } = req.body;
		const user = "69b8700e61e0dd9579a27573"; // bu yerda auth middlewaredan kelgan req.user._id boiyicha

		const result = await userService.updateEmail(user, email, otp);
		return res.send({
			message: "Profile succesfully updated",
			body: result,
			status: 200,
		});
	}
	async deleteUser(req: Request, res: Response) {
		const userId = req.params.userId as string;
		const result = await userService.deleteUser(userId);
		return res.send({
			message: "Profile succesfully deleted",
			body: result,
			status: 200,
		});
	}
}

export default new UserController();
