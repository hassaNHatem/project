import express from 'express';
import fs, { read, ReadStream } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { resizing } from './resizing';
const resize = express.Router();

resize.get('/', (req: express.Request, res: express.Response) => {
  let width: undefined | number = undefined;
  let height: undefined | number = undefined;
  if (typeof req.query.width === 'string') {
    if (!isNaN(parseInt(req.query.width))) {
      width = parseInt(req.query.width);
    }
  }
  if (typeof req.query.height === 'string') {
    if (!isNaN(parseInt(req.query.height))) height = parseInt(req.query.height);
  }
  if (
    req.query.picname !== undefined &&
    width !== undefined &&
    height !== undefined
  ) {
    let assitsPath = path.join(__dirname, '../../assits/');
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
      if (
        resizing(
          `${assitsPath}fullfolder/${req.query.picname}`,
          req.query.picname.toString(),
          width,
          height
        ) !== undefined
      ) {
        resizing(
          `${assitsPath}fullfolder/${req.query.picname}`,
          req.query.picname.toString(),
          width,
          height
        ).pipe(res);
      } else {
        res.send('resizing process failed or image doesnt exsist');
      }
    }
  } else {
    let msg = '';
    if (req.query.picname === undefined) {
      msg += ' invalid image name ';
    }
    if (width === undefined) {
      msg += 'invalid width ';
    }
    if (height === undefined) {
      msg += 'invalid hight ';
    }
    res.send(msg);
  }
});
export default resize;
