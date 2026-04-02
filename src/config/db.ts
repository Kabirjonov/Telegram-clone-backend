import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async (): Promise<void> => {
	const dbUrl = process.env.DB_URL;
	if (!dbUrl) {
		throw new Error("DB_URL is not defined");
	}
	try {
		await mongoose.connect(dbUrl);
		console.log("MongoDB connected by", dbUrl);
	} catch (err) {
		console.error("MongoDB connection error:", err);
		throw err;
	}
};
