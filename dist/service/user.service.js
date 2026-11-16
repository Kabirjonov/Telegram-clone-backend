"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const BaseError_1 = __importDefault(require("../Error/BaseError"));
const message_model_1 = __importDefault(require("../models/message.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const mail_service_1 = require("./mail.service");
class UserService {
    async getContacts(userId) {
        const contacts = await user_model_1.default.findById(userId).populate("contacts");
        const allContacts = (contacts?.contacts).map(contact => contact.toObject());
        if (!allContacts) {
            throw new Error("getContacts error, allcontact is failed");
        }
        await Promise.all(allContacts.map(async (contact) => {
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
            contact.lastMessage = lastMessage;
        }));
        return allContacts;
    }
    // async getContacts(userId: string) {
    // 	if (!userId) {
    // 		throw BaseError.BadRequest("User not found");
    // 	}
    // 	const user = await userModel.findById(userId).populate("contacts");
    // 	if (!user) {
    // 		throw BaseError.BadRequest("User not found");
    // 	}
    // 	const allContacts = await Promise.all(
    // 		user.contacts.map(async (contact: any) => {
    // 			const lastMessage = await messageModel
    // 				.findOne({
    // 					$or: [
    // 						{ sender: userId, receiver: contact._id },
    // 						{ sender: contact._id, receiver: userId },
    // 					],
    // 				})
    // 				.populate("sender")
    // 				.populate("receiver")
    // 				.sort({ createdAt: -1 });
    // 			const contactObj = contact.toObject();
    // 			contactObj.lastMessage = lastMessage;
    // 			return contactObj;
    // 		}),
    // 	);
    // 	return allContacts;
    // }
    async updateVerify(email) {
        if (!email) {
            throw BaseError_1.default.BadRequest("User with this email does not exist");
        }
        return await user_model_1.default.findOneAndUpdate({ email }, { isVerified: true });
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
        return {
            ...contact.toObject(),
            lastMessage: null,
        };
    }
    async updateProfile(userId, payload) {
        return await user_model_1.default.findByIdAndUpdate(userId, payload, {
            returnDocument: "after",
        });
    }
    async sendOtp(email) {
        const existUser = await user_model_1.default.findOne({ email });
        if (existUser)
            throw BaseError_1.default.BadRequest("User with this email already exist");
        await mail_service_1.mailService.sendOtp(email);
        return { email };
    }
    async updateEmail(userId, email, otp) {
        const result = await mail_service_1.mailService.verifyOtp(email, otp);
        if (result) {
            const user = await user_model_1.default.findByIdAndUpdate(userId, { email }, { returnDocument: "after" });
            return user;
        }
        throw BaseError_1.default.BadRequest("Otp validation failed");
    }
    async deleteUser(userId) {
        if (!userId)
            throw BaseError_1.default.BadRequest("Id not found");
        return await user_model_1.default.findByIdAndDelete(userId);
    }
}
exports.userService = new UserService();
//# sourceMappingURL=user.service.js.map