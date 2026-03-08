import { ARCHETYPES } from "./core/archetypes.js";
import { buildCharacterPrompt } from "./character/characterPromptBuilder.js";

const modeSelect = document.getElementById("studioMode");
const archetypeSelect = document.getElementById("archetypeSelect");
const randomArchetypeBtn = document.getElementById("randomArchetypeBtn");
const generateBtn = document.getElementById("generateBtn");
const output = document.getElementById("output");
const characterControls = document.getElementById("characterControls");

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function populateArchetypes() {
  archetypeSelect.innerHTML = `<option value="">Random Archetype</option>`;

  ARCHETYPES.forEach((archetype) => {
    const option = document.createElement("option");
    option.value = archetype;
    option.textContent = archetype;
    archetypeSelect.appendChild(option);
  });
}

function updateModeUI() {
  const mode = modeSelect.value;

  if (mode === "character") {
    characterControls.style.display = "block";
  } else {
    characterControls.style.display = "block";
  }
}

randomArchetypeBtn.addEventListener("click", () => {
  const randomChoice = pick(ARCHETYPES);
  archetypeSelect.value = randomChoice;
});

generateBtn.addEventListener("click", () => {
  const mode = modeSelect.value;

  if (mode === "character") {
    const selectedArchetype = archetypeSelect.value || pick(ARCHETYPES);
    const prompt = buildCharacterPrompt(selectedArchetype);
    output.value = prompt;
  }

  if (mode === "sticker") {
    output.value = "Sticker Studio coming next.";
  }
});

modeSelect.addEventListener("change", updateModeUI);

populateArchetypes();
updateModeUI();
