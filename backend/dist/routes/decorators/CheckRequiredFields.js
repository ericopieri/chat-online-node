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
function checkRequiredFields(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.decorate("checkRequiredFields", (requiredFields) => {
            return function (request, reply) {
                return __awaiter(this, void 0, void 0, function* () {
                    const body = request.body;
                    const missingFields = {};
                    for (const field of requiredFields) {
                        if (!(field in body) || !body[field]) {
                            missingFields[field] = "Campo obrigatório";
                        }
                    }
                    if (Object.keys(missingFields).length > 0) {
                        reply.code(400).send(missingFields);
                        return;
                    }
                    return;
                });
            };
        });
    });
}
exports.default = checkRequiredFields;
