/**
 * Per-card accent design tokens. The hue for each card is computed via
 * `getStudentHue(student.name)` (see /utils/studentUtils.ts); these
 * tokens pin the saturation/lightness so every card's accent reads
 * consistently against the brand pink-purple-violet-indigo palette.
 *
 * The HSL strings omit the leading `hsl(` and hue value — they're meant
 * to be interpolated as the middle of an `hsl(${hue} ${tokens})` template.
 */

/** Top stop of the accent gradient (lighter, more saturated). */
export const HSL_PRIMARY = "85% 60%";

/** Bottom stop of the accent gradient (slightly muted, complementary hue). */
export const HSL_SECONDARY = "80% 52%";

/** Tint applied by the card's hover-overlay radial gradient. */
export const HSL_HOVER_TINT = "92% 92% / 0.35";

/**
 * Hue offset (degrees) between the two stops in a card's accent
 * gradient. Used BOTH by the accent stripe and by the avatar gradient
 * so they harmonise; previously one site used `+ 35` instead of `+ 32`
 * which produced a subtle but visible colour drift between sibling
 * cards.
 */
export const HUE_OFFSET_DEGREES = 32;

/** Geometry of the radial-gradient hover overlay (per StudentCard.tsx). */
export const HOVER_OVERLAY_RADIUS = "420px circle at 50% 0%";

/**
 * Multiplier used in the Jenkins-like hash inside `getStudentHue`
 * (`src/utils/studentUtils.ts`). Sticking to 31 produces a well-
 * distributed set of hue indices across the 6-element huePalette;
 * changing it would change every card's accent colour (harmless
 * but visually disruptive, so treat as a design token, not a
 * refactor constant).
 */
export const HASH_MULTIPLIER = 31 as const;
