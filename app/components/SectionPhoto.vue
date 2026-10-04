<script setup lang="ts">
import type { SectionImage } from "~/composables/useSectionImages";

const props = defineProps<{
  /** Null until useSectionImages draws for this session. */
  image: SectionImage | null;
  /** Master switch: false shows every photo in colour, hover or not. */
  grayscale: boolean;
  /** Set on the first photo in the page so it is not queued behind the rest. */
  eager?: boolean;
}>();

const imgEl = ref<HTMLImageElement | null>(null);
const loaded = ref(false);

watch(
  () => props.image?.src,
  async () => {
    loaded.value = false;
    await nextTick();
    // A cached photo can finish before the load listener ever fires.
    if (imgEl.value?.complete && imgEl.value.naturalWidth > 0) loaded.value = true;
  },
);
</script>

<template>
  <!-- The parent band sets the height and carries `group`, so hovering
       anywhere over the band — including the showcase's click overlay —
       brings the photo back into colour. -->
  <div class="h-full w-full overflow-hidden bg-hairline">
    <img v-if="image" ref="imgEl" :key="image.src" :src="withBase(image.src)" :alt="image.alt"
      :style="image.position ? { objectPosition: image.position } : undefined"
      :fetchpriority="eager ? 'high' : undefined" :loading="eager ? 'eager' : 'lazy'"
      :class="[loaded ? 'is-loaded' : '', grayscale ? 'is-mono' : '']"
      class="section-photo block h-full w-full object-cover" @load="loaded = true" />
  </div>
</template>

<style scoped>
/* Written as plain CSS rather than Tailwind's group-hover variant: both would
   set --tw-grayscale on the same element, and the variant loses that cascade. */
.section-photo {
  opacity: 0;
  transition:
    opacity 0.5s ease-out,
    filter 0.5s ease-out;
}

.section-photo.is-loaded {
  opacity: 1;
}

.section-photo.is-mono {
  filter: grayscale(1);
}

/* Only on real pointers. On a touch screen :hover sticks after a tap, which
   would leave one photo in colour for the rest of the visit. */
@media (hover: hover) {
  .group:hover .section-photo.is-mono {
    filter: grayscale(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .section-photo {
    transition: none;
  }
}
</style>
