<template>
  <div class="space-y-20">
    <div>
      <h1 class="font-bold text-3xl">تیکت های پشتیبانی</h1>
      <p>تاریخچه و وضعیت درخواست های پشتیبانی</p>
    </div>
    <div>
      <UButton size="xl" label="ثبت تیکت جدید" trailing-icon="mdi:plus" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {ServiceItem} from "~/types/data";

definePageMeta({
  layout: 'dashboard'
})

</script>

<style scoped>

</style>