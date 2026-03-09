function resolveValue(customValue, selectedValue, fallback = "") {
  if (customValue && String(customValue).trim()) return String(customValue).trim();
  if (selectedValue && String(selectedValue).trim()) return String(selectedValue).trim();
  return fallback;
}

export function buildKindleInsertPrompt(options = {}) {
  const quote = resolveValue("", options.quote, "dark romance reader quote");
  const microQuote = resolveValue("", options.microQuote, "");
  const theme = resolveValue(options.themeCustom, options.theme, "luxury dark romance");
  const palette = resolveValue(options.paletteCustom, options.palette, "black + hot pink + silver");
  const background = resolveValue("", options.background, "clean insert background");
  const layout = resolveValue("", options.layout, "centered quote layout");
  const heat = resolveValue("", options.heat, "heat level 2");
  const extra = resolveValue("", options.extra, "");

  const sections = [
    "KINDLE INSERT PROMPT",
    "",
    "TEXT",
    quote,
    microQuote,
    "",
    "THEME",
    theme,
    palette ? `palette influence: ${palette}` : "",
    heat,
    "",
    "LAYOUT",
    layout,
    background,
    extra,
    "",
    "STYLE",
    "flat rectangular Kindle insert design",
    "clean polished graphic layout",
    "luxury reader aesthetic",
    "high-end digital insert art",
    "visually balanced typography zones",
    "designed for e-reader insert style",
    "no watermark, no logo"
  ];

  return sections.filter(Boolean).join("\n");
}
