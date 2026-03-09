import { ARCHETYPES } from "./core/archetypes.js";
import { ARCHETYPE_DNA } from "./character/archetypeDNA.js";
import { HAIR } from "./character/hair.js";
import { OUTFITS } from "./character/outfits.js";
import { EXPRESSIONS } from "./character/expressions.js";
import { POSES } from "./character/poses.js";
import { PROPS } from "./character/props.js";
import { PALETTES } from "./character/palettes.js";
import { MICRO_EXPRESSIONS } from "./character/microExpressions.js";
import { ATTITUDES } from "./character/attitudes.js";
import { SCENES } from "./character/scenes.js";
import { buildCharacterPrompt } from "./character/characterPromptBuilder.js";

import { STICKER_PRODUCTS } from "./sticker/products.js";
import { STICKER_QUOTES } from "./sticker/quotes.js";
import { STICKER_MICRO_QUOTES } from "./sticker/microQuotes.js";
import { STICKER_QUOTE_BANKS } from "./sticker/quoteBanks.js";
import { buildStickerPrompt } from "./sticker/stickerPromptBuilder.js";
import { buildKindleInsertPrompt } from "./sticker/kindleInsertPromptBuilder.js";
import { KINDLE_QUOTES } from "./sticker/kindleQuotes.js";
import { KINDLE_MICRO_QUOTES } from "./sticker/kindleMicroQuotes.js";
import { runReaderverseMode } from "./readerverse/modeEngine.js";

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getReaderverseMode() {
  const modeEl = document.getElementById("readerverseMode");
  return modeEl ? modeEl.value : "single";
}

function getReaderverseSelections() {
  const quoteInput = document.getElementById("quoteInput");
  const matchStrength = document.getElementById("matchStrength");
  const contentMode = document.getElementById("contentMode");
  const carouselTitleStyle = document.getElementById("carouselTitleStyle");
  const dropTheme = document.getElementById("dropTheme");
  const dropName = document.getElementById("dropName");

  return {
    mode: getReaderverseMode(),
    matchStrength: matchStrength ? matchStrength.value : "balanced",
    contentMode: contentMode ? contentMode.checked : false,
    carouselTitleStyle: carouselTitleStyle ? carouselTitleStyle.value : "none",
    dropTheme: dropTheme ? dropTheme.value : "",
    dropName: dropName ? dropName.value.trim() : "",
    quote: quoteInput ? quoteInput.value.trim() : "",

    archetype: archetypeSelect.value,
    complexion: complexionSelect.value,
    bodyType: bodyTypeSelect.value,
    faceShape: faceShapeSelect.value,
    hair: hairSelect.value,
    outfit: outfitSelect.value,
    expression: expressionSelect.value,
    micro: microSelect.value,
    attitude: attitudeSelect.value,
    pose: poseSelect.value,
    prop: propSelect.value,
    scene: sceneSelect.value,
    palette: paletteSelect.value,

    complexionCustom: complexionCustom.value,
    bodyTypeCustom: bodyTypeCustom.value,
    faceShapeCustom: faceShapeCustom.value,
    hairCustom: hairCustom.value,
    outfitCustom: outfitCustom.value,
    expressionCustom: expressionCustom.value,
    microCustom: microCustom.value,
    attitudeCustom: attitudeCustom.value,
    poseCustom: poseCustom.value,
    propCustom: propCustom.value,
    sceneCustom: sceneCustom.value,
    paletteCustom: paletteCustom.value
  };
}

