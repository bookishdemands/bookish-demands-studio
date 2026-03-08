import { ARCHETYPES } from "./core/archetypes.js";
import { HAIR } from "./character/hair.js";
import { OUTFITS } from "./character/outfits.js";
import { EXPRESSIONS } from "./character/expressions.js";
import { POSES } from "./character/poses.js";
import { PROPS } from "./character/props.js";
import { PALETTES } from "./character/palettes.js";

import { buildCharacterPrompt } from "./character/promptBuilder.js";

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

function pick(arr){
return arr[Math.floor(Math.random()*arr.length)];
}

function fillSelect(select, list){

select.innerHTML="";

list.forEach(item=>{
const opt=document.createElement("option");
opt.value=item;
opt.textContent=item;
select.appendChild(opt);
});

}

function initialize(){

fillSelect(archetypeSelect,ARCHETYPES);
fillSelect(hairSelect,HAIR);
fillSelect(outfitSelect,OUTFITS);
fillSelect(expressionSelect,EXPRESSIONS);
fillSelect(poseSelect,POSES);
fillSelect(propSelect,PROPS);
fillSelect(paletteSelect,PALETTES);

}

function randomizeAll(){

hairSelect.value=pick(HAIR);
outfitSelect.value=pick(OUTFITS);
expressionSelect.value=pick(EXPRESSIONS);
poseSelect.value=pick(POSES);
propSelect.value=pick(PROPS);
paletteSelect.value=pick(PALETTES);

}

function generate(){

const archetype=archetypeSelect.value;

const options={
hair:hairSelect.value,
outfit:outfitSelect.value,
expression:expressionSelect.value,
pose:poseSelect.value,
prop:propSelect.value,
palette:paletteSelect.value
};

const prompt=buildCharacterPrompt(archetype,options);

output.value=prompt;

}

randomArchetypeBtn.onclick=()=>{
archetypeSelect.value=pick(ARCHETYPES);
};

randomizeAllBtn.onclick=randomizeAll;

generateBtn.onclick=generate;

initialize();
randomizeAll();
