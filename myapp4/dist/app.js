"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.send("hello typescript");
});
app.get('/greetings', (req, res) => {
    const message = (0, utils_1.greet)("World 2");
    res.send(message);
});
app.listen(port, () => {
    console.log("server is up");
});
//# sourceMappingURL=app.js.map