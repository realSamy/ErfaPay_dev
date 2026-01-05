<template>
  <div>
    <ClientOnly>
      <div class="flex flex-col w-full gap-30 md:gap-15">
        <ChartCharges />
        <ChartOrders />
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'admin'],
  title: 'pages.admin.title.financial'
})


</script>

<style scoped>
</style>