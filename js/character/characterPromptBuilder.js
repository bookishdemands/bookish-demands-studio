function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const ARCHETYPE_DNA = {
  "Petty Reader": {
    expression: ["dramatic side-eye", "unimpressed deadpan", "smug knowing smirk"],
    micro: ["one eyebrow raised", "half-lidded unimpressed gaze"],
    attitude: ["quietly petty", "judgy but correct energy"],
    prop: ["holding a phone like she just read something shocking"],
    scene: ["scrolling reactions to a chapter reveal"],
    style: ["sleek glam styling", "sharp beauty editorial energy"]
  },

  "Soft Girl Menace": {
    expression: ["soft knowing smile", "mischievous grin"],
    micro: ["chin slightly lifted", "tiny smirk corner"],
    attitude: ["soft voice hard leverage", "pretty but dangerous energy"],
    prop: ["holding an annotated book with tabs"],
    scene: ["cozy luxury bedroom reading"],
    style: ["soft luxe styling", "pretty polished femininity"]
  },

  "Controlled Chaos Reader": {
    expression: ["chaotic laugh", "wide shocked eyes"],
    micro: ["eyes widened slightly", "subtle lip pout"],
    attitude: ["chaotic reader energy", "messy but committed energy"],
    prop: ["holding an e-reader"],
    scene: ["dramatic plot twist moment"],
    style: ["expressive glam styling", "high-energy bookish beauty vibe"]
  },

  "Plot Twist Detective": {
    expression: ["wide shocked eyes", "dramatic gasp"],
    micro: ["eyes widened slightly", "head tilted judgmentally"],
    attitude: ["emotionally invested", "I knew something was off energy"],
    prop: ["holding an open book with illustrated pages"],
    scene: ["dramatic thriller reveal moment"],
    style: ["suspense-driven editorial energy", "high-drama reaction styling"]
  },

  "Dark Romance Delulu": {
    expression: ["dangerous smirk", "dreamy delulu smile"],
    micro: ["half-lidded unimpressed gaze", "tiny smirk corner"],
    attitude: ["villain apologist energy", "romantically unhinged energy"],
    prop: ["holding a dark romance book"],
    scene: ["late-night dark romance reading moment"],
    style: ["dark glam styling", "seductive beauty editorial energy"]
  },

  "Possessive MMC Apologist": {
    expression: ["dangerous smirk", "smug knowing smirk"],
    micro: ["half-lidded stare", "chin slightly lifted"],
    attitude: ["protective villain loyalty", "he don’t play about her energy"],
    prop: ["holding an open book dramatically"],
    scene: ["reacting to a possessive MMC moment"],
    style: ["dark luxe styling", "high-stakes romance energy"]
  },

  "Billionaire MMC Enthusiast": {
    expression: ["confident main character smirk", "soft knowing smile"],
    micro: ["chin slightly lifted", "tiny smirk corner"],
    attitude: ["high standards energy", "wealth recognizes wealth energy"],
    prop: ["holding a luxury hardcover book"],
    scene: ["reading in a penthouse-inspired setting"],
    style: ["quiet luxury glam", "expensive feminine energy"]
  },

  "Villain Defender": {
    expression: ["dangerous smirk", "mischievous grin"],
    micro: ["tiny smirk corner", "half-lidded gaze"],
    attitude: ["villain apologist energy", "I support his rights and wrongs energy"],
    prop: ["holding a stack of books"],
    scene: ["dramatic morally gray reading moment"],
    style: ["dark editorial beauty styling", "morally gray glamour"]
  },

  "Urban Power Reader": {
    expression: ["confident main character smirk", "dramatic side-eye"],
    micro: ["one eyebrow raised", "side glance with dramatic lashes"],
    attitude: ["bossy main character energy", "pressure and presence energy"],
    prop: ["holding a phone like she just read the tea"],
    scene: ["book club gossip moment"],
    style: ["urban glam styling", "high-impact beauty energy"]
  },

  "Boss Woman Reader": {
    expression: ["confident main character smirk", "soft knowing smile"],
    micro: ["chin slightly lifted", "one eyebrow raised"],
    attitude: ["high standards energy", "booked and in charge energy"],
    prop: ["holding a reading journal + pen"],
    scene: ["coffee shop reading aesthetic"],
    style: ["bossed-up glam", "clean executive beauty energy"]
  },

  "Girly Glam Reader": {
    expression: ["soft knowing smile", "dreamy delulu smile"],
    micro: ["subtle lip pout", "side glance with dramatic lashes"],
    attitude: ["hyper-feminine reader energy", "cute but not to be played with energy"],
    prop: ["holding an annotated romance novel"],
    scene: ["soft glam reading moment"],
    style: ["girly glam styling", "beauty doll energy"]
  },

  "Audiobook Multitasker": {
    expression: ["chaotic laugh", "mischievous grin"],
    micro: ["soft squint like she knows the tea", "eyes widened slightly"],
    attitude: ["unbothered & booked", "multitasking reader energy"],
    prop: ["wearing headphones listening to an audiobook"],
    scene: ["late-night audiobook binge"],
    style: ["casual glam styling", "modern reader lifestyle energy"]
  },

  "Late Night Reader": {
    expression: ["dreamy delulu smile", "wide shocked eyes"],
    micro: ["soft squint like she knows the tea", "subtle lip pout"],
    attitude: ["emotionally invested", "up too late with fictional people energy"],
    prop: ["holding an e-reader"],
    scene: ["reading at 3AM under soft lighting"],
    style: ["night reader glam", "soft moody beauty energy"]
  },

  "Book Hangover Survivor": {
    expression: ["wide shocked eyes", "soft knowing smile"],
    micro: ["eyes widened slightly", "tired but invested gaze"],
    attitude: ["emotionally wrecked but grateful", "that book changed me energy"],
    prop: ["holding a stack of books"],
    scene: ["post-book emotional recovery moment"],
    style: ["soft glam exhaustion aesthetic", "bookish beauty aftermath"]
  },

  "Paranormal Romance Devotee": {
    expression: ["dreamy delulu smile", "dangerous smirk"],
    micro: ["half-lidded enchanted gaze", "side glance with dramatic lashes"],
    attitude: ["supernatural obsession energy", "if he has fangs I’m listening energy"],
    prop: ["holding an open fantasy romance book"],
    scene: ["moonlit paranormal reading moment"],
    style: ["enchanted dark glam styling", "supernatural romance beauty energy"]
  },

  "Suspense Addict": {
    expression: ["wide shocked eyes", "slow blink judgment"],
    micro: ["head tilted judgmentally", "eyes widened slightly"],
    attitude: ["trust nobody energy", "plotting while reading energy"],
    prop: ["holding a phone like she found evidence"],
    scene: ["high-stakes thriller reveal moment"],
    style: ["sharp suspense editorial styling", "clean thriller energy"]
  },

  "Haunted Reader": {
    expression: ["slow blink judgment", "soft knowing smile"],
    micro: ["side glance with dramatic lashes", "slightly widened eyes"],
    attitude: ["haunted but intrigued energy", "romanticizing the supernatural energy"],
    prop: ["holding an open gothic romance book"],
    scene: ["haunted midnight reading moment"],
    style: ["moody paranormal glam", "ghostly luxe beauty energy"]
  }
};

