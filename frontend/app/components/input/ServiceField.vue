<template>
  <UFormField
    :label="currentLabel"
    :description="currentDescription"
    :required="field.is_required"
    :name="field.label_en || field.label_fa || 'field'"
    size="xl"
  >
    <!-- Text Input -->
    <UInput
      v-if="field.type === 'text'"
      v-model="localValue"
      :placeholder="currentLabel"
      size="lg"
      class="w-full"
    />

    <!-- Number Input -->
    <UInputNumber
      v-else-if="field.type === 'number'"
      v-model="localValue"
      :placeholder="currentLabel"
      size="lg"
      :min="0"
      class="w-full"
    />

    <!-- Textarea -->
    <UTextarea
      v-else-if="field.type === 'textarea'"
      v-model="localValue"
      :placeholder="currentLabel"
      :rows="5"
      size="lg"
      class="w-full"
    />

    <!-- Select Dropdown -->
    <USelect
      v-else-if="field.type === 'select' && field.options?.length"
      v-model="localValue"
      :items="selectOptions"
      :placeholder="currentLabel"
      class="w-full"
      size="lg"
    />
  </UFormField>
</template>

<script setup lang="ts">
import type { RequiredField } from '~/types/services'

const props = defineProps<{
  field: RequiredField
  modelValue: any
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const { locale } = useI18n()

const localValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const currentLabel = computed(() => {
  return locale.value === 'fa' ? props.field.label_fa : (props.field.label_en || props.field.label_fa)
})

const currentDescription = computed(() => {
  if (!props.field.description_fa && !props.field.description_en) return undefined
  return locale.value === 'fa'
    ? props.field.description_fa || props.field.description_en
    : props.field.description_en || props.field.description_fa
})

const selectOptions = computed(() => {
  return (props.field.options || []).map(option => ({
    label: option,
    value: option,
  }))
})
</script>