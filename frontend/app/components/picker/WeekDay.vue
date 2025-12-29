<script lang="ts" setup>
import type {WeekDayNumber} from "~/types/data";

const model = defineModel<WeekDayNumber>({
  default: 0
})
const {t} = useI18n()

const weekdays = ref<{label: string, value: WeekDayNumber}[]>([
  {label: t('common.weekdays.monday'), value: 0},
  {label: t('common.weekdays.tuesday'), value: 1},
  {label: t('common.weekdays.wednesday'), value: 2},
  {label: t('common.weekdays.thursday'), value: 3},
  {label: t('common.weekdays.friday'), value: 4},
  {label: t('common.weekdays.saturday'), value: 5},
  {label: t('common.weekdays.sunday'), value: 6},
]
)</script>

<template>
  <USelectMenu
      v-model="model"
      :items="weekdays"
      value-key="value"
      :search-input="false"
      :ui="{ viewport: 'm-auto' }"
      class="cursor-pointer w-36"
      color="primary"
      highlight
      highlight-on-hover
      variant="soft"
  />
</template>