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
  const copyBtn = document.getElementById("copyBtn");
  const clearOutputBtn = document.getElementById("clearOutputBtn");
  const output = document.getElementById("output");

const studioMode = document.getElementById("studioMode");
const characterControls = document.getElementById("characterControls");
const stickerControls = document.getElementById("stickerControls");

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

  const STICKER_PRODUCTS = [
  "quote sticker",
  "reaction sticker",
  "kindle insert sticker",
  "warning label sticker",
  "book club sticker",
  "dark romance sticker",
  "reader mood sticker",
  "annotation sticker"
];

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

    const validOptions = Array.from(selectEl.options).filter(option => option.value !== "");
    if (validOptions.length === 0) return;

    const random = validOptions[Math.floor(Math.random() * validOptions.length)];
    selectEl.value = random.value;
  }

  function clearCustomInputs() {
    [
      complexionCustom, bodyTypeCustom, faceShapeCustom, hairCustom, outfitCustom,
      expressionCustom, microCustom, attitudeCustom, poseCustom, propCustom,
      sceneCustom, paletteCustom
    ].forEach(input => {
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

    complexionSelect.value = COMPLEXIONS[0];
    bodyTypeSelect.value = BODY_TYPES[0];
    faceShapeSelect.value = FACE_SHAPES[0];

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
    fillSelect(stickerProductSelect, STICKER_PRODUCTS);
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

    stickerProductSelect.value = STICKER_PRODUCTS[0];
    stickerVibeSelect.value = STICKER_VIBES[0];
    stickerPaletteSelect.value = PALETTES[0];
    stickerBackgroundSelect.value = STICKER_BACKGROUNDS[0];
    stickerBorderSelect.value = STICKER_BORDERS[0];
    stickerOutlineSelect.value = STICKER_OUTLINES[0];
    stickerSpiceSelect.value = STICKER_SPICE[1];

    clearStickerCustomInputs();
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
  }

  function randomSticker() {
    randomizeSelect(stickerProductSelect);
    randomizeSelect(stickerVibeSelect);
    randomizeSelect(stickerPaletteSelect);
    randomizeSelect(stickerBackgroundSelect);
    randomizeSelect(stickerBorderSelect);
    randomizeSelect(stickerOutlineSelect);
    randomizeSelect(stickerSpiceSelect);
  }

  function getStickerOptionsFromUI() {
    return {
      product: stickerProductSelect.value,
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
      spice: stickerSpiceSelect.value
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

    studioMode.addEventListener("change", () => {
  updateStudioMode();
});

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
  }

    populateArchetypeOptions();
  resetBuilder();

  populateStickerControls();
  resetSticker();

  updateStudioMode();
});
