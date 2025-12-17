<script lang="ts" setup>

import type {ModalConfirmProps} from "~/types/props";

const props = withDefaults(defineProps<ModalConfirmProps>(), {
  title: 'تایید عملیات',
  message: 'آیا مطمئن هستید؟',
  cancelLabel: 'انصراف',
  cancelColor: 'neutral',
  confirmLabel: 'تایید',
  confirmColor: 'primary',
})

</script>

<template>
  <UModal :close="{ onClick: props.onCancel }" description=" ">
    <template #title>
      <h3 class="text-lg font-bold">{{ title }}</h3>
    </template>

    <template #description>
      <div class="text-center leading-relaxed">
        {{ message }}
      </div>
    </template>

    <template #footer>
      <div class="flex justify-center gap-4">
        <UButton
            :color="cancelColor"
            :label="cancelLabel"
            :trailing-icon="props.cancelIcon"
            variant="outline"
            @click="props.onCancel?.()"
        />
        <UButton
            :color="confirmColor"
            :label="confirmLabel"
            :trailing-icon="props.confirmIcon"
            @click="props.onConfirm?.()"
        />
      </div>
    </template>
  </UModal>
</template>