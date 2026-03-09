import { ARCHETYPE_DNA } from "./archetypeDNA.js";

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

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

const STYLE_LOCK = [
  "hand-drawn glam cartoon beauty illustration",
  "high-end digital character art",
  "modern beauty editorial cartoon style",
  "feminine melanated glam doll aesthetic",
  "bold clean linework",
  "smooth controlled gradient shading",
  "vibrant polished colors",
  "large almond-shaped eyes with lifted outer corners",
  "dramatic top lashes",
  "minimal lower lashes",
  "bright catchlights in the eyes",
  "sculpted high-arched brows",
  "small softly defined nose with glossy highlight",
  "full glossy lips with defined cupid's bow",
  "soft rounded cheek structure",
  "clean symmetrical facial proportions",
  "defined baby hairs and polished hairline",
  "high visual impact beauty illustration",
  "sticker-friendly character design",
  "isolated character",
  "minimal background clutter",
  "transparent or pure white background",
  "no text, no watermark, no logo"
];

function resolveValue(customValue, selectedValue, fallback = "") {
  if (customValue && String(customValue).trim()) return String(customValue).trim();
  if (selectedValue && String(selectedValue).trim()) return String(selectedValue).trim();
  return fallback;
}

function parseCustomCategoryLines(text = "") {
  const raw = String(text).trim();
  if (!raw) return [];

  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `custom category: ${line}`);
}

function compositionRule(composition = "") {
  const comp = String(composition).toLowerCase();

  if (comp.includes("full body") || comp.includes("head-to-toe") || comp.includes("feet")) {
    return "full body framing, head-to-toe, feet visible, no cropping";
  }

  if (comp.includes("three-quarter") || comp.includes("thigh")) {
    return "three-quarter body framing, thighs visible, outfit clearly visible";
  }

  if (comp.includes("waist-up") || comp.includes("upper half")) {
    return "waist-up framing, hands and prop visible";
  }

  if (comp.includes("head + shoulders") || comp.includes("beauty portrait")) {
    return "head-and-shoulders beauty portrait";
  }

  if (comp.includes("close-up") || comp.includes("face focus")) {
    return "close-up portrait, emphasis on eyes and expression";
  }

  if (comp.includes("over-the-shoulder")) {
    return "over-the-shoulder framing, turning pose, attitude emphasized";
  }

  return composition || "clean centered character composition";
}

function qualityGuardrails(options = {}) {
  const rules = [
    "exactly two eyes, exactly one nose, exactly one mouth",
    "no cross-eyed gaze, no misaligned pupils",
    "no distorted anatomy, no duplicated features",
    "no warped fingers",
    "no duplicated limbs",
    "clean readable silhouette",
    "no cluttered background"
  ];

  if (options.prop || options.pose || options.composition) {
    rules.push("natural hand placement");
    rules.push("exactly two hands if hands are visible");
  }

  return rules.join(", ");
}

export function buildCharacterPrompt(archetype, options = {}) {
  const dna = ARCHETYPE_DNA[archetype] || ARCHETYPE_DNA["Soft Girl Menace"] || {};

  const complexion = resolveValue(
    options.complexionCustom,
    options.complexion,
    pick(COMPLEXIONS)
  );

  const bodyType = resolveValue(
    options.bodyTypeCustom,
    options.bodyType,
    pick(BODY_TYPES)
  );

  const faceShape = resolveValue(
    options.faceShapeCustom,
    options.faceShape,
    pick(FACE_SHAPES)
  );

  const hairColor = resolveValue(options.hairColorCustom, options.hairColor);
  const hair = resolveValue(options.hairCustom, options.hair);
  const makeup = resolveValue(options.makeupCustom, options.makeup);
  const lighting = resolveValue(options.lightingCustom, options.lighting);
  const extras = resolveValue(options.extrasCustom, options.extras);

  const nailShape = resolveValue(options.nailShapeCustom, options.nailShape);
  const nailDesign = resolveValue(options.nailDesignCustom, options.nailDesign);

  const outfit = resolveValue(options.outfitCustom, options.outfit);
  const accessories = resolveValue(options.accessoriesCustom, options.accessories);

  const expression = resolveValue(
    options.expressionCustom,
    options.expression,
    Array.isArray(dna.expression) ? pick(dna.expression) : ""
  );

  const micro = resolveValue(
    options.microCustom,
    options.micro,
    Array.isArray(dna.micro) ? pick(dna.micro) : ""
  );

  const attitude = resolveValue(
    options.attitudeCustom,
    options.attitude,
    Array.isArray(dna.attitude) ? pick(dna.attitude) : ""
  );

  const pose = resolveValue(
    options.poseCustom,
    options.pose,
    Array.isArray(dna.pose) ? pick(dna.pose) : ""
  );

  const prop = resolveValue(
    options.propCustom,
    options.prop,
    Array.isArray(dna.prop) ? pick(dna.prop) : ""
  );

  const scene = resolveValue(
    options.sceneCustom,
    options.scene,
    Array.isArray(dna.scene) ? pick(dna.scene) : ""
  );

  const background = resolveValue(options.backgroundCustom, options.background);
  const palette = resolveValue(
    options.paletteCustom,
    options.palette,
    Array.isArray(dna.palette) ? pick(dna.palette) : ""
  );

  const composition = resolveValue(options.compositionCustom, options.composition);

  const customNotes = resolveValue(options.customCategory, "");
  const customAddons = resolveValue(options.customAddons, "");
  const negativePrompt = resolveValue(options.negativePrompt, "");
  const customCategoryLines = parseCustomCategoryLines(options.customCategories);

  const parts = [
    "PROMPT",

    ...STYLE_LOCK,

    complexion,
    bodyType,
    faceShape,

    hairColor,
    hair,
    makeup,
    lighting,
    extras,

    nailShape,
    nailDesign,

    outfit,
    accessories,

    expression ? `${expression} expression` : "",
    micro ? `${micro} micro-expression` : "",
    attitude,
    pose,

    prop,
    scene,

    background,
    palette ? `palette influence: ${palette}` : "",
    compositionRule(composition),

    `reader archetype: ${archetype || "Reader"}`,

    customNotes ? `custom notes: ${customNotes}` : "",
    customAddons ? `add-ons: ${customAddons}` : "",
    ...customCategoryLines,

    negativePrompt ? `avoid: ${negativePrompt}` : "",
    qualityGuardrails({ prop, pose, composition })
  ];

  return parts.filter(Boolean).join(", ");
}
