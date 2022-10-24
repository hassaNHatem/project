import express from "express";
import fs, { read, ReadStream } from "fs";
import sharp from "sharp";
import { resizing } from "./resizing";
const resize = express.Router();

resize.get("/", (req, res) => {
  let width: undefined | number = undefined;
  let height: undefined | number = undefined;

  if (typeof req.query.width === "string") {
    width = parseInt(req.query.width);
  }
  if (typeof req.query.height === "string") {
    height = parseInt(req.query.height);
  }
  if (req.query.picname !== undefined) {
    let img = `src/assits/thumbnail/${req.query.picname
      .toString()
      .substring(0, req.query.picname.toString().indexOf("."))}${
      req.query.width
    }x${req.query.height}.${req.query.picname.toString().split(".").pop()}`;
    res.type(`${req.query.picname}`);
    if (fs.existsSync(img)) {
      const readstream: ReadStream = fs.createReadStream(img);
      readstream.pipe(res);
    } else {
      resizing(
        `src/assits/fullfolder/${req.query.picname}`,
        req.query.picname.toString(),
        width,
        height
      ).pipe(res);
    }
  } else {
    res.send("undefiend parameters");
  }
});
export default resize;
