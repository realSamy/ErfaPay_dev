<template>
  <div class="space-y-20">
    <section>
      <h1 class="font-bold text-3xl">نمای کلی حساب شما در یک نگاه</h1>
      <p>خلاصه‌ی اطلاعات مالی حساب، موجودی و سفارشات شما</p>
    </section>
    <section class="space-y-8">
      <h2 class="font-bold text-2xl">وضعیت کیف پول:</h2>
      <div class="w-full flex justify-center">
        <CardWallet/>
      </div>
    </section>
    <section class="space-y-8">
      <h2 class="font-bold text-2xl">سرویس های محبوب ارفاپی:</h2>
      <div class="flex flex-wrap justify-center gap-12">
        <CardService v-for="service in services" :item="service"/>
      </div>
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