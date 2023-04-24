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
const User_1 = __importDefault(require("../models/User"));
class UserController {
    static getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            User_1.default.getAll((error, users) => {
                if (error) {
                    res.status(500).json({ error });
                }
                else {
                    res.json({ users });
                }
            });
        });
    }
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = JSON.stringify(req.body);
            User_1.default.create(request, (error) => {
                if (error && (error === null || error === void 0 ? void 0 : error.message) === "Passwords do not match") {
                    res.sendStatus(401);
                }
                else if (error) {
                    res.sendStatus(500).json({ error });
                }
                else {
                    res.sendStatus(201);
                }
            });
        });
    }
    static signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = JSON.stringify(req.body);
            User_1.default.signIn(request, (error) => {
                if (error && (error === null || error === void 0 ? void 0 : error.message) === "Incorrect password") {
                    // TODO: make function to remove duplicate
                    res.sendStatus(401);
                }
                else if (error) {
                    res.sendStatus(500).json({ error });
                }
                else {
                    res.sendStatus(201);
                }
            });
        });
    }
}
exports.default = UserController;
