import { useEffect } from "react";

// Module-level state so a second modal opening while a first one is
// still mounted (e.g. a fast cancel-then-confirm sequence, or
// transitioning between StudentForm and ConfirmDialog) doesn't
// unblock body scroll prematurely. The lock is "stacked":
// `lockCount` tracks how many consumers currently want the lock;
// the `overflow: hidden` rule is applied once on the first lock
// call and removed on the last unlock call. The previous values
// are captured once and replayed on full unlock.
let lockCount = 0;
let previousBodyOverflow = "";
let previousHtmlOverflow = "";

/**
 * Body scroll lock: applies `overflow: hidden` to both `<html>` and
 * `<body>` while the consuming component is mounted, then restores
 * the prior overflow values on the final unmount. Powers the Modal
 * component so the page underneath an open dialog cannot be
 * scrolled — otherwise mouse-wheel / trackpad gestures still scroll
 * the body, which lets the user unintentionally shift content out
 * from under the modal mid-interaction.
 *
 * Refcount-aware (see module-level `lockCount`): multiple consumers
 * can lock simultaneously. The previous `overflow` values are
 * captured only on the first lock and replayed on the final unlock
 * so they survive nested mounts/unmounts.
 *
 * SSR-safe: the document access is gated on `typeof document` so
 * server-rendered components without a `window` skip the lock
 * entirely.
 */
export const useBodyScrollLock = (): void => {
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (lockCount === 0) {
      previousBodyOverflow = document.body.style.overflow;
      previousHtmlOverflow = document.documentElement.style.overflow;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
    lockCount++;

    return () => {
      lockCount--;
      if (lockCount === 0) {
        document.body.style.overflow = previousBodyOverflow;
        document.documentElement.style.overflow = previousHtmlOverflow;
      }
    };
  }, []);
};
