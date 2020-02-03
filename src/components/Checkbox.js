import classnames from 'classnames';
import React from 'react';

/**
 * @param {{
 * className?: string,
 * size: string | number,
 * circled: boolean,
 * blocked: boolean,
 * borderless: boolean
 * }}
 */
export default function Checkbox({
  className,
  size,
  circled,
  blocked,
  borderless,
  ...rest
}) {
  return (
    <input
      type="checkbox"
      className={classnames([
        'is-checkradio',
        size && `is-${size}`,
        circled && 'is-circle',
        blocked && 'is-blocked',
        borderless && 'has-no-border',
        className,
      ])}
      {...rest}
    />
  );
}
