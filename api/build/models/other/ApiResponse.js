"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiResponse = /** @class */ (function () {
    function ApiResponse(params) {
        this.data = params.data || {};
        this.success = params.success || false;
        this.message = params.message || '';
    }
    return ApiResponse;
}());
exports.default = ApiResponse;
//# sourceMappingURL=ApiResponse.js.map