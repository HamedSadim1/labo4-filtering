import React from "react";

interface CancelButtonProps {
  /** Click handler for the secondary action. */
  onClick: () => void;
  /** HTML `<button type>`. Defaults to "button" — never "submit". */
  type?: "submit" | "button";
  /** Optional disabled state mirrors the underlying `<button>`. */
  disabled?: boolean;
  children: React.ReactNode;
}

// "Less-emphasis" counter-action button that always pairs with an
// ActionButton at the end of a modal/form action row. Light-slate
// surface (bordered) so it visibly recedes against the pink/red
// primary — exactly what users expect from a destructive
// confirmation dialog or a cancelable form.
const CANCEL_BUTTON_CLASSES =
  "px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 focus-ring";

/**
 * Reusable cancel/secondary button. Replaces the two visually
 * identical `<button>` copies that used to live in FormActions.tsx
 * (form Cancel) and ConfirmDialog.tsx (dialog Cancel). The
 * className used to drift slightly between copies; centralising it
 * here means a re-skin of secondary buttons touches one component.
 */
const CancelButton: React.FC<CancelButtonProps> = ({
  onClick,
  type = "button",
  disabled,
  children,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={CANCEL_BUTTON_CLASSES}
  >
    {children}
  </button>
);

export default CancelButton;
