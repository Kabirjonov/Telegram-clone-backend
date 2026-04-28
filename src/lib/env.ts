// lib/env.ts
import dotenv from "dotenv";
import path from "path";

// Load .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

interface EnvConfig {
	PORT: number;
	NODE_ENV: "development" | "production" | "test";
	DATABASE_URL: string;
	JWT_SECRET: string;
}

// Validation function
const getEnvVar = (name: string): string => {
	const value = process.env[name];
	if (!value) {
		throw new Error(`Missing environment variable: ${name}`);
	}
	return value;
};

// Export validated, typed environment variables
export const env: EnvConfig = {
	PORT: parseInt(getEnvVar("PORT"), 10) || 3000,
	NODE_ENV: (process.env.NODE_ENV as EnvConfig["NODE_ENV"]) || "development",
	DATABASE_URL: getEnvVar("DATABASE_URL"),
	JWT_SECRET: getEnvVar("JWT_SECRET"),
};
