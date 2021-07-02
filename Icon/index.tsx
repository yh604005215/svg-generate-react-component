/*
 * Author       : YangHao
 * Date         : 2021-06-30 14:29:49
 * LastEditTime : 2021-07-01 09:57:36
 * LastEditors  : YangHao
 * Description  : In User Settings Edit
 */
import React, { forwardRef } from 'react';
import classnames from 'classnames';
import styles from './index.less';

export interface IconProps extends React.HTMLProps<HTMLSpanElement> {
  name?: string;
}

const Icon = forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  return (
    <span
      {...props}
      className={classnames(styles.iconWrap, props.className)}
      ref={ref}
    >
      {props.children}
    </span>
  );
});

Icon.displayName = 'Icon';

export default Icon;
