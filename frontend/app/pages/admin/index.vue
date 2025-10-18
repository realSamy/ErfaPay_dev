<template>
  <div>
    <ClientOnly>
      <div class="flex flex-col md:flex-row w-full h-[400px]">
        <ChartLine/>
        <ChartLine/>
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
})


</script>

<style scoped>
</style>