import React from "react";

interface StudentNameIdProps {
  /** Full student name — rendered as a truncated `<h3>`. */
  name: string;
  /** Student ID — only the last 6 characters are shown. */
  id: string;
}

/**
 * Name heading + short-form ID subtitle. The name uses `truncate` so
 * long names never push the action icons off the row; the ID shows
 * the last 6 hex characters for a compact reference.
 */
const StudentNameId: React.FC<StudentNameIdProps> = ({ name, id }) => (
  <div className="min-w-0 flex-1">
    <h3
      className="text-base font-semibold text-slate-900 dark:text-white truncate"
      title={name}
    >
      {name}
    </h3>
    <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 dark:text-slate-500 mt-0.5">
      #{id.slice(-6)}
    </p>
  </div>
);

export default StudentNameId;
