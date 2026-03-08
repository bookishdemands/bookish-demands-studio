alert("app.js is loading");

const output = document.getElementById("output");
const generateBtn = document.getElementById("generateBtn");

generateBtn.addEventListener("click", () => {
  output.value = "App is connected.";
});
