import { ARCHETYPES } from "./core/archetypes.js";
import { ARCHETYPE_DNA } from "./character/archetypeDNA.js";
import { HAIR } from "./character/hair.js";
import { OUTFITS } from "./character/outfits.js";
import { EXPRESSIONS } from "./character/expressions.js";
import { POSES } from "./character/poses.js";
import { PROPS } from "./character/props.js";
import { PALETTES } from "./character/palettes.js";

import { buildCharacterPrompt } from "./character/promptBuilder.js";

const studioMode = document.getElementById("studioMode");
const archetypeSelect = document.getElementById("archetypeSelect");
const hairSelect = document.getElementById("hairSelect");
const outfitSelect = document.getElementById("outfitSelect");
const expressionSelect = document.getElementById("expressionSelect");
const poseSelect = document.getElementById("poseSelect");
const propSelect = document.getElementById("propSelect");
const paletteSelect = document.getElementById("paletteSelect");

const randomArchetypeBtn = document.getElementById("randomArchetypeBtn");
const randomizeAllBtn = document.getElementById("randomizeAllBtn");
const generateBtn = document.getElementById("generateBtn");

const output = document.getElementById("output");

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fillSelect(selectEl, options) {
  if (!selectEl) return;
  selectEl.innerHTML = "";

  (options || []).forEach(option => {
    const el = document.createElement("option");
    el.value = option;
    el.textContent = option;
    selectEl.appendChild(el);
  });
}

function populateArchetypeOptions() {
  fillSelect(archetypeSelect, ARCHETYPES);
}

function populateBuilderOptions(archetype) {
  const dna = ARCHETYPE_DNA[archetype];

  if (!dna) {
    fillSelect(hairSelect, HAIR);
    fillSelect(outfitSelect, OUTFITS);
    fillSelect(expressionSelect, EXPRESSIONS);
    fillSelect(poseSelect, POSES);
    fillSelect(propSelect, PROPS);
    fillSelect(paletteSelect, PALETTES);
    return;
  }

  fillSelect(hairSelect, dna.hair?.length ? dna.hair : HAIR);
  fillSelect(outfitSelect, dna.outfit?.length ? dna.outfit : OUTFITS);
  fillSelect(expressionSelect, dna.expression?.length ? dna.expression : EXPRESSIONS);
  fillSelect(poseSelect, dna.pose?.length ? dna.pose : POSES);
  fillSelect(propSelect, dna.prop?.length ? dna.prop : PROPS);
  fillSelect(paletteSelect, dna.palette?.length ? dna.palette : PALETTES);
}

function initialize() {
  populateArchetypeOptions();

  if (ARCHETYPES.length) {
    archetypeSelect.value = ARCHETYPES[0];
    populateBuilderOptions(ARCHETYPES[0]);
  } else {
    populateBuilderOptions("");
  }
}

function randomizeAll() {
  hairSelect.value = pick(HAIR);
  outfitSelect.value = pick(OUTFITS);
  expressionSelect.value = pick(EXPRESSIONS);
  poseSelect.value = pick(POSES);
  propSelect.value = pick(PROPS);
  paletteSelect.value = pick(PALETTES);
}

function generate() {
  const archetype = archetypeSelect.value;

  const options = {
    hair: hairSelect.value,
    outfit: outfitSelect.value,
    expression: expressionSelect.value,
    pose: poseSelect.value,
    prop: propSelect.value,
    palette: paletteSelect.value
  };

  const prompt = buildCharacterPrompt(archetype, options);
  output.value = prompt;
}

archetypeSelect.addEventListener("change", () => {
  populateBuilderOptions(archetypeSelect.value);
});

randomArchetypeBtn.addEventListener("click", () => {
  archetypeSelect.value = pick(ARCHETYPES);
  populateBuilderOptions(archetypeSelect.value);
});

randomizeAllBtn.addEventListener("click", () => {
  randomizeAll();
});

generateBtn.addEventListener("click", () => {
  generate();
});

initialize();
