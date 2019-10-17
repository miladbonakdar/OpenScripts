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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var course_1 = require("../models/course");
var colorGenerator_1 = require("../utils/colorGenerator");
var Pagination_1 = __importDefault(require("../utils/Pagination"));
var passportAuthonticator_1 = __importDefault(require("../middlewares/passportAuthonticator"));
exports.name = 'Course';
var router = express_1.default.Router();
router.route('/').post(passportAuthonticator_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var course;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                course = new course_1.Course(req.body);
                course.color = colorGenerator_1.randomColor();
                course.createdAt = new Date();
                return [4 /*yield*/, course.save()];
            case 1:
                _a.sent();
                res.success(course, exports.name + ' created successfuly');
                return [2 /*return*/];
        }
    });
}); });
router.route('/').put(passportAuthonticator_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var c, course;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                c = req.body;
                if (!c)
                    return [2 /*return*/, res.badRequest('body')];
                return [4 /*yield*/, course_1.Course.findById(c._id)];
            case 1:
                course = _a.sent();
                if (!course)
                    return [2 /*return*/, res.notFound()];
                course.name = c.name;
                course.color = c.color;
                course.imageUrl = c.imageUrl;
                course.difficulty = c.difficulty;
                return [4 /*yield*/, course.save()];
            case 2:
                _a.sent();
                res.success(course, exports.name + ' updated successfuly');
                return [2 /*return*/];
        }
    });
}); });
router.route('/:id').delete(passportAuthonticator_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var course;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, course_1.Course.findByIdAndDelete(req.params.id)];
            case 1:
                course = _a.sent();
                if (!course)
                    return [2 /*return*/, res.notFound()];
                res.success(course);
                return [2 /*return*/];
        }
    });
}); });
router.route('/').get(passportAuthonticator_1.default, function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var courses;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, course_1.Course.find({})];
            case 1:
                courses = _a.sent();
                res.success(courses);
                return [2 /*return*/];
        }
    });
}); });
router.route('/:id').get(passportAuthonticator_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var course;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.params.id)
                    return [2 /*return*/, res.badRequest('id')];
                return [4 /*yield*/, course_1.Course.findById(req.params.id)];
            case 1:
                course = _a.sent();
                if (!course)
                    return [2 /*return*/, res.notFound()];
                res.success(course);
                return [2 /*return*/];
        }
    });
}); });
router.route('/:pageSize/:pageNumber').get(passportAuthonticator_1.default, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var page, pageResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                page = new Pagination_1.default(course_1.Course, req.params.pageNumber, req.params.pageSize);
                return [4 /*yield*/, page.get()];
            case 1:
                pageResult = _a.sent();
                res.success(pageResult);
                return [2 /*return*/];
        }
    });
}); });
exports.default = { router: router, routePrefix: '/course' };
//# sourceMappingURL=course.js.map