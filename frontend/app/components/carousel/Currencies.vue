<template>
  <ClientOnly>
    <div v-if="!currencyItems?.length" class="flex w-full gap-10">
      <USkeleton class="cc-sk"/>
      <USkeleton class="cc-sk"/>
      <USkeleton class="cc-sk"/>
      <USkeleton class="cc-sk"/>
    </div>
    <UCarousel
        v-else
        v-slot="{item}"
        :auto-scroll="{
        speed: 1,
        stopOnInteraction: false,
        stopOnFocusIn: false,
        stopOnMouseEnter: true,
      }"
        :items="currencyItems"
        :ui="{
        item: 'basis-1/3',
        viewport: 'h-18'
       }"
        class="max-w-305 hidden md:flex"
        loop
    >
      <CardCurrencyPrice :item="item"/>
    </UCarousel>
    <div v-if="currencyItems?.length" class="md:hidden flex flex-col gap-2">
      <CardCurrencyPrice v-for="item in currencyItems" :item="item"/>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import type {CurrencyItem} from "~/types/data";
import {useLoadCurrenciesStore} from "~/composables/useLoadCurrenciesStore";

const currencyItems = await useLoadCurrenciesStore()


</script>

<style scoped>
.cc-sk {
  width: 280px;
  height: 66px;
}
</style>