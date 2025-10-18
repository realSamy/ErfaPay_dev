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
import type {DropdownMenuItem} from "#ui/components/DropdownMenu.vue";

const emit = defineEmits<{
  (event: 'update:modelValue', isOpen: boolean): void
}>()

const {t} = useI18n();
const isOpen = ref(false)
const items: ComputedRef<DropdownMenuItem[]> = computed(() => [
  {
    label: t('services.labels.internal_payment'),
    icon: 'mdi:currency-usd'
  },
  {
    label: t('services.labels.money_transfer'),
    icon: 'mdi:bank-transfer-out'
  },
  {
    label: t('services.labels.charge_account'),
    icon: 'mdi:cash-plus'
  }
])
</script>
<style scoped>

</style>