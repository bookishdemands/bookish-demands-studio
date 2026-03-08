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
  "clean centered composition",
  "isolated character",
  "minimal background clutter",
  "transparent or pure white background",
  "no text, no watermark, no logo"
];

export function buildCharacterPrompt(archetype, options = {}) {
  const dna = ARCHETYPE_DNA[archetype] || ARCHETYPE_DNA["Soft Girl Menace"];

  const complexion = options.complexion || pick(COMPLEXIONS);
  const bodyType = options.bodyType || pick(BODY_TYPES);
  const faceShape = options.faceShape || pick(FACE_SHAPES);

  const expression = options.expression || pick(dna.expression || []);
  const micro = options.micro || pick(dna.micro || []);
  const attitude = options.attitude || pick(dna.attitude || []);
  const pose = options.pose || pick(dna.pose || []);
  const prop = options.prop || pick(dna.prop || []);
  const scene = options.scene || pick(dna.scene || []);
  const outfit = options.outfit || pick(dna.outfit || []);
  const hair = options.hair || pick(dna.hair || []);
  const palette = options.palette || pick(dna.palette || []);

  const parts = [
    "PROMPT",
    ...STYLE_LOCK,
    complexion,
    bodyType,
    faceShape,
    hair,
    outfit,
    `${expression} expression`,
    `${micro} micro-expression`,
    attitude,
    pose,
    prop,
    scene,
    `reader archetype: ${archetype}`,
    `palette influence: ${palette}`,
    "upper body composition"
  ];

  return parts.filter(Boolean).join(", ");
}
