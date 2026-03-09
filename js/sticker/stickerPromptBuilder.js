export function buildStickerPrompt(options = {}) {
  const productName = resolveValue(options.productCustom, options.product, "reaction sticker");
  const productSubject = resolveValue("", options.productSubject, "die-cut sticker design");
  const quote = resolveValue("", options.quote, "bookish reaction quote");
  const microQuote = resolveValue("", options.microQuote, "");
  const vibe = resolveValue(options.vibeCustom, options.vibe, "bookish glam");
  const palette = resolveValue(options.paletteCustom, options.palette, "black + hot pink + silver");
  const background = resolveValue("", options.background, "transparent background");
  const border = resolveValue("", options.border, "clean white sticker border");
  const outline = resolveValue("", options.outline, "bold clean outline");
  const spice = resolveValue("", options.spice, "level 2 spicy energy");

  return [
    "PROMPT,",
    "high-end digital sticker illustration",
    "bold die-cut sticker design",
    productName,
    productSubject,
    `"${quote}"`,
    microQuote,
    "large readable quote typography",
    "clean balanced text layout",
    vibe,
    `palette influence: ${palette}`,
    spice,
    border,
    outline,
    background,
    "centered composition",
    "clean vector-like polish",
    "scroll-stopping graphic composition",
    "print-ready sticker aesthetic",
    "strong silhouette readability",
    "no watermark",
    "no logo"
  ]
  .filter(Boolean)
  .join(", ");
}
