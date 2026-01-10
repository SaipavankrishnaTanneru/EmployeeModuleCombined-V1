// src/utils/labelUtils.js
export const normalizeLabel = (s = "") => {
  if (typeof s !== "string") return s;
  const trimmed = s.trim();
  // if the whole string is lowercase, capitalize the first letter
  if (trimmed && trimmed === trimmed.toLowerCase()) {
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  }
  // otherwise leave as-is
  return trimmed;
};
