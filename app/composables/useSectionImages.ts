export interface SectionImage {
  /** Path under public/. Render it through withBase(), not as-is. */
  src: string;
  alt: string;
  /**
   * object-position override, for photos whose subject sits away from the
   * centre. The hero and showcase bands are wide and short, so a plain centre
   * crop of a tall photo can miss the thing worth showing.
   */
  position?: string;
}

/**
 * Every project photo that may appear in a section band. The gallery keeps its
 * own fixed list — this pool is only for the hero, about and showcase panels.
 *
 * Do not trust the filenames here. The older `gallery-*` and `showcase-*`
 * names were assigned wrongly and describe the wrong photo in almost every
 * case; the alt text below is what each file actually shows, checked image by
 * image (against the prototype's own captions where the bytes match).
 */
export const sectionImagePool: SectionImage[] = [
  // Photos added for the section bands.
  { src: "/images/lvm-7d6f4dbc.jpeg", alt: "Backlit slatted wood TV media wall" },
  { src: "/images/lvm-9b1d2480.jpeg", alt: "Grey media wall with lit niches" },
  { src: "/images/lvm-6d1265f7.jpeg", alt: "Fitted dressing unit with lit shelves" },
  {
    src: "/images/lvm-1d478bba.jpeg",
    alt: "Upholstered bed with fluted headboard wall",
    // The bed sits low in frame; a centred crop would show mostly bare wall.
    position: "center 70%",
  },
  { src: "/images/lvm-78cc2df4.jpeg", alt: "Marble panel TV wall with console" },
  { src: "/images/lvm-0919ee7f.jpeg", alt: "Fitted wardrobes with lit glass columns" },
  { src: "/images/lvm-6083d46e.jpeg", alt: "Herringbone cabinetry with marble worktop" },
  // Photos already in the app. Filenames are wrong; alt text is correct.
  { src: "/images/showcase-marble-wall.jpeg", alt: "Staircase and panelling" },
  { src: "/images/gallery-dressing-unit.jpeg", alt: "Teak media wall" },
  { src: "/images/gallery-fitted-wardrobes.jpeg", alt: "Walnut panelling and console" },
  { src: "/images/gallery-marble-wall.jpeg", alt: "Floating vanity" },
  { src: "/images/gallery-teak-wall.jpeg", alt: "Walk-in closet" },
  { src: "/images/gallery-staircase.jpeg", alt: "Marble TV wall with floating walnut console" },
  { src: "/images/gallery-slatted-wall.jpeg", alt: "Fluted upholstered headboard wall with twin beds" },
  { src: "/images/gallery-walnut-panelling.jpeg", alt: "Floating white vanity with stone countertop" },
];

export const SECTION_SLOTS = ["hero", "about", "showcase"] as const;
export type SectionSlot = (typeof SECTION_SLOTS)[number];
export type SectionPicks = Record<SectionSlot, SectionImage | null>;

const SESSION_KEY = "lvm:section-images";

function emptyPicks(): SectionPicks {
  return { hero: null, about: null, showcase: null };
}

/** Three different photos, drawn without replacement. */
function pickThree(): SectionPicks {
  const bag = [...sectionImagePool];
  const picks = emptyPicks();
  for (const slot of SECTION_SLOTS) {
    const index = Math.floor(Math.random() * bag.length);
    picks[slot] = bag.splice(index, 1)[0] ?? null;
  }
  return picks;
}

/**
 * Re-read this session's picks. Returns null if nothing is stored, if storage
 * is blocked (private browsing), or if the pool has changed since — any of
 * those just means "pick again".
 */
function restore(): SectionPicks | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const stored = JSON.parse(raw) as Partial<Record<SectionSlot, string>>;
    const picks = emptyPicks();
    for (const slot of SECTION_SLOTS) {
      const found = sectionImagePool.find((img) => img.src === stored[slot]);
      if (!found) return null;
      picks[slot] = found;
    }
    return picks;
  } catch {
    return null;
  }
}

function persist(picks: SectionPicks) {
  try {
    const srcs: Record<string, string> = {};
    for (const slot of SECTION_SLOTS) {
      const img = picks[slot];
      if (img) srcs[slot] = img.src;
    }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(srcs));
  } catch {
    // Storage blocked. The visitor just gets a fresh draw next page load.
  }
}

/**
 * One random photo per section, held steady for the browser session.
 *
 * The picking runs in onMounted, not during render. The site is deployed as
 * static files, so the server HTML is baked at build time — choosing during
 * render would either bake one photo forever or break hydration. Choosing
 * after mount keeps the markup honest; SectionPhoto fades each photo in so the
 * arrival reads as intentional rather than as a flash.
 */
export function useSectionImages() {
  const picks = useState<SectionPicks>("section-images", emptyPicks);

  onMounted(() => {
    if (picks.value.hero) return; // Already drawn for this session.
    const chosen = restore() ?? pickThree();
    picks.value = chosen;
    persist(chosen);
  });

  return picks;
}
