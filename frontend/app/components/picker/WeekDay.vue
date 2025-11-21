<script lang="ts" setup>
import type {WeekDay} from "~/types/data";

const model = defineModel<WeekDay>({
  default: 'Monday'
})

const weekdays: WeekDay[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
</script>

<template>
  <USelectMenu
      v-model="model"
      :items="weekdays"
      :search-input="false"
      :ui="{ viewport: 'm-auto' }"
      class="cursor-pointer w-36"
      color="primary"
      highlight
      highlight-on-hover
      variant="soft"
  />
</template>