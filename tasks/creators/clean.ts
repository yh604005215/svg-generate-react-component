/*
 * Author       : YangHao
 * Date         : 2021-06-29 16:17:19
 * LastEditTime : 2021-06-29 16:18:47
 * LastEditors  : YangHao
 * Description  : In User Settings Edit
 */
import del from 'del';

export const clean = (dirs: string[]) => () => {
  return del(dirs);
}