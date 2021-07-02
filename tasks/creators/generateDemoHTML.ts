/*
 * Author       : YangHao
 * Date         : 2021-07-02 14:01:02
 * LastEditTime : 2021-07-02 14:54:23
 * LastEditors  : YangHao
 * Description  : In User Settings Edit
 */

import fs from 'fs';
import template from 'lodash.template';

export interface generateDemoHTMLOptions {
  toDir: string;
  from: string;
  template: string;
}

export const generateDemoHTML = ({ from, toDir, template: tplContent }: generateDemoHTMLOptions) => async () => {
  fs.readdir(from, (err, files) => {
    if (err) {
      console.log(err);
      return
    }
    let bodyTemplate = ``;

    files.forEach(item => {
      bodyTemplate += `<div class="icon-item" data-name="${item.split('.svg')[0]}">
        ${fs.readFileSync(
          `${from}/${item}`,
          'utf8'
          )}
        <p>${item.split('.svg')[0]}</p>
      </div>`
    });

    const htmlText = template(tplContent)({ content: bodyTemplate });

    fs.writeFileSync(toDir, htmlText);
    
  })
}