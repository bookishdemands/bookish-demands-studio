document.getElementById("generateBtn").onclick = function(){

const mode = document.getElementById("studioMode").value;

if(mode === "character"){
document.getElementById("output").value =
"Character Studio generator coming online...";
}

if(mode === "sticker"){
document.getElementById("output").value =
"Sticker Studio generator coming online...";
}

};
