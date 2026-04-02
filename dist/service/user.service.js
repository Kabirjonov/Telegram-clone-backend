"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const constats_1 = require("../consts/constats");
const BaseError_1 = __importDefault(require("../Error/BaseError"));
const message_model_1 = __importDefault(require("../models/message.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
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
    async getContacts(userId) {
        if (!userId) {
            throw BaseError_1.default.BadRequest("User not found");
        }
        const user = await user_model_1.default.findById(userId).populate("contacts");
        if (!user) {
            throw BaseError_1.default.BadRequest("User not found");
        }
        const allContacts = await Promise.all(user.contacts.map(async (contact) => {
            const lastMessage = await message_model_1.default
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
        }));
        return allContacts;
    }
    async updateVerify(email) {
        if (!email) {
            throw BaseError_1.default.BadRequest("User with this email does not exist");
        }
        return await user_model_1.default.findOneAndUpdate({ email }, { isVerofied: true });
    }
    async getMessage(contactId, user) {
        if (!contactId) {
            throw BaseError_1.default.BadRequest("Id not found");
        }
        await message_model_1.default.updateMany({
            sender: contactId,
            receiver: user,
            status: constats_1.MessageStatus.SENT,
        }, { status: constats_1.MessageStatus.READ });
        const message = await message_model_1.default
            .find({
            $or: [
                { sender: user, receiver: contactId },
                { sender: contactId, receiver: user },
            ],
        })
            .populate({ path: "sender", select: "email" })
            .populate({ path: "receiver", select: "email" });
        if (message.length === 0) {
            throw BaseError_1.default.BadRequest("Message not found");
        }
        return message;
    }
    async createMessage(body) {
        const message = await message_model_1.default.create(body);
        const user = await message_model_1.default
            .findById(message._id)
            .populate({ path: "sender", select: "email" })
            .populate({ path: "receiver", select: "email" });
        return { message, user };
    }
    async createContact(email, userId) {
        if (!email) {
            throw BaseError_1.default.BadRequest("User with this email does not exist");
        }
        const user = await user_model_1.default.findById(userId);
        if (!user) {
            throw BaseError_1.default.BadRequest("User not found");
        }
        if (email === user.email)
            throw BaseError_1.default.BadRequest("You cannot add yourself as a contact");
        const contact = await user_model_1.default.findOne({ email });
        if (!contact) {
            throw BaseError_1.default.BadRequest("Contact user not found");
        }
        const existingContact = user.contacts.some(id => id.toString() === contact._id.toString());
        if (existingContact) {
            throw BaseError_1.default.BadRequest("Contact already added");
        }
        user.contacts.push(contact._id);
        contact.contacts.push(user._id);
        await user.save();
        await contact.save();
        return user;
    }
    async updateMessage(text, messageId) {
        return await message_model_1.default.findByIdAndUpdate(messageId, { text }, { new: true });
    }
}
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map