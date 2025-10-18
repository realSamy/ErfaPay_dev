<template>
  <UCard
      :ui="{
    body: 'grow',
    root: 'flex flex-col'
      }"
      class="w-full md:w-55 bg-ui-highlight">
    <p>{{ $t(item.description) }}</p>

    <template #header>
      <div class="flex justify-between items-center">
        <h3 class="font-bold text-md">{{ $t(item.title) }}</h3>
        <UIcon :name="item.icon" class="text-primary" size="30"/>
      </div>
    </template>

    <template #footer>
      <div class="w-full flex justify-center items-center">
        <UButton
            :label="$t(item.cta_label)"
            :trailing-icon="cta_icon"
            class="mt-3"
            size="xl"/>
      </div>
    </template>
  </UCard>
</template>
<script lang="ts" setup>
import type {BenefitItem} from "~/types/data";

// @ts-ignore
const cta_icon = computed(() => directionalIcon(...props.item.cta_icon))
const props = defineProps<{
  item: BenefitItem
}>()
</script>


<style scoped>

</style>