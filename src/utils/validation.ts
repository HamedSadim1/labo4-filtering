/**
 * Form-validation helpers. Each returns a human-readable error string or
 * `undefined` when the value is valid. Pure functions, tree-shakeable.
 */

/** Field must be a non-empty string (after `.trim()`). */
export const validateRequired = (
  label: string,
  value: string
): string | undefined => {
  if (!value.trim()) {
    return `${label} is required`;
  }
  return undefined;
};

/** Field must be a non-empty string AND parse to a positive number. */
export const validatePositiveNumber = (
  label: string,
  value: string
): string | undefined => {
  const requiredError = validateRequired(label, value);
  if (requiredError) return requiredError;
  if (Number(value) <= 0) {
    return `${label} must be greater than 0`;
  }
  return undefined;
};
