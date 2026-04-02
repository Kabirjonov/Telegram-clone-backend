"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = require("../service/auth.service");
const mail_service_1 = require("../service/mail.service");
const user_service_1 = require("../service/user.service");
class AuthController {
    async login(req, res) {
        const { email } = req.body;
        const user = await auth_service_1.authService.login(email);
        return res.send({
            message: "Your account created successfully",
            body: user,
            status: 200,
        });
    }
    async verify(req, res) {
        const { email, otp } = req.body;
        const resume = await mail_service_1.mailService.verifyOtp(email, otp);
        if (resume) {
            await user_service_1.userService.updateVerify(email);
        }
        return res.send({
            message: "verifi",
            body: { email },
            status: 200,
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=auth.controller.js.map