import { useRef, useEffect } from 'react';

const supportsAbortController = 'AbortController' in window;
const fallback = { signal: null, abort: () => {} };

export default function useAbortSignal(timeoutMs = 10000) {
  const controller = useRef(
    supportsAbortController ? new AbortController() : fallback,
  );

  useEffect(() => {
    const currentController = controller.current;

    if (!currentController) {
      return;
    }

    const timeout = setTimeout(() => {
      currentController.abort();
    }, timeoutMs);

    return () => {
      clearTimeout(timeout);
      currentController.abort();
    };
  }, [controller, timeoutMs]);

  return controller;
}
