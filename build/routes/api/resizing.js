"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizing = void 0;
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const resizing = (path, imgname, width, hieght) => {
    const readstream = fs_1.default.createReadStream(path);
    let transform = (0, sharp_1.default)();
    if (width || hieght) {
        let format = path.split('.').pop();
        let picname = imgname.substring(0, imgname.indexOf('.'));
        (0, sharp_1.default)(path)
            .resize(width, hieght)
            .toFile(`./src/assits/thumbnail/${picname}${width}x${hieght}.${format}`);
        transform = transform.resize(width, hieght);
    }
    return readstream.pipe(transform);
};
exports.resizing = resizing;
