import React from "react";
import {
  HSL_PRIMARY,
  HSL_SECONDARY,
  HUE_OFFSET_DEGREES,
} from "@/constants/colors";

interface AccentStripeProps {
  /** Deterministic hue for this student — sourced from
   *  `getStudentHue(student.name)` in the parent card. */
  hue: number;
}

/**
 * Thin vertical gradient stripe on the left edge of a StudentCard.
 * Purely decorative (`aria-hidden`). The hue + offset matches the
 * avatar gradient so both accents stay visually synchronised.
 */
const AccentStripe: React.FC<AccentStripeProps> = ({ hue }) => (
  <div
    aria-hidden
    className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl"
    style={{
      background: `linear-gradient(to bottom, hsl(${hue} ${HSL_PRIMARY}), hsl(${
        (hue + HUE_OFFSET_DEGREES) % 360
      } ${HSL_SECONDARY}))`,
    }}
  />
);

export default AccentStripe;
