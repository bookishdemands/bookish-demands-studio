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
import { buildStickerPrompt } from "./sticker/stickerPromptBuilder.js";
import { buildKindleInsertPrompt } from "./sticker/kindleInsertPromptBuilder.js";
import { STICKER_PRODUCTS } from "./sticker/products.js";
import { STICKER_QUOTES } from "./sticker/quotes.js";
import { STICKER_MICRO_QUOTES } from "./sticker/microQuotes.js";


function pick(arr) {
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
    el.value = option;
    el.textContent = option;
    selectEl.appendChild(el);
  });
}

document.addEventListener("DOMContentLoaded", () => {
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

  // Shared controls
  const studioMode = document.getElementById("studioMode");
  const characterControls = document.getElementById("characterControls");
  const stickerControls = document.getElementById("stickerControls");
  const copyBtn = document.getElementById("copyBtn");
  const clearOutputBtn = document.getElementById("clearOutputBtn");
  const output = document.getElementById("output");

  // Sticker mode controls
  const stickerSubMode = document.getElementById("stickerSubMode");
  const stickerModeControls = document.getElementById("stickerModeControls");
  const kindleModeControls = document.getElementById("kindleModeControls");

  const stickerProductSelect = document.getElementById("stickerProductSelect");
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

  function populateArchetypeOptions() {
    fillSelect(archetypeSelect, ARCHETYPES);
  }

  function populateBuilderOptions(archetype) {
    const dna = ARCHETYPE_DNA[archetype];

    fillSelect(complexionSelect, COMPLEXIONS);
    fillSelect(bodyTypeSelect, BODY_TYPES);
    fillSelect(faceShapeSelect, FACE_SHAPES);

    fillSelect(hairSelect, HAIR);
    fillSelect(outfitSelect, OUTFITS);

    fillSelect(expressionSelect, dna?.expression?.length ? dna.expression : EXPRESSIONS);
    fillSelect(microSelect, dna?.micro?.length ? dna.micro : MICRO_EXPRESSIONS);
    fillSelect(attitudeSelect, dna?.attitude?.length ? dna.attitude : ATTITUDES);
    fillSelect(poseSelect, dna?.pose?.length ? dna.pose : POSES);
    fillSelect(propSelect, dna?.prop?.length ? dna.prop : PROPS);
    fillSelect(sceneSelect, dna?.scene?.length ? dna.scene : SCENES);
    fillSelect(paletteSelect, dna?.palette?.length ? dna.palette : PALETTES);

    if (!dna) return;

    if (dna.expression?.length) expressionSelect.value = dna.expression[0];
    if (dna.micro?.length) microSelect.value = dna.micro[0];
    if (dna.attitude?.length) attitudeSelect.value = dna.attitude[0];
    if (dna.pose?.length) poseSelect.value = dna.pose[0];
    if (dna.prop?.length) propSelect.value = dna.prop[0];
    if (dna.scene?.length) sceneSelect.value = dna.scene[0];
    if (dna.palette?.length) paletteSelect.value = dna.palette[0];
  }

  function randomizeSelect(selectEl) {
    if (!selectEl) return;

    const validOptions = Array.from(selectEl.options).filter((option) => option.value !== "");
    if (validOptions.length === 0) return;

    const random = validOptions[Math.floor(Math.random() * validOptions.length)];
    selectEl.value = random.value;
  }

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function autofillStickerText() {
  if (!stickerQuoteInput.value.trim()) {
    stickerQuoteInput.value = randomFrom(STICKER_QUOTES);
  }

  if (!stickerMicroQuoteInput.value.trim()) {
    stickerMicroQuoteInput.value = randomFrom(STICKER_MICRO_QUOTES);
  }
}
  
  function clearCustomInputs() {
    [
      complexionCustom, bodyTypeCustom, faceShapeCustom, hairCustom, outfitCustom,
      expressionCustom, microCustom, attitudeCustom, poseCustom, propCustom,
      sceneCustom, paletteCustom
    ].forEach((input) => {
      if (input) input.value = "";
    });
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

  function resetBuilder() {
    if (!ARCHETYPES.length) return;

    const defaultArchetype = ARCHETYPES[0];
    archetypeSelect.value = defaultArchetype;
    populateBuilderOptions(defaultArchetype);

    complexionSelect.value = COMPLEXIONS[0] || "";
    bodyTypeSelect.value = BODY_TYPES[0] || "";
    faceShapeSelect.value = FACE_SHAPES[0] || "";

    clearCustomInputs();
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

    clearCustomInputs();
    output.value = "";
  }

  function getOptionsFromUI() {
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

  function generate() {
    const archetype = archetypeSelect.value;
    const options = getOptionsFromUI();
    output.value = buildCharacterPrompt(archetype, options);
  }

  function generateVariations(count = 5) {
    const archetype = archetypeSelect.value;
    const baseOptions = getOptionsFromUI();

    const variants = [];
    for (let i = 0; i < count; i++) {
      variants.push(`VARIATION ${i + 1}\n\n${buildCharacterPrompt(archetype, baseOptions)}`);
    }

    output.value = variants.join("\n\n====================\n\n");
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

  function populateStickerControls() {
    fillSelect(stickerProductSelect, STICKER_PRODUCTS.map((item) => item.value));
    fillSelect(stickerVibeSelect, STICKER_VIBES);
    fillSelect(stickerPaletteSelect, PALETTES);
    fillSelect(stickerBackgroundSelect, STICKER_BACKGROUNDS);
    fillSelect(stickerBorderSelect, STICKER_BORDERS);
    fillSelect(stickerOutlineSelect, STICKER_OUTLINES);
    fillSelect(stickerSpiceSelect, STICKER_SPICE);
  }

  function clearStickerCustomInputs() {
    stickerProductCustom.value = "";
    stickerVibeCustom.value = "";
    stickerPaletteCustom.value = "";
    stickerQuoteInput.value = "";
    stickerMicroQuoteInput.value = "";
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

  clearStickerCustomInputs();
  stickerQuoteInput.value = STICKER_QUOTES[0] || "";
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

  clearStickerCustomInputs();
  stickerQuoteInput.value = "";
  stickerMicroQuoteInput.value = "";
}

  function randomSticker() {
  randomizeSelect(stickerProductSelect);
  randomizeSelect(stickerVibeSelect);
  randomizeSelect(stickerPaletteSelect);
  randomizeSelect(stickerBackgroundSelect);
  randomizeSelect(stickerBorderSelect);
  randomizeSelect(stickerOutlineSelect);
  randomizeSelect(stickerSpiceSelect);

  autofillStickerText();

  stickerQuoteInput.value = randomFrom(STICKER_QUOTES);
  stickerMicroQuoteInput.value = randomFrom(STICKER_MICRO_QUOTES);
}

  function getStickerProductObject(productValue) {
    return STICKER_PRODUCTS.find((item) => item.value === productValue) || null;
  }

  function getStickerOptionsFromUI() {
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

  function generateSticker() {
    output.value = buildStickerPrompt(getStickerOptionsFromUI());
  }

  function generateStickerVariations(count = 5) {
    const baseOptions = getStickerOptionsFromUI();
    const rows = [];

    for (let i = 0; i < count; i++) {
      rows.push(`STICKER ${i + 1}\n\n${buildStickerPrompt(baseOptions)}`);
    }

    output.value = rows.join("\n\n====================\n\n");
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

  function populateKindleControls() {
    fillSelect(kindleThemeSelect, KINDLE_THEMES);
    fillSelect(kindlePaletteSelect, PALETTES);
    fillSelect(kindleBackgroundSelect, KINDLE_BACKGROUNDS);
    fillSelect(kindleLayoutSelect, KINDLE_LAYOUTS);
    fillSelect(kindleHeatSelect, KINDLE_HEAT);
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
  }

  function getKindleOptionsFromUI() {
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

  function generateKindle() {
    output.value = buildKindleInsertPrompt(getKindleOptionsFromUI());
  }

  function generateKindleVariations(count = 5) {
    const baseOptions = getKindleOptionsFromUI();
    const rows = [];

    for (let i = 0; i < count; i++) {
      rows.push(`KINDLE INSERT ${i + 1}\n\n${buildKindleInsertPrompt(baseOptions)}`);
    }

    output.value = rows.join("\n\n====================\n\n");
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

  randomizeAllBtn.addEventListener("click", () => {
    randomizeAll();
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      clearAll();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      resetBuilder();
    });
  }

  generateBtn.addEventListener("click", () => {
    generate();
  });

  generate5Btn.addEventListener("click", () => {
    generateVariations(5);
  });

  // Shared listeners
  clearOutputBtn.addEventListener("click", () => {
    output.value = "";
  });

  if (copyBtn) {
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
        output.setSelectionRange(0, output.value.length);
        document.execCommand("copy");
        copyBtn.textContent = "Copied ✓";
        setTimeout(() => {
          copyBtn.textContent = "Copy Prompt";
        }, 1200);
      }
    });
  }

  studioMode.addEventListener("change", () => {
    updateStudioMode();
  });

  // Sticker listeners
  randomStickerBtn.addEventListener("click", () => {
    randomSticker();
  });

  resetStickerBtn.addEventListener("click", () => {
    resetSticker();
  });

  clearStickerBtn.addEventListener("click", () => {
    clearSticker();
  });

  generateStickerBtn.addEventListener("click", () => {
    generateSticker();
  });

  generate5StickerBtn.addEventListener("click", () => {
    generateStickerVariations(5);
  });

  // Kindle listeners
  stickerSubMode.addEventListener("change", () => {
    updateStickerSubMode();
  });

  randomKindleBtn.addEventListener("click", () => {
    randomKindle();
  });

  resetKindleBtn.addEventListener("click", () => {
    resetKindle();
  });

  clearKindleBtn.addEventListener("click", () => {
    clearKindle();
  });

  generateKindleBtn.addEventListener("click", () => {
    generateKindle();
  });

  generate5KindleBtn.addEventListener("click", () => {
    generateKindleVariations(5);
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
