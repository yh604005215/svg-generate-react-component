/*
 * Author       : YangHao
 * Date         : 2021-06-29 16:33:51
 * LastEditTime : 2021-07-01 15:53:33
 * LastEditors  : YangHao
 * Description  : In User Settings Edit
 */
import SVGO from "svgo";
import { createTrasformStreamAsync } from '../creator';

export const svgo = (options: SVGO.Options) => {
  const optimizer = new SVGO(options);
  return createTrasformStreamAsync(async (before) => {
    const { data } = await optimizer.optimize(before);
    
    return data;
  })
}