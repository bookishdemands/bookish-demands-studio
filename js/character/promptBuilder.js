import { STYLE_LOCK } from "./styleLock.js";
import { COMPLEXIONS, BODY_TYPES, FACE_SHAPES } from "./faceDNA.js";
import { ARCHETYPE_DNA } from "./archetypeDNA.js";

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function buildCharacterPrompt(archetype) {
  const dna = ARCHETYPE_DNA[archetype] || ARCHETYPE_DNA["Soft Girl Menace"];

  const complexion = pick(COMPLEXIONS);
  const bodyType = pick(BODY_TYPES);
  const faceShape = pick(FACE_SHAPES);

  const expression = pick(dna.expression);
  const micro = pick(dna.micro);
  const attitude = pick(dna.attitude);
  const pose = pick(dna.pose);
  const prop = pick(dna.prop);
  const scene = pick(dna.scene);
  const outfit = pick(dna.outfit);
  const hair = pick(dna.hair);
  const palette = pick(dna.palette);

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

  return parts.join(", ");
}
