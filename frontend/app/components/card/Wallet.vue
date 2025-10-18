<template>
  <div class="wallet-card">
    <h3 class="font-bold text-xl">موجودی فعلی:</h3>
    <div>
      <p class="text-3xl font-bold"><span dir="ltr"><I18nN :value="999999999" scope="global"/> $</span></p>
      <p>معادل <span dir="ltr"><I18nN :value="999999999" scope="global"/></span> تومان</p>
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

.wallet-card {
  @apply w-130 h-80 text-white flex ltr:pl-28 space-y-4 flex-col p-12 justify-center bg-[url('/img/dashboard/card.png')] bg-contain bg-center bg-no-repeat bg-[unset];
}
</style>