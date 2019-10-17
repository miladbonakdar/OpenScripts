"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 20,
        lowercase: true
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 20,
        lowercase: true
    },
    telegramId: Number,
    email: {
        type: String,
        required: true,
        maxlength: 40,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    info: String,
    photoUrl: String,
    youtubeLink: String,
    instagramLink: String,
    telegramLink: String,
    facebookLink: String,
    twitterLink: String,
    whatsappLink: String,
    aparatLink: String
});
exports.User = mongoose_1.model('User', exports.UserSchema);
//# sourceMappingURL=user.js.map