import classnames from 'classnames';
import { Field as RBXField } from 'rbx';
import React from 'react';

/**
 *
 * @param {{
 *  children: React.ReactChildren,
 * className?: string,
 * isFloatingLabel?: boolean
 * }}
 */
export default function Field({
  children,
  isFloatingLabel,
  className,
  ...rest
}) {
  return (
    <RBXField
      className={classnames([
        className,
        isFloatingLabel && 'is-floating-label',
      ])}
      {...rest}
    >
      {children}
    </RBXField>
  );
}
