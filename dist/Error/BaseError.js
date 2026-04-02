"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.name = "BaseError";
        this.status = status;
        this.errors = errors;
    }
    static Unauthorized(message = "User is not authorized", errors = []) {
        return new BaseError(401, message, errors);
    }
    static Forbidden(message = "Access denied", errors = []) {
        return new BaseError(403, message, errors);
    }
    static BadRequest(message = "Bad request", errors = []) {
        return new BaseError(400, message, errors);
    }
    static NotFound(message = "Resource not found", errors = []) {
        return new BaseError(404, message, errors);
    }
}
exports.default = BaseError;
//# sourceMappingURL=BaseError.js.map