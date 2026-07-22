import { useLayoutEffect } from "react";

/**
 * On mount, capture whichever element currently has focus. On unmount,
 * restore focus to it (if it's still attached to the document).
 *
 * Used together with `useFocusTrap` to give a modal proper focus
 * roving: the trap moves focus INTO the dialog on open, and this hook
 * moves it BACK to whatever opened it on close.
 */
export const useRestoreFocus = (): void => {
  useLayoutEffect(() => {
    const previouslyFocusedElement = document.activeElement as HTMLElement | null;
    return () => {
      // `document.contains` defends against the trigger being unmounted
      // while the modal was open (e.g. StudentCard deleted via its own
      // delete button while editing that student).
      if (
        previouslyFocusedElement &&
        document.contains(previouslyFocusedElement)
      ) {
        previouslyFocusedElement.focus();
      }
    };
  }, []);
};
