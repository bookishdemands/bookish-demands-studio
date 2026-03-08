export function buildCharacterPrompt(archetype){

const baseStyle =
"hand-drawn glam cartoon beauty illustration, high-end digital character art, feminine melanated glam doll aesthetic, bold clean linework, smooth gradient shading, vibrant polished colors, expressive beauty character design";

const body =
"curvy melanated woman, soft feminine silhouette, confident posture, smooth glowing brown skin, glossy lips, dramatic lashes, sculpted brows";

const hair =
"long styled hair with defined edges and baby hairs, polished glam hairstyle";

const pose =
"upper body composition, expressive reader reaction, holding an e-reader";

const sticker =
"clean centered composition, sticker-friendly framing, transparent or white background, isolated character, minimal background clutter";

return `PROMPT
${baseStyle},
${body},
${hair},
${pose},
reader archetype energy: ${archetype},
bookish reaction moment,
${sticker}
`;
}
