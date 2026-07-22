module.exports = {
  extends: ["@commitlint/config-conventional"],
  // Promote footer-leading-blank from its default warning level to error
  // so multi-paragraph bodies (which the warning fires on) are caught at
  // commit time, not silently. To write the project's preferred style of
  // bodies, keep all descriptive content in a single block — without an
  // internal blank line that would otherwise be parsed as a new footer
  // section.
  rules: {
    // commitlint v21+ requires the array shape for rule values: [level].
    // commitlint requires each rule to be a [level, applicability] tuple;
    // bare [2] is rejected with "must be 2 or 3 items long".
    "footer-leading-blank": [2, "always"],
  },
};
