"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.NewsLetterSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        maxlength: 40,
        unique: true,
        lowercase: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: true
    }
});
exports.NewsLetter = mongoose_1.model('NewsLetter', exports.NewsLetterSchema);
//# sourceMappingURL=newsLetter.js.map