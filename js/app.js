import { ARCHETYPES } from "./core/archetypes.js";
import { ARCHETYPE_DNA } from "./character/archetypeDNA.js";
import { HAIR } from "./character/hair.js";
import { OUTFITS } from "./character/outfits.js";
import { EXPRESSIONS } from "./character/expressions.js";
import { POSES } from "./character/poses.js";
import { PROPS } from "./character/props.js";
import { PALETTES } from "./character/palettes.js";
import { buildCharacterPrompt } from "./character/promptBuilder.js";

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fillSelect(selectEl, options) {
  if (!selectEl) return;
  selectEl.innerHTML = "";

  (options || []).forEach((option) => {
    const el = document.createElement("option");
    el.value = option;
    el.textContent = option;
    selectEl.appendChild(el);
  });
}

document.addEventListener("DOMContentLoaded", () => {
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

  function populateArchetypeOptions() {
    fillSelect(archetypeSelect, ARCHETYPES);
  }

  function populateBuilderOptions(archetype) {
    const dna = ARCHETYPE_DNA[archetype];

    fillSelect(hairSelect, dna?.hair?.length ? dna.hair : HAIR);
    fillSelect(outfitSelect, dna?.outfit?.length ? dna.outfit : OUTFITS);
    fillSelect(expressionSelect, dna?.expression?.length ? dna.expression : EXPRESSIONS);
    fillSelect(poseSelect, dna?.pose?.length ? dna.pose : POSES);
    fillSelect(propSelect, dna?.prop?.length ? dna.prop : PROPS);
    fillSelect(paletteSelect, dna?.palette?.length ? dna.palette : PALETTES);
  }

  function initialize() {
    populateArchetypeOptions();

    if (ARCHETYPES.length) {
      archetypeSelect.value = ARCHETYPES[0];
      populateBuilderOptions(ARCHETYPES[0]);
    }
  }

  function randomizeAll() {
    if (HAIR.length) hairSelect.value = pick(HAIR);
    if (OUTFITS.length) outfitSelect.value = pick(OUTFITS);
    if (EXPRESSIONS.length) expressionSelect.value = pick(EXPRESSIONS);
    if (POSES.length) poseSelect.value = pick(POSES);
    if (PROPS.length) propSelect.value = pick(PROPS);
    if (PALETTES.length) paletteSelect.value = pick(PALETTES);
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

    output.value = buildCharacterPrompt(archetype, options);
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
  randomizeAll();
});
