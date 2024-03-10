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
exports.ConversationController = void 0;
class ConversationController {
    constructor(conversationService) {
        this.conversationService = conversationService;
    }
    getUserConversations(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = request.params;
            try {
                const conversations = yield this.conversationService.getUserConversations(Number(userId));
                return reply.send({ success: true, conversations });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    getSpecificConversation(request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            const senderUsername = request.user.username;
            const receiverUsername = request.params.receiver;
            try {
                const conversation = yield this.conversationService.getConversation(senderUsername, receiverUsername);
                reply.send(conversation);
            }
            catch (err) { }
        });
    }
}
exports.ConversationController = ConversationController;
