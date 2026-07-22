import { useLayoutEffect, type RefObject } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Trap Tab focus inside the referenced element while it's mounted.
 *
 * On mount:
 *   1. Move focus to the first focusable descendant (or the root element
 *      itself, made focusable via `tabindex="-1"`, when there are none).
 *   2. Install a `window` keydown listener that wraps Tab cycling around
 *      the focusable set so keyboard navigation can never escape.
 *
 * On unmount the listener is removed. Pair with `useRestoreFocus` if you
 * also want to return focus to whatever was focused before the dialog opened.
 *
 * `noUncheckedIndexedAccess` widens indexed array access to `T | undefined`;
 * the `focusables.length === 0` early-return is what lets us safely assert
 * `!` when reading the first/last entries below.
 */
export const useFocusTrap = <T extends HTMLElement>(
  ref: RefObject<T | null>
): void => {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const initialFocusable = root.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    if (initialFocusable) {
      initialFocusable.focus();
    } else {
      // Defensive fallback: if every focusable descendant is somehow
      // disabled, target the root so keyboard users still land somewhere.
      root.setAttribute("tabindex", "-1");
      root.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      if (focusables.length === 0) return;

      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      const active = document.activeElement as HTMLElement | null;
      const currentIndex = active ? focusables.indexOf(active) : -1;

      if (event.shiftKey) {
        // Shift+Tab on the first element wraps to the last.
        if (currentIndex <= 0) {
          event.preventDefault();
          last.focus();
        }
      } else if (currentIndex === focusables.length - 1) {
        // Tab on the last element wraps to the first.
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref]);
};