function randomizeCharacterOptions(baseSelections = {}) {
  return {
    ...baseSelections,
    complexion: baseSelections.complexionCustom?.trim() || randomFrom(COMPLEXIONS),
    bodyType: baseSelections.bodyTypeCustom?.trim() || randomFrom(BODY_TYPES),
    faceShape: baseSelections.faceShapeCustom?.trim() || randomFrom(FACE_SHAPES),
    hair: baseSelections.hairCustom?.trim() || randomFrom(HAIR),
    outfit: baseSelections.outfitCustom?.trim() || randomFrom(OUTFITS),
    expression: baseSelections.expressionCustom?.trim() || randomFrom(EXPRESSIONS),
    micro: baseSelections.microCustom?.trim() || randomFrom(MICRO_EXPRESSIONS),
    attitude: baseSelections.attitudeCustom?.trim() || randomFrom(ATTITUDES),
    pose: baseSelections.poseCustom?.trim() || randomFrom(POSES),
    prop: baseSelections.propCustom?.trim() || randomFrom(PROPS),
    scene: baseSelections.sceneCustom?.trim() || randomFrom(SCENES),
    palette: baseSelections.paletteCustom?.trim() || randomFrom(PALETTES)
  };
}

function runCharacterStudio() {
  const readerverseModeEl = document.getElementById("readerverseMode");
  const useReaderverseEngine = !!readerverseModeEl;

  if (!useReaderverseEngine) {
    output.value = buildCharacterPrompt(archetypeSelect.value, getCharacterOptions());
    return;
  }

  const selections = getReaderverseSelections();

  const result = runReaderverseMode({
    mode: selections.mode,
    selections,
    buildCharacterPrompt,
    archetypes: ARCHETYPES,
    randomizeCharacterOptions,
    applyQuoteMatch: selections.mode === "match" || selections.mode === "pack10" || selections.mode === "pack30" || selections.mode === "dropbuilder"
  });

  output.value = result.outputText || "";
}

