import { MessageStatus } from "../consts/constats";
import { Schema, model } from "mongoose";

const messageSchema = new Schema(
	{
		sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
		receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
		text: { type: String },
		media: { type: String },
		status: {
			type: String,
			enum: [MessageStatus.READ, MessageStatus.DELIVERED, MessageStatus.SENT],
			default: MessageStatus.SENT,
		},
		reaction: { type: String },
	},
	{ timestamps: true },
);
export default model("Message", messageSchema);
