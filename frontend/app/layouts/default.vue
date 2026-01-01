<template>
  <div class="flex flex-col grow min-h-screen min-w-screen">
    <Overlay v-if="showOverlay"/>
    <LayoutHeader v-model="showOverlay"/>

    <NuxtPage :transition="{ name: 'page', mode: 'out-in' }"/>
    <ClientOnly>
      <FloatingChat/>
    </ClientOnly>
    <LayoutFooter/>
  </div>
</template>

<script lang="ts" setup>

const showOverlay = ref(false)
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>