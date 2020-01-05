import { useEffect, useState } from 'react';

export default function useAbortSignal(timeoutMs = 10000) {
  const [controller] = useState(new AbortController());

  useEffect(() => {
    const timeout = setTimeout(() => {
      controller.abort();
    }, timeoutMs);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [controller, timeoutMs]);

  return {
    signal: controller.signal,
    abort: controller.abort,
  };
}
