<script setup lang="ts">
const grayscale = ref(true);
const showcaseOpen = ref(false);
const originRect = ref<{
  top: number;
  left: number;
  width: number;
  height: number;
} | null>(null);
const showcasePanel = ref<InstanceType<typeof ShowcasePanel> | null>(null);

function openShowcase() {
  const el = showcasePanel.value?.triggerEl;
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
      class="flex min-h-screen w-full items-center justify-center box-border p-6 px-[clamp(16px,4vw,64px)] scroll-snap-align-center"
    >
      <HeroPanel :grayscale="grayscale" />
    </div>
    <div
      class="flex min-h-screen w-full items-center justify-center box-border p-6 px-[clamp(16px,4vw,64px)] scroll-snap-align-center"
    >
      <AboutPanel :grayscale="grayscale" />
    </div>
    <div
      class="flex min-h-screen w-full items-center justify-center box-border p-6 px-[clamp(16px,4vw,64px)] scroll-snap-align-center"
    >
      <ShowcasePanel
        ref="showcasePanel"
        :grayscale="grayscale"
        @open="openShowcase"
      />
    </div>
    <div
      class="flex min-h-screen w-full items-center justify-center box-border p-6 px-[clamp(16px,4vw,64px)] scroll-snap-align-center"
    >
      <ContactPanel />
    </div>

    <!-- ShowcaseLightbox added in Task 9 -->
  </div>
</template>