export function buildCharacterPrompt(archetype) {
  const dna = ARCHETYPE_DNA[archetype] || ARCHETYPE_DNA["Soft Girl Menace"];

  const expression = pick(dna.expression);
  const micro = pick(dna.micro);
  const attitude = pick(dna.attitude);
  const prop = pick(dna.prop);
  const scene = pick(dna.scene);
  const style = pick(dna.style);

  const parts = [
    "PROMPT",
    "hand-drawn glam cartoon beauty illustration",
    "high-end digital character art",
    "feminine melanated glam doll aesthetic",
    "bold clean linework",
    "smooth controlled gradient shading",
    "vibrant polished colors",
    "large almond-shaped eyes with lifted outer corners",
    "dramatic top lashes",
    "bright catchlights in the eyes",
    "sculpted brows",
    "small softly defined nose with glossy highlight",
    "full glossy lips with defined cupid's bow",
    "curvy melanated woman",
    "soft feminine silhouette",
    "smooth glowing brown skin",
    "defined edges and baby hairs",
    style,
    `${expression} expression`,
    `${micro} micro-expression`,
    attitude,
    prop,
    scene,
    `reader archetype: ${archetype}`,
    "upper body composition",
    "clean centered composition",
    "sticker-friendly framing",
    "transparent or white background",
    "isolated character",
    "minimal background clutter",
    "no text, no watermark, no logo"
  ];

  return parts.join(", ");
}
