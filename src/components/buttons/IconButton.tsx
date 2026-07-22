import React from "react";

export type IconVariant = "pink" | "red";

/**
 * Per-variant style bundle. Splitting `tintClasses` (the colour-shift
 * on hover) from `focusClass` (the focus-ring utility) keeps the
 * focus colour independent from the icon tint — the delete button
 * has a red focus ring while the edit button uses the global pink,
 * matching the original hand-written buttons exactly.
 */
interface VariantStyle {
  tintClasses: string;
  focusClass: "focus-ring" | "focus-ring-red";
}

const VARIANT_STYLES: Record<IconVariant, VariantStyle> = {
  pink: {
    tintClasses:
      "text-slate-400 hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-500/10",
    focusClass: "focus-ring",
  },
  red: {
    tintClasses:
      "text-slate-500 hover:text-red-600 hover:bg-red-50 dark:text-slate-400 dark:hover:text-red-300 dark:hover:bg-red-500/10",
    focusClass: "focus-ring-red",
  },
};

interface IconButtonProps {
  /** Hover tint + focus ring treatment:
   * - `pink` — used for edit/info actions (pink hover, pink focus ring).
   * - `red`  — used for destructive icon actions (red hover, red focus ring). */
  variant?: IconVariant;
  /** REQUIRED — identifies the icon-only button for assistive tech;
   *  you cannot render an IconButton without one. */
  ariaLabel: string;
  /** Click handler; receives the MouseEvent so consumers can
   *  call `e.stopPropagation()` when the button is nested inside
   *  a card-level click target. */
  onClick?: (e: React.MouseEvent) => void;
  /** Optional disabled state. */
  disabled?: boolean;
  /** The icon element, e.g. `<FaEdit aria-hidden focusable={false} />`. */
  children: React.ReactNode;
}

// Compact icon-only button: `p-2` keeps the hit-target ≥44px
// (WCAG 2.5.8) while the visual footprint stays small at 32×32.
// `rounded-lg` matches the card's other interactive elements.
// The focus ring is delegated to the per-variant `focusClass`
// (.focus-ring = pink, .focus-ring-red = red) so the destructive
// variant keeps its original red focus ring.
const BASE_CLASSES = "p-2 rounded-lg transition-colors";

/**
 * Icon-only action button for compact icon rows (StudentCard edit +
 * delete, future table actions, etc.). A required `ariaLabel` prop
 * means you can't forget the accessible label — no icon button
 * without visible text should exist without one.
 *
 * Follows the same variant+class-map pattern as the larger
 * `ActionButton` so the design language stays coherent across
 * sizes. Requires `.focus-ring-red` to be defined in `index.css`
 * for the red variant.
 */
const IconButton: React.FC<IconButtonProps> = ({
  variant = "pink",
  ariaLabel,
  disabled,
  onClick,
  children,
}) => {
  const style = VARIANT_STYLES[variant];
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={[BASE_CLASSES, style.tintClasses, style.focusClass].join(" ")}
    >
      {children}
    </button>
  );
};

export default IconButton;
