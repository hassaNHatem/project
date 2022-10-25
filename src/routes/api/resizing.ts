import fs, { read, ReadStream } from 'fs';
import sharp, { Sharp } from 'sharp';

export const resizing = (
  path: string,
  imgname: string,
  width?: number,
  hieght?: number
): Sharp => {
  const readstream: ReadStream = fs.createReadStream(path);
  let transform = sharp();
  if (width || hieght) {
    let format = path.split('.').pop();
    let picname = imgname.substring(0, imgname.indexOf('.'));
    console.log(picname);
    sharp(path)
      .resize(width, hieght)
      .toFile(`./src/assits/thumbnail/${picname}${width}x${hieght}.${format}`);
    transform = transform.resize(width, hieght);
  }
  return readstream.pipe(transform);
};
