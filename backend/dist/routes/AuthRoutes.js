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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const validateBody_1 = require("../middlewares/validateBody");
const AuthService_1 = require("../services/AuthService");
const AuthController_1 = require("../controllers/AuthController");
const UserRegisterBodyType_1 = require("../types/UserRegisterBodyType");
const UserLoginBodyType_1 = require("../types/UserLoginBodyType");
function AuthRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        const authService = new AuthService_1.AuthService(app);
        const authController = new AuthController_1.AuthController(authService);
        app.post("/login", {
            preHandler: (0, validateBody_1.validateBody)(UserLoginBodyType_1.UserLoginBodySchema),
        }, authController.signIn.bind(authController));
        app.post("/register", {
            preHandler: (0, validateBody_1.validateBody)(UserRegisterBodyType_1.UserRegisterBodySchema),
        }, authController.signUp.bind(authController));
    });
}
exports.AuthRoutes = AuthRoutes;
