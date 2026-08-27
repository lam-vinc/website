<script setup lang="ts">
defineProps<{ grayscale: boolean }>();
</script>

<template>
  <section
    class="bg-panel mx-auto w-full max-w-[1360px] box-border p-[clamp(20px,2.5vw,36px)]"
  >
    <div
      class="flex items-baseline justify-between gap-8 pb-[clamp(20px,2.5vw,36px)]"
    >
      <span class="font-bold text-[clamp(20px,1.8vw,26px)] tracking-[-0.01em]"
        >LAM-VINC MCBILLS Furniture</span
      >
      <span class="text-[13px] text-muted"
        >Furniture &amp; Carpentry — Lagos</span
      >
    </div>
    <div
      class="h-[max(320px,min(46vw,52vh))]"
      :class="grayscale ? 'grayscale' : ''"
    >
      <img
        src="/images/hero-staircase.webp"
        alt="Staircase and panelling"
        class="block h-full w-full object-cover"
      />
    </div>
    <div
      class="grid grid-cols-[1.2fr_1fr_0.8fr] items-baseline gap-8 pt-[clamp(24px,3vw,44px)]"
    >
      <h1
        class="m-0 text-[clamp(20px,1.8vw,26px)] font-bold tracking-[-0.01em]"
      >
        Bespoke Furniture, Built to Last
      </h1>
      <p class="m-0 max-w-[360px] text-[12.5px] leading-[1.5] text-body">
        We design and build custom furniture and fine carpentry for homes,
        offices and large developments across Lagos — measured, drawn and made
        in our own workshop.
      </p>
      <a
        href="#v2-contact"
        class="justify-self-end text-[clamp(18px,1.5vw,22px)] font-bold tracking-[-0.01em]"
        >Request a Quote →</a
      >
    </div>
  </section>
</template>