function fillSelect(selectEl, options) {
  if (!selectEl) return;

  selectEl.innerHTML = "";

  const blank = document.createElement("option");
  blank.value = "";
  blank.textContent = "None";
  selectEl.appendChild(blank);

  (options || []).forEach((option) => {
    const el = document.createElement("option");

    if (typeof option === "string") {
      el.value = option;
      el.textContent = option;
    } else {
      el.value = option?.value ?? "";
      el.textContent = option?.label ?? option?.value ?? "";
    }

    selectEl.appendChild(el);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Shared
  const studioMode = document.getElementById("studioMode");
  const characterControls = document.getElementById("characterControls");
  const stickerControls = document.getElementById("stickerControls");
  const output = document.getElementById("output");
  const copyBtn = document.getElementById("copyBtn");
  const clearOutputBtn = document.getElementById("clearOutputBtn");

  // Character controls
  const archetypeSelect = document.getElementById("archetypeSelect");
  const complexionSelect = document.getElementById("complexionSelect");
  const bodyTypeSelect = document.getElementById("bodyTypeSelect");
  const faceShapeSelect = document.getElementById("faceShapeSelect");
  const hairSelect = document.getElementById("hairSelect");
  const outfitSelect = document.getElementById("outfitSelect");
  const expressionSelect = document.getElementById("expressionSelect");
  const microSelect = document.getElementById("microSelect");
  const attitudeSelect = document.getElementById("attitudeSelect");
  const poseSelect = document.getElementById("poseSelect");
  const propSelect = document.getElementById("propSelect");
  const sceneSelect = document.getElementById("sceneSelect");
  const paletteSelect = document.getElementById("paletteSelect");

  const complexionCustom = document.getElementById("complexionCustom");
  const bodyTypeCustom = document.getElementById("bodyTypeCustom");
  const faceShapeCustom = document.getElementById("faceShapeCustom");
  const hairCustom = document.getElementById("hairCustom");
  const outfitCustom = document.getElementById("outfitCustom");
  const expressionCustom = document.getElementById("expressionCustom");
  const microCustom = document.getElementById("microCustom");
  const attitudeCustom = document.getElementById("attitudeCustom");
  const poseCustom = document.getElementById("poseCustom");
  const propCustom = document.getElementById("propCustom");
  const sceneCustom = document.getElementById("sceneCustom");
  const paletteCustom = document.getElementById("paletteCustom");

  const randomArchetypeBtn = document.getElementById("randomArchetypeBtn");
  const randomizeAllBtn = document.getElementById("randomizeAllBtn");
  const resetBtn = document.getElementById("resetBtn");
  const clearBtn = document.getElementById("clearBtn");
  const generateBtn = document.getElementById("generateBtn");
  const generate5Btn = document.getElementById("generate5Btn");

  // Sticker controls
  const stickerSubMode = document.getElementById("stickerSubMode");
  const stickerModeControls = document.getElementById("stickerModeControls");
  const kindleModeControls = document.getElementById("kindleModeControls");

  const stickerProductSelect = document.getElementById("stickerProductSelect");
  const stickerQuoteBankSelect = document.getElementById("stickerQuoteBankSelect");
  const stickerQuoteInput = document.getElementById("stickerQuoteInput");
  const stickerMicroQuoteInput = document.getElementById("stickerMicroQuoteInput");
  const stickerVibeSelect = document.getElementById("stickerVibeSelect");
  const stickerPaletteSelect = document.getElementById("stickerPaletteSelect");
  const stickerBackgroundSelect = document.getElementById("stickerBackgroundSelect");
  const stickerBorderSelect = document.getElementById("stickerBorderSelect");
  const stickerOutlineSelect = document.getElementById("stickerOutlineSelect");
  const stickerSpiceSelect = document.getElementById("stickerSpiceSelect");

  const stickerProductCustom = document.getElementById("stickerProductCustom");
  const stickerVibeCustom = document.getElementById("stickerVibeCustom");
  const stickerPaletteCustom = document.getElementById("stickerPaletteCustom");

  const randomStickerBtn = document.getElementById("randomStickerBtn");
  const resetStickerBtn = document.getElementById("resetStickerBtn");
  const clearStickerBtn = document.getElementById("clearStickerBtn");
  const generateStickerBtn = document.getElementById("generateStickerBtn");
  const generate5StickerBtn = document.getElementById("generate5StickerBtn");

  // Kindle insert controls
  const kindleQuoteInput = document.getElementById("kindleQuoteInput");
  const kindleMicroQuoteInput = document.getElementById("kindleMicroQuoteInput");
  const kindleThemeSelect = document.getElementById("kindleThemeSelect");
  const kindleThemeCustom = document.getElementById("kindleThemeCustom");
  const kindlePaletteSelect = document.getElementById("kindlePaletteSelect");
  const kindlePaletteCustom = document.getElementById("kindlePaletteCustom");
  const kindleBackgroundSelect = document.getElementById("kindleBackgroundSelect");
  const kindleLayoutSelect = document.getElementById("kindleLayoutSelect");
  const kindleHeatSelect = document.getElementById("kindleHeatSelect");
  const kindleExtraInput = document.getElementById("kindleExtraInput");

  const randomKindleBtn = document.getElementById("randomKindleBtn");
  const resetKindleBtn = document.getElementById("resetKindleBtn");
  const clearKindleBtn = document.getElementById("clearKindleBtn");
  const generateKindleBtn = document.getElementById("generateKindleBtn");
  const generate5KindleBtn = document.getElementById("generate5KindleBtn");

  // Character arrays
  const COMPLEXIONS = [
    "deep espresso brown skin",
    "rich dark chocolate skin",
    "warm cocoa brown skin",
    "golden brown skin",
    "deep mahogany skin",
    "radiant caramel brown skin"
  ];

  const BODY_TYPES = [
    "curvy feminine silhouette",
    "soft hourglass figure",
    "plus-size curvy body type",
    "mid-size curvy body type"
  ];

  const FACE_SHAPES = [
    "soft oval face shape",
    "soft heart-shaped face",
    "soft round face shape",
    "softened square face shape"
  ];

  // Sticker arrays
  const STICKER_VIBES = [
    "bookish glam",
    "dark romance luxe",
    "urban fiction energy",
    "soft girl reader",
    "morally gray obsession",
    "kindle after dark",
    "high drama reader reaction"
  ];

  const STICKER_BACKGROUNDS = [
    "transparent background",
    "white background",
    "soft pink glow background",
    "matte black background"
  ];

  const STICKER_BORDERS = [
    "clean white sticker border",
    "no border",
    "thick sticker border"
  ];

  const STICKER_OUTLINES = [
    "bold clean outline",
    "soft outline",
    "no outline"
  ];

  const STICKER_SPICE = [
    "level 1 sweet tension",
    "level 2 spicy energy",
    "level 3 dark romance heat",
    "level 4 unhinged tension",
    "level 5 maximum spice vibe"
  ];

  // Kindle arrays
  const KINDLE_THEMES = [
    "luxury dark romance",
    "soft girl reader",
    "morally gray obsession",
    "urban fiction glam",
    "bookish chaos",
    "romantic drama",
    "dangerous devotion"
  ];

  const KINDLE_BACKGROUNDS = [
    "clean white insert background",
    "soft blush insert background",
    "matte black luxe insert background",
    "dark floral insert background",
    "marble glam insert background"
  ];

  const KINDLE_LAYOUTS = [
    "centered quote layout",
    "quote over collage layout",
    "minimal luxe layout",
    "top quote + bottom accent layout",
    "editorial insert layout"
  ];

  const KINDLE_HEAT = [
    "heat level 1 soft tension",
    "heat level 2 spicy tease",
    "heat level 3 dark romance heat",
    "heat level 4 unhinged devotion",
    "heat level 5 maximum obsession"
  ];

  function randomizeSelect(selectEl) {
    if (!selectEl) return;
    const validOptions = Array.from(selectEl.options).filter((option) => option.value !== "");
    if (!validOptions.length) return;
    const random = validOptions[Math.floor(Math.random() * validOptions.length)];
    selectEl.value = random.value;
  }

  function updateStudioMode() {
    if (studioMode.value === "character") {
      characterControls.classList.remove("hidden");
      stickerControls.classList.add("hidden");
    } else {
      characterControls.classList.add("hidden");
      stickerControls.classList.remove("hidden");
    }
  }

  function updateStickerSubMode() {
    if (stickerSubMode.value === "sticker") {
      stickerModeControls.classList.remove("hidden");
      kindleModeControls.classList.add("hidden");
    } else {
      stickerModeControls.classList.add("hidden");
      kindleModeControls.classList.remove("hidden");
    }
  }

  function populateArchetypeOptions() {
    fillSelect(archetypeSelect, ARCHETYPES);
  }

  function populateBuilderOptions(archetype) {
    const dna = ARCHETYPE_DNA[archetype] || {};

    fillSelect(complexionSelect, COMPLEXIONS);
    fillSelect(bodyTypeSelect, BODY_TYPES);
    fillSelect(faceShapeSelect, FACE_SHAPES);
    fillSelect(hairSelect, HAIR);
    fillSelect(outfitSelect, OUTFITS);
    fillSelect(expressionSelect, dna.expression?.length ? dna.expression : EXPRESSIONS);
    fillSelect(microSelect, dna.micro?.length ? dna.micro : MICRO_EXPRESSIONS);
    fillSelect(attitudeSelect, dna.attitude?.length ? dna.attitude : ATTITUDES);
    fillSelect(poseSelect, dna.pose?.length ? dna.pose : POSES);
    fillSelect(propSelect, dna.prop?.length ? dna.prop : PROPS);
    fillSelect(sceneSelect, dna.scene?.length ? dna.scene : SCENES);
    fillSelect(paletteSelect, dna.palette?.length ? dna.palette : PALETTES);

    if (dna.expression?.length) expressionSelect.value = dna.expression[0];
    if (dna.micro?.length) microSelect.value = dna.micro[0];
    if (dna.attitude?.length) attitudeSelect.value = dna.attitude[0];
    if (dna.pose?.length) poseSelect.value = dna.pose[0];
    if (dna.prop?.length) propSelect.value = dna.prop[0];
    if (dna.scene?.length) sceneSelect.value = dna.scene[0];
    if (dna.palette?.length) paletteSelect.value = dna.palette[0];
  }

  function populateStickerControls() {
    fillSelect(stickerProductSelect, STICKER_PRODUCTS.map((item) => item.value));
    fillSelect(stickerVibeSelect, STICKER_VIBES);
    fillSelect(stickerPaletteSelect, PALETTES);
    fillSelect(stickerBackgroundSelect, STICKER_BACKGROUNDS);
    fillSelect(stickerBorderSelect, STICKER_BORDERS);
    fillSelect(stickerOutlineSelect, STICKER_OUTLINES);
    fillSelect(stickerSpiceSelect, STICKER_SPICE);
  }

  function populateKindleControls() {
    fillSelect(kindleThemeSelect, KINDLE_THEMES);
    fillSelect(kindlePaletteSelect, PALETTES);
    fillSelect(kindleBackgroundSelect, KINDLE_BACKGROUNDS);
    fillSelect(kindleLayoutSelect, KINDLE_LAYOUTS);
    fillSelect(kindleHeatSelect, KINDLE_HEAT);
  }

  function clearCharacterCustomInputs() {
    [
      complexionCustom, bodyTypeCustom, faceShapeCustom, hairCustom, outfitCustom,
      expressionCustom, microCustom, attitudeCustom, poseCustom, propCustom,
      sceneCustom, paletteCustom
    ].forEach((input) => {
      if (input) input.value = "";
    });
  }

  function resetBuilder() {
    archetypeSelect.value = ARCHETYPES[0] || "";
    populateBuilderOptions(archetypeSelect.value);
    complexionSelect.value = COMPLEXIONS[0] || "";
    bodyTypeSelect.value = BODY_TYPES[0] || "";
    faceShapeSelect.value = FACE_SHAPES[0] || "";
    clearCharacterCustomInputs();
    output.value = "";
  }

  function clearAll() {
    archetypeSelect.value = "";
    complexionSelect.value = "";
    bodyTypeSelect.value = "";
    faceShapeSelect.value = "";
    hairSelect.value = "";
    outfitSelect.value = "";
    expressionSelect.value = "";
    microSelect.value = "";
    attitudeSelect.value = "";
    poseSelect.value = "";
    propSelect.value = "";
    sceneSelect.value = "";
    paletteSelect.value = "";
    clearCharacterCustomInputs();
    output.value = "";
  }

  function randomizeAll() {
    randomizeSelect(archetypeSelect);
    populateBuilderOptions(archetypeSelect.value);
    randomizeSelect(complexionSelect);
    randomizeSelect(bodyTypeSelect);
    randomizeSelect(faceShapeSelect);
    randomizeSelect(hairSelect);
    randomizeSelect(outfitSelect);
    randomizeSelect(expressionSelect);
    randomizeSelect(microSelect);
    randomizeSelect(attitudeSelect);
    randomizeSelect(poseSelect);
    randomizeSelect(propSelect);
    randomizeSelect(sceneSelect);
    randomizeSelect(paletteSelect);
  }

  function getCharacterOptions() {
    return {
      complexion: complexionSelect.value,
      bodyType: bodyTypeSelect.value,
      faceShape: faceShapeSelect.value,
      hair: hairSelect.value,
      outfit: outfitSelect.value,
      expression: expressionSelect.value,
      micro: microSelect.value,
      attitude: attitudeSelect.value,
      pose: poseSelect.value,
      prop: propSelect.value,
      scene: sceneSelect.value,
      palette: paletteSelect.value,
      complexionCustom: complexionCustom.value,
      bodyTypeCustom: bodyTypeCustom.value,
      faceShapeCustom: faceShapeCustom.value,
      hairCustom: hairCustom.value,
      outfitCustom: outfitCustom.value,
      expressionCustom: expressionCustom.value,
      microCustom: microCustom.value,
      attitudeCustom: attitudeCustom.value,
      poseCustom: poseCustom.value,
      propCustom: propCustom.value,
      sceneCustom: sceneCustom.value,
      paletteCustom: paletteCustom.value
    };
  }

  function clearStickerCustomInputs() {
    stickerProductCustom.value = "";
    stickerVibeCustom.value = "";
    stickerPaletteCustom.value = "";
    stickerQuoteInput.value = "";
    stickerMicroQuoteInput.value = "";
  }

  function getActiveStickerQuotes() {
    const bank = stickerQuoteBankSelect?.value || "general";
    return STICKER_QUOTE_BANKS[bank] || STICKER_QUOTE_BANKS.general;
  }

  function getStickerProductObject(productValue) {
    return STICKER_PRODUCTS.find((item) => item.value === productValue) || null;
  }

  function resetSticker() {
    populateStickerControls();
    stickerProductSelect.value = STICKER_PRODUCTS[0]?.value || "";
    stickerVibeSelect.value = STICKER_VIBES[0] || "";
    stickerPaletteSelect.value = PALETTES[0] || "";
    stickerBackgroundSelect.value = STICKER_BACKGROUNDS[0] || "";
    stickerBorderSelect.value = STICKER_BORDERS[0] || "";
    stickerOutlineSelect.value = STICKER_OUTLINES[0] || "";
    stickerSpiceSelect.value = STICKER_SPICE[1] || "";
    if (stickerQuoteBankSelect) stickerQuoteBankSelect.value = "general";
    clearStickerCustomInputs();
    stickerQuoteInput.value = STICKER_QUOTE_BANKS.general[0] || "";
    stickerMicroQuoteInput.value = STICKER_MICRO_QUOTES[0] || "";
  }

  function clearSticker() {
    stickerProductSelect.value = "";
    stickerVibeSelect.value = "";
    stickerPaletteSelect.value = "";
    stickerBackgroundSelect.value = "";
    stickerBorderSelect.value = "";
    stickerOutlineSelect.value = "";
    stickerSpiceSelect.value = "";
    if (stickerQuoteBankSelect) stickerQuoteBankSelect.value = "general";
    clearStickerCustomInputs();
  }

  function randomSticker() {
    randomizeSelect(stickerProductSelect);
    randomizeSelect(stickerVibeSelect);
    randomizeSelect(stickerPaletteSelect);
    randomizeSelect(stickerBackgroundSelect);
    randomizeSelect(stickerBorderSelect);
    randomizeSelect(stickerOutlineSelect);
    randomizeSelect(stickerSpiceSelect);
    stickerQuoteInput.value = randomFrom(getActiveStickerQuotes());
    stickerMicroQuoteInput.value = randomFrom(STICKER_MICRO_QUOTES);
  }

  function getStickerOptions() {
    const productObj = getStickerProductObject(stickerProductSelect.value);
    return {
      product: stickerProductSelect.value,
      productSubject: productObj?.subject || "",
      productCustom: stickerProductCustom.value,
      quote: stickerQuoteInput.value,
      microQuote: stickerMicroQuoteInput.value,
      vibe: stickerVibeSelect.value,
      vibeCustom: stickerVibeCustom.value,
      palette: stickerPaletteSelect.value,
      paletteCustom: stickerPaletteCustom.value,
      background: stickerBackgroundSelect.value,
      border: stickerBorderSelect.value,
      outline: stickerOutlineSelect.value,
      spice: stickerSpiceSelect.value,
      paletteLock: productObj?.paletteLock || ""
    };
  }

  function clearKindleInputs() {
    kindleQuoteInput.value = "";
    kindleMicroQuoteInput.value = "";
    kindleThemeCustom.value = "";
    kindlePaletteCustom.value = "";
    kindleExtraInput.value = "";
  }

  function resetKindle() {
  populateKindleControls();

  kindleThemeSelect.value = KINDLE_THEMES[0] || "";
  kindlePaletteSelect.value = PALETTES[0] || "";
  kindleBackgroundSelect.value = KINDLE_BACKGROUNDS[0] || "";
  kindleLayoutSelect.value = KINDLE_LAYOUTS[0] || "";
  kindleHeatSelect.value = KINDLE_HEAT[1] || "";

  clearKindleInputs();
  kindleQuoteInput.value = KINDLE_QUOTES[0] || "";
  kindleMicroQuoteInput.value = KINDLE_MICRO_QUOTES[0] || "";
}

  function clearKindle() {
    kindleQuoteInput.value = "";
    kindleMicroQuoteInput.value = "";
    kindleThemeSelect.value = "";
    kindlePaletteSelect.value = "";
    kindleBackgroundSelect.value = "";
    kindleLayoutSelect.value = "";
    kindleHeatSelect.value = "";
    kindleExtraInput.value = "";
    kindleThemeCustom.value = "";
    kindlePaletteCustom.value = "";
  }

  function randomKindle() {
  randomizeSelect(kindleThemeSelect);
  randomizeSelect(kindlePaletteSelect);
  randomizeSelect(kindleBackgroundSelect);
  randomizeSelect(kindleLayoutSelect);
  randomizeSelect(kindleHeatSelect);

  kindleQuoteInput.value = randomFrom(KINDLE_QUOTES);
  kindleMicroQuoteInput.value = randomFrom(KINDLE_MICRO_QUOTES);
}

  function getKindleOptions() {
    return {
      quote: kindleQuoteInput.value,
      microQuote: kindleMicroQuoteInput.value,
      theme: kindleThemeSelect.value,
      themeCustom: kindleThemeCustom.value,
      palette: kindlePaletteSelect.value,
      paletteCustom: kindlePaletteCustom.value,
      background: kindleBackgroundSelect.value,
      layout: kindleLayoutSelect.value,
      heat: kindleHeatSelect.value,
      extra: kindleExtraInput.value
    };
  }

  // Character listeners
  archetypeSelect.addEventListener("change", () => {
    populateBuilderOptions(archetypeSelect.value);
  });

  randomArchetypeBtn.addEventListener("click", () => {
    randomizeSelect(archetypeSelect);
    populateBuilderOptions(archetypeSelect.value);
    randomizeSelect(complexionSelect);
    randomizeSelect(bodyTypeSelect);
    randomizeSelect(faceShapeSelect);
    randomizeSelect(hairSelect);
    randomizeSelect(outfitSelect);
    randomizeSelect(expressionSelect);
    randomizeSelect(microSelect);
    randomizeSelect(attitudeSelect);
    randomizeSelect(poseSelect);
    randomizeSelect(propSelect);
    randomizeSelect(sceneSelect);
    randomizeSelect(paletteSelect);
  });

  randomizeAllBtn.addEventListener("click", randomizeAll);
  resetBtn.addEventListener("click", resetBuilder);
  clearBtn.addEventListener("click", clearAll);

  generateBtn.addEventListener("click", () => {
  runCharacterStudio();
});

  generate5Btn.addEventListener("click", () => {
  const archetype = archetypeSelect.value || ARCHETYPES[0];
  const variants = [];

  for (let i = 0; i < 5; i++) {
    populateBuilderOptions(archetype);

    const options = {
      complexion: complexionCustom.value.trim() || randomFrom(COMPLEXIONS),
      bodyType: bodyTypeCustom.value.trim() || randomFrom(BODY_TYPES),
      faceShape: faceShapeCustom.value.trim() || randomFrom(FACE_SHAPES),
      hair: hairCustom.value.trim() || randomFrom(HAIR),
      outfit: outfitCustom.value.trim() || randomFrom(OUTFITS),
      expression: expressionCustom.value.trim() || expressionSelect.value || randomFrom(EXPRESSIONS),
      micro: microCustom.value.trim() || microSelect.value || randomFrom(MICRO_EXPRESSIONS),
      attitude: attitudeCustom.value.trim() || attitudeSelect.value || randomFrom(ATTITUDES),
      pose: poseCustom.value.trim() || poseSelect.value || randomFrom(POSES),
      prop: propCustom.value.trim() || propSelect.value || randomFrom(PROPS),
      scene: sceneCustom.value.trim() || sceneSelect.value || randomFrom(SCENES),
      palette: paletteCustom.value.trim() || paletteSelect.value || randomFrom(PALETTES),

      complexionCustom: complexionCustom.value,
      bodyTypeCustom: bodyTypeCustom.value,
      faceShapeCustom: faceShapeCustom.value,
      hairCustom: hairCustom.value,
      outfitCustom: outfitCustom.value,
      expressionCustom: expressionCustom.value,
      microCustom: microCustom.value,
      attitudeCustom: attitudeCustom.value,
      poseCustom: poseCustom.value,
      propCustom: propCustom.value,
      sceneCustom: sceneCustom.value,
      paletteCustom: paletteCustom.value
    };

    variants.push(`VARIATION ${i + 1}\n\n${buildCharacterPrompt(archetype, options)}`);
  }

  output.value = variants.join("\n\n====================\n\n");
});

  // Shared listeners
  studioMode.addEventListener("change", updateStudioMode);
  stickerSubMode.addEventListener("change", updateStickerSubMode);

  clearOutputBtn.addEventListener("click", () => {
    output.value = "";
  });

  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(output.value);
      copyBtn.textContent = "Copied ✓";
      setTimeout(() => {
        copyBtn.textContent = "Copy Prompt";
      }, 1200);
    } catch (err) {
      output.focus();
      output.select();
      document.execCommand("copy");
    }
  });

  // Sticker listeners
  randomStickerBtn.addEventListener("click", randomSticker);
  resetStickerBtn.addEventListener("click", resetSticker);
  clearStickerBtn.addEventListener("click", clearSticker);

  generateStickerBtn.addEventListener("click", () => {
    output.value = buildStickerPrompt(getStickerOptions());
  });

  generate5StickerBtn.addEventListener("click", () => {
  const rows = [];

  for (let i = 0; i < 5; i++) {
    const randomProduct = randomFrom(STICKER_PRODUCTS);
    const options = {
      product: randomProduct.value,
      productSubject: randomProduct.subject,
      productCustom: stickerProductCustom.value,
      quote: stickerQuoteInput.value.trim() || randomFrom(getActiveStickerQuotes()),
      microQuote: stickerMicroQuoteInput.value.trim() || randomFrom(STICKER_MICRO_QUOTES),
      vibe: stickerVibeCustom.value.trim() || randomFrom(STICKER_VIBES),
      vibeCustom: stickerVibeCustom.value,
      palette: stickerPaletteCustom.value.trim() || randomFrom(PALETTES),
      paletteCustom: stickerPaletteCustom.value,
      background: randomFrom(STICKER_BACKGROUNDS),
      border: randomFrom(STICKER_BORDERS),
      outline: randomFrom(STICKER_OUTLINES),
      spice: randomFrom(STICKER_SPICE),
      paletteLock: randomProduct.paletteLock || ""
    };

    rows.push(`STICKER ${i + 1}\n\n${buildStickerPrompt(options)}`);
  }

  output.value = rows.join("\n\n====================\n\n");
});

  // Kindle listeners
  randomKindleBtn.addEventListener("click", randomKindle);
  resetKindleBtn.addEventListener("click", resetKindle);
  clearKindleBtn.addEventListener("click", clearKindle);

  generateKindleBtn.addEventListener("click", () => {
    output.value = buildKindleInsertPrompt(getKindleOptions());
  });

  generate5KindleBtn.addEventListener("click", () => {
  const rows = [];

  for (let i = 0; i < 5; i++) {
    const options = {
      quote: kindleQuoteInput.value.trim() || randomFrom(KINDLE_QUOTES),
      microQuote: kindleMicroQuoteInput.value.trim() || randomFrom(KINDLE_MICRO_QUOTES),
      theme: kindleThemeCustom.value.trim() || randomFrom(KINDLE_THEMES),
      themeCustom: kindleThemeCustom.value,
      palette: kindlePaletteCustom.value.trim() || randomFrom(PALETTES),
      paletteCustom: kindlePaletteCustom.value,
      background: randomFrom(KINDLE_BACKGROUNDS),
      layout: randomFrom(KINDLE_LAYOUTS),
      heat: randomFrom(KINDLE_HEAT),
      extra: kindleExtraInput.value.trim()
    };

    rows.push(`KINDLE INSERT ${i + 1}\n\n${buildKindleInsertPrompt(options)}`);
  }

  output.value = rows.join("\n\n====================\n\n");
});

  // Init
  populateArchetypeOptions();
  resetBuilder();
  populateStickerControls();
  resetSticker();
  populateKindleControls();
  resetKindle();
  updateStickerSubMode();
  updateStudioMode();
});
