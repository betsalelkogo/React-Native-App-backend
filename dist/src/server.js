"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const post_route_js_1 = __importDefault(require("./routes/post_route.js"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(body_parser_1.default.urlencoded({ extended: true, limit: "1mb" }));
app.use(body_parser_1.default.json());
mongoose_1.default.connect(process.env.DATABASE_URL); //,{useNewUrlParser:true})
const db = mongoose_1.default.connection;
db.on("error", (error) => {
    console.error(error);
});
db.once("open", () => {
    console.log("connected to mongo DB");
});
app.use("/public", express_1.default.static("public"));
app.use("/post", post_route_js_1.default);
module.exports = app;
//# sourceMappingURL=server.js.map