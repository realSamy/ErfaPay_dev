<template>
  <UDropdownMenu
      v-model:open="isOpen"
      :content="{
        sideOffset: 20,
      }"
      :items="items"
      class=""
      :ui="{
        content: 'w-48 rounded-none rounded-b-md p-0 shadow-lg shadow-primary/50 ring-transparent',
        group: 'p-0 ',
        item: 'p-3 border-s-transparent border-s-3 hover:border-s-primary-500 ' +
         'hover:bg-white/90 dark:hover:bg-primary/20 hover:text-primary',
          itemLeadingIcon: 'group-hover:text-primary'
          }"
      @update:open="(_i) => emit('update:modelValue', _i)"

  >
    <UButton
        :label="t('common.labels.services')"
        :ui="{trailingIcon: 'text-primary'}"
        color="neutral"
        dir="ltr"
        trailing-icon="mdi:menu"
        variant="ghost"
    />
  </UDropdownMenu>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (event: 'update:modelValue', isOpen: boolean): void
}>()

const {t, locale} = useI18n();
const isOpen = ref(false)
const {services} = await useLoadServicesStore()


const items = computed(() => {
  return services.value.map(service => ({
    label: service[`title_${locale.value}`],
    icon: service.icon,
    to: useLocalePath()({name: 'dashboard-orders-new-id', params: {id: service.id}})
  }))
})

</script>
<style scoped>

</style>