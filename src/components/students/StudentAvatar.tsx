import React from "react";
import {
  HSL_PRIMARY,
  HSL_SECONDARY,
  HUE_OFFSET_DEGREES,
} from "@/constants/colors";
import { getStudentInitial } from "@/utils/studentUtils";

interface StudentAvatarProps {
  /** Deterministic hue — sourced from `getStudentHue(student.name)`. */
  hue: number;
  /** Full student name; only the first character is rendered. */
  name: string;
}

/**
 * Rounded square avatar showing the first character of the student's
 * name overlaid on a diagonal gradient. The hue + offset matches the
 * AccentStripe and the ConfirmDialog's color-derived palette so every
 * element referencing this student shares the same accent colour.
 */
const StudentAvatar: React.FC<StudentAvatarProps> = ({ hue, name }) => (
  <div
    className="shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-md"
    style={{
      background: `linear-gradient(135deg, hsl(${hue} ${HSL_PRIMARY}), hsl(${
        (hue + HUE_OFFSET_DEGREES) % 360
      } ${HSL_SECONDARY}))`,
    }}
  >
    <span className="text-xl font-bold text-white drop-shadow">
      {getStudentInitial(name)}
    </span>
  </div>
);

export default StudentAvatar;
