<template>
  <UModal v-model:open="isOpen" :description="$t('modals.required_fields.title')" :dismissible="false" :title="$t('modals.required_fields.title')"
          transition>
    <UButton
        :icon="typeIcons[modelValue.type] || 'material-symbols:indeterminate-question-box'"
        class="mb-2"
        color="neutral"
        variant="outline"
        size="xl"
    >
      <span class="font-bold">[{{ $t(`common.field_types.${props.modelValue.type}`) }}]</span>
      <span :class="{'text-error': incomplete}">{{ buttonLabel }}</span>
    </UButton>
    <template #content>
      <UForm ref="form" @submit.prevent="handleSave">
        <UCard>
          <template #header>
            <div class="flex justify-between items-center">
              <h3>{{ $t('modals.required_fields.title') }}</h3>
              <UButton
                  class="-mr-2"
                  color="neutral"
                  icon="i-heroicons-x-mark-20-solid"
                  variant="ghost"
                  @click="handleClose"
              />
            </div>
          </template>

          <div class="space-y-4">
            <UFormField :label="$t('modals.required_fields.type')" name="type" required size="lg">
              <USelect
                  v-model="localField.type"
                  :items="typeOptions"
                  class="w-full"
              />
            </UFormField>

            <UFormField :label="$t('modals.required_fields.label_fa')" name="label_fa" required size="lg">
              <UInput v-model="localField.label_fa" class="w-full" required/>
            </UFormField>

            <UFormField :label="$t('modals.required_fields.label_en')" name="label_en" required size="lg">
              <UInput v-model="localField.label_en" class="w-full" required/>
            </UFormField>

            <UFormField :label="$t('modals.required_fields.description_fa')" name="description_fa" size="lg">
              <UTextarea v-model="localField.description_fa" class="w-full"/>
            </UFormField>

            <UFormField :label="$t('modals.required_fields.description_en')" name="description_en" size="lg">
              <UTextarea v-model="localField.description_en" class="w-full"/>
            </UFormField>

            <UFormField v-if="localField.type === 'select'" :label="$t('modals.required_fields.options')" name="options"
                        required
                        size="lg">
              <UTextarea v-model="optionsText"
                         :placeholder="$t('modals.required_fields.options_placeholder')" class="w-full"
                         required
              />
            </UFormField>

            <UFormField name="is_required" size="lg">
              <UCheckbox v-model="localField.is_required" :label="$t('modals.required_fields.is_required')"
                         class="cursor-pointer"
                         variant="card"/>
            </UFormField>
          </div>

          <template #footer>
            <div class="flex justify-between">
              <UButton
                  :label="$t('common.labels.delete')"
                  color="error"
                  size="lg"
                  variant="outline"
                  @click="handleDelete"
              />
              <div class="flex gap-2">
                <UButton
                    :label="$t('common.labels.cancel')"
                    color="neutral"
                    size="lg"
                    variant="outline"
                    @click="handleClose"
                />
                <UButton
                    :label="$t('common.labels.save')"
                    size="lg"
                    type="submit"
                />
              </div>
            </div>
          </template>
        </UCard>
      </UForm>

    </template>
  </UModal>
</template>

<script lang="ts" setup>
import type {RequiredField} from '~/types/services'
import {compare} from "#ui/utils"; // Adjust path as needed

const props = defineProps<{
  modelValue: RequiredField
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: RequiredField): void
  (e: 'delete'): void
}>()

const incomplete = computed<boolean>(() => {
  return !props.modelValue.label_fa || !props.modelValue.label_en
})

const {t} = useI18n()

const isOpen = ref(false)
const localField = ref<RequiredField>(JSON.parse(JSON.stringify(toRaw(props.modelValue))))
const optionsText = ref('')

const typeIcons = {
  text: 'material-symbols:edit-outline',
  number: 'material-symbols:numbers-rounded',
  textarea: 'material-symbols:text-ad',
  file: 'material-symbols:upload-file',
  select: 'material-symbols:list-alt'
}

const typeOptions = [
  {value: 'text', label: t('common.field_types.text')},
  {value: 'number', label: t('common.field_types.number')},
  {value: 'textarea', label: t('common.field_types.textarea')},
  // {value: 'file', label: t('common.field_types.file')},
  {value: 'select', label: t('common.field_types.select')}
]

const buttonLabel = computed(() => {
  return props.modelValue.label_fa || props.modelValue.label_en || $t('modals.required_fields.unnamed')
})

watch(() => props.modelValue, (newVal) => {
  localField.value = toRaw(newVal)
  if (localField.value.options) {
    optionsText.value = localField.value.options.join('\n')
  }
}, {deep: true})

watch(isOpen, () => {
  localField.value = JSON.parse(JSON.stringify(toRaw(props.modelValue)))
  if (localField.value.options) {
    optionsText.value = localField.value.options.join('\n')
  } else {
    optionsText.value = ''
  }
})
watch(optionsText, (newVal) => {
  localField.value.options = newVal.split('\n').filter(opt => opt.trim())
})

onMounted(() => {
  if (!props.modelValue.label_fa && !props.modelValue.label_en) {
    isOpen.value = true
    if (!localField.value.options) {
      localField.value.options = []
    }
  } else if (props.modelValue.options) {
    optionsText.value = props.modelValue.options.join('\n')
  }
})


const handleSave = () => {
  emit('update:modelValue', localField.value)
  isOpen.value = false
}

const handleClose = () => {
  if (incomplete.value) {
    return handleDelete()
  }
  isOpen.value = false
}

const handleDelete = () => {
  emit('delete')
  isOpen.value = false
}
</script>