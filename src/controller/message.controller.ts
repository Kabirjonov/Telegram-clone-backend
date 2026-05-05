import { Request, Response } from "express";
import messageService from "../service/message.service";
const user = "69b154e4a1faa73b8113d505"; // bu yerda auth middlewaredan kelgan req.user._id boiyicha

class MessageController {
	async read(req: Request, res: Response) {
		const messageId = req.params.messageId as string;
		const result = await messageService.read(messageId);
		return res.send({
			message: "All your contacts",
			body: result,
			status: 200,
		});
	}
	async create(req: Request, res: Response) {
		const result = await messageService.createMessage({
			...req.body,
			sender: req.user?._id,
		});
		return res.send({
			message: "Message created successfully",
			body: result,
			status: 200,
		});
	}
	async reaction(req: Request, res: Response) {
		const { messageId, reaction } = req.body;
		const result = await messageService.reaction(messageId, reaction);
		return res.send({
			message: "Contact succesfully added",
			body: result,
			status: 201,
		});
	}
	async delete(req: Request, res: Response) {
		const messageId = req.params.messageId as string;
		const result = await messageService.delete(messageId);
		return res.send({
			message: "Contact succesfully deleted",
			body: result,
			status: 200,
		});
	}
	async getMessage(req: Request, res: Response) {
		const contactId = req.params.contactId as string;
		const userId = req.user?._id;
		const message = await messageService.getMessage(contactId, userId);
		return res.send({
			message: "You get them message",
			body: message,
			status: 200,
		});
	}
	async update(req: Request, res: Response) {
		const { text } = req.body;
		const messageId = req.params.messageId as string;
		const update = await messageService.update(text, messageId);
		return res.send({
			message: "Contact succesfully added",
			body: update,
			status: 201,
		});
	}
}
export default new MessageController();
