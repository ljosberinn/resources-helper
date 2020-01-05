import { useEffect, useRef } from 'react';

export default function useAbortSignal(timeoutMs = 10000) {
  const controllerRef = useRef(new AbortController());

  useEffect(() => {
    const currentController = controllerRef.current;

    const timeout = setTimeout(() => {
      currentController.abort();
    }, timeoutMs);

    return () => {
      clearTimeout(timeout);
      currentController.abort();
    };
  }, [controllerRef, timeoutMs]);

  return {
    signal: controllerRef.current.signal,
    abort: controllerRef.current.abort,
  };
}
