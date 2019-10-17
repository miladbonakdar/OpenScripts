"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
dotenv.config();
console.log(process.env.DB_NAME);
exports.DB_NAME = process.env.DB_NAME || '';
exports.DB_USERNAME = process.env.DB_USERNAME || '';
exports.DB_PASSWORD = process.env.DB_PASSWORD || '';
exports.DB_HOST = process.env.DB_HOST || '';
exports.DB_PORT = process.env.DB_PORT || '';
exports.API_PORT = process.env.API_PORT || '';
exports.API_SECRET = process.env.API_SECRET || '';
exports.ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';
exports.ADMIN_PASS = process.env.ADMIN_PASS || '';
exports.DASHBOARD_ORIGIN = process.env.DASHBOARD_ORIGIN || '';
exports.APP_ORIGIN = process.env.APP_ORIGIN || '';
//# sourceMappingURL=config.js.map