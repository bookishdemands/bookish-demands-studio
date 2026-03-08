import {
  ARCHETYPES,
  ARCHETYPE_VIBE_MAP
} from "../core/archetypes.js";

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const EXPRESSION_MAP = {
  "Petty Reader": ["dramatic side-eye", "unimpressed deadpan", "smug knowing smirk"],
  "Soft Girl Menace": ["soft knowing smile", "mischievous grin", "confident main character smirk"],
  "Controlled Chaos Reader": ["chaotic laugh", "dramatic gasp", "wide shocked eyes"],
  "Plot Twist Detective": ["wide shocked eyes", "dramatic gasp", "slow blink judgment"],
  "Dark Romance Delulu": ["dangerous smirk", "dreamy delulu smile", "soft knowing smile"],
  "Possessive MMC Apologist": ["dangerous smirk", "smug knowing smirk", "half-lidded stare"],
  "Billionaire MMC Enthusiast": ["confident main character smirk", "soft knowing smile", "smug knowing smirk"],
  "Villain Defender": ["dangerous smirk", "mischievous grin", "smug knowing smirk"],
  "Urban Power Reader": ["confident main character smirk", "dramatic side-eye", "mischievous grin"],
  "Boss Woman Reader": ["confident main character smirk", "soft knowing smile", "unimpressed deadpan"],
  "Girly Glam Reader": ["soft knowing smile", "dreamy delulu smile", "mischievous grin"],
  "Audiobook Multitasker": ["chaotic laugh", "soft knowing smile", "mischievous grin"],
  "Late Night Reader": ["dreamy delulu smile", "soft knowing smile", "wide shocked eyes"],
  "Book Hangover Survivor": ["wide shocked eyes", "dramatic gasp", "soft knowing smile"],
  "Paranormal Romance Devotee": ["dreamy delulu smile", "dangerous smirk", "soft knowing smile"],
  "Suspense Addict": ["wide shocked eyes", "slow blink judgment", "dramatic gasp"],
  "Haunted Reader": ["slow blink judgment", "wide shocked eyes", "soft knowing smile"]
};

const MICRO_MAP = {
  "Petty Reader": ["one eyebrow raised", "half-lidded unimpressed gaze"],
  "Soft Girl Menace": ["chin slightly lifted", "tiny smirk corner"],
  "Controlled Chaos Reader": ["eyes widened slightly", "subtle lip pout"],
  "Plot Twist Detective": ["eyes widened slightly", "head tilted judgmentally"],
  "Dark Romance Delulu": ["half-lidded unimpressed gaze", "tiny smirk corner"],
  "Possessive MMC Apologist": ["half-lidded unimpressed gaze", "chin slightly lifted"],
  "Billionaire MMC Enthusiast": ["chin slightly lifted", "tiny smirk corner"],
  "Villain Defender": ["tiny smirk corner", "half-lidded unimpressed gaze"],
  "Urban Power Reader": ["one eyebrow raised", "side glance with dramatic lashes"],
  "Boss Woman Reader": ["chin slightly lifted", "one eyebrow raised"],
  "Girly Glam Reader": ["subtle lip pout", "side glance with dramatic lashes"],
  "Audiobook Multitasker": ["soft squint like she knows the tea", "eyes widened slightly"],
  "Late Night Reader": ["soft squint like she knows the tea", "subtle lip pout"],
  "Book Hangover Survivor": ["eyes widened slightly", "soft squint like she knows the tea"],
  "Paranormal Romance Devotee": ["half-lidded unimpressed gaze", "side glance with dramatic lashes"],
  "Suspense Addict": ["head tilted judgmentally", "eyes widened slightly"],
  "Haunted Reader": ["slow blink", "side glance with dramatic lashes"]
};

const ATTITUDE_MAP = {
  "Petty Reader": ["quietly petty"],
  "Soft Girl Menace": ["soft voice hard leverage"],
  "Controlled Chaos Reader": ["chaotic reader energy"],
  "Plot Twist Detective": ["emotionally invested"],
  "Dark Romance Delulu": ["villain apologist energy"],
  "Possessive MMC Apologist": ["protective villain loyalty"],
  "Billionaire MMC Enthusiast": ["high standards energy"],
  "Villain Defender": ["villain apologist energy"],
  "Urban Power Reader": ["bossy main character energy"],
  "Boss Woman Reader": ["high standards energy"],
  "Girly Glam Reader": ["soft voice hard leverage"],
  "Audiobook Multitasker": ["unbothered & booked"],
  "Late Night Reader": ["emotionally invested"],
  "Book Hangover Survivor": ["emotionally invested"],
  "Paranormal Romance Devotee": ["delusional but calculated"],
  "Suspense Addict": ["emotionally invested"],
  "Haunted Reader": ["delusional but calculated"]
};

