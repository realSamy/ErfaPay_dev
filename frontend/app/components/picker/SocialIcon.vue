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
import {icons} from '@iconify-json/bxl'

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
const prefix = icons.prefix
const items = computed<string[]>(() => Object.getOwnPropertyNames(icons.icons).map(i => `${prefix}:${i}`))

function onCreate(item: string) {
  items.value.push(item)

  selectedIcon.value = item
}
</script>