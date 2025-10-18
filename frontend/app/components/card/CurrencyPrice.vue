<template>
  <UCard :ui="{
    root:'flex flex-row w-fit shadow-ui-tertiary/50 ui-shadow-center shadow-md bg-transparent w-70 ring-transparent -divide-y',
    header: 'flex justify-center items-center gap-2 bg-ui-tertiary',
    body: 'flex justify-center items-center bg-ui-secondary w-full'
  }">
    <template #header>
      <UIcon :name="item.icon??''" class="rounded-full size-8 ring-white ring-1"/>
      <span class="text-white font-extrabold tight-line-height">{{ item.code }}</span>
    </template>
    <span class="text-sm font-medium text-center tight-line-height">
      {{ item.rate.toLocaleString(locale) }}
    </span>
  </UCard>
</template>

<script lang="ts" setup>
import type {CurrencyItem} from "~/types/data";
const {locale} = useI18n();
defineProps<{
  item: CurrencyItem
}>()
</script>

<style scoped>
.tight-line-height {
  line-height: 1;
  margin-top: 4px;
}
</style>