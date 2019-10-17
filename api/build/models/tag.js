"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.TagSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        unique: true,
        lowercase: true
    },
    color: {
        type: String,
        required: true,
        maxlength: 10,
        lowercase: true
    }
});
exports.Tag = mongoose_1.model('Tag', exports.TagSchema);
//# sourceMappingURL=tag.js.map