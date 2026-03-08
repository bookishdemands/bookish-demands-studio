import { ARCHETYPES } from "./core/archetypes.js";
import { buildCharacterPrompt } from "./character/promptBuilder.js";

const studioMode = document.getElementById("studioMode");
const archetypeSelect = document.getElementById("archetypeSelect");
const randomArchetypeBtn = document.getElementById("randomArchetypeBtn");
const generateBtn = document.getElementById("generateBtn");
const output = document.getElementById("output");
const characterControls = document.getElementById("characterControls");

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fillArchetypes() {
  archetypeSelect.innerHTML = "";

  ARCHETYPES.forEach((archetype) => {
    const opt = document.createElement("option");
    opt.value = archetype;
    opt.textContent = archetype;
    archetypeSelect.appendChild(opt);
  });
}

function getSelectedArchetype() {
  return archetypeSelect.value || ARCHETYPES[0];
}

function setRandomArchetype() {
  archetypeSelect.value = pick(ARCHETYPES);
}

function generateCharacterPrompt() {
  const archetype = getSelectedArchetype();
  const prompt = buildCharacterPrompt(archetype);
  output.value = prompt;
}

function updateModeUI() {
  const mode = studioMode.value;

  if (mode === "character") {
    characterControls.style.display = "block";
    generateBtn.textContent = "Generate Character Prompt";
  } else {
    characterControls.style.display = "none";
    generateBtn.textContent = "Sticker Studio Coming Next";
    output.value = "Sticker Studio wiring comes after Character Studio is finalized.";
  }
}

fillArchetypes();
updateModeUI();

studioMode.addEventListener("change", updateModeUI);

randomArchetypeBtn.addEventListener("click", () => {
  setRandomArchetype();
});

generateBtn.addEventListener("click", () => {
  if (studioMode.value === "character") {
    generateCharacterPrompt();
  } else {
    output.value = "Sticker Studio wiring comes after Character Studio is finalized.";
  }
});