const POSE_MAP = {
  "Petty Reader": ["arms crossed unimpressed"],
  "Soft Girl Menace": ["leaning slightly with attitude"],
  "Controlled Chaos Reader": ["hands raised dramatic reaction"],
  "Plot Twist Detective": ["hands near face shocked"],
  "Dark Romance Delulu": ["looking over shoulder"],
  "Possessive MMC Apologist": ["looking over shoulder"],
  "Billionaire MMC Enthusiast": ["hand on hip confident"],
  "Villain Defender": ["looking over shoulder"],
  "Urban Power Reader": ["hand on hip confident"],
  "Boss Woman Reader": ["hand on hip confident"],
  "Girly Glam Reader": ["leaning slightly with attitude"],
  "Audiobook Multitasker": ["peace sign selfie"],
  "Late Night Reader": ["clutching book dramatically"],
  "Book Hangover Survivor": ["hands near face shocked"],
  "Paranormal Romance Devotee": ["clutching book dramatically"],
  "Suspense Addict": ["finger on chin analyzing"],
  "Haunted Reader": ["clutching book dramatically"]
};

const PROP_MAP = {
  "Petty Reader": ["holding a phone like she just read something shocking"],
  "Soft Girl Menace": ["holding an annotated book with tabs"],
  "Controlled Chaos Reader": ["holding an e-reader"],
  "Plot Twist Detective": ["holding an open book with stylized artwork on the pages"],
  "Dark Romance Delulu": ["holding an open book with stylized artwork on the pages"],
  "Possessive MMC Apologist": ["holding an open book with stylized artwork on the pages"],
  "Billionaire MMC Enthusiast": ["holding a luxury hardcover book"],
  "Villain Defender": ["holding a stack of books"],
  "Urban Power Reader": ["holding a phone like she just read something shocking"],
  "Boss Woman Reader": ["holding a reading journal + pen"],
  "Girly Glam Reader": ["holding an annotated book with tabs"],
  "Audiobook Multitasker": ["wearing headphones listening to an audiobook"],
  "Late Night Reader": ["holding an e-reader"],
  "Book Hangover Survivor": ["holding a stack of books"],
  "Paranormal Romance Devotee": ["holding an open book with stylized artwork on the pages"],
  "Suspense Addict": ["holding a phone like she just read something shocking"],
  "Haunted Reader": ["holding an open book with stylized artwork on the pages"]
};

const SCENE_MAP = {
  "Petty Reader": ["scrolling reactions to a chapter reveal"],
  "Soft Girl Menace": ["cozy luxury bedroom reading"],
  "Controlled Chaos Reader": ["dramatic plot twist moment"],
  "Plot Twist Detective": ["dramatic plot twist moment"],
  "Dark Romance Delulu": ["late-night audiobook binge"],
  "Possessive MMC Apologist": ["reacting to a possessive MMC moment"],
  "Billionaire MMC Enthusiast": ["reading in a luxury penthouse setting"],
  "Villain Defender": ["dramatic plot twist moment"],
  "Urban Power Reader": ["book club gossip moment"],
  "Boss Woman Reader": ["coffee shop reading aesthetic"],
  "Girly Glam Reader": ["cozy luxury bedroom reading"],
  "Audiobook Multitasker": ["late-night audiobook binge"],
  "Late Night Reader": ["reading at 3AM under a blanket"],
  "Book Hangover Survivor": ["dramatic plot twist moment"],
  "Paranormal Romance Devotee": ["moonlit supernatural reading moment"],
  "Suspense Addict": ["dramatic thriller reveal moment"],
  "Haunted Reader": ["haunted midnight reading moment"]
};

export function buildCharacterPrompt(archetype) {
  const chosenArchetype = archetype || pick(ARCHETYPES);

  const expression = pick(EXPRESSION_MAP[chosenArchetype] || ["soft knowing smile"]);
  const micro = pick(MICRO_MAP[chosenArchetype] || ["one eyebrow raised"]);
  const attitude = pick(ATTITUDE_MAP[chosenArchetype] || ["emotionally invested"]);
  const pose = pick(POSE_MAP[chosenArchetype] || ["hand on hip confident"]);
  const prop = pick(PROP_MAP[chosenArchetype] || ["holding an e-reader"]);
  const scene = pick(SCENE_MAP[chosenArchetype] || ["cozy luxury bedroom reading"]);
  const vibe = ARCHETYPE_VIBE_MAP[chosenArchetype] || "Bookish Mood";

  const parts = [
    "hand-drawn glam cartoon beauty illustration",
    "feminine melanated doll aesthetic",
    "bold clean linework",
    "smooth controlled gradient shading",
    "signature glam doll face",
    "large almond-shaped eyes with lifted outer corners",
    "dramatic top lashes and bright catchlights",
    "sculpted high-arched brows",
    "small softly defined nose with glossy highlight",
    "full glossy lips with defined cupid's bow",
    "soft heart-shaped face",
    "clean symmetrical facial proportions",
    "subtle hand-drawn illustration feel",
    "controlled stylization rather than plastic smoothness",
    "melanated curvy woman, beauty editorial cartoon style",
    `${chosenArchetype} archetype`,
    `${expression} expression`,
    `${micro} micro-expression`,
    `${attitude} energy`,
    `${pose} pose`,
    prop,
    scene,
    `${vibe} vibe`,
    "sticker-friendly composition",
    "isolated centered character",
    "transparent background",
    "clean silhouette",
    "no background clutter",
    "clean die-cut sticker border",
    "no text, no watermark, no logo"
  ];

  return parts.join(", ");
}
