"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const BaseError_1 = __importDefault(require("../Error/BaseError"));
const mail_service_1 = require("./mail.service");
class AuthService {
    async login(email) {
        const user = await user_model_1.default.findOne({ email });
        if (user) {
            throw BaseError_1.default.BadRequest("User already exist", [
                { email: "User already exist" },
            ]);
        }
        const createUser = await user_model_1.default.create({ email });
        await mail_service_1.mailService.sendOtp(email);
        return createUser;
    }
}
exports.authService = new AuthService();
//# sourceMappingURL=auth.service.js.map