require("express-async-errors");
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { connectDB } from "./config/db";
import indexRouter from "./routes/index";
import errorMiddleware from "./middlewares/error.middleware";
import cors from "cors";
connectDB();
const app = express();
const allowedOrigins = [
	"http://localhost:3000",
	"https://www.your-frontend-domain.com",
	process.env.FRONTEND_URL || "http://localhost:3000", // Allow dynamic origin from environment variable
];

const options: cors.CorsOptions = {
	origin: allowedOrigins,
	methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
	credentials: true, // Enable passing credentials (e.g., cookies)
};
app.use(cors(options));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api", indexRouter);
app.use(errorMiddleware);

export default app;
