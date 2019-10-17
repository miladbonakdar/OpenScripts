"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.CourseSchema = new mongoose_1.Schema({
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
    imageUrl: String,
    difficulty: {
        type: Number,
        min: 0,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: true
    }
});
exports.Course = mongoose_1.model('Course', exports.CourseSchema);
//# sourceMappingURL=course.js.map