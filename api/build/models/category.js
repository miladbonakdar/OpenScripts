"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.CategorySchema = new mongoose_1.Schema({
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
    },
    imageUrl: String
});
exports.Category = mongoose_1.model('Category', exports.CategorySchema);
//# sourceMappingURL=category.js.map