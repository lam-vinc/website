<script setup lang="ts">
defineProps<{ grayscale: boolean }>();
const emit = defineEmits<{ open: [] }>();
const triggerEl = ref<HTMLElement | null>(null);
defineExpose({ triggerEl });
</script>

<template>
  <section id="v2-work" class="bg-panel mx-auto w-full max-w-[1360px] box-border p-[clamp(20px,2.5vw,36px)]">
    <span class="block pb-4 text-[11px] font-bold">Project Showcase</span>
    <div class="relative h-[max(320px,min(44vw,56vh))]">
      <div class="h-full" :class="grayscale ? 'grayscale' : ''">
        <img src="/images/showcase-marble-wall.jpeg" alt="Marble media wall" class="block h-full w-full object-cover" />
      </div>
      <button ref="triggerEl" type="button"
        class="absolute inset-0 flex cursor-pointer items-center justify-center bg-[rgba(17,17,17,0.32)] transition-colors duration-200 hover:bg-[rgba(17,17,17,0.52)]"
        @click="emit('open')">
        <span class="text-[clamp(20px,2.2vw,32px)] font-bold tracking-[-0.01em] text-white">View the Showcase →</span>
      </button>
    </div>
    <div class="grid grid-cols-[1fr_1.4fr] items-baseline gap-8 pt-[clamp(20px,2.5vw,32px)]">
      <h3 class="m-0 text-[clamp(19px,1.7vw,24px)] font-bold tracking-[-0.01em]">
        Selected Work
      </h3>
      <p class="m-0 text-[12px] text-body">
        — Kitchens, wardrobes, media walls and full fit-outs across Lagos.
      </p>
    </div>
  </section>
</template>
