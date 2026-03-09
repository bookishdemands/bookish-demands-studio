function normalize(text = "") {
  return String(text).toLowerCase();
}

function includesAny(text, words = []) {
  return words.some((word) => text.includes(word));
}

export function matchQuoteToArchetype(quoteRaw = "", strength = "balanced") {
  const quote = normalize(quoteRaw);

  let archetype = "Controlled Chaos Reader";
  let paletteBias = [];

  if (
    includesAny(quote, [
      "humble",
      "proved me right",
      "prove me right",
      "told you",
      "i knew it",
      "unbothered",
      "watching",
      "sure",
      "okay then"
    ])
  ) {
    archetype = "Petty Reader";
  } else if (
    includesAny(quote, [
      "plot twist",
      "wait",
      "what",
      "betrayal",
      "shocked",
      "gasp",
      "jaw dropped",
      "twist",
      "wild",
      "insane"
    ])
  ) {
    archetype = "Plot Twist Detective";
  } else if (
    includesAny(quote, [
      "villain",
      "unhinged",
      "toxic",
      "obsessed",
      "mine",
      "possessive",
      "ruin",
      "morally"
    ])
  ) {
    archetype = "Dark Romance Delulu";
  } else if (
    includesAny(quote, [
      "audiobook",
      "headphones",
      "listening"
    ])
  ) {
    archetype = "Audiobook Multitasker";
  } else if (
    includesAny(quote, [
      "soft",
      "gentle",
      "sweet",
      "cozy"
    ])
  ) {
    archetype = "Soft Girl Menace";
  } else if (
    includesAny(quote, [
      "feral",
      "need him",
      "ruined me",
      "screaming"
    ])
  ) {
    archetype = "Morally Gray Enjoyer";
  }

  if (strength === "super") {
    if (archetype === "Petty Reader") {
      paletteBias = ["black + hot pink + silver", "matte black + electric magenta"];
    } else if (archetype === "Dark Romance Delulu") {
      paletteBias = ["oxblood + matte black + antique gold", "blood red + black + steel"];
    }
  }

  return { archetype, paletteBias };
}
