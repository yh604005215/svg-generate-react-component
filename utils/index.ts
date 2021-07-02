/*
 * Author       : YangHao
 * Date         : 2021-06-29 16:52:26
 * LastEditTime : 2021-06-29 17:04:45
 * LastEditors  : YangHao
 * Description  : In User Settings Edit
 */
import { camelCase, upperFirst } from 'lodash'
import { pipe } from 'ramda';

export interface IdentifierMeta {
  name: string;
  themeSuffix?: string;
}

export interface GetIdentifierType {
  (meta: IdentifierMeta): string;
}

export const getIdentifier: GetIdentifierType = pipe(
  ({ name, themeSuffix }: IdentifierMeta) =>
    name + (themeSuffix ? `-${themeSuffix}` : ''),
  camelCase,
  upperFirst
);