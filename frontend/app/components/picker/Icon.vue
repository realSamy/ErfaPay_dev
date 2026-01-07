<template>
  <UFieldGroup :label="label" :size="size" v-bind="$attrs">
    <USelectMenu
        v-model="selectedIcon"
        :icon="selectedIcon"
        :items="items"
        :ui="{group: 'flex flex-wrap', item: 'w-auto'}"
        class="w-full"
        create-item
        placeholder="جستجو و انتخاب نماد..."
        @create="onCreate"
    >
      <template #item="{ item }">
        <UIcon :name="item" size="40"/>
      </template>

      <template #create-item-label="{ item }">
        <UIcon :name="item" size="40"/>
      </template>
    </USelectMenu>
  </UFieldGroup>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue?: string
  label?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const selectedIcon = computed({
  get: () => props.modelValue || '',
  set: (val) => emit('update:modelValue', val)
})

const items = ref<string[]>([
  'material-symbols:finance-chip-outline',
  'material-symbols:finance-mode-rounded',
  'material-symbols:finance-rounded',
  'material-symbols:encrypted-rounded',
  'material-symbols:send-money-rounded',
  'material-symbols:attach-money-rounded',
  'material-symbols:payments-rounded',
  'material-symbols:currency-exchange-rounded',
  'material-symbols:receipt-rounded',
  'material-symbols:currency-bitcoin-rounded',
  'material-symbols:admin-panel-settings-rounded',
  'material-symbols:support-agent-rounded',
  'material-symbols:shopping-cart-rounded',
  'material-symbols:savings-rounded',
  'material-symbols:transfer-within-a-station-rounded',
  'material-symbols:request-quote-rounded',
  'material-symbols:description-rounded',
  'material-symbols:euro-symbol-rounded',
  'material-symbols:currency-pound-rounded',
  'material-symbols:trending-up-rounded',
  'material-symbols:local-atm-rounded',
  'material-symbols:money-rounded',
  'material-symbols:local-taxi-rounded',
  'material-symbols:local-shipping-rounded',
  'material-symbols:local-dining-rounded',
  'material-symbols:local-bar-rounded',
  'material-symbols:local-car-wash-rounded',
])

function onCreate(item: string) {
  items.value.push(item)

  selectedIcon.value = item
}
</script>