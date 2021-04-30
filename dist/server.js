"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var uuid_1 = require("uuid");
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
var users = [];
app.get("/users", function (req, res) {
    return res.json(users);
});
app.post("/users", function (req, res) {
    var _a = req.body, name = _a.name, email = _a.email;
    var user = { id: uuid_1.v4(), name: name, email: email };
    users.push(user);
    return res.json(user);
});
app.put("/users/:id", function (req, res) {
    var id = req.params.id;
    var _a = req.body, name = _a.name, email = _a.email;
    var userIndex = users.findIndex(function (user) { return user.id === id; });
    if (userIndex < 0) {
        return res.status(404).json({ error: "User not found" });
    }
    var user = { id: id, name: name, email: email };
    users[userIndex] = user;
    return res.json(user);
});
app.delete("/users/:id", function (req, res) {
    var id = req.params.id;
    var userIndex = users.findIndex(function (user) { return user.id === id; });
    if (userIndex < 0) {
        return res.status(404).json({ error: "User not found" });
    }
    users.splice(userIndex, 1);
    return res.status(204).send();
});
app.listen("4000", function () {
    console.log("Backend Started!");
});
