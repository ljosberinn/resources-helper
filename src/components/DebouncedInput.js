import React from 'react';
import { Input } from 'rbx';
import DebounceInput from 'react-debounce-input';

export default function DebouncedInput({
  timeout = 300,
  size = 'small',
  ...rest
}) {
  return (
    <Input as={DebounceInput} debounceTimeout={timeout} size={size} {...rest} />
  );
}
