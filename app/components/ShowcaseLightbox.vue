<script setup lang="ts">
const props = defineProps<{
  open: boolean;
  originRect: {
    top: number;
    left: number;
    width: number;
    height: number;
  } | null;
  grayscale: boolean;
}>();
const emit = defineEmits<{ close: [] }>();

const gallery = [
  { src: "/images/gallery-teak-wall.jpeg", alt: "Teak media wall" },
  { src: "/images/gallery-walk-in-closet.jpeg", alt: "Walk-in closet" },
  { src: "/images/gallery-staircase.jpeg", alt: "Staircase and panelling" },
  { src: "/images/gallery-fitted-wardrobes.jpeg", alt: "Fitted wardrobes" },
  { src: "/images/gallery-marble-wall.jpeg", alt: "Marble media wall" },
  {
    src: "/images/gallery-walnut-panelling.jpeg",
    alt: "Walnut panelling and console",
  },
  { src: "/images/gallery-upholstered-bed.jpeg", alt: "Upholstered bed" },
  {
    src: "/images/gallery-herringbone-credenza.jpeg",
    alt: "Herringbone credenza",
  },
  { src: "/images/gallery-floating-vanity.jpeg", alt: "Floating vanity" },
  { src: "/images/gallery-dressing-unit.jpeg", alt: "Dressing unit" },
  { src: "/images/gallery-slatted-wall.jpeg", alt: "Slatted media wall" },
];

/** Matches the 0.55s box transition below, plus a little slack. */
const CLOSE_MS = 560;

/** Is the overlay in the DOM? Stays true through the closing animation. */
const mounted = ref(false);
/** "from" = sitting on the showcase card. "full" = filling the viewport. */
const phase = ref<"from" | "full">("from");

const rect = computed(
  () => props.originRect ?? { top: 0, left: 0, width: 0, height: 0 },
);

const boxStyle = computed(() => {
  const full = phase.value === "full";
  return {
    top: full ? "0px" : `${rect.value.top}px`,
    left: full ? "0px" : `${rect.value.left}px`,
    width: full ? "100vw" : `${rect.value.width}px`,
    height: full ? "100vh" : `${rect.value.height}px`,
    // Hidden while small, so the gallery cannot spill out of the card.
    overflow: full ? "auto" : "hidden",
  };
});

let closeTimer: ReturnType<typeof setTimeout> | undefined;
let frameA = 0;
let frameB = 0;

function cancelFrames() {
  cancelAnimationFrame(frameA);
  cancelAnimationFrame(frameB);
}

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

async function enter() {
  clearTimeout(closeTimer);
  cancelFrames();
  mounted.value = true;
  phase.value = "from";
  document.documentElement.style.overflow = "hidden";

  // Let the browser paint the small "from" box once, then grow it.
  await nextTick();
  frameA = requestAnimationFrame(() => {
    frameB = requestAnimationFrame(() => {
      phase.value = "full";
    });
  });
}

function leave() {
  if (!mounted.value) return;
  cancelFrames();
  phase.value = "from";
  document.documentElement.style.overflow = "";
  closeTimer = setTimeout(
    () => {
      mounted.value = false;
    },
    reducedMotion() ? 0 : CLOSE_MS,
  );
}

watch(
  () => props.open,
  (open) => (open ? enter() : leave()),
);

onBeforeUnmount(() => {
  clearTimeout(closeTimer);
  cancelFrames();
  document.documentElement.style.overflow = "";
});
</script>

<template>
  <div v-if="mounted" class="lightbox-box fixed z-[100] box-border bg-panel" :style="boxStyle" role="dialog"
    aria-modal="true" aria-label="Project showcase gallery">
    <div class="lightbox-body" :style="{ opacity: phase === 'full' ? 1 : 0 }">
      <div class="sticky top-0 z-[2] flex items-center justify-between bg-panel px-[clamp(20px,3vw,48px)] py-5">
        <span class="text-[11px] font-bold">Project Showcase — LAM-VINC MCBILLS Furniture</span>
        <button type="button"
          class="cursor-pointer rounded-full border border-ink bg-panel px-[18px] py-2 text-[12px] font-bold text-ink transition-colors hover:bg-ink hover:text-panel"
          @click="emit('close')">
          Close ✕
        </button>
      </div>
      <div class="columns-3 gap-4 px-[clamp(20px,3vw,48px)] pb-12 pt-2 [column-width:260px]"
        :class="grayscale ? 'grayscale' : ''">
        <img v-for="img in gallery" :key="img.src" :src="img.src" :alt="img.alt" loading="lazy"
          class="mb-4 block w-full break-inside-avoid" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.lightbox-box {
  transition:
    top 0.55s cubic-bezier(0.7, 0, 0.3, 1),
    left 0.55s cubic-bezier(0.7, 0, 0.3, 1),
    width 0.55s cubic-bezier(0.7, 0, 0.3, 1),
    height 0.55s cubic-bezier(0.7, 0, 0.3, 1);
}

.lightbox-body {
  transition: opacity 0.35s ease 0.3s;
}

@media (prefers-reduced-motion: reduce) {

  .lightbox-box,
  .lightbox-body {
    transition: none;
  }
}
</style>
