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
  "sticker-friendly character design"
];

function resolveValue(customValue, selectedValue, fallbackArray = []) {
  if (customValue && customValue.trim()) return customValue.trim();
  if (selectedValue && selectedValue.trim()) return selectedValue.trim();
  return fallbackArray.length ? pick(fallbackArray) : "";
}

export function buildCharacterPrompt(archetype, options = {}) {
  const dna = ARCHETYPE_DNA[archetype] || ARCHETYPE_DNA["Soft Girl Menace"];

  const complexion = resolveValue(options.complexionCustom, options.complexion, COMPLEXIONS);
  const bodyType = resolveValue(options.bodyTypeCustom, options.bodyType, BODY_TYPES);
  const faceShape = resolveValue(options.faceShapeCustom, options.faceShape, FACE_SHAPES);

  const hair = resolveValue(options.hairCustom, options.hair, dna.hair || []);
  const outfit = resolveValue(options.outfitCustom, options.outfit, dna.outfit || []);
  const expression = resolveValue(options.expressionCustom, options.expression, dna.expression || []);
  const micro = resolveValue(options.microCustom, options.micro, dna.micro || []);
  const attitude = resolveValue(options.attitudeCustom, options.attitude, dna.attitude || []);
  const pose = resolveValue(options.poseCustom, options.pose, dna.pose || []);
  const prop = resolveValue(options.propCustom, options.prop, dna.prop || []);
  const scene = resolveValue(options.sceneCustom, options.scene, dna.scene || []);
  const palette = resolveValue(options.paletteCustom, options.palette, dna.palette || []);

  const sections = [
    "PROMPT",
    "",
    "CHARACTER",
    complexion,
    bodyType,
    faceShape,
    hair,
    outfit,
    "",
    "EXPRESSION",
    expression ? `${expression} expression` : "",
    micro ? `${micro} micro-expression` : "",
    attitude,
    "",
    "ACTION",
    pose,
    prop,
    scene,
    "",
    "ARCHETYPE",
    archetype ? `reader archetype: ${archetype}` : "",
    palette ? `palette influence: ${palette}` : "",
    "",
    "STYLE",
    ...STYLE_LOCK,
    "",
    "COMPOSITION",
    "clean centered composition",
    "isolated character",
    "minimal background clutter",
    "transparent or pure white background",
    "no text, no watermark, no logo",
    "upper body composition"
  ];

  return sections.filter(Boolean).join("\n");
}
