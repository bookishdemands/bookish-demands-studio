function randomFrom(arr = []) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function autoDropName(theme = "", quote = "") {
  const suffixes = ["Volume 1", "Edition", "Pack", "Drop", "Set"];
  const suffix = randomFrom(suffixes) || "Drop";
  return `${theme} ${suffix}${quote ? " — Quote-Driven" : ""}`.trim();
}

export function createDropObject({
  dropTheme = "",
  dropName = "",
  quoteReference = "",
  rows = []
} = {}) {
  const finalName = dropName || autoDropName(dropTheme, quoteReference);

  return {
    id:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `drop_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    dropName: finalName,
    dropTheme,
    quoteReference,
    createdAt: new Date().toISOString(),
    rows
  };
}
