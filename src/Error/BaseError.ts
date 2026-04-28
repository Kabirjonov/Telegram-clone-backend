class BaseError extends Error {
	status: number;
	errors: unknown;

	constructor(status: number, message: string, errors: unknown = []) {
		super(message);
		this.name = "BaseError";
		this.status = status;
		this.errors = errors;
	}

	static Unauthorized(
		message = "User is not authorized",
		errors: unknown = [],
	) {
		return new BaseError(401, message, errors);
	}

	static Forbidden(message = "Access denied", errors: unknown = []) {
		return new BaseError(403, message, errors);
	}

	static BadRequest(message = "Bad request", errors: unknown = []) {
		return new BaseError(400, message, errors);
	}

	static NotFound(message = "Resource not found", errors: unknown = []) {
		return new BaseError(404, message, errors);
	}
	static UnAuthenticated(
		message = "Authentication required",
		errors: unknown = [],
	) {
		return new BaseError(401, message, errors);
	}
}

export default BaseError;
