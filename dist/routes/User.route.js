"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controller_1 = __importDefault(require("../controllers/User.controller"));
const router = (0, express_1.Router)();
router.get("/", User_controller_1.default.getAll);
router.post("/create", User_controller_1.default.create);
router.post("/signIn", User_controller_1.default.signIn);
exports.default = router;
