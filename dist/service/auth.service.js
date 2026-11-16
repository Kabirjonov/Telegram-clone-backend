"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const mail_service_1 = require("./mail.service");
class AuthService {
    async login(email) {
        let user = null;
        user = await user_model_1.default.findOne({ email }); // bu yerda register yoq chunki user faqat email orqali tizimga kiradi va agar email bazada mavjud bo'lmasa yangi user yaratiladi va emailga otp  jonatiladi
        if (user) {
            await mail_service_1.mailService.sendOtp(email);
            return user;
            // throw BaseError.BadRequest("User already exist", [ // bu yerda agar email bazada bolsa otp jonatish va kirish agar yoq bolsa yaratamiz
            // 	{ email: "User already exist" },
            // ]);
        }
        const createUser = await user_model_1.default.create({ email });
        await mail_service_1.mailService.sendOtp(email);
        return createUser;
    }
}
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map