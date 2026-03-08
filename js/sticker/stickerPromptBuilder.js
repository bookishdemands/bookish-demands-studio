function resolveValue(customValue, selectedValue, fallback = "") {
  if (customValue && customValue.trim()) return customValue.trim();
  if (selectedValue && selectedValue.trim()) return selectedValue.trim();
  return fallback;
}

export function buildStickerPrompt(options = {}) {
  const productName = resolveValue(options.productCustom, options.product, "reaction sticker");
  const productSubject = resolveValue("", options.productSubject, productName);
  const quote = resolveValue("", options.quote, "bookish reaction quote");
  const microQuote = resolveValue("", options.microQuote, "");
  const vibe = resolveValue(options.vibeCustom, options.vibe, "bookish glam");
  const palette = resolveValue(options.paletteCustom, options.palette, "black + hot pink + silver");
  const background = resolveValue("", options.background, "transparent background");
  const border = resolveValue("", options.border, "clean white sticker border");
  const outline = resolveValue("", options.outline, "bold clean outline");
  const spice = resolveValue("", options.spice, "level 2 spicy energy");

  const sections = [
    "STICKER PROMPT",
    "",
    "PRODUCT",
    productName,
    productSubject,
    "",
    "TEXT",
    quote,
    microQuote,
    "",
    "VIBE",
    vibe,
    palette ? `palette influence: ${palette}` : "",
    options.paletteLock ? `palette family lock: ${options.paletteLock}` : "",
    spice,
    "",
    "STYLE",
    "bold sticker design",
    "high-end digital sticker art",
    "clean die-cut silhouette",
    "centered composition",
    "readable text placement",
    "graphic, polished, scroll-stopping design",
    border,
    outline,
    background,
    "no watermark, no logo"
  ];

  return sections.filter(Boolean).join("\n");
}
