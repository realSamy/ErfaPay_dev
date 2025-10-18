<template>
  <div class="flex flex-col grow min-h-screen min-w-screen">
    <Overlay v-if="showOverlay"/>
    <LayoutHeader v-model="showOverlay"/>

    <slot/>

    <LayoutFooter/>
  </div>
</template>
<style scoped>

</style>

<script lang="ts" setup>
const showOverlay = ref(false)
</script>