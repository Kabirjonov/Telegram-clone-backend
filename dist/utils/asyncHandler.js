"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = asyncHandler;
function asyncHandler(controller) {
    return (req, res, next) => {
        void controller(req, res, next).catch(next);
    };
}
//# sourceMappingURL=asyncHandler.js.map