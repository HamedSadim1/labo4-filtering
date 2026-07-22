import React from "react";
import { HSL_HOVER_TINT, HOVER_OVERLAY_RADIUS } from "@/constants/colors";

interface HoverOverlayProps {
  /** Deterministic hue for this student — sourced from
   *  `getStudentHue(student.name)` in the parent card. */
  hue: number;
}

/**
 * Hover-only radial gradient overlay that sits on top of the card.
 * Uses `group-hover:opacity-100` so no JS state is needed; the
 * `pointer-events-none` ensures the overlay never intercepts clicks
 * (the card-level `onEdit` or the inner IconButton row must still
 * work through it).
 */
const HoverOverlay: React.FC<HoverOverlayProps> = ({ hue }) => (
  <div
    aria-hidden
    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
    style={{
      background: `radial-gradient(${HOVER_OVERLAY_RADIUS}, hsl(${hue} ${HSL_HOVER_TINT}), transparent 60%)`,
    }}
  />
);

export default HoverOverlay;
