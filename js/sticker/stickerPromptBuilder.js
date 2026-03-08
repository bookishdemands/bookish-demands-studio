function resolveValue(customValue, selectedValue, fallback = "") {
  if (customValue && customValue.trim()) return customValue.trim();
  if (selectedValue && selectedValue.trim()) return selectedValue.trim();
  return fallback;
}

export function buildStickerPrompt(options = {}) {

  const product = resolveValue(options.productCustom, options.product, "quote sticker");
  const quote = resolveValue("", options.quote, "dark romance reader quote");
  const microQuote = resolveValue("", options.microQuote, "");
  const vibe = resolveValue(options.vibeCustom, options.vibe, "dark romance energy");
  const palette = resolveValue(options.paletteCustom, options.palette, "black + hot pink + silver");
  const background = resolveValue("", options.background, "clean sticker background");
  const border = resolveValue("", options.border, "bold die-cut sticker border");
  const outline = resolveValue("", options.outline, "white sticker outline");
  const spice = resolveValue("", options.spice, "spice level 2");

  const parts = [
    "STICKER PROMPT",
    "",
    product,
    "",
    "QUOTE",
    quote,
    microQuote,
    "",
    "VIBE",
    vibe,
    spice,
    "",
    "STYLE",
    "bold high-end sticker design",
    "clean vector illustration",
    "bookish reader aesthetic",
    palette ? `palette influence: ${palette}` : "",
    background,
    border,
    outline,
    "",
    "DESIGN",
    "die-cut sticker composition",
    "centered graphic layout",
    "print-ready sticker aesthetic",
    "no watermark",
    "no logo"
  ];

  return parts.filter(Boolean).join("\n");
}
