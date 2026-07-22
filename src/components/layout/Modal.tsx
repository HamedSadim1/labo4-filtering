import React from "react";
import { createPortal } from "react-dom";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

interface ModalProps {
  /** Ref attached to the dialog content (useFocusTrap targets this). */
  contentRef?: React.Ref<HTMLDivElement>;
  /** Fires when the backdrop area is clicked. */
  onClose: () => void;
  /** Optional id for aria-labelledby on the dialog element. */
  ariaLabelledBy?: string;
  /**
   * Override the inner-panel className. Useful when a future modal
   * wants a different size / colour theme than the StudentForm's
   * default (`max-w-md bg-white dark:bg-slate-900`).
   */
  panelClassName?: string;
  children: React.ReactNode;
}

/**
 * Generic dialog overlay. Mounts via `createPortal` into
 * `document.body` so the markup escapes any ancestor overflow
 * context (notably the App's outer `overflow-hidden` wrapper, which
 * would otherwise clip the fixed-position backdrop on iOS Safari and
 * can also shift rendering when the page content scrolls beneath).
 * Also locks body scroll while mounted — see useBodyScrollLock.
 *
 * Owns the role / aria-modal / backdrop-blur chrome so any future
 * modal — confirm dialogs, delete warnings, image lightboxes — can
 * drop in here without re-typing the dialog semantics. The previously
 * duplicated chrome in StudentForm has been replaced by this
 * component, and ConfirmDialog is the second consumer.
 *
 * SSR-safe: returns `null` on the server so server components (or
 * future static rendering) won't trip on `document.body` being
 * undefined.
 */
const DEFAULT_PANEL_CLASS =
  "animate-modal w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-700";

const Modal: React.FC<ModalProps> = ({
  contentRef,
  onClose,
  ariaLabelledBy,
  panelClassName = DEFAULT_PANEL_CLASS,
  children,
}) => {
  // Locks html + body overflow while mounted. Refcount-aware via the
  // hook itself — every consumer (StudentForm, ConfirmDialog, future
  // modals) gets the lock for free without coordinating with each
  // other.
  useBodyScrollLock();

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
      onClick={onClose}
    >
      <div
        ref={contentRef}
        className={panelClassName}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
