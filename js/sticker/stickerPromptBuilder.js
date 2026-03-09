import { resolveValue } from "../utils/resolveValue.js";

export function buildStickerPrompt(options = {}) {
  const productName = resolveValue(options.productCustom, options.product, "Reaction Sticker");
  const productSubject = resolveValue("", options.productSubject, "clean die-cut sticker design");
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
    "TEXT HIERARCHY",
    quote,
    microQuote,
    "large readable quote treatment",
    "clean text placement",
    "balanced typography layout",
    "",
    "VIBE",
    vibe,
    palette ? `palette influence: ${palette}` : "",
    options.paletteLock ? `palette family lock: ${options.paletteLock}` : "",
    spice,
    "",
    "STYLE",
    "high-end digital sticker art",
    "bold die-cut sticker design",
    "clean vector-like polish",
    "graphic, scroll-stopping composition",
    "bookish branded aesthetic",
    "luxury reader lifestyle energy",
    "",
    "FINISH",
    border,
    outline,
    background,
    "centered composition",
    "strong silhouette readability",
    "print-ready sticker aesthetic",
    "no watermark",
    "no logo"
  ];

  return sections.filter(Boolean).join("\n");
}
