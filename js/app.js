import { ARCHETYPES } from "./core/archetypes.js";

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

    output.value = `CHARACTER STUDIO

Selected Archetype:
${archetype}

Next step: prompt builder will generate the full character prompt here.`;
  }

  if (mode === "sticker") {
    output.value = "Sticker Studio coming next.";
  }
});
