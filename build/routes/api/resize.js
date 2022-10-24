"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const resizing_1 = require("./resizing");
const resize = express_1.default.Router();
resize.get("/", (req, res) => {
    let width = undefined;
    let height = undefined;
    if (typeof req.query.width === "string") {
        width = parseInt(req.query.width);
    }
    if (typeof req.query.height === "string") {
        height = parseInt(req.query.height);
    }
    if (req.query.picname !== undefined) {
        let img = `src/assits/thumbnail/${req.query.picname
            .toString()
            .substring(0, req.query.picname.toString().indexOf("."))}${req.query.width}x${req.query.height}.${req.query.picname.toString().split(".").pop()}`;
        res.type(`${req.query.picname}`);
        if (fs_1.default.existsSync(img)) {
            const readstream = fs_1.default.createReadStream(img);
            readstream.pipe(res);
        }
        else {
            (0, resizing_1.resizing)(`src/assits/fullfolder/${req.query.picname}`, req.query.picname.toString(), width, height).pipe(res);
        }
    }
    else {
        res.send("undefiend parameters");
    }
});
exports.default = resize;
