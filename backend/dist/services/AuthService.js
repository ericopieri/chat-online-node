"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const ApiServiceException_1 = require("../errors/ApiServiceException");
const prismaClient_1 = __importDefault(require("../prismaClient"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthService {
    constructor(app) {
        this.app = app;
    }
    generateToken(username) {
        try {
            const token = this.app.jwt.sign({ username });
            return token;
        }
        catch (err) {
            throw new ApiServiceException_1.ApiServiceException("Failed to generate token", 500);
        }
    }
    verifyUserCredentials({ username, password, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prismaClient_1.default.user.findUnique({
                where: {
                    username,
                },
            });
            if (user === null) {
                throw new ApiServiceException_1.ApiServiceException("User not found", 404);
            }
            const isPasswordHashMatched = yield bcrypt_1.default.compare(password, user.passwordHash);
            if (isPasswordHashMatched === false) {
                throw new ApiServiceException_1.ApiServiceException("Password does not match", 401);
            }
        });
    }
    registerUser({ email, password, username, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prismaClient_1.default.user.create({
                    data: {
                        email,
                        username,
                        passwordHash: yield bcrypt_1.default.hash(password, 10),
                    },
                });
            }
            catch (err) {
                throw new ApiServiceException_1.ApiServiceException("Failed to create user", 400);
            }
        });
    }
}
exports.AuthService = AuthService;
