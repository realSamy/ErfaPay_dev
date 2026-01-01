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
            :disabled="!settings.is_available_now"
            :label="settings.is_available_now ? $t('services.labels.button_new_order') : $t('services.labels.orders_unavailable')"
            :trailing-icon="settings.is_available_now ? directionalIcon('mdi:chevron-left', 'mdi:chevron-right') : undefined"
            class="mt-3 bg-white text-black dark:text-black hover:bg-primary-800 hover:text-white"
            variant="ghost"
            :color="settings.is_available_now ? 'primary' : 'neutral'"
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

const settings = await useLoadGlobalSettingsStore()

const {locale} = useI18n()
</script>


<style scoped>

</style>