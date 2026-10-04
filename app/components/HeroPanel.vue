<script setup lang="ts">
import type { SectionImage } from "~/composables/useSectionImages";

defineProps<{ grayscale: boolean; image: SectionImage | null }>();
</script>

<template>
  <section class="bg-panel mx-auto w-full max-w-340 box-border p-[clamp(20px,2.5vw,36px)]">
      <div class="flex items-baseline justify-between gap-8 pb-2 h-20">
        <img src="/logo.png" alt="LAM-VINC MCBILLS Furniture" class="h-[clamp(30px,4vw,50px)] w-auto object-contain" />
        <span class="text-[13px] text-muted">Furniture &amp; Carpentry — Lagos</span >
      </div >
    <div class="group h-[max(320px,min(46vw,52vh))]">
      <SectionPhoto :image="image" :grayscale="grayscale" eager />
    </div>
    <div class="grid grid-cols-[1.2fr_1fr_0.8fr] items-baseline gap-8 pt-[clamp(24px,3vw,44px)]">
      <h1 class="m-0 text-[clamp(20px,1.8vw,26px)] font-bold tracking-[-0.01em]">
        Bespoke Furniture, Built to Last
      </h1>
      <p class="m-0 max-w-90 text-[12.5px] leading-normal text-body">
        We design and build custom furniture and fine carpentry for homes,
        offices and large developments across Lagos — measured, drawn and made
        in our own workshop.
      </p>
      <a href="#v2-contact" class="justify-self-end text-[clamp(18px,1.5vw,22px)] font-bold tracking-[-0.01em]">Request
        a Quote →</a>
    </div>
  </section>
</template>
