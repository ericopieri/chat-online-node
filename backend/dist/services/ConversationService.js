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
exports.ConversationService = void 0;
const prismaClient_1 = __importDefault(require("../prismaClient"));
class ConversationService {
    getUserConversations(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userConversations = yield prismaClient_1.default.conversation.findMany({
                where: {
                    users: {
                        some: {
                            id: userId,
                        },
                    },
                },
                select: {
                    id: true,
                    users: {
                        where: {
                            NOT: {
                                id: userId,
                            },
                        },
                        select: {
                            username: true,
                        },
                    },
                    messages: {
                        orderBy: {
                            createdAt: "desc",
                        },
                        take: 1,
                        select: {
                            content: true,
                            sender: {
                                select: {
                                    username: true,
                                },
                            },
                        },
                    },
                },
            });
            const responseObject = userConversations.map((conversation) => {
                return {
                    id: conversation.id,
                    username: conversation.users[0].username,
                    messages: conversation.messages,
                };
            });
            return responseObject;
        });
    }
    getConversation(sender, receiver) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield prismaClient_1.default.message.findMany({
                where: {
                    AND: [
                        {
                            sender: {
                                username: sender,
                            },
                        },
                        {
                            conversation: {
                                users: {
                                    some: {
                                        username: receiver,
                                    },
                                },
                            },
                        },
                        {
                            conversation: {
                                users: {
                                    some: {
                                        username: sender,
                                    },
                                },
                            },
                        },
                    ],
                },
                select: {
                    createdAt: true,
                    content: true,
                    sender: {
                        select: {
                            username: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            return messages;
        });
    }
}
exports.ConversationService = ConversationService;
