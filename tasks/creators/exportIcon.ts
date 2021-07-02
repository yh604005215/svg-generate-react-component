/*
 * Author       : YangHao
 * Date         : 2021-06-30 15:19:03
 * LastEditTime : 2021-06-30 16:18:01
 * LastEditors  : YangHao
 * Description  : In User Settings Edit
 */
import fs from 'fs';
import { resolve } from 'path';

export interface exportIconOptions {
  dirname: string;
  name: string;
}

export const exportIcon = ({ dirname, name }: exportIconOptions) => async () => {
  fs.readdir(dirname, (err, files) => {
    if (err) {
      console.log(err, 'exportIcon');
      return
    }
    const entryText = files
    .map(svgIdentifier => `export { default as ${svgIdentifier.split('.tsx')[0]} } from './${svgIdentifier.split('.tsx')[0]}';`)
    .join('\n');

    fs.writeFileSync(dirname + '/index.ts', entryText);
    
    fs.writeFile(__dirname + '../../../index.ts', `export * from '${name}';`, (err) => {
      if (err) {
        console.log(err);
      }
    })
  })
}