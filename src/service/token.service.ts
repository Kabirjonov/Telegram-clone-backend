import { env } from "../lib/env";
import jwt from "jsonwebtoken";
class TokenService {
	generateToken(payload: object): string {
		const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: "1h" });
		return token;
	}
	verifyToken(token: string): any {
		const decoded = jwt.verify(token, env.JWT_SECRET);
		return decoded;
	}
}

export const tokenService = new TokenService();
