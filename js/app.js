import { ARCHETYPES } from "./core/archetypes.js";
import { ARCHETYPE_DNA } from "./character/archetypeDNA.js";
import { HAIR } from "./character/hair.js";
import { OUTFITS } from "./character/outfits.js";
import { EXPRESSIONS } from "./character/expressions.js";
import { POSES } from "./character/poses.js";
import { PROPS } from "./character/props.js";
import { PALETTES } from "./character/palettes.js";
import { buildCharacterPrompt } from "./character/characterPromptBuilder.js";

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

  const randomArchetypeBtn = document.getElementById("randomArchetypeBtn");
  const randomizeAllBtn = document.getElementById("randomizeAllBtn");
  const clearBtn = document.getElementById("clearBtn");
  const resetBtn = document.getElementById("resetBtn");
  const generateBtn = document.getElementById("generateBtn");
  const output = document.getElementById("output");

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

  function populateArchetypeOptions() {
    fillSelect(archetypeSelect, ARCHETYPES);
  }

  function populateBuilderOptions(archetype) {
    const dna = ARCHETYPE_DNA[archetype];

    fillSelect(complexionSelect, COMPLEXIONS);
    fillSelect(bodyTypeSelect, BODY_TYPES);
    fillSelect(faceShapeSelect, FACE_SHAPES);
    fillSelect(hairSelect, dna?.hair?.length ? dna.hair : HAIR);
    fillSelect(outfitSelect, dna?.outfit?.length ? dna.outfit : OUTFITS);
    fillSelect(expressionSelect, dna?.expression?.length ? dna.expression : EXPRESSIONS);
    fillSelect(microSelect, dna?.micro?.length ? dna.micro : []);
    fillSelect(attitudeSelect, dna?.attitude?.length ? dna.attitude : []);
    fillSelect(poseSelect, dna?.pose?.length ? dna.pose : POSES);
    fillSelect(propSelect, dna?.prop?.length ? dna.prop : PROPS);
    fillSelect(sceneSelect, dna?.scene?.length ? dna.scene : []);
    fillSelect(paletteSelect, dna?.palette?.length ? dna.palette : PALETTES);
  }

  function randomizeAll() {

  hairSelect.value = pick(HAIR);
  outfitSelect.value = pick(OUTFITS);
  expressionSelect.value = pick(EXPRESSIONS);
  poseSelect.value = pick(POSES);
  propSelect.value = pick(PROPS);
  paletteSelect.value = pick(PALETTES);

}

  function resetBuilder() {
  if (!ARCHETYPES.length) return;

  const defaultArchetype = ARCHETYPES[0];
  archetypeSelect.value = defaultArchetype;
  populateBuilderOptions(defaultArchetype);

  fillSelect(complexionSelect, COMPLEXIONS);
  fillSelect(bodyTypeSelect, BODY_TYPES);
  fillSelect(faceShapeSelect, FACE_SHAPES);

  complexionSelect.value = COMPLEXIONS[0];
  bodyTypeSelect.value = BODY_TYPES[0];
  faceShapeSelect.value = FACE_SHAPES[0];

  if (hairSelect.options.length) hairSelect.value = hairSelect.options[0].value;
  if (outfitSelect.options.length) outfitSelect.value = outfitSelect.options[0].value;
  if (expressionSelect.options.length) expressionSelect.value = expressionSelect.options[0].value;
  if (microSelect.options.length) microSelect.value = microSelect.options[0].value;
  if (attitudeSelect.options.length) attitudeSelect.value = attitudeSelect.options[0].value;
  if (poseSelect.options.length) poseSelect.value = poseSelect.options[0].value;
  if (propSelect.options.length) propSelect.value = propSelect.options[0].value;
  if (sceneSelect.options.length) sceneSelect.value = sceneSelect.options[0].value;
  if (paletteSelect.options.length) paletteSelect.value = paletteSelect.options[0].value;

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

  output.value = "";

}
  function initialize() {
    populateArchetypeOptions();

    if (ARCHETYPES.length) {
      archetypeSelect.value = ARCHETYPES[0];
      populateBuilderOptions(ARCHETYPES[0]);
      randomizeAll();
    }
  }

  function generate() {
    const archetype = archetypeSelect.value;

    const options = {
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
      palette: paletteSelect.value
    };

    output.value = buildCharacterPrompt(archetype, options);
  }

  archetypeSelect.addEventListener("change", () => {
    populateBuilderOptions(archetypeSelect.value);
    randomizeAll();
  });

  randomArchetypeBtn.addEventListener("click", () => {
    archetypeSelect.value = pick(ARCHETYPES);
    populateBuilderOptions(archetypeSelect.value);
    randomizeAll();
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

  initialize();
});
