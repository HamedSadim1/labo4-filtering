import React from "react";

interface ModalProps {
  /** Ref attached to the dialog content (useFocusTrap targets this). */
  contentRef?: React.Ref<HTMLDivElement>;
  /** Fires when the backdrop area is clicked. */
  onClose: () => void;
  /** Optional id for aria-labelledby on the dialog element. */
  ariaLabelledBy?: string;
  /**
   * Extra className for the inner panel. Useful when a future modal
   * wants a different size / colour theme than the StudentForm's
   * default (`max-w-md bg-white dark:bg-slate-900`).
   */
  panelClassName?: string;
  children: React.ReactNode;
}

/**
 * Generic dialog overlay: full-viewport backdrop + click-to-close +
 * inner content panel that swallows clicks so taps on the panel
 * don't bubble up to the backdrop handler. Centralises the role /
 * aria-modal / backdrop-blur chrome so any future modal — confirm
 * dialogs, delete warnings, image lightboxes — can drop in here
 * without re-typing the dialog semantics.
 */
const Modal: React.FC<ModalProps> = ({
  contentRef,
  onClose,
  ariaLabelledBy,
  panelClassName = "animate-modal w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-700",
  children,
}) => (
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
  </div>
);

export default Modal;
