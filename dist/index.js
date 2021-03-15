"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var GET_base_1 = require("./routes/GET-base");
var POST_base_1 = require("./routes/POST-base");
var constants_1 = require("./constants");
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use("/mail-notification", [GET_base_1.GETBaseRouter, POST_base_1.POSTBaseRouter]);
app.all("*", function (_, res) {
    res.sendStatus(404);
});
console.log("p: ", constants_1.PORT);
app.listen(constants_1.PORT, function () { return console.log("Mail server listening on port " + constants_1.PORT + " using API key: " + constants_1.API_KEY); });
