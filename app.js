import { ARCHETYPES } from "./core/archetypes.js";
import { buildCharacterPrompt } from "./character/characterPromptBuilder.js";

const modeSelect = document.getElementById("studioMode");
const generateBtn = document.getElementById("generateBtn");
const output = document.getElementById("output");

function generateCharacterStudio() {
  const archetype = ARCHETYPES[0];
  const prompt = buildCharacterPrompt(archetype);
  output.value = `CHARACTER STUDIO\n\nArchetype: ${archetype}\n\nPROMPT\n${prompt}`;
}

function generateStickerStudio() {
  output.value = "Sticker Studio generator coming next.";
}

generateBtn.addEventListener("click", () => {
  const mode = modeSelect.value;

  if (mode === "character") {
    generateCharacterStudio();
  } else if (mode === "sticker") {
    generateStickerStudio();
  }
});
