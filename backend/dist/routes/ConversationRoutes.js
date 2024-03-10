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
exports.ConversationRoutes = void 0;
const ConversationService_1 = require("../services/ConversationService");
const ConversationController_1 = require("../controllers/ConversationController");
const AuthVerify_1 = require("../middlewares/AuthVerify");
function ConversationRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        const conversationController = new ConversationController_1.ConversationController(new ConversationService_1.ConversationService());
        app.get("/user/conversations/:userId", {
            preHandler: AuthVerify_1.AuthMiddleware,
        }, conversationController.getUserConversations.bind(conversationController));
        app.get("conversations/:receiver", { preHandler: AuthVerify_1.AuthMiddleware }, conversationController.getSpecificConversation.bind(conversationController));
    });
}
exports.ConversationRoutes = ConversationRoutes;
