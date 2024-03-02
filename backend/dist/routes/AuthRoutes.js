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
const bcrypt_1 = __importDefault(require("bcrypt"));
const prismaClient_1 = __importDefault(require("../prismaClient"));
function AuthRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post("/login", {
            preHandler: app.checkRequiredFields(Object.keys({})),
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = request.body;
            try {
                const user = yield prismaClient_1.default.user.findUnique({
                    where: {
                        email,
                    },
                });
                if (user === null) {
                    reply.code(404).send({
                        message: "User not found",
                    });
                    return;
                }
                const isPasswordHashMatched = yield bcrypt_1.default.compare(password, user.passwordHash);
                if (isPasswordHashMatched === false) {
                    reply.code(401).send({
                        message: "Invalid password",
                    });
                    return;
                }
                const token = app.jwt.sign({
                    userId: user.id,
                });
                return reply.send({
                    token,
                });
            }
            catch (err) {
                reply.code(500).send({
                    message: err,
                });
            }
        }));
        app.post("/register", (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const { email, password, name } = request.body;
            try {
                yield prismaClient_1.default.user.create({
                    data: {
                        email,
                        passwordHash: yield bcrypt_1.default.hash(password, 10),
                        name,
                    },
                });
                return reply.code(201).send();
            }
            catch (err) {
                reply.code(500).send(err);
            }
        }));
    });
}
exports.default = AuthRoutes;
