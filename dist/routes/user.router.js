"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const auth_middlewate_1 = require("../middlewares/auth.middlewate");
const router = (0, express_1.Router)();
router.get("/contacts", auth_middlewate_1.authMiddleware, user_controller_1.default.getContacts);
router.post("/create-contact", auth_middlewate_1.authMiddleware, user_controller_1.default.createContact);
router.post("/send-otp", auth_middlewate_1.authMiddleware, user_controller_1.default.sendOtp);
router.put("/profile", auth_middlewate_1.authMiddleware, user_controller_1.default.updateProfile);
router.put("/email", auth_middlewate_1.authMiddleware, user_controller_1.default.updateEmail);
router.delete("/delete", auth_middlewate_1.authMiddleware, user_controller_1.default.deleteUser);
exports.default = router;
//# sourceMappingURL=user.router.js.map