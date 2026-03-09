function escapeCSV(value) {
  const stringValue = String(value ?? "");
  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}

export function downloadText(filename, text) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

export function buildCSV(rows = []) {
  const headers = [
    "label",
    "dropName",
    "dropTheme",
    "quoteReference",
    "prompt",
    "caption",
    "hook",
    "hashtags",
    "slideText"
  ];

  const lines = [headers.join(",")];

  rows.forEach((row) => {
    lines.push(
      [
        escapeCSV(row.label || ""),
        escapeCSV(row.dropName || ""),
        escapeCSV(row.dropTheme || ""),
        escapeCSV(row.quoteReference || ""),
        escapeCSV(row.prompt || ""),
        escapeCSV(row.caption || ""),
        escapeCSV(row.hook || ""),
        escapeCSV(row.hashtags || ""),
        escapeCSV(row.slideText || "")
      ].join(",")
    );
  });

  return lines.join("\n");
}
