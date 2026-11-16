"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = require("./config/db");
const index_1 = __importDefault(require("./routes/index"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const cors_1 = __importDefault(require("cors"));
(0, db_1.connectDB)();
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:3000",
    "https://www.your-frontend-domain.com",
    process.env.FRONTEND_URL || "http://localhost:3000", // Allow dynamic origin from environment variable
];
const options = {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    credentials: true, // Enable passing credentials (e.g., cookies)
};
app.use((0, cors_1.default)(options));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use("/api", index_1.default);
app.use(error_middleware_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map