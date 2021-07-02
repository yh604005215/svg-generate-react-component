/*
 * Author       : YangHao
 * Date         : 2021-07-01 15:31:27
 * LastEditTime : 2021-07-02 15:17:13
 * LastEditors  : YangHao
 * Description  : In User Settings Edit
 */
import { src, dest } from 'gulp';
import SVGO from 'svgo';
import rename from 'gulp-rename';
import { svgo } from '../../plugins';

export interface GenrateDemoOptions {
  from: string[];
  toDir: string;
  svgoConfig: SVGO.Options;
  filename: (option: { name: string }) => string;
}


export const generateDemo = ({
  from,
  svgoConfig,
  toDir,
  filename,
}: GenrateDemoOptions) => function GenerateDemo() {  
    return src(from)
    .pipe(svgo(svgoConfig))
    .pipe(
      rename((file) => {
        if (file.basename) {
          file.basename = filename({ name: file.basename });
          file.extname = '.svg';
        }
      })
    )
    .pipe(dest(toDir));

}