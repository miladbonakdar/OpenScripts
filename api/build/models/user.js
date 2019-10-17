"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    username: String,
    telegramId: Number
});
exports.User = mongoose_1.model("User", exports.UserSchema);
