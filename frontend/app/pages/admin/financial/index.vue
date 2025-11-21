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
  title: 'pages.admin.title.financial'
})


</script>

<style scoped>
</style>