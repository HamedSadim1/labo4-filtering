import React, { useRef } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import Modal from "@/components/layout/Modal";
import ActionButton from "@/components/buttons/ActionButton";
import CancelButton from "@/components/buttons/CancelButton";
import { useGlobalKeydown } from "@/hooks/useGlobalKeydown";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useRestoreFocus } from "@/hooks/useRestoreFocus";
import type { ActionVariant } from "@/components/buttons/ActionButton";

interface ConfirmDialogProps {
  /** Bold heading rendered at the top of the panel. */
  title: string;
  /** Body content under the title; pass JSX for inline emphasis. */
  message: React.ReactNode;
  /** Label on the destructive/primary action button. */
  confirmLabel: string;
  /** Label on the secondary action button. Defaults to "Cancel". */
  cancelLabel?: string;
  /** Fires when the user confirms. */
  onConfirm: () => void;
  /** Fires on backdrop click, Escape press, or Cancel click. */
  onCancel: () => void;
  /**
   * Visual treatment of the confirm button:
   * - `danger` (default) — red, with a warning icon. For destructive actions.
   * - `primary` — pink, no icon. For non-destructive confirmation asks.
   */
  variant?: ActionVariant;
  /**
   * Override the inner-panel className. Useful for a wider dialog
   * (e.g. a terms-of-service prompt). Defaults to the narrow
   * `max-w-md` shared with the StudentForm modal.
   */
  panelClassName?: string;
}

/**
 * Reusable confirmation dialog powered by the layout/Modal wrapper —
 * the second consumer of that abstraction. Mirrors the StudentForm's
 * accessibility wiring exactly: focus-trap inside the dialog, focus
 * restored to the trigger button on close, Escape cancels, backdrop
 * click cancels. The parent only supplies the two callbacks so it
 * never has to think about focus plumbing.
 *
 * Action button placement is `flex-col-reverse` on mobile (Cancel
 * sits at the bottom of the stack — matches Material's
 * "less-destructive option at bottom" pattern) and `flex-row` on
 * sm+ (Cancel on the left, confirm on the right). The confirm
 * button stretches via `flex-1` on desktop so the layout always
 * fills the panel width without two equal-weight buttons reading
 * as ambiguous.
 */
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  title,
  message,
  confirmLabel,
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  variant = "danger",
  panelClassName,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef);
  useRestoreFocus();
  // Escape cancels the confirmation, matching the StudentForm's
  // Escape behaviour so Esc has one consistent meaning app-wide.
  useGlobalKeydown("Escape", () => onCancel(), { skipWhenEditable: false });

  return (
    <Modal
      contentRef={dialogRef}
      onClose={onCancel}
      ariaLabelledBy="confirm-dialog-title"
      panelClassName={
        panelClassName ??
        "animate-modal w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-700"
      }
    >
      <div className="flex items-start gap-4 mb-2">
        {variant === "danger" && (
          <span
            aria-hidden
            className="shrink-0 w-10 h-10 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-300 inline-flex items-center justify-center text-xl"
          >
            <FaExclamationTriangle />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <h2
            id="confirm-dialog-title"
            className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-tight"
          >
            {title}
          </h2>
          <div className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {message}
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6">
        <CancelButton onClick={onCancel}>{cancelLabel}</CancelButton>
        <ActionButton variant={variant} onClick={onConfirm}>
          {confirmLabel}
        </ActionButton>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
