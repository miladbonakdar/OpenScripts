"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var passport_1 = __importDefault(require("passport"));
var config_1 = require("../../config");
exports.default = (function (req, res) {
    passport_1.default.authenticate('local', { session: false }, function (err, user, info) {
        if (err || !user) {
            res.echo(info.message, null, false, 401);
            return;
        }
        req.login(user, { session: false }, function (err) {
            if (err)
                res.internalServerError(err);
            var token = jsonwebtoken_1.default.sign(user.toJSON(), config_1.API_SECRET, { expiresIn: '2d' });
            delete user.password;
            res.success({ user: user, token: token }, 'user loged in successfuly');
        });
    })(req, res);
});
//# sourceMappingURL=authenticate.js.map