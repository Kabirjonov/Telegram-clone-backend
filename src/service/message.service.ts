import { MessageStatus } from "../consts/constats";
import BaseError from "../Error/BaseError";
import messageModel from "../models/message.model";
import { MessageDto } from "../types";

class MessageService {
	async read(messageId: string) {
		return await messageModel.findByIdAndUpdate(
			messageId,
			{ status: MessageStatus.READ },
			{ new: true },
		);
	}
	async createMessage(body: MessageDto) {
		const message = await messageModel.create(body);
		const populatedMessage = await messageModel
			.findById(message._id)
			.populate({ path: "sender", select: "email" })
			.populate({ path: "receiver", select: "email" });

		return populatedMessage;
	}
	async reaction(messageId: string, reaction: string) {
		return await messageModel.findByIdAndUpdate(
			messageId,
			{ reaction },
			{ new: true },
		);
	}
	async update(text: string, messageId: string) {
		return await messageModel.findByIdAndUpdate(
			messageId,
			{ text },
			{ new: true },
		);
	}
	async delete(messageId: string) {
		return await messageModel.findByIdAndDelete(messageId);
	}

	async getMessage(contactId: string, user: string) {
		if (!contactId || !user) {
			throw BaseError.BadRequest("Id not found");
		}
		const message = await messageModel
			.find({
				$or: [
					{ sender: user, receiver: contactId },
					{ sender: contactId, receiver: user },
				],
			})
			.populate({ path: "sender", select: "email" })
			.populate({ path: "receiver", select: "email" });
		if (!message) {
			throw BaseError.BadRequest("message not found");
		}
		await messageModel.updateMany(
			{
				sender: user,
				receiver: contactId,
				status: MessageStatus.SENT,
			},
			{ status: MessageStatus.READ },
		);

		return message;
	}
}
export default new MessageService();
