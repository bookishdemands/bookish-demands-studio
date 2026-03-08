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

  const stickerSubMode = document.getElementById("stickerSubMode");
  const stickerModeControls = document.getElementById("stickerModeControls");
  const kindleModeControls = document.getElementById("kindleModeControls");

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

  const STICKER_TYPES = [
  "quote sticker",
  "reaction sticker",
  "kindle insert sticker",
  "warning label sticker",
  "book club sticker",
  "dark romance sticker",
  "reader mood sticker",
  "annotation sticker"
];
  
  const STICKER_PRODUCTS = [
  {
    value: "IV Drip Bag",
    subject: "minimal vector sticker of an IV drip bag with a clean label panel and subtle glossy highlights; no medical branding"
  },
  {
    value: "Delulu Meter",
    subject: "delulu meter sticker with labeled levels and a slider indicator; cute + cocky vibe; bold readable text"
  },
  {
    value: "Pill Bottle",
    subject: "amber prescription-style bottle with childproof cap; clean warning label panel; a few stylized pills; no pharmacy branding"
  },
  {
    value: "Confession Note",
    subject: "confession note sticker with header 'CONFESSION:' and a bold handwritten quote; clean paper edges; dramatic cute vibe"
  },
  {
    value: "Blood Oath Vial",
    subject: "small glass vial sticker with deep red liquid, minimalist label panel for quote placement, subtle shine highlights, luxe dark romance vibe, no branding",
    paletteLock: "blood"
  },
  {
    value: "Velvet Sin Perfume Bottle",
    subject: "luxury perfume bottle sticker with a clean label panel for the quote, glossy highlights, ornate but modern silhouette, no brand logos"
  },
  {
    value: "Obsessed Heart Monitor",
    subject: "heart monitor / EKG screen sticker showing a bold heartbeat line, clean caption area for the quote, high contrast pop-art style"
  },
  {
    value: "Possessive Energy Warning Tag",
    subject: "warning label/tag sticker with a blank text panel for the quote, bold icons, high contrast, no real brand marks"
  },
  {
    value: "Morally Gray Passport Stamp",
    subject: "passport stamp sticker with a central text area for the quote, distressed edges but clean readability, no country seals"
  },
  {
    value: "Red Flag Collector Card",
    subject: "trading card style sticker with a bold frame and stats layout, large title panel for the quote, playful toxic romance humor vibe, no copyrighted characters",
    paletteLock: "blood"
  },
  {
    value: "Smut Door Hanger",
    subject: "door hanger sticker with a large centered label area for the quote, simple icon accents, bold readable typography, no hotel branding"
  },
  {
    value: "Plot Twist Emergency Button",
    subject: "big red emergency button sticker with a circular top label area for the quote, dramatic highlights, bold comic pop style"
  },
  {
    value: "Kindle Addict Prescription Pad",
    subject: "prescription pad / Rx note sticker with fake fields and a large handwritten quote area, medical-themed but no pharmacy branding, playful and clean"
  },
  {
    value: "Book Hangover Recovery Kit",
    subject: "first-aid kit / care kit box sticker with a clean label panel for the quote, subtle gloss, cute but edgy romance reader vibe"
  },
  {
    value: "Villain Energy Membership Card",
    subject: "membership card sticker with a bold header and centered quote line area, luxe dark aesthetic, no real company branding"
  },
  {
    value: "Soft Life Serum Dropper",
    subject: "glass dropper bottle sticker with soft glow, clean label panel for the quote, luxe self-care vibe, no skincare branding"
  },
  {
    value: "Emotional Support Bookmark Badge",
    subject: "badge/ribbon seal sticker with a central text panel for the quote, bold outline, cute bookish energy, no school logos"
  },
  {
    value: "Main Character License Card",
    subject: "novelty ID/license card sticker with a large quote line area, clean grid layout, no real state or government seals"
  },
  {
    value: "Guest List Wristband",
    subject: "event wristband sticker with a bold text strip area for the quote, minimal icons, nightlife romance vibe, no venue branding"
  },
  {
    value: "Backstage Access Pass",
    subject: "laminated backstage pass sticker with a big center panel for the quote, lanyard hole detail, high contrast, no band/venue logos"
  },
  {
    value: "Luxury Key Fob Tag",
    subject: "luxury key tag sticker with a large centered label panel for the quote, sleek silhouette, metallic highlights, no car logos"
  },
  {
    value: "VIP Lounge Card",
    subject: "VIP card sticker with bold typography and a main quote line area, luxe minimal style, no club branding"
  },
  {
    value: "Court Evidence Tag",
    subject: "evidence tag sticker with a large text block for the quote, barcode-like lines, no department branding"
  },
  {
    value: "Case File Folder Tab",
    subject: "file folder/tab sticker with a blank label strip for the quote, thriller aesthetic, clean and readable"
  },
  {
    value: "Receipt of Emotional Damage",
    subject: "receipt sticker with a bold quote centered as the total or note, clean grid layout, no real restaurant branding"
  },
  {
    value: "Library Fine Ticket",
    subject: "library due-date/fine ticket sticker with a big quote area, clean stamped look, no library logos"
  },
  {
    value: "Dangerous MMC Business Card",
    subject: "luxury business card sticker with a strong typographic quote as the headline, minimal details, no real company names"
  },
  {
    value: "Delulu Fuel Juice Box",
    subject: "juice box sticker with a clean label panel for the quote, straw detail, cute + chaotic vibe, no brand logos"
  },
  {
    value: "Plot Armor Spray",
    subject: "spray bottle sticker with a big label panel for the quote, bold icons, pop-art shine, no real product branding"
  },
  {
    value: "Spoiler Alert Tape",
    subject: "tape strip sticker with the quote printed repeatedly or as a bold center line, high contrast"
  },
  {
    value: "Overstimulated Reader Meter",
    subject: "meter/gauge sticker with levels and a slider needle, big quote panel, cute but edgy reader vibe"
  },
  {
    value: "TBR Mountain Warning Sign",
    subject: "warning road sign style sticker with a big center text area for the quote, simple icon of a book stack mountain"
  },
  {
    value: "Fantasy Realm Boarding Pass",
    subject: "boarding pass sticker with a bold quote as the main destination line, fantasy vibe but modern design, no airline branding"
  },
  {
    value: "Smut Loading Progress Bar",
    subject: "progress bar sticker with percentage ticks and a big quote line above or below, bold readable typography"
  }
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
    fillSelect(stickerProductSelect, STICKER_PRODUCTS.map(item => item.value));
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

  function getStickerProductObject(productValue) {
  return STICKER_PRODUCTS.find(item => item.value === productValue) || null;
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

    kindleThemeSelect.value = KINDLE_THEMES[0];
    kindlePaletteSelect.value = PALETTES[0];
    kindleBackgroundSelect.value = KINDLE_BACKGROUNDS[0];
    kindleLayoutSelect.value = KINDLE_LAYOUTS[0];
    kindleHeatSelect.value = KINDLE_HEAT[1];

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

  
  populateArchetypeOptions();
  resetBuilder();

  populateStickerControls();
  resetSticker();

  populateKindleControls();
  resetKindle();
  
  updateStickerSubMode();
  updateStudioMode();
});
