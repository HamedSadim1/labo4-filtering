import { useEffect, useMemo, useRef } from "react";

export interface UseGlobalKeydownOptions {
  /** Whether to ignore modifier chords (Ctrl/Meta/Alt). Default: "ignore". */
  modifiers?: "ignore" | "any";
  /** Skip handler if focus is inside an input/textarea/contentEditable. Default: true. */
  skipWhenEditable?: boolean;
  /** Call event.preventDefault() when the handler fires. Default: true. */
  preventDefault?: boolean;
}

const matchKey = (eventKey: string, target: string | string[]): boolean => {
  const list = Array.isArray(target) ? target : [target];
  return list.some(
    (k) => eventKey === k || eventKey.toLowerCase() === k.toLowerCase()
  );
};

const isEditableTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || target.isContentEditable;
};

/**
 * Listen for a keyboard event on `window` and run `handler` whenever it matches.
 *
 * Centralises the three concerns every global shortcut in this app shares:
 *   1. Match against a single key or a list of keys (case-insensitive).
 *   2. Skip when focus is in a form field, so typing is never hijacked.
 *   3. Skip when a modifier chord (Ctrl/Cmd/Alt) is held, so OS shortcuts
 *      like Ctrl+F (typing a literal letter after Ctrl) aren't shadowed.
 *
 * Keys are stringified (`"c|C"`) then re-split into a memo-stable
 * `stableKeys` array so the listener effect closes over a stable
 * reference and only re-registers when the keys actually change. This
 * matters because consumers typically pass a literal `["c", "C"]` at
 * the call site, which produces a new array reference every render.
 *
 * The `|` separator could in theory collide with a key name that happens
 * to contain `|`; standard KeyboardEvent key strings don't, and the full
 * hook stays single-purpose so adding a collision-safe encoder is a
 * trivial future change if anyone ever needs it.
 */
export const useGlobalKeydown = (
  key: string | string[],
  handler: (event: KeyboardEvent) => void,
  {
    modifiers = "ignore",
    skipWhenEditable = true,
    preventDefault = true,
  }: UseGlobalKeydownOptions = {}
): void => {
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  const keyKey = Array.isArray(key) ? key.join("|") : key;
  const stableKeys = useMemo(() => keyKey.split("|"), [keyKey]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (!matchKey(event.key, stableKeys)) return;
      if (
        modifiers === "ignore" &&
        (event.ctrlKey || event.metaKey || event.altKey)
      ) {
        return;
      }
      if (skipWhenEditable && isEditableTarget(event.target)) return;
      if (preventDefault) event.preventDefault();
      handlerRef.current(event);
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [keyKey, stableKeys, modifiers, skipWhenEditable, preventDefault]);
};
