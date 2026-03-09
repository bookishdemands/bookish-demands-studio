import { buildContent } from "./contentBuilder.js";

export function getSlideTitles(style = "none") {
  if (style === "short") {
    return ["SHOCKED", "DELULU", "SIDE-EYE", "FERAL"];
  }

  if (style === "spicy") {
    return ["WAIT—", "I VOLUNTEER.", "MHM. SURE.", "I SUPPORT THIS."];
  }

  return ["", "", "", ""];
}

export function buildCarouselSlides(rows = [], quote = "", style = "none") {
  const titles = getSlideTitles(style);

  return rows.map((row, index) => {
    const title = titles[index] || "";
    const slideText = title
      ? `${title}\n${quote ? `“${quote}”\n` : ""}${row.caption || ""}`.trim()
      : `${quote ? `“${quote}”\n` : ""}${row.caption || ""}`.trim();

    return {
      ...row,
      slideText
    };
  });
}

export function formatCarouselOutput(rows = [], includeContent = true) {
  return rows
    .map((row, index) => {
      if (includeContent) {
        return [
          `SLIDE ${index + 1}`,
          row.slideText || "",
          "",
          "PROMPT",
          row.prompt || "",
          "",
          "CAPTION",
          row.caption || "",
          "",
          "HOOK",
          row.hook || "",
          "",
          "HASHTAGS",
          row.hashtags || ""
        ].join("\n");
      }

      return [
        `SLIDE ${index + 1}`,
        row.slideText || "",
        "",
        "PROMPT",
        row.prompt || ""
      ].join("\n");
    })
    .join("\n\n---\n\n");
}
