const supportsAbortController = 'AbortController' in window;
const fallback = { signal: null, abort: () => {} };

/**
 * @returns {AbortController | fallback}
 */
export default function createSafeAbortController() {
  return supportsAbortController ? new AbortController() : fallback;
}
