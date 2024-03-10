"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginBodySchema = void 0;
const zod_1 = require("zod");
const UserLoginBodySchema = zod_1.z.object({
    username: zod_1.z.string().min(3).max(25),
    password: zod_1.z.string().min(8),
});
exports.UserLoginBodySchema = UserLoginBodySchema;
