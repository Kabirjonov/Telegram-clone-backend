"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constats_1 = require("../consts/constats");
const { Schema, model } = require("mongoose");
const messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String },
    media: { type: String },
    status: {
        type: String,
        enum: [constats_1.MessageStatus.READ, constats_1.MessageStatus.DELIVERED, constats_1.MessageStatus.SENT],
        default: constats_1.MessageStatus.SENT,
    },
    reaction: { type: String },
});
exports.default = model("message", messageSchema);
//# sourceMappingURL=message.model.js.map