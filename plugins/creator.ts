/*
 * Author       : YangHao
 * Date         : 2021-06-29 16:38:42
 * LastEditTime : 2021-06-29 17:26:08
 * LastEditors  : YangHao
 * Description  : In User Settings Edit
 */
import through from "through2";
import File from 'vinyl';

export const createTrasformStream = (fn: (raw: string, file: File) => string) => through.obj((file: File, encoding, done) => {
  if (file.isBuffer()) {
    const before = file.contents.toString(encoding);
    try {
      const after = fn(before, file);
      file.contents = Buffer.from(after);
      done(null, file);
    } catch (err) {
      done(err, null);
    }
  } else {
    done(null, file);
  }
});

export const createTrasformStreamAsync = (fn: (raw: string, file: File) => Promise<string>) => through.obj((file: File, encoding, done) => {
  if (file.isBuffer()) {
    const before = file.contents.toString(encoding);
    fn(before, file)
      .then((after) => {
        file.contents = Buffer.from(after);
        done(null, file);
      })
      .catch((err) => {
        done(err, null);
      });
  } else {
    done(null, file);
  }
});
