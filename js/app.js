import { ARCHETYPES } from "./core/archetypes.js";

alert("module app.js loaded");

const modeSelect = document.getElementById("studioMode");
const generateBtn = document.getElementById("generateBtn");
const output = document.getElementById("output");

generateBtn.addEventListener("click", () => {
  output.value = "Loaded archetypes: " + ARCHETYPES.join(", ");
});
