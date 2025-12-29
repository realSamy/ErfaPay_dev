<template>
  <div class="space-y-10">
    <section>
      <h1 class="font-bold text-3xl">{{ $t('wallet.overview') }}</h1>
      <p>{{ $t('wallet.overview_desc') }}</p>
    </section>
    <section class="space-y-8">
      <h2 class="font-bold text-2xl">{{ $t('wallet.wallet_overview') }}:</h2>
      <div class="w-full flex justify-center">
        <CardWallet/>
      </div>
    </section>
    <section class="space-y-8">
      <h2 class="font-bold text-2xl">{{ $t('wallet.wallet_add_charge') }}:</h2>
      <div class="w-full flex justify-center">
        <ChargeAccount/>
      </div>
    </section>
    <section class="space-y-8">
      <h2 class="font-bold text-2xl">{{ $t('wallet.popular_services') }}:</h2>
      <div class="flex flex-wrap justify-center gap-12">
        <CardService v-for="service in services" :item="service"/>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import ChargeAccount from "~/components/ChargeAccount.vue";

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth'],
})

const {services} = await useLoadServicesStore()


</script>
