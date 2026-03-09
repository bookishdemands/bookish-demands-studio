import { ARCHETYPES } from "./core/archetypes.js";
import { ARCHETYPE_DNA } from "./character/archetypeDNA.js";
import { HAIR } from "./character/hair.js";
import { EXTRAS } from "./character/extras.js";
import { HAIR_COLORS } from "./character/hairColors.js";
import { MAKEUP } from "./character/makeup.js";
import { LIGHTING } from "./character/lighting.js";
import { NAIL_SHAPES } from "./character/nailShapes.js";
import { NAIL_DESIGNS } from "./character/nailDesigns.js";
import { ACCESSORIES } from "./character/accessories.js";
import { BACKGROUNDS } from "./character/backgrounds.js";
import { COMPOSITIONS } from "./character/compositions.js";
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
import { STICKER_MICRO_QUOTES } from "./sticker/microQuotes.js";
import { STICKER_QUOTE_BANKS } from "./sticker/quoteBanks.js";
import { buildStickerPrompt } from "./sticker/stickerPromptBuilder.js";
import { buildKindleInsertPrompt } from "./sticker/kindleInsertPromptBuilder.js";
import { KINDLE_QUOTES } from "./sticker/kindleQuotes.js";
import { KINDLE_MICRO_QUOTES } from "./sticker/kindleMicroQuotes.js";

import { runReaderverseMode } from "./readerverse/modeEngine.js";
import { loadPresets, savePreset, deletePreset, savePresetsMap } from "./storage/presets.js";
import { loadDropLibrary, saveDrop, deleteDrop, saveDropLibraryMap } from "./storage/dropLibrary.js";
import { downloadText, buildCSV } from "./utils/exporters.js";

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
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

let STICKER_QUOTE_BAG = [];
let STICKER_MICRO_BAG = [];
let KINDLE_QUOTE_BAG = [];
let KINDLE_MICRO_BAG = [];

function pullFromBag(source = [], bagRefName = "") {
  if (!Array.isArray(source) || !source.length) return "";

  if (!window.__BD_BAGS__) window.__BD_BAGS__ = {};

  if (!Array.isArray(window.__BD_BAGS__[bagRefName]) || !window.__BD_BAGS__[bagRefName].length) {
    window.__BD_BAGS__[bagRefName] = [...source];

    for (let i = window.__BD_BAGS__[bagRefName].length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [window.__BD_BAGS__[bagRefName][i], window.__BD_BAGS__[bagRefName][j]] = [window.__BD_BAGS__[bagRefName][j], window.__BD_BAGS__[bagRefName][i]];
    }
  }

  return window.__BD_BAGS__[bagRefName].pop() || "";
}

