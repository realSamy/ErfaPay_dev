<template>
  <div class="wallet-card">
    <h3 class="font-bold text-xl">{{$t('wallet.balance')}}:</h3>
    <div v-if="wallet">
      <p class="text-3xl font-bold"><span>{{$n(Number(wallet.balance))}} {{ $t('common.currencies.text.toman') }}</span></p>
    </div>
  </div>
</template>

<script setup lang="ts">
const {wallet, fetchWallet} = useWallet()

await fetchWallet();

</script>

<style scoped>
@reference "@/assets/css/main.css";

.wallet-card {
  @apply w-130 h-80 text-white flex ltr:pl-28 space-y-4 flex-col p-12 justify-center bg-[url('/img/dashboard/card.png')] bg-contain bg-center bg-no-repeat bg-[unset];
}
</style>