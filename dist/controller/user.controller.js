"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../service/user.service");
const user = "69b154e4a1faa73b8113d505"; // bu yerda auth middlewaredan kelgan req.user._id boiyicha
class UserController {
    async getContacts(req, res) {
        const userId = req.user?._id;
        const result = await user_service_1.userService.getContacts(userId);
        return res.send({
            message: "All your contacts",
            body: result,
            status: 200,
        });
    }
    async createContact(req, res) {
        const userId = req.user?._id;
        const { email } = req.body;
        const result = await user_service_1.userService.createContact(email, userId);
        return res.send({
            message: "Contact succesfully added",
            body: result,
            status: 201,
        });
    }
    async updateProfile(req, res) {
        const { ...payload } = req.body;
        const userId = req.user?.id; // auth middlewaredan kelgan user id sini olish
        const result = await user_service_1.userService.updateProfile(userId, payload);
        return res.send({
            message: "Profile succesfully updated",
            body: result,
            status: 200,
        });
    }
    async sendOtp(req, res) {
        const email = req.body.email;
        const result = await user_service_1.userService.sendOtp(email);
        return res.send({
            message: `We sent otp to ${email}`,
            body: result,
            status: 200,
        });
    }
    async updateEmail(req, res) {
        const { email, otp } = req.body;
        const userId = req.user?.id;
        const result = await user_service_1.userService.updateEmail(userId, email, otp);
        return res.send({
            message: "Profile succesfully updated",
            body: result,
            status: 200,
        });
    }
    async deleteUser(req, res) {
        const userId = req.user?.id;
        const result = await user_service_1.userService.deleteUser(userId);
        return res.send({
            message: "Profile succesfully deleted",
            body: result,
            status: 200,
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map