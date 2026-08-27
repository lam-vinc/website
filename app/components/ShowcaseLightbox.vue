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

const rect = computed(
  () => props.originRect ?? { top: 0, left: 0, width: 0, height: 0 },
);

watch(
  () => props.open,
  (open) => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  },
);
onBeforeUnmount(() => {
  document.documentElement.style.overflow = "";
});
</script>

<template>
  <Transition name="lightbox">
    <div
      v-if="open"
      class="fixed inset-0 z-[100] bg-panel box-border"
      :style="{
        top: rect.top + 'px',
        left: rect.left + 'px',
        width: rect.width + 'px',
        height: rect.height + 'px',
      }"
    >
      <div class="h-full overflow-y-auto">
        <div
          class="sticky top-0 z-[2] flex items-center justify-between bg-panel px-[clamp(20px,3vw,48px)] py-5"
        >
          <span class="text-[11px] font-bold"
            >Project Showcase — LAM-VINC MCBILLS Furniture</span
          >
          <button
            type="button"
            class="cursor-pointer rounded-full border border-ink bg-panel px-[18px] py-2 text-[12px] font-bold text-ink transition-colors hover:bg-ink hover:text-panel"
            @click="emit('close')"
          >
            Close ✕
          </button>
        </div>
        <div
          class="columns-3 gap-4 px-[clamp(20px,3vw,48px)] pb-12 pt-2 [column-width:260px]"
          :class="grayscale ? 'grayscale' : ''"
        >
          <img
            v-for="img in gallery"
            :key="img.src"
            :src="img.src"
            :alt="img.alt"
            class="mb-4 block w-full break-inside-avoid"
          />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition:
    top 0.55s cubic-bezier(0.7, 0, 0.3, 1),
    left 0.55s cubic-bezier(0.7, 0, 0.3, 1),
    width 0.55s cubic-bezier(0.7, 0, 0.3, 1),
    height 0.55s cubic-bezier(0.7, 0, 0.3, 1);
}
.lightbox-enter-from,
.lightbox-leave-to {
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
}
</style>
