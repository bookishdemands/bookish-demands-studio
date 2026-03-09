import { resolveValue } from "../utils/resolveValue.js";

export function buildKindleInsertPrompt(options = {}) {
  const quote = resolveValue("", options.quote, "");
  const microQuote = resolveValue("", options.microQuote, "");
  const theme = resolveValue(options.themeCustom, options.theme, "luxury dark romance");
  const palette = resolveValue(options.paletteCustom, options.palette, "black + hot pink + silver");
  const background = resolveValue("", options.background, "clean insert background");
  const layout = resolveValue("", options.layout, "centered quote layout");
  const heat = resolveValue("", options.heat, "heat level 2 spicy tease");
  const extra = resolveValue("", options.extra, "");

  const textLine = quote || microQuote || "";
  const textInstruction = textLine
    ? `main quote text featured in the insert: "${textLine}"`
    : "";

  const parts = [
    "flat rectangular Kindle insert design",
    textInstruction,
    theme,
    heat,
    palette ? `palette influence: ${palette}` : "",
    layout,
    background,
    extra,
    "clean polished graphic layout",
    "luxury reader aesthetic",
    "high-end digital insert art",
    "visually balanced typography zones",
    "designed for e-reader insert style",
    "elegant quote-focused composition",
    "minimal but striking insert design",
    "no watermark",
    "no logo"
  ];

  return parts.filter(Boolean).join(", ");
}
