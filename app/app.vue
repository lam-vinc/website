<script setup lang="ts">
useHead({
  title: 'LAM-VINC MCBILLS Furniture — Bespoke Furniture & Carpentry, Lagos',
  meta: [
    { name: 'description', content: 'Bespoke furniture and fine carpentry for homes, offices and large developments across Lagos — measured, drawn and made in our own workshop.' },
    { name: 'theme-color', content: '#111111' },
  ],
  link: [
    // Without this, browsers look for /favicon.ico at the domain root, which
    // is outside the site when it is served from a subpath (GitHub Pages).
    { rel: 'icon', type: 'image/x-icon', href: withBase('/favicon.ico') },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300..900&display=swap' },
  ],
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
