"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const router = (0, express_1.Router)();
router.get("/contacts", user_controller_1.default.getContacts);
router.get("/message/:contactId", user_controller_1.default.getMessage);
router.post("/create-message", user_controller_1.default.createMessage);
router.post("/create-contact", user_controller_1.default.createContact);
router.put("/message/:messsageId", user_controller_1.default.updateMessage);
exports.default = router;
//# sourceMappingURL=user.router.js.map