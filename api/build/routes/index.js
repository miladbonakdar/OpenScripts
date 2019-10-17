"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var root_1 = require("./root");
var router = express_1.default.Router();
router.use('/', root_1.root);
exports.default = router;
