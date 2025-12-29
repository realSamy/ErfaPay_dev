<template>
  <div class="inline-block">
    <UButton
        v-if="!isOpen"
        :label="formatted"
        size="sm"
        trailing-icon="material-symbols:edit-outline"
        variant="soft"
        class="w-20 relative"
        :ui="{label: 'w-full'}"
        @click="isOpen = true"
    >
      <template #trailing>
        <UIcon name="material-symbols:edit-outline" class="absolute right-1 top-1"/>
      </template>
    </UButton>

    <UInput
        dir="ltr"
        v-else
        ref="inputRef"
        v-model="internalValue"
        v-maska="maskaOptions"
        :placeholder="formatted"
        :ui="{base: 'text-center'}"
        autofocus
        size="sm"
        class="w-20"
        @blur="handleBlur" @keydown.enter="handleEnter"
    />
  </div>
</template>

<script lang="ts" setup>
import {vMaska} from 'maska/vue'
import type {TimeString} from "~/types/data";


interface Props {
  modelValue?: TimeString
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'update:modelValue', v: TimeString): void }>()

// State
const isOpen = ref(false)
const internalValue = ref<TimeString>('00:00:00')
const inputRef = ref<HTMLInputElement | null>(null)

// Computed
const formatted = computed(() => {
  const val = internalValue.value || props.modelValue || '00:00:00'
  return val.replace(/(\d{2}):?(\d{2}):?(\d{2})/, '$1:$2:$3') // Ensure : format
})

// Watch external modelValue
watch(() => props.modelValue, (newVal) => {
  if (newVal) internalValue.value = newVal
}, {immediate: true})

// Watch internal for emits (live updates)
watch(internalValue, (newVal: TimeString) => {
  emit('update:modelValue', newVal)
})

// Methods
const handleBlur = () => {
  isOpen.value = false
  // Optional: Validate/format here if needed (e.g., clamp hour/min)
  const value = internalValue.value
  let cleanValue = (value || '').replace(/[^0-9:]/g, '').slice(0, 5);
  if (cleanValue.length === 1) cleanValue = cleanValue + ':00';
  else if (cleanValue.length === 2) cleanValue = cleanValue + ':00';
  else if (cleanValue.length === 3) cleanValue = cleanValue.slice(0, 2) + ':0' + cleanValue.slice(3);
  else if (cleanValue.length === 4) cleanValue = cleanValue + ':00';

  const parts = cleanValue.split(':');
  const hStr = parts[0]?.padStart(2, '0') || '00';
  const mStr = parts[1]?.padStart(2, '0') || '00';
  const sStr = parts[2]?.padStart(2, '0') || '00';

  const h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  const s = parseInt(sStr, 10);

  const clampedH = isNaN(h) ? 0 : Math.min(23, Math.max(0, h));
  const clampedM = isNaN(m) ? 0 : Math.min(59, Math.max(0, m));
  const clampedS = isNaN(s) ? 0 : Math.min(59, Math.max(0, s));

  internalValue.value = `${clampedH.toString().padStart(2, '0')}:${clampedM.toString().padStart(2, '0')}:${clampedS.toString().padStart(2, '0')}` as TimeString;
}

const handleEnter = (e: KeyboardEvent) => {
  ;(e.target as HTMLInputElement).blur()
}

const maskaOptions = computed(() => ({
  mask: 'hH:mM:sS',
  tokens: {
    h: {pattern: /[0-2]/},
    H: {pattern: /[0-9]/},
    m: {pattern: /[0-5]/},
    M: {pattern: /[0-9]/},
    s: {pattern: /[0-5]/},
    S: {pattern: /[0-9]/},
  }
}))

watch(isOpen, async (open) => {
  if (open) {
    await nextTick()
  }
})
</script>