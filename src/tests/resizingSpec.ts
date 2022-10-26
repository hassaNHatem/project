import { resizing } from '../routes/api/resizing';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

describe('resizing images working probarly', () => {
  it('resizes the img to 500 width and 600 height', () => {
    let transform = sharp();
    transform = transform.resize(200, 600);
    resizing(
      path.join(__dirname, '../assits/fullfolder/fjord.jpg'),
      'fjord.jpg',
      500,
      600
    );
    expect(
      fs.existsSync(
        path.join(__dirname, '../../src/assits/thumbnail/fjord500x600.jpg')
      )
    ).toEqual(true);
  });
});
