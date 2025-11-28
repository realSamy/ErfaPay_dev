<script setup lang="ts">
interface Props {
  title?: string
  message?: string
  cancelLabel?: string
  cancelColor?: "error" | "neutral" | "primary" | "success" | "secondary" | "info" | "warning" | undefined
  confirmLabel?: string
  confirmColor?: "error" | "neutral" | "primary" | "success" | "secondary" | "info" | "warning" | undefined
}

withDefaults(defineProps<Props>(), {
  title: 'تایید',
  message: 'آیا مطمئن هستید؟',
  cancelLabel: 'انصراف',
  cancelColor: 'neutral',
  confirmLabel: 'تایید',
  confirmColor: 'primary',
})

const emit = defineEmits<{ close: [boolean] }>()

const handleCancel = () => emit('close', false)
const handleConfirm = () => emit('close', true)
</script>

<template>
  <UModal
    :close="{ onClick: handleCancel }"
    :title="title"
    :ui="{ footer: 'justify-end space-x-2' }"
  >
    <template #body>
      <div class="p-4 leading-relaxed">
        {{ message }}
      </div>
    </template>

    <template #footer>
      <div class="flex gap-2">
        <UButton
          :color="cancelColor"
          variant="outline"
          :label="cancelLabel"
          @click="handleCancel"
        />
        <UButton
          :color="confirmColor"
          :label="confirmLabel"
          @click="handleConfirm"
        />
      </div>
    </template>
  </UModal>
</template>