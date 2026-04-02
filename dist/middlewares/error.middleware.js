"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const BaseError_1 = __importDefault(require("../Error/BaseError"));
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
function default_1(err, req, res, next) {
    console.log(err);
    if (err instanceof BaseError_1.default) {
        return res
            .status(err.status)
            .json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: "Server error" });
}
//# sourceMappingURL=error.middleware.js.map