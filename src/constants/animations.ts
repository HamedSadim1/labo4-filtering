/**
 * Animation-timing constants.
 *
 * The card-mount stagger caps at `STAGGER_CAP_INDEX × STAGGER_STEP_MS`
 * (currently 12 × 50ms = 600ms total) so a long list fades up quickly
 * without dragging — the visual still reads as "staggered" because the
 * eye anchors on the first few cards, not the late arrivals.
 */

/** Per-card delay step when the list mounts. Used by StudentCard.tsx. */
export const STAGGER_STEP_MS = 50;

/** Maximum card index that receives a staggered delay; later cards snap in. */
export const STAGGER_CAP_INDEX = 12;
