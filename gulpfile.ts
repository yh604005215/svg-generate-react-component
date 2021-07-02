/*
 * Author       : YangHao
 * Date         : 2021-06-29 16:19:02
 * LastEditTime : 2021-07-02 14:26:00
 * LastEditors  : YangHao
 * Description  : In User Settings Edit
 */
import { series, parallel } from 'gulp';
import { clean, generateIcons, exportIcon, generateDemo, generateDemoHTML } from './tasks/creators'
import { generalConfig } from './plugins/svgo/presets';
import { getIdentifier } from './utils';
import path from 'path';
import fs from 'fs';

const iconTemplate = fs.readFileSync(
  path.resolve(__dirname, './template/icon.ts.ejs'),
  'utf8'
);

const htemlTemplate = fs.readFileSync(
  path.resolve(__dirname, './template/demo.ts.ejs'),
  'utf8'
)

exports.demo = series(
  clean(['demo']),
  generateDemo({
    from: ['svg/filled/*.svg'],
    toDir: 'demo',
    svgoConfig: generalConfig,
    filename: ({ name }) => getIdentifier({ name, themeSuffix: 'Filled' }),
  }),
  generateDemoHTML({
    toDir: path.resolve(__dirname,'demo/index.html'),
    from: 'demo',
    template: htemlTemplate,
  })
)

export default series(
  clean(['src']),
  parallel(
    generateIcons({
      from: ['svg/filled/*.svg'],
      toDir: 'src/asn',
      svgoConfig: generalConfig,
      mapToInterpolate: ({ name, content }) => ({
        identifier: getIdentifier({ name, themeSuffix: 'Filled' }),
        content
      }),
      filename: ({ name }) => getIdentifier({ name, themeSuffix: 'Filled' }),
      template: iconTemplate
    })
  ),
  exportIcon({ dirname: path.resolve(__dirname, './src/asn'), name: './src/asn' })
)