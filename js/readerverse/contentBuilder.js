function normalize(text = "") {
  return String(text).toLowerCase();
}

function uniq(items = []) {
  return [...new Set(items.filter(Boolean))];
}

export function buildContent(sel = {}) {
  const quote = sel.quote || "";
  const archetype = sel.archetype || "Reader";
  const attitude = sel.attitude || "unbothered";
  const dropTheme = sel.dropTheme || "";

  const captions = [
    `${archetype} energy: ${attitude}.`,
    `Me reading this like a full ${archetype}.`,
    `Current reader state: ${attitude}.`,
    `Readerverse check-in: ${archetype}.`,
    `If you get it, you get it. ${archetype} edition.`
  ];

  const hooks = [
    "Be honest… what would your face be right here?",
    "Drop your reaction type in the comments.",
    "Which reader archetype are you today?",
    "Tag your book bestie who would scream at this scene.",
    "This is the part where I start speed-reading and spiraling."
  ];

  const brandTags = [
    "#BookishDemands",
    "#Readerverse"
  ];

  const discoveryTags = [
    "#BookTok",
    "#Bookstagram",
    "#ReadingCommunity",
    "#ReaderLife",
    "#BookishCommunity"
  ];

  const tags = [...brandTags, ...discoveryTags];
  const q = normalize(quote);

  if (q.includes("plot twist") || q.includes("twist")) tags.push("#PlotTwist");
  if (q.includes("villain") || q.includes("morally")) tags.push("#MorallyGrey");
  if (
    q.includes("obsessed") ||
    q.includes("mine") ||
    q.includes("possessive") ||
    q.includes("ruin")
  ) {
    tags.push("#ObsessedMMC");
  }

  if (dropTheme) {
    tags.push(`#${dropTheme.replace(/\s+/g, "")}`);
  }

  return {
    caption: `${captions[Math.floor(Math.random() * captions.length)]}${quote ? `\n\n“${quote}”` : ""}`,
    hook: hooks[Math.floor(Math.random() * hooks.length)],
    hashtags: uniq(tags).join(" ")
  };
}

export function formatContentBlock(content = {}) {
  return [
    "CONTENT",
    "CAPTION",
    content.caption || "",
    "",
    "HOOK",
    content.hook || "",
    "",
    "HASHTAGS",
    content.hashtags || ""
  ].join("\n");
}
