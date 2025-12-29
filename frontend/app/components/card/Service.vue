<template>
  <UCard
      :ui="{
    body: 'grow border-transparent',
    header: 'border-transparent',
    root: 'flex flex-col'
      }"
      class="w-full md:w-55 h-auto bg-primary text-white">
    <p>{{ item[`description_${locale}`] }}</p>

    <template #header>
      <div class="flex justify-between items-center">
        <h3 class="font-bold text-md">{{ item[`title_${locale}`] }}</h3>
        <UIcon :name="item.icon" size="30"/>
      </div>
    </template>

    <template #footer>
      <div class="w-full flex justify-center items-center">
        <UButton
            :label="$t('services.labels.button_new_order')"
            :trailing-icon="directionalIcon('mdi:chevron-left', 'mdi:chevron-right')"
            class="mt-3 bg-white text-black dark:text-black hover:bg-primary-800 hover:text-white"
            variant="ghost"
            :to="useLocalePath()({ name: 'dashboard-orders-new-id', params: { id: item.id } })"
            size="xl"/>
      </div>
    </template>
  </UCard>
</template>
<script lang="ts" setup>
import type {Service} from "~/types/services";

defineProps<{
  item: Service
}>()

const {locale} = useI18n()
</script>


<style scoped>

</style>