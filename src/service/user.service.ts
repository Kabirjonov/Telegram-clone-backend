import { MessageStatus } from "../consts/constats";
import BaseError from "../Error/BaseError";
import messageModel from "../models/message.model";
import userModel from "../models/user.model";
import { MessageDto } from "../types";
import { mailService } from "./mail.service";

class UserService {
	// async getContacts(userId: string) {
	// 	if (!userId) {
	// 		throw BaseError.BadRequest("User not found");
	// 	}

	// 	const user = await userModel.findById(userId).populate("contacts");

	// 	const allContacts = user.contacts.map(contact => contact.toObject());
	// 	for (const contact of allContacts) {
	// 		const lastMessage = await messageModel
	// 			.findOne({
	// 				$or: [
	// 					{ sender: userId, receiver: contact._id },
	// 					{ sender: contact._id, receiver: userId },
	// 				],
	// 			})
	// 			.populate({ path: "sender" })
	// 			.populate({ path: "receiver" })
	// 			.sort({ createAt: -1 });
	// 		contact.lastMessage = lastMessage;
	// 	}
	// 	return allContacts;
	// }
	async getContacts(userId: string) {
		if (!userId) {
			throw BaseError.BadRequest("User not found");
		}

		const user = await userModel.findById(userId).populate("contacts");

		if (!user) {
			throw BaseError.BadRequest("User not found");
		}

		const allContacts = await Promise.all(
			user.contacts.map(async (contact: any) => {
				const lastMessage = await messageModel
					.findOne({
						$or: [
							{ sender: userId, receiver: contact._id },
							{ sender: contact._id, receiver: userId },
						],
					})
					.populate("sender")
					.populate("receiver")
					.sort({ createdAt: -1 });

				const contactObj = contact.toObject();
				contactObj.lastMessage = lastMessage;

				return contactObj;
			}),
		);

		return allContacts;
	}
	async updateVerify(email: string) {
		if (!email) {
			throw BaseError.BadRequest("User with this email does not exist");
		}
		return await userModel.findOneAndUpdate({ email }, { isVerofied: true });
	}

	async createContact(email: string, userId: string) {
		if (!email) {
			throw BaseError.BadRequest("User with this email does not exist");
		}
		const user = await userModel.findById(userId);
		if (!user) {
			throw BaseError.BadRequest("User not found");
		}
		if (email === user.email)
			throw BaseError.BadRequest("You cannot add yourself as a contact");
		const contact = await userModel.findOne({ email });
		if (!contact) {
			throw BaseError.BadRequest("Contact user not found");
		}
		const existingContact = user.contacts.some(
			id => id.toString() === contact._id.toString(),
		);
		if (existingContact) {
			throw BaseError.BadRequest("Contact already added");
		}
		user.contacts.push(contact._id);
		contact.contacts.push(user._id);
		await user.save();
		await contact.save();
		return user;
	}

	async updateProfile(userId: string, payload: any) {
		return await userModel.findByIdAndUpdate(userId, payload, { new: true });
	}
	async sendOtp(email: string) {
		const existUser = await userModel.findOne({ email });
		// if (existUser)
		// 	throw BaseError.BadRequest("User with this email already exist");
		await mailService.sendOtp(email);
		return;
	}
	async updateEmail(userId: string, email: string, otp: string) {
		const result = await mailService.verifyOtp(email, otp);
		if (result) {
			const user = await userModel.findByIdAndUpdate(
				userId,
				{ email },
				{ new: true },
			);
			return user;
		}
		throw BaseError.BadRequest("Otp validation failed");
	}
	async deleteUser(userId: string) {
		if (!userId) throw BaseError.BadRequest("Id not found");
		return await userModel.findByIdAndDelete(userId);
	}
}
export const userService = new UserService();
