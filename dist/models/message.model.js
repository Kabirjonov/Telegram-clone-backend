"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constats_1 = require("../consts/constats");
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String },
    media: { type: String },
    status: {
        type: String,
        enum: [constats_1.MessageStatus.READ, constats_1.MessageStatus.DELIVERED, constats_1.MessageStatus.SENT],
        default: constats_1.MessageStatus.SENT,
    },
    reaction: { type: String },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Message", messageSchema);
//# sourceMappingURL=message.model.js.map