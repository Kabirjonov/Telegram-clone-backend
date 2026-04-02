import { NextFunction, Response, Request } from "express";
import BaseError from "../Error/BaseError";

// export default function errorMiddleware(
// 	err: unknown,
// 	req: Request,
// 	res: Response,
// 	next: NextFunction,
// ) {
// 	if (res.headersSent) {
// 		return next(err);
// 	}

// 	if (err instanceof BaseError) {
// 		return res.status(err.status).json({
// 			message: err.message,
// 			errors: err.errors,
// 			status: err.status,
// 		});
// 	}

// 	if (err instanceof Error) {
// 		return res.status(500).json({
// 			message: err.message,
// 			errors: [],
// 			status: 500,
// 		});
// 	}

// 	return res.status(500).json({
// 		message: "Internal server error",
// 		errors: [],
// 		status: 500,
// 	});
// }

export default function (
	err: unknown,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	console.log(err);
	if (err instanceof BaseError) {
		return res
			.status(err.status)
			.json({ message: err.message, errors: err.errors });
	}
	return res.status(500).json({ message: "Server error" });
}
