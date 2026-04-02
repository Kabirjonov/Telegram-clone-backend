"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../service/user.service");
const user = "69b154e4a1faa73b8113d505";
class UserController {
    async getContacts(req, res) {
        const result = await user_service_1.userService.getContacts(user);
        return res.send({
            message: "All your contacts",
            body: result,
            status: 200,
        });
    }
    async getMessage(req, res) {
        const contactId = req.params.contactId;
        const message = await user_service_1.userService.getMessage(contactId, user);
        return res.send({
            message: "You get them message",
            body: message,
            status: 200,
        });
    }
    async createMessage(req, res) {
        const user = await user_service_1.userService.createMessage(req.body);
        return res.send({
            message: "Message created successfully",
            body: user,
            status: 200,
        });
    }
    async createContact(req, res) {
        const user = "69b16c18c55c3d510c31089b";
        const { email } = req.body;
        const result = await user_service_1.userService.createContact(email, user);
        return res.send({
            message: "Contact succesfully added",
            body: result,
            status: 201,
        });
    }
    async updateMessage(req, res) {
        const { text } = req.body;
        const { messageId } = req.params;
        const update = await user_service_1.userService.updateMessage(text, messageId);
        return res.send({
            message: "Contact succesfully added",
            body: update,
            status: 201,
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map