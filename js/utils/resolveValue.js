export function resolveValue(customValue, selectedValue, fallback = "") {
  if (customValue && String(customValue).trim()) return String(customValue).trim();
  if (selectedValue && String(selectedValue).trim()) return String(selectedValue).trim();
  return fallback;
}
