<template>
  <div class="space-y-20">
    <section>
      <h1 class="font-bold text-3xl">تمامی سفارشات شما در یکجا</h1>
      <p>با امکان پیگیری، مشاهده وضعیت و دسترسی سریع به جزئیات</p>
    </section>

    <section class="space-y-8">
      <h2 class="font-bold text-2xl">ثبت سفارش جدید:</h2>
      <div class="flex flex-wrap justify-center gap-12">
        <CardService v-for="service in services" :item="service"/>
      </div>
    </section>

    <section class="space-y-8">
      <h2 class="font-bold text-2xl">سفارشات پیشین:</h2>
      <TableOrders />
    </section>
  </div>
</template>

<script lang="ts" setup>
import type {ServiceItem} from "~/types/data";

definePageMeta({
  layout: 'dashboard'
})

const services = useState<ServiceItem[]>('services')
</script>

<style scoped>

</style>