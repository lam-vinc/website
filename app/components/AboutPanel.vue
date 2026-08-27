<script setup lang="ts">
defineProps<{ grayscale: boolean }>();
</script>

<template>
  <section
    id="v2-about"
    class="bg-panel mx-auto w-full max-w-[1360px] box-border p-[clamp(20px,2.5vw,36px)]"
  >
    <div class="grid grid-cols-[0.9fr_1.1fr] gap-[clamp(28px,4vw,64px)]">
      <div class="flex min-h-[min(480px,60vh)] flex-col justify-between gap-12">
        <h2
          class="m-0 max-w-[340px] text-[clamp(22px,2vw,30px)] font-bold leading-[1.2] tracking-[-0.01em]"
        >
          Crafting Furniture, Measured to the Millimetre
        </h2>
        <p class="m-0 max-w-[380px] text-[12.5px] leading-[1.55] text-body">
          At LAM-VINC MCBILLS, we don't just build furniture — we build it
          around how you live and work. From our workshop on the Lekki-Epe
          Expressway we deliver kitchens, wardrobes, doors, media walls and full
          fit-outs for individuals, organisations and large development
          projects. Solid timber and quality board, stainless steel fittings,
          glass and stone — every commission is measured, drawn and approved
          before we make the first cut.
        </p>
      </div>
      <div class="h-[min(526px,64vh)]" :class="grayscale ? 'grayscale' : ''">
        <img
          src="/images/about-media-wall.webp"
          alt="Teak media wall"
          class="block h-full w-full object-cover"
        />
      </div>
    </div>
  </section>
</template>