document.addEventListener("DOMContentLoaded", () => {
  // Shared
  const studioMode = document.getElementById("studioMode");
  const characterControls = document.getElementById("characterControls");
  const stickerControls = document.getElementById("stickerControls");
  const output = document.getElementById("output");
  const copyBtn = document.getElementById("copyBtn");
  const clearOutputBtn = document.getElementById("clearOutputBtn");

  const exportTxtBtn = document.getElementById("exportTxtBtn");
  const exportCsvBtn = document.getElementById("exportCsvBtn");
  const exportDropJsonBtn = document.getElementById("exportDropJsonBtn");

  const presetNameInput = document.getElementById("presetNameInput");
  const presetSelect = document.getElementById("presetSelect");
  const savePresetBtn = document.getElementById("savePresetBtn");
  const loadPresetBtn = document.getElementById("loadPresetBtn");
  const deletePresetBtn = document.getElementById("deletePresetBtn");
  const exportPresetsBtn = document.getElementById("exportPresetsBtn");
  const importPresetsBtn = document.getElementById("importPresetsBtn");
  const importPresetsFile = document.getElementById("importPresetsFile");

  const dropLibrarySelect = document.getElementById("dropLibrarySelect");
  const saveDropBtn = document.getElementById("saveDropBtn");
  const loadDropBtn = document.getElementById("loadDropBtn");
  const deleteDropBtn = document.getElementById("deleteDropBtn");
  const exportDropLibraryBtn = document.getElementById("exportDropLibraryBtn");
  const importDropLibraryBtn = document.getElementById("importDropLibraryBtn");
  const importDropLibraryFile = document.getElementById("importDropLibraryFile");

  // Readerverse controls
  const readerverseMode = document.getElementById("readerverseMode");
  const matchStrength = document.getElementById("matchStrength");
  const quoteInput = document.getElementById("quoteInput");
  const dropTheme = document.getElementById("dropTheme");
  const dropName = document.getElementById("dropName");
  const carouselTitleStyle = document.getElementById("carouselTitleStyle");
  const contentMode = document.getElementById("contentMode");

  // Character controls
  const archetypeSelect = document.getElementById("archetypeSelect");
  const complexionSelect = document.getElementById("complexionSelect");
  const bodyTypeSelect = document.getElementById("bodyTypeSelect");
  const faceShapeSelect = document.getElementById("faceShapeSelect");
  const extrasSelect = document.getElementById("extrasSelect");
  const hairColorSelect = document.getElementById("hairColorSelect");
  const hairSelect = document.getElementById("hairSelect");
  const makeupSelect = document.getElementById("makeupSelect");
  const lightingSelect = document.getElementById("lightingSelect");
  const nailShapeSelect = document.getElementById("nailShapeSelect");
  const nailDesignSelect = document.getElementById("nailDesignSelect");
  const outfitSelect = document.getElementById("outfitSelect");
  const accessoriesSelect = document.getElementById("accessoriesSelect");
  const expressionSelect = document.getElementById("expressionSelect");
  const microSelect = document.getElementById("microSelect");
  const attitudeSelect = document.getElementById("attitudeSelect");
  const poseSelect = document.getElementById("poseSelect");
  const propSelect = document.getElementById("propSelect");
  const sceneSelect = document.getElementById("sceneSelect");
  const backgroundSelect = document.getElementById("backgroundSelect");
  const paletteSelect = document.getElementById("paletteSelect");
  const compositionSelect = document.getElementById("compositionSelect");

  const complexionCustom = document.getElementById("complexionCustom");
  const bodyTypeCustom = document.getElementById("bodyTypeCustom");
  const faceShapeCustom = document.getElementById("faceShapeCustom");
  const extrasCustom = document.getElementById("extrasCustom");
  const hairColorCustom = document.getElementById("hairColorCustom");
  const hairCustom = document.getElementById("hairCustom");
  const makeupCustom = document.getElementById("makeupCustom");
  const lightingCustom = document.getElementById("lightingCustom");
  const nailShapeCustom = document.getElementById("nailShapeCustom");
  const nailDesignCustom = document.getElementById("nailDesignCustom");
  const outfitCustom = document.getElementById("outfitCustom");
  const accessoriesCustom = document.getElementById("accessoriesCustom");
  const expressionCustom = document.getElementById("expressionCustom");
  const microCustom = document.getElementById("microCustom");
  const attitudeCustom = document.getElementById("attitudeCustom");
  const poseCustom = document.getElementById("poseCustom");
  const propCustom = document.getElementById("propCustom");
  const sceneCustom = document.getElementById("sceneCustom");
  const backgroundCustom = document.getElementById("backgroundCustom");
  const paletteCustom = document.getElementById("paletteCustom");
  const compositionCustom = document.getElementById("compositionCustom");

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

  let PRESETS = loadPresets();
  let DROP_LIBRARY = loadDropLibrary();
  let LAST_ROWS = [];
  let LAST_DROP = null;

  function refreshPresetSelect() {
    if (!presetSelect) return;

    presetSelect.innerHTML = "";

    const blank = document.createElement("option");
    blank.value = "";
    blank.textContent = "— Select Preset —";
    presetSelect.appendChild(blank);

    Object.keys(PRESETS)
      .sort((a, b) => a.localeCompare(b))
      .forEach((name) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        presetSelect.appendChild(option);
      });
  }

  function refreshDropLibrarySelect() {
    if (!dropLibrarySelect) return;

    dropLibrarySelect.innerHTML = "";

    const blank = document.createElement("option");
    blank.value = "";
    blank.textContent = "— Select Drop —";
    dropLibrarySelect.appendChild(blank);

    Object.keys(DROP_LIBRARY)
      .sort((a, b) => {
        const dateA = DROP_LIBRARY[a]?.createdAt || "";
        const dateB = DROP_LIBRARY[b]?.createdAt || "";
        return dateB.localeCompare(dateA);
      })
      .forEach((id) => {
        const drop = DROP_LIBRARY[id];
        const option = document.createElement("option");
        option.value = id;
        option.textContent = `${drop.dropName || "Unnamed Drop"} • ${drop.dropTheme || "No Theme"} • ${drop.rows?.length || 0} items`;
        dropLibrarySelect.appendChild(option);
      });
  }

  function setLastReaderverseResult(result) {
    LAST_ROWS = result?.rows || [];
    LAST_DROP = result?.drop || null;
  }

  function randomizeSelect(selectEl) {
    if (!selectEl) return;
    const validOptions = Array.from(selectEl.options).filter((option) => option.value !== "");
    if (!validOptions.length) return;
    const random = validOptions[Math.floor(Math.random() * validOptions.length)];
    selectEl.value = random.value;
  }

  function updateStudioMode() {
    if (studioMode?.value === "character") {
      characterControls?.classList.remove("hidden");
      stickerControls?.classList.add("hidden");
    } else {
      characterControls?.classList.add("hidden");
      stickerControls?.classList.remove("hidden");
    }
  }

  function updateStickerSubMode() {
    if (stickerSubMode?.value === "sticker") {
      stickerModeControls?.classList.remove("hidden");
      kindleModeControls?.classList.add("hidden");
    } else {
      stickerModeControls?.classList.add("hidden");
      kindleModeControls?.classList.remove("hidden");
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
    fillSelect(extrasSelect, EXTRAS);
    fillSelect(hairColorSelect, HAIR_COLORS);
    fillSelect(hairSelect, HAIR);
    fillSelect(makeupSelect, MAKEUP);
    fillSelect(lightingSelect, LIGHTING);
    fillSelect(nailShapeSelect, NAIL_SHAPES);
    fillSelect(nailDesignSelect, NAIL_DESIGNS);
    fillSelect(outfitSelect, OUTFITS);
    fillSelect(accessoriesSelect, ACCESSORIES);
    fillSelect(expressionSelect, Array.isArray(dna.expression) && dna.expression.length ? dna.expression : EXPRESSIONS);
    fillSelect(microSelect, Array.isArray(dna.micro) && dna.micro.length ? dna.micro : MICRO_EXPRESSIONS);
    fillSelect(attitudeSelect, Array.isArray(dna.attitude) && dna.attitude.length ? dna.attitude : ATTITUDES);
    fillSelect(poseSelect, Array.isArray(dna.pose) && dna.pose.length ? dna.pose : POSES);
    fillSelect(propSelect, Array.isArray(dna.prop) && dna.prop.length ? dna.prop : PROPS);
    fillSelect(sceneSelect, Array.isArray(dna.scene) && dna.scene.length ? dna.scene : SCENES);
    fillSelect(backgroundSelect, BACKGROUNDS);
    fillSelect(paletteSelect, Array.isArray(dna.palette) && dna.palette.length ? dna.palette : PALETTES);
    fillSelect(compositionSelect, COMPOSITIONS);

    if (Array.isArray(dna.expression) && dna.expression.length) expressionSelect.value = dna.expression[0];
    if (Array.isArray(dna.micro) && dna.micro.length) microSelect.value = dna.micro[0];
    if (Array.isArray(dna.attitude) && dna.attitude.length) attitudeSelect.value = dna.attitude[0];
    if (Array.isArray(dna.pose) && dna.pose.length) poseSelect.value = dna.pose[0];
    if (Array.isArray(dna.prop) && dna.prop.length) propSelect.value = dna.prop[0];
    if (Array.isArray(dna.scene) && dna.scene.length) sceneSelect.value = dna.scene[0];
    if (Array.isArray(dna.palette) && dna.palette.length) paletteSelect.value = dna.palette[0];
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
      complexionCustom,
      bodyTypeCustom,
      faceShapeCustom,
      extrasCustom,
      hairColorCustom,
      hairCustom,
      makeupCustom,
      lightingCustom,
      nailShapeCustom,
      nailDesignCustom,
      outfitCustom,
      accessoriesCustom,
      expressionCustom,
      microCustom,
      attitudeCustom,
      poseCustom,
      propCustom,
      sceneCustom,
      backgroundCustom,
      paletteCustom,
      compositionCustom
    ].forEach((input) => {
      if (input) input.value = "";
    });
  }

  function getReaderverseMode() {
    return readerverseMode ? readerverseMode.value : "single";
  }

  function getReaderverseSelections() {
    return {
      mode: getReaderverseMode(),
      matchStrength: matchStrength ? matchStrength.value : "balanced",
      contentMode: contentMode ? contentMode.checked : false,
      carouselTitleStyle: carouselTitleStyle ? carouselTitleStyle.value : "none",
      dropTheme: dropTheme ? dropTheme.value : "",
      dropName: dropName ? dropName.value.trim() : "",
      quote: quoteInput ? quoteInput.value.trim() : "",

      archetype: archetypeSelect?.value || "",
      complexion: complexionSelect?.value || "",
      bodyType: bodyTypeSelect?.value || "",
      faceShape: faceShapeSelect?.value || "",
      extras: extrasSelect?.value || "",
      hairColor: hairColorSelect?.value || "",
      hair: hairSelect?.value || "",
      makeup: makeupSelect?.value || "",
      lighting: lightingSelect?.value || "",
      nailShape: nailShapeSelect?.value || "",
      nailDesign: nailDesignSelect?.value || "",
      outfit: outfitSelect?.value || "",
      accessories: accessoriesSelect?.value || "",
      expression: expressionSelect?.value || "",
      micro: microSelect?.value || "",
      attitude: attitudeSelect?.value || "",
      pose: poseSelect?.value || "",
      prop: propSelect?.value || "",
      scene: sceneSelect?.value || "",
      background: backgroundSelect?.value || "",
      palette: paletteSelect?.value || "",
      composition: compositionSelect?.value || "",

      complexionCustom: complexionCustom?.value || "",
      bodyTypeCustom: bodyTypeCustom?.value || "",
      faceShapeCustom: faceShapeCustom?.value || "",
      extrasCustom: extrasCustom?.value || "",
      hairColorCustom: hairColorCustom?.value || "",
      hairCustom: hairCustom?.value || "",
      makeupCustom: makeupCustom?.value || "",
      lightingCustom: lightingCustom?.value || "",
      nailShapeCustom: nailShapeCustom?.value || "",
      nailDesignCustom: nailDesignCustom?.value || "",
      outfitCustom: outfitCustom?.value || "",
      accessoriesCustom: accessoriesCustom?.value || "",
      expressionCustom: expressionCustom?.value || "",
      microCustom: microCustom?.value || "",
      attitudeCustom: attitudeCustom?.value || "",
      poseCustom: poseCustom?.value || "",
      propCustom: propCustom?.value || "",
      sceneCustom: sceneCustom?.value || "",
      backgroundCustom: backgroundCustom?.value || "",
      paletteCustom: paletteCustom?.value || "",
      compositionCustom: compositionCustom?.value || ""
    };
  }

  function randomizeCharacterOptions(baseSelections = {}) {
    return {
      ...baseSelections,
      complexion: baseSelections.complexionCustom?.trim() || randomFrom(COMPLEXIONS),
      bodyType: baseSelections.bodyTypeCustom?.trim() || randomFrom(BODY_TYPES),
      faceShape: baseSelections.faceShapeCustom?.trim() || randomFrom(FACE_SHAPES),
      extras: baseSelections.extrasCustom?.trim() || randomFrom(EXTRAS),
      hairColor: baseSelections.hairColorCustom?.trim() || randomFrom(HAIR_COLORS),
      hair: baseSelections.hairCustom?.trim() || randomFrom(HAIR),
      makeup: baseSelections.makeupCustom?.trim() || randomFrom(MAKEUP),
      lighting: baseSelections.lightingCustom?.trim() || randomFrom(LIGHTING),
      nailShape: baseSelections.nailShapeCustom?.trim() || randomFrom(NAIL_SHAPES),
      nailDesign: baseSelections.nailDesignCustom?.trim() || randomFrom(NAIL_DESIGNS),
      outfit: baseSelections.outfitCustom?.trim() || randomFrom(OUTFITS),
      accessories: baseSelections.accessoriesCustom?.trim() || randomFrom(ACCESSORIES),
      expression: baseSelections.expressionCustom?.trim() || randomFrom(EXPRESSIONS),
      micro: baseSelections.microCustom?.trim() || randomFrom(MICRO_EXPRESSIONS),
      attitude: baseSelections.attitudeCustom?.trim() || randomFrom(ATTITUDES),
      pose: baseSelections.poseCustom?.trim() || randomFrom(POSES),
      prop: baseSelections.propCustom?.trim() || randomFrom(PROPS),
      scene: baseSelections.sceneCustom?.trim() || randomFrom(SCENES),
      background: baseSelections.backgroundCustom?.trim() || randomFrom(BACKGROUNDS),
      palette: baseSelections.paletteCustom?.trim() || randomFrom(PALETTES),
      composition: baseSelections.compositionCustom?.trim() || randomFrom(COMPOSITIONS)
    };
  }

  function getCharacterOptions() {
    return {
      complexion: complexionSelect?.value || "",
      bodyType: bodyTypeSelect?.value || "",
      faceShape: faceShapeSelect?.value || "",
      extras: extrasSelect?.value || "",
      hairColor: hairColorSelect?.value || "",
      hair: hairSelect?.value || "",
      makeup: makeupSelect?.value || "",
      lighting: lightingSelect?.value || "",
      nailShape: nailShapeSelect?.value || "",
      nailDesign: nailDesignSelect?.value || "",
      outfit: outfitSelect?.value || "",
      accessories: accessoriesSelect?.value || "",
      expression: expressionSelect?.value || "",
      micro: microSelect?.value || "",
      attitude: attitudeSelect?.value || "",
      pose: poseSelect?.value || "",
      prop: propSelect?.value || "",
      scene: sceneSelect?.value || "",
      background: backgroundSelect?.value || "",
      palette: paletteSelect?.value || "",
      composition: compositionSelect?.value || "",

      complexionCustom: complexionCustom?.value || "",
      bodyTypeCustom: bodyTypeCustom?.value || "",
      faceShapeCustom: faceShapeCustom?.value || "",
      extrasCustom: extrasCustom?.value || "",
      hairColorCustom: hairColorCustom?.value || "",
      hairCustom: hairCustom?.value || "",
      makeupCustom: makeupCustom?.value || "",
      lightingCustom: lightingCustom?.value || "",
      nailShapeCustom: nailShapeCustom?.value || "",
      nailDesignCustom: nailDesignCustom?.value || "",
      outfitCustom: outfitCustom?.value || "",
      accessoriesCustom: accessoriesCustom?.value || "",
      expressionCustom: expressionCustom?.value || "",
      microCustom: microCustom?.value || "",
      attitudeCustom: attitudeCustom?.value || "",
      poseCustom: poseCustom?.value || "",
      propCustom: propCustom?.value || "",
      sceneCustom: sceneCustom?.value || "",
      backgroundCustom: backgroundCustom?.value || "",
      paletteCustom: paletteCustom?.value || "",
      compositionCustom: compositionCustom?.value || "",

      customCategory: "",
      customAddons: "",
      customCategories: "",
      negativePrompt: ""
    };
  }

  function applyCharacterSelections(sel = {}) {
    if (sel.archetype !== undefined && archetypeSelect) {
      populateBuilderOptions(sel.archetype || ARCHETYPES[0] || "");
      archetypeSelect.value = sel.archetype || "";
    }

    if (complexionSelect) complexionSelect.value = sel.complexion || "";
    if (bodyTypeSelect) bodyTypeSelect.value = sel.bodyType || "";
    if (faceShapeSelect) faceShapeSelect.value = sel.faceShape || "";
    if (extrasSelect) extrasSelect.value = sel.extras || "";
    if (hairColorSelect) hairColorSelect.value = sel.hairColor || "";
    if (hairSelect) hairSelect.value = sel.hair || "";
    if (makeupSelect) makeupSelect.value = sel.makeup || "";
    if (lightingSelect) lightingSelect.value = sel.lighting || "";
    if (nailShapeSelect) nailShapeSelect.value = sel.nailShape || "";
    if (nailDesignSelect) nailDesignSelect.value = sel.nailDesign || "";
    if (outfitSelect) outfitSelect.value = sel.outfit || "";
    if (accessoriesSelect) accessoriesSelect.value = sel.accessories || "";
    if (expressionSelect) expressionSelect.value = sel.expression || "";
    if (microSelect) microSelect.value = sel.micro || "";
    if (attitudeSelect) attitudeSelect.value = sel.attitude || "";
    if (poseSelect) poseSelect.value = sel.pose || "";
    if (propSelect) propSelect.value = sel.prop || "";
    if (sceneSelect) sceneSelect.value = sel.scene || "";
    if (backgroundSelect) backgroundSelect.value = sel.background || "";
    if (paletteSelect) paletteSelect.value = sel.palette || "";
    if (compositionSelect) compositionSelect.value = sel.composition || "";

    if (complexionCustom) complexionCustom.value = sel.complexionCustom || "";
    if (bodyTypeCustom) bodyTypeCustom.value = sel.bodyTypeCustom || "";
    if (faceShapeCustom) faceShapeCustom.value = sel.faceShapeCustom || "";
    if (extrasCustom) extrasCustom.value = sel.extrasCustom || "";
    if (hairColorCustom) hairColorCustom.value = sel.hairColorCustom || "";
    if (hairCustom) hairCustom.value = sel.hairCustom || "";
    if (makeupCustom) makeupCustom.value = sel.makeupCustom || "";
    if (lightingCustom) lightingCustom.value = sel.lightingCustom || "";
    if (nailShapeCustom) nailShapeCustom.value = sel.nailShapeCustom || "";
    if (nailDesignCustom) nailDesignCustom.value = sel.nailDesignCustom || "";
    if (outfitCustom) outfitCustom.value = sel.outfitCustom || "";
    if (accessoriesCustom) accessoriesCustom.value = sel.accessoriesCustom || "";
    if (expressionCustom) expressionCustom.value = sel.expressionCustom || "";
    if (microCustom) microCustom.value = sel.microCustom || "";
    if (attitudeCustom) attitudeCustom.value = sel.attitudeCustom || "";
    if (poseCustom) poseCustom.value = sel.poseCustom || "";
    if (propCustom) propCustom.value = sel.propCustom || "";
    if (sceneCustom) sceneCustom.value = sel.sceneCustom || "";
    if (backgroundCustom) backgroundCustom.value = sel.backgroundCustom || "";
    if (paletteCustom) paletteCustom.value = sel.paletteCustom || "";
    if (compositionCustom) compositionCustom.value = sel.compositionCustom || "";

    if (readerverseMode) readerverseMode.value = sel.mode || "single";
    if (matchStrength) matchStrength.value = sel.matchStrength || "balanced";
    if (quoteInput) quoteInput.value = sel.quote || "";
    if (dropTheme) dropTheme.value = sel.dropTheme || "";
    if (dropName) dropName.value = sel.dropName || "";
    if (carouselTitleStyle) carouselTitleStyle.value = sel.carouselTitleStyle || "none";
    if (contentMode) contentMode.checked = !!sel.contentMode;
  }

  function runCharacterStudio() {
    if (!readerverseMode) {
      const prompt = buildCharacterPrompt(archetypeSelect?.value || "", getCharacterOptions());
      output.value = prompt;
      LAST_ROWS = [
        {
          label: "Single",
          dropName: "",
          dropTheme: "",
          quoteReference: "",
          prompt,
          caption: "",
          hook: "",
          hashtags: "",
          slideText: ""
        }
      ];
      LAST_DROP = null;
      return;
    }

    const selections = getReaderverseSelections();

    const result = runReaderverseMode({
      mode: selections.mode,
      selections,
      buildCharacterPrompt,
      archetypes: ARCHETYPES,
      randomizeCharacterOptions,
      applyQuoteMatch:
        selections.mode === "match" ||
        selections.mode === "pack10" ||
        selections.mode === "pack30" ||
        selections.mode === "dropbuilder"
    });

    output.value = result.outputText || "";
    setLastReaderverseResult(result);
  }

  function resetBuilder() {
    archetypeSelect.value = ARCHETYPES[0] || "";
    populateBuilderOptions(archetypeSelect.value);
    complexionSelect.value = COMPLEXIONS[0] || "";
    bodyTypeSelect.value = BODY_TYPES[0] || "";
    faceShapeSelect.value = FACE_SHAPES[0] || "";
    clearCharacterCustomInputs();
    if (readerverseMode) readerverseMode.value = "single";
    if (matchStrength) matchStrength.value = "balanced";
    if (quoteInput) quoteInput.value = "";
    if (dropTheme) dropTheme.value = "";
    if (dropName) dropName.value = "";
    if (carouselTitleStyle) carouselTitleStyle.value = "none";
    if (contentMode) contentMode.checked = true;
    output.value = "";
  }

  function clearAll() {
    [
      archetypeSelect,
      complexionSelect,
      bodyTypeSelect,
      faceShapeSelect,
      extrasSelect,
      hairColorSelect,
      hairSelect,
      makeupSelect,
      lightingSelect,
      nailShapeSelect,
      nailDesignSelect,
      outfitSelect,
      accessoriesSelect,
      expressionSelect,
      microSelect,
      attitudeSelect,
      poseSelect,
      propSelect,
      sceneSelect,
      backgroundSelect,
      paletteSelect,
      compositionSelect
    ].forEach((selectEl) => {
      if (selectEl) selectEl.value = "";
    });

    clearCharacterCustomInputs();

    if (readerverseMode) readerverseMode.value = "single";
    if (matchStrength) matchStrength.value = "balanced";
    if (quoteInput) quoteInput.value = "";
    if (dropTheme) dropTheme.value = "";
    if (dropName) dropName.value = "";
    if (carouselTitleStyle) carouselTitleStyle.value = "none";
    if (contentMode) contentMode.checked = true;

    output.value = "";
  }

  function randomizeAll() {
    randomizeSelect(archetypeSelect);
    populateBuilderOptions(archetypeSelect.value);

    [
      complexionSelect,
      bodyTypeSelect,
      faceShapeSelect,
      extrasSelect,
      hairColorSelect,
      hairSelect,
      makeupSelect,
      lightingSelect,
      nailShapeSelect,
      nailDesignSelect,
      outfitSelect,
      accessoriesSelect,
      expressionSelect,
      microSelect,
      attitudeSelect,
      poseSelect,
      propSelect,
      sceneSelect,
      backgroundSelect,
      paletteSelect,
      compositionSelect
    ].forEach(randomizeSelect);
  }

  function clearStickerCustomInputs() {
    if (stickerProductCustom) stickerProductCustom.value = "";
    if (stickerVibeCustom) stickerVibeCustom.value = "";
    if (stickerPaletteCustom) stickerPaletteCustom.value = "";
    if (stickerQuoteInput) stickerQuoteInput.value = "";
    if (stickerMicroQuoteInput) stickerMicroQuoteInput.value = "";
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
    if (stickerProductSelect) stickerProductSelect.value = STICKER_PRODUCTS[0]?.value || "";
    if (stickerVibeSelect) stickerVibeSelect.value = STICKER_VIBES[0] || "";
    if (stickerPaletteSelect) stickerPaletteSelect.value = PALETTES[0] || "";
    if (stickerBackgroundSelect) stickerBackgroundSelect.value = STICKER_BACKGROUNDS[0] || "";
    if (stickerBorderSelect) stickerBorderSelect.value = STICKER_BORDERS[0] || "";
    if (stickerOutlineSelect) stickerOutlineSelect.value = STICKER_OUTLINES[0] || "";
    if (stickerSpiceSelect) stickerSpiceSelect.value = STICKER_SPICE[1] || "";
    if (stickerQuoteBankSelect) stickerQuoteBankSelect.value = "general";
    clearStickerCustomInputs();
    if (stickerQuoteInput) stickerQuoteInput.value = STICKER_QUOTE_BANKS.general[0] || "";
    if (stickerMicroQuoteInput) stickerMicroQuoteInput.value = STICKER_MICRO_QUOTES[0] || "";
  }

  function clearSticker() {
    [stickerProductSelect, stickerVibeSelect, stickerPaletteSelect, stickerBackgroundSelect, stickerBorderSelect, stickerOutlineSelect, stickerSpiceSelect].forEach((selectEl) => {
      if (selectEl) selectEl.value = "";
    });
    if (stickerQuoteBankSelect) stickerQuoteBankSelect.value = "general";
    clearStickerCustomInputs();
  }

  function randomSticker() {
  [stickerProductSelect, stickerVibeSelect, stickerPaletteSelect, stickerBackgroundSelect, stickerBorderSelect, stickerOutlineSelect, stickerSpiceSelect].forEach(randomizeSelect);

  const activeQuotes = getActiveStickerQuotes();
  const useQuote = Math.random() < 0.5;

  if (useQuote) {
    if (stickerQuoteInput) {
      stickerQuoteInput.value = pullFromBag(activeQuotes, `sticker-main-${stickerQuoteBankSelect?.value || "general"}`);
    }
    if (stickerMicroQuoteInput) {
      stickerMicroQuoteInput.value = "";
    }
  } else {
    if (stickerMicroQuoteInput) {
      stickerMicroQuoteInput.value = pullFromBag(STICKER_MICRO_QUOTES, "sticker-micro");
    }
    if (stickerQuoteInput) {
      stickerQuoteInput.value = "";
    }
  }
}

  function getStickerOptions() {
    const productObj = getStickerProductObject(stickerProductSelect?.value || "");
    return {
      product: stickerProductSelect?.value || "",
      productSubject: productObj?.subject || "",
      productCustom: stickerProductCustom?.value || "",
      quote: stickerQuoteInput?.value || "",
      microQuote: stickerMicroQuoteInput?.value || "",
      vibe: stickerVibeSelect?.value || "",
      vibeCustom: stickerVibeCustom?.value || "",
      palette: stickerPaletteSelect?.value || "",
      paletteCustom: stickerPaletteCustom?.value || "",
      background: stickerBackgroundSelect?.value || "",
      border: stickerBorderSelect?.value || "",
      outline: stickerOutlineSelect?.value || "",
      spice: stickerSpiceSelect?.value || "",
      paletteLock: productObj?.paletteLock || ""
    };
  }

  function clearKindleInputs() {
    if (kindleQuoteInput) kindleQuoteInput.value = "";
    if (kindleMicroQuoteInput) kindleMicroQuoteInput.value = "";
    if (kindleThemeCustom) kindleThemeCustom.value = "";
    if (kindlePaletteCustom) kindlePaletteCustom.value = "";
    if (kindleExtraInput) kindleExtraInput.value = "";
  }

  function resetKindle() {
    populateKindleControls();
    if (kindleThemeSelect) kindleThemeSelect.value = KINDLE_THEMES[0] || "";
    if (kindlePaletteSelect) kindlePaletteSelect.value = PALETTES[0] || "";
    if (kindleBackgroundSelect) kindleBackgroundSelect.value = KINDLE_BACKGROUNDS[0] || "";
    if (kindleLayoutSelect) kindleLayoutSelect.value = KINDLE_LAYOUTS[0] || "";
    if (kindleHeatSelect) kindleHeatSelect.value = KINDLE_HEAT[1] || "";
    clearKindleInputs();
    if (kindleQuoteInput) kindleQuoteInput.value = KINDLE_QUOTES[0] || "";
    if (kindleMicroQuoteInput) kindleMicroQuoteInput.value = KINDLE_MICRO_QUOTES[0] || "";
  }

  function clearKindle() {
    [kindleThemeSelect, kindlePaletteSelect, kindleBackgroundSelect, kindleLayoutSelect, kindleHeatSelect].forEach((selectEl) => {
      if (selectEl) selectEl.value = "";
    });
    clearKindleInputs();
  }

  function randomKindle() {
  [kindleThemeSelect, kindlePaletteSelect, kindleBackgroundSelect, kindleLayoutSelect, kindleHeatSelect].forEach(randomizeSelect);

  const useQuote = Math.random() < 0.5;

  if (useQuote) {
    if (kindleQuoteInput) {
      kindleQuoteInput.value = pullFromBag(KINDLE_QUOTES, "kindle-main");
    }
    if (kindleMicroQuoteInput) {
      kindleMicroQuoteInput.value = "";
    }
  } else {
    if (kindleMicroQuoteInput) {
      kindleMicroQuoteInput.value = pullFromBag(KINDLE_MICRO_QUOTES, "kindle-micro");
    }
    if (kindleQuoteInput) {
      kindleQuoteInput.value = "";
    }
  }
}

  function getKindleOptions() {
    return {
      quote: kindleQuoteInput?.value || "",
      microQuote: kindleMicroQuoteInput?.value || "",
      theme: kindleThemeSelect?.value || "",
      themeCustom: kindleThemeCustom?.value || "",
      palette: kindlePaletteSelect?.value || "",
      paletteCustom: kindlePaletteCustom?.value || "",
      background: kindleBackgroundSelect?.value || "",
      layout: kindleLayoutSelect?.value || "",
      heat: kindleHeatSelect?.value || "",
      extra: kindleExtraInput?.value || ""
    };
  }

  function applyStickerSelections(data = {}) {
  if (!data) return;

  if (stickerQuoteInput) stickerQuoteInput.value = data.quote || "";
  if (stickerMicroQuoteInput) stickerMicroQuoteInput.value = data.microQuote || "";

  if (stickerVibeSelect) stickerVibeSelect.value = data.vibe || stickerVibeSelect.value;
  if (stickerPaletteSelect) stickerPaletteSelect.value = data.palette || stickerPaletteSelect.value;
  if (stickerBackgroundSelect) stickerBackgroundSelect.value = data.background || stickerBackgroundSelect.value;
  if (stickerBorderSelect) stickerBorderSelect.value = data.border || stickerBorderSelect.value;
  if (stickerOutlineSelect) stickerOutlineSelect.value = data.outline || stickerOutlineSelect.value;
  if (stickerSpiceSelect) stickerSpiceSelect.value = data.spice || stickerSpiceSelect.value;

  if (stickerProductCustom) stickerProductCustom.value = data.productCustom || "";
  if (stickerVibeCustom) stickerVibeCustom.value = data.vibeCustom || "";
  if (stickerPaletteCustom) stickerPaletteCustom.value = data.paletteCustom || "";
}
  function applyKindleSelections(data = {}) {
  if (!data) return;

  if (kindleQuoteInput) kindleQuoteInput.value = data.quote || "";
  if (kindleMicroQuoteInput) kindleMicroQuoteInput.value = data.microQuote || "";

  if (kindleThemeSelect) kindleThemeSelect.value = data.theme || kindleThemeSelect.value;
  if (kindlePaletteSelect) kindlePaletteSelect.value = data.palette || kindlePaletteSelect.value;
  if (kindleBackgroundSelect) kindleBackgroundSelect.value = data.background || kindleBackgroundSelect.value;
  if (kindleLayoutSelect) kindleLayoutSelect.value = data.layout || kindleLayoutSelect.value;
  if (kindleHeatSelect) kindleHeatSelect.value = data.heat || kindleHeatSelect.value;

  if (kindleThemeCustom) kindleThemeCustom.value = data.themeCustom || "";
  if (kindlePaletteCustom) kindlePaletteCustom.value = data.paletteCustom || "";
  if (kindleExtraInput) kindleExtraInput.value = data.extra || "";
}
  
  // Character listeners
  archetypeSelect?.addEventListener("change", () => {
    populateBuilderOptions(archetypeSelect.value);
  });

  randomArchetypeBtn?.addEventListener("click", () => {
    randomizeSelect(archetypeSelect);
    populateBuilderOptions(archetypeSelect?.value || "");
    [
      complexionSelect,
      bodyTypeSelect,
      faceShapeSelect,
      extrasSelect,
      hairColorSelect,
      hairSelect,
      makeupSelect,
      lightingSelect,
      nailShapeSelect,
      nailDesignSelect,
      outfitSelect,
      accessoriesSelect,
      expressionSelect,
      microSelect,
      attitudeSelect,
      poseSelect,
      propSelect,
      sceneSelect,
      backgroundSelect,
      paletteSelect,
      compositionSelect
    ].forEach(randomizeSelect);
  });

  randomizeAllBtn?.addEventListener("click", randomizeAll);
  resetBtn?.addEventListener("click", resetBuilder);
  clearBtn?.addEventListener("click", clearAll);

  generateBtn?.addEventListener("click", () => {
    runCharacterStudio();
  });

  generate5Btn?.addEventListener("click", () => {
  const archetype = archetypeSelect?.value || ARCHETYPES[0];
  const base = getCharacterOptions();
  const variants = [];
  const rows = [];

  for (let i = 0; i < 5; i++) {
    const options = {
      complexion: base.complexionCustom.trim() || randomFrom(COMPLEXIONS),
      bodyType: base.bodyTypeCustom.trim() || randomFrom(BODY_TYPES),
      faceShape: base.faceShapeCustom.trim() || randomFrom(FACE_SHAPES),

      extras: base.extrasCustom.trim() || randomFrom(EXTRAS),
      hairColor: base.hairColorCustom.trim() || randomFrom(HAIR_COLORS),
      hair: base.hairCustom.trim() || randomFrom(HAIR),
      makeup: base.makeupCustom.trim() || randomFrom(MAKEUP),
      lighting: base.lightingCustom.trim() || randomFrom(LIGHTING),

      nailShape: base.nailShapeCustom.trim() || randomFrom(NAIL_SHAPES),
      nailDesign: base.nailDesignCustom.trim() || randomFrom(NAIL_DESIGNS),

      outfit: base.outfitCustom.trim() || randomFrom(OUTFITS),
      accessories: base.accessoriesCustom.trim() || randomFrom(ACCESSORIES),

      expression: base.expressionCustom.trim() || randomFrom(EXPRESSIONS),
      micro: base.microCustom.trim() || randomFrom(MICRO_EXPRESSIONS),
      attitude: base.attitudeCustom.trim() || randomFrom(ATTITUDES),
      pose: base.poseCustom.trim() || randomFrom(POSES),
      prop: base.propCustom.trim() || randomFrom(PROPS),
      scene: base.sceneCustom.trim() || randomFrom(SCENES),
      background: base.backgroundCustom.trim() || randomFrom(BACKGROUNDS),
      palette: base.paletteCustom.trim() || randomFrom(PALETTES),
      composition: base.compositionCustom.trim() || randomFrom(COMPOSITIONS),

      complexionCustom: base.complexionCustom,
      bodyTypeCustom: base.bodyTypeCustom,
      faceShapeCustom: base.faceShapeCustom,
      extrasCustom: base.extrasCustom,
      hairColorCustom: base.hairColorCustom,
      hairCustom: base.hairCustom,
      makeupCustom: base.makeupCustom,
      lightingCustom: base.lightingCustom,
      nailShapeCustom: base.nailShapeCustom,
      nailDesignCustom: base.nailDesignCustom,
      outfitCustom: base.outfitCustom,
      accessoriesCustom: base.accessoriesCustom,
      expressionCustom: base.expressionCustom,
      microCustom: base.microCustom,
      attitudeCustom: base.attitudeCustom,
      poseCustom: base.poseCustom,
      propCustom: base.propCustom,
      sceneCustom: base.sceneCustom,
      backgroundCustom: base.backgroundCustom,
      paletteCustom: base.paletteCustom,
      compositionCustom: base.compositionCustom,

      customCategory: "",
      customAddons: "",
      customCategories: "",
      negativePrompt: ""
    };

    const prompt = buildCharacterPrompt(archetype, options);
    variants.push(`VARIATION ${i + 1}\n\n${prompt}`);

    rows.push({
      label: `Variation ${i + 1}`,
      dropName: "",
      dropTheme: "",
      quoteReference: "",
      prompt,
      caption: "",
      hook: "",
      hashtags: "",
      slideText: ""
    });
  }

  output.value = variants.join("\n\n━━━━━━━━━━━━━━━━━━━━\n\n");
  LAST_ROWS = rows;
  LAST_DROP = null;
});

  // Shared listeners
  studioMode?.addEventListener("change", updateStudioMode);
  stickerSubMode?.addEventListener("change", updateStickerSubMode);

  clearOutputBtn?.addEventListener("click", () => {
    output.value = "";
  });

  copyBtn?.addEventListener("click", async () => {
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

  // Presets
  savePresetBtn?.addEventListener("click", () => {
    const name = presetNameInput?.value.trim();
    if (!name) {
      alert("Enter a preset name first.");
      return;
    }

    PRESETS = savePreset(name, getReaderverseSelections());
    refreshPresetSelect();
    if (presetSelect) presetSelect.value = name;
  });

  loadPresetBtn?.addEventListener("click", () => {
    const name = presetSelect?.value;
    if (!name || !PRESETS[name]) {
      alert("Select a saved preset first.");
      return;
    }

    const presetData = PRESETS[name].data || {};

applyCharacterSelections(presetData);
applyStickerSelections(presetData);
applyKindleSelections(presetData);
});
  deletePresetBtn?.addEventListener("click", () => {
    const name = presetSelect?.value;
    if (!name) {
      alert("Select a preset first.");
      return;
    }

    PRESETS = deletePreset(name);
    refreshPresetSelect();
    if (presetNameInput) presetNameInput.value = "";
  });

  exportPresetsBtn?.addEventListener("click", () => {
    downloadText("bookish-demands-presets.json", JSON.stringify(PRESETS, null, 2));
  });

  importPresetsBtn?.addEventListener("click", () => {
    importPresetsFile?.click();
  });

  importPresetsFile?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      PRESETS = { ...PRESETS, ...parsed };
      savePresetsMap(PRESETS);
      refreshPresetSelect();
    } catch (error) {
      console.error(error);
      alert("Preset import failed.");
    }

    event.target.value = "";
  });

  // Drop library
  saveDropBtn?.addEventListener("click", () => {
    if (!LAST_DROP) {
      alert("Generate a 30-Pack or Drop Builder result first.");
      return;
    }

    DROP_LIBRARY = saveDrop(LAST_DROP);
    refreshDropLibrarySelect();
    if (dropLibrarySelect) dropLibrarySelect.value = LAST_DROP.id;
  });

  loadDropBtn?.addEventListener("click", () => {
    const dropId = dropLibrarySelect?.value;
    if (!dropId || !DROP_LIBRARY[dropId]) {
      alert("Select a saved drop first.");
      return;
    }

    const drop = DROP_LIBRARY[dropId];
    LAST_DROP = drop;
    LAST_ROWS = drop.rows || [];
    applyStickerSelections(drop);
    applyKindleSelections(drop);
    output.value = (drop.rows || [])
      .map((row) => {
        return row.caption || row.hook || row.hashtags
          ? `${row.label}\nPROMPT\n${row.prompt}\n\nCAPTION\n${row.caption}\n\nHOOK\n${row.hook}\n\nHASHTAGS\n${row.hashtags}`
          : `${row.label}\n${row.prompt}`;
      })
      .join("\n\n---\n\n");
  });

  deleteDropBtn?.addEventListener("click", () => {
    const dropId = dropLibrarySelect?.value;
    if (!dropId) {
      alert("Select a saved drop first.");
      return;
    }

    DROP_LIBRARY = deleteDrop(dropId);
    refreshDropLibrarySelect();
  });

  exportDropLibraryBtn?.addEventListener("click", () => {
    downloadText("bookish-demands-drop-library.json", JSON.stringify(DROP_LIBRARY, null, 2));
  });

  importDropLibraryBtn?.addEventListener("click", () => {
    importDropLibraryFile?.click();
  });

  importDropLibraryFile?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      DROP_LIBRARY = { ...DROP_LIBRARY, ...parsed };
      saveDropLibraryMap(DROP_LIBRARY);
      refreshDropLibrarySelect();
    } catch (error) {
      console.error(error);
      alert("Drop library import failed.");
    }

    event.target.value = "";
  });

  // Exports
  exportTxtBtn?.addEventListener("click", () => {
    if (!output.value.trim()) {
      alert("Nothing to export.");
      return;
    }

    downloadText("bookish-demands-output.txt", output.value);
  });

  exportCsvBtn?.addEventListener("click", () => {
    if (!LAST_ROWS.length) {
      alert("Nothing to export.");
      return;
    }

    downloadText("bookish-demands-output.csv", buildCSV(LAST_ROWS));
  });

  exportDropJsonBtn?.addEventListener("click", () => {
    if (!LAST_DROP) {
      alert("No drop object available yet.");
      return;
    }

    downloadText("bookish-demands-drop.json", JSON.stringify(LAST_DROP, null, 2));
  });

  // Sticker listeners
  randomStickerBtn?.addEventListener("click", randomSticker);
  resetStickerBtn?.addEventListener("click", resetSticker);
  clearStickerBtn?.addEventListener("click", clearSticker);

  generateStickerBtn?.addEventListener("click", () => {
  try {
    const currentQuote = stickerQuoteInput?.value.trim() || "";
    const currentMicro = stickerMicroQuoteInput?.value.trim() || "";

    const resolvedQuote = currentQuote || "";
    const resolvedMicroQuote = resolvedQuote ? "" : currentMicro;

    const options = {
      ...getStickerOptions(),
      quote: resolvedQuote,
      microQuote: resolvedMicroQuote
    };

    const prompt = buildStickerPrompt(options);

    output.value = prompt;
    LAST_ROWS = [
      {
        label: "Sticker",
        dropName: "",
        dropTheme: "",
        quoteReference: resolvedQuote || resolvedMicroQuote,
        prompt,
        caption: "",
        hook: "",
        hashtags: "",
        slideText: ""
      }
    ];
    LAST_DROP = null;
  } catch (error) {
    output.value = `STICKER GENERATE ERROR\n\n${error?.message || error}`;
    alert(`Sticker generate error: ${error?.message || error}`);
  }
});

  generate5StickerBtn?.addEventListener("click", () => {
  const rendered = [];
  const exportRows = [];

  const availableProducts = [...STICKER_PRODUCTS];
  const availableMainQuotes = [...getActiveStickerQuotes()];
  const availableMicroQuotes = [...STICKER_MICRO_QUOTES];

  function pullUnique(list = [], fallback) {
    if (!list.length) return fallback;
    const index = Math.floor(Math.random() * list.length);
    return list.splice(index, 1)[0];
  }

  for (let i = 0; i < 5; i++) {
    const randomProduct =
      pullUnique(availableProducts, randomFrom(STICKER_PRODUCTS)) || randomFrom(STICKER_PRODUCTS);

    const useMainQuote = Math.random() < 0.5;

    let resolvedQuote = "";
    let resolvedMicroQuote = "";

    if (useMainQuote) {
      resolvedQuote =
  pullUnique(
    availableMainQuotes,
    pullFromBag(
      getActiveStickerQuotes(),
      `sticker-main-${stickerQuoteBankSelect?.value || "general"}`
    )
  ) ||
  pullFromBag(
    getActiveStickerQuotes(),
    `sticker-main-${stickerQuoteBankSelect?.value || "general"}`
  );
      resolvedMicroQuote =
  pullUnique(
    availableMicroQuotes,
    pullFromBag(STICKER_MICRO_QUOTES, "sticker-micro")
  ) ||
  pullFromBag(STICKER_MICRO_QUOTES, "sticker-micro");

    const options = {
      product: randomProduct?.value || "",
      productSubject: randomProduct?.subject || randomProduct?.mainSubject || "",
      productCustom: stickerProductCustom?.value || "",
      quote: resolvedQuote,
      microQuote: resolvedMicroQuote,
      vibe: stickerVibeCustom?.value.trim() || stickerVibeSelect?.value || randomFrom(STICKER_VIBES),
      vibeCustom: stickerVibeCustom?.value || "",
      palette: stickerPaletteCustom?.value.trim() || stickerPaletteSelect?.value || randomFrom(PALETTES),
      paletteCustom: stickerPaletteCustom?.value || "",
      background: stickerBackgroundSelect?.value || randomFrom(STICKER_BACKGROUNDS),
      border: stickerBorderSelect?.value || randomFrom(STICKER_BORDERS),
      outline: stickerOutlineSelect?.value || randomFrom(STICKER_OUTLINES),
      spice: stickerSpiceSelect?.value || randomFrom(STICKER_SPICE),
      paletteLock: randomProduct?.paletteLock || ""
    };

    const prompt = buildStickerPrompt(options);

    rendered.push(`STICKER ${i + 1}\n\n${prompt}`);

    exportRows.push({
      label: `Sticker ${i + 1}`,
      dropName: "",
      dropTheme: "",
      quoteReference: resolvedQuote || resolvedMicroQuote,
      prompt,
      caption: "",
      hook: "",
      hashtags: "",
      slideText: ""
    });
  }

  output.value = rendered.join("\n\n━━━━━━━━━━━━━━━━━━━━\n\n");
  LAST_ROWS = exportRows;
  LAST_DROP = null;
});


  // Kindle listeners
  randomKindleBtn?.addEventListener("click", randomKindle);
  resetKindleBtn?.addEventListener("click", resetKindle);
  clearKindleBtn?.addEventListener("click", clearKindle);

  generateKindleBtn?.addEventListener("click", () => {
  try {
    const currentQuote = kindleQuoteInput?.value.trim() || "";
    const currentMicro = kindleMicroQuoteInput?.value.trim() || "";

    const resolvedQuote = currentQuote || "";
    const resolvedMicroQuote = resolvedQuote ? "" : currentMicro;

    const options = {
      ...getKindleOptions(),
      quote: resolvedQuote,
      microQuote: resolvedMicroQuote
    };

    const prompt = buildKindleInsertPrompt(options);

    output.value = prompt;
    LAST_ROWS = [
      {
        label: "Kindle Insert",
        dropName: "",
        dropTheme: "",
        quoteReference: resolvedQuote || resolvedMicroQuote,
        prompt,
        caption: "",
        hook: "",
        hashtags: "",
        slideText: ""
      }
    ];
    LAST_DROP = null;
  } catch (error) {
    output.value = `KINDLE GENERATE ERROR\n\n${error?.message || error}`;
    alert(`Kindle generate error: ${error?.message || error}`);
  }
});

  generate5KindleBtn?.addEventListener("click", () => {
  const rendered = [];
  const exportRows = [];
    
  const availableMainQuotes = [...KINDLE_QUOTES];
  const availableMicroQuotes = [...KINDLE_MICRO_QUOTES];
    
  for (let i = 0; i < 5; i++) {
    const useMainQuote = Math.random() < 0.5;

let resolvedQuote = "";
let resolvedMicroQuote = "";

if (useMainQuote) {
  resolvedQuote =
    pullUnique(
      availableMainQuotes,
      pullFromBag(KINDLE_QUOTES, "kindle-main")
    ) ||
    pullFromBag(KINDLE_QUOTES, "kindle-main");
} else {
  resolvedMicroQuote =
    pullUnique(
      availableMicroQuotes,
      pullFromBag(KINDLE_MICRO_QUOTES, "kindle-micro")
    ) ||
    pullFromBag(KINDLE_MICRO_QUOTES, "kindle-micro");
}

    const options = {
      quote: resolvedQuote,
      microQuote: resolvedMicroQuote,
      theme: kindleThemeCustom?.value.trim() || kindleThemeSelect?.value || randomFrom(KINDLE_THEMES),
      themeCustom: kindleThemeCustom?.value || "",
      palette: kindlePaletteCustom?.value.trim() || kindlePaletteSelect?.value || randomFrom(PALETTES),
      paletteCustom: kindlePaletteCustom?.value || "",
      background: kindleBackgroundSelect?.value || randomFrom(KINDLE_BACKGROUNDS),
      layout: kindleLayoutSelect?.value || randomFrom(KINDLE_LAYOUTS),
      heat: kindleHeatSelect?.value || randomFrom(KINDLE_HEAT),
      extra: kindleExtraInput?.value.trim() || ""
    };

    const prompt = buildKindleInsertPrompt(options);

    rendered.push(`KINDLE INSERT ${i + 1}\n\n${prompt}`);

    exportRows.push({
      label: `Kindle Insert ${i + 1}`,
      dropName: "",
      dropTheme: "",
      quoteReference: resolvedQuote || resolvedMicroQuote,
      prompt,
      caption: "",
      hook: "",
      hashtags: "",
      slideText: ""
    });
  }

  output.value = rendered.join("\n\n━━━━━━━━━━━━━━━━━━━━\n\n");
  LAST_ROWS = exportRows;
  LAST_DROP = null;
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
  refreshPresetSelect();
  refreshDropLibrarySelect();
});
