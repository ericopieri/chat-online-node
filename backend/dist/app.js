"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const CheckRequiredFields_1 = __importDefault(require("./routes/decorators/CheckRequiredFields"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const app = (0, fastify_1.default)({
    logger: true,
});
app.register(jwt_1.default, {
    secret: "supersecret",
});
app.register(CheckRequiredFields_1.default);
app.register(AuthRoutes_1.default);
app.register(UserRoutes_1.default);
app.listen({
    port: 3000,
}, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`server listening on ${address}! 🚀`);
});
