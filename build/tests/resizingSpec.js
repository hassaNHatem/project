"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resizing_1 = require("../routes/api/resizing");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
describe('resizing images working probarly', () => {
    it('resizes the img to 500 width and 600 height', () => {
        let transform = (0, sharp_1.default)();
        transform = transform.resize(200, 600);
        (0, resizing_1.resizing)(path_1.default.join(__dirname, '../assits/fullfolder/fjord.jpg'), 'fjord.jpg', 500, 600);
        expect(fs_1.default.existsSync(path_1.default.join(__dirname, '../../src/assits/thumbnail/fjord500x600.jpg'))).toEqual(true);
    });
});
