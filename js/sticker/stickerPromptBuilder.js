import { resolveValue } from "../utils/resolveValue.js";

export function buildStickerPrompt(options = {}) {
  const productName = resolveValue(options.productCustom, options.product, "Reaction Sticker");
  const productSubject = resolveValue("", options.productSubject, "clean die-cut sticker design");
  const quote = resolveValue("", options.quote, "");
  const microQuote = resolveValue("", options.microQuote, "");
  const vibe = resolveValue(options.vibeCustom, options.vibe, "bookish glam");
  const palette = resolveValue(options.paletteCustom, options.palette, "black + hot pink + silver");
  const background = resolveValue("", options.background, "transparent background");
  const border = resolveValue("", options.border, "clean white sticker border");
  const outline = resolveValue("", options.outline, "bold clean outline");
  const spice = resolveValue("", options.spice, "level 2 spicy energy");
  const paletteLock = resolveValue("", options.paletteLock, "");

  const textLine = quote || microQuote || "";
  const textInstruction = textLine
    ? `quote text integrated into the design: "${textLine}"`
    : "";

  const paletteInstruction = palette ? `palette influence: ${palette}` : "";
  const paletteLockInstruction = paletteLock ? `palette family lock: ${paletteLock}` : "";

  const parts = [
    `${productName}, ${productSubject}`,
    textInstruction,
    vibe,
    spice,
    paletteInstruction,
    paletteLockInstruction,
    "high-end digital sticker design",
    "clean vector-style illustration",
    "die-cut sticker composition",
    "centered graphic layout",
    "bold readable typography",
    "strong text hierarchy",
    "balanced text placement",
    "scroll-stopping composition",
    "bookish branded aesthetic",
    "luxury reader lifestyle energy",
    border,
    outline,
    background,
    "strong silhouette readability",
    "print-ready sticker aesthetic",
    "crisp edges",
    "no watermark",
    "no logo"
  ];

  return parts.filter(Boolean).join(", ");
}
