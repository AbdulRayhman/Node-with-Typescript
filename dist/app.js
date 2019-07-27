"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt = __importStar(require("jsonwebtoken"));
exports.app = express_1.default();
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['Authorization'];
    console.log(bearerHeader);
    if (typeof bearerHeader !== undefined) {
        console.log('Go a Head');
        res.sendStatus(200);
    }
    else {
        res.sendStatus(403);
    }
};
exports.app.get('/api', (req, res, next) => {
    res.send("It's Works");
});
exports.app.post('/api/post', verifyToken, (req, res, next) => {
    res.send('Post Created!!!');
});
exports.app.post('/api/login', (req, res, next) => {
    const user = {
        username: 'abdulrehman',
        email: 'ab@gmail.com',
    };
    jwt.sign({ user: user }, 'secretkey', (err, token) => {
        console.log(err, token);
        res.json({ token: token });
    });
});
exports.app.listen(5000, () => console.log("Hi There, It's me 5000"));
