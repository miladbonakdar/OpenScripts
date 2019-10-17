"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ApiResponse_1 = __importDefault(require("../models/other/ApiResponse"));
function echo(message, data, success, status) {
    this.status(status);
    this.json(new ApiResponse_1.default({
        data: data,
        success: success,
        message: message
    }));
}
function success(data, message) {
    if (data === void 0) { data = {}; }
    if (message === void 0) { message = 'action successfully finished'; }
    this.echo(message, data, true, 200);
}
function error(message, status) {
    if (message === void 0) { message = 'somthing bad happend'; }
    if (status === void 0) { status = 500; }
    this.echo(message, {}, false, status);
}
function notFound() {
    this.echo('not found', {}, false, 404);
}
function accessDenied() {
    this.echo('access denied', {}, false, 403);
}
function badRequest(invalidParam) {
    if (invalidParam === void 0) { invalidParam = ''; }
    this.echo("bad request '" + invalidParam + "'", {}, false, 400);
}
function unauthorized() {
    this.echo('user is unauthorized', {}, false, 401);
}
function internalServerError(e) {
    this.echo(e.message || 'somthing bad happend', {}, false, 500);
}
function noContent() {
    this.status(204).send();
}
function default_1(_, res, next) {
    res.echo = echo;
    res.success = success;
    res.error = error;
    res.notFound = notFound;
    res.accessDenied = accessDenied;
    res.badRequest = badRequest;
    res.unauthorized = unauthorized;
    res.internalServerError = internalServerError;
    res.noContent = noContent;
    next();
}
exports.default = default_1;
//# sourceMappingURL=response.js.map