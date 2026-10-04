<script setup lang="ts">
const grayscale = ref(true);
// One random photo per section, fixed for the browser session.
const sectionImages = useSectionImages();
const showcaseOpen = ref(false);
const originRect = ref<{
  top: number;
  left: number;
  width: number;
  height: number;
} | null>(null);
const showcasePanel = ref<InstanceType<typeof ShowcasePanel> | null>(null);

function openShowcase() {
  // The overlay grows out of the white showcase card, so measure the card.
  const el = showcasePanel.value?.panelEl;
  const r = el?.getBoundingClientRect();
  originRect.value = r
    ? { top: r.top, left: r.left, width: r.width, height: r.height }
    : { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  showcaseOpen.value = true;
}

function closeShowcase() {
  showcaseOpen.value = false;
}

onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape" && showcaseOpen.value) closeShowcase();
  };
  document.addEventListener("keydown", onKey);
  onBeforeUnmount(() => document.removeEventListener("keydown", onKey));
});
</script>

<template>
  <div class="flex flex-col">
    <div
      class="flex min-h-screen w-full snap-center items-center justify-center box-border p-6 px-[clamp(16px,4vw,64px)]">
      <HeroPanel :grayscale="grayscale" :image="sectionImages.hero" />
    </div>
    <div
      class="flex min-h-screen w-full snap-center items-center justify-center box-border p-6 px-[clamp(16px,4vw,64px)]">
      <AboutPanel :grayscale="grayscale" :image="sectionImages.about" />
    </div>
    <div
      class="flex min-h-screen w-full snap-center items-center justify-center box-border p-6 px-[clamp(16px,4vw,64px)]">
      <ShowcasePanel ref="showcasePanel" :grayscale="grayscale" :image="sectionImages.showcase"
        @open="openShowcase" />
    </div>
    <div
      class="flex min-h-screen w-full snap-center items-center justify-center box-border p-6 px-[clamp(16px,4vw,64px)]">
      <ContactPanel />
    </div>

    <ShowcaseLightbox :open="showcaseOpen" :origin-rect="originRect" @close="closeShowcase" />
  </div>
</template>
