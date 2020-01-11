const supportsAbortController = 'AbortController' in window;
const fallback = { signal: null, abort: () => {} };

/**
 * @returns {AbortController| { signal: null, abort: () => void }}
 */
export default function createSafeAbortController() {
  return supportsAbortController ? new AbortController() : fallback;
}
