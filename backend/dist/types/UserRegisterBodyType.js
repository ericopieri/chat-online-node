"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisterBodySchema = void 0;
const zod_1 = require("zod");
const UserRegisterBodySchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
    username: zod_1.z.string().min(3).max(25),
});
exports.UserRegisterBodySchema = UserRegisterBodySchema;
