"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = async () => {
    const dbUrl = process.env.DB_URL;
    if (!dbUrl) {
        throw new Error("DB_URL is not defined");
    }
    try {
        await mongoose_1.default.connect(dbUrl);
        console.log("MongoDB connected by", dbUrl);
    }
    catch (err) {
        console.error("MongoDB connection error:", err);
        throw err;
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=db.js.map