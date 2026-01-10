// src/utils/textUtils.js

export const formatLabel = (value = "") => {
  if (!value) return "";

  // If already all caps → return as is
  if (value === value.toUpperCase()) return value;

  // Convert "money" → "Money"
  return value
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};