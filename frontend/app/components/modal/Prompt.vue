<script lang="ts" setup>
import {reactive, watch} from 'vue'
import type {ModalPromptProps, PromptField} from "~/types/props";


const props = withDefaults(defineProps<ModalPromptProps<any>>(), {
  title: 'modals.prompts.defaults.title',
  message: ' ',
  confirmLabel: 'modals.prompts.defaults.confirm',
  confirmColor: 'primary',
  cancelLabel: 'modals.prompts.defaults.cancel',
  cancelColor: 'neutral',
})

const state = reactive({...props.modelValue})

watch(
    () => props.modelValue,
    (val) => Object.assign(state, val),
    {deep: true}
)

const detectType = (value: any): PromptField['type'] => {
  if (typeof value === 'number') return 'number'
  if (typeof value === 'boolean') return 'boolean'
  return 'text'
}

const form = useTemplateRef<HTMLFormElement>('form')

const submit = () => props.onConfirm?.({...state})
</script>

<template>
  <UModal :aria-description="message" :close="{ onClick: props.onCancel }" :description="message">
    <template #title>
      <h3 class="text-lg font-bold">{{ $t(props.title) }}</h3>
    </template>

    <template #body>
      <UForm ref="form" class="space-y-4 p-4" @submit.prevent="submit">
        <template v-for="(value, key) in state" :key="key">
          <UFormField v-if="props.fields?.[key]" :label="props.fields[key].label || key.toString()">
            <USelectMenu
                v-if="props.fields?.[key]?.type === 'select'"
                v-model="state[key]"
                :items="props.fields[key].options"
                :placeholder="props.fields[key].label || key.toString()"
                class="w-full"
                value-key="value"
                label-key="label"
                required
            />

            <UCheckbox
                v-else-if="detectType(value) === 'boolean'"
                v-model="state[key]"
                :label="props.fields?.[key]?.label || key.toString()"
            />

            <UInputNumber
                v-else-if="detectType(value) === 'number'"
                v-model="state[key]"
                :placeholder="props.fields?.[key]?.label || key.toString()"
                class="w-full"
                required
            />

            <UTextarea
                v-else-if="props.fields?.[key]?.type === 'textarea'"
                v-model="state[key]"
                :placeholder="props.fields?.[key]?.label || key.toString()"
                class="w-full"
                required
            />

            <UInput
                v-else
                v-model="state[key]"
                :placeholder="props.fields?.[key]?.label || key.toString()"
                class="w-full"
                required
            />
          </UFormField>
        </template>

        <div class="flex justify-center gap-4">
          <UButton
              :color="props.cancelColor"
              :label="$t(props.cancelLabel)"
              :trailing-icon="props.cancelIcon"
              variant="outline"
              @click="props.onCancel?.()"
          />
          <UButton
              :color="props.confirmColor"
              :label="$t(props.confirmLabel)"
              :trailing-icon="props.confirmIcon"
              type="submit"
          />
        </div>
      </UForm>
    </template>

  </UModal>
</template>
