import { ARCHETYPES } from "./core/archetypes.js";
import { buildCharacterPrompt } from "./character/characterPromptBuilder.js";

const modeSelect = document.getElementById("studioMode");
const generateBtn = document.getElementById("generateBtn");
const output = document.getElementById("output");

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

generateBtn.addEventListener("click", () => {
  const mode = modeSelect.value;

  if (mode === "character") {
    const archetype = pick(ARCHETYPES);
    const prompt = buildCharacterPrompt(archetype);
    output.value = prompt;
  }

  if (mode === "sticker") {
    output.value = "Sticker Studio coming next.";
  }
});
