import { NextFunction, Response, Request } from "express";
import BaseError from "../Error/BaseError";
import { tokenService } from "../service/token.service";
import userModel from "../models/user.model";

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return next(BaseError.UnAuthenticated("Authorization header missing"));
	}

	const token = authHeader.split(" ")[1];
	if (!token) {
		return next(BaseError.UnAuthenticated("Token missing"));
	}
	const decoded = tokenService.verifyToken(token);
	if (!decoded) {
		return next(BaseError.UnAuthenticated("Invalid token"));
	}
	const user = await userModel.findById(decoded.id);
	if (!user) return next(BaseError.UnAuthenticated("User not found"));
	req.user = user; // Attach decoded token data to request object
	next();
};
