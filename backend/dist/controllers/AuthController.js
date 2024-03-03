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
exports.AuthController = void 0;
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signIn(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(this.authService.signInUser);
            const authService = this.authService;
            console.log(authService);
            reply.send({ message: "Ok!" });
            // try {
            // 	const { email, password } = request.body as UserLoginBody
            // 	try {
            // 		await this.authService.signInUser({ email, password })
            // 	} catch (err: any) {
            // 		console.log(err)
            // 		reply.code(err.code).send({
            // 			success: false,
            // 			message: err.message,
            // 		})
            // 	}
            // 	const token = this.authService.generateToken(email)
            // 	reply.send({ success: true, token })
            // } catch (err) {
            // 	console.log("Caiu aqui!")
            // 	reply.code(500).send({
            // 		success: false,
            // 		message: err,
            // 	})
            // }
        });
    }
    signUp(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, name } = request.body;
            // try {
            // 	await this.authService.signUpUser({ email, password, name })
            // 	reply.code(201).send({ success: true })
            // } catch (err) {
            // 	reply.code(500).send({
            // 		success: false,
            // 		message: err,
            // 	})
            // }
        });
    }
}
exports.AuthController = AuthController;
