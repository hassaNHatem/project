import express from 'express';
import fs, { read, ReadStream } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { resizing } from './resizing';
const resize = express.Router();

resize.get('/', (req: express.Request, res: express.Response) => {
  let msg = '';
  let width: undefined | number = undefined;
  let assitsPath = path.join(__dirname, '../../assits/');
  let height: undefined | number = undefined;
  if (typeof req.query.width === 'string') {
    if (!isNaN(Number(req.query.width))) {
      if (parseInt(req.query.width) > 0) {
        width = parseInt(req.query.width);
      }
    }
  }
  if (typeof req.query.height === 'string') {
    if (!isNaN(Number(req.query.height))) {
      if (parseInt(req.query.height) > 0) {
        height = parseInt(req.query.height);
      }
    }
  }
  if (
    req.query.picname !== undefined &&
    fs.existsSync(`${assitsPath}fullfolder/${req.query.picname}`) &&
    width !== undefined &&
    height !== undefined
  ) {
    let img = `${assitsPath}thumbnail/${req.query.picname
      .toString()
      .substring(0, req.query.picname.toString().indexOf('.'))}${
      req.query.width
    }x${req.query.height}.${req.query.picname.toString().split('.').pop()}`;
    res.type(`${req.query.picname}`);
    if (fs.existsSync(img)) {
      const readstream: ReadStream = fs.createReadStream(img);
      readstream.pipe(res);
    } else {
      resizing(
        `${assitsPath}fullfolder/${req.query.picname}`,
        req.query.picname.toString(),
        width,
        height
      ).pipe(res);
    }
  } else {
    if (!fs.existsSync(`${assitsPath}fullfolder/${req.query.picname}`)) {
      msg += ' image not found  ';
    }
    if (
      width === undefined ||
      width <= 0 ||
      typeof width !== 'number' ||
      isNaN(width)
    ) {
      msg += ' invalid width ';
    }
    if (
      height === undefined ||
      height <= 0 ||
      typeof height !== 'number' ||
      isNaN(height)
    ) {
      msg += ' invalid hight ';
    }
    res.send(msg);
  }
});
export default resize;
