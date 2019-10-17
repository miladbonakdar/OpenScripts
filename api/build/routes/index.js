"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var root_1 = __importDefault(require("./root"));
var auth_1 = __importDefault(require("./auth"));
var category_1 = __importDefault(require("./category"));
var course_1 = __importDefault(require("./course"));
var tag_1 = __importDefault(require("./tag"));
var newsLetter_1 = __importDefault(require("./newsLetter"));
var post_1 = __importDefault(require("./post"));
var router = express_1.default.Router();
router.use(root_1.default.routePrefix, root_1.default.router);
router.use(auth_1.default.routePrefix, auth_1.default.router);
router.use(category_1.default.routePrefix, category_1.default.router);
router.use(course_1.default.routePrefix, course_1.default.router);
router.use(tag_1.default.routePrefix, tag_1.default.router);
router.use(newsLetter_1.default.routePrefix, newsLetter_1.default.router);
router.use(post_1.default.routePrefix, post_1.default.router);
exports.default = router;
//# sourceMappingURL=index.js.map