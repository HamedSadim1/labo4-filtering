import React from "react";

export type ActionVariant = "primary" | "danger";

interface ActionButtonProps {
  /** Visual treatment of the action:
   * - `primary` — pink (used for the affirmative Submit in a form).
   * - `danger`  — red (used for destructive Confirm actions). */
  variant: ActionVariant;
  /** HTML `<button type>`. Defaults to "button" so the dialog Confirm
   *  button doesn't accidentally submit an enclosing form. */
  type?: "submit" | "button";
  /** Click handler. Omit for read-only displays. */
  onClick?: () => void;
  /** When true (the default), the button stretches to fill the
   *  remaining flex space — the modal/form action row pattern. */
  flexFull?: boolean;
  /** Optional disabled state mirrors the underlying `<button>`. */
  disabled?: boolean;
  children: React.ReactNode;
}

// Visual rhythm shared by both variants — rounded-2xl, py-3,
// font-semibold, transition + hover-translate, focus-ring with offset.
// `focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50
// dark:focus-visible:ring-offset-slate-950` keeps the focus halo
// explicit regardless of the parent panel's background, which is
// the accessible default for a primary action button.
const COMMON_ACTION_CLASSES =
  "text-white font-semibold py-3 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950";

// Per-variant colour tokens — base + hover + shadow tint + hover
// shadow tint. Keeping the focus ring colour implicit (set by the
// `.focus-ring` CSS utility) and the rest of the palette matching
// the variant hue means a destructive button never introduces a
// colour outside the brand palette mid-flow.
const VARIANT_ACTION_CLASSES: Record<ActionVariant, string> = {
  primary:
    "bg-pink-500 hover:bg-pink-600 shadow-pink-500/20 hover:shadow-pink-500/30",
  danger:
    "bg-red-500 hover:bg-red-600 shadow-red-500/20 hover:shadow-red-500/30",
};

/**
 * Reusable action button. Replaces the two copies of the inline
 * `<button>` markup that used to live in FormActions.tsx and
 * ConfirmDialog.tsx — each with slightly drifted class strings
 * (FormActions had no ring-offset, ConfirmDialog had it; this
 * component normalises on the offset variant because it's the more
 * accessible default in the modal panel context).
 */
const ActionButton: React.FC<ActionButtonProps> = ({
  variant,
  type = "button",
  onClick,
  flexFull = true,
  disabled,
  children,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={[
      flexFull ? "flex-1" : undefined,
      COMMON_ACTION_CLASSES,
      VARIANT_ACTION_CLASSES[variant],
    ]
      .filter(Boolean)
      .join(" ")}
  >
    {children}
  </button>
);

export default ActionButton;
