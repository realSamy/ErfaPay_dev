<template>
  <UModal v-model:open="isOpen" :description="$t('modals.required_fields.title')"
          :dismissible="false" :title="$t('modals.required_fields.title')"
          transition>
    <UButton
        :icon="modelValue.icon || 'material-symbols:indeterminate-question-box'"
        color="neutral"
        size="xl"
        variant="outline"
    >
      <span :class="{'text-error': incomplete}">{{ buttonLabel }}</span>
    </UButton>
    <template #content>
      <UForm ref="form" @submit.prevent="handleSave">
        <UCard>
          <template #header>
            <div class="flex justify-between items-center">
              <h3>{{ $t('common.erfapay.social') }}</h3>
              <UButton
                  class="-mr-2"
                  color="neutral"
                  icon="i-heroicons-x-mark-20-solid"
                  variant="ghost"
                  @click="handleClose"
              />
            </div>
          </template>

          <div class="space-y-2">
            <UFormField :label="$t('modals.social_link.labels.title')" required help="e.g. Instagram">
              <UInput v-model="payload.title" class="w-full" required/>
            </UFormField>
            <UFormField :label="$t('modals.social_link.labels.link')" required help="e.g. https://instagram.com/erfapay">
              <UInput dir="ltr" type="link" v-model="payload.link" class="w-full" required/>
            </UFormField>
            <UFormField :label="$t('modals.social_link.labels.icon')" required>
              <PickerSocialIcon v-model="payload.icon" class="w-full" required/>
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
                    :disabled="incomplete"
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
import type {SocialLinkItem} from "~/types/settings";

const props = defineProps<{
  modelValue: SocialLinkItem
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: SocialLinkItem): void
  (e: 'delete'): void
}>()

const incomplete = computed<boolean>(() => {
  return !payload.value.link || ['http://', 'https://'].includes(payload.value.link) || !payload.value.icon || !payload.value.title
})

const isOpen = ref(false)

const payload = ref(<SocialLinkItem>{...toRaw(props.modelValue)})
const buttonLabel = computed(() => {
  return props.modelValue.title || ''
})

onMounted(() => {
  if (incomplete.value) {
    isOpen.value = true
  }
})

watch(isOpen, () => {
  if (isOpen.value) {
    payload.value = {...toRaw(props.modelValue)}
  }
}, {deep: true})


const handleSave = () => {
  if (incomplete.value){
    useToast().add({
      title: 'Success',
      description: 'Success',
      color: 'error',
    })
    return
  }
  emit('update:modelValue', payload.value)
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