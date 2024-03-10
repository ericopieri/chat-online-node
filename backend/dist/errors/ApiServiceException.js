"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiServiceException = void 0;
class ApiServiceException extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        this.code = code;
    }
}
exports.ApiServiceException = ApiServiceException;
