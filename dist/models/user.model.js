"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    isVerofied: { type: Boolean, default: false },
    firstName: { type: String },
    lastName: { type: String },
    bio: { type: String },
    avatar: { type: String },
    muted: { type: Boolean, default: false },
    notificationSound: { type: String, default: "2.mp3" },
    sendingSound: { type: String, default: "2.mp3" },
    contacts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=user.model.js.map