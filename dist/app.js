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
const mongoose_1 = require("mongoose");
exports.app = express_1.default();
const db = mongoose_1.connect('mongodb+srv://abdulrehmanFrt:LeChiffre!2141@userdb-tywac.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
db.then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
});
const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader !== undefined) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.body = {
            token: bearerToken,
        };
        next();
    }
    else {
        res.send({
            status: 403,
            message: 'Authorization Error!',
        });
    }
};
exports.app.get('/api', (req, res, next) => {
    res.send("It's Works");
});
exports.app.post('/api/post', verifyToken, (req, res, next) => {
    jwt.verify(req.body.token, 'secretkey', (err, authData) => {
        if (err) {
            res.send({
                status: 403,
                message: 'Authorization Error!',
            });
        }
        else {
            res.json({
                message: 'Post created!',
                authData,
            });
        }
    });
});
exports.app.post('/api/login', (req, res, next) => {
    const user = {
        username: 'abdulrehman',
        email: 'ab@gmail.com',
    };
    jwt.sign({ user: user }, 'secretkey', { expiresIn: '20s' }, (err, token) => {
        console.log(err, token);
        res.json({ token: token });
    });
});
exports.app.listen(5000, () => console.log("Hi There, It's me 5000"));
