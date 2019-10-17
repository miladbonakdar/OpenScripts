"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (err, _req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.error(err.message || err || 'somthing bad happend', 500);
});
//# sourceMappingURL=expressErrorHandler.js.map