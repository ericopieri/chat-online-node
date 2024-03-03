"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiServiceException extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        this.code = code;
    }
}
exports.default = ApiServiceException;
