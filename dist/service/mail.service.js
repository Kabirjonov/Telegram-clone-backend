"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailService = void 0;
const BaseError_1 = __importDefault(require("../Error/BaseError"));
const otp_model_1 = __importDefault(require("../models/otp.model"));
const bcrypt = require("bcrypt");
const nodemailer_1 = __importDefault(require("nodemailer"));
class MailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }
    async sendOtp(to) {
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        const hashedOtp = await bcrypt.hash(otp.toString(), 10);
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `OTP for verification ${new Date().toLocaleString()}`,
            html: `<h2>Your verification code</h2>
<p style="font-size:20px">${otp}</p>`,
        });
        await otp_model_1.default.create({
            email: to,
            otp: hashedOtp,
            expireAt: new Date(Date.now() + 5 * 60 * 1000),
        });
    }
    async verifyOtp(email, otp) {
        const otpData = await otp_model_1.default.findOne({ email }).sort({ createdAt: -1 });
        if (!otpData) {
            throw BaseError_1.default.BadRequest("Otp not found");
        }
        if (otpData.expireAt < new Date()) {
            throw BaseError_1.default.BadRequest("Your otp is expired");
        }
        const isValid = await bcrypt.compare(otp, otpData.otp);
        if (!isValid) {
            throw BaseError_1.default.BadRequest("Invalid otp entered");
        }
        await otp_model_1.default.deleteMany({ email });
        return true;
    }
}
exports.mailService = new MailService();
//# sourceMappingURL=mail.service.js.map