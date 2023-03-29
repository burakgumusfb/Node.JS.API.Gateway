class CustomError extends Error {
    constructor(message, statusCode, isOperational = true, errorCode = '') {
        super();

        Object.setPrototypeOf(this, new.target.prototype);
        this.message = message;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        this.errorCode = errorCode;
        Error.captureStackTrace(this);
    }
}

module.exports = CustomError;
