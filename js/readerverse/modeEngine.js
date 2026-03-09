import { buildContent, formatContentBlock } from "./contentBuilder.js";
import { matchQuoteToArchetype } from "./quoteMatcher.js";
import { buildCarouselSlides, formatCarouselOutput } from "./carouselBuilder.js";
import { createDropObject } from "./dropBuilder.js";

function randomFrom(arr = []) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function formatPromptBlock(prompt = "", content = null, includeContent = false) {
  if (!includeContent || !content) {
    return `PROMPT\n${prompt}`;
  }

  return `PROMPT\n${prompt}\n\n====================\n\n${formatContentBlock(content)}`;
}

function buildRow({
  label = "",
  dropName = "",
  dropTheme = "",
  quoteReference = "",
  prompt = "",
  content = null,
  slideText = ""
} = {}) {
  return {
    label,
    dropName,
    dropTheme,
    quoteReference,
    prompt,
    caption: content?.caption || "",
    hook: content?.hook || "",
    hashtags: content?.hashtags || "",
    slideText
  };
}

export function runReaderverseMode({
  mode = "single",
  selections = {},
  buildCharacterPrompt,
  archetypes = [],
  randomizeCharacterOptions,
  applyQuoteMatch = false
} = {}) {
  const rows = [];
  let drop = null;
  let outputText = "";

  const quote = selections.quote || "";
  const includeContent = !!selections.contentMode;

  const makeSelectionSet = () => {
    const next = { ...selections };

    if (typeof randomizeCharacterOptions === "function") {
      Object.assign(next, randomizeCharacterOptions(selections));
    }

    if (applyQuoteMatch && quote) {
      const match = matchQuoteToArchetype(quote, selections.matchStrength || "balanced");
      next.archetype = match.archetype;
      if (match.paletteBias?.length && !next.palette) {
        next.palette = randomFrom(match.paletteBias);
      }
    }

    return next;
  };

  if (mode === "single") {
    const sel = { ...selections };
    const prompt = buildCharacterPrompt(sel.archetype, sel);
    const content = includeContent ? buildContent(sel) : null;

    rows.push(
      buildRow({
        label: "Single",
        quoteReference: quote,
        prompt,
        content
      })
    );

    outputText = formatPromptBlock(prompt, content, includeContent);
    return { rows, drop, outputText };
  }

  if (mode === "match") {
    const match = matchQuoteToArchetype(quote, selections.matchStrength || "balanced");
    const sel = { ...selections, archetype: match.archetype };
    if (match.paletteBias?.length && !sel.palette) {
      sel.palette = randomFrom(match.paletteBias);
    }

    const prompt = buildCharacterPrompt(sel.archetype, sel);
    const content = includeContent ? buildContent(sel) : null;

    rows.push(
      buildRow({
        label: "Matched",
        quoteReference: quote,
        prompt,
        content
      })
    );

    outputText = formatPromptBlock(prompt, content, includeContent);
    return { rows, drop, outputText };
  }

  if (mode === "batch5") {
    for (let i = 0; i < 5; i++) {
      const sel = makeSelectionSet();
      const prompt = buildCharacterPrompt(sel.archetype, sel);
      const content = includeContent ? buildContent(sel) : null;

      rows.push(
        buildRow({
          label: `Random ${i + 1}`,
          quoteReference: quote,
          prompt,
          content
        })
      );
    }

    outputText = rows
      .map((row) =>
        includeContent
          ? `${row.label}\nPROMPT\n${row.prompt}\n\nCAPTION\n${row.caption}\n\nHOOK\n${row.hook}\n\nHASHTAGS\n${row.hashtags}`
          : `${row.label}\n${row.prompt}`
      )
      .join("\n\n---\n\n");

    return { rows, drop, outputText };
  }

  if (mode === "expression4") {
    const archetypePack = [
      { label: "1) Shock reaction reader", archetype: "Plot Twist Detective" },
      { label: "2) Delulu dark romance reader", archetype: "Dark Romance Delulu" },
      { label: "3) Petty side-eye reader", archetype: "Petty Reader" },
      { label: "4) Feral romance reader", archetype: "Morally Gray Enjoyer" }
    ];

    archetypePack.forEach((item) => {
      const sel = { ...selections, archetype: item.archetype };
      const prompt = buildCharacterPrompt(sel.archetype, sel);
      const content = includeContent ? buildContent(sel) : null;

      rows.push(
        buildRow({
          label: item.label,
          quoteReference: quote,
          prompt,
          content
        })
      );
    });

    outputText = rows
      .map((row) =>
        includeContent
          ? `${row.label}\nPROMPT\n${row.prompt}\n\nCAPTION\n${row.caption}\n\nHOOK\n${row.hook}\n\nHASHTAGS\n${row.hashtags}`
          : `${row.label}\n${row.prompt}`
      )
      .join("\n\n---\n\n");

    return { rows, drop, outputText };
  }

  if (mode === "carousel4") {
    const archetypePack = [
      { label: "1) Shock reaction reader", archetype: "Plot Twist Detective" },
      { label: "2) Delulu dark romance reader", archetype: "Dark Romance Delulu" },
      { label: "3) Petty side-eye reader", archetype: "Petty Reader" },
      { label: "4) Feral romance reader", archetype: "Morally Gray Enjoyer" }
    ];

    archetypePack.forEach((item) => {
      const sel = { ...selections, archetype: item.archetype };
      const prompt = buildCharacterPrompt(sel.archetype, sel);
      const content = includeContent ? buildContent(sel) : null;

      rows.push(
        buildRow({
          label: item.label,
          quoteReference: quote,
          prompt,
          content
        })
      );
    });

    const slideRows = buildCarouselSlides(
      rows,
      quote,
      selections.carouselTitleStyle || "none"
    );

    outputText = formatCarouselOutput(slideRows, includeContent);
    return { rows: slideRows, drop, outputText };
  }

  if (mode === "pack10" || mode === "pack30" || mode === "dropbuilder") {
    const count = mode === "pack10" ? 10 : 30;

    for (let i = 0; i < count; i++) {
      const sel = makeSelectionSet();
      const prompt = buildCharacterPrompt(sel.archetype, sel);
      const content = includeContent ? buildContent(sel) : null;

      rows.push(
        buildRow({
          label: `${mode === "pack10" ? "Pack" : "Drop"} ${i + 1}`,
          dropName: selections.dropName || "",
          dropTheme: selections.dropTheme || "",
          quoteReference: quote,
          prompt,
          content
        })
      );
    }

    if (mode === "pack30" || mode === "dropbuilder") {
      drop = createDropObject({
        dropTheme: selections.dropTheme || "",
        dropName: selections.dropName || "",
        quoteReference: quote,
        rows
      });
    }

    outputText = rows
      .map((row) =>
        includeContent
          ? `${row.label}\nPROMPT\n${row.prompt}\n\nCAPTION\n${row.caption}\n\nHOOK\n${row.hook}\n\nHASHTAGS\n${row.hashtags}`
          : `${row.label}\n${row.prompt}`
      )
      .join("\n\n---\n\n");

    return { rows, drop, outputText };
  }

  outputText = "Unsupported Readerverse mode.";
  return { rows, drop, outputText };
}
