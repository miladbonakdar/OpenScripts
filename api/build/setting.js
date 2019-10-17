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
var path;
switch (process.env.NODE_ENV) {
    case "production":
        path = __dirname + "/.env.production";
        break;
    default:
        path = __dirname + "/.env.development";
}
dotenv.config({ path: path });
exports.DB_NAME = process.env.DB_NAME || "";
exports.DB_USERNAME = process.env.DB_USERNAME || "";
exports.DB_PASSWORD = process.env.DB_PASSWORD || "";
exports.DB_HOST = process.env.DB_HOST || "";
exports.DB_PORT = process.env.DB_PORT || "";
exports.API_PORT = process.env.API_PORT || "";
