import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

/**
 * `useState` backed by `window.localStorage`. Survives page reloads.
 *
 * Behaviour:
 *   1. **Lazy read** happens inside `useState`'s initialiser so the
 *      cost of `JSON.parse` is paid once on mount, not every render.
 *   2. **Write-through** mirrors every state change to storage via a
 *      `useEffect` keyed on `[key, value]`.
 *   3. **Cross-tab sync** listens for the native `storage` event so
 *      when another browser tab writes to the same key, this hook's
 *      in-memory state stays consistent without a manual refresh.
 *   4. **Silent best-effort** failure on quota errors, sandboxes
 *      without `localStorage`, and JSON parse corruption — falling
 *      back to `initialValue` keeps the in-memory UX intact.
 *
 * Schema versioning: the caller's key should carry a suffix like
 * `:v1` so when the persisted shape ever changes the bumped suffix
 * causes the next mount to ignore stale incompatible JSON and start
 * fresh from `initialValue`.
 */
export const useLocalStorage = <T,>(
  key: string,
  initialValue: T | (() => T)
): readonly [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        return JSON.parse(stored) as T;
      }
    } catch {
      // parse error / sandbox without storage / corrupted entry —
      // quietly fall through to initialValue.
    }
    return typeof initialValue === "function"
      ? (initialValue as () => T)()
      : initialValue;
  });

  // Write-through: any state change is mirrored back to storage.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Quota exceeded or sandboxed iframe — keep in-memory state,
      // accept that persistence won't apply this session.
    }
  }, [key, value]);

  // Cross-tab sync: a peer tab calling `setItem` on the same key
  // fires a `storage` event on `window` here, so the in-memory state
  // updates without a reload.
  useEffect(() => {
    const handleStorage = (event: StorageEvent): void => {
      if (event.key !== key) return;
      // A peer cleared the key — fall back to initialValue so the
      // in-memory state matches the now-empty storage.
      if (event.newValue === null) {
        setValue(
          typeof initialValue === "function"
            ? (initialValue as () => T)()
            : initialValue
        );
        return;
      }
      try {
        setValue(JSON.parse(event.newValue) as T);
      } catch {
        // Peer wrote invalid JSON — keep current state.
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, [key, initialValue]);

  return [value, setValue] as const;
};
