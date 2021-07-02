/*
 * Author       : YangHao
 * Date         : 2021-06-29 16:27:16
 * LastEditTime : 2021-07-01 15:26:21
 * LastEditors  : YangHao
 * Description  : In User Settings Edit
 */
import { src, dest } from 'gulp';
import SVGO from 'svgo';
import rename from 'gulp-rename';
import { svgo, useTemplate, MapToInterpolate } from '../../plugins';

export interface GenrateIconsOptions {
  from: string[];
  toDir: string;
  svgoConfig: SVGO.Options;
  filename: (option: { name: string }) => string;
  template: string;
  mapToInterpolate: MapToInterpolate;
}

export const generateIcons = ({
  from,
  svgoConfig,
  filename,
  toDir,
  template,
  mapToInterpolate
}: GenrateIconsOptions) => function GenerateIcons() {  
  return src(from)
  .pipe(svgo(svgoConfig))
  .pipe(useTemplate({template, mapToInterpolate}))
  .pipe(
    rename((file) => {
      if (file.basename) {
        file.basename = filename({ name: file.basename });
        file.extname = '.tsx';
      }
    })
  )
  .pipe(dest(toDir));

}