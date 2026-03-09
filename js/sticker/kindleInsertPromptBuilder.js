export function buildKindleInsertPrompt(options = {}) {
  const quote = resolveValue("", options.quote, "dark romance reader quote");
  const microQuote = resolveValue("", options.microQuote, "");
  const theme = resolveValue(options.themeCustom, options.theme, "luxury dark romance");
  const palette = resolveValue(options.paletteCustom, options.palette, "black + hot pink + silver");
  const background = resolveValue("", options.background, "clean insert background");
  const layout = resolveValue("", options.layout, "centered quote layout");
  const heat = resolveValue("", options.heat, "heat level 2");
  const extra = resolveValue("", options.extra, "");

  return [
    "PROMPT,",
    "Kindle insert design",
    "high-end digital reader insert artwork",
    `"${quote}"`,
    microQuote,
    theme,
    `palette influence: ${palette}`,
    heat,
    layout,
    background,
    "clean luxury typography layout",
    "balanced text hierarchy",
    "reader aesthetic",
    "flat rectangular insert design",
    "designed for e-reader insert style",
    extra,
    "no watermark",
    "no logo"
  ]
  .filter(Boolean)
  .join(", ");
}
